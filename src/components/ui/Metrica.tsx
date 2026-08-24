import estilos from './Metrica.module.css';

type Props = {
  valor: string;
  unidade: string;
  legenda: string;
};

/**
 * Número de destaque das métricas oficiais.
 *
 * Explora o contraste Antonio + Montserrat dentro do mesmo bloco, que o
 * DESIGN-SPEC §04 trata como característica fundamental da identidade: o
 * número em Antonio, a legenda em Montserrat.
 */
export function Metrica({ valor, unidade, legenda }: Props) {
  return (
    <div className={estilos.metrica}>
      <span className={estilos.valor}>{valor}</span>
      <span className={estilos.legenda}>
        {unidade}
        <br />
        {legenda}
      </span>
    </div>
  );
}
