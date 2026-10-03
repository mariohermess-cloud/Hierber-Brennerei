// ENTWÜRFE: Seitentexte je Sorte (Einleitung, Verkostung). Nichts davon ist vom Brenner bestätigt.
// Jeder Text erscheint im HTML mit data-todo="bestaetigen" und ist in TODO-INHALTE.md gelistet.
// Bewusst vorsichtig und allgemein formuliert; keine Jahrgänge, Verfahren, Auszeichnungen oder Herkunftsangaben.

// Familie je Sorte bestimmt Trinktemperatur, Glas und Abgang.
export const FAMILIE = {
  gin: 'gin', wodka: 'wodka', rum: 'braun', whisky: 'braun', 'hunneg-whisky': 'braun', 'rum-orange': 'likoer', sambuca: 'likoer', limoncello: 'likoer',
  kirsch: 'klar', framboise: 'klar', quetsch: 'klar', 'poire-williams': 'klar', mirabelle: 'klar', poire: 'klar', neelchesbiren: 'klar', lenschouren: 'klar',
  kiwibeeren: 'klar', hondsaarsch: 'klar', vullekiischt: 'klar', schleiwen: 'klar', kuerbisdrepp: 'klar', grain: 'klar',
  'hierber-fruucht': 'gereift', 'vieux-marc': 'gereift', 'vieille-prune': 'gereift', 'vieille-pomme': 'gereift', vizdrepp: 'gereift',
  hunnegdrepp: 'honig', kraeiderdrepp: 'kraeuter',
};

export const FAM = {
  klar: { temp: 'Gut gekühlt bis kühl, etwa 10 bis 14 °C.', glas: 'Tulpenglas oder kleines Stielglas mit Kelch.', abgang: 'Sauber und klar; die Frucht klingt noch eine Weile nach.' },
  gereift: { temp: 'Zimmertemperatur, etwa 16 bis 20 °C.', glas: 'Ballonglas oder Nosing-Glas.', abgang: 'Weich und warm, mit einer ruhigen, langen Nachklang-Note.' },
  gin: { temp: 'Pur gut gekühlt; im Longdrink auf reichlich Eis.', glas: 'Tumbler oder Ballonglas.', abgang: 'Frisch und trocken, mit leichter Würze im Nachklang.' },
  wodka: { temp: 'Eiskalt, direkt aus dem Gefrierfach.', glas: 'Kleines Stamperl oder Shotglas.', abgang: 'Kurz, sauber und ohne Schärfe.' },
  braun: { temp: 'Zimmertemperatur; nach Geschmack mit einem großen Eiswürfel.', glas: 'Tumbler oder Nosing-Glas.', abgang: 'Warm und rund, mit angenehm langem Nachklang.' },
  likoer: { temp: 'Gut gekühlt, bei Sorten mit Fruchtnote gern eiskalt.', glas: 'Shotglas oder kleines Likörglas.', abgang: 'Weich und süßlich-frisch, mit ruhigem Nachklang.' },
  honig: { temp: 'Zimmertemperatur oder leicht gekühlt; warm im Tee.', glas: 'Tulpenglas.', abgang: 'Weich und süßlich, der Honig klingt lange nach.' },
  kraeuter: { temp: 'Gut gekühlt, etwa 8 bis 12 °C.', glas: 'Kleines Stamperl oder Tulpenglas.', abgang: 'Würzig und klar, mit frischem Nachklang.' },
};

