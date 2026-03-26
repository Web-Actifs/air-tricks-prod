import { lazy, Suspense } from 'react';
import { useTheme } from '../hooks/useTheme';

const OceanServices = lazy(() => import('../themes/ocean/OceanServices'));
const CodeServices = lazy(() => import('../themes/code/CodeServices'));
const FusionServices = lazy(() => import('../themes/fusion/FusionServices'));

const components = {
  ocean: OceanServices,
  code: CodeServices,
  fusion: FusionServices,
};

export default function ServicesPage() {
  const { theme } = useTheme();
  const Services = components[theme];

  return (
    <Suspense fallback={<div className="loading">...</div>}>
      <main>
        <Services />
      </main>
    </Suspense>
  );
}
