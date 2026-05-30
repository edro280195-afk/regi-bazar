import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

/**
 * Fondo ambiental ligero: tres orbes de color con desenfoque que se desplazan
 * a distinta velocidad según el scroll (parallax de profundidad). Reemplaza el
 * sistema de partículas en canvas: misma sensación premium, una fracción del costo.
 */
export function AmbientBackground() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const y1 = useTransform(scrollYProgress, [0, 1], ['-6%', '46%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['4%', '-34%']);
  const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const rot = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <div className="ambient-bg" aria-hidden="true">
      <motion.div className="ambient-orb ambient-orb-1" style={reduce ? undefined : { y: y1, rotate: rot }} />
      <motion.div className="ambient-orb ambient-orb-2" style={reduce ? undefined : { y: y2 }} />
      <motion.div className="ambient-orb ambient-orb-3" style={reduce ? undefined : { y: y3 }} />
    </div>
  );
}
