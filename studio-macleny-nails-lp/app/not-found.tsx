import Link from "next/link";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página não encontrada | Studio Macleny Nails",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="section-space">
      <div className="container-macleny max-w-2xl">
        <p className="eyebrow text-heritage">Erro 404</p>
        <h1 className="type-serif type-h2 mt-6">Esta página não existe.</h1>
        <p className="type-body-lg mt-6 text-espresso-soft">
          O endereço acessado não corresponde a nenhuma página do site. Volte ao
          início para conhecer os atendimentos.
        </p>
        <Link href="/" className="btn btn-primary mt-9">
          Voltar ao início
        </Link>
      </div>
    </section>
  );
}
