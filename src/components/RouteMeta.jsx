import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BASE_URL, ROUTE_META } from '../seo/meta';

// Synchronise title, description, canonical et Open Graph à chaque changement de route.
// Les pages /portfolio/:id gèrent elles-mêmes title/description/og (ProjectPage) —
// ici on ne pose que canonical/og:url pour ces routes.
export default function RouteMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname.replace(/\/$/, '') || '/';
    const canonicalUrl = path === '/' ? `${BASE_URL}/` : `${BASE_URL}${path}`;

    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonicalUrl);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonicalUrl);

    const meta = ROUTE_META[path];
    if (meta) {
      document.title = meta.title;
      document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
      document.querySelector('meta[property="og:title"]')?.setAttribute('content', meta.title);
      document.querySelector('meta[property="og:description"]')?.setAttribute('content', meta.description);
    }
  }, [pathname]);

  return null;
}
