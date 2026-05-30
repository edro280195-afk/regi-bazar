import { motion, useReducedMotion, type Variants } from 'framer-motion';

interface SectionTitleProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

const EASE = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } }
};

const item: Variants = {
  hidden: { opacity: 0, y: 36, filter: 'blur(10px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: EASE } }
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = 'center'
}: SectionTitleProps) {
  const reduce = useReducedMotion();
  const cls = align === 'center' ? 'section-title mx-auto text-center' : 'section-title text-left';

  if (reduce) {
    return (
      <div className={cls}>
        <span className="section-eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
    );
  }

  return (
    <motion.div
      className={cls}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-15% 0px' }}
    >
      <motion.span className="section-eyebrow" variants={item}>
        {eyebrow}
      </motion.span>
      <motion.h2 variants={item}>{title}</motion.h2>
      {description ? <motion.p variants={item}>{description}</motion.p> : null}
    </motion.div>
  );
}
