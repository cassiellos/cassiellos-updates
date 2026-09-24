/**
 * Compoe um retrato editorial a partir de um recorte em fundo branco.
 *
 * Etapas:
 *  1. extrai o sujeito por flood fill a partir das bordas — preserva brancos
 *     internos (mechas claras, oculos, reflexos), ao contrario de um chroma key;
 *  2. erode e suaviza a matte, eliminando a franja branca do recorte;
 *  3. aplica correcao quente coerente com Ivory / Espresso;
 *  4. monta fundo editorial (gradiente Ivory + arcos + luz suave);
 *  5. adiciona light wrap e sombra projetada para o recorte nao parecer colado.
 *
 * Uso pontual (sharp nao faz parte das dependencias do projeto):
 *   npm i --no-save sharp
 *   node scripts/build-portrait-image.mjs <retrato> <saida.webp> [alturaDaFigura]
 */

import { writeFile } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

const CANVAS = { w: 820, h: 1025 }; // 4:5 — proporcao da moldura do retrato

const IVORY_TOP = "#FBF8F4";
const IVORY_BOTTOM = "#EDE4D8";
const CHAMPAGNE = "#C7B17E";
const TAUPE = "#B8A597";
const IVORY_WRAP = { r: 250, g: 246, b: 240 };

/* -------------------------------------------------------------------------- */
/* Matte                                                                       */
/* -------------------------------------------------------------------------- */

async function extractMatte(srcPath) {
  const src = sharp(srcPath).rotate().removeAlpha();
  const { data, info } = await src.raw().toBuffer({ resolveWithObject: true });
  const W = info.width;
  const H = info.height;

  const isWhite = new Uint8Array(W * H);
  for (let i = 0; i < W * H; i++) {
    const r = data[i * info.channels];
    const g = data[i * info.channels + 1];
    const b = data[i * info.channels + 2];
    const mn = Math.min(r, g, b);
    const mx = Math.max(r, g, b);
    isWhite[i] = mn >= 232 && mx - mn <= 16 ? 1 : 0;
  }

  // Só o branco CONECTADO à borda vira fundo.
  const bg = new Uint8Array(W * H);
  const stack = [];
  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= W || y >= H) return;
    const i = y * W + x;
    if (bg[i] || !isWhite[i]) return;
    bg[i] = 1;
    stack.push(i);
  };
  for (let x = 0; x < W; x++) {
    push(x, 0);
    push(x, H - 1);
  }
  for (let y = 0; y < H; y++) {
    push(0, y);
    push(W - 1, y);
  }
  while (stack.length) {
    const i = stack.pop();
    const x = i % W;
    const y = (i / W) | 0;
    push(x + 1, y);
    push(x - 1, y);
    push(x, y + 1);
    push(x, y - 1);
  }

  let minX = W;
  let maxX = 0;
  let minY = H;
  let maxY = 0;
  const alpha = Buffer.alloc(W * H);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = y * W + x;
      if (bg[i]) continue;
      alpha[i] = 255;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }

  return {
    W,
    H,
    alpha,
    bbox: { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 },
  };
}

/* -------------------------------------------------------------------------- */
/* Fundo                                                                       */
/* -------------------------------------------------------------------------- */

