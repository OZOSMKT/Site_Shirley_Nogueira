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
 * O card das métricas fica **ao lado** da fotografia, encostado na borda
 * direita e avançando para fora dela — não abaixo. As três métricas se empilham
 * na vertical, separadas por filetes. Esse é o arranjo aprovado pelo cliente e
 * vale em todos os tamanhos de tela.
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

          <ul className={estilos.card}>
            {METRICAS.map((metrica) => (
              <li key={metrica.legenda} className={estilos.metrica}>
                <Metrica {...metrica} />
              </li>
            ))}
          </ul>
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
