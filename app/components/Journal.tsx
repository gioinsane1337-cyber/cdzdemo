"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { VignetteAlba, VignetteOliva, VignettePistacchio, IconArrow } from "./Illustrations";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STORIES = [
  {
    tag: "Il Mestiere",
    date: "Maggio 2026",
    title: "Perché mantechiamo all'alba",
    excerpt:
      "Ogni mattina, prima che Turi si svegli, la mantecatrice gira lenta. Il gelato fresco dura poche ore al suo apice — e noi lo vogliamo servire proprio lì.",
    accent: "#7BC96F",
    Art: VignetteAlba,
  },
  {
    tag: "Le Radici",
    date: "Aprile 2026",
    title: "Una bottega nel cuore di Turi",
    excerpt:
      "Una bottega di paese, le ricette di famiglia e gli ingredienti dei piccoli produttori della Murgia. La nostra storia è fatta di mani, non di macchine.",
    accent: "#E85D75",
    Art: VignetteOliva,
  },
  {
    tag: "Gli Ingredienti",
    date: "Marzo 2026",
    title: "Caccia al pistacchio perfetto",
    excerpt:
      "Siamo andati fino a Bronte, alle pendici dell'Etna, per scegliere il nostro pistacchio. Tostatura corta, macinatura a pietra: il verde non si inventa.",
    accent: "#F4C95D",
    Art: VignettePistacchio,
  },
];

export default function Journal() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // `immediateRender: false` is deliberate. With a plain `gsap.from`, the
        // hidden start state is painted on load and only lifted when the trigger
        // fires — so if a ScrollTrigger is mis-measured (this section sits last,
        // behind the pinned hero's spacer, and its start was landing past the
        // page's max scroll), onEnter never runs and the whole section is
        // stranded blank. `fromTo` + `immediateRender: false` flips the failure
        // mode: the content's resting state is fully visible, and the hide→fade
        // only happens the moment the reveal actually plays. Worst case is "no
        // animation", never "blank page". `once` keeps it a clean one-way reveal.
        gsap.fromTo(
          ".jr-head > *",
          { y: 24, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: { trigger: ".jr-head", start: "top 85%", once: true },
          }
        );
        gsap.fromTo(
          ".jr-card",
          { y: 40, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: { trigger: ".jr-grid", start: "top 85%", once: true },
          }
        );
      });
    },
    { scope: root }
  );

  return (
    <section id="diario" ref={root} className="relative bg-cream py-24 md:py-32">
      <div className="container-rail">
        <div className="jr-head flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl text-center md:text-left">
            <p className="eyebrow justify-center md:justify-start">
              <span className="h-px w-8 bg-terracotta" />
              Il Diario
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,5vw,3.8rem)] font-bold leading-[1.02] text-cioccolato">
              Storie di <span className="italic">zucchero</span> e pazienza
            </h2>
          </div>
          <p className="max-w-sm text-center text-cioccolato-soft md:text-right">
            Piccole cronache dal laboratorio: il nostro modo di fare le cose, una alla volta.
          </p>
        </div>

        <div className="jr-grid mt-12 grid gap-6 md:grid-cols-3">
          {STORIES.map((s) => (
            <article
              key={s.title}
              className="jr-card group flex flex-col overflow-hidden rounded-3xl bg-panna shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-scoop"
            >
              <div
                className="relative flex h-40 items-center justify-center"
                style={{ background: `radial-gradient(120% 120% at 30% 20%, #FFFDF8, ${s.accent}55)` }}
              >
                <s.Art className="h-24 w-auto transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-2" />
                <span className="absolute left-4 top-4 rounded-full bg-cream/80 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-cioccolato">
                  {s.tag}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs text-cioccolato-soft">{s.date}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-cioccolato">{s.title}</h3>
                <p className="mt-3 flex-1 text-sm text-cioccolato-soft">{s.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-terracotta">
                  Leggi la storia
                  <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
