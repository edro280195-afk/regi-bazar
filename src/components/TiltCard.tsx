import { useRef } from 'react';
import { motion, useTransform } from 'framer-motion';
import { useGlobalMouse } from '../hooks/useGlobalMouse';
import type { ReactNode, CSSProperties } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  style?: CSSProperties;
}

export function TiltCard({ children, className, intensity = 8, style }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { x: mouseX, y: mouseY } = useGlobalMouse();

  const rotateX = useTransform(mouseY, [0, 1], [intensity, -intensity]);
  const rotateY = useTransform(mouseX, [0, 1], [-intensity, intensity]);

  return (
    <motion.div
      ref={ref}
      className={className}
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
