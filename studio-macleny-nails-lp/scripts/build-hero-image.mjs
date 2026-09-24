/**
 * Prepara a fotografia do hero a partir de um recorte com canal alfa.
 *
 * Ao contrario de `build-portrait-image.mjs`, aqui NAO se monta fundo algum: a
 * figura e publicada com transparencia e assenta direto sobre o Ivory da
 * pagina. Isso elimina qualquer emenda entre foto e fundo em qualquer viewport
 * e deixa os arcos decorativos passarem por tras do recorte.
 *
 * Etapas:
 *  1. valida que a origem tem alfa de verdade (bimodal) — um JPEG/WEBP opaco
 *     entraria como retangulo e estragaria a composicao;
 *  2. recorta na bounding box do sujeito, descartando transparencia inutil que
 *     so pesaria no arquivo e atrapalharia o object-cover;
 *  3. redimensiona sem AMPLIAR (nao ha detalhe a inventar acima do nativo);
 *  4. grava WebP com alfa e confere que a transparencia sobreviveu.
 *
 * Uso pontual (sharp nao faz parte das dependencias do projeto):
 *   npm i --no-save sharp
 *   node scripts/build-hero-image.mjs <recorte> <saida.webp> [larguraMax]
 */

import { writeFile } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

/** Abaixo disto o pixel conta como fundo ao medir a bounding box. */
const ALPHA_FLOOR = 8;

/** Margem em pixels mantida ao redor do sujeito, para o resize nao comer borda. */
const BLEED = 2;

/**
 * Le a origem em RGBA cru e devolve a bounding box do que e visivel, junto de
 * um histograma grosseiro do alfa (usado para recusar origens sem recorte).
 */
async function inspect(srcPath) {
  const { data, info } = await sharp(srcPath).rotate().ensureAlpha().raw().toBuffer({
    resolveWithObject: true,
  });

  const W = info.width;
  const H = info.height;
  const C = info.channels;

  let transparent = 0;
  let solid = 0;
  let minX = W;
  let maxX = -1;
  let minY = H;
  let maxY = -1;

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const a = data[(y * W + x) * C + 3];
      if (a <= ALPHA_FLOOR) {
        transparent++;
        continue;
      }
      if (a >= 240) solid++;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }

  if (maxX < 0) {
    throw new Error("A origem e inteiramente transparente.");
  }

  const total = W * H;
  const feather = total - transparent - solid;

  // Um recorte de verdade e bimodal: quase tudo ou transparente ou solido, com
  // uma faixa estreita de anti-serrilhado. Se quase nada for transparente, a
  // imagem provavelmente veio achatada em fundo branco.
  if (transparent / total < 0.02) {
    throw new Error(
      `A origem nao parece recortada: apenas ${((transparent / total) * 100).toFixed(1)}% ` +
        "dos pixels sao transparentes. Use build-portrait-image.mjs para extrair a matte.",
    );
  }

  return {
    W,
    H,
    transparent,
    solid,
    feather,
    bbox: {
      left: Math.max(0, minX - BLEED),
      top: Math.max(0, minY - BLEED),
      width: Math.min(W, maxX + 1 + BLEED) - Math.max(0, minX - BLEED),
      height: Math.min(H, maxY + 1 + BLEED) - Math.max(0, minY - BLEED),
    },
  };
}

async function build(srcPath, outPath, maxWidth) {
  const { W, H, transparent, solid, feather, bbox } = await inspect(srcPath);

  // Nunca ampliar: acima da resolucao nativa so se ganha peso, nao nitidez.
  const targetW = Math.min(maxWidth, bbox.width);
  const targetH = Math.round((bbox.height * targetW) / bbox.width);

  const out = await sharp(srcPath)
    .rotate()
    .ensureAlpha()
    .extract(bbox)
    .resize(targetW, targetH, { kernel: "lanczos3", fit: "fill" })
    .webp({ quality: 82, alphaQuality: 90, effort: 6 })
    .toBuffer();

  // Conferencia final: se o encoder tiver descartado o alfa, a figura entraria
  // no site como retangulo preto sobre o Ivory.
  const check = await sharp(out).metadata();
  if (!check.hasAlpha) {
    throw new Error("A saida perdeu o canal alfa — a figura ficaria com fundo solido.");
  }

  // Grava o buffer direto: toFile() recomprimiria o WebP uma segunda vez.
  await writeFile(outPath, out);

  console.log(
    JSON.stringify(
      {
        origem: `${W}x${H}`,
        alfa: {
          transparente: transparent,
          solido: solid,
          antiSerrilhado: feather,
        },
        recorte: `${bbox.width}x${bbox.height}`,
        saida: `${targetW}x${targetH}`,
        arquivo: path.relative(process.cwd(), outPath),
        bytes: out.length,
        kb: Number((out.length / 1024).toFixed(1)),
      },
      null,
      2,
    ),
  );
}

const [src, out, width] = process.argv.slice(2);
if (!src || !out) {
  console.error("Uso: node scripts/build-hero-image.mjs <recorte> <saida.webp> [larguraMax]");
  process.exit(1);
}

await build(src, path.resolve(out), Number(width) || 1000);
