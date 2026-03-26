const screenshot = (url) =>
  `https://api.microlink.io?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`;

export const webProjects = [
  {
    id: 'bilene-kite',
    title: 'Bilene Kite Center',
    url: 'https://bilenekite.com',
    image: screenshot('https://bilenekite.com'),
    category: 'web',
    stack: ['HTML/CSS', 'JavaScript', 'WebP', 'Multilingue'],
    description: {
      fr: "Site vitrine multilingue (FR/EN/ES) pour un centre de kitesurf au Mozambique. Design immersif avec vidéo d'accueil, galeries riches, présentation du spot, école, trips/kitesafaris et service vidéo pro Air Tricks Prod.",
      en: 'Multilingual showcase website (FR/EN/ES) for a kitesurfing center in Mozambique. Immersive design with welcome video, rich galleries, spot presentation, school, trips/kitesafaris and Air Tricks Prod video service.',
    },
  },
  {
    id: 'la-poumerole',
    title: 'La Poumerole',
    url: 'https://www.lapoumerole.org',
    image: screenshot('https://www.lapoumerole.org'),
    category: 'web',
    stack: ['HTML/CSS', 'JavaScript', 'Responsive', 'Bilingue'],
    description: {
      fr: "Site vitrine bilingue pour une maison d'hôtes et lieu de retraite en Auvergne. Bâtisse en pierre du XIXe avec salle de pratique, design épuré et chaleureux, mise en avant de la philosophie solidaire.",
      en: 'Bilingual showcase website for a guesthouse and retreat center in Auvergne, France. 19th-century stone building with practice room, clean and warm design, highlighting the solidarity philosophy.',
    },
  },
  {
    id: 'vetisol',
    title: 'Vetisol',
    url: 'https://www.vetisol.com',
    image: screenshot('https://www.vetisol.com'),
    category: 'web',
    stack: ['Framework moderne', 'Vercel', 'Trilingue', 'Carte interactive'],
    description: {
      fr: "Site corporate trilingue (FR/EN/DE) pour un spécialiste des façades ventilées. 30 ans d'expertise, réalisations prestigieuses dont le Louvre, documentation technique et carte interactive des délégués.",
      en: 'Trilingual corporate website (FR/EN/DE) for a ventilated facade specialist. 30 years of expertise, prestigious achievements including the Louvre, technical documentation and interactive delegate map.',
    },
  },
  {
    id: 'casa-ventoux',
    title: 'Casa du Ventoux',
    url: 'https://guillaume-etienne.github.io/web-casa-du-ventoux/',
    image: screenshot('https://guillaume-etienne.github.io/web-casa-du-ventoux/'),
    category: 'web',
    stack: ['HTML', 'CSS', 'JavaScript vanilla', 'GitHub Pages'],
    description: {
      fr: "Site one-page pour une location saisonnière au pied du Mont Ventoux. Galerie photo, icônes SVG custom, formulaire de réservation, design provençal sobre et élégant.",
      en: 'One-page website for a seasonal rental at the foot of Mont Ventoux. Photo gallery, custom SVG icons, booking form, clean and elegant Provençal design.',
    },
  },
  {
    id: 'ohmyfood',
    title: 'OhMyFood',
    url: 'https://guillaume-etienne.github.io/P3-OpenClassroom-OhmyFood/',
    image: screenshot('https://guillaume-etienne.github.io/P3-OpenClassroom-OhmyFood/'),
    category: 'web',
    isTraining: true,
    stack: ['HTML', 'Sass', 'Animations CSS', 'Mobile-first'],
    description: {
      fr: "Projet de formation OpenClassrooms — site de réservation de menus gastronomiques parisiens. Animations CSS avancées, loading spinner, apparition progressive des plats, interface mobile-first.",
      en: 'OpenClassrooms training project — Parisian gourmet menu booking site. Advanced CSS animations, loading spinner, progressive dish display, mobile-first interface.',
    },
  },
  {
    id: 'reservia',
    title: 'Reservia',
    url: 'https://guillaume-etienne.github.io/P2-Open-HTML-CSS-integration/',
    image: screenshot('https://guillaume-etienne.github.io/P2-Open-HTML-CSS-integration/'),
    category: 'web',
    isTraining: true,
    stack: ['HTML', 'CSS', 'Flexbox', 'Grid', 'Responsive'],
    description: {
      fr: "Projet de formation — plateforme de réservation d'hébergements à Marseille. Intégration pixel-perfect, système de filtres, grille responsive avec Flexbox et Grid.",
      en: 'Training project — accommodation booking platform in Marseille. Pixel-perfect integration, filter system, responsive grid with Flexbox and Grid.',
    },
  },
];

export const videoProjects = [
  {
    id: 'kite-video-1',
    youtubeId: 'jzfpku5Eghg',
    title: {
      fr: 'Kite Session — Bilene, Mozambique',
      en: 'Kite Session — Bilene, Mozambique',
    },
    description: {
      fr: "Rider edit tourné au Mozambique en partenariat avec Bilene Kite Center. Montage cinématique avec slow-motion, prises de vue drone et ambiance tropicale. Production Air Tricks Prod.",
      en: 'Rider edit filmed in Mozambique in partnership with Bilene Kite Center. Cinematic edit with slow-motion, drone footage and tropical vibes. Air Tricks Prod production.',
    },
    category: 'video',
  },
  {
    id: 'kite-video-2',
    youtubeId: 'EA8pjVDsoGk',
    title: {
      fr: 'Kitesurf Edit — Riders & Spot',
      en: 'Kitesurf Edit — Riders & Spot',
    },
    description: {
      fr: "Production vidéo dynamique mettant en valeur les riders, le spot et l'énergie du kitesurf. Transitions percutantes, montage rythmé sur musique. Air Tricks Prod.",
      en: 'Dynamic video production showcasing riders, the spot and the energy of kitesurfing. Punchy transitions, music-driven editing. Air Tricks Prod.',
    },
    category: 'video',
  },
  {
    id: 'kite-video-3',
    youtubeId: 'w5fsgmWruc4',
    title: {
      fr: 'Kitesurf Pro Edit',
      en: 'Kitesurf Pro Edit',
    },
    description: {
      fr: "Production professionnelle Air Tricks Prod — qualité de captation et de montage au service du kitesurf. Drone, slow-motion, couleur étalonnée.",
      en: 'Professional Air Tricks Prod production — high-quality capture and editing in service of kitesurfing. Drone, slow-motion, color graded.',
    },
    category: 'video',
  },
];
