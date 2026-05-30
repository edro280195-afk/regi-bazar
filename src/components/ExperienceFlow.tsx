import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BadgeCheck, Gift, MessageCircleHeart, Route, Sparkles } from 'lucide-react';
import { SectionTitle } from './SectionTitle';

const flowItems = [
  {
    id: 'live',
    label: 'Te enamoras en el live',
    copy: 'Ves las piezas en movimiento, preguntas por Messenger y apartas sin vueltas.',
    icon: Sparkles,
    color: 'from-pink-400 to-pink-500'
  },
  {
    id: 'vip',
    label: 'Tu compra suma',
    copy: 'Cada pedido alimenta tus RegiPuntos y tu nivel de clienta consentida.',
    icon: BadgeCheck,
    color: 'from-violet-400 to-purple-500'
  },
  {
    id: 'tracking',
    label: 'Recibes tu link',
    copy: 'El enlace bonito te dice dónde va tu pedido y cuánto falta para recibirlo.',
    icon: Route,
    color: 'from-fuchsia-400 to-rose-500'
  },
  {
    id: 'gift',
    label: 'Llega con detalle',
    copy: 'Tu pedido se siente como regalito: claro, cuidado y preparado con cariño.',
    icon: Gift,
    color: 'from-rose-400 to-pink-600'
  }
];

export function ExperienceFlow() {
  const roadRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: roadRef,
    offset: ['start 0.7', 'end 0.4']
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="experiencia" className="relative z-10 py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <SectionTitle
            align="left"
            eyebrow="Experiencia Regi"
            title="Todo fluye como abrir una cajita"
            description="La magia no está solo en vender. Está en que la clienta siempre sepa qué sigue y se sienta acompañada."
          />
          <motion.a
            className="btn-primary mt-8 w-full sm:w-auto justify-center"
            href="#rastrea"
            whileHover={{ y: -3, scale: 1.015 }}
            whileTap={{ scale: 0.96 }}
          >
            <MessageCircleHeart className="h-5 w-5" aria-hidden="true" />
            Ir al seguimiento
          </motion.a>
        </div>

        <div ref={roadRef} className="experience-road">
          <div className="experience-line" aria-hidden="true" />
          <motion.div
            className="experience-line-fill"
            style={{ scaleY: lineHeight }}
            aria-hidden="true"
          />
          {flowItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.id}
                className="experience-card"
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40, y: 20, scale: 0.97 }}
                whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.65, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.span
                  className={`experience-node bg-gradient-to-br ${item.color}`}
                  whileInView={{ scale: [0.85, 1.08, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.06 + 0.2 }}
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </motion.span>
                <span className="experience-index">{String(index + 1).padStart(2, '0')}</span>
                <h3>{item.label}</h3>
                <p>{item.copy}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
