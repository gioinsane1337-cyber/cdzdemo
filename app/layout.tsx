import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { site } from "./data/site";
import "./globals.css";

/* Display face — refined Italian serif with real personality in the italics. */
const playfair = Playfair_Display({
  subsets: ["latin"],
  // Only the weights the UI actually uses (headings: 500/600/700, plus 400 for
  // the italic sugar-text). 800/900 were declared but never referenced — every
  // unused weight is an extra font file the phone downloads and parses on load.
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

/* Body face — quiet, modern, highly legible. */
const inter = Inter({
  subsets: ["latin"],
  // 300 (light) was declared but never used — dropped to shave a font file.
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

// TODO: update to the shop's real domain before launch (canonical/OG URLs).
const siteUrl = "https://www.cristallidizuccheroturi.it";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Cristalli di Zucchero — Pasticceria & Gelateria a Turi (BA)",
    template: "%s · Cristalli di Zucchero",
  },
  description:
    "Pasticceria artigianale, gelato e torte su misura nel cuore di Turi, in Puglia. Dove lo zucchero diventa arte. Le celebri Tette delle Monache e tanto altro al banco.",
  keywords: [
    "pasticceria Turi",
    "pasticceria Bari",
    "gelateria Turi",
    "torte su misura Puglia",
    "Cristalli di Zucchero Turi",
    "tette delle monache Turi",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: siteUrl,
    siteName: site.name,
    title: "Cristalli di Zucchero — Dove lo zucchero diventa arte",
    description:
      "Pasticceria artigianale, gelato e torte su misura nel cuore di Turi, in Puglia.",
    // og:image is injected automatically from app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: "Cristalli di Zucchero — Pasticceria & Gelateria Artigianale",
    description: "Dove lo zucchero diventa arte. Turi, Puglia.",
    // twitter:image is injected automatically from app/twitter-image.tsx
  },
  alternates: { canonical: siteUrl },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F8F4ED",
  width: "device-width",
  initialScale: 1,
};

/* Local-business structured data — helps the shop surface in Google/Maps. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Bakery", "IceCreamShop"],
  name: site.name,
  image: `${siteUrl}/opengraph-image`,
  url: siteUrl,
  telephone: site.contact.phone,
  priceRange: "€€",
  servesCuisine: ["Pasticceria", "Gelato", "Caffè", "Italian"],
  hasMap: site.address.mapsLink,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: "Turi",
    addressRegion: "BA",
    postalCode: "70010",
    addressCountry: "IT",
  },
  geo: { "@type": "GeoCoordinates", latitude: 40.9164464, longitude: 17.0192888 },
  openingHoursSpecification: site.hours
    .filter((h) => !h.closed)
    .map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.day,
      description: h.time,
    })),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <a
          href="#gusti"
          className="sr-only-custom focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-cioccolato focus:px-5 focus:py-2 focus:text-cream"
        >
          Salta ai sapori
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
