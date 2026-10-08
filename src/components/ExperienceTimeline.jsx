import React from 'react';
import './ExperienceTimeline.css';

export default function ExperienceTimeline() {
  return (
    <section id="education" className="edu-section">
      <div id="timeline" style={{ position: 'absolute', top: 0 }} />
      <div className="edu-bg-glow" aria-hidden="true" />

      {/* Header bar matching "My Work" UI */}
      <div className="edu-header-bar">
        <div className="edu-title-group">
          <span className="edu-glowing-dot" />
          <h2 className="edu-main-title">
            Education & <span>Certifications</span>
          </h2>
        </div>

        <div className="edu-badge-hint">
          <span>Academic Degree & Professional Credentials</span>
        </div>
      </div>

      {/* 2-Column Alternating Showcase (Exact "My Work" Structure) */}
      <div className="edu-showcase-grid">

        {/* =========================================================
            CARD 01: Computer Science Engineering (Text Top / Visual Bottom)
            ========================================================= */}
        <article className="edu-card-column">
          {/* Text on Top */}
          <div className="edu-card-info">
            <div className="edu-card-header">
              <span className="edu-card-number">01</span>
              <div className="edu-card-meta">
                <h3 className="edu-card-title">Computer Science & Engineering</h3>
                <span className="edu-card-institution">Mailam Engineering College</span>
                <div>
                  <span className="edu-year-badge">Passout in 2024 · B.E. Degree</span>
                </div>
              </div>
            </div>

            <h4 className="edu-card-subhead">Core Disciplines & Foundation</h4>
            <p className="edu-card-desc">
              Comprehensive 4-year undergraduate curriculum rooted in computing fundamentals,
              software architecture, systems engineering, and scalable data management.
            </p>

            <div className="edu-tags-row">
              <span className="edu-tag-pill">Data Structures & Algorithms</span>
              <span className="edu-tag-pill">Object-Oriented Programming</span>
              <span className="edu-tag-pill">Database Management (DBMS)</span>
              <span className="edu-tag-pill">Operating Systems</span>
              <span className="edu-tag-pill">Computer Networks</span>
              <span className="edu-tag-pill">Software Engineering</span>
            </div>
          </div>

          {/* Visual Graphic on Bottom (Alternating Pattern) */}
          <div className="edu-card-visual">
            <svg viewBox="0 0 520 240" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="520" height="240" fill="#080e1c" />
              {/* Background blueprint grid */}
              <path d="M0 48h520M0 96h520M0 144h520M0 192h520" stroke="rgba(56,189,248,0.06)" strokeWidth="1"/>
              <path d="M65 0v240M130 0v240M195 0v240M260 0v240M325 0v240M390 0v240M455 0v240" stroke="rgba(56,189,248,0.06)" strokeWidth="1"/>

              {/* Header Title */}
              <text x="260" y="38" textAnchor="middle" fill="#ffffff" fontSize="19" fontWeight="800" fontFamily="sans-serif">Mailam Engineering College</text>
              <text x="260" y="56" textAnchor="middle" fill="#67e8f9" fontSize="9.5" fontFamily="monospace" letterSpacing="1.2">BACHELOR OF ENGINEERING · COMPUTER SCIENCE</text>

              {/* Central Engineering Graduation Crest */}
              <g transform="translate(260, 142)">
                <circle cx="0" cy="0" r="50" fill="url(#mecGlow)" opacity="0.6"/>

                {/* Academic Shield / Hexagon */}
                <polygon points="0,-42 36,-21 36,21 0,42 -36,21 -36,-21" stroke="#38bdf8" strokeWidth="1.8" fill="rgba(37,99,235,0.12)" />

                {/* Graduation Cap Icon */}
                <path d="M-22 -8 L0 -19 L22 -8 L0 3 Z" fill="#60a5fa" stroke="#e0f2fe" strokeWidth="1.2"/>
                <path d="M-14 -3 V10 C-14 16 14 16 14 10 V-3" fill="none" stroke="#60a5fa" strokeWidth="1.4"/>
                <path d="M22 -8 V8 L25 14" stroke="#fbbf24" strokeWidth="1.5"/>

                {/* Core Pillars Interconnect */}
                <circle cx="-28" cy="18" r="3.5" fill="#38bdf8" />
                <circle cx="28" cy="18" r="3.5" fill="#38bdf8" />
                <circle cx="0" cy="34" r="3.5" fill="#67e8f9" />
              </g>

              {/* Callout Badges */}
              <g transform="translate(62, 94)">
                <rect width="98" height="24" rx="12" fill="rgba(15,23,42,0.92)" stroke="rgba(56,189,248,0.4)" strokeWidth="1"/>
                <text x="49" y="16" textAnchor="middle" fill="#e0f2fe" fontSize="9.5" fontWeight="600" fontFamily="sans-serif">Class of 2024</text>
              </g>

              <g transform="translate(360, 94)">
                <rect width="98" height="24" rx="12" fill="rgba(15,23,42,0.92)" stroke="rgba(56,189,248,0.4)" strokeWidth="1"/>
                <text x="49" y="16" textAnchor="middle" fill="#e0f2fe" fontSize="9.5" fontWeight="600" fontFamily="sans-serif">B.E. Degree</text>
              </g>

              <g transform="translate(56, 172)">
                <rect width="112" height="24" rx="12" fill="rgba(15,23,42,0.92)" stroke="rgba(56,189,248,0.4)" strokeWidth="1"/>
                <text x="56" y="16" textAnchor="middle" fill="#e0f2fe" fontSize="9.5" fontWeight="600" fontFamily="sans-serif">CSE Department</text>
              </g>

              <g transform="translate(352, 172)">
                <rect width="112" height="24" rx="12" fill="rgba(15,23,42,0.92)" stroke="rgba(56,189,248,0.4)" strokeWidth="1"/>
                <text x="56" y="16" textAnchor="middle" fill="#e0f2fe" fontSize="9.5" fontWeight="600" fontFamily="sans-serif">Anna University</text>
              </g>

              <defs>
                <radialGradient id="mecGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.5"/>
                  <stop offset="100%" stopColor="#080e1c" stopOpacity="0"/>
                </radialGradient>
              </defs>
            </svg>
          </div>
        </article>


        {/* =========================================================
            CARD 02: Java Full Stack Development (Visual Top / Text Bottom)
            ========================================================= */}
        <article className="edu-card-column">
          {/* Visual Graphic on Top (Alternating Pattern) */}
          <div className="edu-card-visual">
            <svg viewBox="0 0 520 240" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="520" height="240" fill="#080c18" />
              {/* Background blueprint grid */}
              <path d="M0 48h520M0 96h520M0 144h520M0 192h520" stroke="rgba(59,130,246,0.06)" strokeWidth="1"/>
              <path d="M65 0v240M130 0v240M195 0v240M260 0v240M325 0v240M390 0v240M455 0v240" stroke="rgba(59,130,246,0.06)" strokeWidth="1"/>

              {/* Header Title */}
              <text x="260" y="38" textAnchor="middle" fill="#ffffff" fontSize="19" fontWeight="800" fontFamily="sans-serif">GUVI Geek Network</text>
              <text x="260" y="56" textAnchor="middle" fill="#60a5fa" fontSize="9.5" fontFamily="monospace" letterSpacing="1.2">JAVA FULL STACK DEVELOPMENT · IIT MADRAS INCUBATED</text>

              {/* Central Certification Crest */}
              <g transform="translate(260, 142)">
                <circle cx="0" cy="0" r="50" fill="url(#guviGlow)" opacity="0.6"/>

                {/* Hexagonal Pipeline */}
                <polygon points="0,-42 36,-21 36,21 0,42 -36,21 -36,-21" stroke="#2563eb" strokeWidth="1.8" fill="rgba(37,99,235,0.12)" />

                {/* Java Steam Cup & Tech Symbol */}
                <path d="M-10 6 C-10 16 10 16 10 6 Z" fill="#38bdf8"/>
                <path d="M10 9 C14 9 14 13 10 13" stroke="#38bdf8" strokeWidth="1.5" fill="none"/>
                <path d="M-6 -2 Q-3 -10 0 -14" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round"/>
                <path d="M2 -2 Q5 -10 8 -14" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round"/>

                {/* Verified Star Badge */}
                <circle cx="0" cy="-28" r="8" fill="#10b981" />
                <path d="M-3 -28 L-1 -26 L4 -31" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </g>

              {/* Callout Badges */}
              <g transform="translate(60, 94)">
                <rect width="102" height="24" rx="12" fill="rgba(15,23,42,0.92)" stroke="rgba(96,165,250,0.4)" strokeWidth="1"/>
                <text x="51" y="16" textAnchor="middle" fill="#dbeafe" fontSize="9.5" fontWeight="600" fontFamily="sans-serif">Completed 2025</text>
              </g>

              <g transform="translate(356, 94)">
                <rect width="102" height="24" rx="12" fill="rgba(15,23,42,0.92)" stroke="rgba(96,165,250,0.4)" strokeWidth="1"/>
                <text x="51" y="16" textAnchor="middle" fill="#dbeafe" fontSize="9.5" fontWeight="600" fontFamily="sans-serif">Full Stack Java</text>
              </g>

              <g transform="translate(56, 172)">
                <rect width="112" height="24" rx="12" fill="rgba(15,23,42,0.92)" stroke="rgba(96,165,250,0.4)" strokeWidth="1"/>
                <text x="56" y="16" textAnchor="middle" fill="#dbeafe" fontSize="9.5" fontWeight="600" fontFamily="sans-serif">IIT-M Incubated</text>
              </g>

              <g transform="translate(350, 172)">
                <rect width="114" height="24" rx="12" fill="rgba(15,23,42,0.92)" stroke="rgba(96,165,250,0.4)" strokeWidth="1"/>
                <text x="57" y="16" textAnchor="middle" fill="#dbeafe" fontSize="9.5" fontWeight="600" fontFamily="sans-serif">Verified Credential</text>
              </g>

              <defs>
                <radialGradient id="guviGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity="0.5"/>
                  <stop offset="100%" stopColor="#080c18" stopOpacity="0"/>
                </radialGradient>
              </defs>
            </svg>
          </div>

          {/* Text on Bottom */}
          <div className="edu-card-info">
            <div className="edu-card-header">
              <span className="edu-card-number">02</span>
              <div className="edu-card-meta">
                <h3 className="edu-card-title">Java Full Stack Development</h3>
                <span className="edu-card-institution">GUVI Geek Networks</span>
                <div>
                  <span className="edu-year-badge">Completed in 2025 · Professional Cert</span>
                </div>
              </div>
            </div>

            <h4 className="edu-card-subhead">Enterprise Stack & Mastery</h4>
            <p className="edu-card-desc">
              Comprehensive industry training covering enterprise backend microservices, Spring framework,
              RESTful architecture, and end-to-end full stack application delivery.
            </p>

            <div className="edu-tags-row">
              <span className="edu-tag-pill">Core Java</span>
              <span className="edu-tag-pill">Spring Boot</span>
              <span className="edu-tag-pill">Microservices</span>
              <span className="edu-tag-pill">Hibernate / JPA</span>
              <span className="edu-tag-pill">RESTful APIs</span>
              <span className="edu-tag-pill">React.js</span>
              <span className="edu-tag-pill">MySQL</span>
              <span className="edu-tag-pill">Docker & Git</span>
            </div>
          </div>
        </article>

      </div>
    </section>
  );
}
