import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from '../../components/Logo';
import LanguageToggle from '../../components/LanguageToggle';
import './code.css';

const navItems = [
  { to: '/', label: 'nav.home', icon: '~' },
  { to: '/portfolio', label: 'nav.portfolio', icon: '>' },
  { to: '/services', label: 'nav.services', icon: '#' },
  { to: '/about', label: 'nav.about', icon: '@' },
  { to: '/contact', label: 'nav.contact', icon: '$' },
];

export default function CodeLayout({ children }) {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="code-layout">
      <aside className="code-sidebar">
        <NavLink to="/" className="code-sidebar__top">
          <span className="code-sidebar__monogram" aria-hidden="true">A</span>
          <Logo size="small" />
        </NavLink>
        <nav className="code-sidebar__nav">
          {navItems.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `code-sidebar__link ${isActive ? 'active' : ''}`
              }
            >
              <span className="code-sidebar__icon">{icon}</span>
              <span className="code-sidebar__label">{t(label)}</span>
            </NavLink>
          ))}
        </nav>
        <div className="code-sidebar__bottom">
          <LanguageToggle />
        </div>
      </aside>

      {/* Mobile nav */}
      <nav className="code-mobile-nav">
        <NavLink to="/" className="code-mobile-nav__logo">
          <Logo size="small" />
        </NavLink>
        <button
          className="code-mobile-nav__toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? '✕' : '≡'}
        </button>
      </nav>
      {mobileOpen && (
        <div className="code-mobile-menu">
          {navItems.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `code-mobile-menu__link ${isActive ? 'active' : ''}`
              }
              onClick={() => setMobileOpen(false)}
            >
              <span>{icon}</span> {t(label)}
            </NavLink>
          ))}
          <LanguageToggle />
        </div>
      )}

      <div className="code-content">
        {children}
      </div>
    </div>
  );
}
