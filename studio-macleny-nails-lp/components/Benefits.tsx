import SectionReveal from "./SectionReveal";
import { pillars, pillarsSection } from "@/lib/content";

export default function Benefits() {
  return (
    <section id="diferenciais" className="section-space border-t border-line">
      <div className="container-macleny">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionReveal>
              <p className="eyebrow text-heritage">{pillarsSection.eyebrow}</p>
              <h2 className="type-serif type-h2 mt-6 text-balance">
                {pillarsSection.title}
              </h2>
            </SectionReveal>
          </div>

          <div className="lg:col-span-7">
            <ul className="grid gap-px overflow-hidden rounded-[1.75rem] bg-line sm:grid-cols-2">
              {pillars.map((pillar, index) => (
                <SectionReveal
                  key={pillar.id}
                  as="li"
                  delay={index * 80}
                  className="bg-ivory p-7 sm:p-9"
                >
                  <span
                    aria-hidden="true"
                    className="type-serif text-sm text-espresso-muted"
                  >
                    {pillar.index}
                  </span>
                  <h3 className="type-serif type-h3 mt-4">{pillar.title}</h3>
                  <p className="mt-3 text-espresso-soft">{pillar.description}</p>
                </SectionReveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
