import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

// Rayons irréguliers : largeurs, angles, positions et rythmes non uniformes,
// évasés depuis la surface (transform-origin en haut) pour un rendu réaliste.
const OCEAN_RAYS = [
  { left: 16, width: 58, rotate: -13, opacity: 0.10, duration: 11, delay: 0 },
  { left: 29, width: 34, rotate: -8,  opacity: 0.06, duration: 14, delay: 1.6 },
  { left: 43, width: 92, rotate: -3,  opacity: 0.12, duration: 9,  delay: 0.6 },
  { left: 54, width: 26, rotate: 2,   opacity: 0.05, duration: 13, delay: 2.3 },
  { left: 62, width: 68, rotate: 6,   opacity: 0.10, duration: 10, delay: 0.9 },
  { left: 75, width: 44, rotate: 11,  opacity: 0.08, duration: 12, delay: 1.9 },
  { left: 87, width: 30, rotate: 16,  opacity: 0.05, duration: 15, delay: 0.3 },
];

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
        {/* Brume marine floutée qui dérive */}
        <div className="ocean-hero__haze" />
        {/* Rayons de lumière filtrant depuis la surface */}
        <div className="ocean-hero__rays">
          {OCEAN_RAYS.map((r, i) => (
            <span key={i} className="ocean-hero__ray" style={{
              '--left': `${r.left}%`,
              '--width': `${r.width}px`,
              '--rotate': `${r.rotate}deg`,
              '--opacity': r.opacity,
              '--duration': `${r.duration}s`,
              '--delay': `${r.delay}s`,
            }} />
          ))}
        </div>
        {/* Ambient floating particles */}
        <div className="ocean-hero__particles">
          {Array.from({ length: 28 }).map((_, i) => {
            const size = 1.5 + Math.pow(Math.random(), 2.4) * 9;
            const blur = size < 4 ? (4 - size) * 0.5 : 0;
            return (
              <span key={i} className="ocean-hero__particle" style={{
                '--delay': `${(i * 0.5).toFixed(2)}s`,
                '--x': `${5 + Math.random() * 90}%`,
                '--size': `${size.toFixed(1)}px`,
                '--duration': `${7 + Math.random() * 9}s`,
                '--sway': `${(Math.random() * 70 - 35).toFixed(0)}px`,
                '--blur': `${blur.toFixed(1)}px`,
              }} />
            );
          })}
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

        <motion.p
          className="ocean-hero__subline"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        >
          {t('hero.subline')}
        </motion.p>

        <motion.div
          className="ocean-hero__cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: 'easeOut' }}
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
