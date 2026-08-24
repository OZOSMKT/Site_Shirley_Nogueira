'use client';

import Image from 'next/image';
import { useCallback, useState } from 'react';
import { SAIBA_MAIS_HREF } from '@/data/contato';
import type { Tecnologia } from '@/data/tecnologias';
import estilos from './CardTecnologia.module.css';

type Props = {
  tecnologia: Tecnologia;
  numero: number;
  /** Clones do carrossel não recebem foco nem são lidos por leitor de tela. */
  clone?: boolean;
};

/**
 * Card editorial de tecnologia (DESIGN-SPEC §14).
 *
 * O card tem altura fixa. A expansão acontece dentro dele: a área do
 * equipamento cede espaço enquanto o bloco de descrição cresce de 0fr para 1fr.
 * Não há tooltip, pop-up nem overlay — o conteúdo pertence ao próprio card.
 *
 * A revelação é disparada por três caminhos equivalentes, para que hover não
 * seja a única forma de chegar à informação:
 *   - mouse: entrar/sair do card;
 *   - teclado: foco em qualquer elemento interno;
 *   - toque: toque no card, que alterna o estado.
 *
 * O texto revelado permanece sempre no DOM — apenas contido visualmente — então
 * leitores de tela o alcançam independentemente do estado visual.
 */
export function CardTecnologia({ tecnologia, numero, clone = false }: Props) {
  const [sobre, setSobre] = useState(false);
  const [focado, setFocado] = useState(false);
  const [travado, setTravado] = useState(false);

  const expandido = sobre || focado || travado;

  const aoEntrar = useCallback((evento: React.PointerEvent) => {
    if (evento.pointerType === 'mouse') setSobre(true);
  }, []);

  const aoSair = useCallback((evento: React.PointerEvent) => {
    if (evento.pointerType !== 'mouse') return;
    setSobre(false);
    // Um clique de mouse não deve deixar o card preso aberto ao afastar o cursor.
    setTravado(false);
  }, []);

  // Em telas sem hover o toque assume o papel do cursor.
  const aoClicar = useCallback((evento: React.MouseEvent) => {
    if ((evento.target as HTMLElement).closest('a')) return;
    setTravado((atual) => !atual);
  }, []);

  const aoSairDoFoco = useCallback((evento: React.FocusEvent<HTMLElement>) => {
    if (!evento.currentTarget.contains(evento.relatedTarget as Node | null)) {
      setFocado(false);
    }
  }, []);

  return (
    <article
      className={`${estilos.card} ${expandido ? estilos.expandido : ''}`}
      onPointerEnter={aoEntrar}
      onPointerLeave={aoSair}
      onClick={aoClicar}
      onFocus={() => setFocado(true)}
      onBlur={aoSairDoFoco}
      aria-labelledby={clone ? undefined : `tec-${tecnologia.slug}`}
    >
      <div className={estilos.topo}>
        <span className={estilos.numero} aria-hidden="true">
          {String(numero).padStart(2, '0')}
        </span>
        <span className={estilos.selo}>Tecnologia</span>
      </div>

      <div className={estilos.palco}>
        <Image
          src={`/images/tecnologias/${tecnologia.slug}.webp`}
          alt={clone ? '' : tecnologia.alt}
          aria-hidden={clone || undefined}
          fill
          sizes="(min-width: 62rem) 30vw, 74vw"
          className={estilos.equipamento}
          /* Escala e deslocamento individuais equilibram o peso visual entre
             aparelhos de proporções muito diferentes. A escala é uniforme nos
             dois eixos — nenhuma proporção é distorcida. */
          style={{
            transform: `translateY(${tecnologia.deslocamentoY}%) scale(${tecnologia.escala})`,
          }}
          /* Sem `priority`: o carrossel fica bem abaixo da dobra e pré-carregar
             estas imagens competiria com o LCP, que é a fotografia do Hero. */
          quality={88}
        />
      </div>

      <div className={estilos.base}>
        <h3 id={clone ? undefined : `tec-${tecnologia.slug}`} className={estilos.nome}>
          {tecnologia.nome}
        </h3>
        <p className={estilos.resumo}>{tecnologia.resumo}</p>

        <div className={estilos.extra}>
          <div className={estilos.extraInterno}>
            <p className={estilos.descricao}>{tecnologia.descricao}</p>
            <a
              href={SAIBA_MAIS_HREF}
              className={estilos.saibaMais}
              tabIndex={clone ? -1 : undefined}
              aria-hidden={clone || undefined}
            >
              Saiba mais
              <span aria-hidden="true">
                <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
                  <path
                    d="M2 8h11M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
