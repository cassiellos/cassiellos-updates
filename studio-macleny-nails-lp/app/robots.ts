import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo";
import { hasConfirmedDomain } from "@/lib/site-config";

/**
 * Preview deployments da Vercel sao marcados como noindex para nao competir
 * com o dominio canonico. Producao libera crawling publico — inclusive
 * Googlebot e AdsBot, exigidos para campanhas de Pesquisa.
 */
export default function robots(): MetadataRoute.Robots {
  const isPreview = process.env.VERCEL_ENV === "preview";

  if (isPreview) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  const rules: MetadataRoute.Robots["rules"] = [{ userAgent: "*", allow: "/" }];

  return {
    rules,
    ...(hasConfirmedDomain
      ? { sitemap: absoluteUrl("/sitemap.xml"), host: absoluteUrl("/") }
      : {}),
  };
}
