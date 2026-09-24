import Image from "next/image";

import SectionReveal from "./SectionReveal";
import { gallery, gallerySection } from "@/lib/content";
import { revealDelay, staggerDelay } from "@/lib/motion";

const ratioClass = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[5/4]",
  square: "aspect-square",
} as const;

const spanClass = {
  5: "lg:col-span-5",
  6: "lg:col-span-6",
  7: "lg:col-span-7",
} as const;

const startClass = {
  2: "lg:col-start-2",
  3: "lg:col-start-3",
  4: "lg:col-start-4",
} as const;

export default function EditorialGallery() {
  if (gallery.length === 0) return null;

  return (
    <section id="resultados" className="section-space border-t border-line">
      <div className="container-macleny">
        <div className="max-w-3xl">
          <SectionReveal kind="quiet">
            <p className="eyebrow text-heritage">{gallerySection.eyebrow}</p>
          </SectionReveal>

          <SectionReveal>
            <h2 className="type-serif type-h2 mt-6 text-balance">
              {gallerySection.title}
            </h2>
          </SectionReveal>

          <SectionReveal delay={revealDelay.support} kind="support">
            <p className="type-body-lg mt-6 text-espresso-soft">{gallerySection.body}</p>
          </SectionReveal>
        </div>

        {/* Assimetria controlada: a terceira imagem deixa espaço negativo. */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-12 lg:gap-6">
          {gallery.map((item, index) => (
            <SectionReveal
              key={item.id}
              delay={staggerDelay(index, 90)}
              kind="media"
              className={[
                "group",
                spanClass[item.span],
                item.start ? startClass[item.start] : "",
                item.ratio === "square" ? "sm:col-span-2" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <figure
                className={[
                  "media-frame w-full rounded-[1.5rem] bg-ivory-deep",
                  ratioClass[item.ratio],
                ].join(" ")}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 45vw"
                  /*
                    Sem utility de transicao aqui: a duracao e o easing do zoom
                    vivem em `.media-frame img`, com o resto da linguagem. A
                    utility de hover permanece porque o Tailwind 4 a emite como
                    `scale:`, propriedade separada do `transform` do reveal.
                  */
                  className="object-cover object-center motion-safe:group-hover:scale-[1.02]"
                />
              </figure>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
