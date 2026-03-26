import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const STACK_ITEMS = [
  'React', 'Vite', 'JavaScript', 'HTML/CSS', 'Sass',
  'Tailwind', 'Node.js', 'Git', 'Figma', 'Responsive',
];

const SERVICES = [
  { key: 'web_creation', icon: 'globe' },
  { key: 'integration', icon: 'code' },
  { key: 'redesign', icon: 'refresh' },
  { key: 'maintenance', icon: 'wrench' },
  { key: 'optimization', icon: 'zap' },
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

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function FusionServices() {
  const { t } = useTranslation();

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

        {/* Asymmetric bento grid for services */}
        <div className="fusion-services__bento">
          {SERVICES.map(({ key, icon }, index) => (
            <motion.article
              key={key}
              className={`fusion-services__card fusion-services__card--${index + 1}`}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
              whileHover={{ y: -4 }}
            >
              <div className="fusion-services__card-border" aria-hidden="true" />
              <div className="fusion-services__card-inner">
                <ServiceIcon type={icon} />
                <h3 className="fusion-services__card-title">
                  {t(`services.${key}`)}
                </h3>
                <p className="fusion-services__card-desc">
                  {t(`services.${key}_desc`)}
                </p>
              </div>
              {/* Geometric decoration */}
              <div className="fusion-services__card-deco" aria-hidden="true" />
            </motion.article>
          ))}

          {/* Tech stack card — spans wider */}
          <motion.article
            className="fusion-services__card fusion-services__card--stack"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="fusion-services__card-border" aria-hidden="true" />
            <div className="fusion-services__card-inner">
              <h3 className="fusion-services__card-title">
                {t('services.stack_title')}
              </h3>
              <div className="fusion-services__stack-tags">
                {STACK_ITEMS.map((tech, i) => (
                  <motion.span
                    key={tech}
                    className="fusion-services__stack-tag"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.article>

          {/* Creative edge */}
          <motion.article
            className="fusion-services__card fusion-services__card--creative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="fusion-services__card-border" aria-hidden="true" />
            <div className="fusion-services__card-inner">
              <h3 className="fusion-services__card-title">
                {t('services.creative_title')}
              </h3>
              <p className="fusion-services__card-desc">
                {t('services.creative_desc')}
              </p>
              {/* Organic wave decoration */}
              <svg
                className="fusion-services__organic-deco"
                viewBox="0 0 200 60"
                aria-hidden="true"
              >
                <path
                  d="M0,30 Q50,0 100,30 Q150,60 200,30"
                  fill="none"
                  stroke="var(--color-primary)"
                  strokeWidth="2"
                  opacity="0.3"
                />
              </svg>
            </div>
          </motion.article>

          {/* Technical background */}
          <motion.article
            className="fusion-services__card fusion-services__card--network"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="fusion-services__card-border" aria-hidden="true" />
            <div className="fusion-services__card-inner">
              <h3 className="fusion-services__card-title">
                {t('services.network_title')}
              </h3>
              <p className="fusion-services__card-desc">
                {t('services.network_desc')}
              </p>
              {/* Geometric grid decoration */}
              <div className="fusion-services__grid-deco" aria-hidden="true">
                {Array.from({ length: 9 }).map((_, i) => (
                  <span key={i} className="fusion-services__grid-dot" />
                ))}
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
