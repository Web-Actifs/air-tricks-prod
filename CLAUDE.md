# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Langue

Toujours répondre en français.

## Projet

**Air Tricks Prod** — site vitrine portfolio de Guillaume Etienne, développeur web freelance.
Le prompt de référence complet est dans `.claude/prompt-air-tricks-prod.md`.

## Commandes

```bash
npm run dev      # Dev server (Vite, port 5173)
npm run build    # Build production dans dist/
npm run preview  # Preview du build local
```

## Stack

- **React** (Vite) — SPA avec React Router v6
- **Framer Motion** — animations et transitions de thème
- **i18next + react-i18next** — bilingue FR/EN (fichiers dans `src/locales/fr.json` et `en.json`)
- **CSS scopé par thème** — chaque thème a son propre fichier CSS avec variables `[data-theme="xxx"]`

## Architecture

### Système de 3 thèmes
Le site propose 3 designs **complets** (layout + style différents) avec switch animé :
- **Ocean** : cinématique, kitesurf, glassmorphism nav, vagues SVG
- **Code** : IDE/terminal, sidebar nav fixe (72px → 220px au hover), fond sombre, néon vert/violet
- **Fusion** : hybride audacieux, split-screen hero, bento grid, gradient cyan/violet

Chaque thème a ses fichiers dans `src/themes/{ocean,code,fusion}/` :
- `*Layout.jsx` — navigation et layout spécifique au thème (reçoit `{children}`, PAS `<Outlet />`)
- `*Hero.jsx`, `*Portfolio.jsx`, `*Services.jsx`, `*About.jsx`, `*Contact.jsx`
- `*.css` — CSS scopé avec variables CSS `[data-theme="..."]`

### Composants partagés (`src/components/`)
- `ProjectCard` — carte projet avec screenshot Microlink, spinner de chargement, fallback sur erreur
- `VideoCard` — carte vidéo YouTube
- `ThemeSelector` — boussole flottante (coin bas-droit), ouvre 3 options en cercle (angles 90°/135°/180°)
- `LanguageToggle` — switch FR/EN
- `Logo` — affiche "Air Tricks" + "Prod", props `size`: `default`/`small`/`large`
- `Footer` — avec lien vers `/legal`
- `TransitionOverlay` — overlay d'animation lors du switch de thème

### Pages (`src/pages/`)
Chaque page (sauf LegalPage) charge le composant du thème actif via `useTheme()` + `React.lazy()` :
- `HomePage`, `PortfolioPage`, `ServicesPage`, `AboutPage`, `ContactPage`
- `LegalPage` — page statique (mentions légales + RGPD), même rendu quel que soit le thème

### Routes (`src/App.jsx`)
```
/           → HomePage
/portfolio  → PortfolioPage
/services   → ServicesPage
/about      → AboutPage
/contact    → ContactPage
/legal      → LegalPage
```
`ThemeSelector` et `TransitionOverlay` sont **en dehors** des layouts, rendus globalement.

### Code splitting
Les thèmes et pages sont lazy-loaded via `React.lazy()`. Seul le thème actif est chargé.

### Données (`src/data/projects.js`)
Projets web (avec screenshots auto via Microlink) et vidéos YouTube, descriptions FR/EN.
```js
const screenshot = (url) =>
  `https://api.microlink.io?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`;
```

### Variables CSS requises par thème
Chaque fichier CSS de thème doit définir sous `[data-theme="xxx"]` :
`--color-bg`, `--color-bg-card`, `--color-bg-muted`, `--color-bg-glass`,
`--color-text`, `--color-text-muted`, `--color-primary`, `--color-primary-alpha`,
`--color-accent`, `--color-border`, `--color-shadow`, `--font-heading`, `--font-body`, `--radius`

## Bugs connus résolus (historique)

### ThemeSelector
- L'animation SVG (`motion.line` avec `originX`) causait une barre orange parasite → remplacé par CSS `animation: compass-idle 8s linear infinite` sur `<line>` natif
- Les options débordaient hors écran → ajout d'un wrapper `.theme-selector__anchor` (56×56px) comme référence de positionnement ; angles 90°/135°/180° (quadrant haut-gauche)

### Thème Ocean
- La vague du hero s'ouvrait au scroll (gap visible) → `waveY` parallax supprimé sur `.ocean-hero__wave`, qui reste fixe en `position: absolute; bottom: -2px`

### Thème Code (desktop)
- Logo "Air Tricks Prod" dépassait de la sidebar repliée (72px) → monogramme "A" affiché quand replié, logo complet au hover via swap CSS opacity/absolute
- Le titre/monogramme est un lien `NavLink` vers `/`

### Thème Code (mobile)
- Scroll horizontal : `.code-layout` était `display: flex` row → ajout `flex-direction: column` + `overflow-x: hidden`
- Nav mobile disparaissait au scroll : `position: sticky` cassé par `overflow-x: hidden` → remplacé par `position: fixed; top: 0` avec `padding-top: 52px` sur `.code-content`
- Menu mobile : rendu conditionnel React + `position: fixed; top: 52px; left: 0; right: 0; bottom: 0; z-index: 199` pour overlay plein écran

### Thème Fusion (desktop)
- Hero trop grand (100vh) → `height: 78vh; min-height: 520px; max-height: 800px`
- Bouton secondaire illisible → `background: rgba(0,0,0,0.35); border: 2px solid rgba(255,255,255,0.7)`
- Grilles en 1 colonne → portfolio web : `repeat(3, 1fr)` + bento items 1&4 en span 2 ; vidéos : `repeat(3, 1fr)` ; services : `repeat(3, 1fr)`
- Icônes SVG services pleine largeur → `width: 40px; height: 40px` fixe

## Légal
- Page `/legal` : mentions légales + politique de confidentialité RGPD
- SIRET : 534 705 876 00033 — Auto-entrepreneur — Guillaume Etienne
- Adresse : 165 chemin des érables, 01600 Saint Bernard
- Email dans `LegalPage.jsx` : placeholder `contact@airtricksprod.fr` **à remplacer** par le vrai email
- Hébergeur déclaré : Vercel Inc.

## Déploiement
- Hébergement cible : **Vercel** (via GitHub)
- Processus : `git push` → Vercel détecte automatiquement Vite → build + deploy
