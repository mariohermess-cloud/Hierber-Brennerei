from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.worksheet.datavalidation import DataValidation
from openpyxl.comments import Comment
from openpyxl.utils import get_column_letter

wb = Workbook()
F = "Arial"
HDR = PatternFill("solid", fgColor="2E5E3A")   # dunkelgrün
HDR_FONT = Font(name=F, bold=True, color="FFFFFF", size=11)
INPUT = PatternFill("solid", fgColor="FFF6C8")  # hellgelb = eintragen
CALC = PatternFill("solid", fgColor="E8EEF5")   # hellblau = berechnet
EX_FONT = Font(name=F, italic=True, color="7F7F7F", size=10)
BLUE = Font(name=F, color="0000FF", size=10)
BLACK = Font(name=F, color="000000", size=10)
thin = Side(style="thin", color="BFBFBF")
BORDER = Border(left=thin, right=thin, top=thin, bottom=thin)
N_ROWS = 300  # vorbereitete Zeilen

def header(ws, cols, widths, row=1):
    for i, (c, w) in enumerate(zip(cols, widths), 1):
        cell = ws.cell(row=row, column=i, value=c)
        cell.font = HDR_FONT; cell.fill = HDR; cell.border = BORDER
        cell.alignment = Alignment(wrap_text=True, vertical="center")
        ws.column_dimensions[get_column_letter(i)].width = w
    ws.row_dimensions[row].height = 32
    ws.freeze_panes = ws.cell(row=row+1, column=1)
    ws.auto_filter.ref = f"A{row}:{get_column_letter(len(cols))}{row+N_ROWS}"

def style_body(ws, ncols, first, last, calc_cols=()):
    for r in range(first, last+1):
        for c in range(1, ncols+1):
            cell = ws.cell(row=r, column=c)
            cell.border = BORDER
            if c in calc_cols:
                cell.fill = CALC; cell.font = BLACK
            else:
                cell.fill = INPUT; cell.font = BLUE

def example(ws, row, values):
    for i, v in enumerate(values, 1):
        if v is None: continue
        cell = ws.cell(row=row, column=i, value=v)
        cell.font = Font(name=F, italic=True, color="0000FF", size=10)

def note(ws, ref, text):
    ws[ref].comment = Comment(text, "Vorlage")

# ---------- Anleitung ----------
ws = wb.active; ws.title = "Anleitung"
ws.column_dimensions["A"].width = 110
lines = [
 ("Hierber Brennerei – Erfassungsvorlage Produkte & Fässer", Font(name=F, bold=True, size=16, color="2E5E3A")),
 ("Diese Datei ist die Datengrundlage für die zentrale Datenbank (Phase 0/1 des Masterplans). Bitte so vollständig wie möglich ausfüllen.", BLACK),
 ("", BLACK),
 ("SO GEHT'S", Font(name=F, bold=True, size=12)),
 ("1. Blatt 'Listen' zuerst prüfen: Obstarten, Produkttypen, Flaschengrößen und MwSt-Sätze anpassen oder ergänzen. Diese Listen füllen die Auswahlfelder auf den anderen Blättern.", BLACK),
 ("2. Blatt 'Produkte': jedes Produkt genau einmal (z. B. 'Apfelbrand'), unabhängig von der Flaschengröße.", BLACK),
 ("3. Blatt 'Varianten_Preise': jede verkaufbare Flaschengröße pro Produkt mit Netto-Preis. Brutto wird automatisch berechnet.", BLACK),
 ("4. Blatt 'Faesser': jedes Fass mit Nummer, Inhalt und Zustand.", BLACK),
 ("5. Blatt 'Fass_aktiv': welches Fass für welches Produkt gerade abgefüllt wird (das kommt aufs Etikett).", BLACK),
 ("6. Blatt 'Abfuellungen' (optional): bisherige Abfüllungen, falls bekannt – hilft beim Startbestand.", BLACK),
 ("", BLACK),
 ("FARBLEGENDE", Font(name=F, bold=True, size=12)),
 ("Gelbe Zellen = bitte ausfüllen (blaue Schrift = Eingabe).", BLACK),
 ("Blaue Zellen = werden automatisch berechnet, nicht überschreiben.", BLACK),
 ("Graue kursive Zeile 2 = Beispiel. Bitte überschreiben oder löschen.", BLACK),
 ("", BLACK),
 ("REGELN", Font(name=F, bold=True, size=12)),
 ("• Artikelnummer (SKU) ist eindeutig und ändert sich nie. Vorschlag: OBST-TYP-NNN, z. B. APF-BRD-001. Wenn ihr schon Nummern habt, diese verwenden.", BLACK),
 ("• Preise immer NETTO (ohne MwSt) in Euro eintragen. Standard-MwSt Luxemburg 17 %. Bei Unsicherheit Preis brutto in Bemerkung notieren.", BLACK),
 ("• Alkoholgehalt als Zahl in % vol (z. B. 40), Mengen in ml bzw. Liter, Datum als TT.MM.JJJJ.", BLACK),
 ("• Fassnummer genau so schreiben, wie sie heute auf dem Fass/Etikett steht.", BLACK),
 ("• Pro Produkt darf nur EIN Fass aktiv sein. Das Blatt 'Fass_aktiv' warnt bei Doppelungen.", BLACK),
 ("• Unklar? Spalte 'Bemerkung' nutzen – lieber zu viel als zu wenig.", BLACK),
 ("", BLACK),
 ("Rückgabe: Datei ins Repository unter vorlagen/ legen oder im Chat hochladen.", BLACK),
]
for i, (t, f) in enumerate(lines, 1):
    c = ws.cell(row=i, column=1, value=t); c.font = f; c.alignment = Alignment(wrap_text=True, vertical="top")
