# Shirley Dermatologia — Guia de Assets

Este documento é a referência oficial para os assets visuais do projeto.

O Claude deve ler este arquivo antes de implementar qualquer seção visual.

> **Regra geral:** os assets classificados como `FIXO` devem ser utilizados na função indicada. É permitido ajustar escala, crop, enquadramento, posicionamento, sombra, máscara e tratamento visual quando isso fizer parte da composição, mas não substituir o asset por outro sem autorização.

---

## 1. Estrutura

```text
assets/
├── branding/
├── doutora/
│   ├── excelência/
│   ├── hero/
│   ├── precisão/
│   └── sobre/
└── tecnologias/
```

A organização é feita por **função no site**, e não apenas por tipo de arquivo.

---

# 2. Fotografias da Dra. Shirley

## 2.1 Hero

**Arquivo atual**
```text
assets/doutora/hero/IMG_5625 1.png
```

**Função**
Imagem principal da primeira seção / Hero.

**Status**
`FIXO`

**Direção**
A fotografia deve dividir visualmente a atenção com o texto do Hero.

Pode ser:
- redimensionada;
- reposicionada;
- recortada;
- enquadrada de forma diferente;
- integrada à composição com espaço negativo.

Não deve ser substituída por outro retrato sem autorização.

**Dimensão original**
399 × 511 px — PNG com transparência (RGBA).

---

## 2.2 Sobre a Dra. Shirley

**Arquivo atual**
```text
assets/doutora/sobre/IMG_7591 1.png
```

**Função**
Fotografia da seção “Sobre a Dra. Shirley”.

**Status**
`FIXO`

**Direção**
Preservar a ideia de fotografia + card sobreposto com os destaques da Dra. Shirley.

O card pode ser refinado visualmente, mas a fotografia deve permanecer como elemento principal da composição.

**Dimensão original**
377 × 538 px — PNG com transparência (RGBA).

---

## 2.3 Precisão

**Arquivo atual**
```text
assets/doutora/precisão/IMG_7604 1.png
```

**Função**
Fotografia da seção “PRECISÃO — Em cada tecnologia”.

**Status**
`FIXO`

**Direção**
Esta é a fotografia da Dra. Shirley com os braços abertos, relacionada visualmente às tecnologias.

A composição deve preservar:
- a Dra. Shirley;
- a relação com as tecnologias;
- o símbolo/logo central;
- a função de transição entre “Sobre” e “Tecnologias”.

Pode haver bastante liberdade na composição, mas não substituir a fotografia.

**Dimensão original**
1079 × 609 px — PNG com transparência (RGBA).

---

## 2.4 Conhecimento / Excelência

**Arquivo atual**
```text
assets/doutora/excelência/IMG_7575 2.png
```

**Função**
Fotografia da seção “Conhecimento que gera Excelência”.

**Status**
`FIXO`

**Direção**
Esta seção possui maior liberdade criativa de composição.

A fotografia deve ser tratada como elemento editorial e pode interagir visualmente com a tipografia e o espaço negativo.

**Dimensão original**
483 × 588 px — PNG com transparência (RGBA).

---

# 3. Tecnologias

Os sete equipamentos abaixo são assets oficiais fornecidos para o carrossel de tecnologias.

Todos são PNGs com transparência.

**Regra fundamental:**
os equipamentos possuem proporções muito diferentes. Não distorcer nem forçar todos a uma escala idêntica.

Os cards devem possuir dimensões consistentes, enquanto cada equipamento deve receber uma escala e posicionamento individual para obter **peso visual semelhante**.

---

## 3.1 Centurion

**Arquivo atual**
```text
assets/tecnologias/Centurion.png
```

**Status**
`FIXO`

**Uso**
Card da tecnologia Centurion.

**Dimensão original**
497 × 1180 px — PNG com transparência (RGBA).

---

## 3.2 Fotona SP

**Arquivo atual**
```text
assets/tecnologias/Fotona sp.png
```

**Status**
`FIXO`

**Uso**
Card da tecnologia Fotona SP.

**Dimensão original**
688 × 1640 px — PNG com transparência (RGBA).

---

## 3.3 Fotona Starwalker

**Arquivo atual**
```text
assets/tecnologias/Fotona Starwalker.png
```

**Status**
`FIXO`

**Uso**
Card da tecnologia Fotona Starwalker.

**Dimensão original**
644 × 1641 px — PNG com transparência (RGBA).

---

## 3.4 Hybrid

**Arquivo atual**
```text
assets/tecnologias/Hybrid.png
```

**Status**
`FIXO`

**Uso**
Card da tecnologia Hybrid.

**Dimensão original**
590 × 1925 px — PNG com transparência (RGBA).

---

## 3.5 Liftera

**Arquivo atual**
```text
assets/tecnologias/Liftera.png
```

**Status**
`FIXO`

**Uso**
Card da tecnologia Liftera.

**Dimensão original**
564 × 1165 px — PNG com transparência (RGBA).

---

## 3.6 Quadripico

