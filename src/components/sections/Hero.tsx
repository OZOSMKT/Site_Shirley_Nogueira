import Image from 'next/image';
import { Botao } from '@/components/ui/Botao';
import { Rotulo } from '@/components/ui/Rotulo';
import { AGENDAMENTO_HREF, MARCA } from '@/data/contato';
import { HERO } from '@/data/conteudo';
import estilos from './Hero.module.css';

/**
 * Hero (DESIGN-SPEC §08).
 *
 * Não é carrossel e a fotografia não é background: texto e imagem ocupam
 * colunas próprias e dividem a atenção. O nome da médica é o h1 — a estrutura
 * de headings da página parte dele.
 */
export function Hero() {
  return (
    <section id="inicio" className={estilos.hero} aria-labelledby="hero-titulo">
      <div className={estilos.interno}>
        <div className={estilos.texto}>
          <Rotulo className={estilos.rotulo}>{HERO.label}</Rotulo>

          {/* O espaço entre os spans é significativo: sem ele o nome acessível
              seria lido como "ShirleyNogueira". */}
          <h1 id="hero-titulo" className={estilos.titulo}>
            <span className={estilos.tituloLinha}>Dra. Shirley</span>{' '}
            <span className={estilos.tituloLinha}>Nogueira</span>
          </h1>

          <p className={estilos.chamada}>{HERO.texto}</p>

          <div className={estilos.acoes}>
            <Botao href={AGENDAMENTO_HREF}>{HERO.cta}</Botao>
          </div>
        </div>

        <div className={estilos.midia}>
          {/* Filete deslocado atrás da fotografia: dá profundidade e ancora a
              imagem no espaço negativo sem introduzir um bloco de cor. */}
          <div className={estilos.palco}>
            <span className={estilos.filete} aria-hidden="true" />
            <div className={estilos.moldura}>
              <Image
                src="/images/doutora/hero-shirley.webp"
                alt={HERO.alt}
                width={399}
                height={511}
                sizes="(min-width: 62rem) 44vw, 92vw"
                className={estilos.foto}
                priority
                quality={90}
              />
            </div>
          </div>
          <p className={estilos.assinatura}>
            <span className={estilos.assinaturaNome}>{MARCA.nome}</span>
            <span className={estilos.assinaturaLocal}>Goiânia — GO</span>
          </p>
        </div>
      </div>
    </section>
  );
}
