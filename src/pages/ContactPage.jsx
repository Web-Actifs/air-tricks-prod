import { lazy, Suspense } from 'react';
import { useTheme } from '../hooks/useTheme';

const OceanContact = lazy(() => import('../themes/ocean/OceanContact'));
const CodeContact = lazy(() => import('../themes/code/CodeContact'));
const FusionContact = lazy(() => import('../themes/fusion/FusionContact'));

const components = {
  ocean: OceanContact,
  code: CodeContact,
  fusion: FusionContact,
};

export default function ContactPage() {
  const { theme } = useTheme();
  const Contact = components[theme];

  return (
    <Suspense fallback={<div className="loading">...</div>}>
      <main>
        <Contact />
      </main>
    </Suspense>
  );
}
