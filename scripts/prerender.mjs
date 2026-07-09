// Prérendu statique post-build : génère dist/<route>/index.html pour chaque route
// afin que les crawlers sans JavaScript (GPTBot, ClaudeBot, PerplexityBot…) voient le contenu.
// S'exécute après `vite build` (client) et `vite build --ssr` (voir package.json).

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const BASE_URL = 'https://airtricksprod.fr';

const { render, getMeta, webProjects } = await import(
  pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href
);

const routes = [
  '/',
  '/portfolio',
  '/services',
  '/about',
  '/contact',
  '/faq',
  '/legal',
  ...webProjects.map((p) => `/portfolio/${p.id}`),
];

const template = readFileSync(resolve(root, 'dist/index.html'), 'utf-8');

// Les CSS des chunks lazy (thèmes, pages) ne sont normalement injectés que par JS.
// On les référence dans le <head> pour que le HTML prérendu soit stylé sans JavaScript
// (le scoping [data-theme] garantit que seul le thème par défaut s'applique).
const cssLinks = readdirSync(resolve(root, 'dist/assets'))
  .filter((f) => f.endsWith('.css'))
  .map((f) => `    <link rel="stylesheet" href="/assets/${f}">`)
  .join('\n');

const escapeAttr = (s) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

for (const route of routes) {
  const appHtml = await render(route);
  const meta = getMeta(route);
  const canonical = route === '/' ? `${BASE_URL}/` : `${BASE_URL}${route}`;

  let html = template
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
    .replace('<html lang="fr">', '<html lang="fr" data-theme="code">')
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${canonical}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${canonical}$2`)
    .replace('</head>', `${cssLinks}\n  </head>`);

  if (meta) {
    const title = escapeAttr(meta.title);
    const description = escapeAttr(meta.description);
    html = html
      .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
      .replace(/(<meta name="description" content=")[^"]*(")/, `$1${description}$2`)
      .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${title}$2`)
      .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${description}$2`)
      .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${title}$2`)
      .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${description}$2`);
  }

  const outFile =
    route === '/'
      ? resolve(root, 'dist/index.html')
      : resolve(root, `dist${route}/index.html`);
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, html);
  console.log(`✓ prérendu ${route} (${(html.length / 1024).toFixed(1)} kB)`);
}

console.log(`\n${routes.length} routes prérendues.`);
