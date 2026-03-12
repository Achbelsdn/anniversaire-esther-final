import { useEffect, useState } from 'react';
import { StarCanvas } from '@/components/StarCanvas';

const PHOTO_1 = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663277053953/9Z9y8smfeUgszzwkaMCHER/esther_photo_1_7f029ffe.jpg';
const PHOTO_2 = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663277053953/9Z9y8smfeUgszzwkaMCHER/esther_photo_2_01617386.jpg';

const messages = [
  { text: "Esther, ma meilleure alliée.", style: 'opening' },
  { text: "On dit souvent que le premier amour est un chapitre qu'on finit par fermer,", style: 'normal' },
  { text: "mais avec toi, c'est différent.", style: 'accent' },
  { text: "C'est un livre qu'on continue d'écrire, page après page, sous une autre forme.", style: 'normal' },
  { text: "On a traversé des tempêtes, on a changé de trajectoire,", style: 'normal' },
  { text: "mais rien n'a pu effacer cette connexion qu'on a.", style: 'accent' },
  { text: "Aujourd'hui, on ne marche plus main dans la main,", style: 'normal' },
  { text: "mais on se comprend d'un simple regard...", style: 'normal' },
  { text: "et au fond, c'est peut-être ça notre plus belle victoire.", style: 'accent' },
  { text: "Merci d'être cette Reine sans couronne pour qui j'aurai toujours un respect immense.", style: 'normal' },
  { text: "Que cette journée soit aussi unique que le lien qui nous unit.", style: 'normal' },
  { text: "Sache que peu importe où la vie nous mène,", style: 'normal' },
  { text: "je serai toujours dans ton équipe, à te soutenir comme au premier jour.", style: 'normal' },
  { text: "Continue de briller,", style: 'normal' },
  { text: "le monde a vraiment besoin de ta lumière.", style: 'accent' },
  { text: "Ton éternel allié.", style: 'closing' },
];

