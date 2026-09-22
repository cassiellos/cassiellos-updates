import Link from "next/link";

import BrandMark from "./BrandMark";
import {
  hasEmail,
  hasPhone,
  hasWhatsApp,
  siteConfig,
} from "@/lib/site-config";
import { addressLine } from "@/lib/seo";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { whatsappMessages } from "@/lib/content";

/**
 * Campos ainda nao confirmados simplesmente nao sao renderizados.
 * Nenhum placeholder textual chega ao HTML.
 */
export default function Footer() {
  const year = new Date().getFullYear();
  const whatsappUrl = buildWhatsAppUrl(whatsappMessages.general);

  return (
    <footer className="border-t border-line bg-ivory">
      <div className="container-macleny py-14 lg:py-20">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <BrandMark />
            <p className="mt-6 max-w-sm text-sm text-espresso-soft">
              Studio especializado em unhas em {siteConfig.brand.city}/
              {siteConfig.brand.state}, com atendimento individual, técnica e cuidado.
            </p>
          </div>

          <div className="md:col-span-4">
            <h2 className="eyebrow text-espresso-muted">Contato</h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={siteConfig.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline"
                >
                  Instagram {siteConfig.contact.instagramHandle}
                </a>
              </li>

              {hasWhatsApp && whatsappUrl ? (
                <li>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline"
                  >
                    WhatsApp
                  </a>
                </li>
              ) : null}

              {hasPhone ? (
                <li>
                  <a
                    href={`tel:${siteConfig.contact.phoneE164 || siteConfig.contact.phoneDisplay}`}
                    className="link-underline"
                  >
                    {siteConfig.contact.phoneDisplay}
                  </a>
                </li>
              ) : null}

              {hasEmail ? (
                <li>
                  <a href={`mailto:${siteConfig.contact.email}`} className="link-underline">
                    {siteConfig.contact.email}
                  </a>
                </li>
              ) : null}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h2 className="eyebrow text-espresso-muted">Studio</h2>
            <ul className="mt-5 space-y-3 text-sm text-espresso-soft">
              {addressLine ? <li>{addressLine}</li> : null}

              {siteConfig.business.openingHours.map((line) => (
                <li key={line}>{line}</li>
              ))}

              <li>
                <Link href="/politica-de-privacidade" className="link-underline">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className="rule my-10" />

        <div className="flex flex-col gap-3 text-xs text-espresso-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.brand.name}. Todos os direitos reservados.
          </p>

          {siteConfig.business.cnpj ? <p>CNPJ {siteConfig.business.cnpj}</p> : null}
        </div>
      </div>
    </footer>
  );
}
