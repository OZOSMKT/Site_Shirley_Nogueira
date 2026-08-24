# Instituto Shirley Nogueira — Landing Page

Landing page da **Dra. Shirley Nogueira**, médica dermatologista em Goiânia (GO).

Não é um site institucional com várias páginas: é **uma única narrativa contínua**,
em sete seções, que apresenta a médica, sua experiência e as tecnologias do
consultório, e conduz o visitante até o contato.

---

## Objetivo

Comunicar autoridade médica, experiência e tecnologia com uma execução visual
minimalista e editorial — sem aparência de template de clínica e sem excesso de
efeitos. O caráter premium vem da tipografia, da fotografia, da proporção e do
espaço negativo, não da quantidade de recursos visuais.

---

## Tecnologias

| Camada | Escolha | Motivo |
|---|---|---|
| Framework | **Next.js 16** (App Router) | Integração direta com a Vercel, otimização de imagem e fontes self-hosted |
| Linguagem | **TypeScript** | Contratos explícitos entre dados e componentes |
| Estilo | **CSS Modules** + custom properties | Escopo automático e tokens centralizados, sem build extra |
| Fontes | **next/font/google** (Antonio, Montserrat) | Baixadas no build e servidas pelo próprio domínio: zero requisição externa |
| Imagens | **next/image** | Redimensionamento, formatos modernos e lazy loading |
| Pipeline de assets | **sharp** (apenas em `devDependencies`) | Recorte e conversão dos assets oficiais; não entra no bundle |

**Não há nenhuma dependência de produção além de `next`, `react` e `react-dom`.**
O carrossel, as animações e as interações dos cards são implementados com as APIs
da plataforma — sem biblioteca de carrossel, de animação ou de ícones.

---

## Estrutura

```text
design/assets/            assets originais entregues pelo cliente (fonte do pipeline)
scripts/
  optimize-assets.mjs     recorta, converte e otimiza os assets para public/
public/
  brand/                  logos recortados e otimizados
  images/doutora/         fotografias por seção
  images/tecnologias/     os 7 equipamentos, com transparência
  og.png                  imagem de compartilhamento
src/
  app/                    layout, página, tokens globais, sitemap, robots, ícones
  components/
    layout/               Cabecalho, Rodape
    sections/             Hero, Sobre, Precisao, Tecnologias, Excelencia, Contato
    technologies/         Carrossel, CardTecnologia
    ui/                   Botao, Logo, Metrica, Revelar, Rotulo
  data/                   conteúdo e dados oficiais, separados da apresentação
  hooks/                  useCarrossel
  lib/                    metadados do site e dados estruturados
DESIGN-SPEC.md            especificação visual e de produto (fonte de verdade)
ASSETS.md                 catálogo dos assets oficiais e suas regras de uso
```

### Conteúdo separado da apresentação

Todo texto e todo dado factual ficam em `src/data/`:

- `conteudo.ts` — textos das seções e navegação;
- `contato.ts` — endereço, telefone, Instagram e destino dos CTAs;
- `tecnologias.ts` — as 7 tecnologias, incluindo escala e enquadramento individuais.

Alterar um texto ou um número **não exige tocar em nenhum componente**.

---

## Instalação

Requer **Node.js 20 ou superior**.

```bash
npm install
```

## Desenvolvimento local

```bash
npm run dev
```

Disponível em `http://localhost:3000`.

## Comandos

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm start` | Sobe o build de produção localmente |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript sem emitir arquivos |
| `npm run assets` | Regera os assets de `public/` a partir de `design/assets/` |

### Sobre `npm run assets`

As saídas em `public/` **já estão versionadas** — o build funciona sem rodar este
comando. Ele só é necessário quando um asset original for substituído em
`design/assets/`.

O script faz três coisas:

1. **Branding.** Os `.svg` entregues não são vetores: cada um embute a mesma folha
   PNG de 4096×4096 em base64 e recorta uma região dela através de um `<pattern>`
   do Figma — cerca de 600 KB por arquivo, 5,4 MB no total. O script extrai a
   folha, recorta a região exata de cada variante e grava WebP. **O conjunto cai
   para menos de 160 KB.**
2. **Fotografias.** Convertidas para WebP sem alterar dimensão nem proporção.
3. **Equipamentos.** Convertidos para WebP com o canal alfa preservado.

Também gera o favicon, o ícone de app e a imagem de Open Graph.

---

## Build

```bash
npm run build
npm start
```

Antes de publicar, o conjunto completo de verificação:

```bash
npm ci && npm run typecheck && npm run lint && npm run build
```

---

## Deploy na Vercel

Fluxo: **GitHub → Vercel → deploy automático**. A branch `main` representa produção.

1. Importar o repositório na Vercel.
2. Nenhuma configuração é necessária — o Next.js é detectado automaticamente
   (build `next build`, sem diretório de saída customizado).
3. Após conectar o domínio, definir `NEXT_PUBLIC_SITE_URL` (ver abaixo).

O projeto é totalmente estático em tempo de build: não há rotas de API, banco de
dados ou serviços externos.

---

## Variáveis de ambiente

Uma única variável, **opcional**:

| Variável | Para que serve | Padrão |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL canônica usada em `canonical`, Open Graph, `sitemap.xml` e dados estruturados | Cai para a URL de produção da Vercel e, na ausência dela, para `https://institutoshirleynogueira.com.br` |