export default function Page3() {
  const [shownCount, setShownCount] = useState(0);
  const [photosVisible, setPhotosVisible] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t0 = setTimeout(() => setHeaderVisible(true), 300);
    const t1 = setTimeout(() => setPhotosVisible(true), 800);
    // Start messages after photos appear
    const t2 = setTimeout(() => {
      let idx = 0;
      const iv = setInterval(() => {
        idx++;
        setShownCount(idx);
        if (idx >= messages.length) {
          clearInterval(iv);
          setTimeout(() => setDone(true), 800);
        }
      }, 900);
      return () => clearInterval(iv);
    }, 1400);

    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', background: '#030014', overflowX: 'hidden' }}>
      <StarCanvas />

      <style>{`
        @keyframes lineReveal {
          0% {
            opacity: 0;
            transform: translateY(22px);
            filter: blur(4px);
          }
          60% { opacity: 1; filter: blur(0); }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes shimmerGold {
          0% { background-position: -300% center; }
          100% { background-position: 300% center; }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInL {
          from { opacity: 0; transform: translateX(-50px) rotateY(12deg); }
          to { opacity: 1; transform: translateX(0) rotateY(0); }
        }
        @keyframes slideInR {
          from { opacity: 0; transform: translateX(50px) rotateY(-12deg); }
          to { opacity: 1; transform: translateX(0) rotateY(0); }
        }
        @keyframes dividerDraw {
          from { width: 0; opacity: 0; }
          to { width: 100px; opacity: 1; }
        }
      `}</style>

      {/* Ambient orbs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
        <div style={{ position: 'absolute', top: '10%', left: '20%', width: 700, height: 400, background: 'radial-gradient(ellipse, rgba(212,175,55,0.04) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '5%', right: '10%', width: 600, height: 400, background: 'radial-gradient(ellipse, rgba(201,123,160,0.04) 0%, transparent 70%)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 900, margin: '0 auto', padding: '80px 28px 100px' }}>

        {/* ── Header ── */}
        <div style={{
          textAlign: 'center', marginBottom: 80,
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? 'none' : 'translateY(-20px)',
          transition: 'opacity 1.2s ease, transform 1.2s ease',
        }}>
          <p style={{
            fontFamily: "'Cinzel', serif", fontSize: 12,
            letterSpacing: '0.55em', textTransform: 'uppercase',
            color: 'rgba(201,123,160,0.55)', marginBottom: 24,
          }}>
            12 Mars 2005 — 20 ans
          </p>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: 'italic', fontWeight: 300,
            fontSize: 'clamp(48px, 8vw, 96px)',
            lineHeight: 1.05, marginBottom: 20,
            background: 'linear-gradient(110deg, #9B7520, #E8C96C, #F9F0DC, #E8C96C, #9B7520)',
            backgroundSize: '300% auto',
            WebkitBackgroundClip: 'text', backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'shimmerGold 5s linear infinite',
          }}>
            Joyeux Anniversaire
          </h1>
          <p style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 'clamp(15px, 2.5vw, 22px)',
            letterSpacing: '0.45em', textTransform: 'uppercase',
            color: 'rgba(245,230,200,0.55)',
            marginBottom: 36,
          }}>
            Eunice Esther
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
            <div style={{ width: 100, height: 1, background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4))' }} />
            <span style={{ color: '#D4AF37', fontSize: 12, letterSpacing: 8 }}>✦</span>
            <div style={{ width: 100, height: 1, background: 'linear-gradient(90deg, rgba(212,175,55,0.4), transparent)' }} />
          </div>
        </div>

        {/* ── Photos ── */}
        {photosVisible && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32, marginBottom: 80 }}>
            {[
              { url: PHOTO_1, rot: '-1.8deg', anim: 'slideInL', color: 'rgba(212,175,55,0.45)' },
              { url: PHOTO_2, rot: '1.8deg', anim: 'slideInR', color: 'rgba(201,123,160,0.4)', delay: '0.2s' },
            ].map((ph, i) => (
              <div key={i} style={{ animation: `${ph.anim} 1s cubic-bezier(0.16,1,0.3,1) ${(ph as any).delay || '0s'} both` }}>
                <div
                  style={{
                    padding: 3,
                    background: `linear-gradient(135deg, ${ph.color}, rgba(0,0,0,0.1), ${ph.color})`,
                    borderRadius: 4,
                    boxShadow: `0 20px 60px rgba(0,0,0,0.55), 0 0 40px ${ph.color}`,
                    transform: `rotate(${ph.rot})`,
                    transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s ease',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = 'rotate(0deg) scale(1.03)';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 30px 80px rgba(0,0,0,0.65), 0 0 60px ${ph.color}`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = `rotate(${ph.rot})`;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 60px rgba(0,0,0,0.55), 0 0 40px ${ph.color}`;
                  }}
                >
                  <div style={{ background: '#080612', padding: '12px 12px 44px', borderRadius: 2 }}>
                    <img src={ph.url} alt="Eunice Esther" style={{ width: '100%', height: 300, objectFit: 'cover', display: 'block' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Letter ── */}
        <div style={{
          background: 'rgba(255,255,255,0.018)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(212,175,55,0.1)',
          borderRadius: 24,
          padding: 'clamp(36px, 5vw, 72px)',
          boxShadow: '0 40px 120px rgba(0,0,0,0.45), inset 0 0 100px rgba(212,175,55,0.02)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Subtle corner ornaments */}
          <div style={{ position: 'absolute', top: 24, left: 24, width: 24, height: 24, borderTop: '1px solid rgba(212,175,55,0.25)', borderLeft: '1px solid rgba(212,175,55,0.25)' }} />
          <div style={{ position: 'absolute', top: 24, right: 24, width: 24, height: 24, borderTop: '1px solid rgba(212,175,55,0.25)', borderRight: '1px solid rgba(212,175,55,0.25)' }} />
          <div style={{ position: 'absolute', bottom: 24, left: 24, width: 24, height: 24, borderBottom: '1px solid rgba(212,175,55,0.25)', borderLeft: '1px solid rgba(212,175,55,0.25)' }} />
          <div style={{ position: 'absolute', bottom: 24, right: 24, width: 24, height: 24, borderBottom: '1px solid rgba(212,175,55,0.25)', borderRight: '1px solid rgba(212,175,55,0.25)' }} />

          {/* Letter tag */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 56 }}>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.2))' }} />
            <span style={{
              fontFamily: "'Cinzel', serif", fontSize: 11,
              letterSpacing: '0.45em', textTransform: 'uppercase',
              color: 'rgba(212,175,55,0.45)',
            }}>✦ Une lettre pour toi ✦</span>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(212,175,55,0.2), transparent)' }} />
          </div>

          {/* Messages — ligne par ligne */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {messages.map((msg, i) => {
              const visible = i < shownCount;
              const isOpening = msg.style === 'opening';
              const isClosing = msg.style === 'closing';
              const isAccent = msg.style === 'accent';
              const isCurrent = i === shownCount - 1;

              return (
                <div key={i} style={{
                  overflow: 'hidden',
                  marginBottom: isOpening || isClosing ? 32 : isAccent ? 8 : 4,
                  marginTop: isClosing ? 32 : 0,
                }}>
                  <div style={{
                    opacity: visible ? 1 : 0,
                    animation: visible ? `lineReveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards` : 'none',
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 10,
                  }}>
                    {/* Subtle bullet for normal lines */}
                    {!isOpening && !isClosing && (
                      <span style={{
                        display: 'inline-block',
                        width: isAccent ? 6 : 4,
                        height: isAccent ? 6 : 4,
                        borderRadius: '50%',
                        background: isAccent ? '#D4AF37' : 'rgba(212,175,55,0.3)',
                        flexShrink: 0,
                        marginBottom: 3,
                        boxShadow: isAccent ? '0 0 8px rgba(212,175,55,0.7)' : 'none',
                        transition: 'all 0.5s ease',
                      }} />
                    )}
                    <p style={{
                      margin: 0,
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontStyle: isOpening || isClosing || isAccent ? 'italic' : 'normal',
                      fontWeight: isOpening || isClosing ? 400 : isAccent ? 400 : 300,
                      fontSize: isOpening ? 'clamp(22px, 3vw, 30px)'
                        : isClosing ? 'clamp(22px, 3vw, 28px)'
                        : isAccent ? 'clamp(20px, 2.5vw, 26px)'
                        : 'clamp(18px, 2vw, 23px)',
                      lineHeight: 1.85,
                      letterSpacing: isOpening || isClosing ? '0.02em' : '0.01em',
                      color: isOpening ? '#F5E6C8'
                        : isClosing ? 'rgba(201,123,160,0.95)'
                        : isAccent ? 'rgba(245,226,180,0.92)'
                        : 'rgba(245,230,200,0.7)',
                      textShadow: isAccent ? '0 0 30px rgba(212,175,55,0.15)' : 'none',
                    }}>
                      {msg.text}
                      {/* Blinking cursor on current line */}
                      {isCurrent && !done && (
                        <span style={{
                          display: 'inline-block',
                          width: 2,
                          height: '0.85em',
                          background: '#D4AF37',
                          marginLeft: 4,
                          verticalAlign: 'middle',
                          animation: 'cursorBlink 0.9s ease-in-out infinite',
                          borderRadius: 1,
                          boxShadow: '0 0 8px rgba(212,175,55,0.8)',
                        }} />
                      )}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Finale */}
          {done && (
            <div style={{ marginTop: 64, textAlign: 'center', animation: 'fadeIn 1.4s ease-out forwards' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginBottom: 32 }}>
                <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.35))' }} />
                <span style={{ color: '#D4AF37', fontSize: 10, letterSpacing: 12 }}>✦</span>
                <span style={{ color: '#C97BA0', fontSize: 18, filter: 'drop-shadow(0 0 10px rgba(201,123,160,0.7))', animation: 'glowPulse 2s ease-in-out infinite' }}>♡</span>
                <span style={{ color: '#D4AF37', fontSize: 10, letterSpacing: 12 }}>✦</span>
                <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, rgba(212,175,55,0.35), transparent)' }} />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: 72 }}>
          <p style={{
            fontFamily: "'Cormorant SC', serif", fontSize: 13,
            letterSpacing: '0.35em', color: 'rgba(245,230,200,0.2)',
            textTransform: 'uppercase', marginBottom: 10,
          }}>
            Née le 12 Mars 2005
          </p>
          <p style={{
            fontFamily: "'Cinzel', serif", fontSize: 11,
            letterSpacing: '0.25em', color: 'rgba(212,175,55,0.18)',
            textTransform: 'uppercase',
          }}>
            Créé avec amour ✦
          </p>
        </div>
      </div>
    </div>
  );
}
