"use client";

import { Crystal, Sparkle } from "./Illustrations";

/**
 * Very slow, low-key ambient layer: sugar crystals that drift and twinkle
 * behind the content. Positions are a fixed table (not Math.random) so server
 * and client markup match and there is no hydration flicker.
 *
 * Pointer-events are off and the whole layer is aria-hidden; it is purely
 * atmospheric and is fully stilled under prefers-reduced-motion (see globals).
 */

const crystals = [
  { left: "6%", top: "18%", size: 26, delay: 0, dur: 11, tone: "#F4C95D" },
  { left: "88%", top: "12%", size: 18, delay: 1.5, dur: 9, tone: "#E85D75" },
  { left: "78%", top: "62%", size: 30, delay: 0.8, dur: 13, tone: "#6C77C4" },
  { left: "14%", top: "72%", size: 20, delay: 2.2, dur: 10, tone: "#7BC96F" },
  { left: "46%", top: "8%", size: 16, delay: 3, dur: 12, tone: "#F4C95D" },
  { left: "94%", top: "40%", size: 22, delay: 1.1, dur: 8.5, tone: "#F4C95D" },
  { left: "32%", top: "44%", size: 14, delay: 2.7, dur: 11.5, tone: "#8FD9C7" },
  { left: "62%", top: "84%", size: 24, delay: 0.4, dur: 10.5, tone: "#E85D75" },
];

const sparkles = [
  { left: "24%", top: "30%", size: 14, delay: 0.2, dur: 2.6 },
  { left: "70%", top: "24%", size: 10, delay: 1.2, dur: 3 },
  { left: "52%", top: "66%", size: 12, delay: 0.7, dur: 2.2 },
  { left: "9%", top: "52%", size: 9, delay: 1.8, dur: 2.8 },
  { left: "85%", top: "78%", size: 13, delay: 0.5, dur: 3.2 },
];

export default function AmbientCrystals() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {crystals.map((c, i) => (
        <div
          key={`c-${i}`}
          className="absolute animate-float-crystal will-change-transform"
          style={{
            left: c.left,
            top: c.top,
            width: c.size,
            animationDelay: `${c.delay}s`,
            animationDuration: `${c.dur}s`,
          }}
        >
          <Crystal tone={c.tone} className="h-auto w-full opacity-60 drop-shadow-sm" />
        </div>
      ))}
      {sparkles.map((s, i) => (
        <div
          key={`s-${i}`}
          className="absolute animate-sparkle will-change-transform"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.dur}s`,
          }}
        >
          <Sparkle className="h-auto w-full" />
        </div>
      ))}
    </div>
  );
}
