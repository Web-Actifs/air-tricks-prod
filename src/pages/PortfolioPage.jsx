import { lazy, Suspense } from 'react';
import { useTheme } from '../hooks/useTheme';

const OceanPortfolio = lazy(() => import('../themes/ocean/OceanPortfolio'));
const CodePortfolio = lazy(() => import('../themes/code/CodePortfolio'));
const FusionPortfolio = lazy(() => import('../themes/fusion/FusionPortfolio'));

const components = {
  ocean: OceanPortfolio,
  code: CodePortfolio,
  fusion: FusionPortfolio,
};

export default function PortfolioPage() {
  const { theme } = useTheme();
  const Portfolio = components[theme];

  return (
    <Suspense fallback={<div className="loading">...</div>}>
      <main>
        <Portfolio />
      </main>
    </Suspense>
  );
}
