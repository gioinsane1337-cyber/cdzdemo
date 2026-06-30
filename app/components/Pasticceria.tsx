"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * The pastry counter. Each dolce gets a full editorial row that assembles on
 * scroll — the illustration wipes in behind a sugar-coloured mask while the
 * copy rises line by line, alternating sides down the page.
 */

const DOLCI = [
  {
    name: "Tette delle Monache",
    tag: "La specialità di Turi",
    desc: "Soffice pan di Spagna a cupola, dentro una nuvola di crema, sotto una neve di zucchero a velo. Il dolce simbolo del nostro paese — qui, fatto come una volta.",
    detail: "Ricetta della tradizione turese",
    art: <TetteDelleMonache />,
    bg: "#F4E4C1",
  },
  {
    name: "Pasticciotto",
    tag: "Frolla e crema, ancora tiepido",
    desc: "Guscio di pasta frolla dorato e lucido, colmo di crema pasticcera vellutata. Da gustare appena sfornato, quando profuma ancora di forno. Anche all'amarena.",
    detail: "Sfornato più volte al giorno",
    art: <Pasticciotto />,
    bg: "#EAD9C0",
  },
  {
    name: "Sporcamuss",
    tag: "Si mangia e ci si sporca, felicemente",
    desc: "Quadrotti di pasta sfoglia caldi e fragranti, riempiti di crema e sommersi di zucchero a velo. Il nome lo dice: impossibile mangiarne uno senza sporcarsi il muso.",
    detail: "Crema racchiusa tra due sfoglie",
    art: <Sporcamuss />,
    bg: "#F6C9C2",
  },
  {
    name: "Cornetto Sfogliato",
    tag: "Sfoglie di burro, ore di pazienza",
    desc: "Settantadue ore di lavorazione per una sfoglia che si schiude in mille strati. Vuoto, alla crema, all'amarena o al pistacchio di Bronte.",
    detail: "Lievitazione naturale 72h",
    art: <Cornetto />,
    bg: "#CFE3A8",
  },
];

