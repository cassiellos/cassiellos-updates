/**
 * Extrai a figura do hero de dentro de um PRINT da pagina.
 *
 * ATENCAO — ISTO E UM PALIATIVO, NAO O CAMINHO CERTO.
 * A cliente enviou um print da propria pagina em vez do arquivo da foto. Este
 * script salva o que da para salvar, mas o resultado herda os limites da
 * origem: resolucao de tela (~880x895, contra 1400+ de um arquivo original),
 * compressao aplicada duas vezes e o topo da composicao coberto pelo menu.
 * Assim que o arquivo original chegar, gere o asset com
 * `build-hero-image.mjs` e apague este caminho.
 *
 * Por que nao basta limiar de cor: o arco decorativo do site passa por tras da
 * figura e seu desvio ate o Ivory (ate 137) e MAIOR que o do blazer creme (78).
 * Qualquer tolerancia que engula o arco engole tambem a roupa.
 *
 * Solucao morfologica:
 *   1. zona-morta sobre o menu, que o print gravou por cima da foto;
 *   2. candidato = tudo que desvia do Ivory;
 *   3. ERODE — a linha do arco tem ~2px e desaparece; a figura, nao;
 *   4. maior componente conectado = a figura (segmentos soltos do arco caem);
 *   5. DILATA de volta e fecha buracos internos;
 *   6. suaviza a borda.
 *
 * Uso pontual (sharp nao faz parte das dependencias do projeto):
 *   npm i --no-save sharp
 *   node scripts/extract-hero-from-screenshot.mjs <print.webp> <saida.webp>
 */

import { writeFile } from "node:fs/promises";
import sharp from "sharp";

const [SRC, OUT] = process.argv.slice(2);
if (!SRC || !OUT) {
  console.error("Uso: node scripts/extract-hero-from-screenshot.mjs <print.webp> <saida.webp>");
  process.exit(1);
}

const CROP_LEFT = 866;
const IVORY = [246, 240, 233];
const TOL = 46; // abaixo do blazer (78); o arco sai pela morfologia, nao por cor
const RADIUS = 3; // erosao/dilatacao — arco tem ~2px
const NAV = { x0: 0, x1: 250, y0: 0, y1: 95 }; // menu gravado no print

const { data, info } = await sharp(SRC)
  .extract({ left: CROP_LEFT, top: 0, width: 1757 - CROP_LEFT, height: 895 })
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const W = info.width;
const H = info.height;
const C = info.channels;
const N = W * H;

/* 1-2. candidato a figura ------------------------------------------------- */
let m = new Uint8Array(N);
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const i = y * W + x;
    if (x >= NAV.x0 && x < NAV.x1 && y >= NAV.y0 && y < NAV.y1) continue; // zona-morta
    const d =
      Math.abs(data[i * C] - IVORY[0]) +
      Math.abs(data[i * C + 1] - IVORY[1]) +
      Math.abs(data[i * C + 2] - IVORY[2]);
    m[i] = d > TOL ? 1 : 0;
  }
}

/* 3. erosao / dilatacao separaveis ---------------------------------------- */
function morph(src, r, mode) {
  const pick = mode === "erode" ? Math.min : Math.max;
  const tmp = new Uint8Array(N);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      let v = mode === "erode" ? 1 : 0;
      for (let k = -r; k <= r; k++) {
        const xx = x + k;
        // fora do quadro: conservador (nao inventa figura na borda)
        const s = xx < 0 || xx >= W ? (mode === "erode" ? 1 : 0) : src[y * W + xx];
        v = pick(v, s);
      }
      tmp[y * W + x] = v;
    }
  }
  const out = new Uint8Array(N);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      let v = mode === "erode" ? 1 : 0;
      for (let k = -r; k <= r; k++) {
        const yy = y + k;
        const s = yy < 0 || yy >= H ? (mode === "erode" ? 1 : 0) : tmp[yy * W + x];
        v = pick(v, s);
      }
      out[y * W + x] = v;
    }
  }
  return out;
}

const eroded = morph(m, RADIUS, "erode");

