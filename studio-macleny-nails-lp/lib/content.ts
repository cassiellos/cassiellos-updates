/**
 * CONTEUDO EDITAVEL da landing page.
 *
 * Toda a copy visivel vive aqui. Regras herdadas do dossie estrategico:
 *  - nenhum servico, preco, politica, avaliacao ou numero pode ser inventado;
 *  - "Manutencao" e o unico servico explicitamente confirmado ate o momento;
 *  - servicos nao confirmados permanecem `enabled: false` e NAO sao renderizados.
 */

import type { CtaLocation, TrackedService } from "./analytics";
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
  /** Usado tambem como chave de tracking (TrackedService). */
  id: TrackedService;
  index: string;
  title: string;
  lead: string;
  description: string[];
  /** Tecnicas e itens que o servico contempla. */
  includes: string[];
  highlight: string;
  /** Legenda sobreposta a fotografia. */
  imageCaption: string;
  image: string;
  imageAlt: string;
  cta: string;
  whatsappMessage: string;
  /** Somente servicos CONFIRMADOS pela cliente podem receber `true`. */
  enabled: boolean;
};

export const servicesSection = {
  eyebrow: "Serviços Macleny",
  title: "Beleza pensada nos mínimos detalhes.",
  body:
    "Mais do que escolher uma técnica, aqui você escolhe como quer se sentir ao olhar para as suas mãos. Cada atendimento é personalizado para respeitar seu estilo, sua rotina e o resultado que você deseja.",
  kicker: "Suas mãos, a sua melhor versão.",
  aside: "Detalhes que realçam histórias",
  image: {
    src: "/images/services-intro.webp",
    alt: "Mãos em repouso sobre bancada de mármore, com unhas amendoadas de acabamento nude e joias douradas.",
  },
  helperTitle: "Não sabe qual atendimento escolher?",
  helperBody:
    "Conte o que você busca pelo WhatsApp. A orientação começa antes da técnica.",
  helperCta: "Falar com a Macleny",
} as const;

