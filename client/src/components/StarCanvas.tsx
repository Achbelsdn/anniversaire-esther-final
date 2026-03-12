import { useEffect, useRef } from 'react';

interface Star {
  x: number; y: number; size: number;
  opacity: number; speed: number; offset: number;
}
interface Shooter {
  x: number; y: number; vx: number; vy: number;
  len: number; opacity: number; active: boolean; timer: number;
}

export function StarCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const stars: Star[] = Array.from({ length: 200 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 1.6 + 0.2,
      opacity: Math.random() * 0.6 + 0.3,
      speed: Math.random() * 0.018 + 0.004,
      offset: Math.random() * Math.PI * 2,
    }));

    const shooters: Shooter[] = Array.from({ length: 4 }, (_, i) => ({
      x: 0, y: 0, vx: 0, vy: 0, len: 0,
      opacity: 0, active: false, timer: -(i * 150),
    }));

    const resetShooter = (s: Shooter) => {
      s.x = Math.random() * canvas.width * 0.6 + canvas.width * 0.1;
      s.y = Math.random() * canvas.height * 0.3;
      const a = Math.PI / 4 + (Math.random() - 0.5) * 0.4;
      const spd = 10 + Math.random() * 8;
      s.vx = Math.cos(a) * spd;
      s.vy = Math.sin(a) * spd;
      s.len = 100 + Math.random() * 100;
      s.opacity = 0;
      s.active = true;
      s.timer = 0;
    };

    const draw = () => {
      t++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Stars
      for (const s of stars) {
        const twk = Math.sin(t * s.speed + s.offset);
        const op = s.opacity * (0.45 + 0.55 * ((twk + 1) / 2));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(248, 235, 195, ${op})`;
        ctx.fill();
        // 4-point sparkle for larger stars when bright
        if (s.size > 1.1 && twk > 0.6) {
          const len = s.size * 4;
          ctx.beginPath();
          ctx.moveTo(s.x - len, s.y); ctx.lineTo(s.x + len, s.y);
          ctx.moveTo(s.x, s.y - len); ctx.lineTo(s.x, s.y + len);
          ctx.strokeStyle = `rgba(212, 175, 55, ${op * 0.6})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // Shooting stars
      for (const s of shooters) {
        if (!s.active) {
          s.timer--;
          if (s.timer <= 0) resetShooter(s);
          continue;
        }
        s.timer++;
        s.x += s.vx; s.y += s.vy;
        if (s.timer < 8) s.opacity = s.timer / 8;
        else if (s.timer > 35) s.opacity = Math.max(0, 1 - (s.timer - 35) / 12);
        else s.opacity = 1;
        if (s.timer > 50 || s.x > canvas.width + 100 || s.y > canvas.height + 100) {
          s.active = false;
          s.timer = 120 + Math.random() * 350;
          continue;
        }
        const tailX = s.x - s.vx * (s.len / 10);
        const tailY = s.y - s.vy * (s.len / 10);
        const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        grad.addColorStop(0, `rgba(212, 175, 55, 0)`);
        grad.addColorStop(0.7, `rgba(248, 235, 195, ${s.opacity * 0.6})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${s.opacity})`);
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.stroke();
        // Head glow
        ctx.beginPath();
        ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 248, 220, ${s.opacity})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: 'fixed', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0,
      }}
    />
  );
}