ws["A13"].fill = INPUT; ws["A14"].fill = CALC

# ---------- Listen ----------
ls = wb.create_sheet("Listen")
lists = {
 "A": ("Obstart / Kategorie", ["Apfel","Birne","Zwetschge","Mirabelle","Kirsche","Quitte","Himbeere","Traube (Marc)","Getreide (Korn/Vodka/Whisky)","Wacholder (Gin)","Zuckerrohr (Rum)","Kräuter","Sonstiges"]),
 "B": ("Produkttyp", ["Brand","Likör","Gin","Whisky","Rum","Vodka","Korn","Marc","Sambuca","Vizdrëpp","Kräuterbrand","Apfelchips","Geschenkset","Handelsware"]),
 "C": ("Flaschengröße (ml)", [20,50,100,200,350,500,700,1000,1500]),
 "D": ("MwSt-Satz", [0.17,0.14,0.08,0.03,0]),
 "E": ("Fass-Material", ["Edelstahl","Eiche","Kastanie","Akazie","Glasballon","Kunststoff","Sonstiges"]),
 "F": ("Fass-Status", ["lagernd","aktiv","leer","gesperrt"]),
 "G": ("Ja/Nein", ["Ja","Nein"]),
}
for col, (title, vals) in lists.items():
    c = ls[f"{col}1"]; c.value = title; c.font = HDR_FONT; c.fill = HDR; c.border = BORDER
    ls.column_dimensions[col].width = 30
    for i, v in enumerate(vals, 2):
        cell = ls[f"{col}{i}"]; cell.value = v; cell.fill = INPUT; cell.font = BLUE; cell.border = BORDER
        if col == "D": cell.number_format = "0%"
    for i in range(len(vals)+2, 42):
        cell = ls[f"{col}{i}"]; cell.fill = INPUT; cell.border = BORDER
ls.freeze_panes = "A2"
note(ls, "A1", "Listen ergänzen: einfach unten weitere Einträge in die gelben Zellen schreiben. Die Auswahlfelder erfassen bis Zeile 41.")

def dv_list(col_letter):
    return f"=Listen!${col_letter}$2:${col_letter}$41"

def add_dv(ws, rng, formula, msg=None):
    dv = DataValidation(type="list", formula1=formula, allow_blank=True, showErrorMessage=False)
    if msg: dv.prompt = msg; dv.showInputMessage = True
    ws.add_data_validation(dv); dv.add(rng)

