import React, { useState } from 'react';
import { SKILLS_DATA } from '../data/portfolioData';

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'database', label: 'Database' },
  { id: 'devops', label: 'DevOps' },
];

const CATEGORY_LABELS = {
  frontend: 'Frontend Ecosystem',
  backend: 'Backend & APIs',
  database: 'Databases & Cache',
  devops: 'DevOps & Tools',
};

export default function SkillsMatrix() {
  const [tab, setTab] = useState('all');

  const sections = tab === 'all'
    ? Object.entries(SKILLS_DATA).map(([k, v]) => ({ key: k, label: CATEGORY_LABELS[k], skills: v }))
    : [{ key: tab, label: CATEGORY_LABELS[tab], skills: SKILLS_DATA[tab] || [] }];

  return (
    <section id="skills" className="section">
      <div className="container">

        <div className="section-header">
          <span className="section-label">Skills</span>
          <h2 className="display-2">Tech Proficiency</h2>
          <p>A comprehensive stack across modern web development, APIs, cloud infrastructure, and beyond.</p>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '40px' }}>
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`btn ${tab === t.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '7px 18px', fontSize: '0.85rem' }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {sections.map(sec => (
          <div key={sec.key} style={{ marginBottom: tab === 'all' ? '44px' : 0 }}>
            {tab === 'all' && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px'
              }}>
                <span style={{ fontWeight: 600, color: '#fff', fontSize: '1rem' }}>{sec.label}</span>
                <div style={{ flex: 1, height: '1px', background: 'var(--border-1)' }} />
                <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.75rem', color: 'var(--text-400)' }}>
                  {sec.skills.length} technologies
                </span>
              </div>
            )}

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '12px'
            }}>
              {sec.skills.map((skill, i) => (
                <div
                  key={i}
                  className="card"
                  style={{ padding: '16px 18px', cursor: 'default' }}
                >
                  {/* Top row: name + badge */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.92rem', color: '#fff' }}>
                      {skill.name}
                    </span>
                    <span className="tag tag-cyan" style={{ fontSize: '0.65rem', padding: '2px 7px' }}>
                      {skill.badge}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="progress-bar" style={{ marginBottom: '8px' }}>
                    <div
                      className="progress-fill"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>

                  {/* Bottom row: exp + level */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.73rem', fontFamily: 'var(--font-code)', color: 'var(--text-400)' }}>
                    <span>{skill.experience}</span>
                    <span style={{ color: 'var(--blue-light)', fontWeight: 600 }}>{skill.level}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}
