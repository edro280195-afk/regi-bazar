import type { CSSProperties } from 'react';

interface FloatingItem {
  id: string;
  symbol: string;
  top: string;
  left: string;
  size: string;
  delay: string;
  duration: string;
  drift: string;
}

type FloatingStyle = CSSProperties & {
  '--drift': string;
  '--duration': string;
};

const items: FloatingItem[] = [
  { id: 'sparkle-a', symbol: '✨', top: '10%', left: '6%', size: '2.2rem', delay: '0s', duration: '9s', drift: '20px' },
  { id: 'heart-a', symbol: '💕', top: '20%', left: '84%', size: '2.4rem', delay: '1.4s', duration: '10s', drift: '24px' },
  { id: 'bow-a', symbol: '🎀', top: '46%', left: '3%', size: '2.8rem', delay: '0.9s', duration: '11s', drift: '28px' },
  { id: 'flower-a', symbol: '🌸', top: '64%', left: '90%', size: '2.6rem', delay: '2.2s', duration: '12s', drift: '22px' },
  { id: 'crown-a', symbol: '👑', top: '80%', left: '10%', size: '2.2rem', delay: '1.8s', duration: '13s', drift: '18px' },
  { id: 'sparkle-b', symbol: '✦', top: '32%', left: '26%', size: '1.7rem', delay: '2.8s', duration: '8s', drift: '16px' },
  { id: 'heart-b', symbol: '♡', top: '72%', left: '72%', size: '2.7rem', delay: '3.4s', duration: '14s', drift: '26px' }
];

export function FloatingDecor() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden="true">
      {items.map((item) => {
        const style: FloatingStyle = {
          top: item.top,
          left: item.left,
          fontSize: item.size,
          animationDelay: item.delay,
          '--duration': item.duration,
          '--drift': item.drift
        };

        return (
          <span key={item.id} className="decor-float" style={style}>
            {item.symbol}
          </span>
        );
      })}
    </div>
  );
}
