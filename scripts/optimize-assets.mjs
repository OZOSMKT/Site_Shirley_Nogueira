/**
 * Pipeline de otimização dos assets oficiais.
 *
 * Lê os arquivos entregues pelo cliente em `design/assets/` e grava as versões
 * prontas para web em `public/`. Roda com `npm run assets`.
 *
 * Os três grupos recebem tratamentos diferentes:
 *
 * 1. BRANDING — os arquivos `.svg` entregues não são vetores. Cada um embute a
 *    MESMA folha PNG de 4096x4096 em base64 e recorta uma região dela através
 *    de um `<pattern>` do Figma. Isso significa ~600 KB por arquivo (5,4 MB no
 *    total) sem nenhuma vantagem de vetor. Aqui a folha é extraída uma única
 *    vez e cada logo é recortado na região exata indicada pela matriz de
 *    transformação do SVG original.
 *
 * 2. FOTOGRAFIAS — apesar de serem RGBA, o canal alfa é opaco: são fotos
 *    retangulares, não recortes. Convertidas para WebP sem alterar dimensão nem
 *    proporção.
 *
 * 3. EQUIPAMENTOS — recortes com transparência real. Convertidos para WebP
 *    preservando o canal alfa e as dimensões originais.
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'design', 'assets');
const OUT = path.join(ROOT, 'public');

/**
 * Regiões extraídas das matrizes `patternTransform` dos SVGs originais.
 * Cada SVG usa `matrix(sx 0 0 sy tx ty)` em unidades de objectBoundingBox sobre
 * a folha de 4096x4096, o que resolve para um recorte 1:1 em pixels.
 */
const SHEET = 4096;
const LOGO_CROPS = {
  horizontal: { left: 890, top: 1757, width: 2317, height: 582 },
  simbolo: { left: 1631, top: 876, width: 834, height: 2343 },
  vertical: { left: 872, top: 1478, width: 2352, height: 1136 },
};

/** Largura de saída por forma — dimensionada para o maior uso real na página. */
const LOGO_WIDTH = { horizontal: 720, simbolo: 220, vertical: 640 };

const LOGO_VARIANTS = [
  { forma: 'horizontal', cor: 'branca' },
  { forma: 'horizontal', cor: 'dourada' },
  { forma: 'horizontal', cor: 'cinza' },
  { forma: 'simbolo', cor: 'branca' },
  { forma: 'simbolo', cor: 'dourada' },
  { forma: 'vertical', cor: 'branca' },
];

const PHOTOS = [
  { from: ['doutora', 'hero', 'IMG_5625 1.png'], to: 'images/doutora/hero-shirley' },
  { from: ['doutora', 'sobre', 'IMG_7591 1.png'], to: 'images/doutora/sobre-shirley' },
  { from: ['doutora', 'precisão', 'IMG_7604 1.png'], to: 'images/doutora/precisao-shirley' },
  { from: ['doutora', 'excelência', 'IMG_7575 2.png'], to: 'images/doutora/excelencia-shirley' },
];

const EQUIPMENT = [
  { file: 'Centurion.png', slug: 'centurion' },
  { file: 'Fotona sp.png', slug: 'fotona-sp' },
  { file: 'Fotona Starwalker.png', slug: 'fotona-starwalker' },
  { file: 'Hybrid.png', slug: 'hybrid' },
  { file: 'Liftera.png', slug: 'liftera' },
  { file: 'Quadripico.png', slug: 'quadripico' },
  { file: 'Redtouch.png', slug: 'redtouch' },
];

async function ensureDir(file) {
  await fs.mkdir(path.dirname(file), { recursive: true });
}

/** Extrai o PNG embutido em base64 de dentro de um SVG exportado pelo Figma. */
async function extractEmbeddedPng(svgPath) {
  const svg = await fs.readFile(svgPath, 'utf8');
  const match = svg.match(/base64,([A-Za-z0-9+/=]+)/);
  if (!match) throw new Error(`Nenhum PNG embutido em ${path.basename(svgPath)}`);
  return Buffer.from(match[1], 'base64');
}

async function buildLogos() {
  const results = [];

  for (const { forma, cor } of LOGO_VARIANTS) {
    const svgName = `LOGO ${forma.toUpperCase()} ${cor.toUpperCase()} 1.svg`;
    const sheet = await extractEmbeddedPng(path.join(SRC, 'branding', svgName));

    const meta = await sharp(sheet).metadata();
    if (meta.width !== SHEET || meta.height !== SHEET) {
      throw new Error(`${svgName}: esperava folha ${SHEET}x${SHEET}, veio ${meta.width}x${meta.height}`);
    }

    const out = path.join(OUT, 'brand', `${forma}-${cor}.webp`);
    await ensureDir(out);

    const info = await sharp(sheet)
      .extract(LOGO_CROPS[forma])
      .resize({ width: LOGO_WIDTH[forma], kernel: 'lanczos3' })
      .webp({ quality: 92, alphaQuality: 100, effort: 6 })
      .toFile(out);

    results.push({ nome: `${forma}-${cor}.webp`, w: info.width, h: info.height, kb: info.size / 1024 });
  }

  return results;
}