function backgroundSvg() {
  const { w, h } = CANVAS;
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs>
    <linearGradient id="base" x1="0" y1="0" x2="0.3" y2="1">
      <stop offset="0%" stop-color="${IVORY_TOP}"/>
      <stop offset="60%" stop-color="#F4EFE8"/>
      <stop offset="100%" stop-color="${IVORY_BOTTOM}"/>
    </linearGradient>
    <radialGradient id="keylight" cx="0.44" cy="0.34" r="0.52">
      <stop offset="0%" stop-color="#FFFDFA" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#FFFDFA" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="floor" x1="0" y1="0.6" x2="0" y2="1">
      <stop offset="0%" stop-color="#1A1411" stop-opacity="0"/>
      <stop offset="100%" stop-color="#1A1411" stop-opacity="0.08"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#base)"/>
  <ellipse cx="${w * 0.44}" cy="${h * 0.34}" rx="${w * 0.7}" ry="${h * 0.48}" fill="url(#keylight)"/>
  <circle cx="${w * 0.9}" cy="${h * 0.17}" r="${w * 0.6}" fill="none"
          stroke="${CHAMPAGNE}" stroke-width="1.4" opacity="0.5"/>
  <circle cx="${w * 0.06}" cy="${h * 0.84}" r="${w * 0.48}" fill="none"
          stroke="${TAUPE}" stroke-width="1.2" opacity="0.45"/>
  <rect width="${w}" height="${h}" fill="url(#floor)"/>
</svg>`);
}

/* -------------------------------------------------------------------------- */
/* Composicao                                                                  */
/* -------------------------------------------------------------------------- */

async function build(srcPath, outPath, figureHeight) {
  const { W, H, alpha, bbox } = await extractMatte(srcPath);

  const scale = figureHeight / bbox.height;
  const figureW = Math.round(bbox.width * scale);
  const figureH = figureHeight;

  const resize = { kernel: "lanczos3", fit: "fill" };

  // Matte ampliada, erodida e suavizada, entregue como PNG RGBA cuja
  // transparencia e a propria matte (formato exigido pelo blend dest-in).
  //
  // ATENCAO: `toColourspace("b-w")` e obrigatorio. Sem ele o sharp devolve o
  // buffer cru em sRGB (3 canais) mesmo partindo de 1 canal, e o joinChannel
  // abaixo passa a ler 3 bytes por pixel como se fossem 3 pixels — o que
  // entrelaca a imagem em listras horizontais.
  const maskAlpha = await sharp(alpha, { raw: { width: W, height: H, channels: 1 } })
    .extract(bbox)
    .resize(figureW, figureH, resize)
    .blur(3)
    .linear(2.8, -255 * 0.95)
    .toColourspace("b-w")
    .raw()
    .toBuffer();

  const expected = figureW * figureH;
  if (maskAlpha.length !== expected) {
    throw new Error(
      `Matte com tamanho inesperado: ${maskAlpha.length} bytes para ${expected} pixels ` +
        `(${(maskAlpha.length / expected).toFixed(1)} canais). Verifique toColourspace("b-w").`,
    );
  }

  const mask = await sharp({
    create: { width: figureW, height: figureH, channels: 3, background: "#000000" },
  })
    .joinChannel(maskAlpha, { raw: { width: figureW, height: figureH, channels: 1 } })
    .png()
    .toBuffer();

  // `ensureAlpha` e obrigatorio: o blend dest-in usa o alfa do DESTINO. Sem um
  // canal alfa na base, o recorte nao acontece e sobra o retangulo inteiro.
  const cut = (base) =>
    sharp(base)
      .ensureAlpha()
      .composite([{ input: mask, blend: "dest-in" }])
      .png()
      .toBuffer();

  const subjectRgb = await sharp(srcPath)
    .rotate()
    .removeAlpha()
    .extract(bbox)
    .resize(figureW, figureH, resize)
    .modulate({ saturation: 0.92, brightness: 1.02 })
    .linear([1.03, 1.0, 0.96], [-2, 0, 4])
    .png()
    .toBuffer();

  const solid = (c) =>
    sharp({
      create: { width: figureW, height: figureH, channels: 3, background: c },
    })
      .png()
      .toBuffer();

  const subject = await cut(subjectRgb);

  // Light wrap: halo Ivory que funde a borda do recorte com o fundo.
  //
  // Nao ha sombra projetada de proposito: sobre Ivory chapado, uma silhueta
  // borrada circunda a figura inteira e suja o fundo em vez de dar volume.
  // O peso vem do gradiente de chao do proprio fundo.
  const wrap = await sharp(await cut(await solid(IVORY_WRAP))).blur(18).png().toBuffer();

  const left = Math.round((CANVAS.w - figureW) / 2);
  const top = CANVAS.h - figureH; // sangra na base: o retrato ja vem cortado

  const composed = await sharp(backgroundSvg())
    .composite([
      { input: wrap, left, top, opacity: 0.3 },
      { input: subject, left, top },
    ])
    .webp({ quality: 90, effort: 6 })
    .toBuffer();

  // Grava o buffer direto: toFile() recomprimiria o WebP uma segunda vez.
  await writeFile(outPath, composed);

  console.log(
    JSON.stringify(
      {
        origem: `${W}x${H}`,
        recorte: `${bbox.width}x${bbox.height}`,
        figura: `${figureW}x${figureH}`,
        ampliacao: `${scale.toFixed(2)}x`,
        topoDaCabeca: top,
        saida: path.relative(process.cwd(), outPath),
        bytes: composed.length,
      },
      null,
      2,
    ),
  );
}

const [src, out, height] = process.argv.slice(2);
if (!src || !out) {
  console.error("Uso: node scripts/build-portrait-image.mjs <retrato> <saida.webp> [altura]");
  process.exit(1);
}

await build(src, path.resolve(out), Number(height) || 850);
