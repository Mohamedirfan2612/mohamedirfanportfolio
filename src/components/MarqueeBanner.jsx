import React from 'react';
import { MARQUEE_ITEMS } from '../data/portfolioData';
import { Sparkles, Zap, Terminal } from 'lucide-react';

export default function MarqueeBanner() {
  // Duplicate array for seamless infinite loop
  const repeatedItems = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div
      style={{
        position: 'relative',
        background: 'linear-gradient(90deg, #130f24 0%, #1e1438 50%, #130f24 100%)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '16px 0',
        overflow: 'hidden',
        zIndex: 5
      }}
    >
      <div className="marquee-track">
        {repeatedItems.map((item, index) => (
          <div
            key={index}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '16px',
              padding: '0 24px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              color: index % 2 === 0 ? 'var(--text-accent)' : '#ffffff',
              whiteSpace: 'nowrap'
            }}
          >
            <span>{item}</span>
            <Zap size={14} color="var(--primary-glow)" />
          </div>
        ))}
      </div>

      <style>{`
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
