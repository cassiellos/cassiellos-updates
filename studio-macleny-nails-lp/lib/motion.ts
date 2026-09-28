/**
 * Parametros de movimento compartilhados.
 *
 * Duracao, easing e distancia moram no CSS (tokens em `app/globals.css`).
 * Aqui ficam so os ATRASOS, porque eles dependem da composicao de cada bloco
 * e precisam ser escritos no JSX. Manter a escada num lugar so e o que impede
 * o site de virar uma colecao de delays escolhidos no olho.
 */

/**
 * Papel de cada elemento dentro de um bloco. O nome descreve a FUNCAO na
 * leitura, nao o tipo de tag — e por isso que ele tambem define quanto o
 * elemento se desloca (ver `[data-reveal-kind]` no CSS).
 */
export type RevealKind = "lead" | "support" | "media" | "quiet";

/**
 * Escada de atraso dentro de um bloco.
 *
 * A soma total e curta de proposito: do primeiro ao ultimo elemento sao
 * 190ms, abaixo do limiar em que o olho comeca a ler os itens como uma
 * sequencia. O objetivo e a sensacao de que o conteudo se organiza, nao a de
 * que ele desfila.
 */
export const revealDelay = {
  /** Fotografia e titulo abrem o bloco, sem atraso. */
  lead: 0,
  /** Texto de apoio entra logo atras do titulo. */
  support: 90,
  /** Listas, chips, destaques. */
  detail: 150,
  /** O CTA aparece como consequencia da leitura, nunca antes dela. */
  cta: 190,
} as const;

/**
 * Atraso para itens de uma lista.
 *
 * O teto e o ponto importante: sem ele, o 11o item do FAQ entraria 600ms
 * depois do primeiro — a essa altura o usuario ja rolou e a animacao vira
 * atraso percebido. Depois do quarto item, todos entram juntos.
 */
export function staggerDelay(index: number, step = 70, maxSteps = 4): number {
  return Math.min(index, maxSteps) * step;
}

/**
 * Escada do hero, mais curta que a padrao.
 *
 * Aqui cada milissegundo de atraso e um milissegundo de LCP: um elemento com
 * opacidade zero nao conta para a metrica, entao ele so passa a existir para
 * o navegador quando a animacao comeca. Por isso o hero usa a propria escada,
 * e nao a de `revealDelay`.
 */
export const heroDelay = {
  eyebrow: 0,
  title: 60,
  body: 110,
  cta: 165,
  signature: 220,
} as const;
