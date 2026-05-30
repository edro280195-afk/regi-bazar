import { useEffect, useState } from 'react';

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function getCountdownParts(targetIso: string | null): CountdownParts | null {
  if (!targetIso) return null;

  const targetTime = new Date(targetIso).getTime();
  const diff = targetTime - Date.now();
  const safeDiff = Math.max(diff, 0);

  return {
    days: Math.floor(safeDiff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((safeDiff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((safeDiff / (1000 * 60)) % 60),
    seconds: Math.floor((safeDiff / 1000) % 60),
    isPast: diff <= 0
  };
}

export function useCountdown(targetIso: string | null): CountdownParts | null {
  const [parts, setParts] = useState<CountdownParts | null>(() => getCountdownParts(targetIso));

  useEffect(() => {
    setParts(getCountdownParts(targetIso));

    if (!targetIso) return undefined;

    const intervalId = window.setInterval(() => {
      setParts(getCountdownParts(targetIso));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [targetIso]);

  return parts;
}
