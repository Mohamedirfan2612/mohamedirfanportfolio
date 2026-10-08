import React, { useEffect, useRef, useState } from 'react';
import './WhatIDo.css';

const CAPABILITIES = [
  {
    id: 'frontend',
    number: '01',
    title: 'Frontend Engineering',
    category: 'Modern UI & WebGL',
    badge: 'Interactive & Fast',
    subhead: 'Reactive User Experiences',
    desc: 'Building ultra-responsive, component-driven Single Page Applications and Progressive Web Apps with smooth micro-interactions, hardware-accelerated 3D graphics, and pixel-perfect design.',
    tags: ['React 18', 'Next.js', 'Redux Toolkit / Zustand', 'Vanilla CSS / Tailwind', 'Three.js / WebGL', 'Responsive Design'],
    visual: (
      <svg viewBox="0 0 520 250" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="520" height="250" fill="#080e1c" />
        {/* Blueprint grid */}
        <path d="M0 50h520M0 100h520M0 150h520M0 200h520" stroke="rgba(56,189,248,0.06)" strokeWidth="1"/>
        <path d="M65 0v250M130 0v250M195 0v250M260 0v250M325 0v250M390 0v250M455 0v250" stroke="rgba(56,189,248,0.06)" strokeWidth="1"/>

        <text x="260" y="38" textAnchor="middle" fill="#ffffff" fontSize="18" fontWeight="800" fontFamily="sans-serif">Frontend Architecture</text>
        <text x="260" y="56" textAnchor="middle" fill="#67e8f9" fontSize="9.5" fontFamily="monospace" letterSpacing="1.2">REACTIVE COMPONENT DOM & 60 FPS RENDERING</text>

        {/* Central DOM & Component Mesh */}
        <g transform="translate(260, 146)">
          <circle cx="0" cy="0" r="50" fill="url(#frontGlow)" opacity="0.65"/>

          {/* React Atomic Orbit */}
          <ellipse cx="0" cy="0" rx="40" ry="15" stroke="#38bdf8" strokeWidth="1.5" />
          <ellipse cx="0" cy="0" rx="40" ry="15" stroke="#38bdf8" strokeWidth="1.5" transform="rotate(60)" />
          <ellipse cx="0" cy="0" rx="40" ry="15" stroke="#38bdf8" strokeWidth="1.5" transform="rotate(120)" />
          <circle cx="0" cy="0" r="6" fill="#38bdf8" />
        </g>

        {/* Badges */}
        <g transform="translate(62, 98)">
          <rect width="98" height="24" rx="12" fill="rgba(15,23,42,0.92)" stroke="rgba(56,189,248,0.4)" strokeWidth="1"/>
          <text x="49" y="16" textAnchor="middle" fill="#e0f2fe" fontSize="9.5" fontWeight="600">Virtual DOM</text>
        </g>
        <g transform="translate(360, 98)">
          <rect width="98" height="24" rx="12" fill="rgba(15,23,42,0.92)" stroke="rgba(56,189,248,0.4)" strokeWidth="1"/>
          <text x="49" y="16" textAnchor="middle" fill="#e0f2fe" fontSize="9.5" fontWeight="600">WebGL 3D</text>
        </g>
        <g transform="translate(56, 178)">
          <rect width="110" height="24" rx="12" fill="rgba(15,23,42,0.92)" stroke="rgba(56,189,248,0.4)" strokeWidth="1"/>
          <text x="55" y="16" textAnchor="middle" fill="#e0f2fe" fontSize="9.5" fontWeight="600">State Machines</text>
        </g>
        <g transform="translate(354, 178)">
          <rect width="110" height="24" rx="12" fill="rgba(15,23,42,0.92)" stroke="rgba(56,189,248,0.4)" strokeWidth="1"/>
          <text x="55" y="16" textAnchor="middle" fill="#e0f2fe" fontSize="9.5" fontWeight="600">60 FPS Smooth</text>
        </g>

        <defs>
          <radialGradient id="frontGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#080e1c" stopOpacity="0"/>
          </radialGradient>
        </defs>
      </svg>
    )
  },
  {
    id: 'backend',
    number: '02',
    title: 'Backend & API Architecture',
    category: 'Distributed Systems',
    badge: 'Scalable & Robust',
    subhead: 'High-Concurrency Server Design',
    desc: 'Architecting enterprise-grade REST and GraphQL APIs, real-time event streaming with Socket.io, production authentication flows (JWT/OAuth), and resilient microservice pipelines.',
    tags: ['Node.js', 'Express.js', 'REST APIs', 'Socket.io', 'GraphQL', 'JWT & OAuth2'],
    visual: (
      <svg viewBox="0 0 520 250" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="520" height="250" fill="#080c18" />
        <path d="M0 50h520M0 100h520M0 150h520M0 200h520" stroke="rgba(59,130,246,0.06)" strokeWidth="1"/>
        <path d="M65 0v250M130 0v250M195 0v250M260 0v250M325 0v250M390 0v250M455 0v250" stroke="rgba(59,130,246,0.06)" strokeWidth="1"/>

        <text x="260" y="38" textAnchor="middle" fill="#ffffff" fontSize="18" fontWeight="800" fontFamily="sans-serif">Backend & API Gateway</text>
        <text x="260" y="56" textAnchor="middle" fill="#60a5fa" fontSize="9.5" fontFamily="monospace" letterSpacing="1.2">ENTERPRISE REST, GRAPHQL & WEBSOCKET PIPELINES</text>

        {/* Microservices Routing Diagram */}
        <g transform="translate(260, 146)">
          <circle cx="0" cy="0" r="50" fill="url(#backGlow)" opacity="0.6"/>

          <line x1="-105" y1="0" x2="-40" y2="0" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3 3"/>
          <line x1="40" y1="0" x2="105" y2="0" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3 3"/>

          {/* Gateway Router */}
          <rect x="-38" y="-22" width="76" height="44" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.8"/>
          <text x="0" y="-3" textAnchor="middle" fill="#ffffff" fontSize="9.5" fontWeight="700">API Gateway</text>
          <text x="0" y="11" textAnchor="middle" fill="#38bdf8" fontSize="8" fontWeight="600">JWT Auth</text>

          {/* Left Client */}
          <rect x="-136" y="-16" width="38" height="32" rx="6" fill="#0f172a" stroke="#60a5fa" strokeWidth="1.2"/>
          <text x="-117" y="4" textAnchor="middle" fill="#60a5fa" fontSize="8" fontWeight="700">Client</text>

          {/* Right Service */}
          <rect x="98" y="-16" width="38" height="32" rx="6" fill="#0f172a" stroke="#22c55e" strokeWidth="1.2"/>
          <text x="117" y="4" textAnchor="middle" fill="#22c55e" fontSize="8" fontWeight="700">Sockets</text>
        </g>

        {/* Badges */}
        <g transform="translate(62, 98)">
          <rect width="98" height="24" rx="12" fill="rgba(15,23,42,0.92)" stroke="rgba(96,165,250,0.4)" strokeWidth="1"/>
          <text x="49" y="16" textAnchor="middle" fill="#dbeafe" fontSize="9.5" fontWeight="600">RESTful APIs</text>
        </g>
        <g transform="translate(360, 98)">
          <rect width="98" height="24" rx="12" fill="rgba(15,23,42,0.92)" stroke="rgba(96,165,250,0.4)" strokeWidth="1"/>
          <text x="49" y="16" textAnchor="middle" fill="#dbeafe" fontSize="9.5" fontWeight="600">Socket.io Live</text>
        </g>
        <g transform="translate(56, 178)">
          <rect width="110" height="24" rx="12" fill="rgba(15,23,42,0.92)" stroke="rgba(96,165,250,0.4)" strokeWidth="1"/>
          <text x="55" y="16" textAnchor="middle" fill="#dbeafe" fontSize="9.5" fontWeight="600">JWT & OAuth</text>
        </g>
        <g transform="translate(354, 178)">
          <rect width="110" height="24" rx="12" fill="rgba(15,23,42,0.92)" stroke="rgba(96,165,250,0.4)" strokeWidth="1"/>
          <text x="55" y="16" textAnchor="middle" fill="#dbeafe" fontSize="9.5" fontWeight="600">Microservices</text>
        </g>

        <defs>
          <radialGradient id="backGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#080c18" stopOpacity="0"/>
          </radialGradient>
        </defs>
      </svg>
    )
  },
  {
    id: 'database',
    number: '03',
    title: 'Database & Cloud Storage',
    category: 'NoSQL & Relational',
    badge: 'High Performance',
    subhead: 'Data Modeling & Memory Caching',
    desc: 'Designing high-throughput schema architectures, complex MongoDB aggregation pipelines, Redis distributed RAM caching, relational PostgreSQL databases, and automated cloud backups.',
    tags: ['MongoDB', 'Mongoose', 'Redis Caching', 'PostgreSQL', 'AWS S3 / GridFS', 'Data Modeling'],
    visual: (
      <svg viewBox="0 0 520 250" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="520" height="250" fill="#080e1c" />
        <path d="M0 50h520M0 100h520M0 150h520M0 200h520" stroke="rgba(56,189,248,0.06)" strokeWidth="1"/>
        <path d="M65 0v250M130 0v250M195 0v250M260 0v250M325 0v250M390 0v250M455 0v250" stroke="rgba(56,189,248,0.06)" strokeWidth="1"/>

        <text x="260" y="38" textAnchor="middle" fill="#ffffff" fontSize="18" fontWeight="800" fontFamily="sans-serif">Data Clusters & Storage</text>
        <text x="260" y="56" textAnchor="middle" fill="#38bdf8" fontSize="9.5" fontFamily="monospace" letterSpacing="1.2">DISTRIBUTED MONGODB & REDIS CACHING TOPOLOGY</text>

        {/* Database Cluster Cylinder Stack */}
        <g transform="translate(260, 146)">
          <circle cx="0" cy="0" r="50" fill="url(#dbGlow)" opacity="0.6"/>

          {/* Database Cylinder Stack */}
          <ellipse cx="0" cy="-22" rx="36" ry="12" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.6"/>
          <path d="M-36 -22 V-6 A36 12 0 0 0 36 -6 V-22" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.6"/>
          <path d="M-36 -6 V10 A36 12 0 0 0 36 10 V-6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.6"/>
          <path d="M-36 10 V26 A36 12 0 0 0 36 26 V10" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.6"/>
          <circle cx="0" cy="10" r="3" fill="#22c55e" />
        </g>

        {/* Badges */}
        <g transform="translate(62, 98)">
          <rect width="98" height="24" rx="12" fill="rgba(15,23,42,0.92)" stroke="rgba(56,189,248,0.4)" strokeWidth="1"/>
          <text x="49" y="16" textAnchor="middle" fill="#e0f2fe" fontSize="9.5" fontWeight="600">MongoDB Agg</text>
        </g>
        <g transform="translate(360, 98)">
          <rect width="98" height="24" rx="12" fill="rgba(15,23,42,0.92)" stroke="rgba(56,189,248,0.4)" strokeWidth="1"/>
          <text x="49" y="16" textAnchor="middle" fill="#e0f2fe" fontSize="9.5" fontWeight="600">Redis RAM</text>
        </g>
        <g transform="translate(56, 178)">
          <rect width="110" height="24" rx="12" fill="rgba(15,23,42,0.92)" stroke="rgba(56,189,248,0.4)" strokeWidth="1"/>
          <text x="55" y="16" textAnchor="middle" fill="#e0f2fe" fontSize="9.5" fontWeight="600">ACID Compliance</text>
        </g>
        <g transform="translate(354, 178)">
          <rect width="110" height="24" rx="12" fill="rgba(15,23,42,0.92)" stroke="rgba(56,189,248,0.4)" strokeWidth="1"/>
          <text x="55" y="16" textAnchor="middle" fill="#e0f2fe" fontSize="9.5" fontWeight="600">AWS S3 Vault</text>
        </g>

        <defs>
          <radialGradient id="dbGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#080e1c" stopOpacity="0"/>
          </radialGradient>
        </defs>
      </svg>
    )
  },
  {
    id: 'devops',
    number: '04',
    title: 'DevOps & Deployment',
    category: 'Cloud Infrastructure',
    badge: 'Zero Downtime',
    subhead: 'Automated CI/CD & Production Hosting',
    desc: 'Containerizing microservices using Docker, establishing automated GitHub Actions CI/CD workflows, NGINX reverse proxies, SSL security, and scalable cloud hosting across AWS, Vercel, and Render.',
    tags: ['Docker', 'Git / GitHub Actions', 'AWS (EC2, S3)', 'NGINX', 'Linux / Bash', 'CI/CD Pipelines'],
    visual: (
      <svg viewBox="0 0 520 250" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="520" height="250" fill="#080c18" />
        <path d="M0 50h520M0 100h520M0 150h520M0 200h520" stroke="rgba(59,130,246,0.06)" strokeWidth="1"/>
        <path d="M65 0v250M130 0v250M195 0v250M260 0v250M325 0v250M390 0v250M455 0v250" stroke="rgba(59,130,246,0.06)" strokeWidth="1"/>

        <text x="260" y="38" textAnchor="middle" fill="#ffffff" fontSize="18" fontWeight="800" fontFamily="sans-serif">Cloud Deployment & CI/CD</text>
        <text x="260" y="56" textAnchor="middle" fill="#60a5fa" fontSize="9.5" fontFamily="monospace" letterSpacing="1.2">AUTOMATED CONTAINERS & ZERO-DOWNTIME INFRASTRUCTURE</text>

        {/* CI/CD Container Pipeline */}
        <g transform="translate(260, 146)">
          <circle cx="0" cy="0" r="50" fill="url(#devGlow)" opacity="0.6"/>

          {/* Pipeline line */}
          <line x1="-125" y1="0" x2="125" y2="0" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4"/>

          {/* Stage 1: Git */}
          <rect x="-136" y="-18" width="38" height="36" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5"/>
          <text x="-117" y="4" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="700">Git</text>

          {/* Stage 2: Docker Build */}
          <rect x="-44" y="-18" width="38" height="36" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5"/>
          <text x="-25" y="4" textAnchor="middle" fill="#38bdf8" fontSize="7.5" fontWeight="700">Docker</text>

          {/* Stage 3: Deploy AWS / NGINX */}
          <rect x="48" y="-18" width="38" height="36" rx="8" fill="#1e293b" stroke="#22c55e" strokeWidth="1.5"/>
          <text x="67" y="4" textAnchor="middle" fill="#22c55e" fontSize="8" fontWeight="700">AWS</text>
        </g>

        {/* Badges */}
        <g transform="translate(62, 98)">
          <rect width="98" height="24" rx="12" fill="rgba(15,23,42,0.92)" stroke="rgba(96,165,250,0.4)" strokeWidth="1"/>
          <text x="49" y="16" textAnchor="middle" fill="#dbeafe" fontSize="9.5" fontWeight="600">Dockerized</text>
        </g>
        <g transform="translate(360, 98)">
          <rect width="98" height="24" rx="12" fill="rgba(15,23,42,0.92)" stroke="rgba(96,165,250,0.4)" strokeWidth="1"/>
          <text x="49" y="16" textAnchor="middle" fill="#dbeafe" fontSize="9.5" fontWeight="600">Auto CI/CD</text>
        </g>
        <g transform="translate(56, 178)">
          <rect width="110" height="24" rx="12" fill="rgba(15,23,42,0.92)" stroke="rgba(96,165,250,0.4)" strokeWidth="1"/>
          <text x="55" y="16" textAnchor="middle" fill="#dbeafe" fontSize="9.5" fontWeight="600">NGINX Proxy</text>
        </g>
        <g transform="translate(354, 178)">
          <rect width="110" height="24" rx="12" fill="rgba(15,23,42,0.92)" stroke="rgba(96,165,250,0.4)" strokeWidth="1"/>
          <text x="55" y="16" textAnchor="middle" fill="#dbeafe" fontSize="9.5" fontWeight="600">99.9% Uptime</text>
        </g>

        <defs>
          <radialGradient id="devGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#080c18" stopOpacity="0"/>
          </radialGradient>
        </defs>
      </svg>
    )
  }
];

