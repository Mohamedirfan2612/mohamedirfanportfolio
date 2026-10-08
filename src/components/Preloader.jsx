import React, { useState, useEffect } from 'react';
import { Terminal, Shield, Zap, Sparkles } from 'lucide-react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [logText, setLogText] = useState('BOOTING MERN ENGINE...');

  useEffect(() => {
    const logs = [
      { at: 15, text: 'LOADING REACT CORE & FIBER MODULES...' },
      { at: 45, text: 'INITIALIZING NODE RUNTIME & API BRIDGES...' },
      { at: 75, text: 'CONFIGURING MONGODB SCHEMAS & REDIS CACHE...' },
      { at: 95, text: 'SYNCHRONIZING 3D WEBGL GRAPHICS SHADERS...' },
      { at: 100, text: 'SYSTEM READY. WELCOME TO MOHAMED IRFAN PORTFOLIO.' }
    ];

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 8) + 4;
        const current = next > 100 ? 100 : next;
        
        const matchingLog = logs.find(l => current >= l.at);
        if (matchingLog) setLogText(matchingLog.text);

        return current;
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#050408',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}
    >
      <div style={{ maxWidth: '440px', width: '100%', textAlign: 'center' }}>
        
        {/* Cyber Logo Icon */}
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent-cyan) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px auto',
            boxShadow: '0 0 30px rgba(168, 85, 247, 0.6)'
          }}
        >
          <Zap size={32} color="#ffffff" />
        </div>

        {/* System Title */}
        <h2
          className="font-heading text-gradient"
          style={{
            fontSize: '1.5rem',
            fontWeight: 800,
            letterSpacing: '0.05em',
            marginBottom: '8px'
          }}
        >
          MOHAMED IRFAN
        </h2>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-accent)', marginBottom: '24px' }}>
          MERN STACK ARCHITECTURE
        </div>

        {/* Progress Bar */}
        <div
          style={{
            height: '6px',
            width: '100%',
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: 'var(--radius-full)',
            overflow: 'hidden',
            marginBottom: '14px',
            position: 'relative',
            border: '1px solid rgba(168, 85, 247, 0.2)'
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, var(--primary) 0%, var(--accent-cyan) 100%)',
              borderRadius: 'var(--radius-full)',
              boxShadow: '0 0 15px var(--primary-glow)',
              transition: 'width 0.06s ease'
            }}
          />
        </div>

        {/* Progress Text & Telemetry Log */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            color: 'var(--accent-cyan-glow)',
            marginBottom: '12px'
          }}
        >
          <span>SYSTEM BOOT</span>
          <span style={{ fontWeight: 700, color: '#ffffff' }}>{progress}%</span>
        </div>

        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'var(--text-muted)',
            minHeight: '20px'
          }}
        >
          {logText}
        </div>

        {/* Quick Skip Button */}
        <button
          onClick={onComplete}
          style={{
            marginTop: '28px',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          Skip Boot Sequence
        </button>

      </div>
    </div>
  );
}
