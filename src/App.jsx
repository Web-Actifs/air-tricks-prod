import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { useTheme } from './hooks/useTheme';
import ThemeSelector from './components/ThemeSelector';
import TransitionOverlay from './components/TransitionOverlay';
import Footer from './components/Footer';
import './i18n';

const HomePage = lazy(() => import('./pages/HomePage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const LegalPage = lazy(() => import('./pages/LegalPage'));

const OceanLayout = lazy(() => import('./themes/ocean/OceanLayout'));
const CodeLayout = lazy(() => import('./themes/code/CodeLayout'));
const FusionLayout = lazy(() => import('./themes/fusion/FusionLayout'));

const layouts = {
  ocean: OceanLayout,
  code: CodeLayout,
  fusion: FusionLayout,
};

function ThemedApp() {
  const { theme } = useTheme();
  const Layout = layouts[theme];

  return (
    <Suspense fallback={<div className="loading">...</div>}>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/legal" element={<LegalPage />} />
        </Routes>
        <Footer />
      </Layout>
      <ThemeSelector />
      <TransitionOverlay />
    </Suspense>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ThemedApp />
      </ThemeProvider>
    </BrowserRouter>
  );
}
