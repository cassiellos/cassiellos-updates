# Design System — Studio Macleny Nails

> **Aviso de procedência (leia primeiro).**
> O arquivo `Dossie_Estrategico_Studio_Macleny_Nails_v1.2_FINAL` **não estava
> disponível** no ambiente em que este projeto foi construído. Tudo que aparece
> marcado abaixo como *DOSSIÊ (via briefing)* foi extraído do resumo do dossiê
> transcrito no briefing de produção da landing page, e não da leitura direta do
> documento. Antes do lançamento, este arquivo deve ser conferido contra o
> dossiê original — especialmente cores, tipografia e hierarquia de marca.

## Legenda de status

| Status | Significado |
| --- | --- |
| `OFICIAL` | Decisão confirmada da marca. |
| `DOSSIÊ (via briefing)` | Consta do resumo do dossiê; confirmar contra o documento. |
| `PRELIMINAR` | O próprio dossiê classifica como valor de teste / a validar. |
| `IMPLEMENTAÇÃO` | Decisão de UI tomada neste projeto. **Não é regra de branding.** |
| `PENDENTE` | Ainda não existe dado confirmado. |

---

## A. Tokens extraídos da marca

### A.1 Nome e hierarquia

| Item | Valor | Status |
| --- | --- | --- |
| Nome canônico | Studio Macleny Nails | `DOSSIÊ (via briefing)` |
| Ativo principal | MACLENY | `DOSSIÊ (via briefing)` |
| Descritores | "Studio" e "Nails" | `DOSSIÊ (via briefing)` |
| Fundadora | Jheniffer Macleny | `DOSSIÊ (via briefing)` |
| Princípio | Evolução, não ruptura | `DOSSIÊ (via briefing)` |

MACLENY tem o maior protagonismo visual sempre que a assinatura for reproduzida.
Jheniffer é a origem técnica e humana; Macleny é a marca protagonista.

### A.2 Conceito estratégico

- **Território:** excelência individualizada (escuta + diagnóstico + técnica +
  personalização + execução + experiência).
- **Essência:** "Excelência feita para cada mulher."
- **Bússola interna:** "Excelência técnica. Experiência individual."
- **Promessa:** a cliente é atendida como única e o resultado é consequência
  desse cuidado.
- **Direção visual-mãe:** *Quiet Brand. Expressive Work.* — uso **interno**; não
  virou slogan público nesta landing page.

Status de todo o bloco: `DOSSIÊ (via briefing)`.

### A.3 Pilares

`01 Excelência` · `02 Individualidade` · `03 Confiança` · `04 Sofisticação`
Os quatro pilares permanecem como direcao estrategica da marca, mas **nao sao
mais uma secao da landing page**: o bloco "O padrao Macleny" foi removido a
pedido da cliente. O territorio continua expresso na copy do hero, da jornada e
dos cards de servico.

### A.4 Personalidade e arquétipos

Sofisticada sem ser distante · confiante sem ser arrogante · técnica sem ser
complicada · humana sem ser informal demais · feminina sem ser infantil ·
expressiva sem ser extravagante · moderna sem depender de tendências · exclusiva
sem parecer artificialmente inacessível.

Direção arquetípica (Governante 50% / Amante 30% / Cuidador 20%) é **direção de
tom**, não texto para a cliente. Não aparece na interface.

### A.5 Tom de voz

**Território:** excelência, precisão, experiência, individualidade, cuidado,
confiança, especialista, detalhes, assinatura, expressão, personalização,
durabilidade, sofisticação, padrão, escuta.

**Usar com cautela:** luxo, perfeição, princesa, diva, mimo, promoção, baratinho,
corre, imperdível.

**Proibido nesta LP:** urgência histérica, caixa alta excessiva, intimidade
forçada, excesso de emojis, gírias, promessas absolutas, "melhor de BH",
"resultado perfeito", "unhas de milhões", "corre que são as últimas vagas".

> Verificação: a copy atual em `lib/content.ts` não usa nenhum termo da lista
> proibida e não faz promessa absoluta ou comparativa.

### A.6 Paleta

Todos os valores abaixo são `PRELIMINAR` — o próprio dossiê os apresenta como
preliminares. Se houver brand book final com outros HEX, **a fonte mais nova e
aprovada vence** e este arquivo deve ser atualizado.

