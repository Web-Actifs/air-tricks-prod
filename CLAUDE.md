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

- **React** (Vite) — SPA avec React Router
- **Framer Motion** — animations et transitions de thème
- **i18next + react-i18next** — bilingue FR/EN
- **CSS Modules par thème** — chaque thème a son propre fichier CSS

## Architecture

### Système de 3 thèmes
Le site propose 3 designs **complets** (layout + style différents) avec switch animé :
- **Ocean** : cinématique, kitesurf, glassmorphism nav, vagues SVG
- **Code** : IDE/terminal, sidebar nav, fond sombre, néon vert/violet
- **Fusion** : hybride audacieux, split-screen, bento grid, gradient

Chaque thème a ses fichiers dans `src/themes/{ocean,code,fusion}/` :
- `*Layout.jsx` — navigation et layout spécifique au thème
- `*Hero.jsx`, `*Portfolio.jsx`, `*Services.jsx`, `*About.jsx`, `*Contact.jsx`
- `*.css` — CSS scopé avec variables CSS `[data-theme="..."]`

### Composants partagés (`src/components/`)
Utilisés par les 3 thèmes : `ProjectCard`, `VideoCard`, `ThemeSelector`, `LanguageToggle`, `Logo`, `Footer`, `TransitionOverlay`.

### Code splitting
Les thèmes sont lazy-loaded via `React.lazy()`. Seul le thème actif est chargé.

### Données (`src/data/projects.js`)
Projets web et vidéos YouTube avec descriptions FR/EN.

### Variables CSS requises par thème
Chaque fichier CSS de thème doit définir sous `[data-theme="xxx"]` :
`--color-bg`, `--color-bg-card`, `--color-bg-muted`, `--color-bg-glass`,
`--color-text`, `--color-text-muted`, `--color-primary`, `--color-primary-alpha`,
`--color-accent`, `--color-border`, `--color-shadow`, `--font-heading`, `--font-body`, `--radius`
