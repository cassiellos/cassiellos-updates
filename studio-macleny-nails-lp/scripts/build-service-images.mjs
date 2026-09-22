/**
 * Prepara as fotografias da secao de servicos.
 *
 * Origens em 4:3 — mesma proporcao das molduras — sao apenas redimensionadas.
 * Quando a origem tem outra proporcao, o slot pode declarar `focusY`: a fracao
 * da altura de onde comeca o recorte (0 = topo, 1 = base). Isso existe porque o
 * corte automatico, centrado ou por saliencia, descarta o que importa quando a
 * foto tem dois pontos de interesse distantes entre si.
 *
 * Nenhuma correcao de cor e aplicada: a cor real do trabalho e do ambiente nao
 * deve ser alterada.
 *
 * Uso pontual (sharp nao faz parte das dependencias do projeto):
 *   npm i --no-save sharp
 *   node scripts/build-service-images.mjs <intro> <alongamentos> <manutencao> <nailArt> <experiencia>
 */

import path from "node:path";

import sharp from "sharp";

/** 4:3 — proporcao das molduras da faixa de abertura e dos cards. */
const SLOTS = [
  { file: "services-intro.webp", width: 1400, height: 1050 },
  { file: "service-alongamentos.webp", width: 1400, height: 1050 },
  { file: "service-manutencao.webp", width: 1400, height: 1050 },
  { file: "service-nail-art.webp", width: 1400, height: 1050 },
  {
    file: "service-experiencia.webp",
    width: 1400,
    height: 1050,
    // Origem em retrato. A 35% do topo cabem, na mesma moldura, o monograma na
    // parede e a toalha bordada — os dois pontos em que a marca aparece.
    focusY: 0.35,
  },
];

const OUT_DIR = path.join(process.cwd(), "public", "images");

const sources = process.argv.slice(2);
if (sources.length !== SLOTS.length) {
  console.error(`Uso: node scripts/build-service-images.mjs <${SLOTS.length} fotos, na ordem dos slots>`);
  process.exit(1);
}

for (const [i, slot] of SLOTS.entries()) {
  const src = sources[i];
  const meta = await sharp(src).metadata();

  let pipeline = sharp(src).rotate();

  if (typeof slot.focusY === "number") {
    const targetRatio = slot.width / slot.height;
    const cropHeight = Math.round(meta.width / targetRatio);

    if (cropHeight > meta.height) {
      throw new Error(`${slot.file}: a origem e larga demais para usar focusY.`);
    }

    pipeline = pipeline.extract({
      left: 0,
      top: Math.round((meta.height - cropHeight) * slot.focusY),
      width: meta.width,
      height: cropHeight,
    });
  }

  const info = await pipeline
    .resize(slot.width, slot.height, {
      fit: "cover",
      position: "centre",
      kernel: "lanczos3",
    })
    .webp({ quality: 86, effort: 6 })
    .toFile(path.join(OUT_DIR, slot.file));

  console.log(
    `${path.basename(src)} (${meta.width}x${meta.height}) -> ${slot.file} ` +
      `(${info.width}x${info.height}, ${(info.size / 1024).toFixed(0)} KB)`,
  );
}
