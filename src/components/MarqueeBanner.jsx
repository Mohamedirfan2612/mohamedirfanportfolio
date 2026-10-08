import React from 'react';
import { MARQUEE_ITEMS } from '../data/portfolioData';

export default function MarqueeBanner() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="marquee-wrapper">
      <div className="marquee-track">
        {items.map((item, i) => (
          <div key={i} style={{
            display: 'inline-flex', alignItems: 'center', gap: '12px',
            padding: '0 20px', whiteSpace: 'nowrap',
            fontFamily: 'var(--font-code)', fontSize: '0.82rem',
            fontWeight: 500, letterSpacing: '0.08em', color: 'var(--text-400)'
          }}>
            <span style={{ color: 'var(--blue-light)', opacity: 0.6 }}>·</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
