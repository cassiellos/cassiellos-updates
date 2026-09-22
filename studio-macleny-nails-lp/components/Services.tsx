import Image from "next/image";

import SectionReveal from "./SectionReveal";
import WhatsAppButton from "./WhatsAppButton";
import { enabledServices, servicesSection } from "@/lib/content";

export default function Services() {
  if (enabledServices.length === 0) return null;

  return (
    <section id="servicos" className="section-space border-t border-line bg-ivory-warm">
      <div className="container-macleny">
        <SectionReveal className="max-w-3xl">
          <p className="eyebrow text-heritage">{servicesSection.eyebrow}</p>
          <h2 className="type-serif type-h2 mt-6 text-balance">
            {servicesSection.title}
          </h2>
        </SectionReveal>

        <div className="mt-12 grid gap-10 lg:mt-16">
          {enabledServices.map((service, index) => (
            <SectionReveal key={service.id} delay={index * 90}>
              <article className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
                <div className="lg:col-span-6">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.75rem] bg-ivory-deep lg:aspect-[5/4]">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 1023px) 100vw, 48vw"
                      className="object-cover object-center"
                    />
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <h3 className="type-serif text-[clamp(2rem,3.4vw,3rem)] leading-[1.05]">
                    {service.title}
                  </h3>
                  <p className="type-body-lg mt-5 max-w-xl text-espresso-soft">
                    {service.description}
                  </p>
                  <WhatsAppButton
                    location="services"
                    service="manutencao"
                    variant="primary"
                    className="mt-8"
                    message={service.whatsappMessage}
                  >
                    {service.cta}
                  </WhatsAppButton>
                </div>
              </article>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal className="mt-14 lg:mt-20">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-line px-7 py-10 sm:px-10 sm:py-12">
            <span
              aria-hidden="true"
              className="arc arc-champagne -right-24 -top-28 h-72 w-72"
            />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <h3 className="type-serif type-h3">{servicesSection.helperTitle}</h3>
                <p className="mt-3 text-espresso-soft">{servicesSection.helperBody}</p>
              </div>
              <WhatsAppButton
                location="services_helper"
                variant="secondary"
                className="shrink-0"
              >
                {servicesSection.helperCta}
              </WhatsAppButton>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
