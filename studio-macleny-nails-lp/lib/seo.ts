/**
 * Helpers de SEO e dados estruturados.
 *
 * REGRA: o JSON-LD so pode descrever dados verdadeiros e presentes na pagina.
 * Propriedades sem dado confirmado (endereco, telefone, horario, avaliacoes,
 * faixa de preco) simplesmente NAO sao emitidas.
 */

import type { Metadata } from "next";

import {
  formatAddress,
  hasConfirmedAddress,
  hasEmail,
  hasPhone,
  siteConfig,
  siteOrigin,
} from "./site-config";
import type { FaqItem } from "./content";

export const defaultTitle =
  "Studio Macleny Nails | Nail Designer em Belo Horizonte";

export const defaultDescription =
  "Studio especializado em unhas em Belo Horizonte, com atendimento individual, técnica, precisão e cuidado. Agende seu atendimento pelo WhatsApp.";

export function absoluteUrl(path = "/"): string {
  return new URL(path, siteOrigin).toString();
}

export function buildMetadata(
  overrides: {
    title?: string;
    description?: string;
    path?: string;
    robots?: Metadata["robots"];
  } = {},
): Metadata {
  const title = overrides.title ?? defaultTitle;
  const description = overrides.description ?? defaultDescription;
  const path = overrides.path ?? "/";
  const url = absoluteUrl(path);

  return {
    metadataBase: new URL(siteOrigin),
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url,
      siteName: siteConfig.brand.name,
      title,
      description,
      images: [
        {
          url: siteConfig.assets.ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.brand.name} — nail designer em ${siteConfig.brand.city}.`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.assets.ogImage],
    },
    ...(overrides.robots ? { robots: overrides.robots } : {}),
  };
}

/* -------------------------------------------------------------------------- */
/* JSON-LD                                                                     */
/* -------------------------------------------------------------------------- */

type JsonLdValue = string | string[] | Record<string, unknown>;
type JsonLd = Record<string, JsonLdValue>;

/**
 * Enquanto o endereco fisico nao estiver confirmado, usamos `Organization`
 * (estrutura conservadora). Com endereco confirmado, passamos a `NailSalon`,
 * que pertence a familia LocalBusiness / HealthAndBeautyBusiness.
 */
export function buildBusinessJsonLd(): JsonLd {
  const addressConfirmed = hasConfirmedAddress();

  const data: JsonLd = {
    "@context": "https://schema.org",
    "@type": addressConfirmed ? "NailSalon" : "Organization",
    name: siteConfig.brand.name,
    url: absoluteUrl("/"),
    description: defaultDescription,
  };

  // `logo` e `image` so entram quando os arquivos oficiais estiverem no
  // projeto: nao faz sentido descrever um placeholder como ativo da marca.
  if (siteConfig.assets.officialBrandFiles) {
    data.logo = absoluteUrl(siteConfig.assets.logoPrimary);
  }

  if (siteConfig.assets.officialOgImage) {
    data.image = absoluteUrl(siteConfig.assets.ogImage);
  }

  const sameAs = [siteConfig.contact.instagramUrl].filter(Boolean);
  if (sameAs.length > 0) {
    data.sameAs = sameAs;
  }

  if (hasPhone) {
    data.telephone = siteConfig.contact.phoneE164 || siteConfig.contact.phoneDisplay;
  }

  if (hasEmail) {
    data.email = siteConfig.contact.email;
  }

  if (addressConfirmed) {
    const a = siteConfig.business.address;
    data.address = {
      "@type": "PostalAddress",
      streetAddress: [a.street, a.number, a.complement].filter(Boolean).join(", "),
      addressLocality: a.city,
      addressRegion: a.state,
      postalCode: a.postalCode,
      addressCountry: a.country,
    };
  } else {
    // Sem endereco confirmado emitimos apenas a area atendida, que e verdadeira.
    data.areaServed = `${siteConfig.brand.city}, ${siteConfig.brand.state}`;
  }

  return data;
}

/**
 * FAQPage construido a partir do MESMO array renderizado na pagina,
 * garantindo que nao exista pergunta no schema que o usuario nao veja.
 */
export function buildFaqJsonLd(items: FaqItem[]): JsonLd | null {
  if (items.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })) as unknown as Record<string, unknown>,
  };
}

/** Linha de endereco reutilizada por FAQ e Footer. */
export const addressLine = formatAddress();
