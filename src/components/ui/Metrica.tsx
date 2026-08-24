import estilos from './Metrica.module.css';

type Props = {
  valor: string;
  legenda: string;
};

/**
 * Número de destaque das métricas oficiais.
 *
 * Explora o contraste Antonio + Montserrat dentro do mesmo bloco, que o
 * DESIGN-SPEC §04 trata como característica fundamental da identidade: o
 * número em Antonio, a legenda em Montserrat.
 *
 * As cores saem de custom properties para que o mesmo componente sirva ao card
 * dourado da seção Sobre e a qualquer fundo claro, sem variantes duplicadas.
 */
export function Metrica({ valor, legenda }: Props) {
  return (
    <div className={estilos.metrica}>
      <span className={estilos.valor}>{valor}</span>
      <span className={estilos.legenda}>{legenda}</span>
    </div>
  );
}
