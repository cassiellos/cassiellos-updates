/**
 * FONTE UNICA DE VERDADE para dados comerciais, contato e identidade.
 *
 * REGRA DO PROJETO: nada aqui pode ser inventado.
 * Campos ainda nao confirmados pela cliente ficam como string vazia ("").
 * Strings vazias sao tratadas como "pendente" em todo o projeto: a interface
 * simplesmente OCULTA o bloco correspondente, nunca renderiza placeholder.
 *
 * Ao preencher um campo, rode `npm run check:config` para revalidar.
 */

export type PostalAddress = {
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export type SiteConfig = {
  brand: {
    name: string;
    shortName: string;
    wordmark: string;
    founder: string;
    founderRole: string;
    city: string;
    state: string;
  };
  /** Dominio canonico COM protocolo e SEM barra final. Vazio = nao confirmado. */
  domain: string;
  contact: {
    phoneDisplay: string;
    phoneE164: string;
    whatsappNumber: string;
    email: string;
    instagramHandle: string;
    instagramUrl: string;
  };
  business: {
    legalName: string;
    cnpj: string;
    address: PostalAddress;
    openingHours: string[];
  };
  analytics: {
    gtmId: string;
    googleAdsId: string;
    whatsappConversionLabel: string;
  };
  assets: {
    /** false enquanto /public/brand contiver apenas placeholders do projeto. */
    officialBrandFiles: boolean;
    /** false enquanto a imagem Open Graph for um placeholder gerado. */
    officialOgImage: boolean;
    logoPrimary: string;
    logoHorizontal: string;
    logoSymbol: string;
    ogImage: string;
  };
};

/**
 * Fallback de desenvolvimento. NAO e o dominio oficial: existe apenas para que
 * `new URL()` nao quebre o build enquanto o dominio real nao for confirmado.
 * `scripts/validate-config.mjs --strict` falha se este valor chegar a producao.
 */
export const DEV_FALLBACK_ORIGIN = "http://localhost:3000";

export const siteConfig: SiteConfig = {
  brand: {
    name: "Studio Macleny Nails",
    shortName: "Macleny",
    wordmark: "MACLENY",
    founder: "Jheniffer Macleny",
    founderRole: "Founder / Nail Specialist",
    city: "Belo Horizonte",
    state: "MG",
  },

  // PENDENTE: o briefing cita um dominio, mas o dossie determina validacao
  // manual do dominio canonico antes da publicacao. Preencher via
  // NEXT_PUBLIC_SITE_URL ou diretamente aqui apos confirmacao da cliente.
  domain: (process.env.NEXT_PUBLIC_SITE_URL ?? "").trim().replace(/\/+$/, ""),

  contact: {
    phoneDisplay: "", // PENDENTE
    phoneE164: "", // PENDENTE — formato: +5531999999999
    whatsappNumber: "5531988217033", // (31) 98821-7033
    email: "", // PENDENTE
    instagramHandle: "@maclenynails",
    instagramUrl: "https://www.instagram.com/maclenynails/",
  },

  business: {
    legalName: "", // PENDENTE — razao social
    cnpj: "36.819.882/0001-69",
    address: {
      street: "", // PENDENTE
      number: "", // PENDENTE
      complement: "",
      neighborhood: "", // PENDENTE
      city: "Belo Horizonte",
      state: "MG",
      postalCode: "", // PENDENTE
      country: "BR",
    },
    openingHours: [], // PENDENTE — nao publicar horario sem confirmacao
  },

  analytics: {
    gtmId: (process.env.NEXT_PUBLIC_GTM_ID ?? "").trim(),
    googleAdsId: (process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "").trim(),
    whatsappConversionLabel: (
      process.env.NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_LABEL ?? ""
    ).trim(),
  },

  assets: {
    // PENDENTE: substituir pelos arquivos oficiais do rebranding e marcar
    // `officialBrandFiles: true`. Enquanto for false, a interface usa o
    // fallback tipografico e o JSON-LD nao emite `logo`.
    officialBrandFiles: false,
    officialOgImage: false,
    logoPrimary: "/brand/logo-primary.svg",
    logoHorizontal: "/brand/logo-horizontal.svg",
    logoSymbol: "/brand/logo-symbol.svg",
    ogImage: "/images/og.webp",
  },
};

/** Origem usada por metadataBase, canonical, sitemap e robots. */
export const siteOrigin = siteConfig.domain || DEV_FALLBACK_ORIGIN;

/** true quando o dominio canonico oficial ja foi confirmado e configurado. */
export const hasConfirmedDomain = siteConfig.domain.length > 0;

export const hasWhatsApp = siteConfig.contact.whatsappNumber.length > 0;
export const hasPhone = siteConfig.contact.phoneDisplay.length > 0;
export const hasEmail = siteConfig.contact.email.length > 0;

export const hasOfficialBrandFiles = siteConfig.assets.officialBrandFiles;

export function hasConfirmedAddress(): boolean {
  const a = siteConfig.business.address;
  return Boolean(a.street && a.number && a.neighborhood && a.postalCode);
}

/** Endereco em uma linha. Retorna "" enquanto o endereco nao for confirmado. */
export function formatAddress(): string {
  if (!hasConfirmedAddress()) return "";
  const a = siteConfig.business.address;
  const line1 = [`${a.street}, ${a.number}`, a.complement].filter(Boolean).join(" — ");
  return `${line1} — ${a.neighborhood}, ${a.city}/${a.state} — CEP ${a.postalCode}`;
}
