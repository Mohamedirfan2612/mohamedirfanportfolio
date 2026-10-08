import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Code2, ArrowUp, Activity } from 'lucide-react';

export default function Footer() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => setTime(new Date().toUTCString().slice(17, 25));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <footer style={{
      borderTop: '1px solid var(--border-1)',
      background: 'rgba(4,5,9,0.96)',
      padding: '40px 0 28px'
    }}>
      <div className="container">
        {/* Top row */}
        <div style={{
          display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'space-between',
          gap: '20px', marginBottom: '28px'
        }}>
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '30px', height: '30px', borderRadius: '7px',
              background: 'linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Code2 size={16} color="#fff" />
            </div>
            <span style={{
              fontFamily: 'var(--font-display)', fontWeight: 800,
              fontSize: '1rem', color: '#fff'
            }}>
              {PERSONAL_INFO.handle}
            </span>
          </div>

          {/* Live clock */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
            <Activity size={13} color="var(--cyan-light)" />
            <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.76rem', color: 'var(--text-400)' }}>
              {time} UTC  ·  All systems operational
            </span>
          </div>

          {/* Back to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="btn btn-secondary"
            style={{ padding: '8px 14px', fontSize: '0.8rem' }}
          >
            <ArrowUp size={14} /> Top
          </button>
        </div>

        {/* Divider */}
        <div className="divider" style={{ marginBottom: '22px' }} />

        {/* Bottom */}
        <div style={{
          display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'space-between',
          gap: '12px', fontSize: '0.8rem', color: 'var(--text-400)', fontFamily: 'var(--font-code)'
        }}>
          <span>© {new Date().getFullYear()} {PERSONAL_INFO.name}. Built with React + Vite + Three.js.</span>
          <span>MERN Stack · High-Performance Architecture</span>
        </div>
      </div>
    </footer>
  );
}
