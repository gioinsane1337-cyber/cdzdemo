import type { Config } from "tailwindcss";

/**
 * Cristalli di Zucchero — design system.
 *
 * The palette is deliberately restrained: a warm, sun-baked cream canvas and a
 * cioccolato-fondente ink do almost all the work, with the gelato accents
 * (fragola, pistacchio, oro/zucchero, terracotta) used sparingly as "pops".
 * All boldness is spent on the layered scroll mechanic, not on loud colour.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Surfaces
        cream: "#F8F4ED", // soft almond cream — the canvas
        panna: "#FFFDF8", // panna / lighter card surface
        almond: "#EFE7DA", // deeper warm panel
        // Ink
        cioccolato: "#3C2F2F", // cioccolato fondente — primary text
        "cioccolato-soft": "#6B5A53", // muted body text
        // Gelato accents
        fragola: "#E85D75", // strawberry
        pistacchio: "#7BC96F", // pistachio
        oro: "#F4C95D", // gold sugar crystals
        terracotta: "#C77B52", // warm Puglia terracotta
        mirtillo: "#6C77C4", // blueberry
        menta: "#8FD9C7", // fresh mint
      },
      fontFamily: {
        // Wired to next/font CSS variables set in app/layout.tsx
        display: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        label: "0.32em", // for the small uppercase eyebrows
      },
      boxShadow: {
        scoop: "0 22px 50px -22px rgba(60, 47, 47, 0.35)",
        "scoop-lg": "0 40px 80px -30px rgba(60, 47, 47, 0.45)",
        crystal: "0 0 0 1px rgba(244, 201, 93, 0.4), 0 8px 30px -10px rgba(244, 201, 93, 0.5)",
        soft: "0 10px 40px -18px rgba(60, 47, 47, 0.22)",
      },
      backgroundImage: {
        "iridescent":
          "linear-gradient(110deg, rgba(244,201,93,0.0) 20%, rgba(255,255,255,0.65) 38%, rgba(232,93,117,0.25) 50%, rgba(108,119,196,0.25) 62%, rgba(244,201,93,0.0) 80%)",
        "sugar-grain":
          "radial-gradient(circle at 1px 1px, rgba(60,47,47,0.06) 1px, transparent 0)",
      },
      keyframes: {
        // Ambient — gently floating sugar crystals
        floatCrystal: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)", opacity: "0.7" },
          "50%": { transform: "translateY(-22px) rotate(180deg)", opacity: "1" },
        },
        // Slow melting highlight that drifts across glossy surfaces
        meltShine: {
          "0%": { transform: "translateX(-120%) skewX(-12deg)" },
          "100%": { transform: "translateX(120%) skewX(-12deg)" },
        },
        // A scoop settling — used on hover/entrance
        wobble: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "20%": { transform: "rotate(-3.5deg)" },
          "40%": { transform: "rotate(2.5deg)" },
          "60%": { transform: "rotate(-1.5deg)" },
          "80%": { transform: "rotate(0.8deg)" },
        },
        sparkle: {
          "0%, 100%": { transform: "scale(0.6)", opacity: "0.2" },
          "50%": { transform: "scale(1)", opacity: "1" },
        },
        drift: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-12px)" },
        },
        // Preloader scoop fill
        rise: {
          "0%": { transform: "translateY(101%)" },
          "100%": { transform: "translateY(0%)" },
        },
      },
      animation: {
        "float-crystal": "floatCrystal 9s ease-in-out infinite",
        "melt-shine": "meltShine 6s ease-in-out infinite",
        wobble: "wobble 0.9s ease-in-out",
        sparkle: "sparkle 2.4s ease-in-out infinite",
        drift: "drift 4s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
};

export default config;
