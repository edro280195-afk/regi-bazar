import { motion } from 'framer-motion';
import { brand, socialActions } from '../data/landingContent';
import { SectionTitle } from './SectionTitle';

export function SocialSection() {
  return (
    <section id="unete" className="section-shell relative z-10 pb-16">
      <SectionTitle
        eyebrow="Únete"
        title="Nuestra comunidad de niñas consentidas"
        description="Todo empieza en Facebook y Messenger. Te esperamos con artículos bonitos para que tu casa se sienta más tuya."
      />

      <div className="mx-auto mt-12 grid max-w-6xl gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.article
          className="story-panel"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
        >
          <span>🌸 Nuestra historia</span>
          <h3>Un bazar hecho con corazón de hogar</h3>
          <p>{brand.story}</p>
          <p>
            Por eso cada pedido se prepara con detalle, seguimiento claro y esa emoción de abrir
            algo que escogiste para consentirte.
          </p>
        </motion.article>

        <div className="grid gap-4">
          {socialActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.a
                key={action.id}
                className="social-action"
                href={action.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                whileHover={{ y: -3, scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.09,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <span className="social-icon">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <span>
                  <strong>{action.label}</strong>
                  <small>{action.description}</small>
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
