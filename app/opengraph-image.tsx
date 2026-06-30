import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-static";

/**
 * Open Graph / social share image (1200×630), generated at build time.
 *
 * Rendered with next/og (Satori) so it uses the site's real type — Playfair
 * Display + Inter, loaded from the bundled .ttf files next to this route. The
 * gelato is a single inline SVG (rasterised by resvg via an <img> data URI),
 * which keeps gradients and transforms intact.
 */

export const alt = "Cristalli di Zucchero — Pasticceria & Gelateria Artigianale, Turi (Puglia)";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// A composed gelato: waffle cone + three scoops + floating sugar crystals.
const gelatoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 580" width="420" height="580">
  <defs>
    <radialGradient id="sp" cx="38%" cy="30%" r="80%"><stop offset="0%" stop-color="#A7E29B"/><stop offset="55%" stop-color="#7BC96F"/><stop offset="100%" stop-color="#7BC96F"/></radialGradient>
    <radialGradient id="sc" cx="38%" cy="30%" r="80%"><stop offset="0%" stop-color="#FFFFFF"/><stop offset="55%" stop-color="#FBF6EC"/><stop offset="100%" stop-color="#FBF6EC"/></radialGradient>
    <radialGradient id="ss" cx="38%" cy="30%" r="80%"><stop offset="0%" stop-color="#F69BAA"/><stop offset="55%" stop-color="#E85D75"/><stop offset="100%" stop-color="#E85D75"/></radialGradient>
    <linearGradient id="co" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#E6B877"/><stop offset="50%" stop-color="#D49A55"/><stop offset="100%" stop-color="#A86E36"/></linearGradient>
    <linearGradient id="cr" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#FFFFFF"/><stop offset="45%" stop-color="#F4C95D"/><stop offset="100%" stop-color="#E0A93B"/></linearGradient>
    <linearGradient id="gl" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.7"/><stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/></linearGradient>
  </defs>
  <ellipse cx="210" cy="560" rx="120" ry="16" fill="#3C2F2F" opacity="0.12"/>
  <g>
    <path d="M132 300 L288 300 L210 552 Z" fill="url(#co)"/>
    <g stroke="#8A5A2B" stroke-width="2" opacity="0.45" fill="none">
      <path d="M150 300 L210 540"/><path d="M180 300 L210 470"/><path d="M210 300 L210 552"/><path d="M240 300 L210 470"/><path d="M270 300 L210 540"/>
      <path d="M140 330 L280 330"/><path d="M150 365 L270 365"/><path d="M162 400 L258 400"/><path d="M174 435 L246 435"/>
    </g>
    <rect x="128" y="294" width="164" height="16" rx="8" fill="#E6B877"/>
  </g>
  <g transform="translate(115 165) scale(0.95)">
    <path d="M100,12 C152,12 190,58 188,104 C187,128 170,150 150,150 C138,150 132,142 120,144 C110,146 106,152 96,151 C86,150 82,143 72,144 C60,145 54,151 44,149 C26,146 13,128 12,104 C10,58 48,12 100,12 Z" fill="url(#sp)"/>
    <ellipse cx="78" cy="48" rx="46" ry="26" fill="url(#gl)"/>
    <circle cx="74" cy="80" r="3" fill="#4F7A3F"/><circle cx="120" cy="70" r="2.6" fill="#4F7A3F"/><circle cx="98" cy="104" r="2.8" fill="#4F7A3F"/>
  </g>
  <g transform="translate(120 130) scale(0.9)">
    <path d="M100,12 C152,12 190,58 188,104 C187,128 170,150 150,150 C138,150 132,142 120,144 C110,146 106,152 96,151 C86,150 82,143 72,144 C60,145 54,151 44,149 C26,146 13,128 12,104 C10,58 48,12 100,12 Z" fill="url(#sc)"/>
    <ellipse cx="78" cy="48" rx="46" ry="26" fill="url(#gl)"/>
    <path d="M70 74 l9 4 -3 8 -8 -2 z" fill="#3C2F2F"/><path d="M120 64 l7 6 -5 6 -6 -4 z" fill="#3C2F2F"/><path d="M98 100 l8 3 -2 7 -7 -2 z" fill="#3C2F2F"/>
  </g>
  <g transform="translate(125 88) scale(0.85)">
    <path d="M100,12 C152,12 190,58 188,104 C187,128 170,150 150,150 C138,150 132,142 120,144 C110,146 106,152 96,151 C86,150 82,143 72,144 C60,145 54,151 44,149 C26,146 13,128 12,104 C10,58 48,12 100,12 Z" fill="url(#ss)"/>
    <ellipse cx="78" cy="48" rx="46" ry="26" fill="url(#gl)"/>
  </g>
  <g transform="translate(298 70) scale(1.2)">
    <path d="M20 1 L33 16 L26 46 L14 46 L7 16 Z" fill="url(#cr)"/>
    <path d="M20 1 L20 46" stroke="#FFFFFF" stroke-width="1" opacity="0.55"/>
    <path d="M7 16 L33 16" stroke="#FFFFFF" stroke-width="1" opacity="0.45"/>
  </g>
  <g transform="translate(70 175) scale(0.85)">
    <path d="M20 1 L33 16 L26 46 L14 46 L7 16 Z" fill="url(#cr)"/>
    <path d="M20 1 L20 46" stroke="#FFFFFF" stroke-width="1" opacity="0.55"/>
  </g>
  <g transform="translate(312 380) scale(0.7)">
    <path d="M20 1 L33 16 L26 46 L14 46 L7 16 Z" fill="url(#cr)"/>
    <path d="M20 1 L20 46" stroke="#FFFFFF" stroke-width="1" opacity="0.55"/>
  </g>
