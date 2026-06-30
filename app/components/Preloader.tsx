"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { WaffleCone, Scoop, Crystal } from "./Illustrations";

/**
 * Opening curtain: a scoop is placed onto a cone, a few crystals pop, then the
 * cream curtain lifts to reveal the hero. Scroll is locked while it runs.
 *
 * Under prefers-reduced-motion the whole thing collapses to a quick, still
 * fade so nobody is forced to watch an animation they opted out of.
 */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  // Lock scroll while the curtain is up.
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const finish = () => {
        document.body.style.overflow = "";
        setHidden(true);
      };

      if (reduce) {
        gsap.to(root.current, { autoAlpha: 0, duration: 0.4, delay: 0.5, onComplete: finish });
        return;
      }

      const tl = gsap.timeline({ onComplete: finish });
      tl.from(".pl-cone", { y: 40, autoAlpha: 0, duration: 0.5, ease: "back.out(1.6)" })
        .from(".pl-scoop", { y: 120, autoAlpha: 0, duration: 0.7, ease: "back.out(1.5)" }, "-=0.1")
        .from(
          ".pl-crystal",
          { scale: 0, autoAlpha: 0, duration: 0.4, stagger: 0.08, ease: "back.out(2)" },
          "-=0.3"
        )
        .from(".pl-word", { y: 16, autoAlpha: 0, duration: 0.5, stagger: 0.08 }, "-=0.3")
        .to(".pl-bar-fill", { scaleX: 1, duration: 0.9, ease: "power1.inOut" }, "-=0.7")
        .to({}, { duration: 0.25 })
        .to(".pl-stage", { y: -30, autoAlpha: 0, duration: 0.5, ease: "power2.in" })
        .to(root.current, { yPercent: -100, duration: 0.7, ease: "power3.inOut" }, "-=0.15");
    },
    { scope: root }
  );

  if (hidden) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-cream"
      role="status"
      aria-live="polite"
      aria-label="Caricamento in corso"
    >
      <div className="pl-stage flex flex-col items-center">
        <div className="relative h-56 w-48">
          {/* crystals pop around the scoop */}
          <div className="pl-crystal absolute left-2 top-6 w-6">
            <Crystal tone="#F4C95D" className="h-auto w-full" />
          </div>
          <div className="pl-crystal absolute right-3 top-2 w-5">
            <Crystal tone="#E85D75" className="h-auto w-full" />
          </div>
          <div className="pl-crystal absolute right-0 top-24 w-7">
            <Crystal tone="#6C77C4" className="h-auto w-full" />
          </div>
          {/* scoop sits on the cone */}
          <div className="pl-scoop absolute left-1/2 top-3 w-36 -translate-x-1/2">
            <Scoop base="#7BC96F" highlight="#A7E29B" speck="#4F7A3F" speckStyle="dot" className="h-auto w-full drop-shadow-md" />
          </div>
          <div className="pl-cone absolute bottom-0 left-1/2 w-28 -translate-x-1/2">
            <WaffleCone className="h-auto w-full" />
          </div>
        </div>

        <p className="mt-6 overflow-hidden font-display text-2xl text-cioccolato">
          {"Cristalli di Zucchero".split(" ").map((w, i) => (
            <span key={i} className="pl-word mr-2 inline-block">
              {w}
            </span>
          ))}
        </p>

        {/* progress hairline */}
        <div className="mt-5 h-px w-40 overflow-hidden bg-cioccolato/15">
          <div className="pl-bar-fill h-full origin-left scale-x-0 bg-terracotta" />
        </div>
      </div>
      <span className="sr-only-custom">Caricamento di Cristalli di Zucchero</span>
    </div>
  );
}
