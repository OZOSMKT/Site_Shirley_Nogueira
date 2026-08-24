import { Carrossel } from '@/components/technologies/Carrossel';
import { Botao } from '@/components/ui/Botao';
import { Revelar } from '@/components/ui/Revelar';
import { Rotulo } from '@/components/ui/Rotulo';
import { TECNOLOGIAS_SECAO } from '@/data/conteudo';
import estilos from './Tecnologias.module.css';

/**
 * Tecnologias (DESIGN-SPEC §11).
 *
 * Estrutura preservada: título, texto e CTA à esquerda; carrossel à direita.
 * No mobile o bloco de texto sobe e o carrossel sangra até a borda da tela.
 */
export function Tecnologias() {
  return (
    <section id="tecnologias" className={estilos.tecnologias} aria-labelledby="tecnologias-titulo">
      <div className={estilos.interno}>
        <div className={estilos.texto}>
          <Revelar>
            <Rotulo>Equipamentos</Rotulo>
            <h2 id="tecnologias-titulo" className={estilos.titulo}>
              <span className={estilos.tituloLeve}>{TECNOLOGIAS_SECAO.tituloLinha1}</span>
              <span className={estilos.tituloForte}>{TECNOLOGIAS_SECAO.tituloLinha2}</span>
            </h2>
          </Revelar>

          <Revelar as="p" atraso={100} className={estilos.chamada}>
            {TECNOLOGIAS_SECAO.texto}
          </Revelar>

          <Revelar atraso={200}>
            <Botao href="#contato" variante="contorno">
              {TECNOLOGIAS_SECAO.cta}
            </Botao>
          </Revelar>
        </div>

        <Revelar atraso={120} className={estilos.galeria}>
          <Carrossel />
        </Revelar>
      </div>
    </section>
  );
}
