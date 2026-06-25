import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Réseau de points 3D reliés, projeté en perspective, en fond du hero Code.
 * La souris fait pivoter légèrement la « caméra » → impression de profondeur.
 * Adapté de l'effet "particules 3D flottantes" (vanilla) aux couleurs du
 * thème Code : vert néon + violet.
 *
 * Perf : canvas dimensionné au hero uniquement (pas full-page), N réduit en
 * mobile, DPR plafonné à 2, boucle rAF nettoyée au démontage, image statique
 * si prefers-reduced-motion.
 */
export default function CodeConstellation() {
  const canvasRef = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    const ctx = canvas.getContext('2d');

    const mobile = window.matchMedia('(max-width: 768px)').matches;
    const N = mobile ? 42 : 82;          // nombre de points
    const S = 620;                       // étendue de l'espace 3D (x, y)
    const SZ = S * 0.5;                   // slab en profondeur (plus fin → perspective douce, étalement uniforme)
    const FOV = 900;                      // grand fov → perspective douce, points répartis uniformément
    const DOT = mobile ? 2.6 : 3;        // facteur taille des points (découplé de l'étalement)
    const FILL_X = mobile ? 0.82 : 0.705; // part de la demi-largeur occupée par le nuage
    const FILL_Y = mobile ? 0.72 : 0.63;  // part de la demi-hauteur occupée par le nuage
    const LINK_FRAC = mobile ? 0.15 : 0.0825; // distance de connexion (fraction de largeur)
    const SCALE0 = FOV / (FOV + SZ * 0.5);   // échelle d'un point au centre (z = 0)
    const REF = (S / 2) * SCALE0;        // demi-étendue projetée d'un point en x = ±S/2
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    let W = 0, H = 0;
    // Recalculés au resize pour que le nuage remplisse l'écran à toute résolution
    let spreadX = 1, spreadY = 1, LINK = 150;
    let mxT = 0, myT = 0, mx = 0, my = 0; // souris cible + lissée
    let raf = null;

    const pts = Array.from({ length: N }, () => ({
      x: (Math.random() - 0.5) * S,
      y: (Math.random() - 0.5) * S,
      z: (Math.random() - 0.5) * SZ,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      vz: (Math.random() - 0.5) * 0.22,
      r: Math.random() * 1.8 + 0.4,
      green: Math.random() > 0.4, // vert (majorité) ou violet
    }));

    function resize() {
      W = parent.clientWidth;
      H = parent.clientHeight;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      // Étalement proportionnel à l'écran (plus large que haut → remplit le 16:9)
      spreadX = (W / 2 * FILL_X) / REF;
      spreadY = (H / 2 * FILL_Y) / REF;
      LINK = W * LINK_FRAC;
    }

    // Projection 3D → 2D avec rotation caméra pilotée par la souris
    function project(px, py, pz) {
      const cosY = Math.cos(mx * 0.22), sinY = Math.sin(mx * 0.22);
      const x1 = px * cosY + pz * sinY;
      const z1 = -px * sinY + pz * cosY;
      const cosX = Math.cos(my * 0.18), sinX = Math.sin(my * 0.18);
      const y2 = py * cosX - z1 * sinX;
      const z2 = py * sinX + z1 * cosX;
      const depth = FOV + z2 + SZ * 0.5;
      const scale = FOV / Math.max(depth, 1);
      return { sx: x1 * scale * spreadX + W / 2, sy: y2 * scale * spreadY + H / 2, scale };
    }

    function draw(animate) {
      ctx.clearRect(0, 0, W, H);

      if (animate) {
        mx += (mxT - mx) * 0.04; // lissage caméra
        my += (myT - my) * 0.04;
        pts.forEach((p) => {
          p.x += p.vx; p.y += p.vy; p.z += p.vz;
          if (Math.abs(p.x) > S / 2) p.vx *= -1;
          if (Math.abs(p.y) > S / 2) p.vy *= -1;
          if (Math.abs(p.z) > SZ / 2) p.vz *= -1;
        });
      }

      const proj = pts.map((p) => ({ ...p, ...project(p.x, p.y, p.z) }));

      // Connexions entre points proches
      ctx.lineWidth = 0.6;
      for (let i = 0; i < proj.length; i++) {
        for (let j = i + 1; j < proj.length; j++) {
          const a = proj[i], b = proj[j];
          const d = Math.hypot(a.sx - b.sx, a.sy - b.sy);
          if (d < LINK) {
            const alpha = (1 - d / LINK) * 0.5 * Math.min(a.scale, b.scale) * 2.4;
            ctx.beginPath();
            ctx.moveTo(a.sx, a.sy);
            ctx.lineTo(b.sx, b.sy);
            ctx.strokeStyle = `rgba(0, 255, 136, ${Math.min(alpha, 0.5)})`;
            ctx.stroke();
          }
        }
      }

      // Points
      proj.forEach((p) => {
        const sz = Math.max(p.r * p.scale * DOT, 0.3);
        const alpha = Math.min(p.scale * 2.6, 1);
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, sz, 0, Math.PI * 2);
        ctx.fillStyle = p.green
          ? `rgba(0, 255, 136, ${alpha})`   // vert néon
          : `rgba(167, 139, 250, ${alpha})`; // violet clair
        ctx.fill();
      });
    }

    function frame() {
      draw(true);
      raf = requestAnimationFrame(frame);
    }

    function onMove(e) {
      mxT = (e.clientX / window.innerWidth - 0.5) * 2;
      myT = (e.clientY / window.innerHeight - 0.5) * 2;
    }

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw(false);
    });
    ro.observe(parent);

    if (reduce) {
      draw(false); // image fixe, aucune animation
    } else {
      window.addEventListener('mousemove', onMove, { passive: true });
      raf = requestAnimationFrame(frame);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      ro.disconnect();
    };
  }, [reduce]);

  return <canvas ref={canvasRef} className="code-hero__constellation" aria-hidden="true" />;
}
