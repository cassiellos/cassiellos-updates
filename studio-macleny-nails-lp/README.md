# Studio Macleny Nails — Landing Page

Landing page comercial one-page do **Studio Macleny Nails**, nail studio em Belo
Horizonte/MG. Conversão principal: iniciar conversa no WhatsApp.

> **Estado atual: pronta tecnicamente, pendente de dados e de fotografia.**
> Nenhum dado comercial foi inventado. Domínio, WhatsApp, telefone, e-mail, CNPJ,
> endereço, horários, preços e a lista completa de serviços continuam **em
> branco** até confirmação da cliente. Enquanto estiverem vazios, a interface
> oculta o bloco correspondente — nenhum `{{placeholder}}` chega ao HTML.

---

## 1. Visão do projeto

| Item | Valor |
| --- | --- |
| Arquitetura | One-page + rota auxiliar `/politica-de-privacidade` |
| Conversão | Clique em WhatsApp (`whatsapp_click`) |
| Público | Mulheres que valorizam qualidade, cuidado e atendimento individual |
| Território | Excelência individualizada |
| Direção visual | *Quiet Brand. Expressive Work.* (princípio interno) |

Ordem das seções: Header · Hero · Pilares · Serviços · Macleny Experience ·
Galeria · Founder · FAQ · CTA final · Footer.

Documentação de marca: [`docs/design-system.md`](docs/design-system.md).
Plano de mídia: [`docs/google-ads-search-plan.md`](docs/google-ads-search-plan.md).

## 2. Stack

| Camada | Escolha | Versão instalada |
| --- | --- | --- |
| Framework | Next.js (App Router) | 16.3.5 |
| UI | React | 19.3.0 |
| Linguagem | TypeScript (strict) | 5.9.3 |
| Estilo | Tailwind CSS | 4.3.3 |
| Lint | ESLint + eslint-config-next | 9.39.5 / 16.3.5 |
| Animação | — (IntersectionObserver + CSS) | — |

**Sem biblioteca de animação, sem UI kit, sem biblioteca de ícones, sem backend,
sem banco, sem autenticação.** O reveal das seções usa `IntersectionObserver` +
transição CSS; o único ícone (WhatsApp) é um `<path>` inline.

> ESLint está fixado em **9.x** porque `eslint-config-next@16.3.5` ainda carrega
> um `eslint-plugin-react` incompatível com ESLint 10. Revisar quando o Next
> publicar suporte.

## 3. Versão do Node

**Node 24.x** (`.nvmrc` e `engines` em `package.json`).

```bash
nvm use        # lê o .nvmrc
node -v        # v24.x
```

## 4. Instalar

```bash
cd studio-macleny-nails-lp
npm ci
```

## 5. Executar

```bash
npm run dev     # http://localhost:3000
npm run build   # build de produção
npm run start   # servir o build
```

## 6–8. Verificações

```bash
npm run lint                # eslint . --max-warnings=0
npm run typecheck           # tsc --noEmit
npm run check:config        # dados, assets e placeholders (falha só em ERRO)
npm run check:config:strict # modo release: AVISO também bloqueia
npm run verify              # lint + typecheck + check:config + build
```

`npm run check:config:strict` é o portão antes de publicar em domínio próprio e
antes de apontar uma campanha do Google Ads para a página. Hoje ele **falha de
propósito**: existem 19 avisos de dados e assets pendentes.

## 9. Estrutura de diretórios

```
app/
  layout.tsx                  metadata, fontes, header/footer, JSON-LD
  page.tsx                    composição das seções (apenas composição)
  globals.css                 tokens, base e componentes (@layer)
  icon.svg                    favicon provisório
  robots.ts                   crawling (noindex em preview)
  sitemap.ts                  sitemap.xml
  not-found.tsx               404
  politica-de-privacidade/    rota auxiliar legal
components/                   uma seção por arquivo
lib/
  site-config.ts              FONTE ÚNICA de dados comerciais
  content.ts                  copy, serviços, FAQ, navegação
  analytics.ts                evento whatsapp_click
  whatsapp.ts                 montagem da URL de conversa
  seo.ts                      metadata + JSON-LD
public/brand/                 logos (placeholders)
public/images/                fotografia (placeholders)
docs/                         design system e plano de mídia
scripts/                      validador e gerador de placeholders
```

CI fica em `.github/workflows/studio-macleny-nails-lp-ci.yml`, na **raiz do
repositório** (o GitHub só lê workflows da raiz).

## 10–19. Onde alterar cada coisa

