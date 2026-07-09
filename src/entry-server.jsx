import { StrictMode } from 'react';
import { prerender as reactPrerender } from 'react-dom/static';
import { StaticRouter } from 'react-router';
import App from './App.jsx';
import { webProjects } from './data/projects';
import { caseStudies } from './data/caseStudies';
import { ROUTE_META } from './seo/meta';
import './index.css';

// Rend une route en HTML statique. `prerender` de react-dom/static attend
// que tous les composants lazy (React.lazy + Suspense) soient résolus.
export async function render(url) {
  const { prelude } = await reactPrerender(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
  return await new Response(prelude).text();
}

// Title + description par route, y compris les études de cas /portfolio/:id
export function getMeta(path) {
  const clean = path.replace(/\/$/, '') || '/';
  if (ROUTE_META[clean]) return ROUTE_META[clean];

  const match = clean.match(/^\/portfolio\/(.+)$/);
  if (match) {
    const project = webProjects.find((p) => p.id === match[1]);
    const study = caseStudies[match[1]];
    if (project && study) {
      return {
        title: `${project.title} — Étude de cas | Air Tricks Prod`,
        description: study.problem.fr,
      };
    }
  }
  return null;
}

export { webProjects };
