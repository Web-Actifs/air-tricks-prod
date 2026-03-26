import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

const WaveSVG = () => (
  <svg
    className="fusion-hero__wave"
    viewBox="0 0 600 200"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <path
      d="M0,100 C100,180 200,20 300,100 C400,180 500,20 600,100 L600,200 L0,200 Z"
      fill="rgba(255,255,255,0.08)"
    />
    <path
      d="M0,120 C120,180 240,60 360,120 C480,180 540,60 600,120 L600,200 L0,200 Z"
      fill="rgba(255,255,255,0.05)"
    />
  </svg>
);

const CodeDecoration = () => (
  <div className="fusion-hero__code-lines" aria-hidden="true">
    <motion.span
      className="fusion-hero__code-line"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 0.6, x: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
    >
      {'const '}
      <span className="fusion-hero__code-fn">create</span>
      {' = ('}
      <span className="fusion-hero__code-param">vision</span>
      {') => {'}
    </motion.span>
    <motion.span
      className="fusion-hero__code-line fusion-hero__code-line--indent"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 0.5, x: 0 }}
      transition={{ delay: 1.0, duration: 0.6 }}
    >
      {'return '}
      <span className="fusion-hero__code-str">wind</span>
      {' + '}
      <span className="fusion-hero__code-str">pixels</span>
      {';'}
    </motion.span>
    <motion.span
      className="fusion-hero__code-line"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 0.4, x: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
    >
      {'};'}
    </motion.span>
  </div>
);

export default function FusionHero() {
  const { t } = useTranslation();

  return (
    <section className="fusion-hero">
      {/* Left half: creative / ocean side */}
      <div className="fusion-hero__left">
        <div className="fusion-hero__left-bg" aria-hidden="true" />
        <WaveSVG />
        {/* Kite silhouette decoration */}
        <motion.div
          className="fusion-hero__kite"
          aria-hidden="true"
          initial={{ opacity: 0, y: -30, rotate: -15 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
        >
          <svg viewBox="0 0 80 100" className="fusion-hero__kite-svg">
            <polygon points="40,0 80,40 40,100 0,40" fill="rgba(255,255,255,0.15)" />
            <line x1="40" y1="0" x2="40" y2="100" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <line x1="0" y1="40" x2="80" y2="40" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          </svg>
        </motion.div>
      </div>

      {/* Right half: tech / code side */}
      <div className="fusion-hero__right">
        <div className="fusion-hero__right-bg" aria-hidden="true" />
        <CodeDecoration />
        {/* Terminal dot decorations */}
        <div className="fusion-hero__terminal-dots" aria-hidden="true">
          <span className="fusion-hero__dot fusion-hero__dot--red" />
          <span className="fusion-hero__dot fusion-hero__dot--yellow" />
          <span className="fusion-hero__dot fusion-hero__dot--green" />
        </div>
      </div>

      {/* Center fusion blend */}
      <div className="fusion-hero__blend" aria-hidden="true" />

      {/* Content spanning both halves */}
      <div className="fusion-hero__content">
        <motion.h1
          className="fusion-hero__title"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          {t('hero.title')}
        </motion.h1>
        <motion.p
          className="fusion-hero__tagline"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          {t('hero.tagline')}
        </motion.p>
        <motion.div
          className="fusion-hero__ctas"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          <Link to="/portfolio" className="fusion-hero__cta fusion-hero__cta--primary">
            {t('hero.cta_portfolio')}
          </Link>
          <Link to="/contact" className="fusion-hero__cta fusion-hero__cta--secondary">
            {t('hero.cta_contact')}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
