import { getImageProps } from "next/image";

import RevealOnLoad from "./RevealOnLoad";
import WhatsAppButton from "./WhatsAppButton";
import { hero } from "@/lib/content";
import { heroDelay } from "@/lib/motion";
import { siteConfig } from "@/lib/site-config";

export default function Hero() {
  const { props: desktopImage } = getImageProps({
    src: hero.image.src,
    alt: hero.image.alt,
    fill: true,
    loading: "eager",
    fetchPriority: "high",
    sizes: "(min-width: 1024px) min(50vw, 46rem), (min-width: 640px) 298px, 267px",
  });
  const { props: mobileImage } = getImageProps({
    src: "/images/hero-mobile.webp",
    alt: hero.image.alt,
    fill: true,
    sizes: "100vw",
  });

  return (
    <section id="topo" className="hero relative overflow-hidden pb-[14rem] pt-[calc(var(--header-height)+1.5rem)] sm:pb-[16rem] lg:pb-24 lg:pt-[calc(var(--header-height)+2.5rem)]">
      {/* Arcos herdados do simbolo — decorativos. */}
      <div aria-hidden="true" className="hero-arcs pointer-events-none absolute inset-0">
        <span className="arc arc-light -left-[32%] top-[-18%] h-[46rem] w-[46rem] sm:-left-[18%]" />
        <span className="arc -right-[38%] bottom-[-34%] h-[38rem] w-[38rem]" />
      </div>

      {/* z-10: em lg a fotografia e irma posicionada e vem depois no DOM. */}
      <div className="container-macleny relative z-10">
        <div className="lg:grid lg:grid-cols-12">
          <div className="hero-copy lg:col-span-6">
            <RevealOnLoad kind="quiet">
              <p className="eyebrow text-heritage">{hero.eyebrow}</p>
            </RevealOnLoad>

            <RevealOnLoad delay={heroDelay.title}>
              <h1 className="hero-title type-serif type-h1 text-balance">
                {hero.titleLines.map((line, index) => (
                  <span key={line} className="block">
                    {index === 1 ? <em className="not-italic text-heritage">{line}</em> : line}
                  </span>
                ))}
              </h1>
            </RevealOnLoad>

            <RevealOnLoad delay={heroDelay.body} kind="support">
              {/*
                Uma copy so, vinda de `lib/content.ts`, em todas as larguras.
                Havia aqui uma versao ANTIGA do texto escrita a mao e exibida
                apenas abaixo de sm — o celular mostrava uma copy que a cliente
                ja tinha pedido para remover, enquanto o desktop mostrava a
                nova. Texto de conteudo nao mora em componente.
              */}
              <p className="hero-body type-body-lg">
                {hero.body}
              </p>
            </RevealOnLoad>

            <RevealOnLoad delay={heroDelay.cta} kind="support">
              <div className="hero-actions flex flex-col gap-3 sm:flex-row sm:items-center">
                <WhatsAppButton location="hero" variant="primary">
                  {hero.primaryCta}
                </WhatsAppButton>

                {/* No celular, o CSS deixa a fotografia aparecer sob a borda. */}
                <a
                  href={hero.secondaryHref}
                  className="btn btn-secondary bg-ivory lg:bg-transparent"
                >
                  {hero.secondaryCta}
                </a>
              </div>
            </RevealOnLoad>

            <RevealOnLoad delay={heroDelay.signature} kind="quiet">
              {/*
                Espresso cheio ate lg: no celular a fotografia e o fundo do
                hero inteiro, e esta linha cruza pele e tecido claro. Medido em
                `muted` sobre a foto: 3,97:1 em 320px — abaixo do minimo AA de
                4,5:1. A partir de lg ela volta ao tom discreto, porque ali o
                fundo e o Ivory chapado.
              */}
              <p className="hero-signature text-sm italic text-espresso lg:text-espresso-muted">
                {hero.signature}
              </p>
            </RevealOnLoad>
          </div>
        </div>
      </div>

      {/* Art direction: o navegador baixa apenas a imagem da sua faixa de tela. */}
      {/*
        Geometria e object-fit vivem no CSS (`.hero-photo`), nao em utilities.
        Com as duas fontes, as utilities do Tailwind venciam as regras em
        @layer e a figura ancorava no topo em vez de cobrir a secao.
      */}
      <figure className="hero-photo pointer-events-none">
        <picture>
          <source media="(max-width: 639px)" srcSet={mobileImage.srcSet} sizes={mobileImage.sizes} />
          <img {...desktopImage} alt={hero.image.alt} />
        </picture>

        <figcaption className="visually-hidden">
          Fotografia editorial do {siteConfig.brand.name}.
        </figcaption>
      </figure>
    </section>
  );
}