export default function WhatIDo() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeStackIndex, setActiveStackIndex] = useState(1);

  // Smooth Stacking Parallax: scale down and dim earlier cards as newer cards stack over them
  useEffect(() => {
    let animFrame = null;

    const handleScroll = () => {
      if (window.innerWidth <= 900) return; // Keep clean stack on mobile

      const totalCards = CAPABILITIES.length;
      let topVisibleIndex = 1;

      for (let i = 0; i < totalCards; i++) {
        const currentCard = cardRefs.current[i];
        const nextCard = cardRefs.current[i + 1];

        if (!currentCard) continue;

        if (nextCard) {
          const nextRect = nextCard.getBoundingClientRect();
          const targetTop = 130 + (i + 1) * 32;

          // How close the next card is to stacking over this card (0 to 1)
          const distanceToStick = nextRect.top - targetTop;
          const overlapFactor = Math.max(0, Math.min(1, 1 - distanceToStick / 320));

          // Physical depth scaling: current card shrinks slightly, dims, and gains shadow
          const scale = 1 - overlapFactor * 0.055;
          const brightness = 1 - overlapFactor * 0.35;
          const translateY = overlapFactor * -12;

          currentCard.style.transform = `scale(${scale.toFixed(4)}) translateY(${translateY.toFixed(2)}px)`;
          currentCard.style.filter = `brightness(${brightness.toFixed(3)})`;
          currentCard.style.opacity = `${(1 - overlapFactor * 0.12).toFixed(3)}`;

          if (distanceToStick <= 20) {
            topVisibleIndex = i + 2;
          }
        } else {
          // The last card stays full scale
          currentCard.style.transform = 'scale(1) translateY(0px)';
          currentCard.style.filter = 'brightness(1)';
          currentCard.style.opacity = '1';
        }
      }

      setActiveStackIndex(Math.min(4, topVisibleIndex));
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
    <section id="services" ref={sectionRef} className="capabilities-parallax-section">
      {/* Background Ambient Glows */}
      <div className="capabilities-stack-glow-1" aria-hidden="true" />
      <div className="capabilities-stack-glow-2" aria-hidden="true" />

      {/* Header bar matching "My Work" UI with Sticky Deck Indicator */}
      <div className="capabilities-header-bar">
        <div className="capabilities-title-group">
          <span className="capabilities-glowing-dot" />
          <h2 className="capabilities-main-title">
            Engineering <span>Capabilities</span>
          </h2>
        </div>

        <div className="capabilities-badge-hint">
          <span className="capabilities-deck-counter">0{activeStackIndex} / 04</span>
          <span>Sticky Parallax Deck</span>
        </div>
      </div>

      {/* Sticky Stacking Deck Wrapper */}
      <div className="capabilities-stack-deck">
        {CAPABILITIES.map((card, index) => (
          <div
            key={card.id}
            className="capabilities-deck-slot"
            style={{
              '--stack-idx': index,
              zIndex: index + 1,
            }}
          >
            <article
              ref={(el) => (cardRefs.current[index] = el)}
              className="capabilities-deck-card"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Card Content (Text, Metadata, Skills) */}
              <div className="capabilities-deck-content">
                <div className="capabilities-deck-card-top">
                  <span className="capabilities-deck-number">{card.number}</span>
                  <div className="capabilities-deck-meta">
                    <span className="capabilities-badge-tag">{card.badge}</span>
                    <h3 className="capabilities-deck-card-title">{card.title}</h3>
                    <span className="capabilities-deck-category">{card.category}</span>
                  </div>
                </div>

                <h4 className="capabilities-deck-subhead">{card.subhead}</h4>
                <p className="capabilities-deck-desc">{card.desc}</p>

                <div className="capabilities-tags-row">
                  {card.tags.map((tag) => (
                    <span key={tag} className="capabilities-tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* High-Tech Architectural Vector Visual */}
              <div className="capabilities-deck-visual">
                {card.visual}
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
