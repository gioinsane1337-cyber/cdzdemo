"use client";

import { useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { flavors, flavorCategories, type Flavor, type FlavorCategory } from "../data/flavors";
import { Scoop, Crystal, Sparkle, IconSearch, IconClose, IconLeaf } from "./Illustrations";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Stracciatella-style flavours get chocolate shards; the rest get fine specks.
const chipFlavors = new Set(["stracciatella", "menta-cioccolato", "tiramisu", "cioccolato-fondente"]);
const speckOf = (f: Flavor): "chip" | "dot" | "none" =>
  chipFlavors.has(f.id) ? "chip" : "dot";

export default function FlavorGallery() {
  const root = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [cat, setCat] = useState<"Tutti" | FlavorCategory>("Tutti");
  const [veganOnly, setVeganOnly] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Flavor | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return flavors.filter((f) => {
      if (cat !== "Tutti" && f.category !== cat) return false;
      if (veganOnly && !f.vegan) return false;
      if (!q) return true;
      return (
        f.name.toLowerCase().includes(q) ||
        f.tagline.toLowerCase().includes(q) ||
        f.ingredients.some((i) => i.toLowerCase().includes(q))
      );
    });
  }, [cat, veganOnly, query]);

  // One-time scroll reveal of the section heading + controls.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".fg-head > *", {
          y: 28,
          autoAlpha: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".fg-head", start: "top 80%" },
        });
      });
    },
    { scope: root }
  );

  // Soft fade whenever the filtered set changes — keeps reflows from snapping.
  useGSAP(
    () => {
      if (!gridRef.current) return;
      gsap.fromTo(
        gridRef.current.children,
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.03, ease: "power2.out", overwrite: true }
      );
    },
    { dependencies: [cat, veganOnly, query], scope: gridRef }
  );

  return (
    <section id="gusti" ref={root} className="relative scroll-mt-24 bg-gradient-to-b from-cream to-almond/40 py-24 md:py-32">
      <div className="container-rail">
        <div className="fg-head mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">
            <span className="h-px w-8 bg-terracotta" />
            Il Banco dei Sapori
            <span className="h-px w-8 bg-terracotta" />
          </p>
          <h2 className="mt-4 font-display text-[clamp(2.2rem,5vw,3.8rem)] font-bold leading-[1.02] text-cioccolato">
            Sedici modi di dire <span className="italic">delizioso</span>
          </h2>
          <p className="mt-4 text-cioccolato-soft">
            Dai grandi classici alle creazioni d'autore. Cerca il tuo preferito, oppure lasciati
            tentare da qualcosa di nuovo. <span className="italic">Buon assaggio.</span>
          </p>
        </div>

        {/* Controls */}
        <div className="fg-head mt-10 flex flex-col items-center gap-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {flavorCategories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                aria-pressed={cat === c}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                  cat === c
                    ? "bg-cioccolato text-cream shadow-soft"
                    : "bg-panna text-cioccolato-soft hover:bg-almond"
                }`}
              >
                {c}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setVeganOnly((v) => !v)}
              aria-pressed={veganOnly}
              className={`flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                veganOnly ? "bg-pistacchio text-cioccolato shadow-soft" : "bg-panna text-cioccolato-soft hover:bg-almond"
              }`}
            >
              <IconLeaf className="h-4 w-4" /> Vegano
            </button>
          </div>

          <div className="relative w-full max-w-sm">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cerca un gusto o un ingrediente…"
              aria-label="Cerca un gusto"
              className="w-full rounded-full border border-cioccolato/15 bg-panna px-5 py-3 pr-11 text-sm text-cioccolato placeholder:text-cioccolato-soft/60 focus:border-terracotta focus:outline-none"
            />
            <IconSearch className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cioccolato-soft/60" />
          </div>
        </div>

        {/* Result count — orients the visitor before the grid */}
        <p className="fg-head mt-8 text-center text-sm text-cioccolato-soft">
          {filtered.length === flavors.length
            ? `${flavors.length} gusti al banco`
            : `${filtered.length} ${filtered.length === 1 ? "gusto" : "gusti"} ${
                filtered.length === 1 ? "trovato" : "trovati"
              }`}
        </p>

        {/* Grid — two compact columns on phones so the full list stays a short,
            scannable scroll, opening up to 3–4 columns from tablet up. */}
        <div
          ref={gridRef}
          className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4"
        >
          {filtered.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setSelected(f)}
              aria-haspopup="dialog"
              className="flavor-card group relative flex flex-col items-center overflow-hidden rounded-2xl border border-white/60 bg-panna p-4 text-center shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-scoop sm:rounded-3xl sm:p-6"
            >
              {/* hover-released crystal */}
              <span className="pointer-events-none absolute right-3 top-3 w-4 translate-y-1 opacity-0 transition-all duration-500 group-hover:-translate-y-1 group-hover:opacity-100 sm:right-4 sm:top-4 sm:w-5">
                <Crystal tone={f.highlight} className="h-auto w-full" />
              </span>

              <div className="relative h-20 w-20 sm:h-32 sm:w-32">
                <div className="h-full w-full transform-gpu transition-transform group-hover:animate-wobble">
                  <Scoop base={f.base} highlight={f.highlight} speck={f.speck} speckStyle={speckOf(f)} className="h-auto w-full drop-shadow-md" />
                </div>
              </div>

              <h3 className="mt-3 font-display text-base font-semibold text-cioccolato sm:mt-4 sm:text-xl">{f.name}</h3>
              <p className="mt-1 line-clamp-2 text-xs italic text-cioccolato-soft sm:text-sm">{f.tagline}</p>

              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-cream px-2.5 py-1 text-[0.6rem] font-medium uppercase tracking-wider text-cioccolato-soft sm:mt-4 sm:px-3 sm:text-[0.7rem]">
                {f.category}
                {f.vegan && (
                  <>
                    <IconLeaf className="h-3 w-3 text-pistacchio" />
                    <span className="sr-only-custom">vegano</span>
                  </>
                )}
              </span>
              <span className="mt-2 hidden text-xs font-semibold uppercase tracking-label text-terracotta opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:mt-3 sm:inline">
                Scopri →
              </span>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-16 text-center text-cioccolato-soft">
            Nessun gusto trovato… ma al banco ne troverai sempre di nuovi. Prova un'altra ricerca.
          </p>
        )}
      </div>

      {selected && <FlavorModal flavor={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Detail dialog
 * ------------------------------------------------------------------ */

function FlavorModal({ flavor, onClose }: { flavor: Flavor; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".fm-backdrop",
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.3, ease: "power1.out" }
      );
      gsap.fromTo(
        panel.current,
        { autoAlpha: 0, y: 30, scale: 0.96 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.4)" }
      );
      closeBtn.current?.focus();
    },
    { scope: panel }
  );

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="fm-title"
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      <button
        type="button"
        aria-label="Chiudi"
        onClick={onClose}
        className="fm-backdrop absolute inset-0 cursor-default bg-cioccolato/40 backdrop-blur-sm"
      />
      <div
        ref={panel}
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-[2rem] bg-panna shadow-scoop-lg"
      >
        <div
          className="relative flex items-center justify-center px-8 pb-4 pt-10"
          style={{ background: `radial-gradient(120% 100% at 50% 0%, ${flavor.highlight}40, transparent 70%)` }}
        >
          <span className="absolute left-6 top-6 w-6 animate-float-crystal">
            <Sparkle className="h-auto w-full" color={flavor.base} />
          </span>
          <div className="h-40 w-40">
            <Scoop base={flavor.base} highlight={flavor.highlight} speck={flavor.speck} speckStyle={speckOf(flavor)} className="h-auto w-full drop-shadow-lg" />
          </div>
          <button
            ref={closeBtn}
            type="button"
            onClick={onClose}
            aria-label="Chiudi la scheda"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-cream/80 text-cioccolato transition-colors hover:bg-cream"
          >
            <IconClose className="h-4 w-4" />
          </button>
        </div>

        <div className="px-8 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-cream px-3 py-1 text-[0.7rem] font-medium uppercase tracking-wider text-cioccolato-soft">
              {flavor.category}
            </span>
            {flavor.vegan && (
              <span className="inline-flex items-center gap-1 rounded-full bg-pistacchio/20 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-wider text-pistacchio">
                <IconLeaf className="h-3 w-3" /> Vegano
              </span>
            )}
          </div>
          <h3 id="fm-title" className="mt-3 font-display text-3xl font-bold text-cioccolato">
            {flavor.name}
          </h3>
          <p className="mt-2 text-cioccolato-soft">{flavor.notes}</p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-label text-terracotta">Ingredienti</h4>
              <ul className="mt-2 space-y-1 text-sm text-cioccolato-soft">
                {flavor.ingredients.map((i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-oro" /> {i}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-label text-terracotta">In abbinamento</h4>
              <p className="mt-2 text-sm italic text-cioccolato-soft">{flavor.pairing}</p>
            </div>
          </div>

          <a href="#dove-siamo" onClick={onClose} className="btn-primary mt-7 w-full">
            Vienilo ad assaggiare
          </a>
        </div>
      </div>
    </div>
  );
}
