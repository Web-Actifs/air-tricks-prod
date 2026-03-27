import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function OceanHero() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section className="ocean-hero" ref={sectionRef}>
      {/* Background gradient (placeholder for video) */}
      <div className="ocean-hero__bg" aria-hidden="true">
        <div className="ocean-hero__gradient" />
        {/* Ambient floating particles */}
        <div className="ocean-hero__particles">
          {Array.from({ length: 18 }).map((_, i) => (
            <span key={i} className="ocean-hero__particle" style={{
              '--delay': `${i * 0.7}s`,
              '--x': `${10 + Math.random() * 80}%`,
              '--size': `${2 + Math.random() * 4}px`,
              '--duration': `${6 + Math.random() * 8}s`,
            }} />
          ))}
        </div>
      </div>

      {/* Parallax text content */}
      <motion.div
        className="ocean-hero__content"
        style={{ y: textY, opacity: textOpacity }}
      >
        <motion.h1
          className="ocean-hero__title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {t('hero.title')}
        </motion.h1>

        <motion.p
          className="ocean-hero__tagline"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
        >
          {t('hero.tagline')}
        </motion.p>

        <motion.div
          className="ocean-hero__cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
        >
          <Link to="/portfolio" className="ocean-btn ocean-btn--primary">
            {t('hero.cta_portfolio')}
          </Link>
          <Link to="/contact" className="ocean-btn ocean-btn--outline">
            {t('hero.cta_contact')}
          </Link>
        </motion.div>
      </motion.div>

      {/* Animated SVG wave at bottom */}
      <div className="ocean-hero__wave" aria-hidden="true">
        <svg
          className="ocean-wave-svg"
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
        >
          <path
            className="ocean-wave-svg__layer ocean-wave-svg__layer--1"
            d="M0,120 C240,180 480,60 720,120 C960,180 1200,60 1440,120 L1440,180 L0,180 Z"
          />
          <path
            className="ocean-wave-svg__layer ocean-wave-svg__layer--2"
            d="M0,140 C320,80 640,160 960,100 C1120,70 1300,150 1440,130 L1440,180 L0,180 Z"
          />
          <path
            className="ocean-wave-svg__layer ocean-wave-svg__layer--3"
            d="M0,155 C200,130 400,170 600,150 C800,130 1000,170 1200,145 C1350,130 1400,160 1440,155 L1440,180 L0,180 Z"
          />
        </svg>
      </div>
    </section>
  );
}
