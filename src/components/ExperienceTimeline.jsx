import React, { useEffect, useRef, useState } from 'react';
import './ExperienceTimeline.css';

const EDUCATION_DATA = [
  {
    id: 'mec',
    number: '01',
    title: 'Computer Science & Engineering',
    institution: 'Mailam Engineering College',
    badge: 'Class of 2024 · B.E. Degree',
    subhead: 'Core Computing Fundamentals & Systems Engineering',
    desc: 'Comprehensive 4-year undergraduate curriculum rooted in computing fundamentals, software architecture, operating systems, and scalable data management with distinction.',
    tags: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming',
      'Database Management (DBMS)',
      'Operating Systems',
      'Computer Networks',
      'Software Engineering'
    ],
    visual: (
      <svg viewBox="0 0 520 250" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="520" height="250" fill="#080e1c" />
        {/* Background blueprint grid */}
        <path d="M0 50h520M0 100h520M0 150h520M0 200h520" stroke="rgba(56,189,248,0.06)" strokeWidth="1"/>
        <path d="M65 0v250M130 0v250M195 0v250M260 0v250M325 0v250M390 0v250M455 0v250" stroke="rgba(56,189,248,0.06)" strokeWidth="1"/>

        {/* Header Title */}
        <text x="260" y="38" textAnchor="middle" fill="#ffffff" fontSize="19" fontWeight="800" fontFamily="sans-serif">Mailam Engineering College</text>
        <text x="260" y="56" textAnchor="middle" fill="#67e8f9" fontSize="9.5" fontFamily="monospace" letterSpacing="1.2">BACHELOR OF ENGINEERING · COMPUTER SCIENCE</text>

        {/* Central Engineering Graduation Crest */}
        <g transform="translate(260, 146)">
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
        <g transform="translate(62, 98)">
          <rect width="98" height="24" rx="12" fill="rgba(15,23,42,0.92)" stroke="rgba(56,189,248,0.4)" strokeWidth="1"/>
          <text x="49" y="16" textAnchor="middle" fill="#e0f2fe" fontSize="9.5" fontWeight="600" fontFamily="sans-serif">Class of 2024</text>
        </g>

        <g transform="translate(360, 98)">
          <rect width="98" height="24" rx="12" fill="rgba(15,23,42,0.92)" stroke="rgba(56,189,248,0.4)" strokeWidth="1"/>
          <text x="49" y="16" textAnchor="middle" fill="#e0f2fe" fontSize="9.5" fontWeight="600" fontFamily="sans-serif">B.E. Degree</text>
        </g>

        <g transform="translate(56, 178)">
          <rect width="112" height="24" rx="12" fill="rgba(15,23,42,0.92)" stroke="rgba(56,189,248,0.4)" strokeWidth="1"/>
          <text x="56" y="16" textAnchor="middle" fill="#e0f2fe" fontSize="9.5" fontWeight="600" fontFamily="sans-serif">CSE Department</text>
        </g>

        <g transform="translate(352, 178)">
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
    )
  },
  {
    id: 'guvi',
    number: '02',
    title: 'Java Full Stack Development',
    institution: 'GUVI Geek Network (IIT Madras Incubated)',
    badge: 'Completed in 2025 · Professional Cert',
    subhead: 'Enterprise Backend Microservices & React Integration',
    desc: 'Intensive professional engineering certification program focused on enterprise Spring Boot architecture, REST APIs, JPA/Hibernate, distributed relational databases, and modern full-stack workflows.',
    tags: [
      'Core Java',
      'Spring Boot',
      'Microservices',
      'Hibernate / JPA',
      'RESTful APIs',
      'React.js',
      'MySQL',
      'Docker & Git'
    ],
    visual: (
      <svg viewBox="0 0 520 250" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="520" height="250" fill="#080c18" />
        {/* Background blueprint grid */}
        <path d="M0 50h520M0 100h520M0 150h520M0 200h520" stroke="rgba(59,130,246,0.06)" strokeWidth="1"/>
        <path d="M65 0v250M130 0v250M195 0v250M260 0v250M325 0v250M390 0v250M455 0v250" stroke="rgba(59,130,246,0.06)" strokeWidth="1"/>

        {/* Header Title */}
        <text x="260" y="38" textAnchor="middle" fill="#ffffff" fontSize="19" fontWeight="800" fontFamily="sans-serif">GUVI Geek Network</text>
        <text x="260" y="56" textAnchor="middle" fill="#60a5fa" fontSize="9.5" fontFamily="monospace" letterSpacing="1.2">JAVA FULL STACK DEVELOPMENT · IIT MADRAS INCUBATED</text>

        {/* Central Certification Crest */}
        <g transform="translate(260, 146)">
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
        <g transform="translate(60, 98)">
          <rect width="102" height="24" rx="12" fill="rgba(15,23,42,0.92)" stroke="rgba(96,165,250,0.4)" strokeWidth="1"/>
          <text x="51" y="16" textAnchor="middle" fill="#dbeafe" fontSize="9.5" fontWeight="600" fontFamily="sans-serif">Completed 2025</text>
        </g>

        <g transform="translate(356, 98)">
          <rect width="102" height="24" rx="12" fill="rgba(15,23,42,0.92)" stroke="rgba(96,165,250,0.4)" strokeWidth="1"/>
          <text x="51" y="16" textAnchor="middle" fill="#dbeafe" fontSize="9.5" fontWeight="600" fontFamily="sans-serif">Full Stack Java</text>
        </g>

        <g transform="translate(56, 178)">
          <rect width="112" height="24" rx="12" fill="rgba(15,23,42,0.92)" stroke="rgba(96,165,250,0.4)" strokeWidth="1"/>
          <text x="56" y="16" textAnchor="middle" fill="#dbeafe" fontSize="9.5" fontWeight="600" fontFamily="sans-serif">IIT-M Incubated</text>
        </g>

        <g transform="translate(350, 178)">
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
    )
  }
];

