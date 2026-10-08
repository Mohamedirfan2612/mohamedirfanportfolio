import React from 'react';
import { X, ExternalLink, CheckCircle, Cpu } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(2,3,6,0.88)', backdropFilter: 'blur(14px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
        animation: 'fadeIn 0.2s ease'
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="card"
        style={{
          width: '100%', maxWidth: '680px', maxHeight: '88vh',
          overflowY: 'auto', padding: '32px 28px',
          background: 'rgba(10,10,16,0.97)',
          border: '1px solid var(--border-blue)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 0 30px rgba(37,99,235,0.15)',
          animation: 'slideUp 0.25s cubic-bezier(0.16,1,0.3,1)',
          position: 'relative', transform: 'none'
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '18px', right: '18px',
            background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-1)',
            borderRadius: '50%', width: '32px', height: '32px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--text-300)', cursor: 'pointer', transition: 'all 0.2s'
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'var(--text-300)'; }}
        >
          <X size={16} />
        </button>

        {/* Tags */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <span className="tag tag-blue">{project.badge}</span>
          <span className="tag tag-cyan">{project.category}</span>
        </div>

        {/* Title */}
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800, color: '#fff', marginBottom: '18px', lineHeight: 1.2 }}>
          {project.title}
        </h2>

        {/* Visual Hero */}
        <div style={{
          height: '160px', borderRadius: 'var(--r-md)',
          background: project.imageTheme || 'linear-gradient(135deg,#4c1d95,#1e1b4b)',
          marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Cpu size={40} color="rgba(255,255,255,0.35)" />
        </div>

        {/* Description */}
        <h4 style={{ fontSize: '0.88rem', color: 'var(--text-300)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px', fontFamily: 'var(--font-code)' }}>
          Overview
        </h4>
        <p style={{ color: 'var(--text-300)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '24px' }}>
          {project.description}
        </p>

        {/* Highlights */}
        <h4 style={{ fontSize: '0.88rem', color: 'var(--text-300)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px', fontFamily: 'var(--font-code)' }}>
          Key Highlights
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
          {project.highlights.map((h, i) => (
            <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '0.88rem' }}>
              <CheckCircle size={15} color="var(--blue-light)" style={{ marginTop: '2px', flexShrink: 0 }} />
              <span style={{ color: 'var(--text-300)' }}>{h}</span>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <h4 style={{ fontSize: '0.88rem', color: 'var(--text-300)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px', fontFamily: 'var(--font-code)' }}>
          Tech Stack
        </h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '28px' }}>
          {project.tech.map((t, i) => (
            <span key={i} style={{
              background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.2)',
              padding: '4px 12px', borderRadius: '5px',
              fontSize: '0.8rem', fontFamily: 'var(--font-code)', color: 'var(--blue-bright)'
            }}>{t}</span>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
            className="btn btn-primary" style={{ flex: 1, minWidth: '140px' }}>
            Live Demo <ExternalLink size={14} />
          </a>
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
            className="btn btn-secondary" style={{ flex: 1, minWidth: '140px' }}>
            <GithubIcon size={15} /> Source Code
          </a>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px) scale(0.97); } to { opacity: 1; transform: none; } }
      `}</style>
    </div>
  );
}
