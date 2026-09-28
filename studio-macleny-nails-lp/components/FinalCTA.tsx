import SectionReveal from "./SectionReveal";
import WhatsAppButton from "./WhatsAppButton";
import { finalCta } from "@/lib/content";
import { revealDelay } from "@/lib/motion";

export default function FinalCTA() {
  return (
    <section className="on-espresso relative overflow-hidden bg-espresso text-ivory">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="arc arc-champagne left-1/2 top-[-60%] h-[52rem] w-[52rem] -translate-x-1/2 opacity-35" />
      </div>

      <div className="container-macleny relative section-space">
        {/*
          Fecho da narrativa: o CTA entra por ultimo, depois do convite ter
          sido lido. E a unica secao em que o atraso do botao importa de
          verdade — ele precisa parecer consequencia, nao oferta.
        */}
        <div className="mx-auto max-w-3xl text-center">
          <SectionReveal kind="quiet">
            <p className="eyebrow text-champagne">{finalCta.eyebrow}</p>
          </SectionReveal>

          <SectionReveal>
            <h2 className="type-serif type-h2 mt-6 text-balance">{finalCta.title}</h2>
          </SectionReveal>

          <SectionReveal delay={revealDelay.support} kind="support">
            <p className="type-body-lg mx-auto mt-6 max-w-xl text-ivory/75">
              {finalCta.body}
            </p>
          </SectionReveal>

          <SectionReveal delay={revealDelay.cta} kind="support">
            <div className="mt-9 flex justify-center">
              <WhatsAppButton location="final_cta" variant="on-dark">
                {finalCta.cta}
              </WhatsAppButton>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
