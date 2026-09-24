"use client";

import { useEffect, useState } from "react";

import WhatsAppButton from "./WhatsAppButton";
import { hasWhatsApp } from "@/lib/site-config";

/**
 * CTA flutuante discreto. So aparece depois de um scroll relevante para nao
 * competir com o hero, e respeita a safe area em iOS.
 */
export default function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!hasWhatsApp) return null;

  return (
    <div
      className={[
        /*
          `transition-all` trocado por transform+opacity explicitos: num
          elemento fixo, animar "todas as propriedades" poe o navegador para
          vigiar tambem largura, cor e sombra a cada frame de scroll, sem
          nenhuma delas mudar. A duracao vem dos tokens centrais.
        */
        "fixed right-4 z-40 transition-[transform,opacity] duration-[var(--dur-state)] ease-[var(--ease-macleny)] sm:right-6",
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      ].join(" ")}
      style={{ bottom: "calc(1rem + env(safe-area-inset-bottom, 0px))" }}
    >
      <div className="group relative">
        <WhatsAppButton
          location="floating"
          variant="primary"
          className="min-h-12 px-5 shadow-[0_10px_30px_-12px_rgba(26,20,17,0.55)]"
        >
          <span className="hidden sm:inline">Agendar</span>
          <span className="sm:hidden">WhatsApp</span>
        </WhatsAppButton>

        <span
          role="tooltip"
          className="pointer-events-none absolute bottom-1/2 right-[calc(100%+0.75rem)] hidden translate-y-1/2 whitespace-nowrap rounded-full bg-espresso px-3 py-1.5 text-xs text-ivory opacity-0 transition-opacity duration-[var(--dur-micro)] ease-[var(--ease-macleny)] group-hover:opacity-100 lg:block"
        >
          Agendar pelo WhatsApp
        </span>
      </div>
    </div>
  );
}
