import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import './ProjectCard.css';

export default function ProjectCard({ project }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <motion.article
      className="project-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className="project-card__image">
        {project.image ? (
          <img src={project.image} alt={project.title} loading="lazy" />
        ) : (
          <div className="project-card__placeholder">
            <span>{project.title[0]}</span>
          </div>
        )}
        {project.isTraining && (
          <span className="project-card__badge">{t('portfolio.training_badge')}</span>
        )}
      </div>
      <div className="project-card__content">
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__desc">{project.description[lang] || project.description.fr}</p>
        <div className="project-card__stack">
          {project.stack.map((tech) => (
            <span key={tech} className="project-card__tech">{tech}</span>
          ))}
        </div>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="project-card__link"
        >
          {t('portfolio.view_site')} →
        </a>
      </div>
    </motion.article>
  );
}
