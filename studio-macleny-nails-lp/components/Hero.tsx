import Image from "next/image";

import RevealOnLoad from "./RevealOnLoad";
import WhatsAppButton from "./WhatsAppButton";
import { hero } from "@/lib/content";
import { heroDelay } from "@/lib/motion";
import { siteConfig } from "@/lib/site-config";

export default function Hero() {
  return (
    <section id="topo" className="relative overflow-hidden pb-16 pt-[calc(var(--header-height)+1.5rem)] sm:pb-20 lg:pb-24 lg:pt-[calc(var(--header-height)+2.5rem)]">
      {/* Arcos herdados do simbolo — decorativos. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="arc arc-light -left-[32%] top-[-18%] h-[46rem] w-[46rem] sm:-left-[18%]" />
        <span className="arc -right-[38%] bottom-[-34%] h-[38rem] w-[38rem]" />
      </div>

      {/* z-10: em lg a fotografia e irma posicionada e vem depois no DOM. */}
      <div className="container-macleny relative z-10">
        <div className="lg:grid lg:grid-cols-12">
          <div className="lg:col-span-6">
            <RevealOnLoad kind="quiet">
              <p className="eyebrow text-heritage">{hero.eyebrow}</p>
            </RevealOnLoad>

            <RevealOnLoad delay={heroDelay.title}>
              <h1 className="type-serif type-h1 mt-5 text-balance">
                {hero.titleLines.map((line, index) => (
                  <span key={line} className="block">
                    {index === 1 ? <em className="not-italic text-heritage">{line}</em> : line}
                  </span>
                ))}
              </h1>
            </RevealOnLoad>

            <RevealOnLoad delay={heroDelay.body} kind="support">
              <p className="type-body-lg mt-6 max-w-lg text-espresso-soft">{hero.body}</p>
            </RevealOnLoad>

            <RevealOnLoad delay={heroDelay.cta} kind="support">
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <WhatsAppButton location="hero" variant="primary">
                  {hero.primaryCta}
                </WhatsAppButton>

                <a href={hero.secondaryHref} className="btn btn-secondary">
                  {hero.secondaryCta}
                </a>
              </div>
            </RevealOnLoad>

            <RevealOnLoad delay={heroDelay.signature} kind="quiet">
              <p className="mt-6 text-sm italic text-espresso-muted">
                {hero.signature}
              </p>
            </RevealOnLoad>
          </div>
        </div>
      </div>

      {/*
        A fotografia e um recorte com alfa: assenta direto sobre o Ivory, sem
        moldura e sem emenda, deixando os arcos aparecerem por tras. E painel
        sangrado na direita da viewport — por isso mora FORA do container, que
        tem largura maxima. Nao usa ParallaxMedia: deslocar um elemento preso a
        inset-y-0 abriria vao no topo ou na base.

        SO A PARTIR DE lg. Abaixo disso o hero e texto e CTA, sem foto.

        O `1px` no fim do `sizes` nao e enfeite. Como a imagem tem `priority`,
        o Next emite um <link rel="preload"> no <head>, e preload acontece
        ANTES do layout — esconder por CSS nao impediria o download. O que
        decide qual candidato do srcset sera baixado e o `imagesizes` desse
        preload, que espelha este `sizes`: abaixo de 1024px ele resolve para
        1px e o navegador busca a menor variante existente, em vez da foto
        inteira que nao seria exibida.
      */}
      <figure className="pointer-events-none hidden lg:absolute lg:inset-y-0 lg:right-0 lg:block lg:w-1/2 lg:max-w-[46rem]">
        <Image
          src={hero.image.src}
          alt={hero.image.alt}
          fill
          priority
          sizes="(min-width: 1024px) min(50vw, 46rem), 1px"
          className="object-cover object-top"
        />

        <figcaption className="visually-hidden">
          Fotografia editorial do {siteConfig.brand.name}.
        </figcaption>
      </figure>
    </section>
  );
}
