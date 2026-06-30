"use client";

import { useId, type ReactNode } from "react";

/**
 * Hand-authored SVG gelato primitives.
 *
 * Everything edible on the site is drawn here so it can be themed, layered and
 * animated as real DOM/SVG rather than flat images. Each component generates
 * unique gradient ids via useId() so multiple instances never collide.
 *
 * To swap in real photography later, these are the components to replace —
 * each accepts a className and sensible sizing, so a <Image> can drop in.
 */

type ScoopProps = {
  base: string;
  highlight: string;
  speck?: string;
  speckStyle?: "chip" | "dot" | "none";
  className?: string;
};

/** A single gelato scoop — a soft mound with a glossy top and a rippled base. */
export function Scoop({
  base,
  highlight,
  speck = "#3C2F2F",
  speckStyle = "none",
  className,
}: ScoopProps) {
  const raw = useId();
  const uid = raw.replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 200 162"
      className={className}
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id={`scoop-${uid}`} cx="38%" cy="30%" r="80%">
          <stop offset="0%" stopColor={highlight} />
          <stop offset="55%" stopColor={base} />
          <stop offset="100%" stopColor={base} />
        </radialGradient>
        <linearGradient id={`gloss-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M100,12 C152,12 190,58 188,104 C187,128 170,150 150,150 C138,150 132,142 120,144 C110,146 106,152 96,151 C86,150 82,143 72,144 C60,145 54,151 44,149 C26,146 13,128 12,104 C10,58 48,12 100,12 Z"
        fill={`url(#scoop-${uid})`}
      />
      {/* glossy crown */}
      <ellipse cx="78" cy="48" rx="46" ry="26" fill={`url(#gloss-${uid})`} opacity="0.9" />
      {/* chocolate chips / fruit specks */}
      {speckStyle === "chip" && (
        <g fill={speck}>
          <path d="M70 70 l9 4 -3 8 -8 -2 z" />
          <path d="M120 60 l7 6 -5 6 -6 -4 z" />
          <path d="M96 96 l8 3 -2 7 -7 -2 z" />
          <path d="M138 92 l6 5 -4 5 -5 -3 z" />
          <path d="M58 104 l7 3 -3 6 -6 -2 z" />
        </g>
      )}
      {speckStyle === "dot" && (
        <g fill={speck} opacity="0.85">
          <circle cx="74" cy="74" r="3.2" />
          <circle cx="118" cy="62" r="2.6" />
          <circle cx="98" cy="100" r="3" />
          <circle cx="140" cy="92" r="2.4" />
          <circle cx="60" cy="108" r="2.8" />
          <circle cx="112" cy="118" r="2.5" />
        </g>
      )}
    </svg>
  );
}

/** Crisp waffle cone (cialda). */
export function WaffleCone({ className }: { className?: string }) {
  const raw = useId();
  const uid = raw.replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 160 210"
      className={className}
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`cone-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E6B877" />
          <stop offset="50%" stopColor="#D49A55" />
          <stop offset="100%" stopColor="#A86E36" />
        </linearGradient>
        <pattern
          id={`waffle-${uid}`}
          width="18"
          height="18"
          patternTransform="rotate(45)"
          patternUnits="userSpaceOnUse"
        >
          <rect width="18" height="18" fill="transparent" />
          <line x1="0" y1="0" x2="0" y2="18" stroke="#8A5A2B" strokeWidth="1.4" opacity="0.5" />
          <line x1="9" y1="0" x2="9" y2="18" stroke="#8A5A2B" strokeWidth="1.4" opacity="0.5" />
        </pattern>
      </defs>
      <path d="M14 8 L146 8 L80 202 Z" fill={`url(#cone-${uid})`} />
      <path d="M14 8 L146 8 L80 202 Z" fill={`url(#waffle-${uid})`} />
      {/* rolled rim */}
      <rect x="10" y="4" width="140" height="14" rx="7" fill="#E6B877" />
      <rect x="10" y="4" width="140" height="14" rx="7" fill={`url(#waffle-${uid})`} opacity="0.6" />
    </svg>
  );
}

/** A gelato cup (coppetta). */
export function Coppetta({ className }: { className?: string }) {
  const raw = useId();
  const uid = raw.replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 220 150"
      className={className}
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`cup-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFDF8" />
          <stop offset="100%" stopColor="#EAD9C0" />
        </linearGradient>
      </defs>
      <path d="M22 24 L198 24 L176 132 Q174 142 164 142 L56 142 Q46 142 44 132 Z" fill={`url(#cup-${uid})`} />
      <ellipse cx="110" cy="24" rx="90" ry="18" fill="#FFFDF8" />
      <ellipse cx="110" cy="24" rx="90" ry="18" fill="none" stroke="#E2CBAB" strokeWidth="2" />
      <ellipse cx="110" cy="24" rx="74" ry="13" fill="#EFE7DA" />
    </svg>
  );
}

/** A round waffle wafer used as a flat base layer. */
export function WaffleBase({ className }: { className?: string }) {
  const raw = useId();
  const uid = raw.replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 240 70"
      className={className}
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`base-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E6B877" />
          <stop offset="100%" stopColor="#B97F3F" />
        </linearGradient>
        <pattern id={`bw-${uid}`} width="16" height="16" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="16" y2="0" stroke="#8A5A2B" strokeWidth="1.2" opacity="0.45" />
          <line x1="0" y1="8" x2="16" y2="8" stroke="#8A5A2B" strokeWidth="1.2" opacity="0.45" />
          <line x1="0" y1="0" x2="0" y2="16" stroke="#8A5A2B" strokeWidth="1.2" opacity="0.45" />
          <line x1="8" y1="0" x2="8" y2="16" stroke="#8A5A2B" strokeWidth="1.2" opacity="0.45" />
        </pattern>
      </defs>
      <ellipse cx="120" cy="40" rx="116" ry="26" fill={`url(#base-${uid})`} />
      <ellipse cx="120" cy="40" rx="116" ry="26" fill={`url(#bw-${uid})`} />
      <ellipse cx="120" cy="32" rx="116" ry="24" fill="#F0C98C" opacity="0.55" />
      <ellipse cx="120" cy="32" rx="116" ry="24" fill={`url(#bw-${uid})`} opacity="0.6" />
    </svg>
  );
}

/**
 * A glossy chocolate-sauce cap that drapes over a scoop, with drips running
 * down its lower edge. Warm, dimensional chocolate — not a flat dark slab.
 */
export function SauceDrip({
  color = "#5C3A1E",
  className,
}: {
  color?: string;
  className?: string;
}) {
  const raw = useId();
  const uid = raw.replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 200 92"
      className={className}
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`sauce-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7B5230" />
          <stop offset="45%" stopColor={color} />
          <stop offset="100%" stopColor="#3C2410" />
        </linearGradient>
      </defs>
      {/* domed cap that follows the scoop crown, with hand-poured drips below */}
      <path
        d="M18 46 Q18 14 100 14 Q182 14 182 46 L182 52 Q180 70 168 68 Q165 88 155 88 Q146 88 144 64 Q120 72 100 66 Q80 72 60 64 Q56 86 46 86 Q37 86 35 64 Q22 60 18 52 Z"
        fill={`url(#sauce-${uid})`}
      />
      {/* sheen */}
      <ellipse cx="66" cy="32" rx="34" ry="9" fill="#fff" opacity="0.26" />
    </svg>
  );
}

/** A faceted sugar crystal. */
export function Crystal({
  className,
  tone = "#F4C95D",
}: {
  className?: string;
  tone?: string;
}) {
  const raw = useId();
  const uid = raw.replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 40 48"
      className={className}
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`cr-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="45%" stopColor={tone} />
          <stop offset="100%" stopColor={tone} stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <path d="M20 1 L33 16 L26 46 L14 46 L7 16 Z" fill={`url(#cr-${uid})`} />
      <path d="M20 1 L20 46" stroke="#fff" strokeWidth="1" opacity="0.6" />
      <path d="M7 16 L33 16" stroke="#fff" strokeWidth="1" opacity="0.5" />
      <path d="M20 1 L7 16 M20 1 L33 16" stroke="#fff" strokeWidth="0.8" opacity="0.5" />
    </svg>
  );
}

/** A four-point sparkle / twinkle. */
export function Sparkle({ className, color = "#F4C95D" }: { className?: string; color?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 0 C13 7 17 11 24 12 C17 13 13 17 12 24 C11 17 7 13 0 12 C7 11 11 7 12 0 Z"
        fill={color}
      />
    </svg>
  );
}

/** A glossy cherry with stem. */
export function Cherry({ className }: { className?: string }) {
  const raw = useId();
  const uid = raw.replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 60 70"
      className={className}
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id={`ch-${uid}`} cx="38%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#F4708A" />
          <stop offset="60%" stopColor="#D7324F" />
          <stop offset="100%" stopColor="#9E1B33" />
        </radialGradient>
      </defs>
      <path d="M30 10 C30 24 44 22 48 14" stroke="#7A4B2A" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M48 14 q8 -8 14 -4 q-4 8 -12 8 z" fill="#7BC96F" />
      <circle cx="26" cy="48" r="18" fill={`url(#ch-${uid})`} />
      <ellipse cx="20" cy="42" rx="6" ry="4" fill="#fff" opacity="0.5" />
    </svg>
  );
}

