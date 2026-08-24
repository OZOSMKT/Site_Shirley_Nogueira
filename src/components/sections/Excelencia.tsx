import Image from 'next/image';
import { Revelar } from '@/components/ui/Revelar';
import { EXCELENCIA } from '@/data/conteudo';
import estilos from './Excelencia.module.css';

/**
 * Conhecimento que gera Excelência (DESIGN-SPEC §15).
 *
 * Seção de maior liberdade criativa, resolvida como manifesto editorial e não
 * como currículo: tipografia em grande escala, assimetria e espaço negativo.
 *
 * A fotografia oficial mostra a Dra. Shirley diante da parede de certificações
 * do consultório — a prova de autoridade está na própria imagem, o que permite
 * manter o texto curto e sem lista de títulos. Os quatro pilares apenas
 * reorganizam fatos já declarados na seção Sobre; nada foi acrescentado.
 */
export function Excelencia() {
  return (
    <section
      className={`${estilos.excelencia} sobreEscuro`}
      aria-labelledby="excelencia-titulo"
    >
      <div className={estilos.interno}>
        <Revelar className={estilos.cabecalho}>
          <h2 id="excelencia-titulo" className={estilos.titulo}>
            <span className={estilos.sobretitulo}>{EXCELENCIA.sobretitulo}</span>
            <span className={estilos.palavra}>{EXCELENCIA.titulo}</span>
          </h2>
        </Revelar>

        <Revelar atraso={120} className={estilos.midia}>
          <Image
            src="/images/doutora/excelencia-shirley.webp"
            alt={EXCELENCIA.alt}
            width={483}
            height={588}
            sizes="(min-width: 62rem) 38vw, 82vw"
            className={estilos.foto}
            quality={90}
          />
        </Revelar>

        <div className={estilos.corpo}>
          <Revelar as="p" atraso={80} className={estilos.chamada}>
            {EXCELENCIA.texto}
          </Revelar>

          <ul className={estilos.pilares}>
            {EXCELENCIA.pilares.map((pilar, indice) => (
              <Revelar as="li" key={pilar.titulo} atraso={140 + indice * 70} className={estilos.pilar}>
                <span className={estilos.pilarNumero} aria-hidden="true">
                  {String(indice + 1).padStart(2, '0')}
                </span>
                <h3 className={estilos.pilarTitulo}>{pilar.titulo}</h3>
                <p className={estilos.pilarTexto}>{pilar.texto}</p>
              </Revelar>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
