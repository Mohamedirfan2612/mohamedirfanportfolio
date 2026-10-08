import React, { useState } from 'react';
import { PROJECTS_DATA } from '../data/portfolioData';
import ProjectModal from './ProjectModal';
import { ExternalLink, Eye, FolderOpen } from 'lucide-react';
import { GithubIcon } from './Icons';

const CATS = ['All', 'MERN', 'Full Stack', 'AI & Tools', 'Frontend & WebSockets', 'Backend & Cloud'];

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);

  const filtered = filter === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.category.toLowerCase().includes(filter.toLowerCase()));

  return (
    <section id="projects" className="section">
      <div className="container">

        <div className="section-header">
          <span className="section-label">Portfolio</span>
          <h2 className="display-2">Featured Projects</h2>
          <p>
            High-impact applications built with the MERN stack. Click any project to explore the architecture.
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '40px' }}>
          {CATS.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`btn ${filter === cat ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '7px 16px', fontSize: '0.82rem', fontWeight: 500 }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '20px'
        }}>
          {filtered.map(project => (
            <div
              key={project.id}
              className="card"
              style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
              onClick={() => setSelected(project)}
            >
              {/* Visual Header */}
              <div style={{
                height: '130px', borderRadius: 'var(--r-md)',
                background: project.imageTheme || 'linear-gradient(135deg,#4c1d95,#1e1b4b)',
                margin: '12px 12px 0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', overflow: 'hidden'
              }}>
                <FolderOpen size={32} color="rgba(255,255,255,0.5)" />
                <div style={{
                  position: 'absolute', bottom: '10px', left: '12px',
                  fontFamily: 'var(--font-code)', fontSize: '0.72rem',
                  color: 'rgba(255,255,255,0.6)', background: 'rgba(0,0,0,0.4)',
                  padding: '2px 8px', borderRadius: '4px'
                }}>
                  {project.badge}
                </div>
              </div>

              <div style={{ padding: '18px 20px 20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                {/* Meta */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span className="tag tag-blue">{project.category}</span>
                  <span style={{ fontSize: '0.73rem', color: 'var(--text-400)', fontFamily: 'var(--font-code)' }}>
                    {project.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 style={{ fontWeight: 700, fontSize: '1.05rem', color: '#fff', lineHeight: 1.35, marginBottom: '8px' }}>
                  {project.title}
                </h3>

                {/* Desc */}
                <p style={{
                  color: 'var(--text-300)', fontSize: '0.87rem', lineHeight: 1.6,
                  marginBottom: '16px', flexGrow: 1,
                  display: '-webkit-box', WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical', overflow: 'hidden'
                }}>
                  {project.description}
                </p>

                {/* Tech tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '16px' }}>
                  {project.tech.slice(0, 4).map((t, i) => (
                    <span key={i} style={{
                      background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-1)',
                      padding: '2px 8px', borderRadius: '4px',
                      fontSize: '0.72rem', fontFamily: 'var(--font-code)', color: 'var(--text-400)'
                    }}>{t}</span>
                  ))}
                  {project.tech.length > 4 && (
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-400)', padding: '2px 4px', fontFamily: 'var(--font-code)' }}>
                      +{project.tech.length - 4}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div
                  style={{ display: 'flex', gap: '8px' }}
                  onClick={e => e.stopPropagation()}
                >
                  <button
                    onClick={() => setSelected(project)}
                    className="btn btn-secondary"
                    style={{ flex: 1, fontSize: '0.82rem', padding: '8px 12px' }}
                  >
                    <Eye size={14} /> Details
                  </button>
                  <a
                    href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ flex: 1, fontSize: '0.82rem', padding: '8px 12px' }}
                  >
                    Demo <ExternalLink size={13} />
                  </a>
                  <a
                    href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                    className="btn btn-secondary"
                    style={{ padding: '8px 12px', minWidth: '36px' }}
                    title="GitHub"
                  >
                    <GithubIcon size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
