import Image from "next/image";

import ParallaxMedia from "./ParallaxMedia";
import SectionReveal from "./SectionReveal";
import { founder } from "@/lib/content";

export default function Founder() {
  return (
    <section id="sobre" className="section-space border-t border-line bg-ivory-warm">
      <div className="container-macleny">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionReveal>
              <ParallaxMedia strength={14}>
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-full rounded-b-[2rem] bg-ivory-deep">
                  <Image
                    src={founder.image.src}
                    alt={founder.image.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 1023px) 100vw, 40vw"
                    className="object-cover object-center"
                  />
                </div>
              </ParallaxMedia>
            </SectionReveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <SectionReveal>
              <p className="eyebrow text-heritage">{founder.eyebrow}</p>
              <h2 className="type-serif type-h2 mt-6 text-balance">
                {founder.titleLines.map((line, index) => (
                  <span key={line} className="block">
                    {index === 1 ? (
                      <em className="not-italic text-heritage">{line}</em>
                    ) : (
                      line
                    )}
                  </span>
                ))}
              </h2>
            </SectionReveal>

            {founder.body.map((paragraph, index) => (
              <SectionReveal key={paragraph.slice(0, 24)} delay={100 + index * 80}>
                <p className="type-body-lg mt-6 max-w-xl text-espresso-soft">
                  {paragraph}
                </p>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
