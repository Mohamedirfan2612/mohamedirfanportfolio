import React from 'react';
import { CORE_SERVICES } from '../data/portfolioData';
import { Layout, Server, Database, Cloud } from 'lucide-react';

const ICONS = { Layout, Server, Database, Cloud };

export default function WhatIDo() {
  return (
    <section id="services" className="section">
      <div className="container">
        
        <div className="section-header">
          <span className="section-label">What I Build</span>
          <h2 className="display-2">Engineering Capabilities</h2>
          <p>
            End-to-end ownership of product features — from database schema to polished user interface.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          {CORE_SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon] || Layout;
            return (
              <div key={s.id} className="card" style={{ padding: '28px 26px' }}>
                {/* Icon */}
                <div style={{
                  width: '44px', height: '44px', borderRadius: '10px',
                  background: 'rgba(37,99,235,0.12)', border: '1px solid rgba(37,99,235,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--blue-bright)', marginBottom: '18px'
                }}>
                  <Icon size={22} />
                </div>

                {/* Label */}
                <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h3 style={{ fontWeight: 700, fontSize: '1.1rem', color: '#fff' }}>{s.title}</h3>
                  <span className="tag tag-cyan" style={{ fontSize: '0.68rem' }}>{s.badge}</span>
                </div>

                {/* Desc */}
                <p style={{ color: 'var(--text-300)', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: '22px' }}>
                  {s.description}
                </p>

                {/* Skills */}
                <div style={{
                  paddingTop: '18px', borderTop: '1px solid var(--border-1)',
                  display: 'flex', flexWrap: 'wrap', gap: '6px'
                }}>
                  {s.skills.map((sk, si) => (
                    <span key={si} style={{
                      background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-1)',
                      padding: '3px 9px', borderRadius: '5px',
                      fontSize: '0.75rem', fontFamily: 'var(--font-code)', color: 'var(--text-300)'
                    }}>{sk}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