| Token | HEX | Papel | Status |
| --- | --- | --- | --- |
| Macleny Espresso | `#1A1411` | Texto principal, seções escuras | `PRELIMINAR` |
| Macleny Ivory | `#F4EFE8` | Base dominante | `PRELIMINAR` |
| Heritage Brown | `#7A401F` | Memória, profundidade, acento de texto | `PRELIMINAR` |
| Champagne Gold | `#C7B17E` | Acento — 5–10% da composição | `PRELIMINAR` |
| Nude Taupe | `#B8A597` | Apoio, superfícies, bordas | `PRELIMINAR` |

**Proporção aplicada:** Ivory é a base dominante; duas seções são Espresso
(Macleny Experience e CTA final); Heritage aparece em eyebrows, links e na
segunda linha dos títulos; Champagne fica restrito a arcos decorativos, marcadores
da timeline e ao botão sobre fundo escuro. Não existe página "marrom e dourada",
não existe degradê dourado e não existe estética de joalheria.

**Cores que não podem virar identidade da interface:** verde, azul, vermelho,
laranja, amarelo, roxo, rosa. Nenhuma delas é usada em fundo, botão, título,
borda, ícone ou decoração. Elas podem aparecer naturalmente dentro das
fotografias — nenhum overlay é aplicado para "apagar" a cor real de um trabalho.

**WhatsApp:** o CTA **não** é verde. Usa Espresso (hover Heritage) sobre Ivory e
Champagne sobre Espresso. O ícone é monocromático, desenhado inline (sem
biblioteca de ícones).

### A.7 Tipografia

| Papel | Fonte | Status |
| --- | --- | --- |
| Display / títulos | Instrument Serif 400 | `PRELIMINAR` — dupla de teste |
| Interface / corpo | Manrope 400/500/600/700 | `PRELIMINAR` — dupla de teste |

O dossiê apresenta essa dupla **em teste**, não como tipografia aprovada. A
implementação usa `next/font/google` como solução provisória documentada. Ao
receber os arquivos oficiais, trocar para `next/font/local` em `app/layout.tsx`,
respeitando o licenciamento, e atualizar esta tabela.

> Nenhum wordmark é "fabricado" digitando MACLENY em Instrument Serif e chamando
> de logo. Ver A.8.

### A.8 Logo e símbolo

O símbolo atual é **patrimônio oficial** do rebranding. Este projeto **não**
desenhou logo nova, não gerou monograma por IA, não redesenhou a marca em CSS e
não transformou a elipse em ícone genérico.

Estado atual: `PENDENTE`. `public/brand/*.svg` contém **placeholders explícitos**
("LOGO OFICIAL PENDENTE"). Enquanto `assets.officialBrandFiles` for `false` em
`lib/site-config.ts`:

- o header e o footer usam um **fallback tipográfico de interface**
  (`components/BrandMark.tsx`), com MACLENY em maior escala e Studio/Nails como
  descritores menores;
- o JSON-LD **não** declara `logo`.

Área de proteção, tamanho mínimo e versões monocromáticas: `PENDENTE` — não
constam do material recebido e não foram inventados.

### A.9 Elemento gráfico proprietário

A curva/elipse herdada do símbolo aparece como arcos amplos, parcialmente fora da
viewport, e como recorte da fotografia (hero e founder usam moldura de topo
arredondado). Nunca como pattern repetitivo do monograma.

Implementação: classes `.arc`, `.arc-champagne`, `.arc-light` em
`app/globals.css`. Todos os arcos são `aria-hidden` e `pointer-events: none`.

### A.10 Fotografia

Três níveis: **produto** (macro, acabamento, reflexo, textura), **pessoa** (pele
real, mãos, joias discretas, fragmentos do look) e **experiência** (bancada,
instrumentos, processo, detalhes do studio).

Atmosfera: Ivory quente, madeira escura, couro/caramelo, metal champagne fosco,
pedra natural, papel, tecidos, sombra arquitetônica, espaço negativo.
Feminilidade adulta — não "fofura feminina".

Protocolo: luz macia, temperatura consistente, reflexos controlados, pele real,
edição sem plástico, poucos objetos, styling intencional.

**Estado atual:** `PENDENTE`. Todas as imagens em `public/images/` são
placeholders gerados por `scripts/generate-placeholders.mjs`, marcados na própria
imagem com "IMAGEM PROVISÓRIA — SUBSTITUIR". Nenhuma foto de banco de imagem e
nenhum trabalho de terceiros foi publicado como resultado da Macleny.

### A.11 Clichês proibidos (verificados)

Coroa, diamante, glitter, estrela brilhante, cílios, flor genérica, ícone de
esmalte, unha em clipart, mão de banco de imagem, "serifa de luxo Canva",
lettering ultrafino, rosa como atalho para feminino, degradê dourado, mármore
falso, glassmorphism, neon, glow em botão, 3D gratuito, template de salão,
estética infantil ou de princesa, visual de promoção popular.