| Item | Arquivo | Campo |
| --- | --- | --- |
| Domínio | `.env.local` / `lib/site-config.ts` | `NEXT_PUBLIC_SITE_URL` → `domain` |
| WhatsApp | `lib/site-config.ts` | `contact.whatsappNumber` |
| Telefone | `lib/site-config.ts` | `contact.phoneDisplay` e `contact.phoneE164` |
| E-mail | `lib/site-config.ts` | `contact.email` |
| Instagram | `lib/site-config.ts` | `contact.instagramUrl` / `instagramHandle` |
| CNPJ | `lib/site-config.ts` | `business.cnpj` |
| Razão social | `lib/site-config.ts` | `business.legalName` |
| Endereço | `lib/site-config.ts` | `business.address` |
| Horários | `lib/site-config.ts` | `business.openingHours` |
| Copy | `lib/content.ts` | seção correspondente |
| Serviços | `lib/content.ts` | array `services` |
| FAQ | `lib/content.ts` | `faqBase` / `getFaqItems` |
| Logo | `public/brand/` | + `assets.officialBrandFiles: true` |
| Hero | `public/images/hero.webp` | — |
| Manutenção | `public/images/maintenance.webp` | — |
| Founder | `public/images/founder.webp` | — |
| Open Graph | `public/images/og.webp` | + `assets.officialOgImage: true` |
| Fontes | `app/layout.tsx` | `next/font` |
| Tokens de cor | `app/globals.css` | bloco `@theme` |

### Regras ao preencher

- **Serviços:** só ative `enabled: true` para serviço **confirmado** pela cliente.
  Hoje apenas **Manutenção** está ativa. Alongamento em gel, banho de gel, fibra,
  acrílico, spa, pedicure, nail art e remoção aparecem em pesquisa de mercado —
  **não** como serviços declarados da Macleny.
- **Endereço:** ao preencher, o JSON-LD muda sozinho de `Organization` para
  `NailSalon` e a FAQ de localização passa a aparecer. Nada disso é manual.
- **Logo:** substitua os três SVG e marque `officialBrandFiles: true`. Até lá o
  header usa fallback tipográfico e o JSON-LD **não** declara `logo`.
- **Imagens:** substitua os 8 arquivos `.webp`. Regenerar placeholders (se
  precisar) com `npm i --no-save sharp && node scripts/generate-placeholders.mjs`.

## 20. Configurar o GTM

1. `cp .env.example .env.local`
2. preencha `NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX`
3. reinicie o dev server

Com o GTM ativo o site **não** dispara a conversão: ele só empurra
`whatsapp_click` para o `dataLayer`. A conversão é montada dentro do container.
Isso impede contagem dupla.

## 21. Configurar a conversão do Google Ads

### Rota A — GTM (recomendada)

1. crie a ação de conversão `Contato WhatsApp | Studio Macleny Nails`
   (categoria **Lead / Contato**, contagem **uma por clique**);
2. anote **Conversion ID** e **Conversion Label**;
3. no GTM, crie um acionador de evento personalizado `whatsapp_click`;
4. crie a tag **Google Ads Conversion Tracking** com ID e Label;
5. adicione **Conversion Linker** quando aplicável;
6. publique o container.

### Rota B — Google Tag direto (sem GTM)

```env
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-000000000
NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_LABEL=SeuLabelReal
```

Sem esses valores **reais**, nada é disparado. Nenhum ID falso foi deixado no
código. O evento carrega apenas `cta_location`, `service` e `destination_type` —
nunca nome, telefone, e-mail ou mensagem pessoal.

## 22. Testar a conversão

Preview do GTM / Tag Assistant, em desktop **e** mobile, clicando em: header ·
menu mobile · hero · serviço · bloco "não sabe qual atendimento escolher" · CTA
final · botão flutuante. **Um clique = um evento.** Depois, confira o diagnóstico
de conversões do Google Ads. "O código existe" não é teste.

## 23. Criar o repositório no GitHub

Este projeto vive hoje em `studio-macleny-nails-lp/` dentro do repositório
`cassiellos/cassiellos-updates`. O ideal é movê-lo para um repositório próprio
(`studio-macleny-nails-lp`, privado):

```bash
git init
git branch -M main
git add .
git commit -m "feat: launch Studio Macleny Nails landing page"
git remote add origin <URL-DO-REPO>
git push -u origin main
```

Ao mover, remova `defaults.run.working-directory`, os filtros `paths` e os
prefixos de caminho do workflow de CI.

## 24. Publicar na Vercel

1. importar o repositório do GitHub;
2. framework: **Next.js** (detectado automaticamente — **não** é necessário
   `vercel.json`);