# ---------- Produkte ----------
pr = wb.create_sheet("Produkte")
cols = ["Artikelnummer (SKU)","Produktname","Obstart / Kategorie","Produkttyp","Alkohol % vol","Beschreibung (Website)","Zutaten / Allergene","Herkunft Obst (eigen / zugekauft)","Aktiv (Ja/Nein)","Foto vorhanden (Ja/Nein)","Bemerkung"]
widths = [18,28,22,16,12,45,30,20,12,14,30]
header(pr, cols, widths)
style_body(pr, len(cols), 2, N_ROWS+1)
example(pr, 2, ["APF-BRD-001","Apfelbrand","Apfel","Brand",40,"Klarer Brand aus eigenen Streuobst-Äpfeln, mild und fruchtig.","Enthält Alkohol","eigen","Ja","Nein","Beispielzeile – bitte überschreiben"])
add_dv(pr, f"C2:C{N_ROWS+1}", dv_list("A"))
add_dv(pr, f"D2:D{N_ROWS+1}", dv_list("B"))
add_dv(pr, f"I2:I{N_ROWS+1}", dv_list("G"))
add_dv(pr, f"J2:J{N_ROWS+1}", dv_list("G"))
note(pr, "A1", "Eindeutig, nie ändern. Vorschlag: OBST-TYP-NNN (APF-BRD-001). Bestehende Nummern verwenden, falls vorhanden.")
note(pr, "E1", "Nur die Zahl, z. B. 40 für 40 % vol.")
note(pr, "C1", "Bestimmt, unter welchem Baum das Produkt auf der Website erscheint.")

# ---------- Varianten_Preise ----------
va = wb.create_sheet("Varianten_Preise")
cols = ["Artikelnummer (SKU)","Produktname (automatisch)","Flaschengröße (ml)","EAN / Barcode","Preis netto (€)","MwSt-Satz","Preis brutto (€)","Grundpreis brutto (€/l)","Lagerbestand Flaschen (Stichtag)","Mindestbestand","Gewicht Flasche voll (g)","Online verkaufen (Ja/Nein)","Bemerkung"]
widths = [18,28,14,16,13,10,14,16,16,12,14,14,30]
header(va, cols, widths)
style_body(va, len(cols), 2, N_ROWS+1, calc_cols=(2,7,8))
example(va, 2, ["APF-BRD-001",None,500,"5411234567890",18.50,0.17,None,None,48,12,950,"Ja","Beispielzeile – bitte überschreiben"])
for r in range(2, N_ROWS+2):
    va[f"B{r}"] = f'=IFERROR(INDEX(Produkte!$B$2:$B${N_ROWS+1},MATCH(A{r},Produkte!$A$2:$A${N_ROWS+1},0)),"")'
    va[f"G{r}"] = f'=IF(E{r}="","",ROUND(E{r}*(1+F{r}),2))'
    va[f"H{r}"] = f'=IF(OR(E{r}="",C{r}=""),"",ROUND(G{r}/(C{r}/1000),2))'
    va[f"E{r}"].number_format = '#,##0.00 €'; va[f"G{r}"].number_format = '#,##0.00 €'; va[f"H{r}"].number_format = '#,##0.00 €'
    va[f"F{r}"].number_format = "0%"
add_dv(va, f"A2:A{N_ROWS+1}", f"=Produkte!$A$2:$A${N_ROWS+1}")
add_dv(va, f"C2:C{N_ROWS+1}", dv_list("C"))
add_dv(va, f"F2:F{N_ROWS+1}", dv_list("D"))
add_dv(va, f"L2:L{N_ROWS+1}", dv_list("G"))
note(va, "E1", "Netto ohne MwSt. Falls nur Brutto bekannt: Brutto / 1,17 eintragen und Bemerkung setzen.")
note(va, "F1", "Standard Luxemburg 17 % (0,17). Als Bruchteil gespeichert.")
note(va, "G1", "Berechnet: netto × (1 + MwSt).")
note(va, "H1", "Berechnet: Pflichtangabe im Shop (Preis je Liter).")
note(va, "D1", "13-stellige EAN, falls vorhanden (GS1). Sonst leer lassen – wird später vergeben.")

