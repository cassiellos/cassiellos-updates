"use client";

import { useState } from "react";

import SectionReveal from "./SectionReveal";
import { faqSection, type FaqItem } from "@/lib/content";
import { staggerDelay } from "@/lib/motion";

type FAQProps = {
  items: FaqItem[];
};

export default function FAQ({ items }: FAQProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  if (items.length === 0) return null;

  return (
    <section id="faq" className="section-space border-t border-line">
      <div className="container-macleny">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionReveal kind="quiet">
              <p className="eyebrow text-heritage">{faqSection.eyebrow}</p>
            </SectionReveal>

            <SectionReveal>
              <h2 className="type-serif type-h2 mt-6 text-balance">
                {faqSection.title}
              </h2>
            </SectionReveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <ul className="border-t border-line">
              {items.map((item, index) => {
                const isOpen = openId === item.id;
                const panelId = `faq-panel-${item.id}`;
                const buttonId = `faq-button-${item.id}`;

                return (
                  <SectionReveal
                    key={item.id}
                    as="li"
                    delay={staggerDelay(index, 60)}
                    kind="support"
                    className="border-b border-line"
                  >
                    <h3>
                      <button
                        type="button"
                        id={buttonId}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpenId(isOpen ? null : item.id)}
                        className="accordion-trigger flex w-full items-start justify-between gap-6 py-6 text-left transition-colors duration-[var(--dur-micro)] ease-[var(--ease-macleny)] hover:text-heritage"
                      >
                        <span className="type-serif text-[clamp(1.1875rem,2vw,1.5rem)] leading-snug">
                          {item.question}
                        </span>
                        {/*
                          O sinal nao troca de caractere: sao duas barras
                          cruzadas e a vertical recolhe ao abrir. Trocar "+"
                          por "−" reflui a caixa e produz um micro-salto.
                        */}
                        <span
                          aria-hidden="true"
                          className="accordion-glyph mt-1 h-8 w-8 shrink-0 rounded-full border border-line transition-colors duration-[var(--dur-micro)] ease-[var(--ease-macleny)]"
                        />
                      </button>
                    </h3>

                    {/*
                      `hidden` foi trocado por `inert`: um painel `hidden` nao
                      pode ser animado, mas precisa continuar fora da ordem de
                      foco e fora da arvore de acessibilidade quando fechado —
                      que e exatamente o que `inert` faz. A altura anima por
                      grid-template-rows, sem medicao em JavaScript.
                    */}
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      inert={!isOpen}
                      data-open={isOpen}
                      className="accordion-panel"
                    >
                      <div>
                        <p className="pb-7 pr-12 text-espresso-soft">{item.answer}</p>
                      </div>
                    </div>
                  </SectionReveal>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
