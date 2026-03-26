import { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../../components/Logo';
import LanguageToggle from '../../components/LanguageToggle';
import './fusion.css';

const NAV_LINKS = [
  { to: '/', key: 'home' },
  { to: '/portfolio', key: 'portfolio' },
  { to: '/services', key: 'services' },
  { to: '/about', key: 'about' },
  { to: '/contact', key: 'contact' },
];

export default function FusionLayout({ children }) {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 60);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <div className="fusion-layout">
      {/* Sticky top navigation with morphing effect */}
      <header
        className={`fusion-nav ${scrolled ? 'fusion-nav--scrolled' : ''}`}
      >
        <div className="fusion-nav__inner">
          <NavLink to="/" className="fusion-nav__logo" onClick={closeMobile}>
            <Logo size="default" />
          </NavLink>

          {/* Desktop navigation */}
          <nav className="fusion-nav__links" aria-label="Main navigation">
            {NAV_LINKS.map(({ to, key }) => (
              <NavLink
                key={key}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `fusion-nav__link ${isActive ? 'fusion-nav__link--active' : ''}`
                }
              >
                {t(`nav.${key}`)}
              </NavLink>
            ))}
          </nav>

          <div className="fusion-nav__actions">
            <LanguageToggle />
          </div>

          {/* Mobile hamburger */}
          <button
            className={`fusion-nav__hamburger ${mobileMenuOpen ? 'fusion-nav__hamburger--open' : ''}`}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="fusion-nav__hamburger-line" />
            <span className="fusion-nav__hamburger-line" />
            <span className="fusion-nav__hamburger-line" />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fusion-mobile-menu"
            initial={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2rem)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 2.5rem) 2rem)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2rem)' }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <nav className="fusion-mobile-menu__nav" aria-label="Mobile navigation">
              {NAV_LINKS.map(({ to, key }, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                >
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) =>
                      `fusion-mobile-menu__link ${isActive ? 'fusion-mobile-menu__link--active' : ''}`
                    }
                    onClick={closeMobile}
                  >
                    {t(`nav.${key}`)}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <div className="fusion-mobile-menu__actions">
              <LanguageToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="fusion-main">
        {children}
      </main>
    </div>
  );
}
