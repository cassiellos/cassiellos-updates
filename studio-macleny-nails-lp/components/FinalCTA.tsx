import SectionReveal from "./SectionReveal";
import WhatsAppButton from "./WhatsAppButton";
import { finalCta } from "@/lib/content";

export default function FinalCTA() {
  return (
    <section className="on-espresso relative overflow-hidden bg-espresso text-ivory">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="arc arc-champagne left-1/2 top-[-60%] h-[52rem] w-[52rem] -translate-x-1/2 opacity-35" />
      </div>

      <div className="container-macleny relative section-space">
        <SectionReveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-champagne">{finalCta.eyebrow}</p>
          <h2 className="type-serif type-h2 mt-6 text-balance">{finalCta.title}</h2>
          <p className="type-body-lg mx-auto mt-6 max-w-xl text-ivory/75">
            {finalCta.body}
          </p>

          <div className="mt-9 flex justify-center">
            <WhatsAppButton location="final_cta" variant="on-dark">
              {finalCta.cta}
            </WhatsAppButton>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
