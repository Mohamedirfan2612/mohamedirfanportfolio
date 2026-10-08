import React, { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

const LOGS = [
  { at: 0, text: 'Initializing runtime…' },
  { at: 20, text: 'Loading React modules…' },
  { at: 45, text: 'Connecting Node.js bridges…' },
  { at: 68, text: 'Configuring MongoDB schemas…' },
  { at: 85, text: 'Rendering WebGL shaders…' },
  { at: 100, text: 'Ready.' },
];

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [log, setLog] = useState(LOGS[0].text);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 350);
          return 100;
        }
        const next = Math.min(prev + Math.floor(Math.random() * 9) + 5, 100);
        const matching = [...LOGS].reverse().find(l => next >= l.at);
        if (matching) setLog(matching.text);
        return next;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#040509',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '24px'
    }}>
      <div style={{ maxWidth: '360px', width: '100%', textAlign: 'center' }}>
        {/* Icon */}
        <div style={{
          width: '56px', height: '56px', borderRadius: '14px',
          background: 'linear-gradient(135deg, #2563eb, #06b6d4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px', boxShadow: '0 0 24px rgba(37,99,235,0.5)'
        }}>
          <Zap size={28} color="#fff" />
        </div>

        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>
          Mohamed Irfan
        </div>
        <div style={{ fontFamily: 'var(--font-code)', fontSize: '0.75rem', color: 'var(--text-400)', marginBottom: '28px' }}>
          MERN Stack Developer
        </div>

        {/* Progress */}
        <div style={{
          height: '3px', background: 'rgba(255,255,255,0.07)',
          borderRadius: '99px', overflow: 'hidden', marginBottom: '12px'
        }}>
          <div style={{
            height: '100%', width: `${progress}%`,
            background: 'linear-gradient(90deg, #2563eb, #06b6d4)',
            borderRadius: '99px', transition: 'width 0.05s ease'
          }} />
        </div>

        <div style={{
          display: 'flex', justifyContent: 'space-between',
          fontFamily: 'var(--font-code)', fontSize: '0.73rem',
          color: 'var(--text-400)', marginBottom: '8px'
        }}>
          <span>{log}</span>
          <span style={{ color: '#fff', fontWeight: 700 }}>{progress}%</span>
        </div>

        <button
          onClick={onComplete}
          style={{
            marginTop: '20px', background: 'none', border: 'none',
            color: 'var(--text-400)', fontSize: '0.75rem',
            fontFamily: 'var(--font-code)', cursor: 'pointer',
            textDecoration: 'underline', textUnderlineOffset: '3px'
          }}
        >
          Skip
        </button>
      </div>
    </div>
  );
}
