# Prompt Claude Code — Projet "Air Tricks Prod"

## Contexte du projet

Crée un site web vitrine professionnel pour **Air Tricks Prod**, l'activité de développeur web freelance de Gui. Le nom "Air Tricks Prod" vient de son parcours de vidéaste/monteur autour du **kitesurf** — cette double identité (créatif/technique) est au cœur de l'identité du site.

Le site doit être **classe, moderne, responsive**, et surtout embarquer un **système créatif de switch entre 3 designs complets** (thème visuel ET layout différent) — démontrant directement le savoir-faire technique du développeur.

---

## Stack technique

- **React** (Create React App ou Vite + React)
- **CSS Modules** ou **Styled Components** pour l'isolation des styles par thème
- **React Router** pour la navigation
- **Framer Motion** pour les animations et transitions entre thèmes
- **i18next + react-i18next** pour le bilingue FR/EN
- Structure de projet propre et modulaire, pensée pour la maintenance

---

## Architecture du système de thèmes

### Principe fondamental

Chaque thème est un **univers complet** : sa propre palette de couleurs, sa typographie, son ambiance, MAIS AUSSI son propre layout (disposition des sections, style de navigation, grilles différentes). Ce n'est pas un simple dark/light mode — c'est une refonte visuelle totale.

### Les 3 thèmes

#### 🌊 Thème 1 — "Ocean" (l'origine)
- **Ambiance** : Cinématique, fluide, immersive — l'univers du kitesurf et de la vidéo
- **Palette** : Bleus profonds, turquoise, blanc écume, touches de coucher de soleil (ambre/corail)
- **Typo** : Élégante et aérienne (ex: Playfair Display pour les titres, Lato pour le corps)
- **Layout** :
  - Navigation horizontale transparente avec effet glassmorphism
  - Hero en plein écran avec fond vidéo/image kite en arrière-plan, texte centré avec effet parallaxe
  - Sections en full-width avec scrolling fluide
  - Portfolio en galerie horizontale scrollable (style cinématique)
  - Formes organiques, courbes, vagues SVG animées entre les sections
- **Énergie** : "D'où je viens" — le créatif, le vent, la liberté

#### 💻 Thème 2 — "Code" (le présent)
- **Ambiance** : Tech, sharp, nocturne — l'univers du développement
- **Palette** : Fond sombre (#0a0a0f), néon vert/cyan (#00ff88, #00d4ff), accents violet (#8b5cf6)
- **Typo** : Monospace pour les titres (ex: JetBrains Mono, Fira Code), Inter ou Geist pour le corps
- **Layout** :
  - Navigation latérale fixe (sidebar) style éditeur de code
  - Hero avec animation de terminal/code qui s'écrit en temps réel
  - Sections en grille structurée, cards avec bordures néon subtiles
  - Portfolio en grille masonry avec hover effects techniques (glitch, scan lines)
  - Éléments UI inspirés des IDE : tabs, line numbers, syntax highlighting décoratif
- **Énergie** : "Ce que je fais" — la précision, la technique, la nuit

#### ⚡ Thème 3 — "Fusion" (la singularité)
- **Ambiance** : Hybride audacieux — quand le créatif rencontre le technique
- **Palette** : Gradient dynamique (du bleu océan au violet tech), fond clair/crème, accents vifs
- **Typo** : Sans-serif moderne et bold (ex: Clash Display ou Space Grotesk pour les titres, DM Sans pour le corps)
- **Layout** :
  - Navigation top sticky avec effet morphing au scroll
  - Hero en split-screen : moitié kite/vidéo, moitié code/tech, avec animation de fusion au centre
  - Sections en layout asymétrique / bento grid
  - Portfolio en cards 3D avec effet tilt au hover
  - Mix d'éléments organiques et géométriques, contrastes visuels forts
- **Énergie** : "Ce qui me rend unique" — la fusion des mondes, l'originalité

---

## Mécanisme de switch — L'expérience créative

### Le concept : "Le Sélecteur de Vent" 🌀

Un élément flottant persistant (visible sur toutes les pages, desktop et mobile) sous forme d'une **boussole/rose des vents stylisée** ou d'un **indicateur de vent** :

- **Position** : Coin inférieur droit, discret mais identifiable
- **Au repos** : Petite icône animée subtilement (rotation lente, pulse doux)
- **Au clic/tap** : S'ouvre en un sélecteur circulaire avec les 3 directions :
  - 🌊 Une direction pointe vers "Ocean"
  - 💻 Une direction pointe vers "Code"  
  - ⚡ Une direction pointe vers "Fusion"
- **Transition** : Quand l'utilisateur choisit un thème, la transition est **spectaculaire mais rapide** (~800ms) :
  - Effet de "vague" qui balaie l'écran (cohérent avec l'univers kite/vent)
  - Ou effet de "morph" fluide où les éléments se transforment
  - Les éléments du layout se réorganisent avec des animations staggered
