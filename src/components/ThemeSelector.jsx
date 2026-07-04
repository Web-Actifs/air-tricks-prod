import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hooks/useTheme';
import { THEMES } from '../context/ThemeContext';
import './ThemeSelector.css';

const SWITCHED_KEY = 'atp-theme-switched';

// Doit rester aligné avec le cycle CSS de `compass-gust` / `trigger-gust-glow` (7s),
// et l'instant où la rafale/le flash démarrent dans ce cycle (~40%).
const NUDGE_CYCLE = 7000;
const FLASH_OFFSET = 2800;
const TOOLTIP_VISIBLE_DURATION = 2500;

const themeOptions = [
  { key: THEMES.FUSION, icon: '⚡', angle: 90 },
  { key: THEMES.CODE, icon: '💻', angle: 135 },
  { key: THEMES.OCEAN, icon: '🌊', angle: 180 },
];

const themeLabels = {
  [THEMES.OCEAN]: 'Ocean',
  [THEMES.CODE]: 'Code',
  [THEMES.FUSION]: 'Fusion',
};

const themeIcons = {
  [THEMES.OCEAN]: '🌊',
  [THEMES.CODE]: '💻',
  [THEMES.FUSION]: '⚡',
};

export default function ThemeSelector() {
  const { theme, switchTheme, isTransitioning } = useTheme();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasSwitched, setHasSwitched] = useState(
    () => localStorage.getItem(SWITCHED_KEY) === 'true'
  );

  // Tant que le client n'a jamais changé de thème, le tooltip apparaît à chaque
  // rafale/flash de la boussole (même cycle de 7s que le CSS). Dès qu'il a changé
  // de thème une première fois, on considère qu'il a compris : plus de rafale, plus
  // de flash, plus de tooltip — juste la rotation calme de l'aiguille.
  useEffect(() => {
    if (hasSwitched) return;

    const show = () => {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), TOOLTIP_VISIBLE_DURATION);
    };

    let intervalId;
    const startTimer = setTimeout(() => {
      show();
      intervalId = setInterval(show, NUDGE_CYCLE);
    }, FLASH_OFFSET);

    return () => {
      clearTimeout(startTimer);
      clearInterval(intervalId);
    };
  }, [hasSwitched]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (newTheme) => {
    switchTheme(newTheme);
    setIsOpen(false);
    localStorage.setItem(SWITCHED_KEY, 'true');
    setHasSwitched(true);
  };

  return (
    <div
      className={`theme-selector${hasSwitched ? '' : ' theme-selector--nudging'}`}
      aria-label={t('theme_selector.label')}
    >
      {/* Pill desktop : thème actif visible en permanence */}
      <motion.div
        className="theme-selector__pill"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <span>{themeIcons[theme]}</span>
        <span className="theme-selector__pill-label">{themeLabels[theme]}</span>
      </motion.div>

      {/* Wrapper pour centrer les options sur le bouton */}
      <div className="theme-selector__anchor">
        <motion.button
          className="theme-selector__trigger"
          onClick={handleToggle}
          animate={{ rotate: isOpen ? 180 : 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-expanded={isOpen}
          disabled={isTransitioning}
        >
          <svg viewBox="0 0 40 40" className="theme-selector__compass">
            <circle cx="20" cy="20" r="18" fill="none" strokeWidth="2" />
            <line
              x1="20" y1="20" x2="20" y2="6"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="20" cy="20" r="3" />
          </svg>
        </motion.button>

        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              className="theme-selector__tooltip"
              role="status"
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              {t('theme_selector.tooltip_hint')}
              <span className="theme-selector__tooltip-arrow" />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="theme-selector__options"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {themeOptions.map(({ key, icon, angle }, i) => {
                const rad = (angle * Math.PI) / 180;
                const x = Math.cos(rad) * 72;
                const y = Math.sin(rad) * 72;
                return (
                  <motion.button
                    key={key}
                    className={`theme-selector__option ${theme === key ? 'active' : ''}`}
                    onClick={() => handleSelect(key)}
                    initial={{ opacity: 0, x: 0, y: 0 }}
                    animate={{ opacity: 1, x, y: -y }}
                    exit={{ opacity: 0, x: 0, y: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.05 }}
                    whileHover={{ scale: 1.15 }}
                    aria-label={t(`theme_selector.${key}`)}
                  >
                    <span className="theme-selector__icon">{icon}</span>
                    <span className="theme-selector__label">{t(`theme_selector.${key}`)}</span>
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