/* 4. maior componente conectado ------------------------------------------- */
function largestComponent(src) {
  const seen = new Uint8Array(N);
  const out = new Uint8Array(N);
  let bestSize = 0;
  let bestSeed = -1;
  const comp = [];
  for (let s = 0; s < N; s++) {
    if (seen[s] || !src[s]) continue;
    comp.length = 0;
    const stack = [s];
    seen[s] = 1;
    while (stack.length) {
      const i = stack.pop();
      comp.push(i);
      const x = i % W;
      const y = (i / W) | 0;
      if (x + 1 < W && !seen[i + 1] && src[i + 1]) { seen[i + 1] = 1; stack.push(i + 1); }
      if (x - 1 >= 0 && !seen[i - 1] && src[i - 1]) { seen[i - 1] = 1; stack.push(i - 1); }
      if (y + 1 < H && !seen[i + W] && src[i + W]) { seen[i + W] = 1; stack.push(i + W); }
      if (y - 1 >= 0 && !seen[i - W] && src[i - W]) { seen[i - W] = 1; stack.push(i - W); }
    }
    if (comp.length > bestSize) { bestSize = comp.length; bestSeed = s; }
  }
  // segunda passada marcando so o vencedor
  if (bestSeed >= 0) {
    const seen2 = new Uint8Array(N);
    const stack = [bestSeed];
    seen2[bestSeed] = 1;
    while (stack.length) {
      const i = stack.pop();
      out[i] = 1;
      const x = i % W;
      const y = (i / W) | 0;
      if (x + 1 < W && !seen2[i + 1] && src[i + 1]) { seen2[i + 1] = 1; stack.push(i + 1); }
      if (x - 1 >= 0 && !seen2[i - 1] && src[i - 1]) { seen2[i - 1] = 1; stack.push(i - 1); }
      if (y + 1 < H && !seen2[i + W] && src[i + W]) { seen2[i + W] = 1; stack.push(i + W); }
      if (y - 1 >= 0 && !seen2[i - W] && src[i - W]) { seen2[i - W] = 1; stack.push(i - W); }
    }
  }
  return { out, size: bestSize };
}

const { out: main, size } = largestComponent(eroded);

/* 5. dilata de volta e fecha buracos internos ----------------------------- */
let solid = morph(main, RADIUS, "dilate");

// buracos = fundo NAO conectado a borda, dentro da silhueta
const outside = new Uint8Array(N);
{
  const stack = [];
  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= W || y >= H) return;
    const i = y * W + x;
    if (outside[i] || solid[i]) return;
    outside[i] = 1;
    stack.push(i);
  };
  for (let y = 0; y < H; y++) { push(0, y); push(W - 1, y); }
  for (let x = 0; x < W; x++) { push(x, 0); push(x, H - 1); }
  while (stack.length) {
    const i = stack.pop();
    const x = i % W;
    const y = (i / W) | 0;
    push(x + 1, y); push(x - 1, y); push(x, y + 1); push(x, y - 1);
  }
}
let holes = 0;
for (let i = 0; i < N; i++) if (!solid[i] && !outside[i]) { solid[i] = 1; holes++; }

/* bounding box ------------------------------------------------------------ */
let minX = W, maxX = -1, minY = H, maxY = -1;
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    if (!solid[y * W + x]) continue;
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
}
const bbox = { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };

/* 6. matte suavizada ------------------------------------------------------ */
const alpha = Buffer.alloc(N);
for (let i = 0; i < N; i++) alpha[i] = solid[i] ? 255 : 0;

const maskAlpha = await sharp(alpha, { raw: { width: W, height: H, channels: 1 } })
  .extract(bbox)
  .blur(1.4)
  .linear(2.4, -255 * 0.7)
  .toColourspace("b-w")
  .raw()
  .toBuffer();

const expected = bbox.width * bbox.height;
if (maskAlpha.length !== expected) throw new Error(`matte ${maskAlpha.length} != ${expected}`);

const mask = await sharp({
  create: { width: bbox.width, height: bbox.height, channels: 3, background: "#000000" },
})
  .joinChannel(maskAlpha, { raw: { width: bbox.width, height: bbox.height, channels: 1 } })
  .png()
  .toBuffer();

const subject = await sharp(SRC)
  .extract({ left: CROP_LEFT + bbox.left, top: bbox.top, width: bbox.width, height: bbox.height })
  .removeAlpha()
  .png()
  .toBuffer();

const out = await sharp(subject)
  .ensureAlpha()
  .composite([{ input: mask, blend: "dest-in" }])
  .webp({ quality: 88, alphaQuality: 92, effort: 6 })
  .toBuffer();

await writeFile(OUT, out);
console.log(JSON.stringify({
  crop: `${W}x${H}`,
  maiorComponente: size,
  buracosFechados: holes,
  bbox: `${bbox.width}x${bbox.height}`,
  saida: OUT,
  kb: Number((out.length / 1024).toFixed(1)),
}, null, 2));
