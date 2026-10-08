import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowUp, Code2, Heart, ShieldCheck, Activity } from 'lucide-react';

export default function Footer() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toUTCString().slice(17, 25) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-subtle)',
        background: 'rgba(5, 4, 9, 0.95)',
        padding: '48px 0 32px 0',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div className="container">
        
        {/* Top Footer Row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
            marginBottom: '36px'
          }}
        >
          {/* Logo Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent-cyan) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Code2 size={18} color="#ffffff" />
            </div>
            <span className="font-heading" style={{ fontWeight: 800, fontSize: '1.1rem', color: '#ffffff' }}>
              {PERSONAL_INFO.handle}
            </span>
          </div>

          {/* System Telemetry Chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                color: 'var(--accent-cyan-glow)',
                background: 'rgba(6, 182, 212, 0.08)',
                border: '1px solid rgba(6, 182, 212, 0.25)',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)'
              }}
            >
              <Activity size={13} />
              <span>SYS TIME: {time || 'CALCULATING...'}</span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                color: '#34d399',
                background: 'rgba(16, 185, 129, 0.08)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)'
              }}
            >
              <ShieldCheck size={13} />
              <span>ALL SERVICES OPERATIONAL</span>
            </div>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="btn-cyber-secondary"
            style={{ padding: '8px 16px', fontSize: '0.8rem' }}
          >
            <span>TOP</span>
            <ArrowUp size={14} />
          </button>
        </div>

        {/* Bottom Copyright & Credit */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            paddingTop: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            color: 'var(--text-muted)',
            fontSize: '0.82rem',
            fontFamily: 'var(--font-mono)'
          }}
        >
          <div>
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. Built with React, Three.js & Modern Web Standards.
          </div>
          <div>
            High Performance • Scalable Architecture • MERN Stack
          </div>
        </div>

      </div>
    </footer>
  );
}
