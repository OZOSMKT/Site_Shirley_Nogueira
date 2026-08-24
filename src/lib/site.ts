import { INSTAGRAM, LOCAL, MARCA, TELEFONE } from '@/data/contato';

/**
 * URL de produção. Ajustar após conectar o domínio na Vercel — é usada como
 * base para canonical, Open Graph e sitemap.
 *
 * `NEXT_PUBLIC_SITE_URL` permite sobrescrever sem alterar código; a Vercel
 * também expõe `VERCEL_PROJECT_PRODUCTION_URL` automaticamente.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://institutoshirleynogueira.com.br');

export const SITE = {
  titulo: `${MARCA.medica} — Dermatologia e Medicina Regenerativa`,
  tituloCurto: MARCA.nome,
  descricao:
    'Dra. Shirley Nogueira, médica dermatologista em Goiânia. Dermatologia Estética e Medicina Regenerativa com tecnologia de ponta, técnica e atendimento personalizado.',
} as const;

/**
 * Dados estruturados.
 *
 * Populado exclusivamente com informação oficial fornecida pelo cliente. Sem
 * horário de funcionamento, avaliações, preços ou lista de serviços — nada
 * disso foi informado e não seria correto inventar (DESIGN-SPEC §21).
 */
export function dadosEstruturados() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    '@id': `${SITE_URL}#instituto`,
    name: MARCA.nome,
    url: SITE_URL,
    image: `${SITE_URL}/og.png`,
    telephone: TELEFONE.exibicao,
    medicalSpecialty: 'Dermatology',
    address: {
      '@type': 'PostalAddress',
      streetAddress: LOCAL.logradouro,
      addressLocality: LOCAL.municipio,
      addressRegion: LOCAL.uf,
      postalCode: LOCAL.cep,
      addressCountry: 'BR',
    },
    sameAs: [INSTAGRAM.href],
    employee: {
      '@type': 'Physician',
      name: MARCA.medica,
      medicalSpecialty: 'Dermatology',
    },
  };
}
