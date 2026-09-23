import Image from "next/image";

import RevealOnLoad from "./RevealOnLoad";
import WhatsAppButton from "./WhatsAppButton";
import { hero } from "@/lib/content";
import { heroDelay } from "@/lib/motion";
import { siteConfig } from "@/lib/site-config";

export default function Hero() {
  return (
    <section id="topo" className="relative overflow-hidden pb-[17rem] pt-[calc(var(--header-height)+1.5rem)] sm:pb-[21rem] lg:pb-24 lg:pt-[calc(var(--header-height)+2.5rem)]">
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

        No mobile ela nao empilha abaixo do texto — ancora no canto inferior
        direito, dentro do espaco reservado pelo padding da secao. Assim o hero
        mantem presenca sem empurrar os CTAs para fora da primeira tela, que
        era o problema do empilhamento.

        O texto fica POR CIMA: o container tem z-10 e esta figura nao tem
        z-index. Na pratica eles nao se cruzam, porque o padding da base
        reserva a faixa da foto — mas se a copy crescer, a leitura continua
        garantida.
      */}
      <figure className="pointer-events-none absolute bottom-0 right-0 h-[16rem] w-[82%] sm:h-[20rem] sm:w-[70%] lg:inset-y-0 lg:h-auto lg:w-1/2 lg:max-w-[46rem]">
        <Image
          src={hero.image.src}
          alt={hero.image.alt}
          fill
          priority
          /*
            Tres faixas, espelhando exatamente as tres larguras da figura
            acima. Declarar 82vw em todos os tamanhos fazia o tablet buscar a
            variante de 1920px para exibir 538px.
          */
          sizes="(min-width: 1024px) min(50vw, 46rem), (min-width: 640px) 70vw, 82vw"
          className="object-contain object-right-bottom lg:object-cover lg:object-top"
        />

        <figcaption className="visually-hidden">
          Fotografia editorial do {siteConfig.brand.name}.
        </figcaption>
      </figure>
    </section>
  );
}
