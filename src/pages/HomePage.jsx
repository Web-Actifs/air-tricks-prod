import { lazy, Suspense } from 'react';
import { useTheme } from '../hooks/useTheme';

const OceanHero = lazy(() => import('../themes/ocean/OceanHero'));
const OceanPortfolio = lazy(() => import('../themes/ocean/OceanPortfolio'));
const OceanServices = lazy(() => import('../themes/ocean/OceanServices'));
const OceanAbout = lazy(() => import('../themes/ocean/OceanAbout'));
const OceanContact = lazy(() => import('../themes/ocean/OceanContact'));

const CodeHero = lazy(() => import('../themes/code/CodeHero'));
const CodePortfolio = lazy(() => import('../themes/code/CodePortfolio'));
const CodeServices = lazy(() => import('../themes/code/CodeServices'));
const CodeAbout = lazy(() => import('../themes/code/CodeAbout'));
const CodeContact = lazy(() => import('../themes/code/CodeContact'));

const FusionHero = lazy(() => import('../themes/fusion/FusionHero'));
const FusionPortfolio = lazy(() => import('../themes/fusion/FusionPortfolio'));
const FusionServices = lazy(() => import('../themes/fusion/FusionServices'));
const FusionAbout = lazy(() => import('../themes/fusion/FusionAbout'));
const FusionContact = lazy(() => import('../themes/fusion/FusionContact'));

const themeComponents = {
  ocean: { Hero: OceanHero, Portfolio: OceanPortfolio, Services: OceanServices, About: OceanAbout, Contact: OceanContact },
  code: { Hero: CodeHero, Portfolio: CodePortfolio, Services: CodeServices, About: CodeAbout, Contact: CodeContact },
  fusion: { Hero: FusionHero, Portfolio: FusionPortfolio, Services: FusionServices, About: FusionAbout, Contact: FusionContact },
};

export default function HomePage() {
  const { theme } = useTheme();
  const { Hero, Portfolio, Services, About, Contact } = themeComponents[theme];

  return (
    <Suspense fallback={<div className="loading">...</div>}>
      <main>
        <Hero />
        <Portfolio />
        <Services />
        <About />
        <Contact />
      </main>
    </Suspense>
  );
}
