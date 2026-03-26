import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../../components/ProjectCard';
import VideoCard from '../../components/VideoCard';
import { webProjects, videoProjects } from '../../data/projects';

const filters = ['all', 'web', 'video'];

export default function CodePortfolio() {
  const { t } = useTranslation();
  const [active, setActive] = useState('all');

  const showWeb = active === 'all' || active === 'web';
  const showVideo = active === 'all' || active === 'video';

  return (
    <section className="code-portfolio section" id="portfolio">
      <h2 className="section__title">{t('portfolio.title')}</h2>

      <div className="code-portfolio__tabs">
        {filters.map((f) => (
          <button
            key={f}
            className={`code-portfolio__tab ${active === f ? 'active' : ''}`}
            onClick={() => setActive(f)}
          >
            {t(`portfolio.filter_${f}`)}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {showWeb && (
          <motion.div
            key="web"
            className="code-portfolio__grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {webProjects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {showVideo && (
          <motion.div
            key="video"
            className="code-portfolio__videos"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {videoProjects.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
