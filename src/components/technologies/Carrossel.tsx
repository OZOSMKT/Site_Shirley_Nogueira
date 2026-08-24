'use client';

import { CLONES, useCarrossel } from '@/hooks/useCarrossel';
import { TECNOLOGIAS } from '@/data/tecnologias';
import { CardTecnologia } from './CardTecnologia';
import estilos from './Carrossel.module.css';

const TOTAL = TECNOLOGIAS.length;

/**
 * Faixa completa: clones da cauda + slides reais + clones da cabeça.
 * Os clones existem apenas para dar continuidade visual ao loop e são
 * removidos da árvore de acessibilidade.
 */
const FAIXA = [
  ...TECNOLOGIAS.slice(-CLONES).map((t, i) => ({
    tecnologia: t,
    numero: TOTAL - CLONES + i + 1,
    clone: true,
  })),
  ...TECNOLOGIAS.map((t, i) => ({ tecnologia: t, numero: i + 1, clone: false })),
  ...TECNOLOGIAS.slice(0, CLONES).map((t, i) => ({
    tecnologia: t,
    numero: i + 1,
    clone: true,
  })),
];

/**
 * Carrossel de tecnologias (DESIGN-SPEC §12).
 *
 * Mostra 2 cards completos + o terceiro parcialmente visível no desktop, e
 * 1 card + parte do próximo no mobile — a largura vem de `--largura-card` no
 * CSS, então o comportamento acompanha o breakpoint sem duplicar valores em JS.
 */
export function Carrossel() {
  const {
    faixaRef,
    indice,
    indiceReal,
    deslocamento,
    comTransicao,
    avancar,
    voltar,
    irPara,
    aoTerminarTransicao,
    pausar,
    retomar,
    aoPressionar,
    aoMover,
    aoSoltar,
  } = useCarrossel({ total: TOTAL });

  const aoTeclar = (evento: React.KeyboardEvent) => {
    if (evento.key === 'ArrowRight') {
      evento.preventDefault();
      avancar();
    } else if (evento.key === 'ArrowLeft') {
      evento.preventDefault();
      voltar();
    }
  };

  return (
    <div
      className={estilos.carrossel}
      role="group"
      aria-roledescription="carrossel"
      aria-label="Tecnologias do Instituto Shirley Nogueira"
      onPointerEnter={pausar}
      onPointerLeave={retomar}
      onFocusCapture={pausar}
      onBlurCapture={retomar}
      onKeyDown={aoTeclar}
    >
      <div
        className={estilos.janela}
        onPointerDown={aoPressionar}
        onPointerMove={aoMover}
        onPointerUp={aoSoltar}
        onPointerCancel={aoSoltar}
      >
        <ul
          ref={faixaRef}
          className={estilos.faixa}
          style={{
            transform: `translate3d(${-deslocamento}px, 0, 0)`,
            transition: comTransicao ? 'transform var(--dur-lenta) var(--ease)' : 'none',
          }}
          onTransitionEnd={aoTerminarTransicao}
        >
          {FAIXA.map((item, posicao) => (
            <li
              key={`${item.tecnologia.slug}-${posicao}`}
              className={estilos.slide}
              aria-hidden={item.clone || undefined}
              inert={item.clone}
            >
              <CardTecnologia tecnologia={item.tecnologia} numero={item.numero} clone={item.clone} />
            </li>
          ))}
        </ul>
      </div>

      {/* Anúncio do slide atual para leitores de tela. */}
      <p className="apenasLeitorDeTela" aria-live="polite" aria-atomic="true">
        {`Tecnologia ${indiceReal + 1} de ${TOTAL}: ${TECNOLOGIAS[indiceReal].nome}`}
      </p>

      <div className={estilos.controles}>
        <div className={estilos.setas}>
          <button type="button" className={estilos.seta} onClick={voltar} aria-label="Tecnologia anterior">
            <svg viewBox="0 0 20 20" width="18" height="18" fill="none" aria-hidden="true">
              <path
                d="M12 4l-6 6 6 6"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button type="button" className={estilos.seta} onClick={avancar} aria-label="Próxima tecnologia">
            <svg viewBox="0 0 20 20" width="18" height="18" fill="none" aria-hidden="true">
              <path
                d="M8 4l6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <ul className={estilos.marcadores}>
          {TECNOLOGIAS.map((tecnologia, posicao) => (
            <li key={tecnologia.slug}>
              <button
                type="button"
                className={`${estilos.marcador} ${posicao === indiceReal ? estilos.marcadorAtivo : ''}`}
                onClick={() => irPara(posicao)}
                aria-label={`Ir para ${tecnologia.nome}`}
                aria-current={posicao === indiceReal || undefined}
              />
            </li>
          ))}
        </ul>

        <span className={estilos.contador} aria-hidden="true">
          <strong>{String(indiceReal + 1).padStart(2, '0')}</strong>
          <span>/</span>
          {String(TOTAL).padStart(2, '0')}
        </span>
      </div>

      {/* Referência do índice interno para depuração em desenvolvimento. */}
      <span hidden data-indice={indice} />
    </div>
  );
}
