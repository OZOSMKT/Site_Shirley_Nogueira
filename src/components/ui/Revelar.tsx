'use client';

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';
import estilos from './Revelar.module.css';

type Props = {
  children: ReactNode;
  /** Atraso em ms, para escalonar elementos irmãos. */
  atraso?: number;
  /** Elemento renderizado. Permite revelar sem introduzir uma div extra. */
  as?: ElementType;
  className?: string;
};

/**
 * Revelação na entrada em viewport: fade + deslocamento curto.
 *
 * Único mecanismo de animação de entrada do projeto (DESIGN-SPEC §19). Usa
 * IntersectionObserver em vez de biblioteca de animação — o vocabulário é
 * deliberadamente restrito a opacidade e translateY.
 *
 * `prefers-reduced-motion` é respeitado pelo CSS, que zera a transição e já
 * entrega o elemento visível.
 */
export function Revelar({ children, atraso = 0, as: Tag = 'div', className }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const no = ref.current;
    if (!no) return;

    // Sem suporte a IntersectionObserver o conteúdo aparece imediatamente,
    // em vez de ficar invisível para sempre.
    if (typeof IntersectionObserver === 'undefined') {
      const id = requestAnimationFrame(() => setVisivel(true));
      return () => cancelAnimationFrame(id);
    }

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisivel(true);
          observador.disconnect();
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
    );

    observador.observe(no);
    return () => observador.disconnect();
  }, []);

  const classes = [estilos.revelar, visivel && estilos.visivel, className]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag
      ref={ref}
      className={classes}
      style={atraso ? { transitionDelay: `${atraso}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
