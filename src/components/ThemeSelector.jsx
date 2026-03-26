import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hooks/useTheme';
import { THEMES } from '../context/ThemeContext';
import './ThemeSelector.css';

const themeOptions = [
  { key: THEMES.OCEAN, icon: '🌊', angle: 210 },
  { key: THEMES.CODE, icon: '💻', angle: 330 },
  { key: THEMES.FUSION, icon: '⚡', angle: 90 },
];

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
          <motion.line
            x1="20" y1="20" x2="20" y2="6"
            strokeWidth="2.5"
            strokeLinecap="round"
            animate={{ rotate: isOpen ? 360 : 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            style={{ originX: '20px', originY: '20px' }}
          />
          <circle cx="20" cy="20" r="3" />
        </svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="theme-selector__options"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            {themeOptions.map(({ key, icon, angle }) => {
              const rad = (angle * Math.PI) / 180;
              const x = Math.cos(rad) * 60;
              const y = Math.sin(rad) * 60;
              return (
                <motion.button
                  key={key}
                  className={`theme-selector__option ${theme === key ? 'active' : ''}`}
                  onClick={() => handleSelect(key)}
                  initial={{ opacity: 0, x: 0, y: 0 }}
                  animate={{ opacity: 1, x, y: -y }}
                  exit={{ opacity: 0, x: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.2 }}
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
  );
}
