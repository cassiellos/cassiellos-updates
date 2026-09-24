/**
 * Extrai o simbolo oficial da marca de uma arte com fundo e gera um PNG
 * transparente, monocromatico, pronto para a assinatura da interface.
 *
 * Como funciona: o simbolo e um desenho de linha escuro sobre fundo claro em
 * degrade. Estimar o fundo por um blur largo e subtrair a imagem isola o traco
 * sem depender de uma cor de fundo chapada — por isso funciona sobre degrade,
 * onde um chroma key falharia.
 *
 * O traco e reconstruido na cor da marca em vez de reaproveitar os pixels
 * originais: o degrade dourado contamina as bordas antisserrilhadas e deixaria
 * franja em volta do desenho sobre Ivory.
 *
 * IMPORTANTE: isto NAO redesenha a marca. A geometria do simbolo e preservada
 * pixel a pixel; o que muda e apenas o fundo (removido) e a cor do traco.
 *
 * Uso pontual (sharp nao faz parte das dependencias do projeto):
 *   npm i --no-save sharp
 *   node scripts/build-brand-symbol.mjs <arte> <saida.png> [#hex] [alturaPx]
 */

import path from "node:path";

import sharp from "sharp";

/** Limiares medidos no histograma de (fundo estimado - imagem). */
const ALPHA_FLOOR = 14; // abaixo disso e ruido do degrade
const ALPHA_CEIL = 105; // a partir daqui o traco e solido

const PADDING_RATIO = 0.04; // respiro proporcional em volta do simbolo

function parseHex(hex) {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

const [src, out, hex = "#7A401F", heightArg = "512"] = process.argv.slice(2);
if (!src || !out) {
  console.error("Uso: node scripts/build-brand-symbol.mjs <arte> <saida.png> [#hex] [altura]");
  process.exit(1);
}

const color = parseHex(hex);
const targetHeight = Number(heightArg);

const grey = sharp(src).rotate().removeAlpha().toColourspace("b-w");
const { data: lum, info } = await grey.clone().raw().toBuffer({ resolveWithObject: true });
const { data: background } = await grey
  .clone()
  .blur(30)
  .toColourspace("b-w")
  .raw()
  .toBuffer({ resolveWithObject: true });

const W = info.width;
const H = info.height;

if (lum.length !== W * H || background.length !== W * H) {
  throw new Error("Buffer fora do esperado — confirme toColourspace(\"b-w\").");
}

// Alfa a partir do quanto o traco escurece o fundo estimado.
const alpha = Buffer.alloc(W * H);
const span = ALPHA_CEIL - ALPHA_FLOOR;
let minX = W;
let maxX = 0;
let minY = H;
let maxY = 0;

for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const i = y * W + x;
    const diff = Math.max(0, background[i] - lum[i]);
    const a = Math.round(Math.min(255, Math.max(0, ((diff - ALPHA_FLOOR) * 255) / span)));
    alpha[i] = a;
    if (a > 8) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

// Recorta a area util com um respiro proporcional.
const markW = maxX - minX + 1;
const markH = maxY - minY + 1;
const pad = Math.round(Math.max(markW, markH) * PADDING_RATIO);
const left = Math.max(0, minX - pad);
const top = Math.max(0, minY - pad);
const width = Math.min(W - left, markW + pad * 2);
const height = Math.min(H - top, markH + pad * 2);

const cropped = await sharp(alpha, { raw: { width: W, height: H, channels: 1 } })
  .extract({ left, top, width, height })
  .toColourspace("b-w")
  .raw()
  .toBuffer();

// Traco na cor da marca, com a matte como transparencia.
const rgba = Buffer.alloc(width * height * 4);
for (let i = 0; i < width * height; i++) {
  rgba[i * 4] = color.r;
  rgba[i * 4 + 1] = color.g;
  rgba[i * 4 + 2] = color.b;
  rgba[i * 4 + 3] = cropped[i];
}

const targetWidth = Math.round((width / height) * targetHeight);

const info2 = await sharp(rgba, { raw: { width, height, channels: 4 } })
  .resize(targetWidth, targetHeight, { kernel: "lanczos3" })
  .png({ compressionLevel: 9 })
  .toFile(path.resolve(out));

console.log(
  JSON.stringify(
    {
      origem: `${W}x${H}`,
      simboloNaArte: `${markW}x${markH} em (${minX}, ${minY})`,
      recorte: `${width}x${height}`,
      saida: `${info2.width}x${info2.height}`,
      cor: hex,
      bytes: info2.size,
    },
    null,
    2,
  ),
);
