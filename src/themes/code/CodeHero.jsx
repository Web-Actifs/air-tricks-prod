import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const codeLines = [
  'const developer = {',
  "  name: 'Guillaume Etienne',",
  "  alias: 'Air Tricks Prod',",
  "  from: 'kitesurf & video',",
  "  to: 'web development',",
  "  passion: 'creating experiences'",
  '};',
];

export default function CodeHero() {
  const { t } = useTranslation();
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  useEffect(() => {
    if (currentLine >= codeLines.length) return;
    const line = codeLines[currentLine];
    if (currentChar < line.length) {
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => {
          const updated = [...prev];
          updated[currentLine] = line.substring(0, currentChar + 1);
          return updated;
        });
        setCurrentChar((c) => c + 1);
      }, 30);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
        setDisplayedLines((prev) => [...prev, '']);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [currentLine, currentChar]);

  return (
    <section className="code-hero" id="home">
      <div className="code-hero__terminal">
        <div className="code-hero__terminal-bar">
          <span className="code-hero__dot code-hero__dot--red" />
          <span className="code-hero__dot code-hero__dot--yellow" />
          <span className="code-hero__dot code-hero__dot--green" />
          <span className="code-hero__terminal-title">developer.js</span>
        </div>
        <div className="code-hero__terminal-body">
          {displayedLines.map((line, i) => (
            <div key={i} className="code-hero__line">
              <span className="code-hero__line-num">{i + 1}</span>
              <span className="code-hero__line-code">{line}</span>
              {i === currentLine && currentLine < codeLines.length && (
                <span className="code-hero__cursor">|</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <motion.div
        className="code-hero__content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <h1 className="code-hero__title">{t('hero.title')}</h1>
        <p className="code-hero__tagline">{t('hero.tagline')}</p>
        <div className="code-hero__actions">
          <Link to="/portfolio" className="code-hero__btn code-hero__btn--primary">
            <span className="code-hero__btn-prefix">$</span> {t('hero.cta_portfolio')}
          </Link>
          <Link to="/contact" className="code-hero__btn code-hero__btn--secondary">
            <span className="code-hero__btn-prefix">$</span> {t('hero.cta_contact')}
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
