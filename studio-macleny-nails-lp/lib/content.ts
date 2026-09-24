/**
 * CONTEUDO EDITAVEL da landing page.
 *
 * Toda a copy visivel vive aqui. Regras herdadas do dossie estrategico:
 *  - nenhum servico, preco, politica, avaliacao ou numero pode ser inventado;
 *  - "Manutencao" e o unico servico explicitamente confirmado ate o momento;
 *  - servicos nao confirmados permanecem `enabled: false` e NAO sao renderizados.
 */

import type { CtaLocation, TrackedService } from "./analytics";
import { formatAddress, hasConfirmedAddress } from "./site-config";

/* -------------------------------------------------------------------------- */
/* HERO                                                                        */
/* -------------------------------------------------------------------------- */

export const hero = {
  eyebrow: "Studio Macleny Nails • Belo Horizonte",
  titleLines: ["Unhas elegantes,", "duráveis e naturalmente suas."],
  body:
    "Técnica, precisão e cuidado para criar unhas elegantes, proporcionais e personalizadas ao seu estilo.",
  primaryCta: "Reservar meu horário",
  secondaryCta: "Conhecer a experiência Macleny",
  secondaryHref: "#experiencia",
  signature: "Excelência técnica · Experiência individual",
  image: {
    src: "/images/hero.webp",
    alt: "Mulher de blazer claro com unhas alongadas em tom nude, mão apoiada junto ao rosto, em composição editorial de tons quentes.",
  },
} as const;

/* -------------------------------------------------------------------------- */
/* SERVICOS                                                                    */
/* -------------------------------------------------------------------------- */

export type Service = {
  /** Usado tambem como chave de tracking (TrackedService). */
  id: TrackedService;
/**
   * Numeracao do card. NAO esta sendo exibida: a cliente pediu para remover
   * ate definir o criterio. O dado fica para quando ela voltar ao assunto.
   */
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
  /**
   * Capitulo 01.
   *
   * O rotulo era "Macleny Experience", herdado de quando esta faixa era a
   * abertura dos servicos. Depois ela virou "Curadoria Personalizada" e o
   * nome ficou descolado do conteudo — e, pior, identico ao da secao
   * Experiencia (capitulo 03), que e a que de fato se chama assim.
   */
  index: "01",
  eyebrow: "Curadoria Macleny",
  title: "Curadoria Personalizada",
  body:
    "Você não precisa saber qual técnica escolher. Entendemos suas unhas, sua rotina e o resultado que deseja para indicar o cuidado ideal para você.",
  kicker: "Suas mãos, a sua melhor versão.",
  image: {
    src: "/images/services-intro.webp",
    alt: "Mãos em repouso sobre bancada de mármore, com unhas amendoadas de acabamento nude e joias douradas.",
  },
  helperTitle: "Não sabe qual atendimento escolher?",
  helperBody:
    "Conte o que você busca pelo WhatsApp. A orientação começa antes da técnica.",
  helperCta: "Falar com a Macleny",
} as const;

/**
 * Capitulo 02: a virada da Curadoria para os servicos.
 *
 * A faixa Espresso fecha a ideia de curadoria e esta abertura apresenta o
 * capitulo seguinte, para a pessoa chegar nos cards ja sabendo o que vai
 * encontrar. O titulo e o mesmo que abria a secao antes de ela virar
 * "Curadoria Personalizada" — ele nao se perdeu, mudou de posto.
 */
export const servicesChapter = {
  index: "02",
  eyebrow: "Serviços Macleny",
  title: "Beleza pensada nos mínimos detalhes.",
  body:
    "Conheça os serviços do Studio Macleny Nails e descubra a técnica ideal para valorizar suas unhas, seu estilo e o resultado que você deseja.",
} as const;

