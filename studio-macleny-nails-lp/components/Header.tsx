"use client";

import { useEffect, useState } from "react";

import BrandMark from "./BrandMark";
import WhatsAppButton from "./WhatsAppButton";
import { headerCta, navigation } from "@/lib/content";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        isScrolled || isMenuOpen
          ? "border-b border-line bg-ivory/92 backdrop-blur-[6px]"
          : "border-b border-transparent bg-transparent",
      ].join(" ")}
      style={{ minHeight: "var(--header-height)" }}
    >
      <div className="container-macleny flex h-[var(--header-height)] items-center justify-between gap-4">
        <a
          href="#topo"
          className="shrink-0 py-2"
          aria-label={`${"Studio Macleny Nails"} — ir para o início`}
        >
          <BrandMark />
        </a>

        <nav aria-label="Navegação principal" className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="link-underline text-sm font-medium text-espresso-soft transition-colors hover:text-espresso"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <WhatsAppButton
            location="header"
            variant="primary"
            className="hidden min-h-11 px-6 py-2.5 text-sm sm:inline-flex"
            fallbackLabel="Instagram"
          >
            {headerCta}
          </WhatsAppButton>

          <button
            type="button"
            className="btn btn-secondary min-h-11 px-4 py-2 text-sm lg:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="menu-mobile"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? "Fechar" : "Menu"}
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        hidden={!isMenuOpen}
        className="border-t border-line bg-ivory lg:hidden"
      >
        <nav aria-label="Navegação principal (mobile)" className="container-macleny py-6">
          <ul className="flex flex-col">
            {navigation.map((item) => (
              <li key={item.href} className="border-b border-line/70 last:border-b-0">
                <a
                  href={item.href}
                  className="block py-4 type-serif text-2xl"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <WhatsAppButton
            location="header"
            variant="primary"
            className="mt-6 w-full sm:hidden"
          >
            Agendar pelo WhatsApp
          </WhatsAppButton>
        </nav>
      </div>
    </header>
  );
}