Defina-a nas configurações do projeto na Vercel assim que o domínio definitivo
estiver ativo. Não há segredos no projeto — nada precisa ser mantido fora do
repositório.

---

## Manutenção

### Trocar um texto
`src/data/conteudo.ts`. Os textos oficiais da seção **Sobre** e as métricas não
devem ser alterados sem autorização do cliente.

### Trocar telefone, endereço ou Instagram
`src/data/contato.ts`. É a fonte única — a seção Contato, o rodapé e os dados
estruturados leem daí.

### Ativar o WhatsApp
Trocar a constante `AGENDAMENTO_HREF` em `src/data/contato.ts` por
`https://wa.me/55...`. Todos os CTAs de agendamento passam a apontar para lá;
nenhum componente precisa ser alterado. O mesmo vale para `SAIBA_MAIS_HREF`.

### Alterar uma tecnologia
`src/data/tecnologias.ts`. Cada item traz:

- `resumo` — a linha curta do estado inicial do card;
- `descricao` — o texto revelado na expansão;
- `escala` e `deslocamentoY` — o enquadramento individual do equipamento.

Os equipamentos têm proporções muito diferentes e distribuem o peso visual de
formas distintas: Fotona SP e RedTouch, por exemplo, têm quase metade da altura
ocupada por um braço fino. Escala idêntica para todos faria esses aparelhos
parecerem minúsculos ao lado do Centurion. Por isso o par `escala` /
`deslocamentoY` existe — **mesmo peso visual, não o mesmo tamanho físico**.
`escala` é uniforme nos dois eixos: nenhuma proporção é distorcida.

### Trocar uma fotografia
Substituir o arquivo em `design/assets/doutora/<seção>/`, ajustar o caminho em
`scripts/optimize-assets.mjs` e rodar `npm run assets`. As fotografias oficiais
estão marcadas como `FIXO` no `ASSETS.md` e não devem ser trocadas por imagens de
banco.

### Adicionar uma seção
A ordem e a quantidade das sete seções são definidas pelo `DESIGN-SPEC.md` §03 e
**não devem ser alteradas sem autorização**.

---

## Acessibilidade

- Um único `h1`, hierarquia de headings sem saltos;
- navegação completa por teclado, incluindo o carrossel (setas ← →) e o menu
  mobile (foco preso, `Esc` fecha);
- foco sempre visível, com anel adaptado ao fundo claro ou escuro;
- carrossel com `aria-roledescription`, região `aria-live` e clones removidos da
  árvore de acessibilidade;
- a informação revelada nos cards **nunca depende de hover**: permanece no DOM e
  aparece também por foco de teclado e por toque;
- contraste verificado em todos os textos — o dourado é usado como acento e sobre
  fundo escuro, nunca como cor de texto sobre fundo claro;
- `prefers-reduced-motion` desliga transições, revelações e o autoplay.

---

## Integridade do conteúdo

Todo dado factual — formação, números, endereço, telefone, redes sociais — vem do
`DESIGN-SPEC.md` e do que o cliente forneceu, e é tratado como oficial.

As **descrições das sete tecnologias** foram escritas a partir da documentação
pública dos fabricantes, já que o cliente não forneceu textos. Descrevem o que
cada tecnologia é — princípio de funcionamento e área de atuação — sem promessa de
resultado, número de sessões ou indicação clínica individual. **Recomenda-se
validação médica antes da publicação.** O item marcado com `revisarConteudo: true`
em `src/data/tecnologias.ts` precisa de atenção prioritária.
