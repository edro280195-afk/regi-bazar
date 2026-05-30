import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { ReactNode, CSSProperties, MouseEvent } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  style?: CSSProperties;
}

/**
 * Tarjeta con inclinación 3D que reacciona a la posición del cursor SOBRE ella
 * (no global). Suavizado con springs. En táctil simplemente no se inclina.
 */
export function TiltCard({ children, className, intensity = 8, style }: TiltCardProps) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 150, damping: 18, mass: 0.4 });
  const sy = useSpring(py, { stiffness: 150, damping: 18, mass: 0.4 });

  const rotateX = useTransform(sy, [0, 1], [intensity, -intensity]);
  const rotateY = useTransform(sx, [0, 1], [-intensity, intensity]);

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        ...style,
        rotateX,
        rotateY,
        transformPerspective: 1200,
        transformStyle: 'preserve-3d',
        willChange: 'transform'
      }}
    >
      {children}
    </motion.div>
  );
}
