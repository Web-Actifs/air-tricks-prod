import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../../components/ProjectCard';
import VideoCard from '../../components/VideoCard';
import { webProjects, videoProjects } from '../../data/projects';

const FILTERS = ['all', 'web', 'video'];

function TiltCard({ children, className = '' }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = ((y - centerY) / centerY) * -8;
    const tiltY = ((x - centerX) / centerX) * 8;
    setRotateX(tiltX);
    setRotateY(tiltY);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setRotateX(0);
    setRotateY(0);
    setIsHovering(false);
  }, []);

  return (
    <motion.div
      className={`fusion-portfolio__tilt-wrapper ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
        scale: isHovering ? 1.02 : 1,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ transformPerspective: 800, transformStyle: 'preserve-3d' }}
    >
      {children}
      {isHovering && (
        <div
          className="fusion-portfolio__tilt-glare"
          style={{
            background: `radial-gradient(circle at ${50 + rotateY * 5}% ${50 + rotateX * 5}%, rgba(255,255,255,0.15), transparent 60%)`,
          }}
        />
      )}
    </motion.div>
  );
}

export default function FusionPortfolio() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');

  const showWeb = activeFilter === 'all' || activeFilter === 'web';
  const showVideo = activeFilter === 'all' || activeFilter === 'video';

  return (
    <section className="fusion-portfolio">
      <div className="fusion-portfolio__container">
        <motion.h2
          className="fusion-portfolio__title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('portfolio.title')}
        </motion.h2>

        {/* Filter buttons */}
        <motion.div
          className="fusion-portfolio__filters"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {FILTERS.map((filter) => (
            <button
              key={filter}
              className={`fusion-portfolio__filter ${activeFilter === filter ? 'fusion-portfolio__filter--active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {t(`portfolio.filter_${filter}`)}
              {activeFilter === filter && (
                <motion.span
                  className="fusion-portfolio__filter-indicator"
                  layoutId="fusionFilterIndicator"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Web projects - Asymmetric bento grid */}
        <AnimatePresence mode="wait">
          {showWeb && (
            <motion.div
              key="web-grid"
              className="fusion-portfolio__bento"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {webProjects.map((project, index) => (
                <TiltCard
                  key={project.id}
                  className={`fusion-portfolio__bento-item fusion-portfolio__bento-item--${(index % 6) + 1}`}
                >
                  <ProjectCard project={project} />
                </TiltCard>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video projects */}
        <AnimatePresence mode="wait">
          {showVideo && (
            <motion.div
              key="video-grid"
              className="fusion-portfolio__videos"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="fusion-portfolio__section-title">
                {t('portfolio.filter_video')}
              </h3>
              <div className="fusion-portfolio__video-grid">
                {videoProjects.map((video) => (
                  <TiltCard key={video.id}>
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
