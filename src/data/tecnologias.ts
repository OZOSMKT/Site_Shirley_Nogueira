/**
 * As 7 tecnologias do carrossel.
 *
 * Conteúdo separado da apresentação (DESIGN-SPEC.md §23): alterar um texto aqui
 * não exige tocar em nenhum componente.
 *
 * ORIGEM DOS TEXTOS
 * O cliente não forneceu descrições para os equipamentos. As descrições abaixo
 * foram escritas a partir da documentação pública dos fabricantes e descrevem o
 * que cada tecnologia É — princípio de funcionamento e área de atuação. Não há
 * promessa de resultado, número de sessões ou indicação clínica individual, que
 * dependem de avaliação médica. Recomenda-se validação pela Dra. Shirley antes
 * da publicação.
 *
 * ENQUADRAMENTO DOS EQUIPAMENTOS (ASSETS.md §4)
 * Os PNGs têm proporções muito diferentes e distribuem a massa visual de formas
 * distintas — Fotona SP e RedTouch, por exemplo, têm quase metade da altura
 * ocupada por um braço fino. Escala idêntica faria esses aparelhos parecerem
 * minúsculos ao lado do Centurion. Por isso cada um recebe `escala` e
 * `deslocamentoY` próprios: mesmo peso visual, não o mesmo tamanho físico.
 * Nenhuma proporção é distorcida — `escala` é uniforme nos dois eixos.
 */

export type Tecnologia = {
  /** Usado em âncoras, chaves e nome do arquivo de imagem. */
  slug: string;
  /** Nome oficial, conforme fornecido pelo cliente. */
  nome: string;
  /** Linha curta do estado inicial do card. */
  resumo: string;
  /** Texto revelado na expansão do card. */
  descricao: string;
  /** Alt text da fotografia do equipamento. */
  alt: string;
  /** Multiplicador uniforme de escala. Não distorce: aplicado nos dois eixos. */
  escala: number;
  /** Ajuste vertical fino, em % da altura da área de imagem. */
  deslocamentoY: number;
  /** Marca conteúdo que ainda precisa de validação do cliente. */
  revisarConteudo?: boolean;
};

export const TECNOLOGIAS: Tecnologia[] = [
  {
    slug: 'centurion',
    nome: 'Centurion',
    resumo: 'Plataforma de aplicação assistida',
    // Não foi possível confirmar o fabricante nem o princípio de funcionamento
    // deste equipamento em fontes públicas, e o lettering do próprio PNG está
    // ilegível. O texto abaixo é deliberadamente descritivo e não afirma
    // mecanismo nem indicação — substituir pela descrição oficial.
    descricao:
      'Integra o conjunto de equipamentos do consultório. A indicação e o protocolo são sempre definidos em consulta, caso a caso.',
    alt: 'Equipamento Centurion, plataforma vertical com tela de comando e ponteira de aplicação',
    escala: 1,
    deslocamentoY: 0,
    revisarConteudo: true,
  },
  {
    slug: 'fotona-sp',
    nome: 'Fotona SP',
    resumo: 'Dupla emissão Er:YAG e Nd:YAG',
    descricao:
      'Reúne dois lasers no mesmo sistema: o Er:YAG, absorvido pela água, que trabalha a superfície da pele em camadas muito finas, e o Nd:YAG, de penetração profunda.',
    alt: 'Laser Fotona SP, plataforma branca com braço articulado e tela de comando',
    escala: 1.2,
    deslocamentoY: 4,
  },
  {
    slug: 'fotona-starwalker',
    nome: 'Fotona StarWalker',
    resumo: 'Q-switched de pulso ultracurto',
    descricao:
      'Q-switched que soma a energia do pulso em nanossegundos à potência de pico dos lasers de picossegundos, agindo por efeito fotoacústico sobre o pigmento.',
    alt: 'Laser Fotona StarWalker, corpo em grafite e dourado com braço articulado e tela lateral',
    escala: 0.98,
    deslocamentoY: 0,
  },
  {
    slug: 'hybrid',
    nome: 'Hybrid',
    resumo: 'CO₂ fracionado de modos combinados',
    descricao:
      'CO₂ fracionado que alterna entre modos de entrega de energia, ajustando a intensidade e o tempo de recuperação ao que cada pele suporta.',
    alt: 'Laser Hybrid CO₂, torre cinza com braço articulado espelhado e base com rodízios',
    escala: 1.12,
    deslocamentoY: 2,
  },
  {
    slug: 'liftera',
    nome: 'Liftera',
    resumo: 'Ultrassom microfocado para flacidez',
    descricao:
      'Ultrassom microfocado entregue em profundidade controlada, com aplicador linear e do tipo caneta para alcançar regiões delicadas do rosto.',
    alt: 'Equipamento Liftera, torre branca e grafite com tela de comando e dois aplicadores',
    escala: 0.94,
    deslocamentoY: 0,
  },
  {
    slug: 'quadripico',
    nome: 'Quadripico',
    resumo: 'Picossegundos, nano e pulso longo',
    descricao:
      'Reúne picossegundos, nanossegundos e pulso longo. O pulso ultracurto fragmenta o pigmento com dispersão térmica reduzida.',
    alt: 'Laser Quadripico, corpo bege e grafite com braço articulado em tom rosé e tela orientável',
    escala: 1.1,
    deslocamentoY: 3,
  },
  {
    slug: 'redtouch',
    nome: 'RedTouch',
    resumo: 'Comprimento de onda de 675 nm',
    descricao:
      'Laser não ablativo de 675 nm — comprimento de onda que interage diretamente com as fibras de colágeno da derme, com resfriamento integrado.',
    alt: 'Laser RedTouch Pro, torre em grafite e prata com braço de aplicação articulado',
    escala: 1.22,
    deslocamentoY: 5,
  },
];
