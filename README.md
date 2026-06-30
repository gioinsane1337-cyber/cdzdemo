# Cristalli di Zucchero 🍦

A stunning, single-page website for **Cristalli di Zucchero** — an artisanal
_pasticceria_, _gelateria_ & bar in **Turi (Bari), Puglia**. The whole experience is built
around one signature idea: the **Sugar Crystal Layers** journey, an
exploded-view dessert (inspired by exploded keyboard renders) that
disassembles into its real layers — _cialda, gelato, salse, frutta, cristalli_ —
and reassembles as you scroll.

> _Dove lo zucchero diventa arte._

---

## ✨ Highlights

- **Scroll-driven "exploded gelato"** — a pinned GSAP + ScrollTrigger timeline
  that stacks/unstacks the layers of a dessert as you scroll, with a live
  "parts list" that follows along.
- **Hero** with a gently floating, sparkling gelato, an animated iridescent
  "sugar shine" headline, and ambient drifting crystals.
- **16-flavour gelato gallery** with category + vegan filters, live search,
  wobble-on-hover scoops, and an accessible detail dialog.
- **Interactive custom-cake studio** — pick base, filling, decoration and size
  and watch a live SVG cake update, then book it through a date-aware form.
- **Pasticceria** section with editorial, alternating layered reveals.
- **Visit Us** with an embedded Google Map, today-aware opening hours, and
  contact shortcuts.
- **Journal / Diario**, newsletter signup, and a rich footer.
- **A gelato-building preloader**, a reading-progress bar, and **full
  `prefers-reduced-motion` support**.
- Hand-authored **SVG illustrations** (no stock images, no licensing worries) —
  ready to be swapped for real photography.

## 🧱 Tech stack

| Concern        | Choice                                   |
| -------------- | ---------------------------------------- |
| Framework      | **Next.js 15** (App Router)              |
| Language       | **TypeScript**                           |
| Styling        | **Tailwind CSS 3**                       |
| Animation      | **GSAP 3 + ScrollTrigger** (`@gsap/react`) |
| Fonts          | Playfair Display + Inter (`next/font`)   |
| Deployment     | **Vercel** (recommended)                 |

---

## 🚀 Getting started

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev
# → http://localhost:3000

# 3. Production build
npm run build
npm run start
```

Requires Node 18.18+ (tested on Node 24).

---

## 📁 Project structure

```
app/
├── layout.tsx            # fonts, SEO metadata, JSON-LD local-business schema
├── page.tsx              # composes the single-page narrative
├── globals.css           # design tokens, base styles, sugar-shine, reduced-motion
├── data/
│   ├── site.ts           # ← address, hours, contact, social, nav (EDIT ME)
│   └── flavors.ts         # ← the 16 gelato flavours (EDIT ME)
└── components/
    ├── Illustrations.tsx # all SVG gelato/pastry primitives
    ├── Preloader.tsx     # gelato-building opening curtain
    ├── ScrollProgress.tsx# top progress bar + ScrollTrigger refresh
    ├── Navbar.tsx        # glass nav + mobile menu
    ├── Hero.tsx
    ├── SignatureLayers.tsx  # ⭐ the exploded "Sugar Crystal Layers"
    ├── FlavorGallery.tsx # filter/search + detail modal
    ├── CustomCakes.tsx   # cake customiser + booking form
    ├── Pasticceria.tsx
    ├── VisitUs.tsx
    ├── Journal.tsx
    └── Footer.tsx
