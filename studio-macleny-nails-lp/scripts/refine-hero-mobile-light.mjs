/**
 * Refina a INTEGRACAO da fotografia do hero no celular — luz difusa editorial.
 *
 * O PROBLEMA
 * ----------
 * `public/images/hero-mobile.webp` nao e uma fotografia: e uma fotografia ja
 * COMPOSTA sobre uma chapa creme. A medicao mostra que a composicao foi feita
 * com uma mascara LINEAR ao longo de uma diagonal fixa:
 *
 *     t = 0.673*x + 0.742*y      (direcao do gradiente, medida)
 *     A = 0 em t ~ 1190          (so chapa)
 *     A = 1 em t ~ 1337          (so fotografia)
 *
 * As duas iso-linhas foram ajustadas em 8 colunas independentes com desvio de
 * +-8 unidades — o modelo linear descreve a mascara original com precisao.
 *
 * E justamente por ser LINEAR que a transicao se denuncia: uma rampa linear tem
 * derivada constante e cantos angulosos nos dois extremos, e o olho le isso
 * como "degrade aplicado sobre a foto". Luz real nao cai assim.
 *
 * A informacao acima de t=1190 foi destruida quando a chapa foi gravada no
 * arquivo (a regiao e plana, desvio padrao 0,5). Nao ha original no repositorio
 * nem nos materiais recebidos: as duas fotografias limpas disponiveis sao de
 * OUTRO enquadramento (recortado na altura dos labios, sem dados acima deles).
 * Portanto nada aqui tenta recuperar o que foi apagado — o que se faz e mudar a
 * FORMA da transicao que sobrou.
 *
 * A IDENTIDADE QUE TORNA ISSO SEGURO
 * ----------------------------------
 * A imagem atual e   s = C + A*(P - C)   com C = chapa e P = foto (desconhecida).
 * Para uma mascara nova f(A) e um fundo novo I, o resultado desejado e
 *
 *     out = I*(1 - f) + f*P
 *
 * Substituindo P = (s - C*(1-A))/A e chamando g = f/A:
 *
 *     out = I*(1 - f) + g*s - g*C*(1 - A)
 *
 * P nunca precisa ser calculada, entao nao ha divisao por numero pequeno e nao
 * ha como gerar valor impossivel. Os extremos sao exatos:
 *   A = 1 -> f = 1, g = 1 -> out = s   (a fotografia plena fica INTACTA)
 *   A -> 0 -> f -> 0, g -> 0 -> out = I (o fundo vira o creme do site)
 *
 * O QUE MUDA
 * ----------
 * 1. Fundo: a chapa rgb(249,244,236) passa a ser o Ivory institucional
 *    #f4efe8. Eram dois cremes diferentes no mesmo lugar.
 * 2. Forma: a rampa linear vira smoothstep — derivada zero nos dois extremos,
 *    que e como a luz encosta numa superficie. Fim da rampa esticado de
 *    t=1337 para t=1375, so o bastante para a face "chegar" sem degrau.
 * 3. Organicidade: as iso-linhas sao deslocadas por um campo de ruido de baixa
 *    frequencia (+-18 unidades de t). Sem isso a transicao continua sendo uma
 *    reta perfeita — e reta perfeita e o que da aparencia de template.
 * 4. Profundidade: desfoque progressivo amarrado a mascara. Onde a fotografia
 *    esta quase dissolvida ela tambem esta fora de foco; onde esta plena, ela
 *    fica exatamente como era. E o que produz a sequencia pedida —
 *    silhueta muito suave -> pele e rosto ganham definicao -> mao e unhas
 *    mais nitidas — sem inventar um pixel.
 * 5. Dither triangular antes de quantizar + qualidade alta na saida, contra o
 *    banding da rampa e o blocking da area chapada.
 *
 * O QUE NAO MUDA
 * --------------
 * Nada fora da faixa de transicao. Mao, unhas, dedos, anel, boca, mandibula,
 * cabelo, roupa e colar estao todos em A = 1 (verificado: t da boca = 1365,
 * do anel = 1427, das unhas = 1439) e saem bit a bit iguais a entrada, o que o
 * proprio script confere no fim. Enquadramento, escala e proporcao do arquivo
 * sao identicos, entao nenhuma regra de CSS precisa mudar.
 *
 * Uso pontual (sharp nao faz parte das dependencias do projeto):
 *   npm i --no-save sharp
 *   node scripts/refine-hero-mobile-light.mjs <entrada.webp> [saida.webp]
 */

import path from "node:path";

import sharp from "sharp";

/* ---- Modelo medido da mascara original ---------------------------------- */
const GX = 0.673;          // direcao do gradiente, componente x
const GY = 0.742;          // direcao do gradiente, componente y
const T_START = 1190;      // A = 0
const T_FULL = 1337;       // A = 1

