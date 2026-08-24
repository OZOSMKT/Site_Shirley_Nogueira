import estilos from './Rotulo.module.css';

type Props = {
  children: React.ReactNode;
  /** Em fundo escuro o filete e o texto precisam da versão clara. */
  claro?: boolean;
  className?: string;
};

/**
 * Sobretítulo de seção: filete dourado curto + texto em caixa alta espaçada.
 * Detalhe discreto que dá ritmo às seções sem introduzir decoração pesada.
 */
export function Rotulo({ children, claro = false, className }: Props) {
  const classes = [estilos.rotulo, claro && estilos.claro, className].filter(Boolean).join(' ');
  return <span className={classes}>{children}</span>;
}
