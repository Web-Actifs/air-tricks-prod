import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import './TiltCard.css';

/**
 * Carte à inclinaison 3D magnétique (suit la souris) + reflet « glare ».
 * Reprend l'effet du portfolio Fusion, rendu configurable pour décliner
 * la sensation selon chaque thème (raideur du ressort, amplitude, couleur
 * du reflet, « pop » en profondeur).
 *
 * Le tilt/scale/glare sont pilotés en JS ; tout l'habillage statique
 * (bordure, glow au hover, scanline, etc.) se fait en CSS via `className`
 * — le wrapper est un vrai élément DOM, donc `:hover` fonctionne.
 */
export default function TiltCard({
  children,
  className = '',
  maxTilt = 8,
  scale = 1.02,
  stiffness = 300,
  damping = 20,
  perspective = 800,
  translateZ = 0,
  glare = true,
  glareColor = 'rgba(255, 255, 255, 0.15)',
  glareSpread = 60,
}) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX(((y - centerY) / centerY) * -maxTilt);
    setRotateY(((x - centerX) / centerX) * maxTilt);
  }, [maxTilt]);

  const handleMouseLeave = useCallback(() => {
    setRotateX(0);
    setRotateY(0);
    setIsHovering(false);
  }, []);

  return (
    <motion.div
      className={`tilt-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
        scale: isHovering ? scale : 1,
        z: isHovering ? translateZ : 0,
      }}
      transition={{ type: 'spring', stiffness, damping }}
      style={{ transformPerspective: perspective, transformStyle: 'preserve-3d' }}
    >
      {children}
      {glare && isHovering && (
        <div
          className="tilt-card__glare"
          style={{
            background: `radial-gradient(circle at ${50 + rotateY * 5}% ${50 + rotateX * 5}%, ${glareColor}, transparent ${glareSpread}%)`,
          }}
        />
      )}
    </motion.div>
  );
}
