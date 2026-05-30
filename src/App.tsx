import { motion, useReducedMotion, useTransform } from 'framer-motion';
import { BackgroundParticles } from './components/BackgroundParticles';
import { Benefits } from './components/Benefits';
import { ExperienceFlow } from './components/ExperienceFlow';
import { FloatingDecor } from './components/FloatingDecor';
import { Footer } from './components/Footer';
import { Gallery } from './components/Gallery';
import { Hero } from './components/Hero';
import { HowToBuy } from './components/HowToBuy';
import { LiveSection } from './components/LiveSection';
import { SocialSection } from './components/SocialSection';
import { ScrollProgress } from './components/ScrollProgress';
import { SparkleTrail } from './components/SparkleTrail';
import { Testimonials } from './components/Testimonials';
import { TrackOrder } from './components/TrackOrder';
import { MouseProvider, useGlobalMouse } from './hooks/useGlobalMouse';
import { useLenis } from './hooks/useLenis';

function CursorGlow() {
  const reduceMotion = useReducedMotion();
  const { x, y } = useGlobalMouse();

  if (reduceMotion) return null;

  const left = useTransform(x, [0, 1], ['-210px', 'calc(100vw - 210px)']);
  const top = useTransform(y, [0, 1], ['-210px', 'calc(100vh - 210px)']);

  return (
    <motion.div
      className="fixed pointer-events-none z-0"
      aria-hidden="true"
      style={{
        left,
        top,
        width: '420px',
        height: '420px',
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(244,114,182,0.09) 0%, rgba(167,139,250,0.06) 35%, transparent 70%)',
        filter: 'blur(40px)',
        willChange: 'left, top'
      }}
    />
  );
}

function AppContent() {
  const reduceMotion = useReducedMotion();
  useLenis(!reduceMotion);

  return (
    <>
      <BackgroundParticles />
      <ScrollProgress />
      <FloatingDecor />
      <SparkleTrail />
      <CursorGlow />

      <main>
        <Hero />
        <LiveSection />
        <HowToBuy />
        <ExperienceFlow />
        <Gallery />
        <Benefits />
        <Testimonials />
        <TrackOrder />
        <SocialSection />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <MouseProvider>
      <AppContent />
    </MouseProvider>
  );
}
