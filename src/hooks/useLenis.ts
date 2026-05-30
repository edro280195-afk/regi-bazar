import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useScroll, type MotionValue } from 'framer-motion';

interface LenisScroll {
  scrollY: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
}

export function useLenis(enabled: boolean): LenisScroll {
  const lenisRef = useRef<Lenis | null>(null);
  const { scrollY, scrollYProgress } = useScroll();

  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      lerp: 0.065,
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.15,
      infinite: false,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      syncTouch: true,
      syncTouchLerp: 0.05
    });

    lenisRef.current = lenis;

    let rafId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [enabled]);

  return { scrollY, scrollYProgress };
}
