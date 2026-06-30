/**
 * Single source of truth for everything the pasticceria might want to edit
 * without touching components: address, hours, contact, social links, copy
 * fragments. Keep real-world facts here.
 */

export const site = {
  name: "Cristalli di Zucchero",
  tagline: "Dove lo zucchero diventa arte",
  taglineEn: "Where sugar becomes art",
  neighborhood: "Turi, Puglia",
  address: {
    street: "Piazza Sandro Pertini, 5/6",
    city: "70010 Turi BA",
    country: "Italia",
    // Map embed. We use OpenStreetMap, not Google's keyless `output=embed`:
    // Google serves X-Frame-Options that abort the frame in many contexts
    // (consent walls, in-app/embedded browsers), which is what left the map
    // blank. OSM's export/embed has no framing restriction, so the map renders
    // everywhere. Precise turn-by-turn lives behind `mapsLink` (real Google
    // listing). Marker = Turi town centre, Piazza Sandro Pertini.
    mapsQuery: "Cristalli di Zucchero, Piazza Sandro Pertini, 70010 Turi BA",
    mapsEmbed:
      "https://www.openstreetmap.org/export/embed.html?bbox=17.0166%2C40.9140%2C17.0206%2C40.9165&layer=mapnik&marker=40.91528%2C17.01861",
    // Canonical Google Maps listing for this shop.
    mapsLink: "https://maps.app.goo.gl/V2F8WhHuua3Zhxtw7",
  },
  contact: {
    // TODO: confirm — public listings show BOTH a landline and a mobile.
    phone: "+39 080 891 6250",
    phoneHref: "tel:+390808916250",
    email: "info@cristallidizuccheroturi.it", // TODO: real address
    whatsapp: "https://wa.me/393313313093", // TODO: confirm mobile number
  },
  hours: [
    { day: "Lunedì", time: "07:00 – 13:30 · 15:00 – 21:00", closed: false },
    { day: "Martedì", time: "Chiuso", closed: true },
    { day: "Mercoledì", time: "07:00 – 13:30 · 15:00 – 21:00", closed: false },
    { day: "Giovedì", time: "07:00 – 13:30 · 15:00 – 21:00", closed: false },
    { day: "Venerdì", time: "07:00 – 13:30 · 15:00 – 21:00", closed: false },
    { day: "Sabato", time: "07:00 – 13:30 · 15:00 – 21:00", closed: false },
    { day: "Domenica", time: "07:00 – 13:30 · 16:00 – 21:00", closed: false },
  ],
  social: {
    instagram: "https://www.instagram.com/", // TODO: real profile
    facebook: "https://www.facebook.com/cristallidizuccheroturi",
    tripadvisor:
      "https://www.tripadvisor.com/Restaurant_Review-g1076903-d5857471-Reviews-Cristalli_di_zucchero-Turi_Province_of_Bari_Puglia.html",
  },
  nav: [
    { label: "I Sapori", href: "#gusti" },
    { label: "Torte su Misura", href: "#torte" },
    { label: "Pasticceria", href: "#pasticceria" },
    { label: "Dove Siamo", href: "#dove-siamo" },
    { label: "Diario", href: "#diario" },
  ],
} as const;

export type Hour = (typeof site.hours)[number];
