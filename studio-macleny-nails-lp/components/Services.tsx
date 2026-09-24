import Image from "next/image";

import SectionReveal from "./SectionReveal";
import WhatsAppButton from "./WhatsAppButton";
import { enabledServices, serviceItemMessage, servicesSection } from "@/lib/content";
import { revealDelay } from "@/lib/motion";
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
            <SectionReveal kind="quiet">
              {/*
                No celular o champagne recua: o detalhe premium deve ser
                percebido DEPOIS do conteudo, nao antes. O indice editorial
                so existe nesta faixa — ver o aviso no commit sobre ele
                coincidir com o "01" do primeiro card logo abaixo.
              */}
              <p className="eyebrow flex items-center gap-3 text-champagne max-sm:gap-2.5 max-sm:text-champagne/70">
                <span aria-hidden="true" className="h-px w-8 bg-champagne/50 max-sm:w-6 max-sm:bg-champagne/30" />
                <span className="hidden max-sm:inline">{servicesSection.index} —</span>
                {servicesSection.eyebrow}
              </p>
            </SectionReveal>

            <SectionReveal>
              <h2 className="type-serif type-h2 mt-6 text-balance">
                {servicesSection.title}
              </h2>
            </SectionReveal>

            <SectionReveal delay={revealDelay.support} kind="support">
              {/*
                Celular: corpo 17 -> 14px (-18%), entrelinha 1,7 -> 1,8 e
                medida mais curta. O apoio estava disputando atencao com o
                titulo; o silencio entre os dois e o que faz a serifada virar
                protagonista. O respiro de 52px abaixo do titulo faz o mesmo
                trabalho — por isso ele esta aqui e nao no `mt-6` do h2.

                Sao utilities, e nao CSS: a geometria deste bloco ja vive toda
                em utilities, e dividi-la entre as duas fontes e o que ja
                quebrou a assinatura do hero e a fotografia.
              */}
              <p className="type-body-lg mt-6 max-w-xl text-ivory/75 max-sm:mt-[3.5rem] max-sm:max-w-[20rem] max-sm:text-sm max-sm:leading-[1.8]">
                {servicesSection.body}
              </p>
            </SectionReveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <SectionReveal kind="media">
              <div className="relative">
                {/*
                  Celular: 4:3 -> 3:2 (12% menos altura) e raio 28 -> 16px. O
                  arredondamento grande lia como card de aplicativo; o menor
                  aproxima a moldura de uma fotografia impressa.

                  O recorte sobe para 58% da altura: e onde as maos ficam
                  centradas e sobra menos mesa embaixo, entao as unhas sao
                  percebidas antes. Medido nas tres posicoes antes de fechar.
                */}
                <div className="media-frame aspect-[4/3] w-full rounded-[1.75rem] bg-espresso-soft max-sm:aspect-[3/2] max-sm:rounded-[1rem]">
                  <Image
                    src={servicesSection.image.src}
                    alt={servicesSection.image.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 1023px) 100vw, 46vw"
                    className="object-cover object-center max-sm:object-[50%_58%]"
                  />
                </div>
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
                  kind="media"
                  className={[
                    "lg:col-span-5",
                    imageFirst ? "" : "lg:order-2 lg:col-start-8",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <figure className="media-frame aspect-[4/3] w-full rounded-[1.5rem] bg-ivory-deep">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 1023px) 100vw, 40vw"
                      className="object-cover object-center"
                    />
                    {/*
                      Veu e legenda so existem quando ha texto. Sem essa guarda,
                      um card de legenda vazia ainda ganhava a faixa escura na
                      base da foto, sem nada para justificar.
                    */}
                    {service.imageCaption ? (
                      <>
                        {/*
                          Veu escuro na base: mantem a legenda legivel sobre
                          qualquer fotografia, clara ou escura.
                        */}
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-espresso/70 to-transparent"
                        />
                        <figcaption className="absolute bottom-5 left-5 right-5">
                          {/*
                            Sem largura maxima artificial: a legenda ocupa a
                            linha inteira e so quebra quando precisa. `balance`
                            distribui as linhas por igual em vez de deixar uma
                            palavra orfa na ultima.
                          */}
                          <span className="eyebrow block text-balance text-ivory">
                            {service.imageCaption}
                          </span>
                        </figcaption>
                      </>
                    ) : null}
                  </figure>
                </SectionReveal>

                {/*
                  Tres niveis de entrada, nao um bloco so: o fio e o titulo
                  abrem, o corpo do texto vem logo atras e o CTA fecha. E o
                  que faz o olho descer na ordem certa sem que a sequencia
                  chegue a ser percebida como sequencia.
                */}
                <div
                  className={[
                    "lg:col-span-6",
                    imageFirst ? "lg:col-start-7" : "lg:order-1 lg:col-start-1",
                  ].join(" ")}
                >
                  {/*
                    A numeracao 01..04 saiu a pedido da cliente, que vai
                    redefinir o criterio. O dado continua em `content.ts`
                    (`Service.index`), so nao e mais exibido — apagar o
                    numero e apagar o campo sao coisas diferentes, e o
                    segundo perderia a informacao.

                    O fio de 1px ficou: ele nao era suporte do numero, e a
                    marca que abre o bloco de texto e mantem o ritmo vertical
                    do card. Sem ele o titulo encostaria na fotografia.
                  */}
                  <SectionReveal kind="quiet">
                    <p aria-hidden="true" className="eyebrow flex items-center text-espresso-muted">
                      <span className="h-px w-8 bg-line" />
                    </p>
                  </SectionReveal>

                  <SectionReveal>
                    <h3 className="type-serif mt-4 text-[clamp(1.875rem,3.2vw,2.75rem)] leading-[1.05]">
                      {service.title}
                    </h3>
                    <p className="type-serif mt-3 text-[clamp(1.0625rem,1.6vw,1.375rem)] leading-snug text-espresso-soft">
                      {service.lead}
                    </p>
                  </SectionReveal>

                  <SectionReveal delay={revealDelay.support} kind="support">
                    {service.description.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 32)}
                        className="mt-4 max-w-2xl text-espresso-soft"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </SectionReveal>

                  <SectionReveal delay={revealDelay.detail} kind="quiet">
                    {/*
                      Cada tecnica e um CTA proprio: a cliente chega ao
                      WhatsApp ja dizendo o que procura, e do lado de ca sabe-se
                      qual tecnica gerou o contato. As classes de aparencia
                      saem do <li> e vao para o <a>, de modo que o alvo de
                      toque seja o chip inteiro e nao so o texto.
                    */}
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {service.includes.map((item) => (
                        <li key={item}>
                          <WhatsAppButton
                            location="service_item"
                            service={service.id}
                            variant="bare"
                            showGlyph={false}
                            message={serviceItemMessage(item)}
                            className="inline-block rounded-full border border-line px-3.5 py-1.5 text-[0.8125rem] text-espresso-soft transition-colors duration-[var(--dur-micro)] ease-[var(--ease-macleny)] hover:border-espresso hover:text-espresso"
                          >
                            {item}
                          </WhatsAppButton>
                        </li>
                      ))}
                    </ul>

                    <p className="type-serif mt-7 border-l border-champagne pl-4 text-[1.0625rem] italic leading-snug text-heritage">
                      {service.highlight}
                    </p>
                  </SectionReveal>

                  <SectionReveal delay={revealDelay.cta} kind="support">
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
              </div>
            </article>
          );
        })}
      </div>

      {/* Faixa de assinatura e orientacao */}
      <div className="border-t border-line bg-ivory-warm">
        <div className="container-macleny py-10">
          <SectionReveal kind="support">
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