```

---

## 🎨 Customisation

### Content & business details

Almost everything a shop owner needs to edit lives in two files:

- **`app/data/site.ts`** — name, tagline, address, Google Maps
  query/embed, **phone**, **email**, WhatsApp, opening hours, social links, nav.
- **`app/data/flavors.ts`** — every gelato flavour: name, tasting notes,
  ingredients, pairing, category, vegan flag, and the colours used to paint its
  SVG scoop.

Cake options (bases / fillings / decorations / sizes) and the "past creations"
gallery live at the top of **`app/components/CustomCakes.tsx`**.

### Colours & type

The palette and motion are defined as Tailwind tokens in
**`tailwind.config.ts`** (e.g. `cream`, `cioccolato`, `fragola`, `pistacchio`,
`oro`, `terracotta`) and as CSS variables in **`app/globals.css`**. Change them
in one place and the whole site follows.

### ⚠️ Placeholders to replace before launch

The address, opening hours, Google Maps listing, Facebook and TripAdvisor links,
and JSON-LD geo-coordinates are the shop's **real** details. Still verify/replace:

- **Phone** in `site.ts` — public listings show both a landline
  (`+39 080 891 6250`) and a mobile (`+39 331 331 3093`); the WhatsApp link uses the mobile.
- **Email** (`info@cristallidizuccheroturi.it`) and the **Instagram** URL in `site.ts` are placeholders.
- **P.IVA** in `Footer.tsx` — set to the shop's real number (`08953470724`); verify it's correct.
- **`siteUrl`** in `app/layout.tsx` — set the real domain so canonical/OG URLs resolve.

### 🏷️ Favicon & social image (generated — no manual files needed)

These are produced from code via the Next.js metadata file convention, so they
always match the brand and need no exported assets:

- **`app/icon.svg`** — the browser-tab favicon (gold sugar crystal on cioccolato).
- **`app/apple-icon.tsx`** — the iOS home-screen icon (180×180 PNG via `next/og`).
- **`app/opengraph-image.tsx`** — the 1200×630 social card, typed in real
  Playfair Display + Inter (bundled `app/og-*.ttf`), reused for Twitter/X via
  **`app/twitter-image.tsx`**.

To restyle them, edit those files. To preview the OG image, build and open
`/opengraph-image`. (Generation fetches the bundled fonts at build time — no
network required.)

### 🖼️ Swapping in real photography

The site ships with hand-drawn SVG gelato/pastries **on purpose** — they are
crisp, themeable, weightless, and free of any image-licensing concerns. We did
**not** scrape the shop's Google/Instagram photos.

To use real photos, drop files into `public/` and replace the relevant
illustration with `next/image`, e.g. in `Pasticceria.tsx`:

```tsx
import Image from "next/image";

<Image src="/dolci/maritozzo.jpg" alt="Maritozzo con la panna"
       width={600} height={600} className="rounded-[2.5rem] object-cover" />
```

Good spots for real imagery: the Pasticceria tiles, the Visit Us "virtual tour"
strip, the custom-cake gallery, and the hero. If you host images remotely,
whitelist the domain in `next.config.mjs → images.remotePatterns`.

---

## 🔌 Wiring up the forms (currently front-end only)

Two forms simulate success in the browser and need a backend:

1. **Cake booking** — `CustomCakes.tsx`, in the `<form onSubmit>` handler.
2. **Newsletter** — `Footer.tsx`, in its `<form onSubmit>` handler.

The simplest path with Next.js is a Route Handler:

```ts
// app/api/booking/route.ts
export async function POST(req: Request) {
  const data = await req.json();
  // → send an email (Resend/Nodemailer), write to a DB, or hit a booking API
  return Response.json({ ok: true });
}
```

Then `fetch("/api/booking", { method: "POST", body: JSON.stringify(...) })`
from the handler. For the newsletter, post to Mailchimp/Brevo/Buttondown.

---

## ♿ Accessibility & motion

- Every scroll/ambient animation is wrapped in `gsap.matchMedia()` /
  `@media (prefers-reduced-motion: reduce)` — users who opt out get a calm,
  static site.
- Visible focus rings, a "skip to content" link, semantic landmarks, labelled
  form fields, `aria-pressed` filter toggles, and an `aria-modal` flavour
  dialog (Escape to close, focus moved to the close button).
- The map `<iframe>` is lazy-loaded and titled.

## ⚡ Performance

- Fonts self-hosted via `next/font` (no layout shift, no third-party request).
- All artwork is inline SVG/CSS — essentially no image payload by default.
- First-load JS ≈ 167 kB (GSAP included); the page prerenders to static HTML.
- `will-change` and GPU-friendly transforms are used on animated layers.

> Note: the embedded Google Map renders blank inside sandboxed preview tools but
> loads normally in a real browser.

---

## ▲ Deploy to Vercel

1. Push this folder to a Git repo (GitHub/GitLab/Bitbucket).
2. Import it at [vercel.com/new](https://vercel.com/new) — Vercel auto-detects
   Next.js; no configuration needed.
3. Click **Deploy**. Add your custom domain (e.g. `cristallidizucchero.it`) and
   update `siteUrl` in `app/layout.tsx` so canonical/OG URLs are correct.

Or from the CLI:

```bash
npm i -g vercel
vercel        # preview
vercel --prod # production
```

---

Fatto con 🤍 in Puglia. **Buon appetito!**
