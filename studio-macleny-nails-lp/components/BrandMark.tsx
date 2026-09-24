import Image from "next/image";

import { siteConfig } from "@/lib/site-config";

type BrandMarkProps = {
  /** "light" = sobre Ivory; "dark" = sobre Espresso. */
  tone?: "light" | "dark";
  className?: string;
};

/**
 * Assinatura da marca: simbolo oficial + nomenclatura.
 *
 * O simbolo (`public/brand/logo-symbol.png`) e o arquivo oficial do
 * rebranding, extraido da arte original e mantido pixel a pixel — nada aqui
 * redesenha a marca.
 *
 * A nomenclatura ao lado ainda e um fallback tipografico de interface,
 * com MACLENY em maior protagonismo e "Studio"/"Nails" como descritores,
 * conforme a hierarquia do dossie. Quando o lockup horizontal oficial chegar,
 * marque `assets.officialBrandFiles: true` e ele substitui o conjunto.
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
    <span className={["inline-flex items-center gap-3", className].filter(Boolean).join(" ")}>
      <span className="visually-hidden">{siteConfig.brand.name}</span>

      {siteConfig.assets.officialSymbol ? (
        <Image
          src={siteConfig.assets.logoSymbol}
          alt=""
          aria-hidden="true"
          width={372}
          height={512}
          priority
          sizes="48px"
          className="h-11 w-auto shrink-0 sm:h-12"
        />
      ) : null}

      <span aria-hidden="true" className="inline-flex flex-col leading-none">
        <span
          className={`text-[0.5rem] font-semibold uppercase tracking-[0.34em] ${descriptorColor}`}
        >
          Studio
        </span>
        <span className="type-serif text-[1.5rem] uppercase tracking-[0.14em] sm:text-[1.7rem]">
          {siteConfig.brand.wordmark}
        </span>
        <span
          className={`text-[0.5rem] font-semibold uppercase tracking-[0.34em] ${descriptorColor}`}
        >
          Nails
        </span>
      </span>
    </span>
  );
}
