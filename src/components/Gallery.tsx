import { motion } from 'framer-motion';
import { galleryItems } from '../data/landingContent';
import { SectionTitle } from './SectionTitle';
import { TiltCard } from './TiltCard';

export function Gallery() {
  return (
    <section id="vitrina" className="section-shell relative z-10">
      <SectionTitle
        eyebrow="Vitrina"
        title="Un pedacito de hogar bonito"
        description="Pronto estarán las fotos reales de productos, empaques y momentos del live."
      />

      <div className="mx-auto mt-12 grid max-w-6xl gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4"
           style={{ gridAutoRows: 'minmax(220px, auto)', gridAutoFlow: 'dense' }}>
        {galleryItems.map((item, index) => (
          <TiltCard
            key={item.id}
            className={`gallery-card-v ${item.size === 'tall' ? 'lg:row-span-2' : ''} ${item.size === 'wide' ? 'lg:col-span-2' : ''}`}
            intensity={5}
          >
            <motion.figure
              className="relative h-full w-full rounded-[1.65rem] overflow-hidden border border-white/70 bg-white/55 backdrop-blur-xl shadow-[0_22px_56px_rgba(236,72,153,0.08)]"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="w-full h-full min-h-[200px] object-cover transition-[transform,filter] duration-600 ease-out hover:scale-[1.07] hover:brightness-[1.04] hover:saturate-[1.06]"
              />
              <figcaption className="absolute right-3 bottom-3 left-3 rounded-[1.2rem] border border-white/70 bg-white/78 px-4 py-3 backdrop-blur-xl">
                <strong className="block text-pink-950 font-black text-sm">{item.title}</strong>
                <span className="block mt-0.5 text-pink-900/60 font-bold text-xs">{item.description}</span>
              </figcaption>
            </motion.figure>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
