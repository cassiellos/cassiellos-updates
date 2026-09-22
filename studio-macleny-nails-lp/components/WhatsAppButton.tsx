"use client";

import type { ReactNode } from "react";

import { trackWhatsAppClick, type CtaLocation, type TrackedService } from "@/lib/analytics";
import { siteConfig } from "@/lib/site-config";
import { buildWhatsAppUrl, whatsappMessageFor } from "@/lib/whatsapp";
import { whatsappMessages } from "@/lib/content";

type Variant = "primary" | "secondary" | "on-dark" | "ghost-light" | "bare";

type WhatsAppButtonProps = {
  location: CtaLocation;
  service?: TrackedService;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  /** Mensagem customizada; por padrao usa a mensagem do servico. */
  message?: string;
  /**
   * Texto usado quando o WhatsApp ainda nao esta configurado e o CTA cai para
   * o Instagram — canal ja confirmado da marca.
   */
  fallbackLabel?: ReactNode;
};

const variantClass: Record<Variant, string> = {
  primary: "btn btn-primary",
  secondary: "btn btn-secondary",
  "on-dark": "btn btn-on-dark",
  "ghost-light": "btn btn-ghost-light",
  bare: "",
};

function WhatsAppGlyph() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="currentColor"
    >
      <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.33 4.95L2 22l5.3-1.38a9.87 9.87 0 0 0 4.74 1.2h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.13-2.9-7A9.82 9.82 0 0 0 12.04 2Zm0 1.8c2.16 0 4.19.84 5.72 2.37a8.06 8.06 0 0 1 2.37 5.73c0 4.47-3.63 8.1-8.1 8.1a8.1 8.1 0 0 1-4.12-1.13l-.3-.18-3.06.8.82-2.99-.19-.3a8.05 8.05 0 0 1-1.24-4.3c0-4.47 3.64-8.1 8.1-8.1Zm-3.1 4.3c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02s.87 2.34.99 2.5c.12.16 1.7 2.72 4.2 3.7 2.07.82 2.5.66 2.95.62.45-.04 1.45-.59 1.66-1.17.2-.57.2-1.06.15-1.16-.06-.1-.22-.16-.46-.28-.24-.12-1.45-.72-1.67-.8-.22-.08-.39-.12-.55.12-.16.24-.63.8-.77.96-.14.16-.28.18-.52.06-.24-.12-1.03-.38-1.96-1.21-.72-.65-1.21-1.45-1.35-1.69-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.33-.76-1.82-.2-.47-.4-.41-.55-.42h-.47Z" />
    </svg>
  );
}

export default function WhatsAppButton({
  location,
  service = "general",
  children,
  variant = "primary",
  className,
  message,
  fallbackLabel = "Falar pelo Instagram",
}: WhatsAppButtonProps) {
  const resolvedMessage =
    message ??
    (service === "manutencao"
      ? whatsappMessageFor("manutencao")
      : whatsappMessages.general);

  const whatsappUrl = buildWhatsAppUrl(resolvedMessage);
  const classes = [variantClass[variant], className].filter(Boolean).join(" ");

  // Fallback honesto: enquanto o numero nao for confirmado, o CTA leva ao
  // Instagram (canal real da marca) e o rotulo muda junto com o destino.
  if (!whatsappUrl) {
    return (
      <a
        className={classes}
        href={siteConfig.contact.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${typeof fallbackLabel === "string" ? fallbackLabel : "Falar pelo Instagram"} — abre em nova aba`}
      >
        {fallbackLabel}
      </a>
    );
  }

  return (
    <a
      className={classes}
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={
        typeof children === "string"
          ? `${children} — abre a conversa no WhatsApp em nova aba`
          : "Abrir conversa no WhatsApp em nova aba"
      }
      onClick={() => trackWhatsAppClick(location, service)}
    >
      <WhatsAppGlyph />
      <span>{children}</span>
    </a>
  );
}
