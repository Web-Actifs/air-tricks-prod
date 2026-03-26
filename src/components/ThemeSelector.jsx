import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hooks/useTheme';
import { THEMES } from '../context/ThemeContext';
import './ThemeSelector.css';

const themeOptions = [
  { key: THEMES.OCEAN, icon: '🌊', angle: 180 },
  { key: THEMES.FUSION, icon: '⚡', angle: 90 },
  { key: THEMES.CODE, icon: '💻', angle: 135 },
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

  const handleSelect = (newTheme) => {
    switchTheme(newTheme);
    setIsOpen(false);
  };

  return (
    <div className="theme-selector" aria-label={t('theme_selector.label')}>
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
          onClick={() => setIsOpen(!isOpen)}
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
