import { useEffect, useMemo, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

/**
 * Couche de profondeur globale, ancrée au DOCUMENT (toute la hauteur de page),
 * devant le contenu et non interactive.
 * Trois effets qui s'intensifient à mesure qu'on descend :
 *  - neige marine : micro-particules pâles réparties sur la page
 *  - plancton bioluminescent : rares points cyan qui pulsent
 *  - assombrissement abyssal : vignette (fixe) qui se renforce avec le scroll
 *
 * Ancrée au document (et non au viewport) : en scrollant on traverse les
 * particules qui défilent → réaliste. Perf : 100% transform/opacity (GPU),
 * densité calculée par écran, réduite en mobile, coupée si reduced-motion.
 */

// Biais vers le bas de page (exposant < 1) → densité qui croît avec la profondeur
const deepBias = () => Math.pow(Math.random(), 0.7);

function makeSnow(n) {
  return Array.from({ length: n }).map((_, i) => ({
    id: i,
    left: (Math.random() * 100).toFixed(1),
    top: (deepBias() * 100).toFixed(2),
    size: (1 + Math.random() * 1.8).toFixed(1),
    duration: (9 + Math.random() * 12).toFixed(0),
    delay: (-Math.random() * 30).toFixed(1), // délai négatif → déjà en mouvement au chargement
    drift: (Math.random() * 100 - 50).toFixed(0),
    fall: (20 + Math.random() * 18).toFixed(0),
    peak: (0.2 + Math.random() * 0.35).toFixed(2),
  }));
}

function makeGlow(n) {
  return Array.from({ length: n }).map((_, i) => ({
    id: i,
    left: (5 + Math.random() * 90).toFixed(1),
    top: (deepBias() * 100).toFixed(2),
    size: (2 + Math.random() * 2.5).toFixed(1),
    duration: (3.5 + Math.random() * 3.5).toFixed(1),
    delay: (-Math.random() * 6).toFixed(1),
    bob: (20 + Math.random() * 35).toFixed(0),
  }));
}

export default function OceanDepth() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const [counts, setCounts] = useState({ snow: 0, glow: 0 });

  // Intensité liée au scroll (une seule lecture batchée en rAF par Framer Motion).
  // Reste faible au sommet (hero épuré) puis se révèle en descendant.
  const planktonOpacity = useTransform(scrollYProgress, [0, 0.08, 1], [0, 0.55, 1]);
  const abyssOpacity = useTransform(scrollYProgress, [0, 0.35, 1], [0, 0.3, 0.55]);

  // Densité calculée par écran selon la hauteur réelle de la page (remesurée
  // une fois après chargement du contenu tardif : screenshots, images…).
  useEffect(() => {
    if (reduce) {
      setCounts({ snow: 0, glow: 0 });
      return;
    }
    const mobile = window.matchMedia('(max-width: 768px)').matches;
    const measure = () => {
      const screens = Math.max(
        1,
        Math.min(8, Math.round(document.documentElement.scrollHeight / window.innerHeight)),
      );
      setCounts({
        snow: Math.round((mobile ? 11 : 19) * screens),
        glow: Math.round((mobile ? 2 : 3) * screens),
      });
    };
    measure();
    const t = setTimeout(measure, 1200);
    return () => clearTimeout(t);
  }, [reduce]);

  const snow = useMemo(() => makeSnow(counts.snow), [counts.snow]);
  const glow = useMemo(() => makeGlow(counts.glow), [counts.glow]);

  return (
    <>
      <motion.div
        className="ocean-depth"
        aria-hidden="true"
        style={{ opacity: planktonOpacity }}
      >
        {snow.map((s) => (
          <span
            key={`s${s.id}`}
            className="ocean-depth__snow"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              '--duration': `${s.duration}s`,
              '--delay': `${s.delay}s`,
              '--drift': `${s.drift}px`,
              '--fall': `${s.fall}vh`,
              '--peak': s.peak,
            }}
          />
        ))}
        {glow.map((g) => (
          <span
            key={`g${g.id}`}
            className="ocean-depth__glow"
            style={{
              left: `${g.left}%`,
              top: `${g.top}%`,
              width: `${g.size}px`,
              height: `${g.size}px`,
              '--duration': `${g.duration}s`,
              '--delay': `${g.delay}s`,
              '--bob': `${g.bob}`,
            }}
          />
        ))}
      </motion.div>

      <motion.div
        className="ocean-depth__abyss"
        aria-hidden="true"
        style={{ opacity: abyssOpacity }}
      />
    </>
  );
}
