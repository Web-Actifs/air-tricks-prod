import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const services = [
  { key: 'web_creation', icon: '+' },
  { key: 'integration', icon: '>' },
  { key: 'redesign', icon: '~' },
  { key: 'maintenance', icon: '#' },
  { key: 'optimization', icon: '^' },
];

const stack = ['HTML5', 'CSS3/Sass', 'JavaScript', 'React', 'Astro.js', 'Responsive', 'SEO'];

export default function CodeServices() {
  const { t } = useTranslation();

  return (
    <section className="code-services section" id="services">
      <h2 className="section__title">
        <span className="code-services__comment">{'// '}</span>
        {t('services.title')}
      </h2>
      <p className="section__subtitle">{t('services.subtitle')}</p>

      <div className="code-services__grid">
        {services.map(({ key, icon }, i) => (
          <motion.div
            key={key}
            className="code-services__card"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="code-services__card-header">
              <span className="code-services__line-num">{i + 1}</span>
              <span className="code-services__icon">{icon}</span>
              <h3>{t(`services.${key}`)}</h3>
            </div>
            <p>{t(`services.${key}_desc`)}</p>
          </motion.div>
        ))}
      </div>

      <div className="code-services__stack">
        <h3>{t('services.stack_title')}</h3>
        <div className="code-services__stack-list">
          {stack.map((tech) => (
            <span key={tech} className="code-services__tech">{tech}</span>
          ))}
        </div>
      </div>

      <div className="code-services__extras">
        <div className="code-services__extra">
          <h3>{t('services.creative_title')}</h3>
          <p>{t('services.creative_desc')}</p>
        </div>
        <div className="code-services__extra">
          <h3>{t('services.network_title')}</h3>
          <p>{t('services.network_desc')}</p>
        </div>
      </div>
    </section>
  );
}
