# Etiketten drucken mit LabelForge

Die Etiketten-App [LabelForge](https://github.com/mariohermess-cloud/Labelforge-HierberBrennerei)
erzeugt druckgenaue Vektoretiketten und kann Serien aus Tabellen erstellen: jede
Zeile ein Etikett, jede Spalte eine Variable im Layout. Die Brennerei-Datenbank
liefert genau solche Zeilen. Dadurch steht auf jedem Etikett die Fassnummer, die
zum Zeitpunkt des Drucks wirklich aktiv war.

**LabelForge muss dafür nicht geändert werden.**

## Der Ablauf

```
Datenbank ──► /api/labelforge/serie.csv ──► LabelForge: Serie aus CSV ──► PDF/PNG
   │                                              │
   └─ aktives Fass, Losnummer,                    └─ Hierber Original (hoch/quer)
      Füllmenge, Alkoholgehalt, Preis
```

1. Fass in der Brennerei wechseln, entweder in der Etiketten-App über
   `POST /api/fass/wechseln` oder im Rechnungsprogramm.
2. Abfüllung buchen: `POST /api/abfuellung`. Das erzeugt die Losnummer,
   senkt den Füllstand und bucht den Lagerzugang.
3. Tabelle holen:
   ```bash
   curl -o serie.csv "http://nas:8080/api/labelforge/serie.csv?sku=APF-BRD-001-500&kopien=60"
   ```
4. In LabelForge: Etikett öffnen, **Serie aus CSV / Excel**, Datei wählen,
   Ausgabe `pdf-imposition-a4` oder `zip-png`, 600 dpi, Modus `print`.
5. Druck protokollieren: `POST /api/etikettendruck`. Damit ist später
   nachvollziehbar, welche Fassnummer auf welcher Auflage stand.

## Welche Spalte füllt welches Feld

Die Namen stammen aus `DEFAULT_FIELDS` in `label_styles.py` der Etiketten-App
und werden beim Import automatisch zugeordnet.

| Spalte | Feld im Etikett | Quelle in der Datenbank |
|---|---|---|
| `product_name` | Produktname | `produkt.name_de` |
| `category` | Kategorie | `produkttyp.name_de` |
| `origin` | Herkunft | fest: Produit luxembourgeois |
| `volume` | Füllmenge | `variante.fuellmenge_ml` als 0,5 l |
| `abv` | Alkoholgehalt | `produkt.alkohol_vol` als 40% vol. |
| `producer` | Erzeuger | `firma.name` |
| `address`, `street`, `phone`, `website` | Adresszeilen | `firma` |
| **`batch`** | **Chargencode** | **Losnummer der jüngsten Abfüllung** |

Der Chargencode ist der Schlüssel: Unsere Losnummer beginnt mit der Fassnummer,
`F017-260920` heißt Fass F-017, abgefüllt am 20.09.2026. Damit steht die
Fassnummer auf dem Etikett, ohne dass die Vorlage ein eigenes Feld dafür braucht.

Zusätzlich liegen `fass`, `los`, `abgefuellt_am`, `zutaten`, `allergene`, `ean`,
`sku`, `preis` und `grundpreis` als Spalten bei. Im Layout erreicht man sie über
Platzhalter mitten in einer Zeile, zum Beispiel `Fass {{fass}} · {{abgefuellt_am}}`.

Zwei Spalten steuern den Druck selbst: `copies` legt fest, wie oft eine Zeile
gedruckt wird, und `dateiname` benennt die Einzeldateien.

## Geprüft

Die erzeugte Datei wurde mit dem Tabellenparser der Etiketten-App selbst
eingelesen (`tabular.parse_table`), auf die Vorlage **Hierber Original (hoch)**
angewendet (`label_styles.build_style` und `text_replace.apply_variables`) und
gerendert. Ergebnis: alle zehn Variablen der Vorlage gefüllt, Chargencode
`F017-260920` hochkant im linken Rand, wie im Original gedruckt.

## Wenn die Fassnummer ein eigenes Feld bekommen soll

Heute steckt sie in der Losnummer. Soll sie getrennt und groß erscheinen, gibt es
zwei Wege:

1. **Ohne Änderung an der App:** In der Vorlage eine Textzeile mit dem Platzhalter
   `{{fass}}` anlegen. Der Serienimport ersetzt ihn aus unserer Spalte.
2. **Mit Änderung an der App:** Ein Feld `cask_no` in `DEFAULT_FIELDS`,
   `_VAR_LAYER_NAMES` und in beide Hierber-Builder aufnehmen. Dann taucht es als
   eigene Ebene „Fassnummer“ im Editor auf.

## Offener Punkt

Die Etiketten-App speichert bei einem Serienlauf nicht, welche Zeilen verwendet
wurden (`BatchJob` hält nur Status und Pfad). Die Rückverfolgung läuft deshalb
über unsere Tabelle `etikettendruck`, die bei jedem Druck über
`POST /api/etikettendruck` einen Eintrag mit Variante, Fass, Losnummer, Anzahl,
Vorlage, Drucker und Person bekommt.
