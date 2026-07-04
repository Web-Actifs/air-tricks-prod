import arthurImage from '../assets/images/Arthur.jpg';
import bilenImage from '../assets/images/BilenKite.jpg';
import poumeroleImage from '../assets/images/Poumerole.JPG';
import vetsolImage from '../assets/images/vetisol.jpg';
import rejoiceImage from '../assets/images/Rejoice.JPG';

const screenshot = (url) =>
  `https://api.microlink.io?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`;

export const webProjects = [
  {
    id: 'bilene-kite',
    title: 'Bilene Kite Center',
    url: 'https://bilenekite.com',
    image: bilenImage,
    category: 'web',
    stack: ['HTML/CSS', 'JavaScript', 'WebP', 'Multilingue'],
    description: {
      fr: "Site vitrine trilingue (FR/EN/ES) pour un centre de kitesurf au Mozambique. Vidéo d'accueil immersive, galeries, école, trips et kitesafaris — trois langues pour capter une clientèle internationale et transformer les visites en réservations.",
      en: 'Trilingual showcase website (FR/EN/ES) for a kitesurfing center in Mozambique. Immersive welcome video, galleries, school, trips and kitesafaris — three languages to reach an international audience and turn visits into bookings.',
    },
  },
  {
    id: 'la-poumerole',
    title: 'La Poumerole',
    url: 'https://www.lapoumerole.org',
    image: poumeroleImage,
    category: 'web',
    stack: ['HTML/CSS', 'JavaScript', 'Responsive', 'Bilingue'],
    description: {
      fr: "Site vitrine bilingue pour une maison d'hôtes et lieu de retraite en Auvergne. Un design épuré et chaleureux qui fait ressentir l'âme de cette bâtisse en pierre du XIXe dès la première seconde — et donne envie de réserver un séjour.",
      en: "Bilingual showcase website for a guesthouse and retreat center in Auvergne, France. A clean, warm design that conveys the soul of this 19th-century stone building at first glance — and makes you want to book a stay.",
    },
  },
  {
    id: 'vetisol',
    title: 'Vetisol',
    url: 'https://www.vetisol.com',
    image: vetsolImage,
    category: 'web',
    stack: ['Framework moderne', 'Vercel', 'Trilingue', 'Carte interactive'],
    description: {
      fr: "Site corporate trilingue (FR/EN/DE) pour un spécialiste des façades ventilées. 30 ans d'expertise et des références prestigieuses — dont le Louvre — mises en scène pour rassurer architectes et donneurs d'ordre. Documentation technique et carte interactive des délégués.",
      en: 'Trilingual corporate website (FR/EN/DE) for a ventilated facade specialist. 30 years of expertise and prestigious references — including the Louvre — showcased to build trust with architects and project owners. Technical documentation and interactive delegate map.',
    },
  },
  {
    id: 'rejoice',
    title: 'Rejoice',
    url: 'https://rejoice.ngo/',
    image: rejoiceImage,
    category: 'web',
    stack: ['HTML', 'CSS', 'JavaScript', 'Responsive', 'Multilingue'],
    description: {
      fr: "Site de l'association Rejoice, qui finance des projets pour l'enfance en Inde et au Népal grâce à des séjours transformationnels. Identité minimaliste et témoignages authentiques qui inspirent confiance aux donateurs — impact mesurable : 200+ enfants accompagnés.",
      en: 'Website for Rejoice association, funding childhood projects in India and Nepal through transformational retreats. Minimalist identity and authentic testimonials that build donor trust — measurable impact: 200+ children supported.',
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
      fr: "Site one-page pour une location saisonnière au pied du Mont Ventoux. Galerie photo, formulaire de réservation, design provençal sobre et élégant — tout ce qu'il faut pour convaincre un vacancier, sur une seule page.",
      en: 'One-page website for a seasonal rental at the foot of Mont Ventoux. Photo gallery, booking form, clean and elegant Provençal design — everything needed to win over a holidaymaker, on a single page.',
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
  {
    id: 'arthur-reynaud',
    title: 'Arthur Reynaud-Chanon',
    url: 'https://arthur-reynaud-chanon.be/',
    image: arthurImage,
    category: 'web',
    stack: ['HTML/CSS', 'JavaScript', 'Responsive', 'Multilingue'],
    description: {
      fr: "Site pour un professeur de clarinette et saxophone à Bruxelles, à la pédagogie humaniste centrée sur le souffle, l'oreille et la théorie. Parcours international (France, Pologne, Belgique) et témoignages d'élèves mis en avant pour donner confiance aux futurs élèves et à leurs parents.",
      en: 'Website for a clarinet and saxophone teacher in Brussels, with a humanistic pedagogy centered on breath, ear training and theory. International background (France, Poland, Belgium) and student testimonials highlighted to reassure future students and their parents.',
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
