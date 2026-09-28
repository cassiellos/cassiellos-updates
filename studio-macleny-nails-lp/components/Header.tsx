"use client";

import { useEffect, useState, type CSSProperties } from "react";

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
        // `site-header` traz a transicao de fundo, borda, sombra e blur juntas.
        // Antes so `transition-colors` estava declarado, entao borda e blur
        // apareciam de um frame para o outro enquanto a cor viajava suave.
        "site-header fixed inset-x-0 top-0 z-50",
        isScrolled || isMenuOpen
          ? "border-b border-line bg-ivory/92 shadow-[0_1px_24px_-16px_rgba(26,20,17,0.5)] backdrop-blur-[6px]"
          : "border-b border-transparent bg-transparent shadow-none",
      ].join(" ")}
      style={{ minHeight: "var(--header-height)" }}
    >
      <div className="container-macleny flex h-[var(--header-height)] items-center justify-between gap-4">
        {/*
          O logo tambem responde: uma queda minima de opacidade basta para o
          usuario saber que a assinatura e clicavel, sem transformar a marca
          num botao.
        */}
        <a
          href="#topo"
          className="shrink-0 py-2 transition-opacity duration-[var(--dur-micro)] ease-[var(--ease-macleny)] hover:opacity-70"
          aria-label={`${"Studio Macleny Nails"} — ir para o início`}
        >
          <BrandMark />
        </a>

        <nav aria-label="Navegação principal" className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="link-underline text-sm font-medium text-espresso-soft transition-colors duration-[var(--dur-micro)] ease-[var(--ease-macleny)] hover:text-espresso"
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
            className="btn btn-secondary menu-toggle lg:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="menu-mobile"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? "Fechar" : "Menu"}
          </button>
        </div>
      </div>

      {/*
        Mesma troca feita no acordeao: `inert` no lugar de `hidden`, para o
        painel poder abrir animado sem voltar a ficar acessivel por teclado
        quando fechado. A borda superior so existe com o menu aberto — com o
        painel colapsado ela virava um risco solto sob o header.
      */}
      <div
        id="menu-mobile"
        inert={!isMenuOpen}
        data-open={isMenuOpen}
        className={[
          "menu-panel bg-ivory lg:hidden",
          isMenuOpen ? "border-t border-line" : "border-t border-transparent",
        ].join(" ")}
      >
        <div>
          <nav aria-label="Navegação principal (mobile)" className="container-macleny py-6">
            <ul className="flex flex-col">
              {navigation.map((item, index) => (
                <li
                  key={item.href}
                  className="menu-item border-b border-line/70 last:border-b-0"
                  style={{ "--menu-delay": `${60 + index * 45}ms` } as CSSProperties}
                >
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

            <div
              className="menu-item"
              style={{ "--menu-delay": `${60 + navigation.length * 45}ms` } as CSSProperties}
            >
              <WhatsAppButton
                location="header"
                variant="primary"
                className="mt-6 w-full sm:hidden"
              >
                Agendar pelo WhatsApp
              </WhatsAppButton>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
