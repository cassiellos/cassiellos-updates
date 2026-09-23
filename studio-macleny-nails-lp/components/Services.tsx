import Image from "next/image";

import SectionReveal from "./SectionReveal";
import WhatsAppButton from "./WhatsAppButton";
import { enabledServices, servicesSection } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

export default function Services() {
  if (enabledServices.length === 0) return null;

  return (
    <section id="servicos">
      {/* Faixa de abertura, em Espresso */}
      <div className="on-espresso relative overflow-hidden bg-espresso text-ivory">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <span className="arc arc-champagne -right-[18%] top-[-46%] h-[42rem] w-[42rem] opacity-45" />
        </div>

        <div className="container-macleny relative grid items-center gap-10 py-16 lg:grid-cols-12 lg:gap-14 lg:py-24">
          <div className="lg:col-span-6">
            <SectionReveal>
              <p className="eyebrow flex items-center gap-3 text-champagne">
                <span aria-hidden="true" className="h-px w-8 bg-champagne/50" />
                {servicesSection.eyebrow}
              </p>
              <h2 className="type-serif type-h2 mt-6 text-balance">
                {servicesSection.title}
              </h2>
              <p className="type-body-lg mt-6 max-w-xl text-ivory/75">
                {servicesSection.body}
              </p>
            </SectionReveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <SectionReveal delay={120}>
              <div className="relative">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.75rem] bg-espresso-soft">
                  <Image
                    src={servicesSection.image.src}
                    alt={servicesSection.image.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 1023px) 100vw, 46vw"
                    className="object-cover object-center"
                  />
                </div>
                <p className="eyebrow mt-5 max-w-[12rem] text-champagne">
                  {servicesSection.aside}
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>

      {/* Cards de servico */}
      <div className="bg-ivory-warm">
        {enabledServices.map((service, index) => {
          const imageFirst = index % 2 === 0;

          return (
            <article
              key={service.id}
              className="border-b border-line last:border-b-0"
            >
              <div className="container-macleny grid items-center gap-8 py-14 lg:grid-cols-12 lg:gap-14 lg:py-20">
                <SectionReveal
                  className={[
                    "lg:col-span-5",
                    imageFirst ? "" : "lg:order-2 lg:col-start-8",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <figure className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] bg-ivory-deep">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 1023px) 100vw, 40vw"
                      className="object-cover object-center"
                    />
                    {/*
                      Veu escuro na base: garante que a legenda continue legivel
                      qualquer que seja a fotografia colocada no slot, clara ou
                      escura. Sem ele, o texto some em fotos de fundo claro.
                    */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-espresso/70 to-transparent"
                    />
                    <figcaption className="absolute bottom-5 left-5 right-5">
                      <span className="eyebrow block max-w-[11rem] text-ivory">
                        {service.imageCaption}
                      </span>
                    </figcaption>
                  </figure>
                </SectionReveal>

                <SectionReveal
                  delay={90}
                  className={[
                    "lg:col-span-6",
                    imageFirst ? "lg:col-start-7" : "lg:order-1 lg:col-start-1",
                  ].join(" ")}
                >
                  <p className="eyebrow flex items-center gap-3 text-espresso-muted">
                    {service.index}
                    <span aria-hidden="true" className="h-px w-8 bg-line" />
                  </p>

                  <h3 className="type-serif mt-4 text-[clamp(1.875rem,3.2vw,2.75rem)] leading-[1.05]">
                    {service.title}
                  </h3>
                  <p className="type-serif mt-3 text-[clamp(1.0625rem,1.6vw,1.375rem)] leading-snug text-espresso-soft">
                    {service.lead}
                  </p>

                  {service.description.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 32)}
                      className="mt-4 max-w-2xl text-espresso-soft"
                    >
                      {paragraph}
                    </p>
                  ))}

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {service.includes.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-line px-3.5 py-1.5 text-[0.8125rem] text-espresso-soft"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p className="type-serif mt-7 border-l border-champagne pl-4 text-[1.0625rem] italic leading-snug text-heritage">
                    {service.highlight}
                  </p>

                  <WhatsAppButton
                    location="services"
                    service={service.id}
                    variant="primary"
                    className="mt-7"
                    message={service.whatsappMessage}
                  >
                    {service.cta}
                  </WhatsAppButton>
                </SectionReveal>
              </div>
            </article>
          );
        })}
      </div>

      {/* Faixa de assinatura e orientacao */}
      <div className="border-t border-line bg-ivory-warm">
        <div className="container-macleny py-10">
          <SectionReveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <h3 className="type-serif type-h3">{servicesSection.helperTitle}</h3>
                <p className="mt-2 text-espresso-soft">{servicesSection.helperBody}</p>
              </div>
              <WhatsAppButton
                location="services_helper"
                variant="secondary"
                className="shrink-0"
              >
                {servicesSection.helperCta}
              </WhatsAppButton>
            </div>

            <hr className="rule my-8" />

            <p className="flex flex-col gap-2 text-[0.6875rem] uppercase tracking-[0.22em] text-espresso-muted sm:flex-row sm:items-center sm:justify-between">
              <span>{siteConfig.brand.name}</span>
              <span>Beleza real em cada detalhe</span>
              <span>
                {siteConfig.brand.city} — {siteConfig.brand.state}
              </span>
            </p>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
