import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowDown, Facebook, MessageCircleHeart, MousePointer2, Sparkles } from 'lucide-react';
import { brand, links, trustStats } from '../data/landingContent';

function SplitWord({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="inline-block">
      {text.split('').map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className="inline-block"
          initial={{ opacity: 0, y: 48, rotateX: -85 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.045,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  const reduceMotion = Boolean(useReducedMotion());
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    mass: 0.5
  });

  const bgScale = useTransform(smoothProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(smoothProgress, [0, 0.35], [0, -80]);
  const textOpacity = useTransform(smoothProgress, [0, 0.25], [1, 0]);
  const logoY = useTransform(smoothProgress, [0, 0.35], [0, -50]);
  const logoScale = useTransform(smoothProgress, [0, 0.35], [1, 0.9]);
  const orbOpacity = useTransform(smoothProgress, [0, 0.4], [0.8, 0]);
  const orbX = useTransform(smoothProgress, [0, 0.4], [0, 40]);
  const orbRotate = useTransform(smoothProgress, [0, 0.4], [0, 25]);

  return (
    <section
      ref={containerRef}
      className="hero-section relative z-10 flex min-h-[100svh] items-center overflow-hidden px-4 pb-24 pt-8 sm:px-6"
    >
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ scale: bgScale, opacity: orbOpacity, rotate: orbRotate }}
      >
        <div
          className="absolute w-[900px] h-[900px] rounded-full -top-60 -right-60"
          style={{
            background:
              'radial-gradient(circle, rgba(167,139,250,0.2) 0%, rgba(244,114,182,0.14) 35%, transparent 65%)',
            filter: 'blur(60px)'
          }}
        />
        <div
          className="absolute w-[700px] h-[700px] rounded-full -bottom-32 -left-32"
          style={{
            background:
              'radial-gradient(circle, rgba(244,114,182,0.16) 0%, rgba(251,207,232,0.2) 35%, transparent 65%)',
            filter: 'blur(55px)'
          }}
        />
        <div
          className="absolute w-[450px] h-[450px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              'radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 60%)',
            filter: 'blur(40px)'
          }}
        />
      </motion.div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          className="relative z-10 order-1 lg:order-1"
          style={{ y: textY, opacity: textOpacity }}
        >
          <motion.div
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-pink-200/70 bg-white/68 px-5 py-2.5 text-sm font-bold text-pink-700 backdrop-blur-xl"
            style={{ boxShadow: '0 10px 35px rgba(236,72,153,0.1)' }}
            initial={{ opacity: 0, y: 16, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Lives de Facebook para consentir tu hogar
          </motion.div>

          <h1 className="hero-title">
            <SplitWord text="Regi Bazar" delay={0.2} />
          </h1>

          <motion.p
            className="hero-subtitle mt-4 max-w-2xl text-balance text-xl font-semibold leading-8 sm:text-2xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
          >
            {brand.slogan} ✨❤️
          </motion.p>

          <motion.p
            className="mt-4 max-w-2xl text-pretty text-base leading-7 text-pink-900/72 sm:text-lg"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
          >
            Bienvenida, hermosa. Aquí encuentras sábanas, colchas, edredones y detalles de
            cocina en lives llenos de cariño, moñitos y seguimiento bonito para tu pedido.
          </motion.p>

          <motion.div
            className="mt-6 flex flex-wrap gap-2.5"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {brand.categories.map((category) => (
              <span key={category} className="category-chip">
                {category}
              </span>
            ))}
          </motion.div>

          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.a
              className="btn-primary"
              href={links.messenger}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              aria-label="Escribir a Regi Bazar por Messenger"
            >
              <MessageCircleHeart className="h-5 w-5" aria-hidden="true" />
              Escríbenos por Messenger
            </motion.a>
            <motion.a
              className="btn-secondary"
              href="#proximo-live"
              whileHover={{ y: -3, scale: 1.015 }}
              whileTap={{ scale: 0.97 }}
            >
              <ArrowDown className="h-5 w-5" aria-hidden="true" />
              Ver próximo live
            </motion.a>
          </motion.div>

          <motion.div
            className="mt-8 grid gap-3 sm:grid-cols-3"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {trustStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.id} className="trust-pill">
                  <Icon className="h-5 w-5 text-pink-600 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </motion.div>

        <motion.div
          className="order-2 flex justify-center lg:order-2"
          initial={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          style={{ y: logoY, scale: logoScale }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="logo-stage" aria-label="Logo de Regi Bazar">
            <div className="hero-glow-ring" />
            <div className="logo-aura" />
            <img
              className="logo-main"
              src="/assets/regi-logo.jpg"
              alt="Regi Bazar, la mejor calidad para tu hogar"
              fetchPriority="high"
            />
            <motion.div
              className="sticker sticker-top"
              animate={{ rotate: [-11, -6, -11] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              🎀
            </motion.div>
            <motion.div
              className="sticker sticker-right"
              animate={{ rotate: [10, 5, 10] }}
              transition={{ duration: 4.3, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
            >
              ✨
            </motion.div>
            <motion.div
              className="sticker sticker-left"
              animate={{ rotate: [-8, -3, -8] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
            >
              🏠
            </motion.div>
            <motion.a
              className="facebook-live-badge"
              href={links.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Abrir Facebook de Regi Bazar"
              whileHover={{ y: -3, scale: 1.03 }}
            >
              <Facebook className="h-4 w-4" aria-hidden="true" />
              Live en Facebook
            </motion.a>
          </div>
        </motion.div>
      </div>

      <div className="hero-marquee" aria-hidden="true">
        <div>
          <span>Sábanas suaves</span>
          <span>Colchas bonitas</span>
          <span>Edredones consentidores</span>
          <span>Cocina con encanto</span>
          <span>Moñitos en cada pedido</span>
          <span>RegiPuntos</span>
        </div>
        <div>
          <span>Sábanas suaves</span>
          <span>Colchas bonitas</span>
          <span>Edredones consentidores</span>
          <span>Cocina con encanto</span>
          <span>Moñitos en cada pedido</span>
          <span>RegiPuntos</span>
        </div>
      </div>

      <motion.a
        className="scroll-cue"
        href="#proximo-live"
        aria-label="Bajar al próximo live"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4 }}
      >
        <MousePointer2 className="h-4 w-4" aria-hidden="true" />
        Desliza
      </motion.a>
    </section>
  );
}
