"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

/**
 * A hairline reading-progress bar pinned to the very top edge, plus a little
 * housekeeping: once web fonts have swapped in and the window has fully loaded,
 * we ask ScrollTrigger to recompute pin positions so nothing drifts.
 */
export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bar.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? h.scrollTop / max : 0;
      el.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // Recalculate scroll-driven layouts after fonts/images settle.
    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts?.ready) document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("load", refresh);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[140] h-1" aria-hidden="true">
      <div
        ref={bar}
        className="h-full origin-left scale-x-0 bg-gradient-to-r from-fragola via-oro to-pistacchio"
      />
    </div>
  );
}