async function buildPhotos() {
  const results = [];

  for (const photo of PHOTOS) {
    const input = path.join(SRC, ...photo.from);
    const out = path.join(OUT, `${photo.to}.webp`);
    await ensureDir(out);

    // `flatten` remove o canal alfa opaco: as fotos não são recortes, e sem alfa
    // o WebP fica sensivelmente menor sem nenhuma perda visual.
    const info = await sharp(input)
      .flatten({ background: '#ffffff' })
      .webp({ quality: 86, effort: 6 })
      .toFile(out);

    results.push({ nome: `${photo.to}.webp`, w: info.width, h: info.height, kb: info.size / 1024 });
  }

  return results;
}

async function buildEquipment() {
  const results = [];

  for (const item of EQUIPMENT) {
    const input = path.join(SRC, 'tecnologias', item.file);
    const out = path.join(OUT, 'images', 'tecnologias', `${item.slug}.webp`);
    await ensureDir(out);

    // Transparência preservada: os equipamentos precisam do alfa para compor
    // sobre o fundo do card.
    const info = await sharp(input)
      .webp({ quality: 88, alphaQuality: 100, effort: 6 })
      .toFile(out);

    results.push({ nome: `${item.slug}.webp`, w: info.width, h: info.height, kb: info.size / 1024 });
  }

  return results;
}

/**
 * Favicon e ícone de app a partir do símbolo dourado.
 *
 * O símbolo é alto e estreito (834x2343), então não funciona recortado num
 * quadrado: ele é reduzido pela altura e centralizado sobre o marrom
 * institucional, que garante contraste em abas claras e escuras.
 */
async function buildIcons() {
  const sheet = await extractEmbeddedPng(path.join(SRC, 'branding', 'LOGO SIMBOLO DOURADA 1.svg'));
  const results = [];

  for (const size of [180, 512]) {
    const glyphHeight = Math.round(size * 0.62);
    const glyph = await sharp(sheet)
      .extract(LOGO_CROPS.simbolo)
      .resize({ height: glyphHeight, kernel: 'lanczos3' })
      .png()
      .toBuffer();

    const out = path.join(ROOT, 'src', 'app', size === 180 ? 'apple-icon.png' : 'icon.png');
    const info = await sharp({
      create: { width: size, height: size, channels: 4, background: '#3C2E23' },
    })
      .composite([{ input: glyph, gravity: 'centre' }])
      .png()
      .toFile(out);

    results.push({ nome: path.basename(out), w: info.width, h: info.height, kb: info.size / 1024 });
  }

  return results;
}

/**
 * Imagem de Open Graph (1200x630).
 *
 * Composta apenas com a marca sobre o marrom institucional. O título e a
 * descrição já viajam nos metadados; nada de texto é desenhado aqui, o que
 * evita depender de fontes instaladas no sistema que roda o script.
 */
async function buildOpenGraph() {
  const L = 1200;
  const A = 630;

  const sheet = await extractEmbeddedPng(path.join(SRC, 'branding', 'LOGO HORIZONTAL BRANCA 1.svg'));
  const marca = await sharp(sheet)
    .extract(LOGO_CROPS.horizontal)
    .resize({ width: 560, kernel: 'lanczos3' })
    .png()
    .toBuffer();

  const filete = Buffer.from(
    `<svg width="${L}" height="${A}" xmlns="http://www.w3.org/2000/svg">
       <rect x="470" y="418" width="260" height="1" fill="#D0A568"/>
     </svg>`,
  );

  const out = path.join(OUT, 'og.png');
  await ensureDir(out);

  const info = await sharp({ create: { width: L, height: A, channels: 4, background: '#3C2E23' } })
    .composite([
      { input: marca, top: Math.round(A / 2 - 70), left: Math.round(L / 2 - 280) },
      { input: filete, top: 0, left: 0 },
    ])
    .png()
    .toFile(out);

  return [{ nome: 'og.png', w: info.width, h: info.height, kb: info.size / 1024 }];
}

function report(titulo, linhas) {
  console.log(`\n${titulo}`);
  for (const l of linhas) {
    console.log(`  ${l.nome.padEnd(42)} ${String(l.w).padStart(5)}x${String(l.h).padEnd(5)} ${l.kb.toFixed(1).padStart(7)} KB`);
  }
  const total = linhas.reduce((acc, l) => acc + l.kb, 0);
  console.log(`  ${'total'.padEnd(42)} ${''.padStart(11)} ${total.toFixed(1).padStart(7)} KB`);
}

const logos = await buildLogos();
const photos = await buildPhotos();
const equipment = await buildEquipment();
const icons = await buildIcons();
const og = await buildOpenGraph();

report('BRANDING', logos);
report('FOTOGRAFIAS', photos);
report('EQUIPAMENTOS', equipment);
report('ÍCONES', icons);
report('OPEN GRAPH', og);
console.log('\nAssets gerados em public/.\n');
