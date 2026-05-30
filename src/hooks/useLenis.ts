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

    // Scroll cinematográfico: easeOutExpo da una inercia sedosa y "pesada" premium.
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      infinite: false,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      syncTouch: true,
      syncTouchLerp: 0.075
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
