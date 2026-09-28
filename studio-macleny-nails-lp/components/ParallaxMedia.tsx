"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ParallaxMediaProps = {
  children: ReactNode;
  /** Deslocamento maximo em px. Mantido baixo de proposito. */
  strength?: number;
  className?: string;
};

/**
 * Parallax muito sutil, usado em no maximo duas imagens da pagina.
 *
 * Desativado sob prefers-reduced-motion, em telas menores que 1024px e quando
 * o dispositivo nao expoe ponteiro fino. Usa IntersectionObserver para so
 * escutar scroll enquanto o elemento esta em tela, e rAF para nao calcular
 * layout a cada evento.
 */
export default function ParallaxMedia({
  children,
  strength = 18,
  className,
}: ParallaxMediaProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const disabled =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(max-width: 1023px)").matches ||
      !window.matchMedia("(pointer: fine)").matches;

    if (disabled) return;

    let frame = 0;
    let active = false;

    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      // -1 (abaixo da viewport) .. 1 (acima da viewport)
      const progress = (rect.top + rect.height / 2 - viewport / 2) / viewport;
      const offset = Math.max(-1, Math.min(1, progress)) * strength;
      node.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && !active) {
          active = true;
          window.addEventListener("scroll", onScroll, { passive: true });
          onScroll();
        } else if (!entry.isIntersecting && active) {
          active = false;
          window.removeEventListener("scroll", onScroll);
        }
      }
    });

    observer.observe(node);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      node.style.transform = "";
    };
  }, [strength]);

  return (
    <div ref={ref} className={["parallax-media", className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
