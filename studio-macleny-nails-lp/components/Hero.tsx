import Image from "next/image";

import RevealOnLoad from "./RevealOnLoad";
import WhatsAppButton from "./WhatsAppButton";
import { hero } from "@/lib/content";
import { heroDelay } from "@/lib/motion";
import { siteConfig } from "@/lib/site-config";

export default function Hero() {
  return (
    <section id="topo" className="relative overflow-hidden pb-[14rem] pt-[calc(var(--header-height)+1.5rem)] sm:pb-[16rem] lg:pb-24 lg:pt-[calc(var(--header-height)+2.5rem)]">
      {/* Arcos herdados do simbolo — decorativos. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="arc arc-light -left-[32%] top-[-18%] h-[46rem] w-[46rem] sm:-left-[18%]" />
        <span className="arc -right-[38%] bottom-[-34%] h-[38rem] w-[38rem]" />
      </div>

      {/* z-10: em lg a fotografia e irma posicionada e vem depois no DOM. */}
      <div className="container-macleny relative z-10">
        <div className="lg:grid lg:grid-cols-12">
          <div className="lg:col-span-6">
            <RevealOnLoad kind="quiet">
              <p className="eyebrow text-heritage">{hero.eyebrow}</p>
            </RevealOnLoad>

            <RevealOnLoad delay={heroDelay.title}>
              <h1 className="type-serif type-h1 mt-5 text-balance">
                {hero.titleLines.map((line, index) => (
                  <span key={line} className="block">
                    {index === 1 ? <em className="not-italic text-heritage">{line}</em> : line}
                  </span>
                ))}
              </h1>
            </RevealOnLoad>

            <RevealOnLoad delay={heroDelay.body} kind="support">
              <p className="type-body-lg mt-6 max-w-lg text-espresso-soft">{hero.body}</p>
            </RevealOnLoad>

            <RevealOnLoad delay={heroDelay.cta} kind="support">
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <WhatsAppButton location="hero" variant="primary">
                  {hero.primaryCta}
                </WhatsAppButton>

                {/*
                  O secundario ganha fundo Ivory ate lg. Ele e transparente por
                  padrao, e sobre a fotografia do hero mobile a figura aparecia
                  atraves do botao. O Ivory e a propria cor da pagina: onde nao
                  ha foto atras, nada muda visualmente.
                */}
                <a
                  href={hero.secondaryHref}
                  className="btn btn-secondary bg-ivory lg:bg-transparent"
                >
                  {hero.secondaryCta}
                </a>
              </div>
            </RevealOnLoad>

            <RevealOnLoad delay={heroDelay.signature} kind="quiet">
              {/*
                No mobile esta linha passa sobre a fotografia. Em Espresso
                cheio ela se sustenta sobre pele e tecido claro; o tom `muted`
                original so tem contraste suficiente sobre o Ivory, e volta a
                partir de lg, onde nao ha foto atras dela.
              */}
              <p className="mt-6 text-sm italic text-espresso lg:text-espresso-muted">
                {hero.signature}
              </p>
            </RevealOnLoad>
          </div>
        </div>
      </div>

      {/*
        A fotografia e um recorte com alfa: assenta direto sobre o Ivory, sem
        moldura e sem emenda, deixando os arcos aparecerem por tras. E painel
        sangrado na direita da viewport — por isso mora FORA do container, que
        tem largura maxima. Nao usa ParallaxMedia: deslocar um elemento preso a
        inset-y-0 abriria vao no topo ou na base.

        No mobile ela nao e um bloco abaixo do texto: e FUNDO. Ancora no canto
        inferior direito e sobe ate a altura dos CTAs, passando POR TRAS deles
        e da assinatura. O botao primario, opaco, recorta a figura; o que
        aparece e a faixa a direita dele, na calha do container. E dai que vem
        a presenca sem custo de altura.

        A ordem de pintura garante a leitura: o container tem z-10 e esta
        figura nao tem z-index, entao texto e botoes ficam sempre por cima. O
        padding da base e calibrado para a figura nao subir alem dos CTAs —
        nenhum paragrafo chega a ter fotografia atras.

        A ALTURA da caixa (17rem) e deliberadamente maior que o padding da
        base (14rem). A diferenca — 3rem — e exatamente o quanto a figura sobe
        acima do fim do conteudo, e por isso e a mesma em qualquer largura de
        tela. A partir de sm as duas sobem juntas (19rem e 16rem), mantendo a
        mesma diferenca.

        Dimensionar a caixa em vw nao funciona aqui: ela cresceria com a tela
        enquanto o bloco de texto ENCOLHE (a copy reflui em menos linhas), e a
        figura acabava invadindo o paragrafo nas larguras maiores. Ancorando
        ao padding, a posicao relativa ao conteudo fica constante.

        A largura e `w-full` so para o `object-contain` ser limitado pela
        ALTURA — assim a imagem mede sempre 267x272 (298x304 a partir de sm),
        e o `sizes` pode declarar esses valores exatos em vez de uma fracao da
        viewport.

        O DEGRADE por tras da imagem reproduz uma coisa medida na referencia:
        la a fotografia nao termina seca na silhueta, ela mantem um halo do
        proprio fundo que desvanece. No canto inferior direito o tom medido e
        (244,236,229) contra (246,240,233) do Ivory da pagina — diferenca de 2
        a 4 por canal, quase invisivel isolada, mas e ela que faz a figura
        parecer assentada e nao colada. O gradiente parte desse tom e chega a
        transparente a 70%. So abaixo de lg: no desktop a foto sangra a
        viewport inteira e nao precisa de halo.
      */}
      <figure className="pointer-events-none absolute bottom-0 right-0 h-[17rem] w-full bg-[radial-gradient(135%_115%_at_100%_100%,rgba(233,224,211,0.92)_0%,rgba(243,237,229,0.5)_42%,rgba(244,239,232,0)_70%)] sm:h-[19rem] lg:inset-y-0 lg:h-auto lg:w-1/2 lg:max-w-[46rem] lg:bg-none">
        <Image
          src={hero.image.src}
          alt={hero.image.alt}
          fill
          priority
          /*
            Abaixo de lg a imagem tem largura fixa (267px, 298px a partir de
            sm), porque a caixa tem altura fixa e o `object-contain` e
            limitado por ela. Declarar esses valores exatos, em vez de uma
            fracao da viewport, evita o que acontecia antes: o tablet buscava
            a variante de 1920px para exibir 538px.
          */
          sizes="(min-width: 1024px) min(50vw, 46rem), (min-width: 640px) 298px, 267px"
          className="object-contain object-right-bottom lg:object-cover lg:object-top"
        />

        <figcaption className="visually-hidden">
          Fotografia editorial do {siteConfig.brand.name}.
        </figcaption>
      </figure>
    </section>
  );
}
