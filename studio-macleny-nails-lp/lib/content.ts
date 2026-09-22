/**
 * CONTEUDO EDITAVEL da landing page.
 *
 * Toda a copy visivel vive aqui. Regras herdadas do dossie estrategico:
 *  - nenhum servico, preco, politica, avaliacao ou numero pode ser inventado;
 *  - "Manutencao" e o unico servico explicitamente confirmado ate o momento;
 *  - servicos nao confirmados permanecem `enabled: false` e NAO sao renderizados.
 */

import type { CtaLocation } from "./analytics";
import { hasConfirmedAddress, hasWhatsApp } from "./site-config";

/* -------------------------------------------------------------------------- */
/* HERO                                                                        */
/* -------------------------------------------------------------------------- */

export const hero = {
  eyebrow: "Studio Macleny Nails • Belo Horizonte",
  titleLines: ["Excelência técnica.", "Experiência individual."],
  body:
    "Seu atendimento começa entendendo o que funciona para você. Técnica, escuta e personalização se encontram em uma experiência de unhas pensada nos detalhes.",
  primaryCta: "Agendar pelo WhatsApp",
  secondaryCta: "Conhecer a experiência",
  secondaryHref: "#experiencia",
  signature: "Founded by Jheniffer Macleny",
  image: {
    src: "/images/hero.webp",
    alt: "Detalhe de unhas com acabamento neutro em composição editorial de tons quentes.",
  },
} as const;

/* -------------------------------------------------------------------------- */
/* PILARES                                                                     */
/* -------------------------------------------------------------------------- */

export type Pillar = {
  id: string;
  index: string;
  title: string;
  description: string;
};

export const pillarsSection = {
  eyebrow: "O padrão Macleny",
  title: "Excelência feita para cada mulher.",
} as const;

export const pillars: Pillar[] = [
  {
    id: "excelencia",
    index: "01",
    title: "Excelência",
    description:
      "Técnica, precisão e consistência em cada detalhe do atendimento.",
  },
  {
    id: "individualidade",
    index: "02",
    title: "Individualidade",
    description: "Escuta e orientação para um resultado coerente com você.",
  },
  {
    id: "confianca",
    index: "03",
    title: "Confiança",
    description:
      "Clareza, cuidado e previsibilidade do primeiro contato ao acompanhamento.",
  },
  {
    id: "sofisticacao",
    index: "04",
    title: "Sofisticação",
    description: "Uma experiência organizada, acolhedora e sem excessos.",
  },
];

/* -------------------------------------------------------------------------- */
/* SERVICOS                                                                    */
/* -------------------------------------------------------------------------- */

export type Service = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  cta: string;
  whatsappMessage: string;
  /** Somente servicos CONFIRMADOS pela cliente podem receber `true`. */
  enabled: boolean;
};

export const servicesSection = {
  eyebrow: "Serviços",
  title: "Especialização que respeita sua individualidade.",
  helperTitle: "Não sabe qual atendimento escolher?",
  helperBody:
    "Conte o que você busca pelo WhatsApp. A orientação começa antes da técnica.",
  helperCta: "Falar com a Macleny",
} as const;

export const services: Service[] = [
  {
    id: "manutencao",
    title: "Manutenção",
    description:
      "Um atendimento pensado para dar continuidade ao seu resultado com técnica, cuidado e orientação individual.",
    image: "/images/maintenance.webp",
    imageAlt:
      "Mãos apoiadas em bancada clara durante atendimento de manutenção de unhas.",
    cta: "Quero agendar minha manutenção",
    whatsappMessage:
      "Olá! Vim pelo site da Studio Macleny Nails e gostaria de agendar uma manutenção.",
    enabled: true,
  },
  // ------------------------------------------------------------------------
  // PENDENTE DE CONFIRMACAO DA CLIENTE.
  // Os nomes abaixo aparecem em pesquisa de mercado, NAO como servicos
  // declarados da Macleny. Mantenha `enabled: false` ate a confirmacao
  // explicita, e so entao revise titulo, descricao e imagem.
  // ------------------------------------------------------------------------
];

export const enabledServices = services.filter((service) => service.enabled);

/* -------------------------------------------------------------------------- */
/* MACLENY EXPERIENCE                                                          */
/* -------------------------------------------------------------------------- */

export type ExperienceStep = {
  index: string;
  title: string;
  description: string;
};

