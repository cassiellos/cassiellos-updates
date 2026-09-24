import Image from "next/image";

import SectionReveal from "./SectionReveal";
import { experienceSection, experienceSteps } from "@/lib/content";
import { revealDelay, staggerDelay } from "@/lib/motion";

export default function MaclenyExperience() {
  return (
    <section
      id="experiencia"
      className="on-espresso section-space relative overflow-hidden bg-espresso text-ivory"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="arc arc-champagne -left-[26%] top-[8%] h-[40rem] w-[40rem] opacity-40" />
      </div>

      <div className="container-macleny relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionReveal kind="quiet">
              {/* Mesma forma dos capitulos 01 e 02: fio, indice, rotulo. */}
              <p className="eyebrow flex items-center gap-3 text-champagne max-sm:gap-2.5">
                <span aria-hidden="true" className="h-px w-8 bg-champagne/50 max-sm:w-6 max-sm:bg-champagne/30" />
                <span>{experienceSection.index} —</span>
                {experienceSection.eyebrow}
              </p>
            </SectionReveal>

            <SectionReveal>
              <h2 className="type-serif type-h2 mt-6 text-balance">
                {experienceSection.title}
              </h2>
            </SectionReveal>

            <SectionReveal delay={revealDelay.support} kind="support">
              <p className="type-serif mt-5 max-w-lg text-[clamp(1.125rem,1.7vw,1.5rem)] leading-snug text-champagne">
                {experienceSection.lead}
              </p>
              <p className="type-body-lg mt-5 max-w-lg text-ivory/75">
                {experienceSection.body}
              </p>
            </SectionReveal>

            <SectionReveal delay={revealDelay.detail} kind="media" className="mt-10 hidden lg:block">
              <div className="media-frame aspect-[5/4] w-full rounded-[1.75rem] bg-espresso-soft">
                <Image
                  src={experienceSection.image.src}
                  alt={experienceSection.image.alt}
                  fill
                  loading="lazy"
                  sizes="40vw"
                  className="object-cover object-center"
                />
              </div>
            </SectionReveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <ol className="relative">
              <span
                aria-hidden="true"
                className="absolute bottom-3 left-[0.6875rem] top-3 w-px bg-champagne/25"
              />

              {experienceSteps.map((step, index) => (
                <SectionReveal
                  key={step.index}
                  as="li"
                  delay={staggerDelay(index)}
                  kind="support"
                  className="relative grid grid-cols-[1.375rem_1fr] gap-5 pb-11 last:pb-0 sm:gap-7"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.5625rem] h-[0.4375rem] w-[0.4375rem] translate-x-[0.46875rem] rounded-full bg-champagne"
                  />
                  {/*
                    A numeracao 01..05 do passo saiu pelo mesmo motivo da dos
                    cards de servico: com a secao virando "03 — Macleny
                    Experience", um "03" no sobretitulo e outro na lista a
                    poucos pixels leriam como erro. O dado continua em
                    `content.ts` ate a cliente definir o criterio.

                    Nao ficou buraco: o ponto champagne a esquerda ja era o
                    marcador do item, e agora ele alinha com o titulo.
                  */}
                  <div>
                    <h3 className="type-serif type-h3">{step.title}</h3>
                    <p className="mt-2.5 max-w-lg text-[0.9375rem] leading-relaxed text-ivory/70">
                      {step.description}
                    </p>
                  </div>
                </SectionReveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
