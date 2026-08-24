/**
 * Textos das seções.
 *
 * Todo conteúdo factual vem literalmente do DESIGN-SPEC.md e é tratado como
 * oficial (§21). Onde o documento autoriza refinar a copy, os fatos e o
 * significado foram preservados integralmente.
 */

/** DESIGN-SPEC §08 */
export const HERO = {
  label: 'Médica dermatologista',
  texto:
    'Tratamentos dermatológicos e estéticos conduzidos com técnica, segurança e olhar atento para a saúde da pele.',
  cta: 'Agendar consulta',
  alt: 'Dra. Shirley Nogueira sentada à mesa de seu consultório, sorrindo para a câmera',
} as const;

/** DESIGN-SPEC §09 — texto oficial, não alterar. */
export const SOBRE = {
  titulo: 'Sobre a Dra. Shirley',
  paragrafos: [
    'Com mais de 23 anos de experiência na medicina, a Dra. Shirley Nogueira é referência em Dermatologia Estética e Medicina Regenerativa. Sua atuação é voltada ao rejuvenescimento, à qualidade da pele e à longevidade saudável, aliando ciência, tecnologia e atendimento personalizado para proporcionar resultados naturais, seguros e duradouros.',
    'Além da prática clínica, é speaker e palestrante de tecnologias médicas internacionais, autora e coautora de artigos científicos, mentora de médicos e professora em cursos de aperfeiçoamento. Também é fundadora do Instituto Shirley Nogueira e da plataforma educacional Dermaflix, contribuindo para a formação de profissionais e para a inovação na dermatologia.',
    'Sua filosofia de trabalho é promover uma beleza natural por meio da regeneração celular e das mais modernas tecnologias, valorizando a saúde da pele e a individualidade de cada paciente em todas as etapas do tratamento.',
  ],
  cta: 'Agendar consulta',
  alt: 'Dra. Shirley Nogueira de pé, em jaleco branco, em ambiente clínico',
} as const;

/** DESIGN-SPEC §09 — métricas oficiais. */
export const METRICAS = [
  { valor: '20+', unidade: 'anos', legenda: 'de experiência' },
  { valor: '36k+', unidade: 'pacientes', legenda: 'atendidos' },
  { valor: '30+', unidade: 'palestras', legenda: 'ministradas' },
] as const;

/** DESIGN-SPEC §10 */
export const PRECISAO = {
  titulo: 'Precisão',
  subtitulo: 'Em cada tecnologia',
  texto:
    'Equipamentos de última geração selecionados para tratar cada indicação com precisão. Cada tecnologia possui um propósito específico para oferecer tratamentos mais seguros, eficazes e personalizados.',
  alt: 'Dra. Shirley Nogueira com os braços abertos, entre os equipamentos de seu consultório',
} as const;

/** DESIGN-SPEC §11 */
export const TECNOLOGIAS_SECAO = {
  tituloLinha1: 'Conheça nossas',
  tituloLinha2: 'Tecnologias',
  texto:
    'Com excelência e qualidade, oferecemos atendimentos com tecnologia de ponta para atendimentos diversos, cada um com sua finalidade.',
  cta: 'Entrar em contato',
} as const;

/**
 * DESIGN-SPEC §15 — a seção tem alta liberdade criativa e não deve parecer um
 * currículo. A copy abaixo reorganiza fatos já declarados na seção Sobre em
 * forma de manifesto. Nenhuma formação, instituição ou título novo foi
 * acrescentado.
 */
export const EXCELENCIA = {
  sobretitulo: 'Conhecimento que gera',
  titulo: 'Excelência',
  texto:
    'Tecnologia não substitui critério. O que define o resultado é saber qual recurso usar, quando usar e por quê — e isso se constrói com estudo contínuo.',
  pilares: [
    {
      titulo: 'Formação contínua',
      texto:
        'Professora em cursos de aperfeiçoamento e mentora de médicos, com atualização permanente diante da evolução das tecnologias.',
    },
    {
      titulo: 'Produção científica',
      texto:
        'Autora e coautora de artigos científicos, mantendo a prática clínica ancorada em evidência.',
    },
    {
      titulo: 'Autoridade reconhecida',
      texto:
        'Speaker e palestrante de tecnologias médicas internacionais, com mais de 30 palestras ministradas.',
    },
    {
      titulo: 'Formação de profissionais',
      texto:
        'Fundadora do Instituto Shirley Nogueira e da plataforma educacional Dermaflix.',
    },
  ],
  alt: 'Dra. Shirley Nogueira diante da parede de certificações e títulos de seu consultório',
} as const;

/** DESIGN-SPEC §16 */
export const CONTATO = {
  titulo: 'Entre em contato',
  texto:
    'O primeiro passo de qualquer tratamento é a avaliação. Agende sua consulta e conheça o Instituto Shirley Nogueira.',
  encerramento:
    'Cada pele tem uma história. A sua merece ser cuidada com técnica, tempo e atenção.',
  alt: 'Dra. Shirley Nogueira em seu consultório no Instituto Shirley Nogueira',
} as const;

export const NAVEGACAO = [
  { rotulo: 'Início', href: '#inicio' },
  { rotulo: 'Sobre', href: '#sobre' },
  { rotulo: 'Tecnologias', href: '#tecnologias' },
  { rotulo: 'Contato', href: '#contato' },
] as const;
