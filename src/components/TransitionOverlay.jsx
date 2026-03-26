import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import './TransitionOverlay.css';

export default function TransitionOverlay() {
  const { isTransitioning } = useTheme();

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          className="transition-overlay"
          initial={{ clipPath: 'circle(0% at 95% 95%)' }}
          animate={{ clipPath: 'circle(150% at 95% 95%)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          aria-live="polite"
          aria-label="Changement de thème en cours"
        />
      )}
    </AnimatePresence>
  );
}
