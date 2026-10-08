import React, { useState } from 'react';
import { PROJECTS_DATA } from '../data/portfolioData';
import ProjectModal from './ProjectModal';
import { ExternalLink, Eye, Sparkles, FolderGit2, Layers } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'MERN', 'Full Stack', 'AI & Tools', 'Frontend & WebSockets', 'Backend & Cloud'];

  const filteredProjects = activeCategory === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <section id="projects" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-neon" style={{ marginBottom: '14px' }}>
            <span>PORTFOLIO SHOWCASE</span>
          </div>
          <h2 className="neon-title text-gradient" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Featured Projects
          </h2>
          <p className="section-subtitle">
            Engineered with high performance, secure backends, and modern frontend design. Click on any project for technical breakdown.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '48px'
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                background: activeCategory === cat ? 'linear-gradient(135deg, var(--primary) 0%, var(--primary-deep) 100%)' : 'rgba(255, 255, 255, 0.04)',
                color: activeCategory === cat ? '#ffffff' : 'var(--text-secondary)',
                border: `1px solid ${activeCategory === cat ? 'var(--primary-glow)' : 'var(--border-subtle)'}`,
                padding: '8px 18px',
                borderRadius: 'var(--radius-full)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: activeCategory === cat ? '0 0 15px rgba(168, 85, 247, 0.4)' : 'none'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '30px'
          }}
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-panel"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '28px 24px',
                background: 'rgba(14, 11, 24, 0.8)',
                cursor: 'pointer'
              }}
              onClick={() => setSelectedProject(project)}
            >
              {/* Corner Cyber Decors */}
              <div className="cyber-corner-top-left"></div>
              <div className="cyber-corner-bottom-right"></div>

              <div>
                {/* Visual Header Banner */}
                <div
                  style={{
                    height: '140px',
                    borderRadius: 'var(--radius-sm)',
                    background: project.imageTheme || 'linear-gradient(135deg, #4c1d95 0%, #1e1b4b 100%)',
                    marginBottom: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    border: '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                >
                  <FolderGit2 size={36} color="var(--primary-glow)" style={{ marginBottom: '8px' }} />
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      color: '#ffffff',
                      background: 'rgba(0,0,0,0.5)',
                      padding: '3px 10px',
                      borderRadius: '4px'
                    }}
                  >
                    {project.badge}
                  </span>
                </div>

                {/* Badges */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span className="badge-cyan" style={{ fontSize: '0.7rem' }}>
                    {project.category}
                  </span>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    {project.tag}
                  </span>
                </div>

                {/* Project Title */}
                <h3
                  className="font-heading"
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    marginBottom: '10px',
                    lineHeight: 1.3
                  }}
                >
                  {project.title}
                </h3>

                {/* Short Description */}
                <p
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.88rem',
                    lineHeight: 1.6,
                    marginBottom: '20px',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {project.description}
                </p>
              </div>

              <div>
                {/* Tech Chips */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px',
                    marginBottom: '20px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                    paddingTop: '14px'
                  }}
                >
                  {project.tech.slice(0, 4).map((t, idx) => (
                    <span
                      key={idx}
                      style={{
                        background: 'rgba(168, 85, 247, 0.08)',
                        border: '1px solid rgba(168, 85, 247, 0.2)',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--text-accent)'
                      }}
                    >
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--text-muted)',
                        padding: '3px 6px'
                      }}
                    >
                      +{project.tech.length - 4} more
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '10px'
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="btn-cyber-secondary"
                    style={{
                      padding: '8px 14px',
                      fontSize: '0.78rem',
                      flex: 1
                    }}
                  >
                    <Eye size={14} />
                    <span>Details</span>
                  </button>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-cyber-primary"
                    style={{
                      padding: '8px 14px',
                      fontSize: '0.78rem',
                      flex: 1
                    }}
                  >
                    <span>Demo</span>
                    <ExternalLink size={14} />
                  </a>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                    title="GitHub Repository"
                  >
                    <GithubIcon size={16} />
                  </a>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
