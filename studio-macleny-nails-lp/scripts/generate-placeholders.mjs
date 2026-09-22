/**
 * Gera os placeholders de imagem de /public/images.
 *
 * Estes arquivos NAO sao fotografia da marca: sao marcadores neutros, na
 * paleta preliminar, para que o layout possa ser avaliado antes da entrega do
 * material fotografico oficial. Substituir todos antes de publicar.
 *
 * Uso pontual (sharp nao faz parte das dependencias do projeto):
 *   npm i --no-save sharp && node scripts/generate-placeholders.mjs
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

const OUT_DIR = path.join(process.cwd(), "public", "images");

const IVORY = "#F4EFE8";
const IVORY_DEEP = "#EAE2D7";
const TAUPE = "#B8A597";
const ESPRESSO = "#1A1411";
const CHAMPAGNE = "#C7B17E";
const HERITAGE = "#7A401F";

const targets = [
  { file: "hero.webp", w: 1200, h: 1500, label: "Hero", tone: "warm" },
  { file: "maintenance.webp", w: 1200, h: 960, label: "Manutenção", tone: "warm" },
  { file: "experience.webp", w: 1200, h: 960, label: "Experiência", tone: "dark" },
  { file: "founder.webp", w: 1000, h: 1250, label: "Founder", tone: "warm" },
  { file: "editorial-01.webp", w: 900, h: 1200, label: "Editorial 01", tone: "warm" },
  { file: "editorial-02.webp", w: 1200, h: 900, label: "Editorial 02", tone: "deep" },
  { file: "editorial-03.webp", w: 1000, h: 1000, label: "Editorial 03", tone: "warm" },
  { file: "og.webp", w: 1200, h: 630, label: "Open Graph", tone: "og" },
];

function svgFor({ w, h, label, tone }) {
  const base = tone === "dark" ? ESPRESSO : tone === "deep" ? IVORY_DEEP : IVORY;
  const ink = tone === "dark" ? CHAMPAGNE : HERITAGE;
  const soft = tone === "dark" ? "#2A221D" : TAUPE;
  const min = Math.min(w, h);

  if (tone === "og") {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${IVORY}"/>
  <circle cx="${w * 0.88}" cy="${h * 0.1}" r="${h * 0.52}" fill="none" stroke="${CHAMPAGNE}" stroke-width="1.5" opacity="0.7"/>
  <circle cx="${w * 0.1}" cy="${h * 1.02}" r="${h * 0.46}" fill="none" stroke="${TAUPE}" stroke-width="1.5" opacity="0.6"/>
  <text x="${w * 0.08}" y="${h * 0.44}" font-family="Georgia, serif" font-size="${h * 0.14}" letter-spacing="${h * 0.02}" fill="${ESPRESSO}">MACLENY</text>
  <text x="${w * 0.08}" y="${h * 0.56}" font-family="Helvetica, Arial, sans-serif" font-size="${h * 0.038}" letter-spacing="${h * 0.012}" fill="${HERITAGE}">STUDIO MACLENY NAILS — BELO HORIZONTE</text>
  <text x="${w * 0.08}" y="${h * 0.72}" font-family="Helvetica, Arial, sans-serif" font-size="${h * 0.032}" fill="${ESPRESSO}" opacity="0.62">Imagem Open Graph provisória — substituir pelo asset oficial.</text>
</svg>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${base}"/>
  <circle cx="${w * 0.78}" cy="${h * 0.22}" r="${min * 0.58}" fill="none" stroke="${soft}" stroke-width="1.25" opacity="0.75"/>
  <circle cx="${w * 0.16}" cy="${h * 0.86}" r="${min * 0.42}" fill="none" stroke="${ink}" stroke-width="1.25" opacity="0.35"/>
  <text x="${w / 2}" y="${h / 2 - min * 0.02}" text-anchor="middle" font-family="Georgia, serif" font-size="${min * 0.085}" fill="${ink}" opacity="0.85">${label}</text>
  <text x="${w / 2}" y="${h / 2 + min * 0.06}" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="${min * 0.028}" letter-spacing="${min * 0.008}" fill="${ink}" opacity="0.6">IMAGEM PROVISÓRIA — SUBSTITUIR</text>
</svg>`;
}

await mkdir(OUT_DIR, { recursive: true });

for (const target of targets) {
  const svg = svgFor(target);
  const buffer = await sharp(Buffer.from(svg)).webp({ quality: 82 }).toBuffer();
  await writeFile(path.join(OUT_DIR, target.file), buffer);
  console.log(`gerado: public/images/${target.file} (${target.w}x${target.h})`);
}

const inlineSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900" role="img" aria-label="Imagem provisória">
  <rect width="1200" height="900" fill="${IVORY_DEEP}"/>
  <circle cx="960" cy="180" r="520" fill="none" stroke="${TAUPE}" stroke-width="1.25"/>
  <text x="600" y="450" text-anchor="middle" font-family="Georgia, serif" font-size="72" fill="${HERITAGE}" opacity="0.8">Imagem provisória</text>
</svg>`;

await writeFile(path.join(OUT_DIR, "placeholder.svg"), inlineSvg);
console.log("gerado: public/images/placeholder.svg");
