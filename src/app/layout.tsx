import type { Metadata, Viewport } from 'next';
import { Antonio, Montserrat } from 'next/font/google';
import { Cabecalho } from '@/components/layout/Cabecalho';
import { Rodape } from '@/components/layout/Rodape';
import { dadosEstruturados, SITE, SITE_URL } from '@/lib/site';
import './globals.css';

/**
 * Fontes servidas pelo próprio domínio: o next/font baixa e hospeda os arquivos
 * no build, então não há requisição a domínio externo em produção nem
 * deslocamento de layout no carregamento.
 */
const antonio = Antonio({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  variable: '--font-antonio',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE.titulo,
  description: SITE.descricao,
  applicationName: SITE.tituloCurto,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE_URL,
    siteName: SITE.tituloCurto,
    title: SITE.titulo,
    description: SITE.descricao,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: SITE.tituloCurto }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.titulo,
    description: SITE.descricao,
    images: ['/og.png'],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#3c2e23',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${antonio.variable} ${montserrat.variable}`}>
      <body>
        <a className="pularParaConteudo" href="#conteudo">
          Pular para o conteúdo
        </a>
        <Cabecalho />
        <main id="conteudo">{children}</main>
        <Rodape />
        <script
          type="application/ld+json"
          // Conteúdo estático definido em código, sem entrada de usuário.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(dadosEstruturados()) }}
        />
      </body>
    </html>
  );
}
