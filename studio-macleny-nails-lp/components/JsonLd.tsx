type JsonLdProps = {
  id: string;
  data: Record<string, unknown>;
};

/**
 * Emite JSON-LD. Os dados sao montados em lib/seo.ts a partir da configuracao
 * real do projeto — nenhuma propriedade e preenchida para "completar schema".
 */
export default function JsonLd({ id, data }: JsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      // Conteudo gerado internamente, sem entrada de usuario.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