Nenhum deles existe no projeto.

---

## B. Tokens de implementação digital propostos

> Tudo nesta seção é decisão de UI **deste projeto**, não regra do branding.

### B.1 Derivados de cor

| Token | HEX | Uso |
| --- | --- | --- |
| `--color-ivory-deep` | `#EAE2D7` | Fundo de moldura de imagem |
| `--color-ivory-warm` | `#FBF8F4` | Alternância de seção clara |
| `--color-espresso-soft` | `#3B312A` | Texto de corpo secundário |
| `--color-espresso-muted` | `#6A5C53` | Texto terciário, numeração |
| `--color-line` | `#D9CEC1` | Hairlines e bordas |

### B.2 Contraste (WCAG 2.2 AA) — medido

| Par | Razão | Veredito |
| --- | --- | --- |
| Espresso sobre Ivory | 15,94:1 | AAA |
| Espresso soft sobre Ivory | 11,07:1 | AAA |
| Heritage sobre Ivory | 7,11:1 | AAA |
| Espresso muted sobre Ivory | 5,62:1 | AA |
| Ivory sobre Espresso | 15,94:1 | AAA |
| Ivory 75% sobre Espresso | 9,29:1 | AAA |
| Ivory 70% sobre Espresso | 8,22:1 | AAA |
| Champagne sobre Espresso | 8,70:1 | AAA |
| **Champagne sobre Ivory** | **1,83:1** | **proibido para texto** |
| **Taupe sobre Ivory** | **2,07:1** | **proibido para texto** |

Regra derivada: **Champagne e Taupe nunca carregam texto sobre fundo claro.**
Sobre Ivory eles só aparecem em arcos, bordas e superfícies decorativas.

### B.3 Escala tipográfica

| Classe | `clamp()` |
| --- | --- |
| `.type-display` | `clamp(2.75rem, 7vw, 6.25rem)` |
| `.type-h1` | `clamp(2.375rem, 5vw, 4.25rem)` |
| `.type-h2` | `clamp(2rem, 4.2vw, 3.75rem)` |
| `.type-h3` | `clamp(1.25rem, 2vw, 1.75rem)` |
| `.type-body-lg` | `clamp(1.0625rem, 1.3vw, 1.1875rem)` |
| corpo | `1rem` / line-height `1.65` |
| `.eyebrow` | `0.6875rem`, uppercase, `letter-spacing 0.22em` |

Títulos usam `.type-serif` (line-height `1.02`, tracking `-0.015em`).

### B.4 Grid, container e breakpoints

- Container: máx. `80rem` (1280px).
- Gutters: 20px (mobile) → 32px (≥768px) → 48px (≥1280px).
- Grid: 1 coluna no mobile, 2 no tablet (`sm`/`md`), 12 colunas no desktop (`lg`).
- Breakpoints: padrão do Tailwind (`sm 640` · `md 768` · `lg 1024` · `xl 1280`).
- Espaçamento vertical de seção: `clamp(4.5rem, 9vw, 9rem)`.

### B.5 Escala de espaçamento

Base 4/8px (escala padrão do Tailwind): 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 80
· 96 · 128. Valores arbitrários só foram usados onde a composição editorial exige
(posicionamento dos arcos e altura da moldura do hero).

### B.6 Raios e bordas

- Botões e pills: `999px`.
- Molduras de imagem: `1.5rem`–`1.75rem`; hero e founder usam `rounded-t-full`
  (arco herdado do símbolo).
- Bordas: 1px em `--color-line`. **Nenhuma sombra** na interface, exceto uma
  sombra baixa e quente no botão flutuante.

### B.7 Motion

| Princípio | Aplicação |
| --- | --- |
| Curva única | `--ease-macleny: cubic-bezier(.22, 1, .36, 1)` — saída longa |
| Curva ida-e-volta | `--ease-macleny-inout: cubic-bezier(.65, 0, .35, 1)` |
| Durações | `--dur-micro 320ms` · `--dur-state 440ms` · `--dur-enter 860ms` · `--dur-media 1200ms` |
| Reveal | fade + `translateY`, `--dur-enter` |
| Stagger | escada de `lib/motion.ts`, teto de 4 passos |
| Parallax | 8px, só no retrato da fundadora, só ≥1024px com ponteiro fino |
| Botão | `translateY(-2px)` + sombra no hover, volta em 110ms no `:active` |
| Header | fundo, borda, sombra e blur transicionam juntos após 24px |
| Acordeão | `grid-template-rows 0fr→1fr`, `--dur-state` |

