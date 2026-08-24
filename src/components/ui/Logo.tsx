import Image from 'next/image';
import { MARCA } from '@/data/contato';

type Forma = 'horizontal' | 'simbolo' | 'vertical';
type Cor = 'branca' | 'dourada' | 'cinza';

/**
 * Proporções reais dos recortes gerados por `scripts/optimize-assets.mjs`.
 * Declaradas aqui para que o next/image reserve o espaço correto e não haja
 * deslocamento de layout no carregamento.
 */
const DIMENSOES: Record<Forma, { width: number; height: number }> = {
  horizontal: { width: 720, height: 181 },
  simbolo: { width: 220, height: 618 },
  vertical: { width: 640, height: 309 },
};

type Props = {
  forma?: Forma;
  cor?: Cor;
  /** Altura renderizada em px. A largura acompanha a proporção. */
  altura: number;
  className?: string;
  priority?: boolean;
  /** Quando o logo é apenas decorativo — já existe texto equivalente por perto. */
  decorativo?: boolean;
};

export function Logo({
  forma = 'horizontal',
  cor = 'dourada',
  altura,
  className,
  priority = false,
  decorativo = false,
}: Props) {
  const { width, height } = DIMENSOES[forma];
  const largura = Math.round((width / height) * altura);

  return (
    <Image
      src={`/brand/${forma}-${cor}.webp`}
      alt={decorativo ? '' : MARCA.nome}
      aria-hidden={decorativo || undefined}
      width={largura}
      height={altura}
      className={className}
      priority={priority}
      quality={95}
    />
  );
}
