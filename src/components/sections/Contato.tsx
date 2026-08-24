import Image from 'next/image';
import { Revelar } from '@/components/ui/Revelar';
import { Rotulo } from '@/components/ui/Rotulo';
import { INSTAGRAM, LOCAL, TELEFONE } from '@/data/contato';
import { CONTATO } from '@/data/conteudo';
import estilos from './Contato.module.css';

/** Ícones inline: três traços simples, sem dependência de biblioteca. */
const ICONES = {
  local: (
    <path
      d="M10 17.5s6-4.9 6-9.2A6 6 0 0 0 4 8.3c0 4.3 6 9.2 6 9.2Z M10 10.4a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  telefone: (
    <path
      d="M6.6 3.5 8.2 7 6.7 8.6a9.4 9.4 0 0 0 4.7 4.7L13 11.8l3.5 1.6v3a1 1 0 0 1-1.1 1A13 13 0 0 1 3.6 4.6a1 1 0 0 1 1-1.1h2Z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  instagram: (
    <path
      d="M6.6 3.3h6.8a3.3 3.3 0 0 1 3.3 3.3v6.8a3.3 3.3 0 0 1-3.3 3.3H6.6a3.3 3.3 0 0 1-3.3-3.3V6.6a3.3 3.3 0 0 1 3.3-3.3Z M10 13.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z M13.9 6.2h.01"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
};

const INFORMACOES = [
  {
    chave: 'local',
    rotulo: 'Localização',
    href: LOCAL.href,
    externo: true,
    linhas: [LOCAL.edificio, LOCAL.endereco, LOCAL.cidade],
    acao: 'Ver no mapa',
  },
  {
    chave: 'telefone',
    rotulo: 'Telefone',
    href: TELEFONE.href,
    externo: false,
    linhas: [TELEFONE.exibicao, TELEFONE.complemento],
    acao: 'Ligar agora',
  },
  {
    chave: 'instagram',
    rotulo: 'Instagram',
    href: INSTAGRAM.href,
    externo: true,
    linhas: [INSTAGRAM.exibicao],
    acao: 'Abrir perfil',
  },
] as const;

/**
 * Entre em contato (DESIGN-SPEC §16).
 *
 * Encerramento da narrativa: título, texto de abertura, as três informações
 * oficiais, a fotografia e a frase de fechamento. Cada informação é um link
 * real — mapa, discagem e perfil — em vez de texto inerte.
 */
export function Contato() {
  return (
    <section id="contato" className={estilos.contato} aria-labelledby="contato-titulo">
      <div className={estilos.interno}>
        <div className={estilos.texto}>
          <Revelar>
            <Rotulo>Atendimento</Rotulo>
            <h2 id="contato-titulo" className={estilos.titulo}>
              {CONTATO.titulo}
            </h2>
            <p className={estilos.chamada}>{CONTATO.texto}</p>
          </Revelar>

          <ul className={estilos.informacoes}>
            {INFORMACOES.map((info, indice) => (
              <Revelar as="li" key={info.chave} atraso={100 + indice * 80}>
                <a
                  href={info.href}
                  className={estilos.info}
                  {...(info.externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <span className={estilos.infoIcone} aria-hidden="true">
                    <svg viewBox="0 0 20 20" width="20" height="20" fill="none">
                      {ICONES[info.chave]}
                    </svg>
                  </span>

                  <span className={estilos.infoCorpo}>
                    <span className={estilos.infoRotulo}>{info.rotulo}</span>
                    {info.linhas.map((linha) => (
                      <span key={linha} className={estilos.infoLinha}>
                        {linha}
                      </span>
                    ))}
                    <span className={estilos.infoAcao}>{info.acao}</span>
                  </span>
                </a>
              </Revelar>
            ))}
          </ul>
        </div>

        <Revelar atraso={140} className={estilos.midia}>
          {/*
            O pacote de assets não traz uma quinta fotografia: as quatro
            oficiais estão fixadas em Hero, Sobre, Precisão e Excelência
            (ASSETS.md §2). Aqui é reaproveitada a fotografia do Hero, que é a
            mais distante nesta página e a que melhor comunica recepção. Assim
            que houver uma foto dedicada para o Contato, basta trocar o `src`.
          */}
          <div className={estilos.moldura}>
            <Image
              src="/images/doutora/hero-shirley.webp"
              alt={CONTATO.alt}
              width={399}
              height={511}
              sizes="(min-width: 62rem) 34vw, 88vw"
              className={estilos.foto}
              quality={88}
            />
          </div>
          <p className={estilos.encerramento}>{CONTATO.encerramento}</p>
        </Revelar>
      </div>
    </section>
  );
}