export default function ExperienceTimeline() {
  const cardRefs = useRef([]);
  const [activeStackIndex, setActiveStackIndex] = useState(1);

  // Smooth Stacking Parallax: scale down and dim earlier card as next card stacks over it
  useEffect(() => {
    let animFrame = null;

    const handleScroll = () => {
      const isMobile = window.innerWidth <= 900;
      const baseTop = isMobile ? 75 : 115;
      const stepTop = isMobile ? 18 : 28;
      const triggerDist = isMobile ? 220 : 320;

      const currentCard = cardRefs.current[0];
      const nextCard = cardRefs.current[1];

      if (!currentCard || !nextCard) return;

      const nextRect = nextCard.getBoundingClientRect();
      const targetTop = baseTop + stepTop;

      // Distance remaining until nextCard sticks over currentCard
      const distanceToStick = nextRect.top - targetTop;
      const overlapFactor = Math.max(0, Math.min(1, 1 - distanceToStick / triggerDist));

      const scale = 1 - overlapFactor * (isMobile ? 0.045 : 0.055);
      const brightness = 1 - overlapFactor * (isMobile ? 0.28 : 0.35);
      const translateY = overlapFactor * (isMobile ? -8 : -12);

      currentCard.style.transform = `scale(${scale.toFixed(4)}) translateY(${translateY.toFixed(2)}px)`;
      currentCard.style.filter = `brightness(${brightness.toFixed(3)})`;
      currentCard.style.opacity = `${(1 - overlapFactor * 0.12).toFixed(3)}`;

      if (distanceToStick <= 20) {
        setActiveStackIndex(2);
      } else {
        setActiveStackIndex(1);
      }
    };

    const onScroll = () => {
      if (animFrame) cancelAnimationFrame(animFrame);
      animFrame = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (animFrame) cancelAnimationFrame(animFrame);
    };
  }, []);

  // 3D Card Perspective Tilt and Cursor Spotlight
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = ((y - centerY) / centerY) * -3.5;
    const tiltY = ((x - centerX) / centerX) * 3.5;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
    card.style.setProperty('--card-tilt-x', `${tiltX.toFixed(2)}deg`);
    card.style.setProperty('--card-tilt-y', `${tiltY.toFixed(2)}deg`);
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.setProperty('--card-tilt-x', '0deg');
    card.style.setProperty('--card-tilt-y', '0deg');
  };

  return (
    <section id="education" className="edu-parallax-section">
      <div id="timeline" style={{ position: 'absolute', top: 0 }} />

      {/* Ambient Radial Glows */}
      <div className="edu-stack-glow-1" aria-hidden="true" />
      <div className="edu-stack-glow-2" aria-hidden="true" />

      {/* Header Bar matching "My Work" UI with Live Stack Counter */}
      <div className="edu-header-bar">
        <div className="edu-title-group">
          <span className="edu-glowing-dot" />
          <h2 className="edu-main-title">
            Education & <span>Certifications</span>
          </h2>
        </div>

        <div className="edu-badge-hint">
          <span className="edu-deck-counter">0{activeStackIndex} / 02</span>
          <span>Sticky Parallax Deck</span>
        </div>
      </div>

      {/* Sticky Stacking Deck Wrapper */}
      <div className="edu-stack-deck">
        {EDUCATION_DATA.map((item, index) => (
          <div
            key={item.id}
            className="edu-deck-slot"
            style={{
              '--stack-idx': index,
              zIndex: index + 1,
            }}
          >
            <article
              ref={(el) => (cardRefs.current[index] = el)}
              className="edu-deck-card"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Left Content (Degree, Institution, Subhead, Description, Skills) */}
              <div className="edu-deck-content">
                <div className="edu-deck-card-top">
                  <span className="edu-deck-number">{item.number}</span>
                  <div className="edu-deck-meta">
                    <span className="edu-year-badge">{item.badge}</span>
                    <h3 className="edu-deck-card-title">{item.title}</h3>
                    <span className="edu-deck-institution">{item.institution}</span>
                  </div>
                </div>

                <h4 className="edu-deck-subhead">{item.subhead}</h4>
                <p className="edu-deck-desc">{item.desc}</p>

                <div className="edu-tags-row">
                  {item.tags.map((tag) => (
                    <span key={tag} className="edu-tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Architectural Vector Visual */}
              <div className="edu-deck-visual">
                {item.visual}
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
