import { motion } from 'framer-motion';

interface SectionTitleProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = 'center'
}: SectionTitleProps) {
  return (
    <motion.div
      className={align === 'center' ? 'section-title mx-auto text-center' : 'section-title text-left'}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="section-eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </motion.div>
  );
}
