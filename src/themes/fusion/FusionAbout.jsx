import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const timeline = [
  { icon: '🔧', titleKey: 'about.network', period: '15 ans', side: 'left' },
  { icon: '🌊', titleKey: 'about.kite', period: 'Air Tricks Prod', side: 'right' },
  { icon: '💻', titleKey: 'about.dev', period: 'OpenClassrooms', side: 'left' },
];

export default function FusionAbout() {
  const { t } = useTranslation();

  return (
    <section className="fusion-about section" id="about">
      <h2 className="section__title">{t('about.title')}</h2>
      <p className="section__subtitle">{t('about.intro')}</p>

      <div className="fusion-about__split">
        <div className="fusion-about__creative">
          <div className="fusion-about__gradient-blob fusion-about__gradient-blob--ocean" />
          <h3>{t('about.name')}</h3>
        </div>
        <div className="fusion-about__tech">
          <div className="fusion-about__gradient-blob fusion-about__gradient-blob--code" />
        </div>
      </div>

      <div className="fusion-about__timeline">
        {timeline.map((item, i) => (
          <motion.div
            key={item.titleKey}
            className={`fusion-about__timeline-item fusion-about__timeline-item--${item.side}`}
            initial={{ opacity: 0, x: item.side === 'left' ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
          >
            <span className="fusion-about__timeline-icon">{item.icon}</span>
            <div className="fusion-about__timeline-content">
              <span className="fusion-about__timeline-period">{item.period}</span>
              <p>{t(item.titleKey)}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
