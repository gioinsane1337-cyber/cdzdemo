"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { site } from "../data/site";
import AmbientCrystals from "./AmbientCrystals";
import { WaffleCone, Scoop, Cherry, Crystal } from "./Illustrations";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * THE hero — and the signature mechanic in one. You land on the finished
 * gelato; as you scroll, the headline hands over to a "parts list" and that
 * very same gelato is taken apart into its real layers — amarena, fragola,
 * stracciatella, pistacchio, cialda — sliding straight out along the centre
 * axis. One dessert, disassembled live as you read its anatomy.
 *
 * The LAYERS are listed top → bottom: the order they sit in the cone, and the
 * order they peel apart.
 */
const LAYERS = [
  { n: "01", name: "Amarena", note: "La ciliegia sciroppata che corona la coppa." },
  { n: "02", name: "Gelato alla Fragola", note: "Fragole mature, mantecate fino a farsi crema." },
  { n: "03", name: "Stracciatella", note: "Fiordilatte e scaglie di cioccolato fondente." },
  { n: "04", name: "Pistacchio di Bronte", note: "Il nostro orgoglio: pistacchio intenso e vero." },
  { n: "05", name: "Cialda Croccante", note: "La cialda artigianale che scrocchia ad ogni morso." },
];

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1); // -1 → landing (nothing highlighted yet)

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Entrance — staggered reveal of the headline + centrepiece.
      const intro = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.2 });
      intro
        .from(".hero-line", { y: 40, autoAlpha: 0, duration: 0.9, stagger: 0.12 })
        .from(".hero-sub", { y: 24, autoAlpha: 0, duration: 0.7 }, "-=0.5")
        // The two CTAs share a single y-tween on their row, so they always rise
        // together and stay perfectly level — a per-button `y` + stagger could
        // freeze mid-flight (e.g. tab backgrounded during load) and strand them
        // at different heights. The stagger now lives only on opacity, which
        // can't knock them out of alignment.
        .from(".hero-cta-row", { y: 20, duration: 0.6 }, "-=0.4")
        .from(".hero-cta", { autoAlpha: 0, duration: 0.5, stagger: 0.1 }, "<")
        // NB: the entrance must NOT animate the gelato's `scale` — the scroll
        // peel owns scale exclusively, and a second scale tween here would
        // conflict with it on refresh (intermittently leaving it unshrunk).
        .from(".hero-gelato", { y: 60, autoAlpha: 0, duration: 1.1, ease: "back.out(1.4)" }, "-=1.1");

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Gentle perpetual float of the whole gelato. This rides on the
        // wrapper column — NOT .hero-gelato — so it never fights the intro's
        // y-tween or the scroll scale/disassembly, all of which target the
        // gelato and its children.
        gsap.to(".hero-float", {
          y: "+=14",
          duration: 4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        // Iridescent sugar shine sweeping across the wordmark.
        gsap.to(".hero-shine", {
          backgroundPosition: "0% 0",
          duration: 3.2,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
        });
      });

      // Shared peel: pin the hero, fade the headline + clutter, scrub the five
      // pieces straight out along the centre axis (top pieces up, cialda down)
      // and report which layer is "current" so the copy can track it.
      const buildPeel = ({
        spread,
        endScale,
        end,
        onCrossfade,
        pieceScale = 1,
        invalidateOnRefresh = false,
      }: {
        // numbers for the fixed desktop layout; functions for the mobile fit,
        // which is re-evaluated on every ScrollTrigger refresh (resize/rotate).
        spread: number | (() => number);
        endScale: number | (() => number);
        end: string;
        onCrossfade: (tl: gsap.core.Timeline) => void;
        // How far each piece shrinks AS it separates. The scoops are taller than
        // the spread can ever be on a phone, so sliding alone leaves them
        // overlapping; shrinking each piece a little opens a real gap between
        // every layer without needing a bigger (off-screen) spread.
        pieceScale?: number;
        invalidateOnRefresh?: boolean;
      }) => {
        const layers = gsap.utils.toArray<HTMLElement>(".cz-layer"); // cherry … cone (top→bottom)
        const n = layers.length;
        const mid = (n - 1) / 2;
        const sp = typeof spread === "function" ? spread : () => spread;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end,
            scrub: 0.7,
            pin: ".hero-pin",
            anticipatePin: 1,
            invalidateOnRefresh,
            onUpdate: (self) => {
              // Pieces begin peeling once the headline has handed over (~18%).
              const p = (self.progress - 0.18) / 0.82;
              setActive(p <= 0 ? -1 : Math.min(n - 1, Math.floor(p * n)));
            },
          },
        });

        tl.to(".hero-copy", { autoAlpha: 0, y: -40, duration: 0.16 }, 0)
          .to(".hero-scrollcue", { autoAlpha: 0, duration: 0.1 }, 0)
          .to(".hero-ambient-crystal", { autoAlpha: 0, duration: 0.18 }, 0);
        onCrossfade(tl);
        // shrink a touch so the separated pieces sit cleanly within the frame
        tl.to(".hero-gelato", { scale: endScale, duration: 0.6, ease: "power1.inOut" }, 0.16);

        // Function-based y so the offsets re-resolve when the fit recomputes.
        // The simultaneous shrink (pieceScale) is what guarantees clear gaps.
        layers.forEach((el, i) => {
          tl.to(
            el,
            { y: () => sp() * (i - mid), scale: pieceScale, ease: "power1.inOut", duration: 0.62 },
            0.18 + i * 0.05
          );
        });
      };

      // Desktop — the gelato peels in its own column while the headline hands
      // over to the full parts list (lifted out of flow to overlay the copy).
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.set(".hero-anatomy", {
          position: "absolute",
          top: "50%",
          left: 0,
          width: "100%",
          yPercent: -50,
          autoAlpha: 0,
        });
        buildPeel({
          spread: 96,
          endScale: 0.78,
          end: "+=2400",
          pieceScale: 0.82,
          onCrossfade: (tl) =>
            tl.fromTo(
              ".hero-anatomy",
              { autoAlpha: 0, y: 28 },
              { autoAlpha: 1, y: 0, yPercent: -50, duration: 0.22 },
              0.1
            ),
        });
      });

      // Phones & tablets (portrait, with room to breathe) — the full side
      // list can't sit beside the exploded gelato, so it's swapped for a single
      // compact caption that tracks the peeling piece. Gated to portrait and
      // ≥540px tall: landscape phones / very short screens fall through to the
      // static list (like reduced-motion). Keying on `orientation` also means a
      // rotation cleanly re-runs this block, recomputing the fit for the new
      // dimensions — no fragile invalidate-on-refresh needed.
      mm.add(
        "(max-width: 1023px) and (min-height: 540px) and (orientation: portrait) and (prefers-reduced-motion: no-preference)",
        () => {
        gsap.set(".hero-anatomy", { display: "none" }); // the caption stands in for it
        gsap.set(".hero-caption", { display: "block", autoAlpha: 0 });

        // Fit the exploded gelato to the *measured* band between the navbar and
        // the caption, rather than a guessed formula — so it holds together on
        // any screen from a short phone to a tall tablet, and (because it's
        // recomputed on every refresh) across orientation changes too. The
        // pieces sit in a box of height H whose centre stays put under scaling;
        // from that we derive how far each piece can travel (spread) and how
        // much to shrink (scale) without crossing the navbar above or the
        // caption below.
        const gel = root.current!.querySelector(".hero-gelato") as HTMLElement;
        const pin = root.current!.querySelector(".hero-pin") as HTMLElement;
        const NAV = 84;
        const CAPTION_RESERVE = 8 * 16; // matches top-[calc(100svh-8rem)]
        const MARGIN = 18;
        const S_MIN = 44;

        const fit = () => {
          const H = gel.offsetHeight; // box height, free of transforms
          // gelato centre = its layout offset within the pin (which locks to
          // the viewport top). offsetTop is pure layout: independent of scroll,
          // transforms AND the active pin, so it's correct whenever a refresh
          // fires — unlike getBoundingClientRect, which moves with the pin.
          let top = 0;
          let node: HTMLElement | null = gel;
          while (node && node !== pin) {
            top += node.offsetTop;
            node = node.offsetParent as HTMLElement | null;
          }
          const center = top + H / 2;
          const vh = window.innerHeight;
          const halfDown = vh - CAPTION_RESERVE - MARGIN - center;
          const halfUp = center - (NAV + MARGIN);
          // cone reaches center + scale·(H/2 + 2·spread); cherry reaches
          // center − scale·(H/2 − 8 + 2·spread). Pick a scale, fit spread to
          // it, and if the band is too short, shrink the scale to keep gaps.
          let scale = Math.min(0.64, Math.max(0.42, vh * 0.00075));
          let spread = Math.min(
            (halfDown / scale - H / 2) / 2,
            (halfUp / scale - (H / 2 - 8)) / 2
          );
          if (spread < S_MIN) {
            spread = S_MIN;
            scale = Math.min(halfDown / (H / 2 + 2 * spread), halfUp / (H / 2 - 8 + 2 * spread));
          }
          const sp = Math.round(Math.min(112, Math.max(S_MIN, spread)));
          const sc = Math.max(0.34, Math.min(0.68, scale));
          // Park the caption just under the lowest piece (the cone) rather than
          // pinning it to the very bottom of the screen — on tall phones that
          // leaves a dead gap; tracking the cone keeps it tucked beneath the
          // gelato on every height.
          const coneBottom = center + sc * (H / 2 + 2 * sp);
          return { spread: sp, scale: sc, captionTop: Math.round(coneBottom + 16) };
        };

        // Compute the fit ONCE, here at setup, where the pin isn't active yet so
        // the offsetTop measurement is clean — then feed plain numbers to the
        // timeline. (Function values + invalidateOnRefresh re-resolve the scale
        // tween mid-refresh and leave it stuck nondeterministically; a rotation
        // re-runs this whole block via the orientation query, so we don't need
        // them.)
        const { spread, scale, captionTop } = fit();
        gsap.set(".hero-caption", { top: captionTop, bottom: "auto" });
        buildPeel({
          spread,
          endScale: scale,
          end: "+=1700",
          pieceScale: 0.7,
          onCrossfade: (tl) =>
            tl.fromTo(
              ".hero-caption",
              { autoAlpha: 0, y: 20 },
              { autoAlpha: 1, y: 0, duration: 0.2 },
              0.1
            ),
        });
      });
    },
    { scope: root }
  );

  return (
    <section id="top" ref={root} className="relative">
      <div className="hero-pin relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16">
        {/* soft gelato-coloured glows */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-fragola/10 blur-3xl" />
          <div className="absolute right-0 top-1/3 h-[28rem] w-[28rem] rounded-full bg-pistacchio/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-oro/15 blur-3xl" />
        </div>
        <AmbientCrystals />

        <div className="container-rail relative z-10 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left column — headline crossfades to the parts list */}
          <div className="relative order-2 flex min-h-[26rem] flex-col justify-center text-center lg:order-1 lg:min-h-[32rem] lg:text-left">
            {/* Phase 1 — hero copy */}
            <div className="hero-copy w-full">
              <p className="hero-line eyebrow justify-center lg:justify-start">
                <span className="h-px w-8 bg-terracotta" />
                Pasticceria · Gelateria · Bar · {site.neighborhood}
              </p>
              <h1 className="mt-5 font-display text-[clamp(2.8rem,8vw,5.5rem)] font-bold leading-[0.95] text-cioccolato">
                <span className="hero-line block">Cristalli</span>
                <span className="hero-line block italic">di Zucchero</span>
              </h1>
              <p className="hero-sub mx-auto mt-6 max-w-md text-lg text-cioccolato-soft lg:mx-0">
                <span className="hero-shine sugar-text font-display text-xl italic">
                  Dove lo zucchero diventa arte.
                </span>
                <br />
                Pasticceria, gelato mantecato a mano e torte su misura, ogni giorno, nel cuore di
                Turi.
              </p>
              <div className="hero-cta-row mt-9 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
                <a href="#gusti" className="hero-cta btn-primary">
                  Scopri i Gusti
                  <span aria-hidden="true">↓</span>
                </a>
                <a href="#torte" className="hero-cta btn-ghost">
                  Prenota una Torta
                </a>
              </div>
              <p className="hero-sub mt-7 text-xs uppercase tracking-label text-cioccolato-soft/70">
                Fatto a mano, ogni giorno · Buon Appetito
              </p>
            </div>

            {/* Phase 2 — anatomy / parts list, revealed as the gelato comes apart */}
            <div className="hero-anatomy w-full">
              <p className="eyebrow justify-center lg:justify-start">
                <span className="h-px w-8 bg-terracotta" />
                Anatomia di un Cristallo
              </p>
              <h2 className="mt-3 font-display text-[clamp(2rem,4.5vw,3.2rem)] font-bold leading-[1.02] text-cioccolato">
                I Nostri Strati
              </h2>
              <p className="mx-auto mt-3 max-w-md text-cioccolato-soft lg:mx-0">
                Cinque strati veri, mantecati a mano — dall&apos;amarena in cima fino alla cialda
                croccante. <span className="hidden lg:inline">Scorri e guardalo scomporsi, uno
                strato alla volta.</span>
              </p>
              <ol className="mx-auto mt-6 max-w-md space-y-1 text-left">
                {LAYERS.map((l, i) => (
                  <li key={l.n}>
                    <div
                      className={`flex items-start gap-4 rounded-2xl border px-4 py-2.5 transition-all duration-500 ${
                        active === i
                          ? "border-terracotta/40 bg-panna shadow-soft"
                          : active >= 0
                            ? "border-transparent opacity-55"
                            : "border-transparent"
                      }`}
                    >
                      <span
                        className={`mt-0.5 font-display text-lg font-semibold transition-colors ${
                          active === i ? "text-terracotta" : "text-cioccolato/40"
                        }`}
                      >
                        {l.n}
                      </span>
                      <div>
                        <h3 className="font-display text-lg text-cioccolato">{l.name}</h3>
                        <p className="text-sm text-cioccolato-soft">{l.note}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Right column — the one and only gelato (disassembles in place) */}
          <div className="hero-float order-1 flex justify-center lg:order-2">
            <div className="hero-gelato relative h-[26rem] w-72 will-change-transform sm:h-[30rem] sm:w-80">
              {/* The single gelato, assembled like a real cone: three scoops
                  stacked on the cialda with the amarena on top. Each piece is
                  centred on the box's vertical axis via `top: calc(50% ± n)`, so
                  the whole stack stays centred at any box height AND the cone's
                  waffle body shows clearly BELOW the bottom scoop instead of
                  being swallowed by it. The cone sits behind the scoops (z-10)
                  so they read as resting in it; its hidden rim is tucked under
                  the green scoop while the triangle pokes out beneath — exactly
                  how a real cone looks. The peel then slides each piece straight
                  out along this axis (and shrinks it a touch) to open clear gaps
                  between all five. */}
              <div className="cz-layer absolute left-1/2 z-30 w-12 -translate-x-1/2" style={{ top: "calc(50% - 204px)" }}>
                <Cherry className="h-auto w-full drop-shadow" />
              </div>
              <div className="cz-layer absolute left-1/2 z-20 w-44 -translate-x-1/2" style={{ top: "calc(50% - 178px)" }}>
                <Scoop base="#E85D75" highlight="#F69BAA" speck="#B23A52" speckStyle="dot" className="h-auto w-full drop-shadow-md" />
              </div>
              <div className="cz-layer absolute left-1/2 z-20 w-48 -translate-x-1/2" style={{ top: "calc(50% - 114px)" }}>
                <Scoop base="#FBF6EC" highlight="#FFFFFF" speck="#3C2F2F" speckStyle="chip" className="h-auto w-full drop-shadow-md" />
              </div>
              <div className="cz-layer absolute left-1/2 z-20 w-48 -translate-x-1/2" style={{ top: "calc(50% - 44px)" }}>
                <Scoop base="#7BC96F" highlight="#A7E29B" speck="#4F7A3F" speckStyle="dot" className="h-auto w-full drop-shadow-md" />
              </div>
              <div className="cz-layer absolute left-1/2 z-10 w-32 -translate-x-1/2" style={{ top: "calc(50% + 42px)" }}>
                <WaffleCone className="h-auto w-full drop-shadow-lg" />
              </div>
              {/* a couple of sparkling crystals orbiting the scoops (ambient) */}
              <div className="hero-ambient-crystal absolute right-2 top-24 w-7 animate-float-crystal">
                <Crystal tone="#F4C95D" className="h-auto w-full" />
              </div>
              <div
                className="hero-ambient-crystal absolute left-0 top-40 w-6 animate-float-crystal"
                style={{ animationDelay: "1.4s" }}
              >
                <Crystal tone="#6C77C4" className="h-auto w-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Small-screen caption — stands in for the full parts list, tracking
            the piece currently peeling away. Revealed by JS only on phones
            (hidden by default, so no-JS/reduced-motion keeps the static list). */}
        <div
          className="hero-caption pointer-events-none absolute inset-x-0 top-[calc(100svh-8rem)] z-40 mx-auto hidden max-w-xs px-6 text-center"
          aria-live="polite"
        >
          {active < 0 ? (
            <p className="text-sm text-cioccolato-soft">
              Continua a scorrere e guarda il gelato scomporsi nei suoi strati.
            </p>
          ) : (
            <div className="rounded-2xl border border-terracotta/30 bg-panna/90 px-5 py-3 shadow-soft backdrop-blur-sm">
              <p className="font-display text-[0.7rem] font-semibold uppercase tracking-label text-terracotta">
                Strato {LAYERS[active].n}
              </p>
              <h3 className="mt-0.5 font-display text-xl text-cioccolato">{LAYERS[active].name}</h3>
              <p className="mt-1 text-sm leading-snug text-cioccolato-soft">{LAYERS[active].note}</p>
            </div>
          )}
        </div>

        {/* scroll cue */}
        <a
          href="#gusti"
          className="hero-scrollcue absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-cioccolato-soft"
          aria-label="Scorri per scomporre il gelato"
        >
          <span className="text-[0.65rem] uppercase tracking-label">Scorri</span>
          <span className="flex h-9 w-5 items-start justify-center rounded-full border border-cioccolato/30 p-1">
            <span className="h-2 w-1 animate-drift rounded-full bg-terracotta" />
          </span>
        </a>
      </div>
    </section>
  );
}
