/**
 * Dados oficiais de contato.
 *
 * Fonte única — consumida pela seção Contato, pelo Footer e pelo JSON-LD.
 * Todo o conteúdo aqui vem literalmente do DESIGN-SPEC.md §16 e dos links
 * fornecidos pelo cliente. Nada foi inferido ou complementado.
 */

export const MARCA = {
  nome: 'Instituto Shirley Nogueira',
  medica: 'Dra. Shirley Nogueira',
  especialidade: 'Médica dermatologista',
} as const;

export const LOCAL = {
  edificio: 'Órion Business & Health Complex',
  endereco: 'Av. Portugal, 1148 — St. Marista',
  cidade: 'Goiânia — GO, 74150-030',
  logradouro: 'Av. Portugal, 1148',
  bairro: 'Setor Marista',
  municipio: 'Goiânia',
  uf: 'GO',
  cep: '74150-030',
  /** Link de mapa fornecido pelo cliente. */
  href: 'https://share.google/kntqVRbO9IV7zLp00',
} as const;

export const TELEFONE = {
  exibicao: '(62) 3926-5757',
  complemento: 'Instituto Shirley Nogueira',
  href: 'tel:+556239265757',
} as const;

export const INSTAGRAM = {
  exibicao: '@shirleynogueira.dermato',
  href: 'https://www.instagram.com/shirleynogueira.dermato/',
} as const;

/**
 * Destino dos CTAs de agendamento.
 *
 * O cliente ainda não tem link de WhatsApp ou sistema de agendamento online.
 * Até que exista, os botões conduzem à seção de contato, onde telefone,
 * Instagram e localização estão disponíveis como ações reais.
 *
 * Quando o WhatsApp existir, basta trocar esta constante por
 * `https://wa.me/55...` — nenhum componente precisa ser alterado.
 */
export const AGENDAMENTO_HREF = '#contato';

/** Ação dos cards de tecnologia. Mesmo raciocínio do agendamento. */
export const SAIBA_MAIS_HREF = '#contato';
