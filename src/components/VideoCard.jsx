import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import './VideoCard.css';

export default function VideoCard({ video }) {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const [isPlaying, setIsPlaying] = useState(false);

  const thumbnailUrl = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;

  return (
    <motion.article
      className="video-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="video-card__media">
        {isPlaying ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={video.title[lang] || video.title.fr}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <button
            className="video-card__thumbnail"
            onClick={() => setIsPlaying(true)}
            aria-label={`Play ${video.title[lang] || video.title.fr}`}
          >
            <img src={thumbnailUrl} alt={video.title[lang] || video.title.fr} loading="lazy" />
            <span className="video-card__play">▶</span>
          </button>
        )}
      </div>
      <div className="video-card__content">
        <h3 className="video-card__title">{video.title[lang] || video.title.fr}</h3>
        <p className="video-card__desc">{video.description[lang] || video.description.fr}</p>
      </div>
    </motion.article>
  );
}
