import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

const STACK_ITEMS = [
  'HTML5', 'CSS3/Sass', 'JavaScript', 'React', 'Vite',
  'Framer Motion', 'Tailwind', 'Astro.js', 'Node.js', 'Git',
  'Figma', 'Premiere Pro', 'Responsive', 'SEO',
];

const SERVICES = [
  { key: 'web_creation', icon: 'globe'   },
  { key: 'integration',  icon: 'code'    },
  { key: 'redesign',     icon: 'refresh' },
  { key: 'maintenance',  icon: 'wrench'  },
  { key: 'optimization', icon: 'zap'     },
];

function ServiceIcon({ type }) {
  const icons = {
    globe: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    code: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    refresh: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 4 23 10 17 10" />
        <polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
      </svg>
    ),
    wrench: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    zap: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  };
  return <span className="fusion-services__icon">{icons[type]}</span>;
}

export default function FusionServices() {
  const { t } = useTranslation();
  const [activeIdx, setActiveIdx] = useState(0);

  const ownershipItems = t('services.ownership_items').split(/\s*·\s*/);

  return (
    <section className="fusion-services">
      <div className="fusion-services__container">

        <motion.div
          className="fusion-services__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="fusion-services__title">{t('services.title')}</h2>
          <p className="fusion-services__subtitle">{t('services.subtitle')}</p>
        </motion.div>

        {/* ── 2-column asymmetric layout ── */}
        <div className="fusion-services__layout">

          {/* Left: expandable service accordion */}
          <div className="fusion-services__left">
            {SERVICES.map(({ key, icon }, i) => (
              <motion.div
                key={key}
                className={`fusion-item${activeIdx === i ? ' fusion-item--open' : ''}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                onClick={() => setActiveIdx(activeIdx === i ? null : i)}
              >
                <div className="fusion-item__header">
                  <ServiceIcon type={icon} />
                  <h3 className="fusion-item__title">{t(`services.${key}`)}</h3>
                  <span className="fusion-item__toggle" aria-hidden="true">
                    {activeIdx === i ? '−' : '+'}
                  </span>
                </div>
                <AnimatePresence initial={false}>
                  {activeIdx === i && (
                    <motion.div
                      className="fusion-item__body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <p className="fusion-item__desc">{t(`services.${key}_desc`)}</p>
                      <span className="fusion-item__ai-tag">✦ {t('services.ai_badge')}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Right: sticky identity column */}
          <motion.div
            className="fusion-services__right"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="fusion-identity">

              <div className="fusion-identity__block fusion-identity__block--ai">
                <span className="fusion-identity__label">
                  <span className="fusion-identity__dot fusion-identity__dot--ai" />
                  IA co-pilote
                </span>
                <p className="fusion-identity__value">Claude Code</p>
                <p className="fusion-identity__sub">{t('services.ai_desc')}</p>
              </div>

              <div className="fusion-identity__block fusion-identity__block--az">
                <span className="fusion-identity__label">
                  <span className="fusion-identity__dot fusion-identity__dot--az" />
                  {t('services.az_title')}
                </span>
                <ul className="fusion-identity__list">
                  {ownershipItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="fusion-identity__block fusion-identity__block--seo">
                <span className="fusion-identity__label">
                  <span className="fusion-identity__dot fusion-identity__dot--seo" />
                  SEO + GEO
                </span>
                <p className="fusion-identity__sub">
                  {t('services.seo_human_title')}.<br />
                  {t('services.seo_geo_title')}.
                </p>
                <span className="fusion-identity__geo-badge">{t('services.seo_geo_label')}</span>
              </div>

            </div>
          </motion.div>
        </div>

        {/* ── Stack ── */}
        <motion.div
          className="fusion-services__stack-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="fusion-services__stack-heading">{t('services.stack_title')}</h3>
          <div className="fusion-services__stack-tags">
            {STACK_ITEMS.map((tech, i) => (
              <motion.span
                key={tech}
                className="fusion-services__stack-tag"
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.04 }}
                whileHover={{ scale: 1.08 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* ── SEO / GEO full split ── */}
        <motion.div
          className="fusion-seo-split"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="fusion-seo__col fusion-seo__col--human">
            <h3 className="fusion-seo__col-title">{t('services.seo_human_title')}</h3>
            <p className="fusion-seo__col-desc">{t('services.seo_human_desc')}</p>
          </div>
          <div className="fusion-seo__sep" aria-hidden="true">
            <div className="fusion-seo__sep-line" />
            <span className="fusion-seo__sep-label">SEO ↔ GEO</span>
            <div className="fusion-seo__sep-line" />
          </div>
          <div className="fusion-seo__col fusion-seo__col--geo">
            <h3 className="fusion-seo__col-title">{t('services.seo_geo_title')}</h3>
            <p className="fusion-seo__col-desc">{t('services.seo_geo_desc')}</p>
            <span className="fusion-seo__geo-badge">{t('services.seo_geo_label')}</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