**Arquivo atual**
```text
assets/tecnologias/Quadripico.png
```

**Status**
`FIXO`

**Uso**
Card da tecnologia Quadripico.

**Dimensão original**
617 × 1525 px — PNG com transparência (RGBA).

---

## 3.7 RedTouch

**Arquivo atual**
```text
assets/tecnologias/Redtouch.png
```

**Status**
`FIXO`

**Uso**
Card da tecnologia RedTouch.

**Dimensão original**
679 × 1947 px — PNG com transparência (RGBA).

---

# 4. Direção visual dos assets de tecnologia

Os equipamentos devem ser apresentados como **objetos de direção de arte**, e não como imagens convencionais dentro de retângulos.

O Claude pode criar/refinar:
- fundo dos cards;
- iluminação;
- sombra;
- gradiente muito sutil;
- espaço negativo;
- enquadramento;
- escala individual;
- posição individual.

### Não fazer

- não distorcer equipamentos;
- não alterar proporções;
- não usar a mesma escala matemática para todos;
- não deixar aparelhos pequenos demais apenas porque o PNG possui muito espaço transparente;
- não criar aparência de catálogo/ecommerce;
- não adicionar elementos decorativos desnecessários.

### Objetivo

> **Mesmo peso visual, não necessariamente o mesmo tamanho físico.**

---

# 5. Branding

Os arquivos oficiais de identidade visual estão em:

```text
assets/branding/
```

## Logos horizontais

```text
LOGO HORIZONTAL BRANCA 1.svg
LOGO HORIZONTAL CINZA 1.svg
LOGO HORIZONTAL DOURADA 1.svg
```

Uso:
- versão branca: fundos escuros;
- versão cinza: situações em que o contraste neutro for mais adequado;
- versão dourada: uso pontual e sofisticado, especialmente quando houver contraste suficiente.

## Símbolos

```text
LOGO SIMBOLO BRANCA 1.svg
LOGO SIMBOLO CINZA 1.svg
LOGO SIMBOLO DOURADA 1.svg
```

Uso:
- favicon/assinatura;
- detalhes editoriais;
- composição da seção “Precisão”, quando apropriado;
- situações em que a logo completa ocuparia espaço demais.

## Logos verticais

```text
LOGO VERTICAL BRANCA 1.svg
LOGO VERTICAL CINZA 1.svg
LOGO VERTICAL DOURADA 1.svg
```

Uso:
- somente quando a composição exigir uma assinatura vertical.

### Regra de branding

Não modificar o desenho das logos.

Escolher a versão de acordo com:
- contraste;
- fundo;
- hierarquia;
- contexto.

Evitar usar a versão dourada em excesso.

---

# 6. Tipografia

As fontes não fazem parte deste pacote de assets.

A identidade tipográfica oficial já está definida no Design Specification:

- **Primária:** Antonio
- **Secundária/destaque:** Montserrat

O projeto deve utilizar essas famílias conforme a especificação visual.

---

# 7. Regras de substituição

### `FIXO`
Usar obrigatoriamente na função indicada.

### `ALTERNATIVA`
Pode ser utilizada somente quando houver mais de um asset aprovado para a mesma função.

### `LIVRE`
O Claude pode selecionar entre assets disponíveis ou propor uma solução visual.

Atualmente, as fotografias da Dra. Shirley e os sete equipamentos estão classificados como `FIXO`.

---

# 8. Regras para implementação

1. Não inventar imagens que não existam nos assets quando uma imagem oficial já estiver definida.
2. Não substituir uma fotografia `FIXO` por stock photography.
3. Não substituir os equipamentos oficiais por imagens encontradas na internet.
4. Não incorporar imagens diretamente em código como base64.
5. Manter os assets como arquivos separados.
6. Usar caminhos relativos ao projeto.
7. Otimizar imagens para web quando necessário, preservando qualidade visual.
8. Preservar transparência dos PNGs dos equipamentos.
9. Não alterar proporções das imagens.
10. Não criar dependência de arquivos presentes apenas na máquina do desenvolvedor.

---

# 9. Observação sobre nomes de arquivos

Os nomes atuais foram preservados para refletir os arquivos fornecidos pelo cliente.

Durante a implementação, se for tecnicamente útil, é permitido normalizar os nomes para formatos mais seguros para web, por exemplo:

```text
IMG_5625 1.png
→ hero-shirley.png

IMG_7591 1.png
→ sobre-shirley.png

IMG_7604 1.png
→ precisao-shirley.png

IMG_7575 2.png
→ excelencia-shirley.png

Fotona Starwalker.png
→ fotona-starwalker.png
```

Se os nomes forem normalizados, atualizar este documento para que ele continue refletindo os caminhos reais do projeto.

---

# 9.1 Caminhos reais no projeto implementado

> Esta seção foi acrescentada durante a implementação, conforme autorizado pelo item 9.

Os arquivos originais entregues pelo cliente foram **preservados sem alteração** em
`design/assets/`, mantendo os nomes de origem. Eles são a fonte do pipeline de
otimização e continuam sendo a referência para qualquer substituição futura.

