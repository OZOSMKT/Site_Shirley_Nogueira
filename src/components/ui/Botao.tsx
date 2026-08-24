import Link from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';
import estilos from './Botao.module.css';

type Variante = 'solido' | 'contorno' | 'claro' | 'texto';

type Props = {
  href: string;
  children: React.ReactNode;
  variante?: Variante;
  className?: string;
} & Omit<ComponentPropsWithoutRef<typeof Link>, 'href' | 'className' | 'children'>;

/**
 * CTA único do projeto. Usa `<Link>` porque todos os destinos atuais são
 * âncoras internas ou links externos — nenhum dispara ação de aplicação.
 */
export function Botao({ href, children, variante = 'solido', className, ...resto }: Props) {
  const externo = href.startsWith('http');
  const classes = [estilos.botao, estilos[variante], className].filter(Boolean).join(' ');

  return (
    <Link
      href={href}
      className={classes}
      {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...resto}
    >
      <span className={estilos.rotulo}>{children}</span>
      <span className={estilos.seta} aria-hidden="true">
        <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
          <path
            d="M2 8h11M9 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}
