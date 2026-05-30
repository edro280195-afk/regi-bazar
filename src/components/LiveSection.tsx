import { motion } from 'framer-motion';
import { CalendarClock, Facebook, MessageCircleHeart } from 'lucide-react';
import { links, nextLive } from '../data/landingContent';
import { useCountdown } from '../hooks/useCountdown';
import { SectionTitle } from './SectionTitle';

const timerLabels = [
  { key: 'days', label: 'Días' },
  { key: 'hours', label: 'Horas' },
  { key: 'minutes', label: 'Min' },
  { key: 'seconds', label: 'Seg' }
] as const;

export function LiveSection() {
  const countdown = useCountdown(nextLive.startsAt);
  const hasActiveLiveDate = Boolean(nextLive.startsAt && countdown && !countdown.isPast);

  return (
    <section id="proximo-live" className="section-shell relative z-10">
      <SectionTitle
        eyebrow="Próximo Live"
        title="Prepárate para enamorarte en vivo"
        description="El live es donde apartas tus piezas favoritas para el hogar y nosotras te cuidamos el resto."
      />

      <motion.div
        className="live-panel mx-auto mt-12 max-w-5xl"
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="live-ribbon">
          <CalendarClock className="h-5 w-5" aria-hidden="true" />
          Cuenta regresiva
        </div>

        {hasActiveLiveDate && countdown ? (
          <>
            <p className="max-w-3xl text-pretty text-2xl font-black text-pink-950 sm:text-4xl">
              ¡Nuestro próximo live ya casi empieza, bonita!
            </p>
            <div className="mt-8 grid grid-cols-4 gap-2 sm:gap-4" aria-label="Cuenta regresiva al próximo live">
              {timerLabels.map((item, i) => (
                <motion.div
                  key={item.key}
                  className="timer-cell"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  whileHover={{ scale: 1.04 }}
                >
                  <strong>{String(countdown[item.key]).padStart(2, '0')}</strong>
                  <span>{item.label}</span>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="max-w-3xl text-pretty text-2xl font-black text-pink-950 sm:text-4xl">
              {nextLive.fallbackTitle}
            </p>
            <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-pink-900/70 sm:text-lg">
              {nextLive.fallbackCopy} Cuando tengamos fecha, aquí aparecerá la cuenta regresiva
              para que no se te pase.
            </p>
          </>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <motion.a
            className="btn-primary"
            href={links.messenger}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -3, scale: 1.015 }}
            whileTap={{ scale: 0.96 }}
          >
            <MessageCircleHeart className="h-5 w-5" aria-hidden="true" />
            {nextLive.reminderCopy}
          </motion.a>
          <motion.a
            className="btn-secondary"
            href={links.facebook}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -3, scale: 1.015 }}
            whileTap={{ scale: 0.97 }}
          >
            <Facebook className="h-5 w-5" aria-hidden="true" />
            Seguir en Facebook
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