3. **Root Directory**: a pasta que contém `package.json`
   (hoje `studio-macleny-nails-lp`);
4. **Production Branch**: `main`;
5. **Node.js Version**: 24.x;
6. cadastrar as variáveis de ambiente necessárias (nunca no código);
7. deploy e acompanhar o build inteiro;
8. abrir a URL `*.vercel.app` gerada e **testar a página real** — "Ready" no
   dashboard não é teste.

## 25. Conectar o domínio

1. confirmar o domínio canônico **com a cliente**;
2. Vercel → Project → Settings → Domains → adicionar o domínio;
3. usar **exatamente** os registros DNS que a Vercel exibir naquele momento —
   não reutilizar IP/CNAME de tutorial;
4. aguardar propagação e confirmar o certificado;
5. definir **um** domínio primário (www **ou** apex) e redirecionar o outro;
6. atualizar `NEXT_PUBLIC_SITE_URL` e refazer o deploy — isso ajusta de uma vez
   `metadataBase`, canonical, sitemap, robots, Open Graph e JSON-LD;
7. atualizar a URL final dos anúncios.

## 26. Validar HTTPS

```bash
curl -I  https://SEU-DOMINIO
curl -L -I http://SEU-DOMINIO        # deve redirecionar para HTTPS
curl -I  https://SEU-DOMINIO/robots.txt
curl -I  https://SEU-DOMINIO/sitemap.xml
```

Certificado sem aviso, redirect HTTP → HTTPS, www/apex coerentes, assets sem
mixed content. Não lance Google Ads antes disso.

## 27. Validar para Google Ads

Checklist completo em
[`docs/google-ads-search-plan.md`](docs/google-ads-search-plan.md), seção 9.
Em resumo: HTTP 200, sem login, `robots.txt` liberado, **Googlebot e AdsBot não
bloqueados**, sitemap acessível, sem 403/404 em assets, sem cadeia estranha de
redirects, sem redirecionamento automático para o WhatsApp, política de
privacidade disponível e nenhum placeholder visível.

`app/robots.ts` marca **preview deployments** da Vercel como `noindex` e libera
produção para todos os crawlers. Nunca use `Disallow: /` em produção.

### Validar dados estruturados

Depois de publicar, testar em **Rich Results Test** e **Schema Markup
Validator**, conferir o HTML renderizado e acompanhar o Search Console.
Schema não está "aprovado" só porque o TypeScript compilou.

## 28. Pendências atuais

### Dados (bloqueiam o lançamento)

| # | Pendência | Impacto |
| --- | --- | --- |
| 1 | **Domínio canônico oficial** | canonical, sitemap, OG, JSON-LD, URL de anúncio |
| 2 | **WhatsApp (E.164)** | conversão principal; hoje os CTAs caem para o Instagram |
| 3 | Telefone | footer, extensão de chamada, JSON-LD |
| 4 | E-mail | footer e contato de privacidade |
| 5 | Endereço completo | JSON-LD `NailSalon`, FAQ de local, extensão de local |
| 6 | CNPJ e razão social | footer, política de privacidade |
| 7 | Horários de atendimento | footer |
| 8 | **Lista definitiva de serviços** | seção de serviços e palavras-chave |

> O briefing menciona `maclenynails.com.br`, mas o próprio material determina
> **validação manual do domínio canônico antes da publicação**. Por isso ele
> **não** foi fixado no código.

### Assets

| # | Pendência |
| --- | --- |
| 9 | Arquivos oficiais de logo e símbolo (3 SVG) |
| 10 | Fotografia oficial (8 arquivos `.webp`) |
| 11 | Imagem Open Graph definitiva |
| 12 | Favicon a partir do símbolo oficial |
| 13 | Tipografia oficial, se diferente da dupla de teste |

### Jurídico e processo

| # | Pendência |
| --- | --- |
| 14 | **O texto de privacidade deve receber validação jurídica/empresarial antes do lançamento definitivo.** |
| 15 | Configuração de consentimento/cookies conforme orientação jurídica do negócio, se o tracking for ativado. A arquitetura está preparada, mas **nenhum banner falso foi implementado**. |
| 16 | Conferência do `docs/design-system.md` contra o dossiê estratégico original |

### O que este projeto deliberadamente **não** fez

Não inventou serviços, preços, endereço, telefone, CNPJ, avaliações, número de
clientes, anos de experiência, certificações ou políticas de atendimento. Não
redesenhou a marca. Não tratou a dupla tipográfica de teste como definitiva. Não
usou imagem de banco como "resultado Macleny". Não criou redirecionamento
automático para o WhatsApp. Não deixou ID de analytics falso no código.
