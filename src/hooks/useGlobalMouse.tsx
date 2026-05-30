import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

interface MouseContextValue {
  x: ReturnType<typeof useSpring>;
  y: ReturnType<typeof useSpring>;
}

const MouseContext = createContext<MouseContextValue | null>(null);

export function MouseProvider({ children }: { children: ReactNode }) {
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const x = useSpring(rawX, { stiffness: 150, damping: 20, mass: 0.22 });
  const y = useSpring(rawY, { stiffness: 150, damping: 20, mass: 0.22 });

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      rawX.set(e.clientX / window.innerWidth);
      rawY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', handle, { passive: true });
    return () => window.removeEventListener('mousemove', handle);
  }, [rawX, rawY]);

  return <MouseContext.Provider value={{ x, y }}>{children}</MouseContext.Provider>;
}

export function useGlobalMouse() {
  const ctx = useContext(MouseContext);
  if (!ctx) throw new Error('useGlobalMouse requiere MouseProvider');
  return ctx;
}
