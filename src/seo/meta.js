// Meta SEO par route — consommé par RouteMeta (client) et scripts/prerender.mjs (build)

export const BASE_URL = 'https://airtricksprod.fr';

export const DEFAULT_TITLE = 'Air Tricks Prod | Développeur Web Freelance';
export const DEFAULT_DESCRIPTION =
  "Développeur web freelance : site vitrine de A à Z — design, dev, hébergement, SEO et GEO. Devis gratuit. France entière.";

export const ROUTE_META = {
  '/': {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  '/portfolio': {
    title: 'Portfolio — sites web réalisés | Air Tricks Prod',
    description:
      "Sites vitrines réalisés pour PME, associations et indépendants : centre de kitesurf, maison d'hôtes, B2B industriel… Études de cas détaillées.",
  },
  '/services': {
    title: 'Services — création de site, refonte, SEO | Air Tricks Prod',
    description:
      "Création de sites vitrines clé en main à partir de 800 € : design, développement, hébergement, SEO et GEO. Devis gratuit, réponse sous 24 h.",
  },
  '/about': {
    title: 'À propos — Guillaume Etienne | Air Tricks Prod',
    description:
      "Développeur web créatif : 15 ans d'ingénierie IT, vidéaste professionnel, 8 sites en ligne. La fusion du technique et du créatif.",
  },
  '/contact': {
    title: 'Contact — devis gratuit sous 24 h | Air Tricks Prod',
    description:
      "Un projet de site web ? Parlons-en. Devis gratuit et sans engagement, réponse sous 24 h.",
  },
  '/faq': {
    title: 'FAQ — prix, délais, déroulement | Air Tricks Prod',
    description:
      "Combien coûte un site vitrine ? Quels délais ? Qui gère l'hébergement ? Toutes les réponses avant de lancer votre projet.",
  },
  '/legal': {
    title: 'Mentions légales | Air Tricks Prod',
    description: 'Mentions légales et politique de confidentialité du site airtricksprod.fr.',
  },
};