- **Persistance** : Le choix est sauvegardé en localStorage
- **Premier accès** : Le site démarre sur le thème "Fusion" (le plus représentatif de l'identité globale)

### Version mobile
- Même sélecteur mais adapté tactile (légèrement plus grand, zone de tap confortable)
- Les transitions sont allégées pour la performance (moins de particules/effets lourds, mais toujours visuellement impactantes)

---

## Sections du site

### 1. Hero / Accueil
- **Contenu** : Nom "Air Tricks Prod", tagline percutante, CTA vers le portfolio ou contact
- **Chaque thème** a sa propre mise en scène du hero (cf. descriptions des thèmes)
- **Tagline suggérée** (à adapter) : "Du vent aux pixels — développeur web créatif" / "From wind to pixels — creative web developer"

### 2. Portfolio / Réalisations
- Affichage des **projets réels** listés dans la section "Portfolio — Projets web réels" ci-dessus
- **Section double** : projets web ET productions vidéo/kite (voir "Portfolio — Productions vidéo kitesurf")
- Filtrage par catégorie (Web / Vidéo / Tous)
- Les projets web affichent : screenshot du site (utiliser un service comme `https://api.microlink.io` ou un screenshot statique), titre, description technique, stack, lien externe
- Les vidéos s'affichent avec thumbnail YouTube, titre, description, embed au clic
- Composant `<ProjectCard />` pour le web et `<VideoCard />` pour les vidéos
- Le layout de cette section change radicalement selon le thème

### 3. Services / Compétences
- Ce que Gui propose comme développeur web freelance
- **Stack technique maîtrisée** : HTML5, CSS3 (Sass), JavaScript, React, Astro.js, responsive design, SEO
- **Background technique** : 15 ans d'ingénierie réseau (infrastructure, sécurité, architecture)
- **Atout créatif** : expérience vidéo/montage professionnel (storytelling visuel, UX, drone)
- Services : création de sites vitrines, intégration, refonte, maintenance, optimisation performance
- Présentation adaptée au thème (timeline, cards, ou visualisation créative)

### 4. À propos (intégré ou standalone)
- Le parcours : 15 ans d'ingénieur réseau → vidéaste kitesurf (Air Tricks Prod, partenaire Bilene Kite Center Mozambique) → reconversion développeur web certifié OpenClassrooms
- Storytelling court mais impactant : montrer la cohérence du parcours (technique réseau → créativité vidéo → fusion dans le dev web)
- Photo ou avatar

### 5. Contact
- Formulaire de contact (nom, email, message)
- Liens réseaux sociaux
- Call-to-action clair
- Le design du formulaire s'adapte au thème

---

## Bilingue FR/EN

- Système i18n complet avec **i18next**
- Toggle de langue visible dans la navigation (drapeau ou FR/EN)
- Tous les textes dans des fichiers de traduction JSON séparés (`/locales/fr.json`, `/locales/en.json`)
- Le switch de langue est indépendant du switch de thème
- URL localisées si possible (`/fr/`, `/en/`)

---

## Logo

Gui a un **logo existant** pour Air Tricks Prod. Prévoir :
- Un composant `<Logo />` qui accepte le logo en tant qu'image/SVG
- Le logo doit s'adapter visuellement à chaque thème (via filtre CSS, variantes de couleur, ou versions multiples)
- Emplacement : navigation + hero
- Placeholder par défaut si le logo n'est pas encore intégré

---

## Contenu média

Gui possède des **vidéos et visuels de kitesurf**. Prévoir :
- Support d'une vidéo de fond dans le hero du thème "Ocean" (balise `<video>` avec fallback image)
- Galerie photo/vidéo dans la section portfolio pour les productions kite
- Lazy loading et optimisation des médias
- Placeholders élégants en attendant les vrais assets

---

## Exigences techniques

### Performance
- Lazy loading des images et composants lourds
- Code splitting par thème (ne pas charger les 3 thèmes d'un coup)
- Animations respectueuses de `prefers-reduced-motion`
- Score Lighthouse visé : > 90 en performance

### Responsive
- Mobile-first
- Breakpoints : mobile (< 768px), tablette (768-1024px), desktop (> 1024px)
- Chaque thème a ses propres adaptations responsive
- Le switch de thème fonctionne parfaitement sur mobile

### Accessibilité
- Sémantique HTML correcte (landmarks, headings hiérarchiques)
- Navigation au clavier complète
- Contrastes suffisants dans les 3 thèmes
- Attributs ARIA sur les éléments interactifs (sélecteur de thème, formulaire, etc.)
- `aria-live` pour annoncer les changements de thème

### SEO
- Balises meta dynamiques par page et par langue
- Open Graph tags
- Structure de données JSON-LD (LocalBusiness / Person)
- Sitemap
- Balises `hreflang` pour le bilingue

### Code quality
- Structure de dossiers claire et modulaire :
  ```
  src/
  ├── components/          # Composants partagés
  ├── themes/
  │   ├── ocean/           # Layouts + styles Ocean
  │   ├── code/            # Layouts + styles Code
  │   └── fusion/          # Layouts + styles Fusion
  ├── context/             # ThemeContext, LanguageContext
  ├── hooks/               # useTheme, useLanguage, etc.
  ├── locales/             # fr.json, en.json
  │   ├── fr.json
  │   └── en.json
  ├── data/                # Projets portfolio, services, etc.
  ├── assets/              # Images, vidéos, logo
  └── utils/               # Helpers
  ```
- Composants bien documentés avec JSDoc
- Props typées (PropTypes ou TypeScript)
- Nommage cohérent et explicite

---

## Profil de Gui — À propos / Bio

- **Nom** : Guillaume Etienne
- **Parcours IT** : 15 ans d'expérience en tant qu'ingénieur réseau dans l'IT
- **Reconversion** : Certifié développeur web via OpenClassrooms
- **Activité créative** : Vidéaste et monteur professionnel spécialisé kitesurf sous le nom Air Tricks Prod, en partenariat avec Bilene Kite Center au Mozambique (montage rider, slow motion, prises de vue drone)
- **Page Facebook** : Air Tricks Prod — "Professional Video Editor, drone footage, slow-motion, in partnership with Bilene Kite Center"
- **Positionnement** : Développeur web créatif avec un background technique solide (réseau) et un œil artistique (vidéo/kite)

---

## Portfolio — Projets web réels

Les données ci-dessous sont les vrais projets à intégrer dans le portfolio. Claude Code devra rédiger des descriptifs techniques réalistes pour chaque projet en se basant sur les informations fournies.

### Projet 1 — Bilene Kite Center
- **URL** : https://bilenekite.com
- **Type** : Site vitrine multilingue (FR/EN/ES)
- **Client** : Centre de kitesurf au Mozambique (Bilene)
- **Description** : Site complet pour un centre de kitesurf/wingfoil : présentation du spot, école, centre, trips/kitesafaris, galerie photo/vidéo, service vidéo pro (partenariat Air Tricks Prod), blog, tarifs, FAQ. Design immersif avec vidéo d'accueil, galeries riches, nombreux partenaires (Decathlon Travel, TripAdvisor, Eleveight, etc.)
- **Stack à déduire** : HTML/CSS/JS, images optimisées WebP, vidéo intégrée, responsive, multilingue
- **Catégorie** : Web

### Projet 2 — La Poumerole
- **URL** : https://www.lapoumerole.org
- **Type** : Site vitrine bilingue (FR/EN)
- **Client** : Maison d'hôtes / lieu de retraite en Auvergne (Puy-de-Dôme)
- **Description** : Site pour une bâtisse en pierre du XIXe rénovée avec salle de pratique (méditation/yoga), 4 chambres, pension complète. Mise en avant du lieu, philosophie solidaire (ONG Rejoice), offres entreprises/particuliers, localisation, galerie photos. Design épuré et chaleureux.
- **Stack à déduire** : HTML/CSS/JS, galeries d'images, design responsive, formulaire de contact
- **Catégorie** : Web

### Projet 3 — Vetisol
- **URL** : https://www.vetisol.com
- **Type** : Site vitrine corporate trilingue (FR/EN/DE)
- **Client** : PME spécialisée façades ventilées et isolation par l'extérieur (Mâcon)
- **Description** : Site professionnel présentant 30 ans d'expertise en façades ventilées à fixation mécanique. Sections : matériaux (pierre, aluminium, composite), systèmes (Veticlip, Vetilisse, Vetirail), réalisations (dont le Louvre), documentation technique, engagement écologique, carte interactive des délégués commerciaux. Design corporate haut de gamme.
- **Stack à déduire** : Framework moderne (images hébergées Vercel), responsive, trilingue, carte interactive
- **Catégorie** : Web

### Projet 4 — Casa du Ventoux
- **URL** : https://guillaume-etienne.github.io/web-casa-du-ventoux/
- **Type** : Site vitrine one-page
- **Client** : Maison d'hôtes au pied du Mont Ventoux (Provence)
- **Description** : Site one-page pour une location saisonnière avec piscine privée en Provence. Sections : maison, chambres, jardin, loisirs, atouts, village/environs, galerie, tarifs, disponibilités, contact. Design sobre avec galerie photo, icônes SVG custom, formulaire de réservation.
- **Stack** : HTML/CSS/JavaScript vanilla, hébergé sur GitHub Pages
- **Catégorie** : Web
- **Note** : Crédité "Air Tricks Prod" en footer

### Projet 5 — OhMyFood (Projet OpenClassrooms P3)
- **URL** : https://guillaume-etienne.github.io/P3-OpenClassroom-OhmyFood/
- **Type** : Maquette interactive / intégration
- **Description** : Projet de formation — site de réservation de menus dans des restaurants gastronomiques parisiens. Interface mobile-first avec animations CSS avancées (loading spinner, apparition progressive des plats, sélection de menu avec animation coche). 4 pages restaurant avec menus interactifs.
- **Stack** : HTML/CSS (Sass), animations CSS pures, mobile-first, GitHub Pages
- **Catégorie** : Web (Formation)

### Projet 6 — Reservia (Projet OpenClassrooms P2)
- **URL** : https://guillaume-etienne.github.io/P2-Open-HTML-CSS-integration/
- **Type** : Intégration responsive
- **Description** : Projet de formation — plateforme de réservation d'hébergements et d'activités à Marseille. Intégration pixel-perfect d'une maquette avec système de filtres, cards hébergements, section activités, grille responsive.
- **Stack** : HTML/CSS pur, Flexbox/Grid, responsive design, GitHub Pages
- **Catégorie** : Web (Formation)

---

## Portfolio — Productions vidéo kitesurf (Air Tricks Prod)

Ces vidéos YouTube sont à intégrer dans la section portfolio sous la catégorie "Vidéo". Elles seront embedées via iframe YouTube. Claude Code devra rédiger des descriptifs adaptés.

### Vidéo 1
- **URL** : https://www.youtube.com/watch?v=jzfpku5Eghg
- **Contexte** : Production Air Tricks Prod — vidéo kitesurf réalisée en partenariat avec Bilene Kite Center au Mozambique. Montage professionnel avec slow-motion, prises de vue drone, ambiance cinématique.
- **Descriptif à rédiger par Claude Code** : Décrire comme un rider edit / session kite au Mozambique, mettant en valeur les compétences de montage, drone et slow-motion.

### Vidéo 2
- **URL** : https://www.youtube.com/watch?v=EA8pjVDsoGk
- **Contexte** : Production Air Tricks Prod — vidéo kitesurf. Montage dynamique avec transitions, musique, prises de vue variées.
- **Descriptif à rédiger par Claude Code** : Décrire comme une production vidéo kite mettant en valeur le sport, les riders et le spot.

### Vidéo 3
- **URL** : https://www.youtube.com/watch?v=w5fsgmWruc4
- **Contexte** : Production Air Tricks Prod — vidéo kitesurf. Montage professionnel.
- **Descriptif à rédiger par Claude Code** : Décrire comme une production vidéo kite, en soulignant la qualité du montage et de la captation.

**Instructions pour Claude Code** : Pour chaque vidéo, récupérer le titre et la description depuis YouTube (via l'API oEmbed : `https://www.youtube.com/oembed?url=VIDEO_URL&format=json`) pour compléter les descriptifs. Intégrer les vidéos via `<iframe>` responsive avec `loading="lazy"`. Prévoir un composant `<VideoCard />` réutilisable.

---

## Résumé de la personnalité du site

> Air Tricks Prod n'est pas un énième site de développeur web. C'est une **démonstration vivante** de ce que Gui sait faire. Le système de 3 thèmes prouve sa maîtrise technique. Le storytelling kitesurf → code prouve sa créativité. Le résultat doit donner envie de travailler avec lui.

---

## Instructions pour Claude Code

1. **Commence par initialiser** le projet avec Vite + React
2. **Installe les dépendances** : framer-motion, react-router-dom, i18next, react-i18next
3. **Structure les dossiers** selon l'architecture décrite
4. **Implémente le ThemeProvider** et le système de context pour le switch
5. **Construis les layouts** thème par thème, en commençant par "Fusion" (thème par défaut)
6. **Intègre le sélecteur de vent** avec ses animations
7. **Ajoute le système i18n** avec les fichiers de traduction
8. **Optimise** : lazy loading, code splitting, responsive, accessibilité
9. **Teste** chaque thème sur desktop et mobile
10. Utilise des **données placeholder** réalistes pour le portfolio et les services en attendant le vrai contenu de Gui