# ---------- Faesser ----------
fa = wb.create_sheet("Faesser")
cols = ["Fassnummer","Artikelnummer (SKU) Inhalt","Produktname (automatisch)","Material","Volumen (l)","Füllstand aktuell (l)","Alkohol % vol","Befüllt am","Maische-/Brennchar­ge","Lagerort","Status","Restmenge Flaschen 500 ml (automatisch)","Bemerkung"]
widths = [14,20,26,14,12,16,12,12,20,16,12,18,30]
header(fa, cols, widths)
style_body(fa, len(cols), 2, N_ROWS+1, calc_cols=(3,12))
example(fa, 2, ["F-017","APF-BRD-001",None,"Edelstahl",300,212,41.5,"15.11.2025","M-2025-08","Fasslager links","aktiv",None,"Beispielzeile – bitte überschreiben"])
for r in range(2, N_ROWS+2):
    fa[f"C{r}"] = f'=IFERROR(INDEX(Produkte!$B$2:$B${N_ROWS+1},MATCH(B{r},Produkte!$A$2:$A${N_ROWS+1},0)),"")'
    fa[f"L{r}"] = f'=IF(F{r}="","",INT(F{r}/0.5))'
    fa[f"H{r}"].number_format = "DD.MM.YYYY"
add_dv(fa, f"B2:B{N_ROWS+1}", f"=Produkte!$A$2:$A${N_ROWS+1}")
add_dv(fa, f"D2:D{N_ROWS+1}", dv_list("E"))
add_dv(fa, f"K2:K{N_ROWS+1}", dv_list("F"))
note(fa, "A1", "Genau so schreiben, wie sie heute auf dem Fass steht. Muss eindeutig sein.")
note(fa, "G1", "Alkoholgehalt im Fass (vor Herabsetzung auf Trinkstärke).")
note(fa, "I1", "Verweis auf Brennbuch/Maische, damit jede Flasche rückverfolgbar ist.")
note(fa, "L1", "Grobe Schätzung: Füllstand geteilt durch 0,5 l. Nur zur Orientierung.")

# ---------- Fass_aktiv ----------
ak = wb.create_sheet("Fass_aktiv")
cols = ["Artikelnummer (SKU)","Produktname (automatisch)","Aktives Fass (Fassnummer)","Aktiv seit","Gesetzt von","Prüfung (automatisch)","Bemerkung"]
widths = [18,28,20,12,16,34,30]
header(ak, cols, widths)
style_body(ak, len(cols), 2, N_ROWS+1, calc_cols=(2,6))
example(ak, 2, ["APF-BRD-001",None,"F-017","15.11.2025","Mario",None,"Beispielzeile – bitte überschreiben"])
for r in range(2, N_ROWS+2):
    ak[f"B{r}"] = f'=IFERROR(INDEX(Produkte!$B$2:$B${N_ROWS+1},MATCH(A{r},Produkte!$A$2:$A${N_ROWS+1},0)),"")'
    ak[f"F{r}"] = (f'=IF(A{r}="","",IF(COUNTIF($A$2:$A${N_ROWS+1},A{r})>1,"FEHLER: Produkt mehrfach aktiv",'
                   f'IF(COUNTIF(Faesser!$A$2:$A${N_ROWS+1},C{r})=0,"FEHLER: Fassnummer unbekannt",'
                   f'IF(IFERROR(INDEX(Faesser!$B$2:$B${N_ROWS+1},MATCH(C{r},Faesser!$A$2:$A${N_ROWS+1},0)),"")<>A{r},"WARNUNG: Fass enthält anderes Produkt","OK"))))')
    ak[f"D{r}"].number_format = "DD.MM.YYYY"
add_dv(ak, f"A2:A{N_ROWS+1}", f"=Produkte!$A$2:$A${N_ROWS+1}")
add_dv(ak, f"C2:C{N_ROWS+1}", f"=Faesser!$A$2:$A${N_ROWS+1}")
note(ak, "F1", "OK = alles stimmig. FEHLER bei doppeltem Produkt oder unbekanntem Fass. WARNUNG wenn das Fass laut Blatt 'Faesser' ein anderes Produkt enthält.")

