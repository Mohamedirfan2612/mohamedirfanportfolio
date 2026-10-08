import React from 'react';
import { X, ExternalLink, CheckCircle, Layers, Cpu } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="glass-panel modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '740px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '36px 32px',
          background: 'rgba(12, 9, 22, 0.95)',
          border: '1px solid var(--border-glow)',
          boxShadow: 'var(--glow-lg)',
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--primary)')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
        >
          <X size={18} />
        </button>

        {/* Header Badges */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <span className="badge-neon">{project.badge}</span>
          <span className="badge-cyan">{project.category}</span>
        </div>

        {/* Title */}
        <h3
          className="font-heading text-gradient"
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 800,
            marginBottom: '16px'
          }}
        >
          {project.title}
        </h3>

        {/* Graphic Mockup Header */}
        <div
          style={{
            width: '100%',
            height: '180px',
            borderRadius: 'var(--radius-md)',
            background: project.imageTheme || 'linear-gradient(135deg, #4c1d95 0%, #1e1b4b 100%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            marginBottom: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div className="cyber-corner-top-left"></div>
          <div className="cyber-corner-bottom-right"></div>
          <Cpu size={48} color="var(--primary-glow)" style={{ marginBottom: '12px', opacity: 0.9 }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: '#ffffff', letterSpacing: '0.05em' }}>
            {project.badge}
          </span>
        </div>

        {/* Full Overview Description */}
        <h4 style={{ color: '#ffffff', fontSize: '1.05rem', marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>
          Project Architecture & Overview
        </h4>
        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '0.95rem',
            lineHeight: 1.7,
            marginBottom: '24px'
          }}
        >
          {project.description}
        </p>

        {/* Key Engineering Highlights */}
        <h4 style={{ color: '#ffffff', fontSize: '1.05rem', marginBottom: '12px', fontFamily: 'var(--font-heading)' }}>
          Key Technical Highlights
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
          {project.highlights.map((hl, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                color: 'var(--text-accent)',
                fontSize: '0.88rem'
              }}
            >
              <CheckCircle size={16} color="var(--primary-glow)" style={{ marginTop: '2px', flexShrink: 0 }} />
              <span>{hl}</span>
            </div>
          ))}
        </div>

        {/* Tech Stack Chips */}
        <h4 style={{ color: '#ffffff', fontSize: '1.05rem', marginBottom: '12px', fontFamily: 'var(--font-heading)' }}>
          Technology Stack
        </h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
          {project.tech.map((t, idx) => (
            <span
              key={idx}
              style={{
                background: 'rgba(168, 85, 247, 0.1)',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '0.82rem',
                fontFamily: 'var(--font-mono)',
                color: '#ffffff'
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cyber-primary"
            style={{ flex: 1, minWidth: '160px' }}
          >
            <span>Live Demonstration</span>
            <ExternalLink size={16} />
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cyber-secondary"
            style={{ flex: 1, minWidth: '160px' }}
          >
            <GithubIcon size={16} />
            <span>Source Code</span>
          </a>
        </div>

      </div>
    </div>
  );
}