export default function Pasticceria() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".dolce-row").forEach((row) => {
          const tl = gsap.timeline({
            scrollTrigger: { trigger: row, start: "top 78%" },
          });
          tl.fromTo(
            row.querySelector(".dolce-art"),
            { clipPath: "inset(0 0 100% 0)", y: 40 },
            { clipPath: "inset(0 0 0% 0)", y: 0, duration: 0.9, ease: "power3.out" }
          )
            .from(
              row.querySelectorAll(".dolce-line"),
              { y: 26, autoAlpha: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" },
              "-=0.5"
            );
        });
      });
    },
    { scope: root }
  );

  return (
    <section id="pasticceria" ref={root} className="relative bg-cream py-24 md:py-32">
      <div className="container-rail">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">
            <span className="h-px w-8 bg-terracotta" />
            La Pasticceria
            <span className="h-px w-8 bg-terracotta" />
          </p>
          <h2 className="mt-4 font-display text-[clamp(2.2rem,5vw,3.8rem)] font-bold leading-[1.02] text-cioccolato">
            E poi, ci sono i <span className="italic">dolci</span>
          </h2>
          <p className="mt-4 text-cioccolato-soft">
            Lievitati, frolle e creme della tradizione pugliese. Tutto ciò che esce dal nostro
            laboratorio, ogni giorno, con le mani in pasta dall'alba.
          </p>
        </div>

        <div className="mt-16 space-y-20 md:space-y-28">
          {DOLCI.map((d, i) => (
            <article
              key={d.name}
              className={`dolce-row grid items-center gap-8 md:grid-cols-2 md:gap-14 ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="dolce-art flex justify-center">
                <div
                  className="flex h-64 w-64 items-center justify-center rounded-[2.5rem] shadow-soft sm:h-72 sm:w-72"
                  style={{ background: `radial-gradient(120% 120% at 30% 20%, #FFFDF8, ${d.bg})` }}
                >
                  <div className="w-44">{d.art}</div>
                </div>
              </div>

              <div className={i % 2 === 1 ? "md:pr-6 md:text-right" : "md:pl-6"}>
                <p className="dolce-line text-xs font-semibold uppercase tracking-label text-terracotta">
                  0{i + 1} — {d.tag}
                </p>
                <h3 className="dolce-line mt-3 font-display text-3xl font-bold text-cioccolato md:text-4xl">
                  {d.name}
                </h3>
                <p className="dolce-line mt-4 max-w-md text-cioccolato-soft md:ml-auto">{d.desc}</p>
                <p
                  className={`dolce-line mt-5 inline-flex items-center gap-2 rounded-full bg-panna px-4 py-2 text-sm text-cioccolato-soft shadow-soft ${
                    i % 2 === 1 ? "md:ml-auto" : ""
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-pistacchio" />
                  {d.detail}
                </p>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-20 text-center font-display text-xl italic text-cioccolato-soft">
          …e tanto altro al banco. Vieni a curiosare.
        </p>
      </div>
    </section>
  );
}

/* ---------------- pastry illustrations ---------------- */

function TetteDelleMonache() {
  return (
    <svg viewBox="0 0 200 150" className="h-auto w-full drop-shadow-md" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="tm-dome" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F3E9D7" />
        </linearGradient>
        <linearGradient id="tm-base" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EAC892" />
          <stop offset="100%" stopColor="#CFA260" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="132" rx="74" ry="12" fill="#000" opacity="0.1" />
      {/* soft sponge base */}
      <path d="M34 116 Q34 96 100 96 Q166 96 166 116 Q166 126 100 128 Q34 126 34 116 Z" fill="url(#tm-base)" />
      {/* cream dome */}
      <path d="M44 104 Q52 40 100 40 Q148 40 156 104 Q128 114 100 114 Q72 114 44 104 Z" fill="url(#tm-dome)" />
      {/* cream seam where dome meets sponge */}
      <path d="M52 102 Q100 110 148 102" stroke="#F3D9A8" strokeWidth="3" fill="none" opacity="0.6" />
      {/* dusting of icing sugar */}
      <g fill="#FFFFFF" opacity="0.9">
        <circle cx="80" cy="58" r="2" /><circle cx="100" cy="50" r="2.2" /><circle cx="120" cy="60" r="2" />
        <circle cx="92" cy="72" r="1.6" /><circle cx="112" cy="74" r="1.6" /><circle cx="72" cy="78" r="1.6" />
        <circle cx="128" cy="80" r="1.6" /><circle cx="100" cy="66" r="1.6" />
      </g>
      <ellipse cx="84" cy="64" rx="14" ry="8" fill="#fff" opacity="0.5" />
    </svg>
  );
}

function Cornetto() {
  return (
    <svg viewBox="0 0 200 150" className="h-auto w-full drop-shadow-md" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="cr2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EEC07A" />
          <stop offset="100%" stopColor="#C68A46" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="120" rx="80" ry="14" fill="#000" opacity="0.1" />
      <path d="M24 96 Q40 60 70 70 Q100 50 130 70 Q160 60 176 96 Q150 112 100 112 Q50 112 24 96 Z" fill="url(#cr2)" />
      {/* flaky layers */}
      <g stroke="#A86E36" strokeWidth="2.5" fill="none" opacity="0.6" strokeLinecap="round">
        <path d="M44 90 Q56 74 70 80" />
        <path d="M74 84 Q90 66 104 80" />
        <path d="M108 80 Q124 68 140 84" />
        <path d="M142 84 Q156 80 166 92" />
      </g>
      <ellipse cx="70" cy="80" rx="8" ry="4" fill="#fff" opacity="0.4" />
    </svg>
  );
}

function Pasticciotto() {
  return (
    <svg viewBox="0 0 200 150" className="h-auto w-full drop-shadow-md" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="pt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E7B978" />
          <stop offset="100%" stopColor="#B97E3C" />
        </linearGradient>
        <radialGradient id="pt-shine" cx="35%" cy="22%" r="60%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="100" cy="118" rx="82" ry="13" fill="#000" opacity="0.1" />
      {/* oval domed shortcrust */}
      <path d="M30 94 Q30 56 100 56 Q170 56 170 94 Q170 108 100 108 Q30 108 30 94 Z" fill="url(#pt)" />
      {/* lower rim shadow */}
      <path d="M30 94 Q30 106 100 108 Q170 106 170 94 Q170 102 100 104 Q30 102 30 94 Z" fill="#9A6630" opacity="0.5" />
      {/* glossy top */}
      <path d="M30 94 Q30 56 100 56 Q170 56 170 94 Q170 108 100 108 Q30 108 30 94 Z" fill="url(#pt-shine)" />
      {/* a peek of crema */}
      <path d="M86 68 q14 -8 28 0 q-6 9 -14 9 q-8 0 -14 -9 z" fill="#F6D873" />
      <ellipse cx="70" cy="74" rx="12" ry="6" fill="#fff" opacity="0.3" />
    </svg>
  );
}

function Sporcamuss() {
  return (
    <svg viewBox="0 0 200 150" className="h-auto w-full drop-shadow-md" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="sm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EFC988" />
          <stop offset="100%" stopColor="#CFA15C" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="124" rx="76" ry="12" fill="#000" opacity="0.1" />
      {/* bottom puff layer */}
      <rect x="46" y="92" width="108" height="26" rx="5" fill="url(#sm)" />
      {/* custard oozing between the layers */}
      <path d="M52 92 Q60 78 76 86 Q92 74 108 86 Q124 76 140 86 Q150 82 148 92 Z" fill="#F6D873" />
      <ellipse cx="60" cy="92" rx="8" ry="6" fill="#FBE9A6" />
      <ellipse cx="138" cy="92" rx="8" ry="6" fill="#FBE9A6" />
      {/* top puff layer */}
      <rect x="50" y="64" width="100" height="26" rx="5" fill="url(#sm)" />
      {/* flaky scoring */}
      <g stroke="#A86E36" strokeWidth="2" opacity="0.5" strokeLinecap="round">
        <path d="M66 70 L66 84" /><path d="M84 70 L84 84" /><path d="M100 70 L100 84" />
        <path d="M116 70 L116 84" /><path d="M134 70 L134 84" />
      </g>
      {/* heavy icing-sugar dusting */}
      <g fill="#FFFFFF" opacity="0.95">
        <circle cx="70" cy="68" r="2" /><circle cx="88" cy="66" r="2.2" /><circle cx="106" cy="67" r="2" />
        <circle cx="124" cy="66" r="2.1" /><circle cx="138" cy="69" r="1.8" />
        <circle cx="80" cy="74" r="1.5" /><circle cx="116" cy="74" r="1.5" />
      </g>
    </svg>
  );
}
