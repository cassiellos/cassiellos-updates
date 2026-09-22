/**
 * Helper unico de WhatsApp. O numero vem SOMENTE de `siteConfig`.
 */

import { siteConfig } from "./site-config";
import { whatsappMessages, type WhatsAppMessageKey } from "./content";

/**
 * Monta a URL de conversa. Retorna null enquanto o numero nao estiver
 * configurado — nesse caso os CTAs caem para o Instagram ou sao ocultados.
 */
export function buildWhatsAppUrl(message: string): string | null {
  const number = siteConfig.contact.whatsappNumber.replace(/\D/g, "");
  if (!number) return null;

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function whatsappMessageFor(key: WhatsAppMessageKey): string {
  return whatsappMessages[key];
}
