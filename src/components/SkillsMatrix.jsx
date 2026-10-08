import React, { useState } from 'react';
import { SKILLS_DATA } from '../data/portfolioData';
import { Cpu, Layout, Server, Database, Cloud, Terminal, Shield, Check, Star } from 'lucide-react';

export default function SkillsMatrix() {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All Technologies' },
    { id: 'frontend', label: 'Frontend Stack' },
    { id: 'backend', label: 'Backend & APIs' },
    { id: 'database', label: 'Databases & Cache' },
    { id: 'devops', label: 'DevOps & Tools' }
  ];

  const getFilteredSkills = () => {
    if (activeTab === 'all') {
      return [
        { category: 'Frontend Ecosystem', skills: SKILLS_DATA.frontend },
        { category: 'Backend & APIs', skills: SKILLS_DATA.backend },
        { category: 'Databases & Cache', skills: SKILLS_DATA.database },
        { category: 'DevOps & Architecture', skills: SKILLS_DATA.devops }
      ];
    }
    return [{ category: tabs.find(t => t.id === activeTab)?.label, skills: SKILLS_DATA[activeTab] || [] }];
  };

  return (
    <section id="skills" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-neon" style={{ marginBottom: '14px' }}>
            <span>TECHNICAL PROFICIENCY</span>
          </div>
          <h2 className="neon-title text-gradient" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Skills & Tech Stack
          </h2>
          <p className="section-subtitle">
            A comprehensive matrix of modern frameworks, runtimes, databases, and DevOps utilities engineered into every application.
          </p>
        </div>

        {/* Tab Selection */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '44px'
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? 'linear-gradient(135deg, var(--primary) 0%, var(--primary-deep) 100%)' : 'rgba(255, 255, 255, 0.04)',
                color: activeTab === tab.id ? '#ffffff' : 'var(--text-secondary)',
                border: `1px solid ${activeTab === tab.id ? 'var(--primary-glow)' : 'var(--border-subtle)'}`,
                padding: '8px 18px',
                borderRadius: 'var(--radius-full)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: activeTab === tab.id ? '0 0 15px rgba(168, 85, 247, 0.4)' : 'none'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Categories Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {getFilteredSkills().map((section, sIdx) => (
            <div key={sIdx}>
              {activeTab === 'all' && (
                <h3
                  className="font-heading"
                  style={{
                    fontSize: '1.25rem',
                    color: 'var(--text-accent)',
                    marginBottom: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <Cpu size={18} color="var(--primary-glow)" />
                  <span>{section.category}</span>
                </h3>
              )}

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: '18px'
                }}
              >
                {section.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="glass-panel"
                    style={{
                      padding: '18px 20px',
                      background: 'rgba(14, 11, 24, 0.75)',
                      border: '1px solid var(--border-subtle)'
                    }}
                  >
                    {/* Top Row: Name & Badge */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '12px'
                      }}
                    >
                      <span
                        style={{
                          fontWeight: 700,
                          fontSize: '0.96rem',
                          color: '#ffffff',
                          fontFamily: 'var(--font-heading)'
                        }}
                      >
                        {skill.name}
                      </span>
                      <span className="badge-cyan" style={{ fontSize: '0.68rem', padding: '3px 8px' }}>
                        {skill.badge}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div
                      style={{
                        height: '6px',
                        width: '100%',
                        background: 'rgba(255, 255, 255, 0.08)',
                        borderRadius: 'var(--radius-full)',
                        overflow: 'hidden',
                        marginBottom: '10px',
                        position: 'relative'
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: `${skill.level}%`,
                          background: 'linear-gradient(90deg, var(--primary) 0%, var(--accent-cyan) 100%)',
                          borderRadius: 'var(--radius-full)',
                          boxShadow: '0 0 8px var(--primary-glow)'
                        }}
                      />
                    </div>

                    {/* Bottom Row: Proficiency & Experience */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '0.76rem',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--text-muted)'
                      }}
                    >
                      <span>Exp: {skill.experience}</span>
                      <span style={{ color: 'var(--primary-glow)', fontWeight: 600 }}>{skill.level}% Mastery</span>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
