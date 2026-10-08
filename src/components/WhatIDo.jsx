import React from 'react';
import { CORE_SERVICES } from '../data/portfolioData';
import { Layout, Server, Database, Cloud, CheckCircle2, ArrowUpRight } from 'lucide-react';

const iconMap = {
  Layout: Layout,
  Server: Server,
  Database: Database,
  Cloud: Cloud
};

export default function WhatIDo() {
  return (
    <section id="services" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-neon" style={{ marginBottom: '14px' }}>
            <span>ENGINEERING ARCHITECTURE</span>
          </div>
          <h2 className="neon-title text-gradient" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            What I Engineer
          </h2>
          <p className="section-subtitle">
            Specialized in end-to-end full stack development, transforming complex business logic into high-throughput scalable software.
          </p>
        </div>

        {/* Services 2x2 Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px'
          }}
        >
          {CORE_SERVICES.map((service, idx) => {
            const IconComponent = iconMap[service.icon] || Layout;

            return (
              <div
                key={service.id}
                className="glass-panel"
                style={{
                  padding: '36px 30px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: 'rgba(15, 12, 26, 0.75)'
                }}
              >
                {/* Cyber Corner Marks */}
                <div className="cyber-corner-top-left"></div>
                <div className="cyber-corner-bottom-right"></div>

                <div>
                  {/* Top Bar: Icon + Badge */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '24px'
                    }}
                  >
                    <div
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.25) 0%, rgba(6, 182, 212, 0.15) 100%)',
                        border: '1px solid var(--border-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--primary-glow)',
                        boxShadow: '0 0 15px rgba(168, 85, 247, 0.2)'
                      }}
                    >
                      <IconComponent size={26} />
                    </div>

                    <span className="badge-cyan" style={{ fontSize: '0.72rem' }}>
                      {service.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3
                    className="font-heading"
                    style={{
                      fontSize: '1.45rem',
                      fontWeight: 700,
                      color: '#ffffff',
                      marginBottom: '14px'
                    }}
                  >
                    {service.title}
                  </h3>

                  <p
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.94rem',
                      lineHeight: 1.65,
                      marginBottom: '24px'
                    }}
                  >
                    {service.description}
                  </p>
                </div>

                {/* Tech Chips */}
                <div>
                  <div
                    style={{
                      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                      paddingTop: '20px',
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px'
                    }}
                  >
                    {service.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(168, 85, 247, 0.15)',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '0.78rem',
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--text-accent)'
                        }}
                      >
                        <CheckCircle2 size={12} color="var(--primary-glow)" />
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