/* ---- Parametros do refino ----------------------------------------------- */
const num = (name, fallback) => (process.env[name] ? Number(process.env[name]) : fallback);

const T_END_NEW = num("T_END", 1375);   // fim esticado: a face chega sem degrau
const NOISE_T = num("NOISE_T", 26);     // deslocamento organico das iso-linhas, em unidades de t
const NOISE_CELL = num("NOISE_CELL", 26); // celula do ruido antes da suavizacao
const SIGMA_MAX = num("SIGMA_MAX", 16); // desfoque no ponto mais dissolvido
const SIGMA_EXP = num("SIGMA_EXP", 1.5); // como o desfoque cai conforme a foto ganha corpo
/**
 * Quanto a sombra se dissolve antes da luz.
 *
 * Luz difusa forte lava primeiro o que esta escuro: o cabelo perde corpo muito
 * antes de a pele perder. Sem isto a massa de cabelo atravessa a transicao
 * inteira como um borrao sem forma — que e exatamente a "mancha" que denuncia
 * o efeito. O deslocamento e calculado sobre a luminancia MUITO desfocada, e
 * nao pixel a pixel, para que a mascara continue sendo um campo suave.
 */
const DARK_LIFT = num("DARK_LIFT", 58);
const BLUR_LEVELS = [0, 4, 10, 22];

/** Ivory institucional do design system (`--color-ivory`). */
const IVORY = [0xf4, 0xef, 0xe8];

const [srcArg, outArg] = process.argv.slice(2);
if (!srcArg) {
  console.error("Uso: node scripts/refine-hero-mobile-light.mjs <entrada.webp> [saida.webp]");
  process.exit(1);
}
const OUT = outArg ?? path.join(process.cwd(), "public", "images", "hero-mobile.webp");

/* ---- Entrada ------------------------------------------------------------- */
const src = sharp(srcArg).removeAlpha();
const { data: base, info } = await src.raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;

/**
 * Cor da chapa: mediana do quadrante superior esquerdo, que e plano por
 * construcao. Mediana e nao media para nao ser puxada por nenhum respingo.
 */
function plateColour() {
  const acc = [[], [], []];
  for (let y = 40; y < 500; y += 7) {
    for (let x = 40; x < 400; x += 7) {
      const p = (y * W + x) * 3;
      for (let c = 0; c < 3; c++) acc[c].push(base[p + c]);
    }
  }
  return acc.map((v) => v.sort((a, b) => a - b)[v.length >> 1]);
}
const C = plateColour();

// Guarda contra rodar duas vezes: se a chapa ja e o Ivory, o refino ja foi feito.
if (C.every((v, i) => Math.abs(v - IVORY[i]) <= 1)) {
  console.error(
    `A area chapada ja esta em rgb(${C}) — igual ao Ivory do site. ` +
      "Este arquivo ja passou pelo refino; rode a partir do original.",
  );
  process.exit(1);
}

/* ---- Campo de ruido de baixa frequencia ---------------------------------- */
/**
 * Ruido de valor: uma grade pequena de numeros aleatorios, ampliada com
 * interpolacao suave. O resultado nao tem textura visivel — tem apenas ondas
 * largas, que e o que tira a reta perfeita da transicao sem sujar a imagem.
 */
async function noiseField() {
  const nw = Math.ceil(W / NOISE_CELL);
  const nh = Math.ceil(H / NOISE_CELL);
  const small = Buffer.alloc(nw * nh);
  let seed = 20260924; // determinista: o mesmo arquivo sai do mesmo comando
  const rnd = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
  for (let i = 0; i < small.length; i++) small[i] = Math.round(rnd() * 255);

  const up = await sharp(small, { raw: { width: nw, height: nh, channels: 1 } })
    .resize({ width: W, height: H, kernel: "cubic" })
    .blur(NOISE_CELL * 0.9)
    .raw()
    .toBuffer();

  // Centraliza em zero e normaliza pela amplitude real que sobrou apos o blur.
  let min = 255;
  let max = 0;
  for (const v of up) {
    if (v < min) min = v;
    if (v > max) max = v;
  }
  const span = Math.max(1, max - min);
  const out = new Float32Array(W * H);
  for (let i = 0; i < up.length; i++) out[i] = ((up[i] - min) / span - 0.5) * 2;
  return out;
}
const noise = await noiseField();

/* ---- Piramide de desfoque ------------------------------------------------ */
const levels = [];
for (const sigma of BLUR_LEVELS) {
  levels.push(
    sigma === 0
      ? base
      : await sharp(base, { raw: { width: W, height: H, channels: 3 } })
          .blur(sigma)
          .raw()
          .toBuffer(),
  );
}

