import { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, PackageSearch } from 'lucide-react';
import { links } from '../data/landingContent';
import { SectionTitle } from './SectionTitle';

function extractOrderToken(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;

  try {
    const url = new URL(trimmed);
    const match = url.pathname.match(/\/(?:pedido|o)\/([^/?#]+)/i);
    return match?.[1] ?? null;
  } catch {
    const pathMatch = trimmed.match(/\/(?:pedido|o)\/([^/?#]+)/i);
    if (pathMatch?.[1]) return pathMatch[1];

    const tokenOnly = trimmed.replace(/^#/, '').replace(/^pedido\//i, '');
    return /^[a-zA-Z0-9_-]{4,}$/.test(tokenOnly) ? tokenOnly : null;
  }
}

export function TrackOrder() {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = extractOrderToken(value);

    if (!token) {
      setError('Pega tu link completo o el código de pedido, bonita.');
      return;
    }

    setError('');
    window.location.href = `${links.trackingBasePath}/${encodeURIComponent(token)}`;
  };

  return (
    <section id="rastrea" className="section-shell relative z-10">
      <SectionTitle
        eyebrow="Rastrea tu pedido"
        title="¿Ya compraste? Mira dónde va"
        description="Pega tu link o código y te llevamos directo al seguimiento de tu pedido."
      />

      <motion.form
        className="track-form mx-auto mt-12 max-w-3xl"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <label htmlFor="tracking-code" className="sr-only">
          Link o código de pedido
        </label>
        <div className="track-input-wrap">
          <PackageSearch className="h-6 w-6 text-pink-500" aria-hidden="true" />
          <input
            id="tracking-code"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Pega aquí tu link o código de pedido"
            autoComplete="off"
          />
          <motion.button
            type="submit"
            aria-label="Rastrear pedido"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
            <span>Rastrear</span>
          </motion.button>
        </div>
        {error ? <p className="mt-4 text-center text-sm font-bold text-pink-700">{error}</p> : null}
      </motion.form>
    </section>
  );
}
