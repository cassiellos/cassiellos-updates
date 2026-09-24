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
    className: "object-contain object-right-bottom lg:object-cover lg:object-top",
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
              <h1 className="type-serif type-h1 mt-5 text-balance">
                {hero.titleLines.map((line, index) => (
                  <span key={line} className="block">
                    {index === 1 ? <em className="not-italic text-heritage">{line}</em> : line}
                  </span>
                ))}
              </h1>
            </RevealOnLoad>

            <RevealOnLoad delay={heroDelay.body} kind="support">
              <p className="hero-body type-body-lg mt-6 max-w-lg text-espresso-soft"><span className="sm:hidden">Seu atendimento é pensado a partir de você, do seu estilo, da sua rotina e do resultado que deseja. Técnica, precisão e cuidado se unem para entregar unhas sofisticadas, proporcionais e personalizadas, em uma experiência individual do início ao fim.</span><span className="hidden sm:inline">{hero.body}</span></p>
            </RevealOnLoad>

            <RevealOnLoad delay={heroDelay.cta} kind="support">
              <div className="hero-actions mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
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
              <p className="hero-signature mt-6 text-sm italic text-espresso lg:text-espresso-muted">
                {hero.signature}
              </p>
            </RevealOnLoad>
          </div>
        </div>
      </div>

      {/* Art direction: o navegador baixa apenas a imagem da sua faixa de tela. */}
      <figure className="hero-photo pointer-events-none absolute bottom-0 right-0 h-[17rem] w-full bg-[radial-gradient(135%_115%_at_100%_100%,rgba(233,224,211,0.92)_0%,rgba(243,237,229,0.5)_42%,rgba(244,239,232,0)_70%)] sm:h-[19rem] lg:inset-y-0 lg:h-auto lg:w-1/2 lg:max-w-[46rem] lg:bg-none">
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
