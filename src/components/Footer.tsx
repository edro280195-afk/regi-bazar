import { Heart } from 'lucide-react';
import { brand, links } from '../data/landingContent';

export function Footer() {
  return (
    <footer className="relative z-10 px-4 pb-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 rounded-[2.2rem] border border-white/70 bg-white/68 p-6 text-pink-900 backdrop-blur-xl md:flex-row md:items-center md:justify-between"
           style={{ boxShadow: '0 20px 60px rgba(236,72,153,0.1)' }}>
        <div className="flex items-center gap-4">
          <img
            className="h-14 w-14 rounded-2xl border border-pink-100 object-cover"
            style={{ boxShadow: '0 8px 24px rgba(236,72,153,0.1)' }}
            src="/assets/regi-logo.jpg"
            alt=""
            loading="lazy"
          />
          <div>
            <strong className="block text-lg font-black">{brand.name}</strong>
            <span className="text-sm font-semibold text-pink-700/70">{brand.slogan}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm font-bold text-pink-800/70">
          <span>{brand.deliveryZone}</span>
          <span aria-hidden="true">💕</span>
          <a href={links.facebook} target="_blank" rel="noreferrer">
            Facebook
          </a>
          <a href={links.messenger} target="_blank" rel="noreferrer">
            Messenger
          </a>
          <a href={links.tiktok} target="_blank" rel="noreferrer">
            TikTok
          </a>
        </div>

        <p className="flex items-center gap-2 text-sm font-bold text-pink-700/70">
          <Heart className="h-4 w-4 fill-current" aria-hidden="true" />
          © {new Date().getFullYear()} Regi Bazar
        </p>
      </div>
    </footer>
  );
}
