import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { webProjects } from '../data/projects';
import { caseStudies } from '../data/caseStudies';
import { DEFAULT_TITLE, DEFAULT_DESCRIPTION } from '../seo/meta';
import './ProjectPage.css';

export default function ProjectPage() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith('en') ? 'en' : 'fr';

  const project = webProjects.find((p) => p.id === id);
  const study = caseStudies[id];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!project || !study) return undefined;
    const title = `${project.title} — ${t('project.case_study')} | Air Tricks Prod`;
    const description = study.problem[lang];
    const meta = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    document.title = title;
    meta?.setAttribute('content', description);
    ogTitle?.setAttribute('content', title);
    ogDesc?.setAttribute('content', description);
    return () => {
      document.title = DEFAULT_TITLE;
      meta?.setAttribute('content', DEFAULT_DESCRIPTION);
      ogTitle?.setAttribute('content', DEFAULT_TITLE);
      ogDesc?.setAttribute('content', DEFAULT_DESCRIPTION);
    };
  }, [project, study, lang, t]);

  if (!project || !study) {
    return <Navigate to="/portfolio" replace />;
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    url: `https://airtricksprod.fr/portfolio/${project.id}`,
    about: study.solution[lang],
    author: {
      '@type': 'Person',
      name: 'Guillaume Etienne',
      url: 'https://airtricksprod.fr',
    },
    ...(project.url && { sameAs: project.url }),
  };

  const sections = [
    { key: 'problem', label: t('project.problem') },
    { key: 'solution', label: t('project.solution') },
    { key: 'result', label: t('project.result') },
  ];

  return (
    <main className="project-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="project-page__container">
        <Link to="/portfolio" className="project-page__back">
          {t('project.back')}
        </Link>

        <motion.header
          className="project-page__header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="project-page__kicker">{t('project.case_study')}</span>
          <h1 className="project-page__title">{project.title}</h1>
          <div className="project-page__stack">
            {project.stack.map((tech) => (
              <span key={tech} className="project-page__tech">{tech}</span>
            ))}
          </div>
          {project.isTraining && (
            <p className="project-page__training">{t('project.training_note')}</p>
          )}
        </motion.header>

        {project.image && (
          <motion.div
            className="project-page__image"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <img src={project.image} alt={`Capture d'écran de ${project.title}`} />
          </motion.div>
        )}

        <div className="project-page__sections">
          {sections.map(({ key, label }, i) => (
            <motion.section
              key={key}
              className={`project-page__section project-page__section--${key}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <h2 className="project-page__section-title">
                <span className="project-page__section-num">0{i + 1}</span>
                {label}
              </h2>
              <p className="project-page__section-text">{study[key][lang]}</p>
            </motion.section>
          ))}
        </div>

        <motion.section
          className="project-page__features"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="project-page__section-title">{t('project.features')}</h2>
          <ul className="project-page__features-list">
            {study.features[lang].map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </motion.section>

        <div className="project-page__actions">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="project-page__visit"
          >
            {t('project.visit')} ↗
          </a>
        </div>

        <motion.aside
          className="project-page__cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="project-page__cta-title">{t('project.cta_title')}</h2>
          <p className="project-page__cta-text">{t('project.cta_text')}</p>
          <Link to="/contact" className="project-page__cta-button">
            {t('project.cta_button')}
          </Link>
        </motion.aside>
      </div>
    </main>
  );
}
