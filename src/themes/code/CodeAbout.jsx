import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function CodeAbout() {
  const { t } = useTranslation();

  const jsonData = [
    { key: 'name', value: `"${t('about.name')}"`, color: 'var(--code-string)' },
    { key: 'role', value: '"Web Developer"', color: 'var(--code-string)' },
    { key: 'network_xp', value: '"15 years"', color: 'var(--code-number)' },
    { key: 'creative', value: '"Air Tricks Prod — Kitesurf Video"', color: 'var(--code-string)' },
    { key: 'certification', value: '"OpenClassrooms"', color: 'var(--code-string)' },
  ];

  return (
    <section className="code-about section" id="about">
      <h2 className="section__title">
        <span className="code-services__comment">{'// '}</span>
        {t('about.title')}
      </h2>

      <motion.div
        className="code-about__file"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="code-about__file-bar">
          <span className="code-hero__dot code-hero__dot--red" />
          <span className="code-hero__dot code-hero__dot--yellow" />
          <span className="code-hero__dot code-hero__dot--green" />
          <span>about.json</span>
        </div>
        <div className="code-about__file-body">
          <div className="code-hero__line">
            <span className="code-hero__line-num">1</span>
            <span>{'{'}</span>
          </div>
          {jsonData.map((item, i) => (
            <div key={item.key} className="code-hero__line">
              <span className="code-hero__line-num">{i + 2}</span>
              <span style={{ color: 'var(--code-key)' }}>  "{item.key}"</span>
              <span>: </span>
              <span style={{ color: item.color }}>{item.value}</span>
              {i < jsonData.length - 1 && <span>,</span>}
            </div>
          ))}
          <div className="code-hero__line">
            <span className="code-hero__line-num">{jsonData.length + 2}</span>
            <span>{'}'}</span>
          </div>
        </div>
      </motion.div>

      <div className="code-about__bio">
        <p>{t('about.intro')}</p>
        <p>{t('about.network')}</p>
        <p>{t('about.kite')}</p>
        <p>{t('about.dev')}</p>
      </div>
    </section>
  );
}
