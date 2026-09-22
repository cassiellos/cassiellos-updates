/**
 * Prepara as fotos da galeria editorial para os slots de public/images.
 *
 * O script APENAS recorta e redimensiona. Nenhuma correcao de cor e aplicada:
 * o manual da marca determina que a cor real do trabalho nao seja alterada por
 * overlay ou grade — a identidade fica controlada na interface, a expressao
 * fica nas unhas.
 *
 * O recorte usa `position: "attention"` do sharp, que escolhe a regiao de maior
 * saliencia — nas fotos de unhas, as maos — em vez de cortar pelo centro cego.
 *
 * Uso pontual (sharp nao faz parte das dependencias do projeto):
 *   npm i --no-save sharp
 *   node scripts/build-gallery-images.mjs <foto1> <foto2> <foto3>
 */

import path from "node:path";

import sharp from "sharp";

/** Proporcao e tamanho de cada slot, na ordem em que aparecem na galeria. */
const SLOTS = [
  { file: "editorial-01.webp", width: 1000, height: 1250 }, // 4:5, coluna 5
  { file: "editorial-02.webp", width: 1400, height: 1120 }, // 5:4, coluna 7
  { file: "editorial-03.webp", width: 1000, height: 1000 }, // 1:1, coluna 6
];

const OUT_DIR = path.join(process.cwd(), "public", "images");

const sources = process.argv.slice(2);
if (sources.length !== SLOTS.length) {
  console.error(`Uso: node scripts/build-gallery-images.mjs <${SLOTS.length} fotos, na ordem dos slots>`);
  process.exit(1);
}

for (const [i, slot] of SLOTS.entries()) {
  const src = sources[i];
  const meta = await sharp(src).metadata();

  const out = path.join(OUT_DIR, slot.file);
  const info = await sharp(src)
    .rotate()
    .resize(slot.width, slot.height, {
      fit: "cover",
      position: "attention",
      kernel: "lanczos3",
    })
    .webp({ quality: 86, effort: 6 })
    .toFile(out);

  console.log(
    `${path.basename(src)} (${meta.width}x${meta.height}) -> ${slot.file} ` +
      `(${info.width}x${info.height}, ${(info.size / 1024).toFixed(0)} KB)`,
  );
}
