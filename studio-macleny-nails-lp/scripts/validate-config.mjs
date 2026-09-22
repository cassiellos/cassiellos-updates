#!/usr/bin/env node
/**
 * Checagem de configuracao e prontidao para producao.
 *
 *   node scripts/validate-config.mjs            -> relatorio (falha so em ERROR)
 *   node scripts/validate-config.mjs --strict   -> modo release: WARNING vira ERROR
 *
 * O modo padrao permite desenvolver com dados ainda pendentes.
 * O modo --strict e o portao antes de publicar em dominio proprio e antes de
 * apontar uma campanha de Google Ads para esta pagina.
 */

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const STRICT = process.argv.includes("--strict");

const errors = [];
const warnings = [];
const notes = [];

const fail = (message) => errors.push(message);
const warn = (message) => warnings.push(message);
const note = (message) => notes.push(message);

function readFile(relativePath) {
  const filePath = path.join(ROOT, relativePath);
  if (!existsSync(filePath)) {
    fail(`Arquivo obrigatório ausente: ${relativePath}`);
    return "";
  }
  return readFileSync(filePath, "utf8");
}

/** Remove comentarios para que exemplos citados em comentario nao sejam lidos. */
function stripComments(source) {
  return source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/.*$/gm, "$1");
}

/** Extrai `campo: "valor"` de um arquivo TS de configuracao. */
function readStringField(source, field) {
  const match = source.match(new RegExp(`${field}\\s*:\\s*"([^"]*)"`));
  return match ? match[1] : null;
}

/**
 * Valida um CNPJ pelos dois digitos verificadores. Pega erro de digitacao
 * antes que o numero errado chegue ao rodape e a pagina de privacidade.
 */
