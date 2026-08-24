import { Contato } from '@/components/sections/Contato';
import { Excelencia } from '@/components/sections/Excelencia';
import { Hero } from '@/components/sections/Hero';
import { Precisao } from '@/components/sections/Precisao';
import { Sobre } from '@/components/sections/Sobre';
import { Tecnologias } from '@/components/sections/Tecnologias';

/**
 * Landing page — narrativa única e contínua.
 *
 * A ordem das seções é obrigatória (DESIGN-SPEC §03) e não deve ser alterada
 * sem autorização: Hero → Sobre → Precisão → Tecnologias → Excelência →
 * Contato → Footer (montado no layout).
 */
export default function Pagina() {
  return (
    <>
      <Hero />
      <Sobre />
      <Precisao />
      <Tecnologias />
      <Excelencia />
      <Contato />
    </>
  );
}
