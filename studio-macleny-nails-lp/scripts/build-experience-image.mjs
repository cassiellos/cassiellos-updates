/**
 * Prepara a fotografia da secao Macleny Experience.
 *
 * A moldura e 5:4, mais quadrada que o 4:3 das fotos de servico — por isso ela
 * tem script proprio em vez de entrar em `build-service-images.mjs`.
 *
 * O recorte e HORIZONTAL: origens 4:3 sao mais largas que o slot, entao sobra
 * largura, nao altura. `focusX` diz de onde comeca o corte (0 = esquerda,
 * 1 = direita, 0.5 = centrado), pelo mesmo motivo do `focusY` das fotos de
 * servico: corte automatico descarta justamente o que importa quando a cena
 * tem pontos de interesse distantes entre si.
 *
 * Nao ha redimensionamento nem correcao de cor. A imagem sai na resolucao
 * nativa do recorte — ampliar nao acrescenta detalhe, so peso — e a cor real
 * do ambiente e do trabalho nao deve ser alterada.
 *
 * Uso pontual (sharp nao faz parte das dependencias do projeto):
 *   npm i --no-save sharp
 *   node scripts/build-experience-image.mjs <foto> [focusX]
 */

import path from "node:path";

import sharp from "sharp";

/** Proporcao da moldura em `components/MaclenyExperience.tsx`. */
const TARGET_RATIO = 5 / 4;

const OUT = path.join(process.cwd(), "public", "images", "experience.webp");

const [src, focusRaw] = process.argv.slice(2);
if (!src) {
  console.error("Uso: node scripts/build-experience-image.mjs <foto> [focusX 0..1]");
  process.exit(1);
}

const focusX = focusRaw === undefined ? 0.5 : Number(focusRaw);
if (!Number.isFinite(focusX) || focusX < 0 || focusX > 1) {
  console.error("focusX precisa estar entre 0 e 1.");
  process.exit(1);
}

const meta = await sharp(src).rotate().metadata();
const sourceRatio = meta.width / meta.height;

let extract;
if (sourceRatio > TARGET_RATIO) {
  // Origem mais larga que a moldura: sobra largura, corta nas laterais.
  const width = Math.round(meta.height * TARGET_RATIO);
  extract = {
    left: Math.round((meta.width - width) * focusX),
    top: 0,
    width,
    height: meta.height,
  };
} else {
  // Origem mais alta: sobra altura, corta no topo/base pelo centro.
  const height = Math.round(meta.width / TARGET_RATIO);
  extract = {
    left: 0,
    top: Math.round((meta.height - height) / 2),
    width: meta.width,
    height,
  };
}

const info = await sharp(src)
  .rotate()
  .extract(extract)
  .webp({ quality: 86, effort: 6 })
  .toFile(OUT);

console.log(
  JSON.stringify(
    {
      origem: `${meta.width}x${meta.height} (${sourceRatio.toFixed(3)})`,
      moldura: `5:4 (${TARGET_RATIO.toFixed(3)})`,
      descartado: `${meta.width - extract.width}px de largura, ${meta.height - extract.height}px de altura`,
      saida: `${info.width}x${info.height} (${(info.width / info.height).toFixed(3)})`,
      arquivo: path.relative(process.cwd(), OUT),
      kb: Number((info.size / 1024).toFixed(1)),
    },
    null,
    2,
  ),
);
