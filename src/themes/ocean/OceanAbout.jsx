import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const TIMELINE = [
  { key: 'network', icon: 'server' },
  { key: 'kite', icon: 'wind' },
  { key: 'dev', icon: 'code' },
];

const ICON_MAP = {
  server: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" />
      <circle cx="6" cy="6" r="1" fill="currentColor" />
      <circle cx="6" cy="18" r="1" fill="currentColor" />
    </svg>
  ),
  wind: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.59 4.59A2 2 0 1111 8H2" />
      <path d="M12.59 19.41A2 2 0 1014 16H2" />
      <path d="M17.73 7.73A2.5 2.5 0 1119.5 12H2" />
    </svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
};

export default function OceanAbout() {
  const { t } = useTranslation();

  return (
    <section className="ocean-about">
      {/* Organic blob decorations */}
      <div className="ocean-about__blobs" aria-hidden="true">
        <div className="ocean-about__blob ocean-about__blob--1" />
        <div className="ocean-about__blob ocean-about__blob--2" />
      </div>

      <div className="ocean-about__inner">
        <motion.h2
          className="ocean-section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('about.title')}
        </motion.h2>

        <motion.p
          className="ocean-about__intro"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {t('about.intro')}
        </motion.p>

        {/* Timeline */}
        <div className="ocean-timeline">
          <div className="ocean-timeline__line" aria-hidden="true" />

          {TIMELINE.map(({ key, icon }, i) => (
            <motion.div
              key={key}
              className={`ocean-timeline__item ${i % 2 === 0 ? 'ocean-timeline__item--left' : 'ocean-timeline__item--right'}`}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="ocean-timeline__dot" aria-hidden="true">
                {ICON_MAP[icon]}
              </div>
              <div className="ocean-timeline__card">
                <p className="ocean-timeline__text">{t(`about.${key}`)}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="ocean-about__name"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          &mdash; {t('about.name')}
        </motion.p>
      </div>
    </section>
  );
}
