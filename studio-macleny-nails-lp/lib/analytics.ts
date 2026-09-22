/**
 * Camada unica de tracking.
 *
 * Regras:
 *  - nenhum dado pessoal (PII) e enviado;
 *  - o site funciona normalmente com todas as variaveis de ambiente vazias;
 *  - a conversao NUNCA dispara pelas duas rotas ao mesmo tempo:
 *      GTM configurado  -> apenas dataLayer (a conversao e montada no GTM);
 *      GTM ausente      -> Google Tag direto, se ID e label existirem.
 */

import { siteConfig } from "./site-config";

export type CtaLocation =
  | "header"
  | "hero"
  | "services"
  | "services_helper"
  | "experience"
  | "final_cta"
  | "footer"
  | "floating";

export type TrackedService =
  | "general"
  | "alongamentos"
  | "manutencao"
  | "nail-art"
  | "experiencia";

export type WhatsAppClickPayload = {
  event: "whatsapp_click";
  cta_location: CtaLocation;
  service: TrackedService;
  destination_type: "whatsapp";
};

type DataLayerRecord = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: DataLayerRecord[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const hasGtm = () => siteConfig.analytics.gtmId.length > 0;

export const hasDirectGoogleTag = () =>
  siteConfig.analytics.googleAdsId.length > 0 &&
  siteConfig.analytics.whatsappConversionLabel.length > 0;

/** true quando alguma rota de tag deve ser carregada no layout. */
export const hasAnyTag = () =>
  siteConfig.analytics.gtmId.length > 0 ||
  siteConfig.analytics.googleAdsId.length > 0;

export function buildWhatsAppClickPayload(
  location: CtaLocation,
  service: TrackedService,
): WhatsAppClickPayload {
  return {
    event: "whatsapp_click",
    cta_location: location,
    service,
    destination_type: "whatsapp",
  };
}

/**
 * Dispara o evento de clique em WhatsApp.
 * Silencioso e seguro quando nenhuma tag esta configurada.
 */
export function trackWhatsAppClick(
  location: CtaLocation,
  service: TrackedService,
): void {
  if (typeof window === "undefined") return;

  const payload = buildWhatsAppClickPayload(location, service);

  if (hasGtm()) {
    // Rota A — GTM. A acao de conversao do Google Ads e configurada dentro do
    // container, escutando o evento `whatsapp_click`. Nao disparar aqui.
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ ...payload });
    return;
  }

  if (hasDirectGoogleTag() && typeof window.gtag === "function") {
    // Rota B — Google Tag direto. Um unico disparo por clique.
    const sendTo = `${siteConfig.analytics.googleAdsId}/${siteConfig.analytics.whatsappConversionLabel}`;

    window.gtag("event", "conversion", { send_to: sendTo });
    window.gtag("event", payload.event, {
      cta_location: payload.cta_location,
      service: payload.service,
      destination_type: payload.destination_type,
    });
  }
}
