import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface Sparkle {
  id: number;
  x: number;
  y: number;
}

export function SparkleTrail() {
  const reduceMotion = useReducedMotion();
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const lastTime = useRef(0);
  const nextId = useRef(0);

  useEffect(() => {
    if (reduceMotion || !window.matchMedia('(pointer: fine)').matches) return;

    const handlePointerMove = (event: PointerEvent) => {
      const now = Date.now();
      if (now - lastTime.current < 65) return;

      lastTime.current = now;
      const id = nextId.current;
      nextId.current += 1;

      setSparkles((current) => [...current.slice(-20), { id, x: event.clientX, y: event.clientY }]);

      window.setTimeout(() => {
        setSparkles((current) => current.filter((sparkle) => sparkle.id !== id));
      }, 900);
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 hidden md:block" aria-hidden="true">
      {sparkles.map((sparkle) => (
        <motion.span
          key={sparkle.id}
          className="sparkle-trail"
          style={{ left: sparkle.x, top: sparkle.y }}
          initial={{ opacity: 1, scale: 0.35, rotate: 0 }}
          animate={{ opacity: 0, scale: 1.3, y: -22, rotate: 28 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          ✨
        </motion.span>
      ))}
    </div>
  );
}
