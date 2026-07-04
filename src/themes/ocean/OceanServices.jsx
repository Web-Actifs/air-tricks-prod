import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SERVICE_ICONS = {
  web_creation: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
    </svg>
  ),
  integration: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  redesign: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  ),
  maintenance: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  optimization: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
};

const STACK_ITEMS = [
  'HTML5', 'CSS3/Sass', 'JavaScript', 'React', 'Vite',
  'Framer Motion', 'Tailwind', 'Astro.js', 'Node.js', 'Git',
  'Figma', 'Premiere Pro', 'Responsive', 'SEO',
];

const TIMELINE_STEPS = [
  { key: 'brief',    ai: false },
  { key: 'design',   ai: false },
  { key: 'dev',      ai: true  },
  { key: 'infra',    ai: false },
  { key: 'seo_step', ai: true  },
  { key: 'support',  ai: true  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
};

export default function OceanServices() {
  const { t } = useTranslation();

  const services = [
    { key: 'web_creation', icon: SERVICE_ICONS.web_creation },
    { key: 'integration',  icon: SERVICE_ICONS.integration  },
    { key: 'redesign',     icon: SERVICE_ICONS.redesign     },
    { key: 'maintenance',  icon: SERVICE_ICONS.maintenance  },
    { key: 'optimization', icon: SERVICE_ICONS.optimization },
  ];

  return (
    <section className="ocean-services">
      <div className="ocean-wave-divider" aria-hidden="true">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,80 C480,0 960,100 1440,30 L1440,0 L0,0 Z" fill="var(--color-bg)" />
        </svg>
      </div>

      <div className="ocean-services__inner">
        <motion.h2
          className="ocean-section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('services.title')}
        </motion.h2>
        <motion.p
          className="ocean-section-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {t('services.subtitle')}
        </motion.p>

        {/* ── A-Z Timeline ── */}
        <motion.div
          className="ocean-services__az"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="ocean-az__header">
            <span className="ocean-az__tag">{t('services.az_title')}</span>
            <p className="ocean-az__subtitle">{t('services.az_sub')}</p>
          </div>

          <div className="ocean-az__track">
            <div className="ocean-az__rail" aria-hidden="true" />
            {TIMELINE_STEPS.map((step, i) => (
              <motion.div
                key={step.key}
                className="ocean-az__step"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
              >
                <div className="ocean-az__step-num">{i + 1}</div>
                <div className="ocean-az__step-body">
                  <h3 className="ocean-az__step-title">{t(`services.step_${step.key}`)}</h3>
                  <p className="ocean-az__step-desc">{t(`services.step_${step.key}_desc`)}</p>
                  {step.ai && (
                    <span className="ocean-az__ai-badge">✦ {t('services.ai_badge')}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Service cards ── */}
        <div className="ocean-services__grid">
          {services.map(({ key, icon }, i) => (
            <motion.div
              key={key}
              className="ocean-service-card"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              whileHover={{ y: -6, boxShadow: '0 12px 40px var(--color-shadow)' }}
            >
              <div className="ocean-service-card__icon">{icon}</div>
              <h3 className="ocean-service-card__title">{t(`services.${key}`)}</h3>
              <p className="ocean-service-card__desc">{t(`services.${key}_desc`)}</p>
            </motion.div>
          ))}
        </div>

        {/* ── Pricing ── */}
        <motion.div
          className="ocean-pricing"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="ocean-pricing__text">{t('services.pricing_text')}</p>
          <p className="ocean-pricing__sub">{t('services.pricing_sub')}</p>
          <Link to="/contact" className="ocean-btn ocean-btn--primary">
            {t('services.pricing_cta')}
          </Link>
        </motion.div>

        {/* ── SEO / GEO split ── */}
        <motion.div
          className="ocean-seo-split"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="ocean-seo-split__col ocean-seo-split__col--human">
            <div className="ocean-seo-split__icon" aria-hidden="true">◎</div>
            <h3 className="ocean-seo-split__col-title">{t('services.seo_human_title')}</h3>
            <p className="ocean-seo-split__col-desc">{t('services.seo_human_desc')}</p>
          </div>
          <div className="ocean-seo-split__divider" aria-hidden="true">
            <div className="ocean-seo-split__divider-line" />
            <span className="ocean-seo-split__divider-label">SEO ↔ GEO</span>
            <div className="ocean-seo-split__divider-line" />
          </div>
          <div className="ocean-seo-split__col ocean-seo-split__col--geo">
            <div className="ocean-seo-split__icon" aria-hidden="true">⟡</div>
            <h3 className="ocean-seo-split__col-title">{t('services.seo_geo_title')}</h3>
            <p className="ocean-seo-split__col-desc">{t('services.seo_geo_desc')}</p>
            <span className="ocean-seo-split__geo-badge">{t('services.seo_geo_label')}</span>
          </div>
        </motion.div>

        {/* ── Stack ── */}
        <motion.div
          className="ocean-services__stack"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="ocean-services__stack-title">{t('services.stack_title')}</h3>
          <div className="ocean-services__stack-list">
            {STACK_ITEMS.map((tech) => (
              <span key={tech} className="ocean-stack-tag">{tech}</span>
            ))}
          </div>
        </motion.div>

        {/* ── Highlights ── */}
        <div className="ocean-services__highlights">
          <motion.div
            className="ocean-highlight-card ocean-highlight-card--creative"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="ocean-highlight-card__title">{t('services.creative_title')}</h3>
            <p className="ocean-highlight-card__desc">{t('services.creative_desc')}</p>
          </motion.div>
          <motion.div
            className="ocean-highlight-card ocean-highlight-card--network"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="ocean-highlight-card__title">{t('services.network_title')}</h3>
            <p className="ocean-highlight-card__desc">{t('services.network_desc')}</p>
          </motion.div>
        </div>
      </div>

      <div className="ocean-wave-divider ocean-wave-divider--bottom" aria-hidden="true">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,20 C480,100 960,0 1440,70 L1440,100 L0,100 Z" fill="var(--color-bg)" />
        </svg>
      </div>
    </section>
  );
}
