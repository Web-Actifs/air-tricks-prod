import { lazy, Suspense } from 'react';
import { useTheme } from '../hooks/useTheme';

const OceanAbout = lazy(() => import('../themes/ocean/OceanAbout'));
const CodeAbout = lazy(() => import('../themes/code/CodeAbout'));
const FusionAbout = lazy(() => import('../themes/fusion/FusionAbout'));

const components = {
  ocean: OceanAbout,
  code: CodeAbout,
  fusion: FusionAbout,
};

export default function AboutPage() {
  const { theme } = useTheme();
  const About = components[theme];

  return (
    <Suspense fallback={<div className="loading">...</div>}>
      <main>
        <About />
      </main>
    </Suspense>
  );
}
