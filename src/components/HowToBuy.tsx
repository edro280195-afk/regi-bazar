import { motion } from 'framer-motion';
import { buyingSteps } from '../data/landingContent';
import { SectionTitle } from './SectionTitle';
import { TiltCard } from './TiltCard';

export function HowToBuy() {
  return (
    <section id="como-comprar" className="section-shell relative z-10">
      <SectionTitle
        eyebrow="Cómo comprar"
        title="Tres pasitos y listo, hermosa"
        description="Comprar en el live es facilísimo y se siente como prepararte un regalito para tu casa."
      />

      <div className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-3">
        {buyingSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <TiltCard key={step.id} intensity={6}>
              <motion.article
                className="step-card"
                initial={{ opacity: 0, y: 36, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.58,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <motion.div
                  className={`step-icon bg-gradient-to-br ${step.accent}`}
                  whileInView={{ scale: [0.8, 1.15, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.25 }}
                >
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </motion.div>
                <span className="step-number">{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </motion.article>
            </TiltCard>
          );
        })}
      </div>
    </section>
  );
}
