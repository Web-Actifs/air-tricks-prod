import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Pluie de caractères « Matrix » en fond du thème Code.
 * Couche unique, fixe, derrière le contenu transparent.
 *
 * One-page (home) : la constellation occupe le hero ; le Matrix se révèle
 * en fondu au scroll, à partir de la section Portfolio (ancré sur sa position
 * réelle). Routes séparées (sans hero) : affiché directement.
 *
 * Perf : un seul canvas plein viewport, throttlé ~20 fps (1 frame sur 3),
 * boucle rAF mise en pause tant que l'effet est invisible (dans le hero),
 * resize debouncé, nettoyage au démontage, coupé si prefers-reduced-motion.
 */
export default function CodeMatrixRain({ pathname }) {
  const canvasRef = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const MAX = 0.18; // opacité maxi de la pluie (réglage de discrétion)
    const glyphs = 'アカサタナハマ0123456789ABCDEF<>{}[]#$%&*+=/\\|'.split('');
    const fontSize = 16;
    let columns, drops, W, H;

    function setup() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      columns = Math.floor(W / fontSize);
      drops = Array.from({ length: columns }, () => Math.floor(Math.random() * -50));
      // Pré-remplissage : pluie déjà formée dès l'apparition
      const warm = Math.min(Math.ceil(H / fontSize) + 50, 200);
      for (let k = 0; k < warm; k++) draw();
    }

    function draw() {
      ctx.fillStyle = 'rgba(7, 9, 13, 0.08)'; // voile → traînée
      ctx.fillRect(0, 0, W, H);
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
      for (let i = 0; i < drops.length; i++) {
        const char = glyphs[(Math.random() * glyphs.length) | 0];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillStyle = Math.random() > 0.975
          ? 'rgba(190, 255, 225, 0.9)'   // tête claire
          : 'rgba(0, 255, 136, 0.65)';   // traînée verte (thème Code)
        ctx.fillText(char, x, y);
        if (y > H && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }

    // Mode one-page : on a un hero + une section Portfolio → fondu au scroll.
    // Sinon (routes séparées) : affichage direct, pleine opacité.
    const hero = document.querySelector('.code-hero');
    const anchor = document.querySelector('.code-portfolio');
    const scrollFade = Boolean(hero && anchor);

    let raf = null;
    let frame = 0;

    const loop = () => {
      if (frame % 3 === 0) draw(); // ~20 fps
      frame++;
      raf = requestAnimationFrame(loop);
    };
    const startLoop = () => { if (!raf) raf = requestAnimationFrame(loop); };
    const stopLoop = () => { if (raf) { cancelAnimationFrame(raf); raf = null; } };

    function applyOpacity() {
      if (!scrollFade) {
        canvas.style.opacity = String(MAX);
        return;
      }
      // Fondu : 0 quand Portfolio est sous le pli, plein quand il est à ~40% du haut
      const top = anchor.getBoundingClientRect().top;
      const ih = window.innerHeight;
      const progress = Math.min(Math.max((ih - top) / (ih * 0.6), 0), 1);
      const op = progress * MAX;
      canvas.style.opacity = op.toFixed(3);
      if (op <= 0.001) stopLoop(); else startLoop(); // perf : pause dans le hero
    }

    setup();
    applyOpacity();
    if (!scrollFade) startLoop(); // routes séparées : tourne en continu

    const onScroll = () => applyOpacity();
    window.addEventListener('scroll', onScroll, { passive: true });

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => { setup(); applyOpacity(); }, 200);
    };
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      stopLoop();
      clearTimeout(resizeTimer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [reduce, pathname]);

  return <canvas ref={canvasRef} className="code-matrix" aria-hidden="true" />;
}
