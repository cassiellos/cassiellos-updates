import type { CSSProperties, ElementType, ReactNode } from "react";

type RevealOnLoadProps = {
  children: ReactNode;
  /** Atraso em ms para o stagger. Mantido curto: atrasa a pintura. */
  delay?: number;
  className?: string;
  as?: ElementType;
};

/**
 * Revelacao de entrada para conteudo ACIMA DA DOBRA.
 *
 * Irmao server-side de `SectionReveal`. A diferenca nao e estetica, e de
 * carregamento: `SectionReveal` e client component e so revela depois da
 * hidratacao + IntersectionObserver, o que empurrava o LCP do hero para
 * ~1,1s no mobile (medido). Aqui a animacao e CSS pura e comeca na primeira
 * pintura, entao o conteudo nao espera JavaScript nenhum — e este componente
 * nao manda um byte de JS para o cliente.
 *
 * Use `SectionReveal` para o que esta abaixo da dobra (onde o reveal por
 * scroll faz sentido) e este aqui para o que abre a pagina.
 */
export default function RevealOnLoad({
  children,
  delay = 0,
  className,
  as,
}: RevealOnLoadProps) {
  const Component = (as ?? "div") as ElementType;

  return (
    <Component
      className={className}
      data-reveal="onload"
      style={
        delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined
      }
    >
      {children}
    </Component>
  );
}
