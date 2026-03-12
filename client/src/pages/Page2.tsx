import { useState } from 'react';
import { useLocation } from 'wouter';
import { StarCanvas } from '@/components/StarCanvas';

export default function Page2() {
  const [, navigate] = useLocation();
  const [code, setCode] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [shake, setShake] = useState(false);

  const handleValidate = () => {
    if (code === '1224') {
      setSuccess(true);
      setError('');
      setTimeout(() => navigate('/page3'), 3000);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 600);
      const n = attempts + 1;
      setAttempts(n);
      setCode('');
      const msgs = [
        '✦ Tu le connais bien ce code, non ? Réessaie...',
        '✦ Toujours pas ? C\'est pourtant notre petit secret...',
        '✦ Tu commences à m\'inquiéter là...',
        `✦ ${n}ème essai... concentre-toi, Reine.`,
      ];
      setError(msgs[Math.min(n - 1, msgs.length - 1)]);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden', background: '#030014', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <StarCanvas />

      {/* Ambient orbs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '20%', left: '15%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,123,160,0.06) 0%, transparent 70%)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 440 }}>
        {!success ? (
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(212,175,55,0.2)',
            borderRadius: 24,
            padding: '56px 44px',
            boxShadow: '0 0 80px rgba(212,175,55,0.08), inset 0 0 60px rgba(212,175,55,0.03)',
            animation: shake ? 'shake-card 0.6s ease-in-out' : 'reveal-fade 0.8s ease-out',
          }}>

            {/* Crown icon */}
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <svg width="52" height="44" viewBox="0 0 52 44" fill="none" style={{ filter: 'drop-shadow(0 0 16px rgba(212,175,55,0.7))' }}>
                <path d="M4 36 L6 16 L18 28 L26 8 L34 28 L46 16 L48 36 Z" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinejoin="round"/>
                <circle cx="6" cy="16" r="3" fill="#D4AF37" opacity="0.9"/>
                <circle cx="26" cy="8" r="3" fill="#F5E6C8"/>
                <circle cx="46" cy="16" r="3" fill="#D4AF37" opacity="0.9"/>
                <rect x="4" y="36" width="44" height="3" rx="1.5" fill="#D4AF37" opacity="0.6"/>
              </svg>
            </div>

            {/* Title */}
            <h1 style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif", fontStyle: 'italic', fontWeight: 300, fontSize: 40, textAlign: 'center', marginBottom: 12, background: 'linear-gradient(110deg, #C9A84C, #F5E6C8, #D4AF37)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Chère Reine
            </h1>

            <p style={{ fontFamily: "'Cinzel', serif", fontSize: 13, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(245,230,200,0.5)', textAlign: 'center', marginBottom: 44 }}>
              Entrez le mot de passe de votre cœur
            </p>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 36 }}>
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3))' }} />
              <div style={{ width: 5, height: 5, background: '#D4AF37', transform: 'rotate(45deg)' }} />
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(212,175,55,0.3), transparent)' }} />
            </div>

            {/* Input */}
            <div style={{ position: 'relative', marginBottom: 20 }}>
              <input
                type="password"
                value={code}
                onChange={e => setCode(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleValidate()}
                placeholder="Code secret..."
                style={{
                  width: '100%', padding: '16px 20px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(212,175,55,0.25)',
                  borderRadius: 10,
                  color: '#F5E6C8',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 18, letterSpacing: '0.15em',
                  outline: 'none', boxSizing: 'border-box',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                }}
                onFocus={e => { e.target.style.borderColor = 'rgba(212,175,55,0.6)'; e.target.style.boxShadow = '0 0 20px rgba(212,175,55,0.15)'; }}
                onBlur={e => { e.target.style.borderColor = 'rgba(212,175,55,0.25)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>

            {/* Error */}
            {error && (
              <div style={{ marginBottom: 20, padding: '14px 18px', background: 'rgba(201,123,160,0.08)', border: '1px solid rgba(201,123,160,0.2)', borderRadius: 8, textAlign: 'center', animation: 'reveal-fade 0.4s ease-out' }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 15, color: 'rgba(201,123,160,0.85)', margin: 0 }}>{error}</p>
              </div>
            )}

            {/* Button */}
            <button
              onClick={handleValidate}
              style={{
                width: '100%', padding: '16px',
                background: 'linear-gradient(110deg, rgba(212,175,55,0.15), rgba(212,175,55,0.08))',
                border: '1px solid rgba(212,175,55,0.4)',
                borderRadius: 10, cursor: 'pointer',
                fontFamily: "'Cinzel', serif",
                fontSize: 13, letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: '#D4AF37',
                transition: 'all 0.3s',
                marginBottom: 28,
              }}
              onMouseEnter={e => { (e.target as HTMLButtonElement).style.background = 'linear-gradient(110deg, rgba(212,175,55,0.25), rgba(212,175,55,0.15))'; (e.target as HTMLButtonElement).style.boxShadow = '0 0 24px rgba(212,175,55,0.2)'; }}
              onMouseLeave={e => { (e.target as HTMLButtonElement).style.background = 'linear-gradient(110deg, rgba(212,175,55,0.15), rgba(212,175,55,0.08))'; (e.target as HTMLButtonElement).style.boxShadow = 'none'; }}
            >
              Valider
            </button>

            <p style={{ fontFamily: "'Cormorant SC', serif", fontSize: 14, letterSpacing: '0.2em', color: 'rgba(245,230,200,0.3)', textAlign: 'center' }}>
              Pense à notre date spéciale... ✦
            </p>
          </div>
        ) : (
          <div style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(24px)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: 24, padding: '64px 44px', textAlign: 'center', animation: 'scale-in 0.7s cubic-bezier(0.34,1.56,0.64,1)', boxShadow: '0 0 80px rgba(212,175,55,0.15)' }}>
            <div style={{ fontSize: 48, marginBottom: 28, filter: 'drop-shadow(0 0 20px rgba(212,175,55,0.8))' }}>✦</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 300, fontSize: 30, background: 'linear-gradient(110deg, #C9A84C, #F5E6C8, #D4AF37)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 16, lineHeight: 1.4 }}>
              Je savais que je pouvais compter sur toi...
            </h2>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.3em', color: 'rgba(245,230,200,0.5)', textTransform: 'uppercase' }}>Ta surprise arrive...</p>
          </div>
        )}
      </div>
    </div>
  );
}
