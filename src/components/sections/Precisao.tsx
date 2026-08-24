import Image from 'next/image';
import { Logo } from '@/components/ui/Logo';
import { Revelar } from '@/components/ui/Revelar';
import { PRECISAO } from '@/data/conteudo';
import estilos from './Precisao.module.css';

/**
 * Precisão / segunda fotografia (DESIGN-SPEC §10).
 *
 * Função narrativa: Pessoa → Precisão → Tecnologia.
 *
 * A fotografia oficial é uma landscape com a Dra. Shirley no eixo central, de
 * braços abertos apontando para os equipamentos. Sobrepor o texto a ela
 * cobriria justamente o gesto que dá sentido à imagem — e nenhum véu resolveria
 * o contraste sem apagar a fotografia.
 *
 * A composição resolve isso empilhando: a fotografia ocupa a faixa superior
 * inteira e o texto se apoia no marrom institucional logo abaixo. O símbolo da
 * marca fica cravado exatamente sobre a linha que separa as duas partes — é ele
 * que materializa a divisão central exigida pela especificação, e a fotografia
 * permanece legível de ponta a ponta.
 */
export function Precisao() {
  return (
    <section className={`${estilos.precisao} sobreEscuro`} aria-labelledby="precisao-titulo">
      <div className={estilos.faixaFoto}>
        <Image
          src="/images/doutora/precisao-shirley.webp"
          alt={PRECISAO.alt}
          fill
          sizes="100vw"
          className={estilos.foto}
          quality={90}
        />
        {/* Degradê curto apenas na base, para a fotografia se fundir ao marrom. */}
        <div className={estilos.fusao} aria-hidden="true" />
      </div>

      <div className={estilos.divisao} aria-hidden="true">
        <span className={estilos.filete} />
        <span className={estilos.simbolo}>
          <Logo forma="simbolo" cor="dourada" altura={56} decorativo />
        </span>
        <span className={estilos.filete} />
      </div>

      <div className={estilos.interno}>
        <Revelar className={estilos.conteudo}>
          <h2 id="precisao-titulo" className={estilos.titulo}>
            {PRECISAO.titulo}
          </h2>
          <p className={estilos.subtitulo}>{PRECISAO.subtitulo}</p>
          <p className={estilos.texto}>{PRECISAO.texto}</p>
        </Revelar>
      </div>
    </section>
  );
}