/* ------------------------------------------------------------------ *
 * Line-icon family
 *
 * One coherent set, all drawn on a 24×24 grid with a 1.6 stroke that
 * inherits `currentColor`, so they sit quietly beside the uppercase
 * labels instead of reading as borrowed emoji. Decorative by default
 * (aria-hidden); the consuming element carries the accessible label.
 * Brand marks (Instagram/Facebook/star) are filled, since outline
 * glyphs lose their identity at 16–20px.
 * ------------------------------------------------------------------ */

type IconProps = { className?: string };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Icon({ className, children }: IconProps & { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      {children}
    </svg>
  );
}

export const IconPin = ({ className }: IconProps) => (
  <Icon className={className}>
    <path d="M12 21c4-4.4 6-7.7 6-10.4A6 6 0 0 0 6 10.6C6 13.3 8 16.6 12 21Z" />
    <circle cx="12" cy="10.6" r="2.3" />
  </Icon>
);

export const IconPhone = ({ className }: IconProps) => (
  <Icon className={className}>
    <path d="M5 4.5h3.1L9.5 8 7.6 9.4a10.5 10.5 0 0 0 4.9 4.9L14 12.4l3.5 1.4v3.1a1.8 1.8 0 0 1-2 1.8A14.5 14.5 0 0 1 3.2 6.5a1.8 1.8 0 0 1 1.8-2Z" />
  </Icon>
);

