"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Crystal, Cherry, IconCake, IconHeart } from "./Illustrations";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ---- customiser option tables (edit copy/colours freely) ---- */
const BASES = [
  { id: "vaniglia", label: "Vaniglia", color: "#F4E4C1" },
  { id: "cioccolato", label: "Cioccolato", color: "#5A3A2E" },
  { id: "pistacchio", label: "Pistacchio", color: "#CFE3A8" },
  { id: "redvelvet", label: "Red Velvet", color: "#B23A52" },
] as const;

const FILLINGS = [
  { id: "crema", label: "Crema Pasticcera", color: "#F4C95D" },
  { id: "fragole", label: "Fragole & Panna", color: "#E85D75" },
  { id: "nocciola", label: "Nocciola", color: "#6B4A3A" },
  { id: "ricotta", label: "Ricotta & Cioccolato", color: "#EAD9C0" },
] as const;

const TOPPINGS = [
  { id: "panna", label: "Panna Montata", color: "#FFFDF8", topper: "crystals" },
  { id: "ganache", label: "Ganache", color: "#3C2F2F", topper: "crystals" },
  { id: "glassa", label: "Glassa Rosa", color: "#F7A9C7", topper: "flowers" },
  { id: "frutta", label: "Frutta Fresca", color: "#FBF6EC", topper: "fruit" },
] as const;

const SIZES = [
  { id: "s", label: "6–8", note: "persone", scale: 0.85 },
  { id: "m", label: "10–12", note: "persone", scale: 1 },
  { id: "l", label: "16–20", note: "persone", scale: 1.12 },
  { id: "xl", label: "24+", note: "persone", scale: 1.24 },
] as const;

type Sel = {
  base: (typeof BASES)[number];
  filling: (typeof FILLINGS)[number];
  topping: (typeof TOPPINGS)[number];
  size: (typeof SIZES)[number];
};

