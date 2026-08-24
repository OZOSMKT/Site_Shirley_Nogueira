'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/** Nº de clones em cada ponta. Precisa cobrir os cards visíveis + o parcial. */
export const CLONES = 3;

const INTERVALO_AUTOPLAY = 5200;
/** Fração da largura do card que o arrasto precisa vencer para trocar de slide. */
const LIMIAR_ARRASTO = 0.22;

type Opcoes = {
  /** Quantidade de slides reais. */
  total: number;
};

/**
 * Carrossel com loop infinito, autoplay e arrasto.
 *
 * O loop usa clones nas duas pontas: a faixa contém
 * `[3 últimos] [7 reais] [3 primeiros]` e o índice caminha por essa lista.
 * Ao pousar sobre um clone, o índice é reposicionado no slide real equivalente
 * com a transição desligada — por isso a volta do último para o primeiro é
 * contínua, sem o "rebobinar" típico de carrosséis simples.
 *
 * O deslocamento é calculado a partir do `offsetLeft` real de cada slide, então
 * funciona com qualquer largura de card ou gap definido no CSS, incluindo as
 * mudanças de breakpoint, sem duplicar esses valores em JavaScript.
 */
export function useCarrossel({ total }: Opcoes) {
  const faixaRef = useRef<HTMLUListElement>(null);

  // O índice caminha sobre a lista com clones; o primeiro slide real é CLONES.
  const [indice, setIndice] = useState(CLONES);
  const [comTransicao, setComTransicao] = useState(true);
  const [arrasto, setArrasto] = useState(0);
  const [pausado, setPausado] = useState(false);
  const [semMovimento, setSemMovimento] = useState(false);

  const emTransicao = useRef(false);
  const inicioArrasto = useRef<{ x: number; y: number } | null>(null);
  const arrastando = useRef(false);

  const indiceReal = ((indice - CLONES) % total + total) % total;

  const avancar = useCallback(() => {
    if (emTransicao.current) return;
    emTransicao.current = true;
    setComTransicao(true);
    setIndice((atual) => atual + 1);
  }, []);

  const voltar = useCallback(() => {
    if (emTransicao.current) return;
    emTransicao.current = true;
    setComTransicao(true);
    setIndice((atual) => atual - 1);
  }, []);

  const irPara = useCallback((alvoReal: number) => {
    if (emTransicao.current) return;
    emTransicao.current = true;
    setComTransicao(true);
    setIndice(CLONES + alvoReal);
  }, []);

  /**
   * Fim da transição: se paramos sobre um clone, salta para o slide real
   * correspondente sem animação. O `requestAnimationFrame` duplo garante que o
   * navegador aplique `transition: none` antes da mudança de posição.
   *
   * O filtro no início é essencial: `transitionend` borbulha, e os cards têm
   * várias transições próprias (borda, sombra, expansão do conteúdo). Sem ele,
   * passar o mouse por um card dispararia esta lógica no meio de um passo do
   * carrossel e travaria a navegação.
   */
  const normalizar = useCallback(() => {
    emTransicao.current = false;

    if (indice >= CLONES + total) {
      setComTransicao(false);
      setIndice(indice - total);
    } else if (indice < CLONES) {
      setComTransicao(false);
      setIndice(indice + total);
    }
  }, [indice, total]);

  const aoTerminarTransicao = useCallback(
    (evento: React.TransitionEvent) => {
      if (evento.target !== evento.currentTarget || evento.propertyName !== 'transform') return;
      normalizar();
    },
    [normalizar],
  );

  /**
   * Rede de segurança para o travamento do passo.
   *
   * `transitionend` não dispara quando não há transição — é o caso com
   * `prefers-reduced-motion`, e também quando a aba está oculta. Sem isto, o
   * `emTransicao` ficaria preso em `true` e o carrossel pararia de responder.
   */
  useEffect(() => {
    if (!emTransicao.current) return;
    const id = setTimeout(normalizar, semMovimento ? 40 : 900);
    return () => clearTimeout(id);
  }, [indice, semMovimento, normalizar]);

  useEffect(() => {
    if (comTransicao) return;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setComTransicao(true));
    });
    return () => cancelAnimationFrame(id);
  }, [comTransicao]);

  // Movimento reduzido: sem autoplay e sem transição (DESIGN-SPEC §19).
  useEffect(() => {
    const consulta = window.matchMedia('(prefers-reduced-motion: reduce)');
    const aplicar = () => setSemMovimento(consulta.matches);
    aplicar();
    consulta.addEventListener('change', aplicar);
    return () => consulta.removeEventListener('change', aplicar);
  }, []);

  // Autoplay. Pausa em interação, foco, aba oculta e movimento reduzido.
  useEffect(() => {
    if (pausado || semMovimento) return;

    const id = setInterval(() => {
      if (document.visibilityState === 'visible') avancar();
    }, INTERVALO_AUTOPLAY);

    return () => clearInterval(id);
  }, [pausado, semMovimento, avancar]);

  // --- Arrasto / swipe ----------------------------------------------------

  const aoPressionar = useCallback((evento: React.PointerEvent) => {
    // Só arrasta com toque/caneta ou botão principal do mouse.
    if (evento.pointerType === 'mouse' && evento.button !== 0) return;
    inicioArrasto.current = { x: evento.clientX, y: evento.clientY };
    arrastando.current = false;
  }, []);

  const aoMover = useCallback((evento: React.PointerEvent) => {
    const inicio = inicioArrasto.current;
    if (!inicio || emTransicao.current) return;

    const dx = evento.clientX - inicio.x;
    const dy = evento.clientY - inicio.y;

    // Antes de assumir o gesto, confere se ele é mais horizontal que vertical —
    // caso contrário é rolagem da página e não deve ser capturado.
    if (!arrastando.current) {
      if (Math.abs(dx) < 8) return;
      if (Math.abs(dx) < Math.abs(dy)) {
        inicioArrasto.current = null;
        return;
      }
      arrastando.current = true;
      setPausado(true);
    }

    setComTransicao(false);
    setArrasto(dx);
  }, []);

  const aoSoltar = useCallback(() => {
    const estavaArrastando = arrastando.current;
    inicioArrasto.current = null;
    arrastando.current = false;

    if (!estavaArrastando) return;

    const faixa = faixaRef.current;
    const larguraCard = faixa?.firstElementChild?.getBoundingClientRect().width ?? 0;
    const limiar = larguraCard * LIMIAR_ARRASTO;

    setArrasto(0);
    setComTransicao(true);

    if (arrasto <= -limiar) {
      emTransicao.current = true;
      setIndice((atual) => atual + 1);
    } else if (arrasto >= limiar) {
      emTransicao.current = true;
      setIndice((atual) => atual - 1);
    }
  }, [arrasto]);

  // --- Posição ------------------------------------------------------------

  const [deslocamento, setDeslocamento] = useState(0);

  const medir = useCallback(() => {
    const faixa = faixaRef.current;
    if (!faixa) return;
    const slides = faixa.children;
    const primeiro = slides[0] as HTMLElement | undefined;
    const alvo = slides[indice] as HTMLElement | undefined;
    if (!primeiro || !alvo) return;
    setDeslocamento(alvo.offsetLeft - primeiro.offsetLeft);
  }, [indice]);

  useEffect(() => {
    medir();
  }, [medir]);

  useEffect(() => {
    const faixa = faixaRef.current;
    if (!faixa || typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', medir);
      return () => window.removeEventListener('resize', medir);
    }

    const observador = new ResizeObserver(medir);
    observador.observe(faixa);
    return () => observador.disconnect();
  }, [medir]);

  return {
    faixaRef,
    indice,
    indiceReal,
    deslocamento: deslocamento - arrasto,
    comTransicao: comTransicao && !semMovimento,
    avancar,
    voltar,
    irPara,
    aoTerminarTransicao,
    pausar: () => setPausado(true),
    retomar: () => setPausado(false),
    aoPressionar,
    aoMover,
    aoSoltar,
  };
}