function isValidCnpj(value) {
  const d = value.replace(/\D/g, "");
  if (d.length !== 14 || /^(\d)\1{13}$/.test(d)) return false;

  const digit = (base, weights) => {
    const sum = base
      .split("")
      .reduce((acc, char, i) => acc + Number(char) * weights[i], 0);
    const rest = sum % 11;
    return String(rest < 2 ? 0 : 11 - rest);
  };

  const first = digit(d.slice(0, 12), [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const second = digit(d.slice(0, 12) + first, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);

  return d.slice(12) === first + second;
}

function readBooleanField(source, field) {
  const match = source.match(new RegExp(`${field}\\s*:\\s*(true|false)`));
  return match ? match[1] === "true" : null;
}

/* -------------------------------------------------------------------------- */
/* 1. Dominio canonico                                                         */
/* -------------------------------------------------------------------------- */

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "").trim();

if (!siteUrl) {
  warn(
    "Domínio canônico não configurado (NEXT_PUBLIC_SITE_URL vazio). " +
      "metadataBase, canonical, sitemap e robots usarão o fallback local.",
  );
} else {
  let parsed = null;
  try {
    parsed = new URL(siteUrl);
  } catch {
    fail(`NEXT_PUBLIC_SITE_URL não é uma URL válida: "${siteUrl}"`);
  }

  if (parsed) {
    if (parsed.protocol !== "https:") {
      fail(`O domínio canônico precisa usar HTTPS. Valor atual: "${siteUrl}"`);
    }
    if (/localhost|127\.0\.0\.1/.test(parsed.hostname)) {
      fail(`Domínio canônico aponta para localhost: "${siteUrl}"`);
    }
    if (parsed.hostname.endsWith(".vercel.app")) {
      warn(
        `Domínio canônico ainda é uma URL temporária da Vercel ("${parsed.hostname}"). ` +
          "Confirme o domínio oficial com a cliente antes do lançamento.",
      );
    }
    if (siteUrl.endsWith("/")) {
      warn("NEXT_PUBLIC_SITE_URL não deve terminar com barra.");
    }
  }
}

/* -------------------------------------------------------------------------- */
/* 2. Dados comerciais                                                         */
/* -------------------------------------------------------------------------- */

const configSource = stripComments(readFile("lib/site-config.ts"));

const whatsapp = readStringField(configSource, "whatsappNumber");
const phoneDisplay = readStringField(configSource, "phoneDisplay");
const phoneE164 = readStringField(configSource, "phoneE164");
const email = readStringField(configSource, "email");
const cnpj = readStringField(configSource, "cnpj");
const legalName = readStringField(configSource, "legalName");
const street = readStringField(configSource, "street");
const postalCode = readStringField(configSource, "postalCode");
const instagramUrl = readStringField(configSource, "instagramUrl");

if (!whatsapp) {
  warn(
    "WhatsApp não configurado (contact.whatsappNumber). " +
      "Os CTAs caem para o Instagram e o botão flutuante fica oculto.",
  );
} else if (!/^\d{12,15}$/.test(whatsapp)) {
  fail(
    `contact.whatsappNumber deve conter apenas dígitos em E.164 sem "+" ` +
      `(ex.: 5531999999999). Valor atual: "${whatsapp}"`,
  );
}

if (phoneE164 && !/^\+\d{12,15}$/.test(phoneE164)) {
  fail(`contact.phoneE164 deve começar com "+" e conter só dígitos. Valor: "${phoneE164}"`);
}

if (!phoneDisplay) warn("Telefone de exibição não configurado (contact.phoneDisplay).");
if (!email) warn("E-mail não configurado (contact.email).");
if (!cnpj) {
  warn("CNPJ não configurado (business.cnpj) — não inventar, deixar oculto.");
} else if (!isValidCnpj(cnpj)) {
  fail(
    `business.cnpj "${cnpj}" não passa na checagem de dígitos verificadores. ` +
      "Confirme o número com a cliente antes de publicar.",
  );
}
if (!legalName) warn("Razão social não configurada (business.legalName).");

if (!street || !postalCode) {
  warn(
    "Endereço não confirmado (business.address). " +
      "O JSON-LD permanece como Organization e a FAQ de localização fica oculta.",
  );
  note(
    "Com o endereço confirmado, o JSON-LD passa automaticamente para NailSalon.",
  );
}

if (!instagramUrl) {
  fail("contact.instagramUrl está vazio — é o único canal confirmado hoje.");
}

/* -------------------------------------------------------------------------- */
/* 3. Analytics                                                                */
/* -------------------------------------------------------------------------- */

const gtmId = (process.env.NEXT_PUBLIC_GTM_ID ?? "").trim();
const adsId = (process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "").trim();
const adsLabel = (process.env.NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_LABEL ?? "").trim();

if (gtmId && !/^GTM-[A-Z0-9]{6,9}$/.test(gtmId)) {
  fail(`NEXT_PUBLIC_GTM_ID fora do formato GTM-XXXXXXX: "${gtmId}"`);
}

if (adsId && !/^AW-\d{9,12}$/.test(adsId)) {
  fail(`NEXT_PUBLIC_GOOGLE_ADS_ID fora do formato AW-000000000: "${adsId}"`);
}

if (gtmId && adsId) {
  warn(
    "GTM e Google Ads ID configurados ao mesmo tempo. O código prioriza o GTM " +
      "e não dispara a conversão duas vezes — confirme que a conversão está " +
      "montada apenas dentro do container do GTM.",
  );
}

if (adsId && !gtmId && !adsLabel) {
  fail(
    "Google Ads sem GTM exige NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_LABEL para " +
      "disparar a conversão.",
  );
}

if (!gtmId && !adsId) {
  note("Nenhuma tag configurada: o site funciona normalmente, sem tracking.");
}

/* -------------------------------------------------------------------------- */
/* 4. Assets                                                                   */
/* -------------------------------------------------------------------------- */

const officialBrandFiles = readBooleanField(configSource, "officialBrandFiles");
const officialOgImage = readBooleanField(configSource, "officialOgImage");

const officialSymbol = readBooleanField(configSource, "officialSymbol");

if (officialSymbol === true && !existsSync(path.join(ROOT, "public/brand/logo-symbol.png"))) {
  fail("assets.officialSymbol = true, mas public/brand/logo-symbol.png nao existe.");
}

if (officialSymbol !== true) {
  warn("Simbolo oficial ausente (assets.officialSymbol = false).");
}

for (const asset of [
  "public/brand/logo-primary.svg",
  "public/brand/logo-horizontal.svg",
]) {
  if (!existsSync(path.join(ROOT, asset))) {
    fail(`Asset de marca ausente: ${asset}`);
  } else if (officialBrandFiles !== true) {
    const content = readFileSync(path.join(ROOT, asset), "utf8");
    if (content.includes("LOGO OFICIAL PENDENTE")) {
      warn(`${asset} ainda é placeholder — substituir pelo arquivo oficial.`);
    }
  }
}

if (officialBrandFiles === true) {
  note("Arquivos de marca marcados como oficiais.");
}

const requiredImages = [
  "hero.webp",
  "experience.webp",
  "services-intro.webp",
  "service-alongamentos.webp",
  "service-manutencao.webp",
  "service-nail-art.webp",
  "service-experiencia.webp",
  "founder.webp",
  "editorial-01.webp",
  "editorial-02.webp",
  "editorial-03.webp",
  "og.webp",
];

const imagesDir = path.join(ROOT, "public", "images");

for (const image of requiredImages) {
  const filePath = path.join(imagesDir, image);
  if (!existsSync(filePath)) {
    fail(`Imagem ausente: public/images/${image}`);
    continue;
  }
  // Placeholders gerados ficam bem abaixo de 40KB; fotografia real, acima.
  if (statSync(filePath).size < 40_000) {
    warn(`public/images/${image} ainda parece placeholder — substituir pela foto oficial.`);
  }
}

if (officialOgImage !== true) {
  warn("assets.officialOgImage = false: a imagem Open Graph ainda é provisória.");
}

/* -------------------------------------------------------------------------- */
/* 5. Varredura de placeholders e de resíduos de outro projeto                 */
/* -------------------------------------------------------------------------- */

const SCAN_DIRS = ["app", "components", "lib", "docs", "scripts"];
const SCAN_EXT = new Set([".ts", ".tsx", ".css", ".md", ".mjs"]);

const placeholderPatterns = [
  { pattern: /\{\{\s*(DOMAIN|PHONE|TELEFONE|CNPJ|WHATSAPP|EMAIL)/i, label: "placeholder {{...}}" },
  { pattern: /\bLorem ipsum\b/i, label: "Lorem ipsum" },
  { pattern: /\bFIXME\b/, label: "FIXME" },
];

// Residuos do projeto de referencia (Black Car). Devem ser ZERO.
const foreignPatterns = [
  /\bblack\s?car\b/i,
  /\bmotorista\b/i,
  /\bconfins\b/i,
  /\bblindado\b/i,
  /\bcity\s?tour\b/i,
  /\bpassageir[oa]s?\b/i,
];

function walk(dir) {
  const entries = [];
  const full = path.join(ROOT, dir);
  if (!existsSync(full)) return entries;

  for (const entry of readdirSync(full, { withFileTypes: true })) {
    const relative = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      entries.push(...walk(relative));
    } else if (SCAN_EXT.has(path.extname(entry.name))) {
      entries.push(relative);
    }
  }
  return entries;
}

// O proprio validador contem os padroes procurados e e excluido da varredura.
const SELF = path.relative(ROOT, process.argv[1] ?? "");

const scanned = SCAN_DIRS.flatMap((dir) => walk(dir)).filter(
  (relative) => relative !== SELF,
);

for (const relative of scanned) {
  const content = readFileSync(path.join(ROOT, relative), "utf8");

  for (const { pattern, label } of placeholderPatterns) {
    if (pattern.test(content)) {
      fail(`${relative}: encontrado ${label}.`);
    }
  }

  for (const pattern of foreignPatterns) {
    if (pattern.test(content)) {
      fail(`${relative}: termo de outro projeto encontrado (${pattern}).`);
    }
  }

  if (/\bTODO\b/.test(content)) {
    warn(`${relative}: contém TODO.`);
  }
}

note(`${scanned.length} arquivos varridos por placeholders e resíduos.`);

/* -------------------------------------------------------------------------- */
/* Relatório                                                                   */
/* -------------------------------------------------------------------------- */

const print = (title, items, prefix) => {
  if (items.length === 0) return;
  console.log(`\n${title}`);
  for (const item of items) console.log(`  ${prefix} ${item}`);
};

console.log(`Studio Macleny Nails — validação de configuração${STRICT ? " (modo strict)" : ""}`);

print("ERROS", errors, "x");
print(STRICT ? "AVISOS (bloqueantes em modo strict)" : "AVISOS", warnings, "!");
print("NOTAS", notes, "·");

const blocking = STRICT ? errors.length + warnings.length : errors.length;

console.log(
  `\nResumo: ${errors.length} erro(s), ${warnings.length} aviso(s), ${notes.length} nota(s).`,
);

if (blocking > 0) {
  console.log(
    STRICT
      ? "\nFalhou: resolva erros e avisos antes de publicar em domínio próprio ou anunciar."
      : "\nFalhou: resolva os erros acima.",
  );
  process.exit(1);
}

console.log("\nOK.");
