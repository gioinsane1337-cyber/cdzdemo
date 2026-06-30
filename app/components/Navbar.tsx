"use client";

import { useEffect, useState } from "react";
import { site } from "../data/site";
import { Crystal } from "./Illustrations";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on Escape and lock scroll while it's open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[120] transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <nav
        className={`container-rail flex items-center justify-between rounded-full transition-all duration-500 ${
          scrolled ? "glass shadow-soft" : ""
        } ${scrolled ? "px-4 py-2 md:px-6" : "px-0 py-0"}`}
        aria-label="Navigazione principale"
      >
        {/* Wordmark */}
        <a href="#top" className="group flex items-center gap-2.5" aria-label="Cristalli di Zucchero — torna su">
          <span className="w-6 transition-transform duration-500 group-hover:rotate-180">
            <Crystal tone="#F4C95D" className="h-auto w-full" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-cioccolato">
            Cristalli di Zucchero
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {site.nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="group relative text-sm font-medium text-cioccolato-soft transition-colors hover:text-cioccolato"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-terracotta transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a href="#torte" className="btn-primary hidden md:inline-flex">
            Prenota una Torta
          </a>
          {/* Hamburger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Chiudi menu" : "Apri menu"}
            className="relative z-[130] flex h-11 w-11 items-center justify-center rounded-full border border-cioccolato/15 bg-panna/70 lg:hidden"
          >
            <span className="sr-only-custom">Menu</span>
            <div className="flex w-5 flex-col items-end gap-1.5">
              <span className={`h-0.5 bg-cioccolato transition-all duration-300 ${open ? "w-5 translate-y-2 rotate-45" : "w-5"}`} />
              <span className={`h-0.5 bg-cioccolato transition-all duration-300 ${open ? "opacity-0" : "w-3.5"}`} />
              <span className={`h-0.5 bg-cioccolato transition-all duration-300 ${open ? "w-5 -translate-y-2 -rotate-45" : "w-4"}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[125] flex flex-col bg-cream/95 backdrop-blur-xl transition-all duration-500 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ul className="mt-28 flex flex-col gap-2 px-8">
          {site.nav.map((item, i) => (
            <li
              key={item.href}
              className={`border-b border-cioccolato/10 transition-all duration-500 ${
                open ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${100 + i * 60}ms` : "0ms" }}
            >
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-4 font-display text-3xl text-cioccolato"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-auto px-8 pb-12">
          <a href="#torte" onClick={() => setOpen(false)} className="btn-primary w-full">
            Prenota una Torta
          </a>
          <p className="mt-6 text-sm text-cioccolato-soft">
            {site.address.street} · {site.neighborhood}
          </p>
        </div>
      </div>
    </header>
  );
}
