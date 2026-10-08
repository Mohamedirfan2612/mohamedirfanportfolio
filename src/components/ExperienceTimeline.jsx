import React from 'react';
import { TIMELINE_DATA } from '../data/portfolioData';

export default function ExperienceTimeline() {
  return (
    <section id="timeline" className="section">
      <div className="container">

        <div className="section-header">
          <span className="section-label">Career</span>
          <h2 className="display-2">Experience & Growth</h2>
          <p>A focused progression from foundations to leading full-stack engineering projects.</p>
        </div>

        <div style={{ maxWidth: '780px', position: 'relative', paddingLeft: '44px' }}>
          {/* Spine */}
          <div className="timeline-line" />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {TIMELINE_DATA.map((item, i) => (
              <div key={item.year} style={{ position: 'relative' }}>
                {/* Dot */}
                <div className={`timeline-dot ${i === 0 ? 'active' : ''}`} />

                {/* Card */}
                <div className="card" style={{ padding: '24px 22px' }}>
                  
                  {/* Header row */}
                  <div style={{
                    display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start',
                    justifyContent: 'space-between', gap: '10px', marginBottom: '10px'
                  }}>
                    <div>
                      <span className={`tag ${i === 0 ? 'tag-blue' : 'tag-cyan'}`} style={{ marginBottom: '8px' }}>
                        {item.year} · {item.status}
                      </span>
                      <h3 style={{ fontWeight: 700, fontSize: '1.1rem', color: '#fff', lineHeight: 1.3 }}>
                        {item.role}
                      </h3>
                    </div>
                    <span style={{
                      fontFamily: 'var(--font-code)', fontSize: '0.8rem', color: 'var(--text-300)',
                      background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-1)',
                      padding: '4px 12px', borderRadius: '6px', flexShrink: 0
                    }}>
                      {item.company}
                    </span>
                  </div>

                  <p style={{ color: 'var(--text-300)', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: '14px' }}>
                    {item.description}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {item.highlights.map((h, hi) => (
                      <div key={hi} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--blue-light)', flexShrink: 0 }} />
                        <span style={{ color: 'var(--text-300)' }}>{h}</span>
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
