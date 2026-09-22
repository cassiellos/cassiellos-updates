"use client";

import Script from "next/script";

import { siteConfig } from "@/lib/site-config";

/**
 * Carrega UMA rota de tag, nunca as duas:
 *  - GTM configurado          -> apenas o container do GTM;
 *  - GTM ausente e Ads presente -> apenas o Google Tag (gtag.js).
 * Sem IDs configurados nao injeta nada e o site segue funcionando.
 */
export default function Analytics() {
  const { gtmId, googleAdsId } = siteConfig.analytics;

  if (gtmId) {
    return (
      <Script id="gtm-init" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
      </Script>
    );
  }

  if (googleAdsId) {
    return (
      <>
        <Script
          id="gtag-src"
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`}
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${googleAdsId}');`}
        </Script>
      </>
    );
  }

  return null;
}
