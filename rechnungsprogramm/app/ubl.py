"""E-Rechnung im Format UBL 2.1 (Peppol BIS Billing 3.0).

Luxemburg verlangt elektronische Rechnungen an öffentliche Auftraggeber.
Die erzeugte Datei kann über einen Peppol-Zugangspunkt versendet werden.
"""
from __future__ import annotations

from decimal import Decimal
from xml.etree import ElementTree as ET

NS = {
    "": "urn:oasis:names:specification:ubl:schema:xsd:Invoice-2",
    "cac": "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2",
    "cbc": "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2",
}
UBL_GUTSCHRIFT = "urn:oasis:names:specification:ubl:schema:xsd:CreditNote-2"


def _t(eltern, name, text=None, **attr):
    knoten = ET.SubElement(eltern, name, {k: str(v) for k, v in attr.items()})
    if text is not None:
        knoten.text = str(text)
    return knoten


def _betrag(eltern, name, wert, waehrung="EUR"):
    return _t(eltern, name, f'{Decimal(wert or 0):.2f}', currencyID=waehrung)


def erzeugen(beleg: dict) -> bytes:
    """UBL-XML für eine festgeschriebene Rechnung oder Gutschrift."""
    ist_gutschrift = beleg["art"] == "gutschrift"
    wurzel_name = "CreditNote" if ist_gutschrift else "Invoice"
    for praefix, url in NS.items():
        ET.register_namespace(praefix, UBL_GUTSCHRIFT if (praefix == "" and ist_gutschrift) else url)

    w = ET.Element(wurzel_name, {
        "xmlns": UBL_GUTSCHRIFT if ist_gutschrift else NS[""],
        "xmlns:cac": NS["cac"], "xmlns:cbc": NS["cbc"],
    })
    f = beleg["firma"]
    waehrung = beleg["waehrung"]

    _t(w, "cbc:CustomizationID", "urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0")
    _t(w, "cbc:ProfileID", "urn:fdc:peppol.eu:2017:poacc:billing:01:1.0")
    _t(w, "cbc:ID", beleg["nummer"])
    _t(w, "cbc:IssueDate", beleg["datum"].isoformat())
    if not ist_gutschrift and beleg.get("faellig_am"):
        _t(w, "cbc:DueDate", beleg["faellig_am"].isoformat())
    _t(w, "cbc:%s" % ("CreditNoteTypeCode" if ist_gutschrift else "InvoiceTypeCode"),
       "381" if ist_gutschrift else "380")
    _t(w, "cbc:DocumentCurrencyCode", waehrung)
    if beleg.get("kopftext"):
        _t(w, "cbc:Note", beleg["kopftext"])

    if beleg.get("bezieht_auf"):
        ref = _t(w, "cac:BillingReference")
        dok = _t(ref, "cac:InvoiceDocumentReference")
        _t(dok, "cbc:ID", beleg["bezieht_auf"]["nummer"])

    # Verkäufer
    lieferant = _t(w, "cac:AccountingSupplierParty")
    partei = _t(lieferant, "cac:Party")
    name = _t(partei, "cac:PartyName")
    _t(name, "cbc:Name", f["name"])
    adresse = _t(partei, "cac:PostalAddress")
    _t(adresse, "cbc:StreetName", f["strasse"])
    _t(adresse, "cbc:CityName", f["ort"])
    _t(adresse, "cbc:PostalZone", f["plz"])
    land = _t(adresse, "cac:Country")
    _t(land, "cbc:IdentificationCode", f["land"])
    if f.get("mwst_nr"):
        steuer = _t(partei, "cac:PartyTaxScheme")
        _t(steuer, "cbc:CompanyID", f["mwst_nr"])
        schema = _t(steuer, "cac:TaxScheme")
        _t(schema, "cbc:ID", "VAT")
    rechtlich = _t(partei, "cac:PartyLegalEntity")
    _t(rechtlich, "cbc:RegistrationName", f["name"])

    # Käufer
    kunde = _t(w, "cac:AccountingCustomerParty")
    kpartei = _t(kunde, "cac:Party")
    kname = _t(kpartei, "cac:PartyName")
    _t(kname, "cbc:Name", beleg["kunde_name"])
    kadresse = _t(kpartei, "cac:PostalAddress")
    kland = _t(kadresse, "cac:Country")
    _t(kland, "cbc:IdentificationCode", beleg.get("kunde_land") or "LU")
    if beleg.get("kunde_mwst_nr"):
        ksteuer = _t(kpartei, "cac:PartyTaxScheme")
        _t(ksteuer, "cbc:CompanyID", beleg["kunde_mwst_nr"])
        kschema = _t(ksteuer, "cac:TaxScheme")
        _t(kschema, "cbc:ID", "VAT")
    krechtlich = _t(kpartei, "cac:PartyLegalEntity")
    _t(krechtlich, "cbc:RegistrationName", beleg["kunde_name"])

    if f.get("iban"):
        zahlung = _t(w, "cac:PaymentMeans")
        _t(zahlung, "cbc:PaymentMeansCode", "30")
        if beleg.get("nummer"):
            _t(zahlung, "cbc:PaymentID", beleg["nummer"])
        konto = _t(zahlung, "cac:PayeeFinancialAccount")
        _t(konto, "cbc:ID", f["iban"])

    # Steuer
    gesamt = _t(w, "cac:TaxTotal")
    _betrag(gesamt, "cbc:TaxAmount", beleg["mwst"], waehrung)
    for zeile in beleg["mwst_aufteilung"]:
        teil = _t(gesamt, "cac:TaxSubtotal")
        _betrag(teil, "cbc:TaxableAmount", zeile["netto"], waehrung)
        _betrag(teil, "cbc:TaxAmount", 0 if beleg["reverse_charge"] else zeile["mwst"], waehrung)
        kategorie = _t(teil, "cac:TaxCategory")
        _t(kategorie, "cbc:ID", "AE" if beleg["reverse_charge"] else "S")
        _t(kategorie, "cbc:Percent", f'{Decimal(zeile["mwst_satz"]) * 100:.2f}')
        if beleg["reverse_charge"]:
            _t(kategorie, "cbc:TaxExemptionReasonCode", "VATEX-EU-AE")
            _t(kategorie, "cbc:TaxExemptionReason", "Reverse charge")
        schema = _t(kategorie, "cac:TaxScheme")
        _t(schema, "cbc:ID", "VAT")

    summen = _t(w, "cac:LegalMonetaryTotal")
    _betrag(summen, "cbc:LineExtensionAmount", beleg["netto"], waehrung)
    _betrag(summen, "cbc:TaxExclusiveAmount", beleg["netto"], waehrung)
    _betrag(summen, "cbc:TaxInclusiveAmount", beleg["brutto"], waehrung)
    _betrag(summen, "cbc:PayableAmount", beleg["brutto"], waehrung)

    for p in beleg["positionen"]:
        zeile = _t(w, "cac:CreditNoteLine" if ist_gutschrift else "cac:InvoiceLine")
        _t(zeile, "cbc:ID", p["pos"])
        _t(zeile, "cbc:%s" % ("CreditedQuantity" if ist_gutschrift else "InvoicedQuantity"),
           f'{Decimal(p["menge"]):.3f}', unitCode="H87")
        _betrag(zeile, "cbc:LineExtensionAmount", p["netto"], waehrung)
        artikel = _t(zeile, "cac:Item")
        _t(artikel, "cbc:Name", p["bezeichnung"][:100])
        if p.get("losnummer"):
            _t(artikel, "cbc:Description", f'Losnummer {p["losnummer"]}')
        kategorie = _t(artikel, "cac:ClassifiedTaxCategory")
        _t(kategorie, "cbc:ID", "AE" if beleg["reverse_charge"] else "S")
        _t(kategorie, "cbc:Percent", f'{Decimal(p["mwst_satz"]) * 100:.2f}')
        schema = _t(kategorie, "cac:TaxScheme")
        _t(schema, "cbc:ID", "VAT")
        preis = _t(zeile, "cac:Price")
        _betrag(preis, "cbc:PriceAmount", p["einzelpreis_netto"], waehrung)

    return ET.tostring(w, encoding="utf-8", xml_declaration=True)
