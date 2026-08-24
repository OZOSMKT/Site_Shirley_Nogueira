'use client';

import { useEffect, useRef, useState } from 'react';
import { Logo } from '@/components/ui/Logo';
import { AGENDAMENTO_HREF } from '@/data/contato';
import { HERO, NAVEGACAO } from '@/data/conteudo';
import estilos from './Cabecalho.module.css';

/**
 * Header fixo com blur (DESIGN-SPEC §07).
 *
 * Acompanha a página o tempo todo. Ao sair do topo ganha fundo semitransparente
 * com `backdrop-filter`, um filete inferior e altura levemente menor — mudanças
 * sutis, sem virar glassmorphism.
 */
export function Cabecalho() {
  const [rolou, setRolou] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const painelRef = useRef<HTMLDivElement>(null);
  const botaoMenuRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 24);
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });
    return () => window.removeEventListener('scroll', aoRolar);
  }, []);

  // Trava o scroll do corpo enquanto o menu mobile está aberto.
  useEffect(() => {
    if (!menuAberto) return;
    const anterior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = anterior;
    };
  }, [menuAberto]);

  // Esc fecha o menu e devolve o foco ao botão que o abriu.
  useEffect(() => {
    if (!menuAberto) return;

    const aoTeclar = (evento: KeyboardEvent) => {
      if (evento.key === 'Escape') {
        setMenuAberto(false);
        botaoMenuRef.current?.focus();
      }
    };

    document.addEventListener('keydown', aoTeclar);
    return () => document.removeEventListener('keydown', aoTeclar);
  }, [menuAberto]);

  // Mantém o foco dentro do painel enquanto ele está aberto.
  useEffect(() => {
    if (!menuAberto) return;
    const painel = painelRef.current;
    if (!painel) return;

    const focaveis = painel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
    focaveis[0]?.focus();

    const aoTabular = (evento: KeyboardEvent) => {
      if (evento.key !== 'Tab' || focaveis.length === 0) return;
      const primeiro = focaveis[0];
      const ultimo = focaveis[focaveis.length - 1];

      if (evento.shiftKey && document.activeElement === primeiro) {
        evento.preventDefault();
        ultimo.focus();
      } else if (!evento.shiftKey && document.activeElement === ultimo) {
        evento.preventDefault();
        primeiro.focus();
      }
    };

    painel.addEventListener('keydown', aoTabular);
    return () => painel.removeEventListener('keydown', aoTabular);
  }, [menuAberto]);

  return (
    <header className={`${estilos.cabecalho} ${rolou ? estilos.rolou : ''}`}>
      <div className={estilos.interno}>
        <a href="#inicio" className={estilos.marca} aria-label="Instituto Shirley Nogueira, ir para o início">
          <Logo
            forma="horizontal"
            cor="dourada"
            altura={42}
            className={estilos.logo}
            priority
            decorativo
          />
        </a>

        <nav className={estilos.navegacao} aria-label="Navegação principal">
          <ul className={estilos.lista}>
            {NAVEGACAO.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={estilos.link}>
                  {item.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href={AGENDAMENTO_HREF} className={estilos.ctaDesktop}>
          {HERO.cta}
        </a>

        <button
          ref={botaoMenuRef}
          type="button"
          className={estilos.botaoMenu}
          aria-expanded={menuAberto}
          aria-controls="menu-mobile"
          onClick={() => setMenuAberto((aberto) => !aberto)}
        >
          <span className="apenasLeitorDeTela">{menuAberto ? 'Fechar menu' : 'Abrir menu'}</span>
          <span className={`${estilos.hamburger} ${menuAberto ? estilos.hamburgerAberto : ''}`} aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </div>

      <div
        id="menu-mobile"
        ref={painelRef}
        className={`${estilos.painel} ${menuAberto ? estilos.painelAberto : ''}`}
        // Fora da ordem de tabulação e da árvore de acessibilidade quando fechado.
        inert={!menuAberto}
      >
        <nav aria-label="Navegação principal (mobile)">
          <ul className={estilos.listaMobile}>
            {NAVEGACAO.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={estilos.linkMobile} onClick={() => setMenuAberto(false)}>
                  {item.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a href={AGENDAMENTO_HREF} className={estilos.ctaMobile} onClick={() => setMenuAberto(false)}>
          {HERO.cta}
        </a>
      </div>
    </header>
  );
}