export default function CustomCakes() {
  const root = useRef<HTMLDivElement>(null);
  const [sel, setSel] = useState<Sel>({
    base: BASES[0],
    filling: FILLINGS[0],
    topping: TOPPINGS[0],
    size: SIZES[1],
  });
  const [submitted, setSubmitted] = useState(false);
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    // Earliest bookable date = 2 days out, computed client-side to avoid SSR drift.
    const d = new Date();
    d.setDate(d.getDate() + 2);
    setMinDate(d.toISOString().slice(0, 10));
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".cc-reveal", {
          y: 30,
          autoAlpha: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        });
      });
    },
    { scope: root }
  );

  const summary = `${sel.base.label} · ${sel.filling.label} · ${sel.topping.label} · ${sel.size.label} ${sel.size.note}`;

  return (
    <section id="torte" ref={root} className="relative overflow-hidden bg-cioccolato py-24 text-cream md:py-32">
      {/* warm glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-terracotta/20 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-96 w-96 rounded-full bg-fragola/10 blur-3xl" />
      </div>

      <div className="container-rail relative">
        <div className="cc-reveal mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center text-oro">
            <span className="h-px w-8 bg-oro/60" />
            Torte su Misura
            <span className="h-px w-8 bg-oro/60" />
          </p>
          <h2 className="mt-4 font-display text-[clamp(2.2rem,5vw,3.8rem)] font-bold leading-[1.02]">
            Disegna la torta dei tuoi <span className="italic text-oro">sogni</span>
          </h2>
          <p className="mt-4 text-cream/70">
            Componila qui sotto, poi prenotala in due minuti. La prepareremo a mano, fresca, per il
            tuo giorno speciale. <span className="italic">Auguri!</span>
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          {/* Customiser + live preview */}
          <div className="cc-reveal">
            <div className="rounded-[2rem] bg-cream/5 p-6 ring-1 ring-cream/10 backdrop-blur-sm md:p-8">
              <CakePreview sel={sel} />

              <div className="mt-8 space-y-6">
                <OptionRow
                  label="Il Gusto"
                  options={BASES}
                  current={sel.base.id}
                  onPick={(o) => setSel((s) => ({ ...s, base: o }))}
                />
                <OptionRow
                  label="La Farcitura"
                  options={FILLINGS}
                  current={sel.filling.id}
                  onPick={(o) => setSel((s) => ({ ...s, filling: o }))}
                />
                <OptionRow
                  label="La Decorazione"
                  options={TOPPINGS}
                  current={sel.topping.id}
                  onPick={(o) => setSel((s) => ({ ...s, topping: o }))}
                />
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-label text-oro">La Dimensione</p>
                  <div className="grid grid-cols-4 gap-2">
                    {SIZES.map((o) => (
                      <button
                        key={o.id}
                        type="button"
                        onClick={() => setSel((s) => ({ ...s, size: o }))}
                        aria-pressed={sel.size.id === o.id}
                        className={`rounded-xl px-2 py-3 text-center transition-all duration-300 ${
                          sel.size.id === o.id ? "bg-oro text-cioccolato" : "bg-cream/10 text-cream/80 hover:bg-cream/20"
                        }`}
                      >
                        <span className="block font-display text-lg font-semibold">{o.label}</span>
                        <span className="block text-[0.65rem] uppercase tracking-wide opacity-70">{o.note}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking form */}
          <div className="cc-reveal">
            <div className="rounded-[2rem] bg-cream p-6 text-cioccolato shadow-scoop-lg md:p-9">
              {submitted ? (
                <Confirmation summary={summary} onReset={() => setSubmitted(false)} />
              ) : (
                <form
                  className="space-y-5"
                  onSubmit={(e) => {
                    e.preventDefault();
                    // No backend wired: this is where you POST to an API route,
                    // email service, or booking system. See README → "Booking".
                    setSubmitted(true);
                    requestAnimationFrame(() =>
                      document.getElementById("cc-confirm")?.scrollIntoView({ block: "nearest" })
                    );
                  }}
                >
                  <div>
                    <h3 className="font-display text-2xl font-bold">Prenota la tua torta</h3>
                    <p className="mt-1 text-sm text-cioccolato-soft">
                      Ti ricontattiamo per confermare i dettagli e il prezzo.
                    </p>
                  </div>

                  {/* live summary of the design */}
                  <div className="rounded-2xl border border-dashed border-terracotta/40 bg-panna px-4 py-3">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-label text-terracotta">
                      La tua creazione
                    </p>
                    <p className="mt-1 text-sm font-medium">{summary}</p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Nome e cognome" htmlFor="cc-name">
                      <input id="cc-name" name="name" required autoComplete="name" className="cc-input" placeholder="Giulia Rossi" />
                    </Field>
                    <Field label="Telefono" htmlFor="cc-phone">
                      <input id="cc-phone" name="phone" type="tel" autoComplete="tel" className="cc-input" placeholder="+39 …" />
                    </Field>
                  </div>

                  <Field label="Email" htmlFor="cc-email">
                    <input id="cc-email" name="email" type="email" required autoComplete="email" className="cc-input" placeholder="giulia@email.it" />
                  </Field>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Data di ritiro" htmlFor="cc-date">
                      <input id="cc-date" name="date" type="date" required min={minDate} className="cc-input" />
                    </Field>
                    <Field label="Occasione" htmlFor="cc-occasion">
                      <select id="cc-occasion" name="occasion" className="cc-input" defaultValue="Compleanno">
                        <option>Compleanno</option>
                        <option>Matrimonio</option>
                        <option>Battesimo</option>
                        <option>Laurea</option>
                        <option>Anniversario</option>
                        <option>Altro</option>
                      </select>
                    </Field>
                  </div>

                  <Field label="Un messaggio per noi (allergie, scritte, idee…)" htmlFor="cc-msg">
                    <textarea id="cc-msg" name="message" rows={3} className="cc-input resize-none" placeholder="Vorrei la scritta 'Tanti Auguri Marco' e niente frutta secca, grazie!" />
                  </Field>

                  <button type="submit" className="btn-primary w-full">
                    Invia la richiesta
                  </button>
                  <p className="text-center text-xs text-cioccolato-soft">
                    Nessun pagamento ora — confermiamo prima tutto insieme.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- sub-components ---- */

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-1.5 block text-sm font-medium text-cioccolato">{label}</span>
      {children}
    </label>
  );
}

function OptionRow<T extends { id: string; label: string; color: string }>({
  label,
  options,
  current,
  onPick,
}: {
  label: string;
  options: readonly T[];
  current: string;
  onPick: (o: T) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-label text-oro">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => onPick(o)}
            aria-pressed={current === o.id}
            className={`flex items-center gap-2 rounded-full px-3.5 py-2 text-sm transition-all duration-300 ${
              current === o.id ? "bg-cream text-cioccolato shadow-soft" : "bg-cream/10 text-cream/80 hover:bg-cream/20"
            }`}
          >
            <span
              className="h-4 w-4 rounded-full ring-1 ring-black/10"
              style={{ background: o.color }}
              aria-hidden="true"
            />
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Confirmation({ summary, onReset }: { summary: string; onReset: () => void }) {
  return (
    <div id="cc-confirm" className="py-6 text-center" role="status" aria-live="polite">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-pistacchio/20 text-pistacchio">
        <IconCake className="h-8 w-8" />
      </div>
      <h3 className="font-display text-2xl font-bold">Richiesta ricevuta — grazie!</h3>
      <p className="mt-2 text-sm text-cioccolato-soft">
        Ti scriviamo entro 24 ore per confermare la tua torta:
      </p>
      <p className="mt-3 rounded-2xl bg-panna px-4 py-3 text-sm font-medium">{summary}</p>
      <p className="mt-4 inline-flex items-center gap-1.5 text-sm italic text-terracotta">
        A presto, da Cristalli di Zucchero <IconHeart className="h-3.5 w-3.5" />
      </p>
      <button type="button" onClick={onReset} className="btn-ghost mt-6">
        Componi un'altra torta
      </button>
    </div>
  );
}

/* ---- live cake preview ---- */

function CakePreview({ sel }: { sel: Sel }) {
  const wrap = useRef<HTMLDivElement>(null);

  // Little pop whenever any choice changes.
  useGSAP(
    () => {
      gsap.fromTo(wrap.current, { scale: 0.96 }, { scale: 1, duration: 0.4, ease: "back.out(2)" });
    },
    { dependencies: [sel.base.id, sel.filling.id, sel.topping.id, sel.size.id], scope: wrap }
  );

  const toppers = useMemo(() => {
    if (sel.topping.topper === "crystals")
      return (
        <>
          <div className="absolute -top-3 left-1/2 w-5 -translate-x-1/2"><Crystal tone="#F4C95D" className="h-auto w-full" /></div>
          <div className="absolute -top-1 left-[38%] w-4"><Crystal tone="#E85D75" className="h-auto w-full" /></div>
          <div className="absolute -top-1 right-[38%] w-4"><Crystal tone="#6C77C4" className="h-auto w-full" /></div>
        </>
      );
    if (sel.topping.topper === "fruit")
      return (
        <>
          <div className="absolute -top-4 left-1/2 w-8 -translate-x-1/2"><Cherry className="h-auto w-full" /></div>
          <div className="absolute top-0 left-[34%] h-3 w-3 rounded-full bg-fragola" />
          <div className="absolute top-0 right-[34%] h-3 w-3 rounded-full bg-mirtillo" />
        </>
      );
    // flowers
    return (
      <>
        <div className="absolute -top-2 left-1/2 -translate-x-1/2"><Flower /></div>
        <div className="absolute top-0 left-[32%] scale-75"><Flower /></div>
        <div className="absolute top-0 right-[32%] scale-75"><Flower /></div>
      </>
    );
  }, [sel.topping.topper]);

  return (
    // Fixed-height stage reserves room for the largest (24+) cake so scaling it
    // up can never spill into the card edge or the option pills below. The cake
    // grows upward from a fixed plate baseline (origin-bottom + items-end) into
    // that reserved headroom, and the base width is held small on phones so even
    // the XL size clears the narrowest screens.
    <div className="flex h-56 items-end justify-center sm:h-64">
      <div ref={wrap} className="relative flex items-end justify-center">
        <div
          className="relative w-40 origin-bottom sm:w-52"
          style={{ transform: `scale(${sel.size.scale})` }}
        >
          {toppers}
          <svg viewBox="0 0 224 180" className="h-auto w-full drop-shadow-xl" xmlns="http://www.w3.org/2000/svg">
            {/* plate */}
            <ellipse cx="112" cy="168" rx="104" ry="12" fill="#000" opacity="0.12" />
            {/* top tier */}
            <rect x="74" y="36" width="76" height="40" rx="8" fill={sel.base.color} />
            {/* frosting drip on top tier */}
            <path d="M70 44 Q74 36 80 40 Q86 34 92 40 Q98 34 104 40 Q112 34 120 40 Q128 34 134 40 Q142 34 148 40 Q154 36 158 44 L158 30 Q112 18 70 30 Z" fill={sel.topping.color} stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
            <ellipse cx="114" cy="28" rx="44" ry="9" fill={sel.topping.color} />
            {/* bottom tier */}
            <rect x="36" y="92" width="152" height="64" rx="12" fill={sel.base.color} />
            {/* filling stripe */}
            <rect x="36" y="118" width="152" height="12" fill={sel.filling.color} opacity="0.95" />
            {/* frosting drip on bottom tier */}
            <path d="M32 100 Q40 90 48 96 Q56 88 64 96 Q72 88 80 96 Q88 88 96 96 Q104 88 112 96 Q120 88 128 96 Q136 88 144 96 Q152 88 160 96 Q168 88 176 96 Q184 90 192 100 L192 84 Q112 70 32 84 Z" fill={sel.topping.color} stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
            <ellipse cx="112" cy="84" rx="78" ry="11" fill={sel.topping.color} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Flower() {
  return (
    <svg viewBox="0 0 30 30" className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g fill="#F7A9C7">
        <circle cx="15" cy="7" r="5" />
        <circle cx="23" cy="15" r="5" />
        <circle cx="15" cy="23" r="5" />
        <circle cx="7" cy="15" r="5" />
      </g>
      <circle cx="15" cy="15" r="4" fill="#F4C95D" />
    </svg>
  );
}

