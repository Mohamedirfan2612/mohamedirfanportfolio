import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import HeroThreeCanvas from './HeroThreeCanvas';
import CursorVideoPortrait from './CursorVideoPortrait';
import heroVideo from '../videos/portfoliovideo.mp4';
import mobilePortrait from '../photo/portfoliomob.png';
import { ArrowRight, Terminal, Mail, Download, MapPin } from 'lucide-react';

// The source video contains real gaze poses at different points in time.
// Keep the original video pixels and select the closest natural pose.
const HERO_GAZE_KEYS = Object.freeze({
  center: 0.1,
  right: 2.5,
  down: 4.5,
  up: 6.25,
  left: 7.5,
});

export default function Hero() {
  return (
    <header
      id="about"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '100px',
        paddingBottom: '60px',
        overflow: 'hidden',
      }}
    >
      <HeroThreeCanvas />

      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: 'clamp(40px, 5vw, 80px)',
            alignItems: 'center',
          }}
          className="hero-grid"
        >
          {/* === LEFT: Real-Time Cursor-Tracking Video Portrait === */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CursorVideoPortrait
              src={heroVideo}
              mobileImage={mobilePortrait}
              width={280}
              height={460}
              keys={HERO_GAZE_KEYS}
              snapPoses
            />
          </div>

          {/* === RIGHT: Content === */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>

            {/* Status line */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <span className="status-dot" />
              <span style={{ fontSize: '0.82rem', color: 'var(--text-300)', fontFamily: 'var(--font-code)' }}>
                Available for work
              </span>
              <span style={{ color: 'var(--border-2)', margin: '0 4px' }}>·</span>
              <MapPin size={13} color="var(--text-400)" />
              <span style={{ fontSize: '0.82rem', color: 'var(--text-400)', fontFamily: 'var(--font-code)' }}>
                {PERSONAL_INFO.location}
              </span>
            </div>

            {/* Name */}
            <h1 className="display-1 gradient-text" style={{ marginBottom: '16px' }}>
              {PERSONAL_INFO.name}
            </h1>

            {/* Role chip */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.25)',
              borderRadius: 'var(--r-full)', padding: '6px 16px', marginBottom: '22px',
              width: 'fit-content'
            }}>
              <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.82rem', color: 'var(--blue-bright)' }}>
                {'{'} {PERSONAL_INFO.role} {'}'}
              </span>
            </div>

            {/* Tagline */}
            <p style={{
              fontSize: 'clamp(1rem, 1.6vw, 1.12rem)', color: 'var(--text-300)',
              lineHeight: 1.75, marginBottom: '36px', maxWidth: '520px'
            }}>
              {PERSONAL_INFO.tagline}
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '40px' }}>
              <a href="#projects" className="btn btn-primary" id="hero-cta-projects">
                View Projects <ArrowRight size={16} />
              </a>
              <a href="#contact" className="btn btn-secondary">
                <Mail size={16} /> Get In Touch
              </a>
              <a href="#terminal" className="btn btn-ghost">
                <Terminal size={16} /> Open CLI
              </a>
            </div>

            {/* Stats Row */}
            <div style={{
              display: 'flex', gap: '32px', flexWrap: 'wrap',
              paddingTop: '28px', borderTop: '1px solid var(--border-1)'
            }}>
              {[
                { val: PERSONAL_INFO.yearsExperience, label: 'Years Exp.' },
                { val: PERSONAL_INFO.projectsCompleted, label: 'Projects' },
                { val: PERSONAL_INFO.codeUptime, label: 'Uptime' },
                { val: PERSONAL_INFO.satisfiedClients, label: 'Satisfaction' },
              ].map(stat => (
                <div key={stat.label}>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontWeight: 800,
                    fontSize: '1.8rem', color: '#fff', lineHeight: 1.1
                  }}>
                    {stat.val}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-400)', marginTop: '3px', fontFamily: 'var(--font-code)' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center !important;
            justify-items: center;
          }
          .hero-grid > div { align-items: center !important; }
          .hero-grid p { max-width: 100% !important; }
        }
      `}</style>
    </header>
  );
}
