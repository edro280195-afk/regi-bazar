import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import confetti from 'canvas-confetti';

type Phase = 'reveal' | 'open' | 'done';

/**
 * Intro cinematográfica de entrada: el logo y el nombre "Regi Bazar" entran con
 * fuerza sobre una cortina rosa que luego se abre en dos para revelar la página,
 * rematando con una lluvia de corazones. Bloquea el scroll mientras dura.
 * Se omite por completo si el usuario prefiere menos movimiento.
 */
export function Intro() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>(reduce ? 'done' : 'reveal');

  useEffect(() => {
    if (reduce) return;

    const root = document.documentElement;
    root.classList.add('intro-lock');

    const toOpen = window.setTimeout(() => setPhase('open'), 1750);
    const toDone = window.setTimeout(() => {
      setPhase('done');
      root.classList.remove('intro-lock');
      window.scrollTo(0, 0);
      fireHearts();
    }, 2650);

    return () => {
      window.clearTimeout(toOpen);
      window.clearTimeout(toDone);
      root.classList.remove('intro-lock');
    };
  }, [reduce]);

  if (reduce) return null;

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="intro-overlay"
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45 } }}
        >
          {/* Cortina superior */}
          <motion.div
            className="intro-panel intro-panel-top"
            initial={{ y: 0 }}
            animate={{ y: phase === 'open' ? '-101%' : 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          />
          {/* Cortina inferior */}
          <motion.div
            className="intro-panel intro-panel-bottom"
            initial={{ y: 0 }}
            animate={{ y: phase === 'open' ? '101%' : 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Contenido central */}
          <motion.div
            className="intro-stage"
            animate={{
              opacity: phase === 'open' ? 0 : 1,
              scale: phase === 'open' ? 1.18 : 1,
              filter: phase === 'open' ? 'blur(8px)' : 'blur(0px)'
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.img
              src="/assets/regi-logo.jpg"
              alt=""
              className="intro-logo"
              initial={{ opacity: 0, scale: 0.4, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            />

            <h1 className="intro-name">
              {'Regi Bazar'.split('').map((char, i) => (
                <motion.span
                  key={`${char}-${i}`}
                  initial={{ opacity: 0, y: 70, rotateX: -90, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.7, delay: 0.35 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  {char === ' ' ? ' ' : char}
                </motion.span>
              ))}
            </h1>

            <motion.p
              className="intro-tagline"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
            >
              La mejor calidad para tu hogar ✨
            </motion.p>

            {/* Destello que barre el nombre */}
            <motion.div
              className="intro-shine"
              initial={{ x: '-130%', opacity: 0 }}
              animate={{ x: '130%', opacity: [0, 1, 0] }}
              transition={{ duration: 1, delay: 1.1, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function fireHearts() {
  const heart = confetti.shapeFromPath({
    path: 'M12 21s-8.5-5.5-8.5-11.5a4.5 4.5 0 0 1 8.5-2 4.5 4.5 0 0 1 8.5 2C20.5 15.5 12 21 12 21z'
  });
  const colors = ['#ec4899', '#f472b6', '#fbcfe8', '#a78bfa', '#be185d'];
  const base = { scalar: 2, shapes: [heart], colors, ticks: 240, gravity: 0.85, spread: 70 };

  confetti({ ...base, particleCount: 36, origin: { x: 0.2, y: 1 }, angle: 70, startVelocity: 55 });
  confetti({ ...base, particleCount: 36, origin: { x: 0.8, y: 1 }, angle: 110, startVelocity: 55 });
  confetti({ ...base, particleCount: 22, origin: { x: 0.5, y: 1 }, angle: 90, startVelocity: 62 });
}
