import { motion } from 'framer-motion';
import { benefits } from '../data/landingContent';
import { SectionTitle } from './SectionTitle';
import { TiltCard } from './TiltCard';

export function Benefits() {
  return (
    <section id="beneficios" className="section-shell relative z-10">
      <SectionTitle
        eyebrow="Por qué amar Regi Bazar"
        title="Aquí no solo compras, aquí te consienten"
        description="La experiencia completa está pensada para que sientas claridad, confianza y detalle desde el live hasta la entrega."
      />

      <div className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <TiltCard key={benefit.id} intensity={5}>
              <motion.article
                className="benefit-card"
                initial={{ opacity: 0, y: 28, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.09,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <span className="benefit-sparkle" aria-hidden="true">
                  {benefit.sparkle}
                </span>
                <Icon className="h-8 w-8 text-pink-600 relative z-10" aria-hidden="true" />
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </motion.article>
            </TiltCard>
          );
        })}
      </div>
    </section>
  );
}
