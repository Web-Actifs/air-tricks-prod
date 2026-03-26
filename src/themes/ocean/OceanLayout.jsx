import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../../components/Logo';
import LanguageToggle from '../../components/LanguageToggle';
import './ocean.css';

export default function OceanLayout({ children }) {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/portfolio', label: t('nav.portfolio') },
    { to: '/services', label: t('nav.services') },
    { to: '/about', label: t('nav.about') },
    { to: '/contact', label: t('nav.contact') },
  ];

  const closeMobile = () => setMenuOpen(false);

  return (
    <div className="ocean-layout">
      {/* ---------- Navbar ---------- */}
      <header className={`ocean-nav ${scrolled ? 'ocean-nav--scrolled' : ''}`}>
        <div className="ocean-nav__inner">
          <NavLink to="/" className="ocean-nav__logo" onClick={closeMobile}>
            <Logo size="small" />
          </NavLink>

          {/* Desktop links */}
          <nav className="ocean-nav__links" aria-label="Main navigation">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `ocean-nav__link ${isActive ? 'ocean-nav__link--active' : ''}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="ocean-nav__actions">
            <LanguageToggle />
            {/* Hamburger */}
            <button
              className={`ocean-hamburger ${menuOpen ? 'ocean-hamburger--open' : ''}`}
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* ---------- Mobile menu ---------- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="ocean-mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
          >
            <nav className="ocean-mobile-menu__nav" aria-label="Mobile navigation">
              {navLinks.map(({ to, label }, i) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i }}
                >
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) =>
                      `ocean-mobile-menu__link ${isActive ? 'ocean-mobile-menu__link--active' : ''}`
                    }
                    onClick={closeMobile}
                  >
                    {label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------- Main content ---------- */}
      <main className="ocean-main">
        {children}
      </main>
    </div>
  );
}
