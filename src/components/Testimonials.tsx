import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { testimonials } from '../data/landingContent';
import { SectionTitle } from './SectionTitle';
import { TiltCard } from './TiltCard';

export function Testimonials() {
  return (
    <section id="testimonios" className="section-shell relative z-10">
      <SectionTitle
        eyebrow="Testimonios"
        title="Lo que dirán nuestras consentidas"
        description="Dejé esta sección preparada para poner reseñas reales en cuanto las tengas."
      />

      <div className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <TiltCard key={testimonial.id} intensity={4}>
            <motion.article
              className="testimonial-card"
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.55,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <div className="mb-5 flex gap-1 text-amber-400" aria-label="Cinco estrellas">
                {Array.from({ length: 5 }, (_, starIndex) => (
                  <Star key={`${testimonial.id}-${starIndex}`} className="h-5 w-5 fill-current" />
                ))}
              </div>
              {testimonial.placeholder ? <span className="placeholder-badge">Reseña por confirmar</span> : null}
              <p>&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="mt-6">
                <strong>{testimonial.name}</strong>
                <span>{testimonial.detail}</span>
              </div>
            </motion.article>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
