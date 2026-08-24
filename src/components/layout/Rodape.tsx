import { Logo } from '@/components/ui/Logo';
import { INSTAGRAM, LOCAL, MARCA, TELEFONE } from '@/data/contato';
import { NAVEGACAO } from '@/data/conteudo';
import estilos from './Rodape.module.css';

/**
 * Footer (DESIGN-SPEC §17): minimalista, compacto, fundo marrom escuro.
 * Repete apenas o essencial — marca, navegação e os contatos oficiais.
 */
export function Rodape() {
  const ano = new Date().getFullYear();

  return (
    <footer className={`${estilos.rodape} sobreEscuro`}>
      <div className={estilos.interno}>
        <div className={estilos.marca}>
          <Logo forma="horizontal" cor="branca" altura={28} decorativo />
          <p className={estilos.especialidade}>
            {MARCA.medica} — {MARCA.especialidade}
          </p>
        </div>

        <nav className={estilos.navegacao} aria-label="Navegação do rodapé">
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

        <address className={estilos.contatos}>
          <a href={LOCAL.href} className={estilos.link} target="_blank" rel="noopener noreferrer">
            {LOCAL.endereco} — {LOCAL.cidade}
          </a>
          <a href={TELEFONE.href} className={estilos.link}>
            {TELEFONE.exibicao}
          </a>
          <a href={INSTAGRAM.href} className={estilos.link} target="_blank" rel="noopener noreferrer">
            {INSTAGRAM.exibicao}
          </a>
        </address>
      </div>

      <div className={estilos.base}>
        <p>
          © {ano} {MARCA.nome}
        </p>
      </div>
    </footer>
  );
}
