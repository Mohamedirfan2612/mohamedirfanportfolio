import React from 'react';
import { TIMELINE_DATA } from '../data/portfolioData';
import { Briefcase, Calendar, CheckCircle, ChevronRight, Award } from 'lucide-react';

export default function ExperienceTimeline() {
  return (
    <section id="timeline" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-neon" style={{ marginBottom: '14px' }}>
            <span>CAREER EVOLUTION</span>
          </div>
          <h2 className="neon-title text-gradient" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Experience & Journey
          </h2>
          <p className="section-subtitle">
            A chronological timeline of engineering progression, mastering the full stack from foundation to scalable architecture.
          </p>
        </div>

        {/* Timeline Container */}
        <div style={{ maxWidth: '880px', margin: '0 auto', position: 'relative' }}>
          
          {/* Central Cyber Neon Spine */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              bottom: '20px',
              left: '28px',
              width: '2px',
              background: 'linear-gradient(180deg, var(--primary-glow) 0%, var(--accent-cyan) 60%, transparent 100%)',
              boxShadow: '0 0 10px rgba(168, 85, 247, 0.4)',
              zIndex: 1
            }}
          />

          {/* Timeline Nodes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
            {TIMELINE_DATA.map((item, index) => (
              <div
                key={item.year}
                style={{
                  position: 'relative',
                  paddingLeft: '72px'
                }}
              >
                {/* Year Marker Badge on Spine */}
                <div
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '22px',
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    background: index === 0 ? 'var(--primary)' : '#120f20',
                    border: `2px solid ${index === 0 ? '#ffffff' : 'var(--primary-glow)'}`,
                    boxShadow: index === 0 ? '0 0 15px var(--primary-glow)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2,
                    color: '#ffffff'
                  }}
                >
                  <Calendar size={15} />
                </div>

                {/* Timeline Card */}
                <div
                  className="glass-panel"
                  style={{
                    padding: '28px 26px',
                    background: index === 0 ? 'rgba(26, 18, 44, 0.85)' : 'rgba(15, 12, 24, 0.75)',
                    border: index === 0 ? '1px solid var(--border-glow)' : '1px solid var(--border-subtle)'
                  }}
                >
                  {/* Top Bar: Year & Role */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                      marginBottom: '12px'
                    }}
                  >
                    <div>
                      <span
                        className="badge-neon"
                        style={{
                          fontSize: '0.72rem',
                          marginBottom: '8px',
                          background: index === 0 ? 'rgba(168, 85, 247, 0.25)' : 'rgba(255, 255, 255, 0.05)'
                        }}
                      >
                        {item.year} • {item.status}
                      </span>
                      <h3
                        className="font-heading"
                        style={{
                          fontSize: '1.35rem',
                          fontWeight: 700,
                          color: '#ffffff'
                        }}
                      >
                        {item.role}
                      </h3>
                    </div>

                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.85rem',
                        color: 'var(--accent-cyan-glow)',
                        background: 'rgba(6, 182, 212, 0.1)',
                        border: '1px solid rgba(6, 182, 212, 0.25)',
                        padding: '4px 12px',
                        borderRadius: '6px'
                      }}
                    >
                      {item.company}
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.92rem',
                      lineHeight: 1.6,
                      marginBottom: '18px'
                    }}
                  >
                    {item.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {item.highlights.map((hl, hIdx) => (
                      <div
                        key={hIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          fontSize: '0.84rem',
                          color: 'var(--text-accent)'
                        }}
                      >
                        <ChevronRight size={14} color="var(--primary-glow)" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