export const IconMail = ({ className }: IconProps) => (
  <Icon className={className}>
    <rect x="3.2" y="5.5" width="17.6" height="13" rx="2.4" />
    <path d="m4.4 7.4 7.6 5.2 7.6-5.2" />
  </Icon>
);

export const IconChat = ({ className }: IconProps) => (
  <Icon className={className}>
    <path d="M20.5 11.4a7.5 7.5 0 0 1-10.9 6.7L4.5 19.5l1.4-4.8A7.5 7.5 0 1 1 20.5 11.4Z" />
    <path d="M9 11.4h.01M12 11.4h.01M15 11.4h.01" />
  </Icon>
);

export const IconSearch = ({ className }: IconProps) => (
  <Icon className={className}>
    <circle cx="11" cy="11" r="6.2" />
    <path d="m19.8 19.8-3.6-3.6" />
  </Icon>
);

export const IconClose = ({ className }: IconProps) => (
  <Icon className={className}>
    <path d="m6.6 6.6 10.8 10.8M17.4 6.6 6.6 17.4" />
  </Icon>
);

export const IconArrow = ({ className }: IconProps) => (
  <Icon className={className}>
    <path d="M4.5 12h14M13 6.5 18.5 12 13 17.5" />
  </Icon>
);

export const IconLeaf = ({ className }: IconProps) => (
  <Icon className={className}>
    <path d="M6 18C6 11 11 6 19 6c0 8-5 13-13 13Z" />
    <path d="M6 18 18 7.5" />
  </Icon>
);

export const IconHeart = ({ className }: IconProps) => (
  <Icon className={className}>
    <path d="M12 20S5 15.7 5 10.8A4 4 0 0 1 12 8.2 4 4 0 0 1 19 10.8C19 15.7 12 20 12 20Z" />
  </Icon>
);

export const IconGelato = ({ className }: IconProps) => (
  <Icon className={className}>
    <path d="M8 9.5a4 4 0 0 1 8 0" />
    <path d="M6.6 9.5h10.8" />
    <path d="M7.6 9.8 12 21l4.4-11.2" />
  </Icon>
);

export const IconWhisk = ({ className }: IconProps) => (
  <Icon className={className}>
    <path d="M12 3v8.5" />
    <path d="M8.5 11.5c0 4 1.6 6.5 3.5 6.5s3.5-2.5 3.5-6.5Z" />
    <path d="M12 11.5V18M9.7 11.7c.3 3.4 1 5.4 2.3 6.3M14.3 11.7c-.3 3.4-1 5.4-2.3 6.3" />
    <path d="M11 18.2h2l-.4 2.3h-1.2Z" />
  </Icon>
);