export const services: Service[] = [
  {
    id: "alongamentos",
    index: "01",
    title: "Alongamentos",
    lead: "Unhas harmônicas e feitas sob medida para você.",
    description: [
      "Adeus ao alongamento padronizado. Cada detalhe é pensado de acordo com o formato das suas mãos, seu estilo pessoal e o resultado que você deseja alcançar.",
      "Analisamos proporção, comprimento, curvatura, acabamento e naturalidade para criar unhas que valorizam a sua beleza sem exageros. Trabalhamos com diferentes técnicas para oferecer a solução ideal para cada unha, desde construções mais delicadas até estruturas que precisam de maior correção.",
      "O resultado é um alongamento sofisticado, confortável e com aparência natural.",
    ],
    includes: [
      "Gel",
      "Fibra",
      "Molde F1",
      "Soft Gel",
      "Polygel",
      "Banho de Gel",
      "Blindagem",
      "Nivelamento",
      "Correções de formato",
    ],
    highlight: "Estrutura, equilíbrio e acabamento impecável em cada detalhe.",
    imageCaption: "Beleza com propósito",
    image: "/images/service-alongamentos.webp",
    imageAlt: "Mão com unhas alongadas em formato amendoado e acabamento nude acetinado, apoiada em bancada de mármore.",
    cta: "Quero encontrar meu alongamento ideal",
    whatsappMessage:
      "Olá! Vim pelo site da Studio Macleny Nails e gostaria de encontrar o alongamento ideal para as minhas unhas.",
    enabled: true,
  },
  {
    id: "manutencao",
    index: "02",
    title: "Manutenção & Cuidado",
    lead: "Sua unha bonita hoje — e bem cuidada até o próximo atendimento.",
    description: [
      "Um resultado sofisticado não termina quando você sai do studio. Por isso, acompanhamos a evolução das suas unhas entre os atendimentos, observando estrutura, crescimento e necessidades específicas para preservar a aparência e o cuidado ao longo do tempo.",
      "Manutenções realizadas no momento certo ajudam a manter o acabamento, corrigir pequenos imprevistos e evitar que você passe semanas com unhas que já não representam o resultado que deseja.",
    ],
    includes: [
      "Manutenção de alongamentos",
      "Reposição",
      "Reparos",
      "Remoção",
      "Recuperação das unhas naturais",
      "Hidratação",
      "Acompanhamento entre manutenções",
    ],
    highlight: "Cuidado contínuo para prolongar a beleza do seu resultado.",
    imageCaption: "Cuidado hoje. Beleza sempre.",
    image: "/images/service-manutencao.webp",
    imageAlt: "Atendimento em andamento: mãos com luvas trabalham a cutícula de uma cliente apoiada em toalha.",
    cta: "Quero cuidar das minhas unhas",
    whatsappMessage:
      "Olá! Vim pelo site da Studio Macleny Nails e gostaria de agendar a manutenção das minhas unhas.",
    enabled: true,
  },
  {
    id: "nail-art",
    index: "03",
    title: "Nail Art",
    lead: "Sua personalidade, traduzida em cada detalhe.",
    description: [
      "Minimalista, clássica, sofisticada ou marcante. Você pode escolher entre diferentes estilos e acabamentos ou trazer a sua própria referência. A partir dela, criamos uma composição personalizada para harmonizar com seu formato de unha, ocasião e estilo pessoal.",
      "Porque uma nail art bonita não precisa apenas chamar atenção. Ela precisa parecer sua.",
    ],
    includes: [
      "Esmaltação em gel",
      "Francesinha",
      "Baby Boomer",
      "Cat Eye",
      "Cromado",
      "Encapsuladas",
      "Pedrarias",
      "Desenhos",
      "Personalizações",
    ],
    highlight: "Do clássico ao exclusivo, um design criado para combinar com você.",
    imageCaption: "Arte que revela quem você é",
    image: "/images/service-nail-art.webp",
    imageAlt: "Unhas amendoadas com nail art em tons de marrom e nude, com flores em relevo e traços dourados.",
    cta: "Quero escolher meu design",
    whatsappMessage:
      "Olá! Vim pelo site da Studio Macleny Nails e gostaria de escolher um design de nail art.",
    enabled: true,
  },
  {
    id: "experiencia",
    index: "04",
    title: "Experiência Macleny",
    lead: "Aqui, fazer as unhas também é ter um momento seu.",
    description: [
      "Você desfruta de um espaço reservado, tranquilo e pensado para que possa desacelerar, relaxar e aproveitar seu momento com total privacidade e conforto.",
      "Cada atendimento pode ser personalizado de acordo com as suas preferências, com bebidas, comidinhas, pequenos mimos e cuidados especiais. Aproveite sua experiência de bem-estar, exclusividade e pausa, um momento verdadeiramente seu.",
    ],
    includes: [
      "Spa das mãos e pés",
      "Hidratação",
      "Atendimento individual",
      "Escolha personalizada de designs",
      "Mimos",
      "Bebidas",
      "Experiências para noivas e eventos",
    ],
    highlight:
      "Um momento reservado para você — do primeiro detalhe ao acabamento final.",
    imageCaption: "Mais que unhas, um momento para você",
    image: "/images/service-experiencia.webp",
    imageAlt: "Recepção do studio: bancada de mármore com taça, velas e flores, toalha bordada com a marca Macleny e a assinatura Studio Macleny Nails na parede.",
    cta: "Quero viver a Experiência Macleny",
    whatsappMessage:
      "Olá! Vim pelo site da Studio Macleny Nails e gostaria de conhecer a Experiência Macleny.",
    enabled: true,
  },
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
  ratio: "portrait" | "landscape" | "square";
  /** Colunas ocupadas no grid de 12 (desktop) e coluna inicial opcional. */
  span: 5 | 6 | 7;
  start?: 2 | 3 | 4;
  /** true enquanto o arquivo for um placeholder gerado pelo projeto. */
  isPlaceholder: boolean;
};

export const gallerySection = {
  eyebrow: "Resultados",
  title: "Precisão que aparece nos detalhes.",
  body: "Registros de atendimentos realizados no studio.",
} as const;

export const gallery: EditorialImage[] = [
  {
    id: "editorial-01",
    src: "/images/editorial-01.webp",
    alt: "Unhas em formato bailarina com acabamento nude perolado e detalhe em branco, fotografadas sobre tecido claro.",
    ratio: "portrait",
    span: 5,
    isPlaceholder: false,
  },
  {
    id: "editorial-02",
    src: "/images/editorial-02.webp",
    alt: "Unhas amendoadas em nude e vinho fosco, com estampa de oncinha em preto e vinho, apoiadas sobre um livro aberto.",
    ratio: "landscape",
    span: 7,
    isPlaceholder: false,
  },
  {
    id: "editorial-03",
    src: "/images/editorial-03.webp",
    alt: "Unhas amendoadas em verde fosco com nervuras e gotas em relevo, ao lado de um anel dourado sobre tecido branco.",
    ratio: "square",
    span: 6,
    start: 4,
    isPlaceholder: false,
  },
];

/* -------------------------------------------------------------------------- */
/* FOUNDER                                                                     */
/* -------------------------------------------------------------------------- */

export const founder = {
  eyebrow: "FUNDADORA / NAIL SPECIALIST",
  titleLines: ["A experiência de Jheniffer.", "A assinatura Macleny."],
  body: [
    "Anos de prática e especialização deram origem a um padrão próprio de execução e cuidado.",
    "Cada atendimento preserva aquilo que tornou seu trabalho reconhecível: técnica, atenção e acabamento impecável.",
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
