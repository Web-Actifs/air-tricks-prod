import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../../components/ProjectCard';
import VideoCard from '../../components/VideoCard';
import TiltCard from '../../components/TiltCard';
import { webProjects, videoProjects } from '../../data/projects';

const filters = ['all', 'web', 'video'];

// Tilt « machine » : ressort sec et précis, snap net, lueur néon + scanline
const codeTilt = {
  className: 'code-tilt',
  maxTilt: 9,
  scale: 1.02,
  stiffness: 420,
  damping: 26,
  perspective: 700,
  translateZ: 6,
  glareColor: 'rgba(74, 222, 128, 0.16)',
  glareSpread: 55,
};

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

      {showWeb && showVideo && (
        <div className="code-portfolio__separator code-portfolio__separator--top">
          <h3 className="code-portfolio__subsection-title">{t('portfolio.web_title')}</h3>
        </div>
      )}

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
              <TiltCard key={p.id} {...codeTilt}>
                <ProjectCard project={p} />
              </TiltCard>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {showWeb && showVideo && (
        <div className="code-portfolio__separator">
          <h3 className="code-portfolio__subsection-title">{t('portfolio.videos_title')}</h3>
        </div>
      )}

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
              <TiltCard key={v.id} {...codeTilt}>
                <VideoCard video={v} />
              </TiltCard>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
