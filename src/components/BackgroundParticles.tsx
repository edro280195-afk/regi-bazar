import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  baseSize: number;
  speedY: number;
  speedX: number;
  baseOpacity: number;
  pulse: number;
  pulseSpeed: number;
  type: 'heart' | 'sparkle' | 'dot';
  hue: number;
  wobble: number;
  wobbleSpeed: number;
}

function drawHeart(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, hue: number, alpha: number) {
  ctx.save();
  ctx.translate(x, y);
  const scale = s / 26;
  ctx.scale(scale, scale);
  ctx.beginPath();
  ctx.moveTo(0, -6);
  ctx.bezierCurveTo(-8, -14, -20, -4, 0, 10);
  ctx.bezierCurveTo(20, -4, 8, -14, 0, -6);
  ctx.fillStyle = `hsla(${hue}, 68%, 64%, ${alpha})`;
  ctx.fill();
  ctx.restore();
}

function drawSparkle(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, hue: number, alpha: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(Math.PI / 4);
  ctx.beginPath();
  const r = s * 0.4;
  ctx.moveTo(0, -r);
  ctx.lineTo(r * 0.35, -r * 0.35);
  ctx.lineTo(r, 0);
  ctx.lineTo(r * 0.35, r * 0.35);
  ctx.lineTo(0, r);
  ctx.lineTo(-r * 0.35, r * 0.35);
  ctx.lineTo(-r, 0);
  ctx.lineTo(-r * 0.35, -r * 0.35);
  ctx.closePath();
  ctx.fillStyle = `hsla(${hue}, 74%, 68%, ${alpha})`;
  ctx.fill();
  ctx.restore();
}

function drawDot(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, hue: number, alpha: number) {
  ctx.beginPath();
  ctx.arc(x, y, s * 0.24, 0, Math.PI * 2);
  ctx.fillStyle = `hsla(${hue}, 55%, 80%, ${alpha})`;
  ctx.fill();
}

export function BackgroundParticles() {
  const reduceMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 });
  const scrollSpeed = useRef(0);

  useEffect(() => {
    if (reduceMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationId = 0;
    let width = 0;
    let height = 0;
    let lastScrollY = window.scrollY;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouse = (e: MouseEvent) => {
      mouse.current.tx = e.clientX / width;
      mouse.current.ty = e.clientY / height;
    };

    window.addEventListener('mousemove', handleMouse, { passive: true });

    const scrollTick = setInterval(() => {
      const current = window.scrollY;
      scrollSpeed.current += (Math.min(Math.abs(current - lastScrollY) / 16, 4) - scrollSpeed.current) * 0.12;
      lastScrollY = current;
    }, 32);

    const particles: Particle[] = [];
    const palettes = [
      { from: 330, to: 352 },
      { from: 340, to: 360 },
      { from: 245, to: 280 },
      { from: 318, to: 348 }
    ];

    for (let i = 0; i < 40; i++) {
      const palette = palettes[Math.floor(Math.random() * palettes.length)];
      const hue = palette.from + Math.random() * (palette.to - palette.from);
      const r = Math.random();
      const type: Particle['type'] = r < 0.3 ? 'heart' : r < 0.55 ? 'sparkle' : 'dot';

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseSize: 2 + Math.random() * 16,
        speedY: 0.1 + Math.random() * 0.42,
        speedX: (Math.random() - 0.5) * 0.2,
        baseOpacity: 0.1 + Math.random() * 0.38,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.005 + Math.random() * 0.025,
        type,
        hue,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.002 + Math.random() * 0.012
      });
    }

    function animate() {
      ctx!.clearRect(0, 0, width, height);

      const boost = 1 + scrollSpeed.current * 0.7;
      mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.03;
      mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.03;

      const ax = (mouse.current.x - 0.5) * 12;
      const ay = (mouse.current.y - 0.5) * 12;

      for (const p of particles) {
        p.y -= p.speedY * boost;
        p.x += p.speedX + Math.sin(p.wobble) * 0.35;
        p.wobble += p.wobbleSpeed * boost;
        p.pulse += p.pulseSpeed;

        if (p.y < -35) { p.y = height + 35; p.x = Math.random() * width; }
        if (p.x < -35) p.x = width + 35;
        if (p.x > width + 35) p.x = -35;

        const alpha = p.baseOpacity * (0.7 + 0.3 * Math.sin(p.pulse)) * (1 + scrollSpeed.current * 0.3);
        const s = p.baseSize * (0.9 + 0.1 * Math.sin(p.pulse * 1.2)) * (1 + scrollSpeed.current * 0.12);
        const dx = p.x + ax;
        const dy = p.y + ay;

        if (p.type === 'heart') drawHeart(ctx!, dx, dy, s, p.hue, alpha);
        else if (p.type === 'sparkle') drawSparkle(ctx!, dx, dy, s, p.hue, alpha);
        else drawDot(ctx!, dx, dy, s, p.hue, alpha);
      }

      animationId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
      clearInterval(scrollTick);
    };
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
      style={{ mixBlendMode: 'soft-light' }}
    />
  );
}