As versões usadas pela aplicação são geradas por `scripts/optimize-assets.mjs`
(`npm run assets`) e ficam em `public/`, com nomes normalizados:

## Fotografias

| Origem (`design/assets/`) | Saída (`public/`) | Dimensão |
|---|---|---|
| `doutora/hero/IMG_5625 1.png` | `images/doutora/hero-shirley.webp` | 399 × 511 |
| `doutora/sobre/IMG_7591 1.png` | `images/doutora/sobre-shirley.webp` | 377 × 538 |
| `doutora/precisão/IMG_7604 1.png` | `images/doutora/precisao-shirley.webp` | 1079 × 609 |
| `doutora/excelência/IMG_7575 2.png` | `images/doutora/excelencia-shirley.webp` | 483 × 588 |

> **Correção ao item 2 deste documento.** As quatro fotografias são RGBA, mas o
> canal alfa é **opaco**: são fotos retangulares completas, não recortes. A
> composição de cada seção foi construída com enquadramento, máscara e
> `object-position`, não com a figura recortada sobre o fundo.

## Equipamentos

| Origem (`design/assets/tecnologias/`) | Saída (`public/images/tecnologias/`) |
|---|---|
| `Centurion.png` | `centurion.webp` |
| `Fotona sp.png` | `fotona-sp.webp` |
| `Fotona Starwalker.png` | `fotona-starwalker.webp` |
| `Hybrid.png` | `hybrid.webp` |
| `Liftera.png` | `liftera.webp` |
| `Quadripico.png` | `quadripico.webp` |
| `Redtouch.png` | `redtouch.webp` |

Transparência, proporção e dimensão originais preservadas. A escala e o
enquadramento individuais de cada aparelho ficam em `src/data/tecnologias.ts`
(`escala` e `deslocamentoY`), não no CSS.

> **Observação sobre os arquivos.** O lettering impresso em alguns PNGs apresenta
> defeitos de renderização: o Centurion mostra “CENIURIO” na carcaça e o Fotona
> StarWalker aparece espelhado, com o nome lido ao contrário. Os assets foram
> usados como entregues, sem edição. Se houver versões corrigidas, basta
> substituí-las em `design/assets/tecnologias/` e rodar `npm run assets`.

## Branding

Os nove arquivos `.svg` entregues **não são vetores**. Cada um embute a mesma
folha PNG de 4096 × 4096 em base64 e recorta uma região dela através de um
`<pattern>` exportado pelo Figma — cerca de 600 KB por arquivo, **5,4 MB no
total**, sem qualquer vantagem de escalabilidade.

O pipeline extrai a folha uma única vez e recorta a região exata de cada variante,
lida a partir da matriz de transformação do próprio SVG:

| Forma | Região na folha 4096² | Recorte |
|---|---|---|
| Horizontal | (890, 1757) | 2317 × 582 |
| Símbolo | (1631, 876) | 834 × 2343 |
| Vertical | (872, 1478) | 2352 × 1136 |

| Saída (`public/brand/`) | Uso |
|---|---|
| `horizontal-dourada.webp` | Header |
| `horizontal-branca.webp` | Rodapé e Open Graph |
| `horizontal-cinza.webp` | Reserva para fundos neutros |
| `simbolo-dourada.webp` | Divisão central da seção Precisão, favicon |
| `simbolo-branca.webp` | Reserva para fundos escuros |
| `vertical-branca.webp` | Reserva para assinatura vertical |

O conjunto passa de **5,4 MB para menos de 160 KB**. O desenho das logos não foi
modificado — apenas recortado da folha e convertido.

> **Pendência de branding.** O resultado continua sendo raster. Se existir o
> arquivo vetorial real da marca (`.ai`, `.eps` ou SVG em curvas), ele deve
> substituir este pipeline: a marca no header ganharia nitidez perfeita em
> qualquer densidade de tela.

## Derivados

| Arquivo | Origem |
|---|---|
| `src/app/icon.png` (512 × 512) | Símbolo dourado sobre o marrom institucional |
| `src/app/apple-icon.png` (180 × 180) | Idem |
| `public/og.png` (1200 × 630) | Logo horizontal branca sobre o marrom, com filete dourado |

---

# 10. Fonte de verdade

Este arquivo deve ser utilizado em conjunto com:

```text
DESIGN-SPEC.md
README.md
```

### Prioridade

1. Informações factuais fornecidas pelo cliente;
2. `DESIGN-SPEC.md`;
3. `ASSETS.md`;
4. Figma como referência visual;
5. referências externas como inspiração de interação, nunca como identidade a ser copiada.

Quando houver conflito entre uma referência visual e uma regra explícita deste documento, seguir a regra explícita.

---

## Objetivo final

Os assets devem ser utilizados para construir uma experiência visual:

**minimalista · sofisticada · editorial · médica · contemporânea · premium**

sem excesso de efeitos, sem aparência de template e sem descaracterizar a identidade da Dra. Shirley.
