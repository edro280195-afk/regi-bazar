import { useReducedMotion } from 'framer-motion';
import { AmbientBackground } from './components/AmbientBackground';
import { Benefits } from './components/Benefits';
import { ExperienceFlow } from './components/ExperienceFlow';
import { Footer } from './components/Footer';
import { Gallery } from './components/Gallery';
import { Hero } from './components/Hero';
import { HowToBuy } from './components/HowToBuy';
import { Intro } from './components/Intro';
import { LiveSection } from './components/LiveSection';
import { ScrollProgress } from './components/ScrollProgress';
import { SocialSection } from './components/SocialSection';
import { Testimonials } from './components/Testimonials';
import { TrackOrder } from './components/TrackOrder';
import { useLenis } from './hooks/useLenis';

export default function App() {
  const reduceMotion = useReducedMotion();
  useLenis(!reduceMotion);

  return (
    <>
      <Intro />
      <AmbientBackground />
      <ScrollProgress />

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