export const IconCake = ({ className }: IconProps) => (
  <Icon className={className}>
    <path d="M4.5 20.5h15" />
    <path d="M6 20.5V13h12v7.5" />
    <path d="M6 13.4c1.3 1.4 2.7 1.4 4 0 1.3 1.4 2.7 1.4 4 0 1.3 1.4 2.7 1.4 4 0" />
    <path d="M12 6.6v3.2" />
    <circle cx="12" cy="5.4" r="1" />
  </Icon>
);

/* Brand marks — filled, since outlines lose legibility at small sizes. */
export const IconInstagram = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="3.8" />
    <circle cx="16.9" cy="7.1" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const IconFacebook = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.5 21v-7.8h2.6l.5-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5h1.6V3.7c-.8-.1-1.7-.2-2.6-.2-2.4 0-4 1.5-4 4.1v2.3H7.3v3.1h2.8V21h3.4Z" />
  </svg>
);

export const IconStar = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3.4l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.7l-5.2 2.7 1-5.8L3.6 9.5l5.8-.8L12 3.4Z" />
  </svg>
);

/* ------------------------------------------------------------------ *
 * Journal vignettes — three small bespoke scenes that replace the
 * giant focal emoji on the diary cards. Each is themed to its story
 * and reads on the card's accent-tinted header.
 * ------------------------------------------------------------------ */

/** Sunrise over the horizon — "perché mantechiamo all'alba". */
export function VignetteAlba({ className }: IconProps) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 120 96" className={className} role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`alba-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FBE3A0" />
          <stop offset="100%" stopColor="#F2A03F" />
        </linearGradient>
        <clipPath id={`albah-${uid}`}>
          <rect x="0" y="0" width="120" height="64" />
        </clipPath>
      </defs>
      <g stroke="#E89A3C" strokeWidth="2.6" strokeLinecap="round" opacity="0.75">
        <path d="M60 8v10" />
        <path d="M37 15l6 8" />
        <path d="M83 15l-6 8" />
        <path d="M21 32l9 4" />
        <path d="M99 32l-9 4" />
      </g>
      <circle cx="60" cy="64" r="23" fill={`url(#alba-${uid})`} clipPath={`url(#albah-${uid})`} />
      <path d="M14 64h92" stroke="#C9743A" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M22 75h30M64 75h34" stroke="#C9743A" strokeWidth="2.4" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

/** Olive sprig — "una bottega nel cuore di Turi", the Murgia roots. */
export function VignetteOliva({ className }: IconProps) {
  return (
    <svg viewBox="0 0 120 96" className={className} role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <path d="M26 76C48 66 70 60 96 26" stroke="#6E5A3A" strokeWidth="3.2" fill="none" strokeLinecap="round" />
      <g fill="#7BA05B">
        <path d="M44 62q-13-3-19-15 15-3 22 9z" />
        <path d="M62 52q-13-4-17-17 15-1 20 12z" />
        <path d="M80 40q-11-7-13-20 14 1 17 14z" />
      </g>
      <circle cx="52" cy="68" r="6.5" fill="#5C7A3A" />
      <circle cx="69" cy="59" r="6.5" fill="#46632B" />
      <ellipse cx="50" cy="66" rx="2" ry="1.4" fill="#fff" opacity="0.4" />
    </svg>
  );
}

/** Pistachio nut, shell and leaf — "caccia al pistacchio perfetto". */
export function VignettePistacchio({ className }: IconProps) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 120 96" className={className} role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={`pist-${uid}`} cx="40%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#B6D17E" />
          <stop offset="100%" stopColor="#7FA84A" />
        </radialGradient>
      </defs>
      <path d="M34 70C34 46 54 36 78 38 78 62 58 72 36 70Z" fill="#9CC36B" />
      <path d="M40 68 73 44" stroke="#6E9447" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M58 64q15-3 26 6 0 14-15 14-16 0-11-20z" fill="#E3C089" />
      <ellipse cx="71" cy="68" rx="10" ry="9" fill={`url(#pist-${uid})`} />
      <ellipse cx="67" cy="64" rx="3" ry="2.2" fill="#fff" opacity="0.45" />
    </svg>
  );
}
