import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import { StarCanvas } from '@/components/StarCanvas';

interface Petal { id: string; left: number; delay: number; dur: number; rot: number; size: number; }

export default function Page1() {
  const [, navigate] = useLocation();
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const petalsRef = useRef<Petal[]>([]);

  useEffect(() => {
    petalsRef.current = Array.from({ length: 55 }, (_, i) => ({
      id: `p-${i}`,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      dur: 6 + Math.random() * 6,
      rot: Math.random() * 720 - 360,
      size: 3 + Math.random() * 5,
    }));
  }, []);

  useEffect(() => {
    const iv = setInterval(() => {
      setProgress(p => {
        const next = p + Math.random() * 20 + 4;
        if (next >= 90) { clearInterval(iv); return 90; }
        return next;
      });
    }, 260);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setIsLoading(false), 500);
      setTimeout(() => setShowContent(true), 650);
    }, 3400);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (!showContent) return;
    const t = setTimeout(() => navigate('/page2'), 7000);
    return () => clearTimeout(t);
  }, [showContent]);

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden', background: '#030014' }}>
      <StarCanvas />

      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '-15%', left: '10%', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,123,160,0.06) 0%, transparent 70%)' }} />
      </div>

      {showContent && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 1 }}>
          {petalsRef.current.map(p => (
            <div key={p.id} style={{
              position: 'absolute', left: `${p.left}%`, top: -12,
              width: p.size, height: p.size * 1.8,
              borderRadius: '50% 50% 50% 0',
              background: 'linear-gradient(135deg, rgba(212,175,55,0.85), rgba(245,230,200,0.5))',
              boxShadow: `0 0 ${p.size * 2}px rgba(212,175,55,0.35)`,
              animation: `petal-fall ${p.dur}s linear ${p.delay}s infinite`,
              '--rot': `${p.rot}deg`,
            } as React.CSSProperties} />
          ))}
        </div>
      )}

      {isLoading && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(3,0,20,0.94)', backdropFilter: 'blur(6px)' }}>
          <div style={{ width: '100%', maxWidth: 420, padding: '0 32px', textAlign: 'center' }}>
            <div style={{ fontSize: 52, marginBottom: 36, color: '#D4AF37', display: 'inline-block', animation: 'orbit-cw 2.5s linear infinite', textShadow: '0 0 24px rgba(212,175,55,0.9)', lineHeight: 1 }}>✦</div>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: '0.4em', color: 'rgba(245,230,200,0.6)', textTransform: 'uppercase', marginBottom: 52 }}>
              Préparation de votre surprise
            </p>
            <div style={{ position: 'relative', marginBottom: 20 }}>
              <div style={{ height: 1, background: 'rgba(212,175,55,0.12)', borderRadius: 1 }}>
                <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #6B4F12, #D4AF37, #F5E6C8, #D4AF37)', backgroundSize: '200% auto', animation: 'shimmer-gold 2s linear infinite', transition: 'width 0.35s ease', boxShadow: '0 0 16px rgba(212,175,55,0.9)', borderRadius: 1 }} />
              </div>
              <div style={{ position: 'absolute', top: -4, left: 0, width: 9, height: 9, background: '#D4AF37', transform: 'rotate(45deg)', boxShadow: '0 0 8px rgba(212,175,55,0.8)' }} />
              <div style={{ position: 'absolute', top: -4, right: 0, width: 9, height: 9, border: '1px solid rgba(212,175,55,0.3)', transform: 'rotate(45deg)' }} />
            </div>
            <p style={{ fontFamily: "'Cormorant SC', serif", fontSize: 13, letterSpacing: '0.25em', color: 'rgba(212,175,55,0.5)' }}>{Math.round(progress)}%</p>
          </div>
        </div>
      )}

      {showContent && (
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '48px 24px' }}>
          <div style={{ textAlign: 'center', maxWidth: 860, width: '100%' }}>

            <div style={{ position: 'relative', width: 240, height: 240, margin: '0 auto 72px', animation: 'reveal-fade 1.2s ease-out 0.1s both' }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid rgba(212,175,55,0.22)', animation: 'orbit-cw 18s linear infinite' }}>
                <div style={{ position: 'absolute', top: -6, left: '50%', transform: 'translateX(-50%)', width: 12, height: 12, borderRadius: '50%', background: '#D4AF37', boxShadow: '0 0 14px #D4AF37, 0 0 30px rgba(212,175,55,0.5)' }} />
              </div>
              <div style={{ position: 'absolute', inset: 30, borderRadius: '50%', border: '1px solid rgba(201,123,160,0.18)', animation: 'orbit-ccw 11s linear infinite' }}>
                <div style={{ position: 'absolute', top: -5, left: '50%', transform: 'translateX(-50%)', width: 10, height: 10, borderRadius: '50%', background: '#C97BA0', boxShadow: '0 0 12px #C97BA0' }} />
              </div>
              <div style={{ position: 'absolute', inset: 66, borderRadius: '50%', border: '1px solid rgba(245,230,200,0.12)', animation: 'orbit-cw 7s linear infinite' }}>
                <div style={{ position: 'absolute', top: -4, left: '50%', transform: 'translateX(-50%)', width: 7, height: 7, borderRadius: '50%', background: '#F5E6C8', boxShadow: '0 0 8px rgba(245,230,200,0.8)' }} />
              </div>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,230,200,0.95) 0%, rgba(212,175,55,0.5) 50%, transparent 100%)', boxShadow: '0 0 24px rgba(212,175,55,0.9), 0 0 60px rgba(212,175,55,0.4)', animation: 'glow-pulse 3s ease-in-out infinite' }} />
              </div>
            </div>

            <h1 style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif", fontSize: 'clamp(52px, 10vw, 116px)', fontStyle: 'italic', fontWeight: 300, lineHeight: 1.05, marginBottom: 28, background: 'linear-gradient(110deg, #9B7520 0%, #E8C96C 25%, #F9F0DC 50%, #E8C96C 75%, #9B7520 100%)', backgroundSize: '300% auto', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'shimmer-gold 4.5s linear infinite, reveal-rise 1.3s cubic-bezier(0.16,1,0.3,1) 0.2s both' }}>
              Reine Esther
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginBottom: 32, animation: 'reveal-fade 1s ease-out 0.7s both' }}>
              <div style={{ flex: 1, maxWidth: 80, height: 1, background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.6))' }} />
              <span style={{ color: '#D4AF37', fontSize: 10, letterSpacing: 12, fontFamily: "'Cinzel', serif" }}>✦ ✦ ✦</span>
              <div style={{ flex: 1, maxWidth: 80, height: 1, background: 'linear-gradient(90deg, rgba(212,175,55,0.6), transparent)' }} />
            </div>

            <p style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(11px, 1.8vw, 15px)', letterSpacing: '0.55em', textTransform: 'uppercase', color: 'rgba(245,230,200,0.65)', marginBottom: 18, animation: 'reveal-fade 1s ease-out 0.9s both' }}>
              Joyeux Anniversaire
            </p>

            <p style={{ fontFamily: "'Cormorant SC', serif", fontSize: 13, letterSpacing: '0.3em', color: 'rgba(201,123,160,0.65)', animation: 'reveal-fade 1s ease-out 1.1s both' }}>
              12 Mars 2005
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 72, animation: 'reveal-fade 1s ease-out 1.4s both' }}>
              {[0, 0.35, 0.7].map((d, i) => (
                <div key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: '#D4AF37', boxShadow: '0 0 8px rgba(212,175,55,0.8)', animation: `glow-pulse 2.2s ease-in-out ${d}s infinite` }} />
              ))}
            </div>

            <p style={{ marginTop: 52, fontFamily: "'Cormorant SC', serif", fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.28)', animation: 'reveal-fade 1s ease-out 1.8s both' }}>
              Redirection en cours
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
