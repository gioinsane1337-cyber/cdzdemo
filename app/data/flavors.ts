/**
 * The gelato catalogue. Each flavour carries the colours used to paint its
 * SVG scoop (a radial gradient from `highlight` → `base`, flecked with
 * `speck`), plus the tasting copy that the cards reveal on expand.
 *
 * `category` drives the filter; `vegan` adds a second, orthogonal filter.
 */

export type FlavorCategory = "Classici" | "Creazioni" | "Frutta";

export interface Flavor {
  id: string;
  name: string;
  /** short poetic line shown on the card face */
  tagline: string;
  /** longer evocative description revealed on expand */
  notes: string;
  ingredients: string[];
  /** what to eat / drink it with */
  pairing: string;
  category: FlavorCategory;
  vegan?: boolean;
  /** scoop colours */
  base: string;
  highlight: string;
  speck?: string;
}

export const flavors: Flavor[] = [
  {
    id: "pistacchio-bronte",
    name: "Pistacchio di Bronte",
    tagline: "Verde, tostato, profondo.",
    notes:
      "Solo pistacchi di Bronte DOP, tostati lentamente e macinati a pietra. Una crema densa e burrosa che sa di Sicilia e di sole.",
    ingredients: ["Pistacchi di Bronte DOP", "Latte fresco", "Panna", "Zucchero"],
    pairing: "Sublime con un espresso ristretto.",
    category: "Classici",
    base: "#7BC96F",
    highlight: "#A7E29B",
    speck: "#4F7A3F",
  },
  {
    id: "fragola-nemi",
    name: "Fragoline di Nemi",
    tagline: "Il profumo del lago a primavera.",
    notes:
      "Fragoline di bosco raccolte sui colli di Nemi, mantecate in sorbetto senza latte. Acidulo, vivo, pieno di frutto vero.",
    ingredients: ["Fragoline di Nemi", "Acqua di sorgente", "Zucchero di canna", "Limone"],
    pairing: "Da provare con un calice di Fragolino.",
    category: "Frutta",
    vegan: true,
    base: "#E85D75",
    highlight: "#F69BAA",
    speck: "#B23A52",
  },
  {
    id: "cioccolato-fondente",
    name: "Cioccolato Fondente 70%",
    tagline: "Intenso, serissimo, irresistibile.",
    notes:
      "Cacao monorigine del Perù, fuso in acqua per esaltarne l'amaro nobile. Niente latte: solo cioccolato, puro e profondo.",
    ingredients: ["Cacao 70% monorigine", "Acqua", "Zucchero", "Un velo di sale"],
    pairing: "Magnifico con un dito di rum invecchiato.",
    category: "Classici",
    vegan: true,
    base: "#3C2F2F",
    highlight: "#6B4A3A",
    speck: "#1E1413",
  },
  {
    id: "stracciatella",
    name: "Stracciatella",
    tagline: "Fior di latte e schegge di cioccolato.",
    notes:
      "La nostra crema di fior di latte, attraversata da filamenti di cioccolato fondente colati a mano, uno strappo alla volta.",
    ingredients: ["Latte fresco", "Panna", "Cioccolato fondente", "Zucchero"],
    pairing: "Perfetta in un cono a cialda calda.",
    category: "Classici",
    base: "#FBF6EC",
    highlight: "#FFFFFF",
    speck: "#3C2F2F",
  },
  {
    id: "nocciola-piemonte",
    name: "Nocciola Piemonte IGP",
    tagline: "Tonda Gentile, tostata al punto.",
    notes:
      "Nocciole delle Langhe tostate ogni mattina e ridotte in pasta vellutata. Dolce, rotonda, con una scia lunghissima.",
    ingredients: ["Nocciola Piemonte IGP", "Latte fresco", "Panna", "Zucchero"],
    pairing: "Con un cucchiaino di crema di nocciola.",
    category: "Classici",
    base: "#C79A6B",
    highlight: "#E6C49A",
    speck: "#8A6543",
  },
  {
    id: "limone-sorrento",
    name: "Limone di Sorrento",
    tagline: "Una frustata di sole.",
    notes:
      "Sorbetto agli sfusati di Sorrento IGP, con la scorza grattugiata al momento. Teso, agrumato, pulisce il palato come un'onda.",
    ingredients: ["Limoni di Sorrento IGP", "Acqua", "Zucchero", "Scorza fresca"],
    pairing: "Affogato in prosecco freddo.",
    category: "Frutta",
    vegan: true,
    base: "#F4D26A",
    highlight: "#FBEFA8",
    speck: "#CDA33A",
  },
  {
    id: "mirtillo-selvatico",
    name: "Mirtillo Selvatico",
    tagline: "Il sottobosco in un cucchiaio.",
    notes:
      "Mirtilli selvatici di montagna, scuri e profumati, in un sorbetto fitto color notte. Dolce e selvatico insieme.",
    ingredients: ["Mirtilli selvatici", "Acqua", "Zucchero di canna", "Limone"],
    pairing: "Con una fetta di crostata tiepida.",
    category: "Frutta",
    vegan: true,
    base: "#6C77C4",
    highlight: "#9AA3DC",
    speck: "#3E4889",
  },
  {
    id: "crema-uovo",
    name: "Crema all'Uovo",
    tagline: "La ricetta della nonna, intatta.",
    notes:
      "Tuorli freschi montati con zucchero e una grattata di limone, mantecati lentamente. Avvolgente come una zabaione gelata.",
    ingredients: ["Tuorlo d'uovo", "Latte fresco", "Zucchero", "Scorza di limone"],
    pairing: "Irresistibile con i nostri amaretti.",
    category: "Classici",
    base: "#F4C95D",
    highlight: "#FBE39D",
    speck: "#CDA33A",
  },
  {
    id: "menta-cioccolato",
    name: "Menta & Cioccolato",
    tagline: "Fresca, poi golosa.",
    notes:
      "Infuso di menta fresca del nostro orto, niente coloranti, con scaglie di cioccolato fondente. Un respiro di frescura e croccante.",
    ingredients: ["Menta fresca", "Latte", "Panna", "Cioccolato fondente"],
    pairing: "Con un tè verde freddo.",
    category: "Creazioni",
    base: "#8FD9C7",
    highlight: "#BCEDE0",
    speck: "#3C2F2F",
  },
  {
    id: "ricotta-fichi",
    name: "Ricotta e Fichi Caramellati",
    tagline: "Dolce pugliese d'autunno.",
    notes:
      "Ricotta fresca di pecora mantecata morbida, venata di fichi caramellati nel miele. Rustico ed elegante a un tempo.",
    ingredients: ["Ricotta di pecora", "Fichi", "Miele", "Zucchero"],
    pairing: "Con un passito siciliano.",
    category: "Creazioni",
    base: "#EAD9C0",
    highlight: "#F7ECDA",
    speck: "#7A4B2A",
  },
  {
    id: "tiramisu",
    name: "Tiramisù",
    tagline: "Il dolce che tutti vorrebbero.",
    notes:
      "Mascarpone, savoiardi inzuppati nel nostro espresso e una nevicata di cacao amaro. Tutto il tiramisù, in versione gelata.",
    ingredients: ["Mascarpone", "Espresso", "Savoiardi", "Cacao amaro"],
    pairing: "Da solo, con calma, a occhi chiusi.",
    category: "Creazioni",
    base: "#C2A07A",
    highlight: "#E2CBAB",
    speck: "#4A3526",
  },
  {
    id: "cocco-lime",
    name: "Cocco & Lime",
    tagline: "Una vacanza ai tropici.",
    notes:
      "Latte di cocco cremoso risvegliato dalla scorza di lime. Sorbetto vegano, esotico e rinfrescante, bianco come la sabbia.",
    ingredients: ["Latte di cocco", "Lime", "Acqua", "Zucchero di canna"],
    pairing: "Con un'acqua tonica e una fettina di lime.",
    category: "Frutta",
    vegan: true,
    base: "#EFF6F2",
    highlight: "#FFFFFF",
    speck: "#8FD9C7",
  },
  {
    id: "lampone-rosa",
    name: "Lampone & Rosa",
    tagline: "Delicato come un petalo.",
    notes:
      "Lamponi vivaci e una goccia di acqua di rose. Profumato, romantico, sospeso tra il frutto e il fiore.",
    ingredients: ["Lamponi", "Acqua di rose", "Acqua", "Zucchero"],
    pairing: "Con champagne rosé per le occasioni.",
    category: "Frutta",
    vegan: true,
    base: "#E86A9B",
    highlight: "#F7A9C7",
    speck: "#B23A6E",
  },
  {
    id: "caramello-salato",
    name: "Caramello Salato",
    tagline: "Dolce che sa di mare.",
    notes:
      "Zucchero portato fino all'ambra scura, addomesticato dalla panna e ravvivato dal sale di Cervia. Goloso, profondo, un po' ribelle.",
    ingredients: ["Zucchero caramellato", "Panna", "Latte", "Sale di Cervia"],
    pairing: "Con popcorn caldi, fidatevi.",
    category: "Creazioni",
    base: "#D99A4E",
    highlight: "#F0C386",
    speck: "#8A5A24",
  },
  {
    id: "zafferano-miele",
    name: "Zafferano & Miele",
    tagline: "Oro liquido, gelato.",
    notes:
      "Pistilli di zafferano in infusione e miele di acacia. Un gelato dorato, caldo di profumo e raro come una spezia preziosa.",
    ingredients: ["Zafferano", "Miele di acacia", "Latte", "Panna"],
    pairing: "Con biscotti alle mandorle.",
    category: "Creazioni",
    base: "#F0B73E",
    highlight: "#FAD888",
    speck: "#B97F1E",
  },
  {
    id: "amarena",
    name: "Amarena",
    tagline: "Rosso scuro, ricordo d'infanzia.",
    notes:
      "Amarene sciroppate intere nel loro succo denso, su un sorbetto pieno e leggermente acidulo. La merenda dei pomeriggi d'estate.",
    ingredients: ["Amarene", "Acqua", "Zucchero", "Limone"],
    pairing: "Su una fetta di pan di Spagna.",
    category: "Frutta",
    vegan: true,
    base: "#A8263E",
    highlight: "#D2566B",
    speck: "#6E1626",
  },
];

export const flavorCategories: ("Tutti" | FlavorCategory)[] = [
  "Tutti",
  "Classici",
  "Creazioni",
  "Frutta",
];