</svg>`;

// Read the bundled font files at build time (these routes are force-static, so
// this runs during `next build`, not per-request — no network, no runtime fs).
const fontDir = join(process.cwd(), "app");
const playfairBold = readFileSync(join(fontDir, "og-playfair-bold.ttf"));
const playfairItalic = readFileSync(join(fontDir, "og-playfair-italic.ttf"));
const interMedium = readFileSync(join(fontDir, "og-inter-medium.ttf"));

export default async function OgImage() {
  const gelato = `data:image/svg+xml;base64,${Buffer.from(gelatoSvg).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#F8F4ED",
          fontFamily: "Inter",
        }}
      >
        {/* ambient glows */}
        <div
          style={{
            position: "absolute",
            top: -130,
            right: -70,
            width: 540,
            height: 540,
            borderRadius: 270,
            display: "flex",
            backgroundImage:
              "radial-gradient(circle, rgba(123,201,111,0.35), rgba(123,201,111,0))",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -150,
            left: -110,
            width: 520,
            height: 520,
            borderRadius: 260,
            display: "flex",
            backgroundImage:
              "radial-gradient(circle, rgba(232,93,117,0.28), rgba(232,93,117,0))",
          }}
        />
        {/* gold frame */}
        <div
          style={{
            position: "absolute",
            top: 24,
            right: 24,
            bottom: 24,
            left: 24,
            display: "flex",
            border: "2px solid rgba(244,201,93,0.6)",
            borderRadius: 28,
          }}
        />

        {/* copy */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: 760,
            height: "100%",
            padding: "0 76px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", marginBottom: 26 }}>
            <div style={{ width: 46, height: 2, backgroundColor: "#C77B52", display: "flex" }} />
            <div
              style={{
                marginLeft: 16,
                fontFamily: "Inter",
                fontSize: 21,
                letterSpacing: 5,
                color: "#C77B52",
              }}
            >
              PASTICCERIA & GELATERIA · TURI
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "Playfair", fontWeight: 700, fontSize: 108, color: "#3C2F2F", lineHeight: 1 }}>
              Cristalli
            </div>
            <div
              style={{
                fontFamily: "Playfair",
                fontWeight: 600,
                fontStyle: "italic",
                fontSize: 108,
                color: "#3C2F2F",
                lineHeight: 1,
              }}
            >
              di Zucchero
            </div>
          </div>
          <div
            style={{
              marginTop: 30,
              fontFamily: "Playfair",
              fontWeight: 600,
              fontStyle: "italic",
              fontSize: 37,
              color: "#C77B52",
            }}
          >
            Dove lo zucchero diventa arte.
          </div>
        </div>

        {/* gelato */}
        <div
          style={{
            position: "absolute",
            right: 64,
            top: 36,
            width: 430,
            height: 560,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={gelato} width={420} height={560} alt="" />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Playfair", data: playfairBold, weight: 700, style: "normal" },
        { name: "Playfair", data: playfairItalic, weight: 600, style: "italic" },
        { name: "Inter", data: interMedium, weight: 500, style: "normal" },
      ],
    }
  );
}
