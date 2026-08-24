import Image from 'next/image';
import { Botao } from '@/components/ui/Botao';
import { Metrica } from '@/components/ui/Metrica';
import { Revelar } from '@/components/ui/Revelar';
import { Rotulo } from '@/components/ui/Rotulo';
import { AGENDAMENTO_HREF } from '@/data/contato';
import { METRICAS, SOBRE } from '@/data/conteudo';
import estilos from './Sobre.module.css';

/**
 * Sobre a Dra. Shirley (DESIGN-SPEC §09).
 *
 * A relação fotografia + card sobreposto é preservada: o card das métricas
 * avança sobre a base da imagem no desktop e continua invadindo a foto no
 * mobile, em vez de virar um bloco empilhado solto.
 *
 * O texto oficial e os números não foram alterados.
 */
export function Sobre() {
  return (
    <section id="sobre" className={estilos.sobre} aria-labelledby="sobre-titulo">
      <div className={estilos.interno}>
        <Revelar className={estilos.midia}>
          <div className={estilos.moldura}>
            <Image
              src="/images/doutora/sobre-shirley.webp"
              alt={SOBRE.alt}
              width={377}
              height={538}
              sizes="(min-width: 62rem) 40vw, 92vw"
              className={estilos.foto}
              quality={90}
            />
          </div>

          <div className={estilos.card}>
            <ul className={estilos.metricas}>
              {METRICAS.map((metrica) => (
                <li key={metrica.legenda}>
                  <Metrica {...metrica} />
                </li>
              ))}
            </ul>
          </div>
        </Revelar>

        <div className={estilos.texto}>
          <Revelar>
            <Rotulo>Quem atende você</Rotulo>
            <h2 id="sobre-titulo" className={estilos.titulo}>
              <span className={estilos.tituloLeve}>Sobre a</span>{' '}
              <span className={estilos.tituloForte}>Dra. Shirley</span>
            </h2>
          </Revelar>

          {SOBRE.paragrafos.map((paragrafo, indice) => (
            <Revelar as="p" key={indice} atraso={80 + indice * 60} className={estilos.paragrafo}>
              {paragrafo}
            </Revelar>
          ))}

          <Revelar atraso={280} className={estilos.acoes}>
            <Botao href={AGENDAMENTO_HREF} variante="contorno">
              {SOBRE.cta}
            </Botao>
          </Revelar>
        </div>
      </div>
    </section>
  );
}
