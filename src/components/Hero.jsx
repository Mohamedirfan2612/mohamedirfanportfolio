import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import HeroThreeCanvas from './HeroThreeCanvas';
import { ArrowRight, Terminal, Mail, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <header
      id="about"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '120px',
        paddingBottom: '80px',
        overflow: 'hidden'
      }}
    >
      {/* 3D WebGL Background Canvas */}
      <HeroThreeCanvas />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
          
          {/* Eyebrow Badge */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <div className="badge-neon" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
              <Sparkles size={16} color="var(--primary-glow)" />
              <span>{PERSONAL_INFO.role} & SYSTEM ARCHITECT</span>
            </div>
          </div>

          {/* Main Hero Glitch/Neon Heading */}
          <h1
            className="neon-title text-gradient"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.8rem)',
              lineHeight: 1.08,
              marginBottom: '20px',
              letterSpacing: '-0.03em'
            }}
          >
            {PERSONAL_INFO.name}
          </h1>

          {/* Interactive Code Preview Chip */}
          <div
            className="glass-panel"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 20px',
              marginBottom: '28px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-subtle)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              color: 'var(--text-accent)'
            }}
          >
            <span style={{ color: '#ec4899' }}>const</span>
            <span style={{ color: '#38bdf8' }}>techStack</span>
            <span style={{ color: 'var(--text-muted)' }}>=</span>
            <span style={{ color: '#a855f7' }}>['MongoDB', 'Express', 'React', 'Node.js']</span>
          </div>

          {/* Tagline Bio */}
          <p
            style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              marginBottom: '40px',
              maxWidth: '720px',
              margin: '0 auto 40px auto'
            }}
          >
            {PERSONAL_INFO.tagline}
          </p>

          {/* CTA Action Buttons */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '64px'
            }}
          >
            <a href="#projects" className="btn-cyber-primary" id="hero-explore-projects">
              <span>Explore Projects</span>
              <ArrowRight size={18} />
            </a>

            <a href="#contact" className="btn-cyber-secondary">
              <Mail size={18} color="var(--primary-glow)" />
              <span>Get In Touch</span>
            </a>

            <a
              href="#terminal"
              className="btn-cyber-secondary"
              style={{ padding: '12px 20px' }}
              title="Open Interactive Terminal"
            >
              <Terminal size={18} color="var(--accent-cyan-glow)" />
              <span>Launch Terminal</span>
            </a>
          </div>

          {/* Quick Stats Grid */}
          <div
            className="glass-panel"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '24px',
              padding: '28px 24px',
              background: 'rgba(14, 11, 24, 0.75)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div
                className="font-heading text-gradient-purple"
                style={{ fontSize: '2.2rem', fontWeight: 800 }}
              >
                {PERSONAL_INFO.yearsExperience}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                Years Experience
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div
                className="font-heading text-gradient-purple"
                style={{ fontSize: '2.2rem', fontWeight: 800 }}
              >
                {PERSONAL_INFO.projectsCompleted}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                Projects Shipped
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div
                className="font-heading text-gradient-purple"
                style={{ fontSize: '2.2rem', fontWeight: 800 }}
              >
                {PERSONAL_INFO.codeUptime}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                Uptime Reliability
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div
                className="font-heading text-gradient-purple"
                style={{ fontSize: '2.2rem', fontWeight: 800 }}
              >
                {PERSONAL_INFO.satisfiedClients}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                Satisfaction Rate
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
