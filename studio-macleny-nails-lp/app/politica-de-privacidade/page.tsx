import Link from "next/link";

import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";
import {
  hasEmail,
  hasWhatsApp,
  siteConfig,
} from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Política de Privacidade | Studio Macleny Nails",
  description:
    "Como o site do Studio Macleny Nails trata dados de navegação, contato por WhatsApp e ferramentas de medição.",
  path: "/politica-de-privacidade",
});

/**
 * Este texto descreve o que o site REALMENTE faz hoje.
 * Nao e aconselhamento juridico: deve passar por validacao juridica/empresarial
 * antes do lancamento definitivo (ver README, secao "Pendencias").
 */
export default function PrivacyPolicyPage() {
  const hasGtm = siteConfig.analytics.gtmId.length > 0;
  const hasAds = siteConfig.analytics.googleAdsId.length > 0;
  const hasMeasurement = hasGtm || hasAds;

  return (
    <article className="section-space">
      <div className="container-macleny max-w-3xl">
        <p className="eyebrow text-heritage">Transparência</p>
        <h1 className="type-serif type-h2 mt-6">Política de Privacidade</h1>
        <p className="type-body-lg mt-6 text-espresso-soft">
          Esta página explica quais dados este site coleta, o que acontece quando
          você clica nos botões de contato e quais ferramentas de medição estão
          ativas nesta versão.
        </p>

        <div className="mt-12 space-y-10">
          <section>
            <h2 className="type-serif type-h3">1. Quem é o responsável</h2>
            <p className="mt-3 text-espresso-soft">
              Este site é operado pelo {siteConfig.brand.name}, studio
              especializado em unhas em {siteConfig.brand.city}/
              {siteConfig.brand.state}
              {siteConfig.business.cnpj ? `, inscrito no CNPJ ${siteConfig.business.cnpj}` : ""}.
            </p>
            {hasEmail ? (
              <p className="mt-3 text-espresso-soft">
                Contato para assuntos de privacidade:{" "}
                <a href={`mailto:${siteConfig.contact.email}`} className="link-underline">
                  {siteConfig.contact.email}
                </a>
                .
              </p>
            ) : (
              <p className="mt-3 text-espresso-soft">
                O canal oficial para assuntos de privacidade é o mesmo canal de
                atendimento divulgado nesta página.
              </p>
            )}
          </section>

          <section>
            <h2 className="type-serif type-h3">2. Dados coletados pelo site</h2>
            <p className="mt-3 text-espresso-soft">
              Este site não possui formulários, cadastro, login nem área
              restrita. Ele não solicita nome, e-mail, telefone ou qualquer outro
              dado pessoal para ser navegado.
            </p>
            <p className="mt-3 text-espresso-soft">
              Como em qualquer site publicado na internet, a infraestrutura de
              hospedagem registra dados técnicos de acesso (como endereço IP,
              data e hora da requisição e tipo de navegador) para entregar as
              páginas e manter a segurança do serviço.
            </p>
          </section>

          <section>
            <h2 className="type-serif type-h3">3. Contato por WhatsApp</h2>
            <p className="mt-3 text-espresso-soft">
              Os botões de agendamento levam a um serviço externo
              {hasWhatsApp ? " (WhatsApp)" : " (WhatsApp ou Instagram)"}, sempre
              após um clique seu. Não existe redirecionamento automático.
            </p>
            <p className="mt-3 text-espresso-soft">
              Ao abrir a conversa, o site apenas pré-preenche um texto de
              apresentação. Nenhum dado seu é enviado pelo site junto com esse
              texto. A partir desse ponto, a conversa passa a ser regida pelas
              políticas do aplicativo utilizado e pelos dados que você decidir
              informar durante o atendimento.
            </p>
          </section>

          <section>
            <h2 className="type-serif type-h3">4. Medição e cookies</h2>
            {hasMeasurement ? (
              <>
                <p className="mt-3 text-espresso-soft">
                  Esta versão do site utiliza{" "}
                  {hasGtm ? "Google Tag Manager" : "Google Tag (Google Ads)"} para
                  medir o desempenho das páginas e identificar quantas pessoas
                  iniciam um contato a partir do site. Essas ferramentas podem
                  gravar cookies no seu navegador.
                </p>
                <p className="mt-3 text-espresso-soft">
                  O evento registrado no clique de contato contém apenas a
                  posição do botão na página, o serviço relacionado e o tipo de
                  destino. Nenhum dado pessoal é enviado nesse evento.
                </p>
              </>
            ) : (
              <p className="mt-3 text-espresso-soft">
                Nesta versão, nenhuma ferramenta de medição ou publicidade está
                ativa e o site não grava cookies próprios de rastreamento. Caso
                isso mude, esta seção será atualizada antes da ativação.
              </p>
            )}
          </section>

          <section>
            <h2 className="type-serif type-h3">5. Compartilhamento</h2>
            <p className="mt-3 text-espresso-soft">
              O site não vende nem comercializa dados. O compartilhamento se
              limita aos provedores necessários para o funcionamento da página
              (hospedagem e, quando ativas, as ferramentas de medição descritas
              acima).
            </p>
          </section>

          <section>
            <h2 className="type-serif type-h3">6. Seus direitos</h2>
            <p className="mt-3 text-espresso-soft">
              Você pode solicitar informações sobre o tratamento dos seus dados,
              bem como correção ou exclusão, pelos canais de contato divulgados
              nesta página. Você também pode bloquear ou apagar cookies
              diretamente nas configurações do seu navegador.
            </p>
          </section>

          <section>
            <h2 className="type-serif type-h3">7. Atualizações</h2>
            <p className="mt-3 text-espresso-soft">
              Este documento pode ser atualizado sempre que houver mudança nas
              ferramentas ou nos serviços descritos acima.
            </p>
          </section>
        </div>

        <Link href="/" className="btn btn-secondary mt-12">
          Voltar ao início
        </Link>
      </div>
    </article>
  );
}
