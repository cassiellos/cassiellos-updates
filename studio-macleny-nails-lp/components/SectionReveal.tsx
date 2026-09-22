"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type SectionRevealProps = {
  children: ReactNode;
  /** Atraso em ms para composicoes em stagger. */
  delay?: number;
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
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={ref}
      className={className}
      data-reveal="hidden"
      style={
        delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined
      }
    >
      {children}
    </Component>
  );
}
