"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

import type { RevealKind } from "@/lib/motion";

type SectionRevealProps = {
  children: ReactNode;
  /** Atraso em ms. Use a escada de `lib/motion.ts`, nao valores avulsos. */
  delay?: number;
  /**
   * Papel do bloco na leitura. Define quanto ele se desloca ao entrar:
   * `lead` percorre a distancia cheia, `support` metade, `quiet` nao se
   * desloca e `media` ainda aproxima a fotografia. Ver `[data-reveal-kind]`.
   */
  kind?: RevealKind;
  className?: string;
  as?: ElementType;
};

/**
 * Reveal por IntersectionObserver + transicao CSS.
 *
 * Escolha deliberada de nao usar biblioteca de animacao: o efeito necessario
 * (fade + translateY com stagger) custa ~1KB aqui e nenhuma dependencia extra.
 *
 * O estado do reveal vive no DOM (data-reveal), nao em estado React: nao ha
 * re-render, e o elemento so e escondido quando ha JS (classe `js` no <html>),
 * de modo que sem JavaScript o conteudo permanece visivel.
 */
export default function SectionReveal({
  children,
  delay = 0,
  kind = "lead",
  className,
  as,
}: SectionRevealProps) {
  const Component = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reveal = () => {
      node.dataset.reveal = "visible";
    };

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced || typeof IntersectionObserver === "undefined") {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal();
            observer.disconnect();
          }
        }
      },
      /*
       * Dispara quando o topo do bloco entra de fato na area visual. O recuo
       * de 10% na base evita disparar com o elemento ainda colado na borda;
       * `threshold: 0` cobre blocos mais altos que a viewport, que nunca
       * chegariam a uma fracao visivel.
       */
      { rootMargin: "0px 0px -10% 0px", threshold: 0 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={ref}
      className={className}
      data-reveal="hidden"
      data-reveal-kind={kind}
      style={
        delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined
      }
    >
      {children}
    </Component>
  );
}
