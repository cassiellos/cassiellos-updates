/**
 * Prepara as fotografias da secao de servicos.
 *
 * Como as origens ja chegam em 4:3 — mesma proporcao das molduras da secao —
 * o script apenas redimensiona, sem recorte. Nenhuma correcao de cor e
 * aplicada: a cor real do trabalho e do ambiente nao deve ser alterada.
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
  { file: "service-experiencia.webp", width: 1400, height: 1050 },
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

  const info = await sharp(src)
    .rotate()
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
