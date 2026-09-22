import Image from "next/image";

import { siteConfig } from "@/lib/site-config";

type BrandMarkProps = {
  /** "light" = sobre Ivory; "dark" = sobre Espresso. */
  tone?: "light" | "dark";
  className?: string;
};

/**
 * Assinatura da marca.
 *
 * IMPORTANTE: enquanto `siteConfig.assets.officialBrandFiles` for false, isto
 * NAO e a logo — e um fallback tipografico de interface, com MACLENY em maior
 * protagonismo e "Studio"/"Nails" como descritores, conforme a hierarquia do
 * dossie. O wordmark definitivo deve vir do arquivo oficial do rebranding.
 */
export default function BrandMark({ tone = "light", className }: BrandMarkProps) {
  if (siteConfig.assets.officialBrandFiles) {
    return (
      <Image
        src={siteConfig.assets.logoHorizontal}
        alt={siteConfig.brand.name}
        width={220}
        height={48}
        priority
        className={className}
      />
    );
  }

  const descriptorColor = tone === "dark" ? "text-champagne" : "text-espresso-muted";

  return (
    <span className={["inline-flex flex-col leading-none", className].filter(Boolean).join(" ")}>
      <span className="visually-hidden">{siteConfig.brand.name}</span>
      <span
        aria-hidden="true"
        className={`text-[0.5rem] font-semibold uppercase tracking-[0.34em] ${descriptorColor}`}
      >
        Studio
      </span>
      <span
        aria-hidden="true"
        className="type-serif text-[1.5rem] uppercase tracking-[0.14em] sm:text-[1.7rem]"
      >
        {siteConfig.brand.wordmark}
      </span>
      <span
        aria-hidden="true"
        className={`text-[0.5rem] font-semibold uppercase tracking-[0.34em] ${descriptorColor}`}
      >
        Nails
      </span>
    </span>
  );
}
