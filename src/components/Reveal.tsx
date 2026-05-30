import type { ReactNode } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

type RevealVariant = 'up' | 'scale' | 'blur' | 'left' | 'right';

interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
  /** Cuánto antes de entrar al viewport dispara (px o %). */
  margin?: string;
}

const EASE = [0.16, 1, 0.3, 1] as const;

const presets: Record<RevealVariant, Variants> = {
  up: {
    hidden: { opacity: 0, y: 56 },
    show: { opacity: 1, y: 0 }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9, y: 40 },
    show: { opacity: 1, scale: 1, y: 0 }
  },
  blur: {
    hidden: { opacity: 0, y: 40, filter: 'blur(14px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)' }
  },
  left: {
    hidden: { opacity: 0, x: -64 },
    show: { opacity: 1, x: 0 }
  },
  right: {
    hidden: { opacity: 0, x: 64 },
    show: { opacity: 1, x: 0 }
  }
};

/**
 * Envoltorio de aparición al hacer scroll, con curva premium. Respeta
 * prefers-reduced-motion (si está activo, muestra el contenido sin animar).
 */
export function Reveal({
  children,
  variant = 'up',
  delay = 0,
  className,
  margin = '-12% 0px'
}: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={presets[variant]}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
