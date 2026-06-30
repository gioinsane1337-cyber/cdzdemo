"use client";

import { useState } from "react";
import { site } from "../data/site";
import { Crystal, Sparkle, IconInstagram, IconFacebook, IconStar, IconHeart } from "./Illustrations";

const SOCIALS = [
  { label: "Instagram", href: site.social.instagram, Icon: IconInstagram },
  { label: "Facebook", href: site.social.facebook, Icon: IconFacebook },
  { label: "Tripadvisor", href: site.social.tripadvisor, Icon: IconStar },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <footer className="relative overflow-hidden bg-cioccolato text-cream">
      {/* Newsletter band */}
      <div className="border-b border-cream/10">
        <div className="container-rail grid gap-8 py-16 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Dolcezze in arrivo, <span className="italic text-oro">ogni mese</span>
            </h2>
            <p className="mt-3 max-w-md text-cream/70">
              Nuovi gusti, sfornati di stagione e qualche piccola sorpresa. Niente spam, promesso —
              solo cose buone.
            </p>
          </div>
          <div>
            {done ? (
              <p className="flex items-center gap-3 rounded-2xl bg-cream/10 px-6 py-5" role="status" aria-live="polite">
                <Sparkle color="#F4C95D" className="h-6 w-6 shrink-0" />
                Iscrizione confermata — benvenuto in famiglia!
              </p>
            ) : (
              <form
                className="flex flex-col gap-3 sm:flex-row"
                onSubmit={(e) => {
                  e.preventDefault();
                  // Wire to your email provider (Mailchimp, Brevo, …) here.
                  if (email.trim()) setDone(true);
                }}
              >
                <label htmlFor="nl-email" className="sr-only-custom">
                  Il tuo indirizzo email
                </label>
                <input
                  id="nl-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="la-tua-email@email.it"
                  className="flex-1 rounded-full border border-cream/20 bg-cream/5 px-5 py-3.5 text-sm text-cream placeholder:text-cream/40 focus:border-oro focus:outline-none"
                />
                <button type="submit" className="rounded-full bg-oro px-7 py-3.5 text-sm font-semibold text-cioccolato transition-transform hover:-translate-y-0.5">
                  Iscriviti
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-rail grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <a href="#top" className="flex items-center gap-2.5">
            <span className="w-7">
              <Crystal tone="#F4C95D" className="h-auto w-full" />
            </span>
            <span className="font-display text-xl font-semibold">Cristalli di Zucchero</span>
          </a>
          <p className="mt-4 max-w-xs text-sm text-cream/60">
            {site.tagline}. Pasticceria, gelateria & bar artigianale a {site.neighborhood}. Fatto a
            mano, ogni giorno.
          </p>
          <div className="mt-5 flex gap-3">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-cream/80 transition-colors hover:border-oro hover:text-oro"
              >
                <Icon className="h-[1.15rem] w-[1.15rem]" />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Footer">
          <h3 className="text-xs font-semibold uppercase tracking-label text-oro">Esplora</h3>
          <ul className="mt-4 space-y-2 text-sm text-cream/70">
            {site.nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="transition-colors hover:text-cream">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-label text-oro">Contatti</h3>
          <ul className="mt-4 space-y-2 text-sm text-cream/70">
            <li>{site.address.street}</li>
            <li>{site.address.city}</li>
            <li>
              <a href={site.contact.phoneHref} className="transition-colors hover:text-cream">
                {site.contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.contact.email}`} className="transition-colors hover:text-cream">
                {site.contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Legal */}
      <div className="border-t border-cream/10">
        <div className="container-rail flex flex-col items-center justify-between gap-2 py-6 text-xs text-cream/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Cristalli di Zucchero · P.IVA 00000000000</p>
          <p className="flex gap-4">
            <a href="#" className="hover:text-cream">Privacy</a>
            <a href="#" className="hover:text-cream">Cookie</a>
            <span className="inline-flex items-center gap-1.5">
              Fatto con <IconHeart className="h-3.5 w-3.5 text-oro" /> a Turi
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