**Hierarquia pelo movimento.** O deslocamento do reveal depende do papel do
elemento, não do tipo de tag — é isso que faz o olho entender a ordem de
leitura sem perceber que há animação:

| `data-reveal-kind` | Deslocamento | Quem usa |
| --- | --- | --- |
| `lead` | `--reveal-distance` (1.25rem) | título da seção |
| `support` | metade (0.625rem) | corpo de texto, CTA, passos |
| `quiet` | zero, só opacidade | eyebrow, numeração, chips |
| `media` | distância cheia + zoom da foto | fotografia |

No mobile as distâncias caem para 0.6875rem / 0.375rem e o zoom de 1.035 para
1.018: tela menor e scroll mais rápido fazem o mesmo deslocamento parecer
salto.

**Fotografia.** `.media-frame` recorta a imagem; o container entra como
qualquer bloco e a foto dentro dele assenta de `--media-zoom` para 1 em
`--dur-media`. Como a moldura não se mexe, o efeito é de aproximação de
câmera, não de card crescendo. `transform` é do reveal e `scale` é do hover —
propriedades separadas de propósito, já que o Tailwind 4 emite `scale:` para
as utilities de escala e as duas conviveriam mal numa só.

**O que deliberadamente NÃO se move:** imagens de seções não clicáveis não
ganham hover (sugeriria interação inexistente), não há animação palavra a
palavra, não há smooth scroll por JavaScript (o nativo basta e não tira do
usuário o controle da página) e o hero não tem reveal por scroll — ver abaixo.

Proibido: bounce, spin, pulsação infinita, glow, partículas, animação de
`top/left/width/height`. Só `transform` e `opacity`.

**Sem biblioteca de animação.** O reveal usa `IntersectionObserver` + transição
CSS (`components/SectionReveal.tsx`) e o estado vive no DOM (`data-reveal`), não
em estado React — zero re-render e nenhuma dependência extra. Isso é um desvio
consciente da sugestão de usar Framer Motion/Motion: o efeito necessário não
justifica o peso da biblioteca.

**Acima da dobra o reveal não usa JavaScript.** `components/RevealOnLoad.tsx` é
um Server Component que marca `data-reveal="onload"`; a animação é `@keyframes`
puro, começa na primeira pintura e não espera hidratação. O motivo é de
carregamento, não estético: com o reveal por `IntersectionObserver` no hero, o
LCP do mobile ficava em 1128ms (o elemento era o parágrafo, invisível até a
hidratação). Com a versão CSS, LCP = FCP = 120ms. Regra: `RevealOnLoad` para o
que abre a página, `SectionReveal` para o que exige scroll.

`prefers-reduced-motion: reduce` desliga parallax, zeros as transições, anula a
animação de entrada e força todos os blocos a visíveis. Sem JavaScript, os
blocos também permanecem visíveis (a classe `js` só é adicionada ao `<html>`
quando há JS; o reveal de entrada não depende dela).

### B.8 Acessibilidade implementada

- Um único `<h1>`; sequência `h2`/`h3` verificada no HTML renderizado.
- Landmarks: `header` · `nav` · `main#conteudo` · `footer`.
- Skip link (primeiro elemento focável).
- Foco visível: outline 2px Heritage (Champagne sobre fundo escuro).
- Acordeão: `<button>` real, `aria-expanded`, `aria-controls`, `aria-labelledby`,
  painel com `hidden`, operável por Enter e Espaço.
- Alvos de toque: mínimo 44–48px de altura nos CTAs.
- SVGs decorativos com `aria-hidden="true"`.
- `alt` descritivo e específico; sem keyword stuffing.

### B.9 Ícones

Nenhuma biblioteca. O único ícone (WhatsApp) é um `<path>` inline monocromático
em `components/WhatsAppButton.tsx`.

---

## C. Pendências de design

| # | Pendência | Bloqueia |
| --- | --- | --- |
| 1 | Conferência deste documento contra o dossiê original | Validação de marca |
| 2 | Arquivos oficiais de logo/símbolo (SVG) | Header, footer, JSON-LD, favicon |
| 3 | Tipografia oficial (se diferente da dupla de teste) | Escala tipográfica |
| 4 | HEX finais (se o brand book divergir do preliminar) | Tokens de cor |
| 5 | Fotografia oficial (8 arquivos) | Hero, serviços, galeria, founder, OG |
| 6 | Área de proteção e tamanho mínimo do logo | Uso correto da marca |
| 7 | Lista definitiva de serviços | Seção de serviços |
