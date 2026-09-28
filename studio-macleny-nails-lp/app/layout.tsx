import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";

import "./globals.css";

import Analytics from "@/components/Analytics";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, buildBusinessJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

/**
 * PROVISORIO: dupla de teste indicada no dossie (Instrument Serif + Manrope).
 * Nao e a tipografia oficial aprovada. Ao receber os arquivos definitivos,
 * trocar por next/font/local e atualizar docs/design-system.md.
 */
const displayFont = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-instrument-serif",
});

const sansFont = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = buildMetadata();

export const viewport: Viewport = {
  themeColor: "#f4efe8",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const gtmId = siteConfig.analytics.gtmId;

  return (
    <html lang="pt-BR" className={`${displayFont.variable} ${sansFont.variable}`}>
      <head>
        {/*
          Marca que ha JavaScript antes da pintura. Sem isso, os blocos com
          reveal ficariam invisiveis para quem navega sem JS.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js")`,
          }}
        />
      </head>
      <body>
        {gtmId ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
            />
          </noscript>
        ) : null}

        <a className="skip-link" href="#conteudo">
          Ir para o conteúdo
        </a>

        <Header />
        <main id="conteudo">{children}</main>
        <Footer />

        <Analytics />
        <JsonLd id="ld-business" data={buildBusinessJsonLd()} />
      </body>
    </html>
  );
}
