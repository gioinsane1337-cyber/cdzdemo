"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { site } from "../data/site";
import { IconPin, IconPhone, IconMail, IconChat, IconArrow, IconGelato, IconWhisk, IconCake } from "./Illustrations";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TOUR = [
  { t: "Il Banco", g: "linear-gradient(135deg,#F8E6C9,#E6B877)", Icon: IconGelato },
  { t: "Il Laboratorio", g: "linear-gradient(135deg,#CFE3A8,#7BC96F)", Icon: IconWhisk },
  { t: "La Vetrina", g: "linear-gradient(135deg,#F6C9C2,#E85D75)", Icon: IconCake },
];

export default function VisitUs() {
  const root = useRef<HTMLDivElement>(null);
  const [today, setToday] = useState<number | null>(null);

  useEffect(() => {
    // JS getDay(): 0 = Sunday. Our table starts on Monday → shift.
    setToday((new Date().getDay() + 6) % 7);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".vu-reveal", {
          y: 28,
          autoAlpha: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 72%" },
        });
        // The map is never animated from a hidden state — a one-shot clip wipe
        // (or opacity fade) that gets interrupted can strand it mostly hidden and
        // looking blank. A transform-only rise means the worst case is a 24px
        // offset, never an invisible map.
        gsap.from(".vu-map", {
          y: 24,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".vu-map", start: "top 85%" },
        });
      });
    },
    { scope: root }
  );

  const closedToday = today !== null && site.hours[today].closed;

  return (
    <section id="dove-siamo" ref={root} className="relative bg-almond/40 py-24 md:py-32">
      <div className="container-rail">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Info */}
          <div>
            <p className="vu-reveal eyebrow">
              <span className="h-px w-8 bg-terracotta" />
              Dove Siamo
            </p>
            <h2 className="vu-reveal mt-4 font-display text-[clamp(2.2rem,5vw,3.8rem)] font-bold leading-[1.02] text-cioccolato">
              Vieni a dirci <span className="italic">Ciao</span>
            </h2>
            <p className="vu-reveal mt-4 max-w-md text-cioccolato-soft">
              Ci trovi nel cuore di Turi, proprio di fronte alla Villa Comunale. La porta è sempre
              aperta e profuma di buono. <span className="italic">Ti aspettiamo.</span>
            </p>

            <div className="vu-reveal mt-8 flex items-start gap-4 rounded-2xl bg-panna p-5 shadow-soft">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-terracotta/10 text-terracotta" aria-hidden="true">
                <IconPin className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-lg font-semibold text-cioccolato">{site.address.street}</p>
                <p className="text-sm text-cioccolato-soft">{site.address.city} · {site.address.country}</p>
                <a
                  href={site.address.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-terracotta hover:underline"
                >
                  Indicazioni stradali
                  <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="vu-reveal mt-6 rounded-2xl bg-panna p-5 shadow-soft">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold text-cioccolato">Orari</h3>
                {today !== null && (
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      closedToday ? "bg-fragola/15 text-fragola" : "bg-pistacchio/20 text-pistacchio"
                    }`}
                  >
                    {closedToday ? "Chiuso oggi" : "Aperto oggi"}
                  </span>
                )}
              </div>
              <ul className="divide-y divide-cioccolato/5">
                {site.hours.map((h, i) => (
                  <li
                    key={h.day}
                    className={`flex items-center justify-between py-2 text-sm ${
                      today === i ? "font-semibold text-cioccolato" : "text-cioccolato-soft"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {today === i && <span className="h-1.5 w-1.5 rounded-full bg-terracotta" aria-hidden="true" />}
                      {h.day}
                    </span>
                    <span className={h.closed ? "text-fragola" : ""}>{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="vu-reveal mt-6 flex flex-wrap gap-3">
              <a href={site.contact.phoneHref} className="btn-ghost">
                <IconPhone className="h-4 w-4" /> Chiamaci
              </a>
              <a href={`mailto:${site.contact.email}`} className="btn-ghost">
                <IconMail className="h-4 w-4" /> Scrivici
              </a>
              <a href={site.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <IconChat className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>

          {/* Map + virtual-tour strip */}
          <div className="flex flex-col gap-4">
            <div className="vu-map overflow-hidden rounded-[2rem] shadow-scoop ring-1 ring-cioccolato/10">
              <iframe
                src={site.address.mapsEmbed}
                title="Mappa di Cristalli di Zucchero, Piazza Sandro Pertini, Turi"
                className="h-[26rem] w-full lg:h-full lg:min-h-[30rem]"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            <div className="vu-reveal grid grid-cols-3 gap-3">
              {TOUR.map(({ t, g, Icon }) => (
                <div
                  key={t}
                  className="group relative flex aspect-[4/5] flex-col items-center justify-center overflow-hidden rounded-2xl text-center shadow-soft"
                  style={{ background: g }}
                >
                  <Icon className="h-9 w-9 text-cioccolato/75 transition-transform duration-500 group-hover:scale-110" />
                  <span className="mt-2 text-sm font-semibold text-cioccolato/80">{t}</span>
                  <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/10 to-transparent" />
                </div>
              ))}
            </div>
            <p className="vu-reveal text-center text-xs text-cioccolato-soft">
              Un piccolo assaggio di casa nostra · Sostituibile con foto reali del locale
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