export const experienceSection = {
  eyebrow: "Macleny Experience",
  title: "Seu atendimento começa antes da técnica.",
  body:
    "Uma jornada pensada para unir praticidade, exclusividade e excelência — do primeiro contato ao cuidado contínuo.",
  image: {
    src: "/images/experience.webp",
    alt: "Bancada de atendimento com instrumentos organizados e luz suave.",
  },
} as const;

export const experienceSteps: ExperienceStep[] = [
  {
    index: "01",
    title: "Facilidade para Escolher",
    description:
      "Explore referências de nail design ou envie sua própria inspiração para criar algo alinhado ao seu estilo.",
  },
  {
    index: "02",
    title: "Agendamento Fácil",
    description:
      "Agende seu atendimento pelo WhatsApp de forma simples e rápida.",
  },
  {
    index: "03",
    title: "Uma Experiência Só Sua",
    description:
      "Um atendimento pensado nos seus detalhes, com ambiente exclusivo, bebidas, mimos e escolhas personalizadas para tornar sua experiência ainda mais especial.",
  },
  {
    index: "04",
    title: "Técnica e Cuidado em Cada Detalhe",
    description:
      "Precisão, atenção e cuidado em cada etapa para entregar um acabamento sofisticado e alinhado ao seu estilo.",
  },
  {
    index: "05",
    title: "Seu Cuidado Continua",
    description:
      "Tenha acompanhamento e facilidade para organizar suas próximas manutenções e manter suas unhas sempre bem cuidadas.",
  },
];

/* -------------------------------------------------------------------------- */
/* GALERIA EDITORIAL                                                           */
/* -------------------------------------------------------------------------- */

export type EditorialImage = {
  id: string;
  src: string;
  alt: string;
  /** Proporcao da moldura. */
  ratio: "portrait" | "landscape" | "wide";
  /** Colunas ocupadas no grid de 12 (desktop) e coluna inicial opcional. */
  span: 5 | 6 | 7;
  start?: 2 | 3 | 4;
  /** true enquanto o arquivo for um placeholder gerado pelo projeto. */
  isPlaceholder: boolean;
};

export const gallerySection = {
  eyebrow: "Resultados",
  title: "Precisão que aparece nos detalhes.",
  body:
    "Registros do trabalho e do ambiente. As imagens finais serão substituídas pela fotografia oficial do studio.",
} as const;

export const gallery: EditorialImage[] = [
  {
    id: "editorial-01",
    src: "/images/editorial-01.webp",
    alt: "Macro de unhas com acabamento acetinado e reflexo suave.",
    ratio: "portrait",
    span: 5,
    isPlaceholder: true,
  },
  {
    id: "editorial-02",
    src: "/images/editorial-02.webp",
    alt: "Mão apoiada em superfície de pedra clara ao lado de joia discreta.",
    ratio: "landscape",
    span: 7,
    isPlaceholder: true,
  },
  {
    id: "editorial-03",
    src: "/images/editorial-03.webp",
    alt: "Detalhe de cutícula finalizada com acabamento preciso e pele natural.",
    ratio: "wide",
    span: 6,
    start: 4,
    isPlaceholder: true,
  },
];

/* -------------------------------------------------------------------------- */
/* FOUNDER                                                                     */
/* -------------------------------------------------------------------------- */

export const founder = {
  eyebrow: "Founder / Nail Specialist",
  titleLines: ["Jheniffer é a origem.", "Macleny é a evolução."],
  body: [
    "Uma trajetória construída com técnica, escuta e cuidado ganha uma marca preparada para transformar essa experiência em um padrão reconhecível.",
    "Jheniffer permanece como a origem técnica e humana da Macleny: o atendimento continua sendo conduzido pela mesma atenção que deu nome ao trabalho.",
  ],
  image: {
    src: "/images/founder.webp",
    alt: "Jheniffer Macleny, fundadora do studio, em retrato editorial de perfil sobre fundo claro.",
  },
} as const;

/* -------------------------------------------------------------------------- */
/* FAQ                                                                         */
/* -------------------------------------------------------------------------- */

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const faqSection = {
  eyebrow: "Antes de agendar",
  title: "O que você pode querer saber antes do seu atendimento.",
} as const;

/**
 * Somente perguntas com resposta CONFIRMADA entram aqui.
 * Nao criar perguntas sobre atraso, cancelamento, sinal, garantia, reparo ou
 * devolucao ate existirem politicas oficiais.
 */
