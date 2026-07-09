import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const BASE_URL = 'https://airtricksprod.fr';

// Title + meta description par route. Les pages /portfolio/:id gèrent
// elles-mêmes title/description (ProjectPage) — ici on ne pose que canonical/og:url.
const META = {
  '/': {
    title: 'Air Tricks Prod | Développeur Web Freelance',
    description:
      "Développeur web freelance : site vitrine de A à Z — design, dev, hébergement, SEO et GEO. Devis gratuit. France entière.",
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

export default function RouteMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname.replace(/\/$/, '') || '/';
    const canonicalUrl = path === '/' ? `${BASE_URL}/` : `${BASE_URL}${path}`;

    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonicalUrl);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonicalUrl);

    const meta = META[path];
    if (meta) {
      document.title = meta.title;
      document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
      document.querySelector('meta[property="og:title"]')?.setAttribute('content', meta.title);
      document.querySelector('meta[property="og:description"]')?.setAttribute('content', meta.description);
    }
  }, [pathname]);

  return null;
}