export const TEXTE = {
  gin: { intro: 'Ein klarer Gin aus der Hierber Brennerei: frisch, vielseitig und gleichermaßen gut pur gekühlt wie im Longdrink.', nase: 'Frische Wacholdernoten, dazu Zitrusschale und ein Hauch Gewürz.', gaumen: 'Klar und trocken, mit Wacholder im Vordergrund und sauberer Würze.' },
  wodka: { intro: 'Klar, schlicht und sauber im Geschmack: ein Wodka, der eiskalt pur ebenso überzeugt wie als Basis für Longdrinks.', nase: 'Zurückhaltend und rein, mit einer feinen Getreidenote.', gaumen: 'Weich und klar, ohne aufdringliche Schärfe.' },
  rum: { intro: 'Ein bernsteinfarbener Rum für ruhige Abende, pur im Tumbler oder als Grundlage für Drinks mit Limette und Ingwer.', nase: 'Warme Noten von Karamell, Vanille und leichtem Holz.', gaumen: 'Weich und rund, mit süßlicher Würze und einem Hauch Gewürz.' },
  'rum-orange': { intro: 'Rum mit Orange: fruchtig, weich und unkompliziert, auf Eis, im Longdrink oder zum Verfeinern von Desserts.', nase: 'Frische Orangenschale über warmen Rumnoten.', gaumen: 'Fruchtig-süß, mit Orange im Vordergrund und weichem Rum im Hintergrund.' },
  whisky: { intro: 'Ein Whisky aus der Hierber Brennerei: pur oder mit einem Spritzer Wasser, auf Eis oder als frischer Highball.', nase: 'Getreide, Vanille und Holz, dazu eine leichte Fruchtnote.', gaumen: 'Rund und warm, mit Malz und ruhiger Würze.' },
  'hunneg-whisky': { intro: 'Whisky mit Honig: ein weicher, goldener Tropfen, der pur ebenso schmeckt wie im heißen Drink.', nase: 'Honigsüße, dazu Getreide und Vanille.', gaumen: 'Weich und süßlich, der Honig trägt den Whisky sanft.' },
  kirsch: { intro: 'Der Klassiker unter den Obstbränden: klar, kräftig im Duft und mit dem typischen Steinobst-Aroma der Kirsche.', nase: 'Reife Kirschen mit einer feinen Mandelnote.', gaumen: 'Klar und fruchtig, mit dezenter Bittermandel im Hintergrund.' },
  framboise: { intro: 'Aus Himbeeren gebrannt: ein klarer Brand mit intensivem Beerenduft, der Desserts und Drinks Charakter gibt.', nase: 'Intensiver Duft frischer Himbeeren.', gaumen: 'Fruchtig und klar, mit feiner Beerensäure.' },
  quetsch: { intro: 'Die Quetsch ist die luxemburgische Zwetschge, und ihr Brand gehört zu den Klassikern unter den Obstbränden.', nase: 'Reife Zwetschgen mit einem Hauch Marzipan.', gaumen: 'Klar, fruchtig und weich, mit feiner Steinobstnote.' },
  'poire-williams': { intro: 'Aus der Williams-Birne gebrannt: ein klarer, duftiger Brand, der das Aroma der reifen Frucht einfängt.', nase: 'Saftige, reife Birne, sehr intensiv.', gaumen: 'Weich und fruchtig, mit der typischen Birnensüße.' },
  mirabelle: { intro: 'Die Mirabelle, die kleine goldgelbe Pflaume, ergibt einen klaren Brand mit feinem Duft und mildem Geschmack.', nase: 'Reife Mirabellen, leicht honigartig.', gaumen: 'Mild und fruchtig, mit zarter Süße.' },
  poire: { intro: 'Ein klarer Birnenbrand: schlicht, duftig und zugänglich.', nase: 'Frische Birne mit leichter Süße.', gaumen: 'Fruchtig und klar, mit sanfter Birnennote.' },
  neelchesbiren: { intro: 'Ein klarer, blass strohfarbener Brand mit luxemburgischem Namen.', nase: 'Fruchtig und mild, mit feiner Süße.', gaumen: 'Weich und rund, mit ruhiger Fruchtnote.' },
  lenschouren: { intro: 'Ein klarer Brand mit luxemburgischem Namen, fruchtig und weich.', nase: 'Reife, milde Frucht mit leichter Süße.', gaumen: 'Weich und klar, mit zurückhaltender Fruchtsüße.' },
  kiwibeeren: { intro: 'Kiwibeeren, die kleinen Verwandten der Kiwi, ergeben einen klaren Brand mit frischer, ungewöhnlicher Frucht.', nase: 'Frische, grünfruchtige Noten mit leichter Säure.', gaumen: 'Klar und lebendig, mit dezenter Säure und feiner Süße.' },
  hondsaarsch: { intro: 'Hondsaarsch ist das luxemburgische Wort für Mispel: ein seltener, klarer Brand mit eigenem Charakter.', nase: 'Herb-fruchtig, mit einer leicht süßlichen Note.', gaumen: 'Klar, mit dezenter Herbe und feiner Frucht.' },
  vullekiischt: { intro: 'Vullekiischt heißt Vogelbeere: ein klarer Brand mit herb-aromatischer Frucht.', nase: 'Herb und aromatisch, mit Beerenfrucht.', gaumen: 'Klar und kräftig, mit feiner Bitternote im Hintergrund.' },
  schleiwen: { intro: 'Schléiwen sind Schlehen: ein klarer Brand von der herben Wildfrucht.', nase: 'Herbe Beere mit leichter Mandelnote.', gaumen: 'Klar und kräftig, mit Herbe und feiner Frucht.' },
  kuerbisdrepp: { intro: 'Ein klarer Brand vom Kürbis: ungewöhnlich, mild und für Neugierige.', nase: 'Zurückhaltend, mit erdiger Süße.', gaumen: 'Weich und klar, mit sanfter Kürbisnote.' },
  grain: { intro: 'Ein klarer Getreidebrand: geradlinig, sauber und für den Alltag.', nase: 'Getreide, leicht brotig.', gaumen: 'Klar und geradlinig, mit leichter Getreidesüße.' },
  'hierber-fruucht': { intro: 'Ein gereifter Brand der Reihe „Grande réserve“: rund, warm und für ruhige Momente.', nase: 'Reife Frucht, Holz und eine feine Gewürznote.', gaumen: 'Rund und weich, mit Frucht und ruhiger Holzwürze.' },
  'vieux-marc': { intro: 'Ein im Eichenfass gereifter Tresterbrand, der nach dem Essen seine Ruhe entfaltet.', nase: 'Trauben, Holz und eine Spur Gewürz.', gaumen: 'Kräftig und rund, mit Traubenfrucht und Holznote.' },
  'vieille-prune': { intro: 'Zwetschgenbrand, blass goldfarben: die gereifte Form des Klassikers, weich und mit mehr Tiefe.', nase: 'Gedörrte Pflaume, Vanille und feines Holz.', gaumen: 'Weich und rund, mit Pflaumenfrucht und leichter Würze.' },
  'vieille-pomme': { intro: 'Apfelbrand, blass strohfarben: gereift, weich und mit dem Duft reifer Äpfel.', nase: 'Reife Äpfel, leicht Vanille und Holz.', gaumen: 'Weich und rund, mit Apfelfrucht und feiner Würze.' },
  hunnegdrepp: { intro: 'Hunnegdrëpp ist der Honigbrand: honiggolden, weich und mit dem Duft von Blütenhonig.', nase: 'Blütenhonig, dezent und warm.', gaumen: 'Weich und süßlich, mit Honig im Vordergrund.' },
  kraeiderdrepp: { intro: 'Kräiderdrëpp ist der Kräuterbrand: klar, würzig und ein Digestif mit frischem Charakter.', nase: 'Frische Kräuter, leicht würzig.', gaumen: 'Klar und würzig, mit feiner Kräuterfrische.' },
  vizdrepp: { intro: 'Vizdrëpp ist der Apfelbrand, den man anderswo Calvados nennt: weich, fruchtig und mit Apfel im Mittelpunkt.', nase: 'Reife Äpfel, leicht gewürzt.', gaumen: 'Weich und fruchtig, mit Apfel und feiner Würze.' },
  sambuca: { intro: 'Ein klarer Anislikör mit Tradition, pur, auf Eis oder zum Kaffee.', nase: 'Anis und Süße, leicht blumig.', gaumen: 'Süß und würzig, mit deutlichem Anis.' },
  limoncello: { intro: 'Leuchtend gelb und frisch: ein Zitronenlikör, der eiskalt am besten schmeckt.', nase: 'Frische Zitronenschale.', gaumen: 'Süß und frisch, mit klarer Zitrone und leichter Säure.' },
};
