import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../../components/ProjectCard';
import VideoCard from '../../components/VideoCard';
import TiltCard from '../../components/TiltCard';
import { webProjects, videoProjects } from '../../data/projects';

// Tilt « flottant » : ressort mou, amplitude douce, pop profond, reflet cyan caustique
const oceanTilt = {
  className: 'ocean-tilt',
  maxTilt: 6,
  scale: 1.03,
  stiffness: 140,
  damping: 18,
  perspective: 900,
  translateZ: 18,
  glareColor: 'rgba(125, 224, 255, 0.22)',
  glareSpread: 65,
};

export default function OceanPortfolio() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('all');

  const filters = [
    { key: 'all', label: t('portfolio.filter_all') },
    { key: 'web', label: t('portfolio.filter_web') },
    { key: 'video', label: t('portfolio.filter_video') },
  ];

  const showWeb = filter === 'all' || filter === 'web';
  const showVideo = filter === 'all' || filter === 'video';

  return (
    <section className="ocean-portfolio">
      {/* Decorative wave divider at top */}
      <div className="ocean-wave-divider" aria-hidden="true">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path
            d="M0,60 C360,0 720,100 1080,40 C1260,10 1380,70 1440,50 L1440,0 L0,0 Z"
            fill="var(--color-bg)"
          />
        </svg>
      </div>

      <div className="ocean-portfolio__inner">
        <motion.h2
          className="ocean-section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('portfolio.title')}
        </motion.h2>

        {/* Filter buttons */}
        <div className="ocean-portfolio__filters">
          {filters.map(({ key, label }) => (
            <button
              key={key}
              className={`ocean-filter-btn ${filter === key ? 'ocean-filter-btn--active' : ''}`}
              onClick={() => setFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Web projects — horizontal scrollable gallery */}
        <AnimatePresence mode="wait">
          {showWeb && (
            <motion.div
              key="web-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="ocean-portfolio__subtitle">Web</h3>
              <div className="ocean-portfolio__gallery">
                <div className="ocean-portfolio__track">
                  {webProjects.map((project) => (
                    <div className="ocean-portfolio__slide" key={project.id}>
                      <TiltCard {...oceanTilt}>
                        <ProjectCard project={project} />
                      </TiltCard>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video projects */}
        <AnimatePresence mode="wait">
          {showVideo && (
            <motion.div
              key="video-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="ocean-portfolio__videos"
            >
              <h3 className="ocean-portfolio__subtitle">
                {t('portfolio.filter_video')}
              </h3>
              <div className="ocean-portfolio__video-grid">
                {videoProjects.map((video) => (
                  <TiltCard key={video.id} {...oceanTilt}>
                    <VideoCard video={video} />
                  </TiltCard>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