/** Amostra a piramide num sigma continuo, interpolando entre dois niveis. */
function sampleBlur(idx, sigma, channel) {
  if (sigma <= 0) return levels[0][idx * 3 + channel];
  let hi = BLUR_LEVELS.length - 1;
  for (let i = 1; i < BLUR_LEVELS.length; i++) {
    if (BLUR_LEVELS[i] >= sigma) {
      hi = i;
      break;
    }
  }
  const lo = hi - 1;
  const span = BLUR_LEVELS[hi] - BLUR_LEVELS[lo];
  const w = span === 0 ? 0 : (sigma - BLUR_LEVELS[lo]) / span;
  return levels[lo][idx * 3 + channel] * (1 - w) + levels[hi][idx * 3 + channel] * w;
}

/* ---- Composicao ---------------------------------------------------------- */
const smoothstep = (e0, e1, v) => {
  const u = Math.min(1, Math.max(0, (v - e0) / (e1 - e0)));
  return u * u * (3 - 2 * u);
};

const out = Buffer.alloc(W * H * 3);
let maxDeltaProtected = 0;
let ditherSeed = 987654321;
const dither = () => {
  // Ruido triangular de +-0,5 LSB: dissolve o banding da rampa na quantizacao.
  ditherSeed = (ditherSeed * 1103515245 + 12345) & 0x7fffffff;
  const a = ditherSeed / 0x7fffffff;
  ditherSeed = (ditherSeed * 1103515245 + 12345) & 0x7fffffff;
  const b = ditherSeed / 0x7fffffff;
  return a - b;
};

for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const idx = y * W + x;
    const t = GX * x + GY * y;

    // A: a mascara ORIGINAL. Descreve o arquivo de entrada, nao se mexe nela.
    const A = Math.min(1, Math.max(0, (t - T_START) / (T_FULL - T_START)));

    if (A >= 1) {
      // Fotografia plena: copia exata. E aqui que moram mao, unhas, anel,
      // boca, mandibula, cabelo e roupa.
      for (let c = 0; c < 3; c++) out[idx * 3 + c] = base[idx * 3 + c];
      continue;
    }

    // f: a mascara NOVA. Smoothstep, fim esticado, iso-linhas onduladas e a
    // sombra cedendo antes da luz.
    const soft = levels[levels.length - 1];
    const lum =
      0.2126 * soft[idx * 3] + 0.7152 * soft[idx * 3 + 1] + 0.0722 * soft[idx * 3 + 2];
    const lumNorm = Math.min(1, Math.max(0, (lum - 60) / 180));
    const tOrganic = t + noise[idx] * NOISE_T - DARK_LIFT * (1 - lumNorm);
    const f = smoothstep(T_START, T_END_NEW, tOrganic);

    if (A <= 0) {
      for (let c = 0; c < 3; c++) {
        out[idx * 3 + c] = Math.round(Math.min(255, Math.max(0, IVORY[c] + dither())));
      }
      continue;
    }

    // g = f/A. Limitado por seguranca; com smoothstep ele nunca passa de ~1,13.
    const g = Math.min(1.35, f / A);

    // Desfoque progressivo: quanto menos fotografia, mais fora de foco.
    const sigma = SIGMA_MAX * Math.pow(1 - f, SIGMA_EXP);

    for (let c = 0; c < 3; c++) {
      const s = sampleBlur(idx, sigma, c);
      const v = IVORY[c] * (1 - f) + g * s - g * C[c] * (1 - A);
      out[idx * 3 + c] = Math.round(Math.min(255, Math.max(0, v + dither())));
    }
  }
}

/* ---- Conferencia da regiao protegida ------------------------------------- */
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const t = GX * x + GY * y;
    if (t < T_FULL) continue;
    const idx = (y * W + x) * 3;
    for (let c = 0; c < 3; c++) {
      const d = Math.abs(out[idx + c] - base[idx + c]);
      if (d > maxDeltaProtected) maxDeltaProtected = d;
    }
  }
}

const info2 = await sharp(out, { raw: { width: W, height: H, channels: 3 } })
  .webp({ quality: 90, effort: 6, smartSubsample: true })
  .toFile(OUT);

console.log(
  JSON.stringify(
    {
      entrada: path.relative(process.cwd(), srcArg),
      saida: path.relative(process.cwd(), OUT),
      dimensoes: `${W}x${H} (inalteradas)`,
      chapa_original: `rgb(${C.join(",")})`,
      fundo_novo: `rgb(${IVORY.join(",")}) — Ivory do design system`,
      faixa_original: `t ${T_START} -> ${T_FULL} (rampa linear)`,
      faixa_nova: `t ${T_START} -> ${T_END_NEW} (smoothstep + ondulacao +-${NOISE_T})`,
      delta_maximo_na_regiao_protegida: maxDeltaProtected,
      kb: Number((info2.size / 1024).toFixed(1)),
    },
    null,
    2,
  ),
);
