import Image from "next/image";

import ParallaxMedia from "./ParallaxMedia";
import SectionReveal from "./SectionReveal";
import WhatsAppButton from "./WhatsAppButton";
import { hero } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

export default function Hero() {
  return (
    <section id="topo" className="relative overflow-hidden pb-16 pt-[calc(var(--header-height)+1.5rem)] sm:pb-20 lg:pb-24 lg:pt-[calc(var(--header-height)+2.5rem)]">
      {/* Arcos herdados do simbolo — decorativos. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="arc arc-light -left-[32%] top-[-18%] h-[46rem] w-[46rem] sm:-left-[18%]" />
        <span className="arc -right-[38%] bottom-[-34%] h-[38rem] w-[38rem]" />
      </div>

      <div className="container-macleny relative">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <SectionReveal>
              <p className="eyebrow text-heritage">{hero.eyebrow}</p>
            </SectionReveal>

            <SectionReveal delay={90}>
              <h1 className="type-serif type-h1 mt-5 text-balance">
                {hero.titleLines.map((line, index) => (
                  <span key={line} className="block">
                    {index === 1 ? <em className="not-italic text-heritage">{line}</em> : line}
                  </span>
                ))}
              </h1>
            </SectionReveal>

            <SectionReveal delay={170}>
              <p className="type-body-lg mt-6 max-w-lg text-espresso-soft">{hero.body}</p>
            </SectionReveal>

            <SectionReveal delay={250}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <WhatsAppButton location="hero" variant="primary">
                  {hero.primaryCta}
                </WhatsAppButton>

                <a href={hero.secondaryHref} className="btn btn-secondary">
                  {hero.secondaryCta}
                </a>
              </div>
            </SectionReveal>

            <SectionReveal delay={320}>
              <p className="mt-6 text-sm italic text-espresso-muted">
                {hero.signature}
              </p>
            </SectionReveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <SectionReveal delay={120}>
              <figure className="relative">
                <ParallaxMedia strength={16}>
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-full rounded-b-[2rem] bg-ivory-deep sm:aspect-[5/6] lg:aspect-auto lg:h-[clamp(24rem,60vh,32rem)]">
                    <Image
                      src={hero.image.src}
                      alt={hero.image.alt}
                      fill
                      priority
                      sizes="(max-width: 1023px) 100vw, 52vw"
                      className="object-cover object-center"
                    />
                  </div>
                </ParallaxMedia>

                <figcaption className="visually-hidden">
                  Fotografia editorial do {siteConfig.brand.name}.
                </figcaption>
              </figure>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