export const services: Service[] = [
  {
    id: "alongamentos",
    index: "01",
    title: "Alongamentos",
    lead: "Unhas harmônicas e feitas sob medida para você.",
    description: [
      "Nada de alongamentos padronizados. Cada estrutura é criada sob medida para o formato das suas mãos, suas unhas e seu estilo, garantindo proporção, elegância, conforto e um resultado naturalmente sofisticado.",
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
    imageCaption: "",
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
    title: "Manutenção",
    lead: "Sua unha bonita hoje até o próximo atendimento.",
    description: [
      "Acompanhamos a evolução das suas unhas para preservar estrutura, resistência e acabamento impecável. Com manutenções no momento certo, o resultado se mantém elegante, natural e sofisticado por muito mais tempo.",
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
    imageCaption: "",
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
      "Sua nail art, sua assinatura. Escolha entre nossas criações ou traga sua própria referência: cada composição é adaptada ao formato das suas unhas, à ocasião e ao seu estilo pessoal, criando um resultado exclusivo, harmonioso e sofisticado.",
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
    imageCaption: "Fotos produzidas no Studio Macleny",
    image: "/images/service-nail-art.webp",
    imageAlt: "Composição de diferentes estilos de nail art, com unhas clássicas, francesinhas, cromadas e decoradas.",
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
    imageCaption: "Um momento pra você",
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
  /**
   * Numeracao do passo. NAO esta sendo exibida, pelo mesmo motivo da dos
   * cards de servico: colidia com o "03" do sobretitulo da secao.
   */
  index: string;
  title: string;
  description: string;
};

export const experienceSection = {
  /** Capitulo 03, fechando a sequencia aberta pela Curadoria. */
  index: "03",
  eyebrow: "Macleny Experience",
  title: "O que acontece quando você escolhe o Studio Macleny Nails?",
  lead: "Sua beleza ganha mais do que um horário na agenda.",
  body:
    "Um ecossistema de cuidado, praticidade e excelência para quem deseja unhas impecáveis sem abrir mão de conforto, atenção e acompanhamento personalizado.",
  image: {
    src: "/images/experience.webp",
    alt: "Profissional de luvas finalizando as unhas de uma cliente em bancada de mármore, sob luz quente.",
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
 *
 * Este mesmo array alimenta a renderizacao e o FAQPage JSON-LD, entao nao
 * existe pergunta no schema que a visitante nao veja na pagina.
 */
const faqBase: FaqItem[] = [
  {
    id: "danifica-unhas-naturais",
    question: "O alongamento pode danificar minhas unhas naturais?",
    answer:
      "Quando a técnica é escolhida corretamente e a aplicação, manutenção e remoção são feitas com cuidado, o objetivo é preservar ao máximo a integridade das suas unhas naturais. Antes de qualquer procedimento, avaliamos suas unhas para indicar a opção mais adequada para você.",
  },
  {
    id: "qual-tecnica",
    question: "Como saber qual técnica é a mais indicada para as minhas unhas?",
    answer:
      "Você não precisa chegar sabendo a diferença entre gel, fibra, F1, soft gel ou outras técnicas. Entendemos sua rotina, suas preferências e o resultado que deseja para recomendar a solução que faça mais sentido para suas unhas.",
  },
  {
    id: "resultado-esperado",
    question: "Como vocês garantem que o resultado fique do jeito que eu quero?",
    answer:
      "O atendimento começa antes da técnica. Alinhamos formato, comprimento, estilo e referências para entender exatamente o resultado que você espera. A partir disso, adaptamos a proposta às suas mãos e à sua individualidade.",
  },
  {
    id: "duracao-e-manutencao",
    question: "Quanto tempo o alongamento dura e quando devo fazer manutenção?",
    answer:
      "A durabilidade varia conforme a técnica, o crescimento das suas unhas e a sua rotina. Ao final do atendimento, você recebe uma orientação personalizada sobre o período ideal para sua próxima manutenção.",
  },
  {
    id: "unha-quebrada",
    question: "E se uma unha quebrar ou apresentar algum problema antes da manutenção?",
    answer:
      "Entre em contato conosco assim que perceber qualquer alteração. Avaliamos o que aconteceu e orientamos a melhor solução para preservar o resultado e evitar que um pequeno problema comprometa as demais unhas.",
  },
  {
    id: "higiene-e-seguranca",
    question: "Como funciona a higiene e a segurança dos materiais utilizados?",
    answer:
      "Segurança não é um detalhe invisível. O atendimento segue protocolos de higiene, organização dos instrumentos e uso adequado dos materiais em cada etapa, para que você tenha segurança durante todo o procedimento.",
  },
  {
    id: "duracao-do-atendimento",
    question: "Quanto tempo dura o atendimento?",
    answer:
      "O tempo varia de acordo com o serviço e o nível de personalização escolhido. No momento do agendamento, você recebe uma estimativa para conseguir organizar sua rotina com tranquilidade, sem transformar seu atendimento em algo apressado.",
  },
  {
    id: "valor-do-atendimento",
    question:
      "Por que o atendimento da Macleny tem um valor diferente de outros serviços de nail designer?",
    answer:
      "Porque você não está contratando apenas uma aplicação. O atendimento reúne escuta, recomendação, técnica, personalização, tempo reservado e uma experiência pensada nos detalhes para entregar um resultado coerente com você.",
  },
  {
    id: "saber-o-que-quero",
    question: "Preciso saber exatamente o que quero antes de agendar?",
    answer:
      "Não. Você pode trazer uma referência, escolher entre inspirações ou simplesmente nos contar o que gosta. A partir disso, ajudamos você a encontrar formato, comprimento, cor e design que combinem com seu estilo.",
  },
  {
    id: "atendimento-individualizado",
    question: "O atendimento é individualizado?",
    answer:
      "Essa é justamente uma das bases da experiência Macleny. A proposta é fugir do atendimento em série e criar um momento em que você tenha tempo, atenção e orientação voltados para o seu resultado.",
  },
];

/**
 * A pergunta de localizacao so entra com o endereco confirmado, e le o dado de
 * `siteConfig` em vez de repeti-lo aqui — assim o endereco vive em um lugar so.
 */
export const faqItems: FaqItem[] = hasConfirmedAddress()
  ? [
      ...faqBase,
      {
        id: "endereco",
        question: "Onde fica o Studio Macleny Nails?",
        answer: `O atendimento acontece em ${formatAddress()}. Os detalhes de acesso são combinados na confirmação do agendamento.`,
      },
    ]
  : faqBase;

/* -------------------------------------------------------------------------- */
/* CTA FINAL                                                                   */
/* -------------------------------------------------------------------------- */

export const finalCta = {
  eyebrow: "Studio Macleny Nails",
  title: "Seu cuidado pode começar com uma conversa.",
  body: "Conte o que busca. A Macleny cuida do próximo passo.",
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
/**
 * Mensagem de um chip de tecnica/item.
 *
 * Cada item dentro de um card de servico vira um CTA proprio, entao a cliente
 * chega ao WhatsApp ja dizendo o que procura — e do lado de ca da conversa
 * sabe-se exatamente qual tecnica gerou o contato.
 */
export function serviceItemMessage(item: string): string {
  return `Olá! Vim pelo site da Studio Macleny Nails e gostaria de saber mais sobre os serviços de ${item}. 💅✨`;
}

export const whatsappMessages: Record<CtaLocation, string> = {
  header:
    "Olá! Vim pelo site da Studio Macleny Nails e gostaria de agendar um atendimento.",
  hero: "Olá! Conheci a Studio Macleny Nails pelo site e gostaria de saber como agendar meu atendimento.",
  services:
    "Olá! Vim pelo site da Studio Macleny Nails e gostaria de agendar um atendimento.",
  /**
   * Fallback da origem `service_item`. Na pratica cada chip passa a propria
   * mensagem por `serviceItemMessage`; este texto so existiria se algum chip
   * fosse renderizado sem mensagem.
   */
  service_item:
    "Olá! Vim pelo site da Studio Macleny Nails e gostaria de saber mais sobre os serviços oferecidos. 💅✨",
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