# ---------- Abfuellungen ----------
ab = wb.create_sheet("Abfuellungen")
cols = ["Datum","Fassnummer","Artikelnummer (SKU)","Produktname (automatisch)","Flaschengröße (ml)","Anzahl Flaschen","Liter abgefüllt (automatisch)","Losnummer","Etiketten gedruckt","Abgefüllt von","Bemerkung"]
widths = [12,14,18,26,14,14,16,18,14,16,30]
header(ab, cols, widths)
style_body(ab, len(cols), 2, N_ROWS+1, calc_cols=(4,7))
example(ab, 2, ["02.12.2025","F-017","APF-BRD-001",None,500,60,None,"F017-251202",60,"Mario","Beispielzeile – bitte überschreiben"])
for r in range(2, N_ROWS+2):
    ab[f"D{r}"] = f'=IFERROR(INDEX(Produkte!$B$2:$B${N_ROWS+1},MATCH(C{r},Produkte!$A$2:$A${N_ROWS+1},0)),"")'
    ab[f"G{r}"] = f'=IF(OR(E{r}="",F{r}=""),"",E{r}*F{r}/1000)'
    ab[f"A{r}"].number_format = "DD.MM.YYYY"
add_dv(ab, f"B2:B{N_ROWS+1}", f"=Faesser!$A$2:$A${N_ROWS+1}")
add_dv(ab, f"C2:C{N_ROWS+1}", f"=Produkte!$A$2:$A${N_ROWS+1}")
add_dv(ab, f"E2:E{N_ROWS+1}", dv_list("C"))
note(ab, "H1", "Vorschlag: F<Fassnummer>-<JJMMTT>, z. B. F017-251202. Kommt aufs Etikett (Loskennzeichnung).")

# ---------- Uebersicht ----------
ov = wb.create_sheet("Uebersicht")
ov.column_dimensions["A"].width = 44; ov.column_dimensions["B"].width = 16
ov["A1"] = "Übersicht (automatisch)"; ov["A1"].font = Font(name=F, bold=True, size=14, color="2E5E3A")
rows = [
 ("Erfasste Produkte", f'=COUNTA(Produkte!A2:A{N_ROWS+1})'),
 ("Erfasste Varianten (Flaschengrößen)", f'=COUNTA(Varianten_Preise!A2:A{N_ROWS+1})'),
 ("Varianten ohne Preis", f'=SUMPRODUCT((Varianten_Preise!A2:A{N_ROWS+1}<>"")*(Varianten_Preise!E2:E{N_ROWS+1}=""))'),
 ("Erfasste Fässer", f'=COUNTA(Faesser!A2:A{N_ROWS+1})'),
 ("Fässer aktiv", f'=COUNTIF(Faesser!K2:K{N_ROWS+1},"aktiv")'),
 ("Fässer lagernd", f'=COUNTIF(Faesser!K2:K{N_ROWS+1},"lagernd")'),
 ("Fassvolumen gesamt (l)", f'=SUM(Faesser!E2:E{N_ROWS+1})'),
 ("Aktueller Inhalt in Fässern (l)", f'=SUM(Faesser!F2:F{N_ROWS+1})'),
 ("Liter reiner Alkohol in Fässern (l.A.)", f'=ROUND(SUMPRODUCT(Faesser!F2:F{N_ROWS+1},Faesser!G2:G{N_ROWS+1})/100,1)'),
 ("Produkte ohne aktives Fass", f'=SUMPRODUCT((Produkte!A2:A{N_ROWS+1}<>"")*(COUNTIF(Fass_aktiv!A2:A{N_ROWS+1},Produkte!A2:A{N_ROWS+1})=0))'),
 ("Fehler/Warnungen auf Blatt Fass_aktiv", f'=COUNTIF(Fass_aktiv!F2:F{N_ROWS+1},"FEHLER*")+COUNTIF(Fass_aktiv!F2:F{N_ROWS+1},"WARNUNG*")'),
 ("Lagerwert Flaschen netto (€)", f'=SUMPRODUCT(Varianten_Preise!E2:E{N_ROWS+1},Varianten_Preise!I2:I{N_ROWS+1})'),
]
for i, (label, f) in enumerate(rows, 3):
    ov.cell(row=i, column=1, value=label).font = BLACK
    c = ov.cell(row=i, column=2, value=f); c.font = BLACK; c.fill = CALC; c.border = BORDER
    if "€" in label: c.number_format = '#,##0.00 €'
note(ov, "A11", "Liter reiner Alkohol = Füllstand × % vol / 100. Grundlage für die Alkoholbilanz gegenüber dem Zoll.")

from openpyxl.workbook.properties import CalcProperties
wb.calculation = CalcProperties(fullCalcOnLoad=True)
wb.save("/home/user/Hierber-Brennerei/vorlagen/Erfassungsvorlage_Produkte_Faesser.xlsx")
print("ok")