const faqBase: FaqItem[] = [
  {
    id: "como-funciona",
    question: "Como funciona o atendimento na Macleny?",
    answer:
      "A experiência começa com escuta e orientação. A proposta é entender sua rotina, preferências e histórico antes de indicar o caminho mais adequado para o atendimento.",
  },
  {
    id: "qual-servico",
    question: "Como sei qual serviço escolher?",
    answer:
      "Conte pelo WhatsApp o que você busca. Quando necessário, a orientação acontece antes da confirmação do agendamento para que o atendimento faça sentido para você.",
  },
];

const faqWhatsApp: FaqItem = {
  id: "agendar-whatsapp",
  question: "Posso agendar pelo WhatsApp?",
  answer:
    "Sim. Use os botões desta página para iniciar o contato e alinhar disponibilidade e detalhes do atendimento.",
};

/**
 * PENDENTE: so entra quando o endereco oficial estiver confirmado em
 * `siteConfig.business.address`. A resposta e montada no componente para nao
 * duplicar o endereco em dois lugares.
 */
export const faqAddressQuestion = "Onde fica o Studio Macleny Nails?";

export function getFaqItems(addressLine: string): FaqItem[] {
  const items = [...faqBase];

  if (hasWhatsApp) {
    items.push(faqWhatsApp);
  }

  if (hasConfirmedAddress() && addressLine) {
    items.push({
      id: "endereco",
      question: faqAddressQuestion,
      answer: `O atendimento acontece em ${addressLine}. Os detalhes de acesso são combinados na confirmação do agendamento.`,
    });
  }

  return items;
}

/* -------------------------------------------------------------------------- */
/* CTA FINAL                                                                   */
/* -------------------------------------------------------------------------- */

export const finalCta = {
  eyebrow: "Studio Macleny Nails",
  title: "Seu cuidado pode começar com uma conversa.",
  body: "Conte o que você busca. A Macleny cuida do atendimento a partir daí.",
  cta: "Agendar pelo WhatsApp",
} as const;

/* -------------------------------------------------------------------------- */
/* NAVEGACAO                                                                   */
/* -------------------------------------------------------------------------- */

export const navigation = [
  { label: "Serviços", href: "#servicos" },
  { label: "Experiência", href: "#experiencia" },
  { label: "Sobre", href: "#sobre" },
  { label: "FAQ", href: "#faq" },
] as const;

export const headerCta = "Agendar";

/* -------------------------------------------------------------------------- */
/* MENSAGENS DE WHATSAPP                                                       */
/* -------------------------------------------------------------------------- */

/**
 * Uma mensagem por posicao de CTA.
 *
 * O objetivo e operacional: a Macleny consegue ver, pela propria mensagem,
 * de onde a pessoa veio e em que ponto da leitura ela estava — sem precisar
 * perguntar. Quem clica no hero acabou de chegar; quem clica no CTA final
 * leu a pagina inteira; quem clica no bloco de orientacao esta em duvida.
 *
 * Um servico pode sobrescrever a mensagem da posicao pelo campo
 * `whatsappMessage` em `services` (e o caso do card de Manutencao).
 *
 * O texto chega preenchido no campo de digitacao, mas continua editavel pela
 * cliente antes do envio — isso e comportamento do WhatsApp, nao do site.
 */
export const whatsappMessages: Record<CtaLocation, string> = {
  header:
    "Olá! Vim pelo site da Studio Macleny Nails e gostaria de agendar um atendimento.",
  hero: "Olá! Conheci a Studio Macleny Nails pelo site e gostaria de saber como agendar meu atendimento.",
  services:
    "Olá! Vim pelo site da Studio Macleny Nails e gostaria de agendar um atendimento.",
  services_helper:
    "Olá! Vim pelo site da Studio Macleny Nails e gostaria de uma orientação para escolher o atendimento mais adequado para mim.",
  experience:
    "Olá! Vim pelo site da Studio Macleny Nails e gostaria de entender melhor como funciona o atendimento.",
  final_cta:
    "Olá! Vim pelo site da Studio Macleny Nails e gostaria de conversar sobre o meu atendimento.",
  floating:
    "Olá! Estou no site da Studio Macleny Nails e gostaria de falar sobre um atendimento.",
  footer:
    "Olá! Vim pelo site da Studio Macleny Nails e gostaria de mais informações sobre os atendimentos.",
};
