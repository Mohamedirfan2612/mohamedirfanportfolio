import React, { useState } from 'react';
import './TechStackGrid.css';

// =========================================================================
// TECH STACK DATA (Structured into tiered inverted-pyramid rows)
// =========================================================================
const STACK_ROWS = [
  // --- ROW 1 (Core Web & Frontend Ecosystem - 8 items) ---
  [
    {
      id: 'javascript',
      name: 'JavaScript',
      badge: 'Core',
      color: '#f7df1e',
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#f7df1e" />
          <path
            d="M6.2 18.2c.8.5 1.8.8 2.8.8 2.2 0 3.5-1.2 3.5-3.3V9.5h-2.4v6.2c0 1-.5 1.5-1.5 1.5-.6 0-1.1-.2-1.5-.5l-.9 1.5zm8.8.7c2 0 3.6-1.1 3.6-3 0-1.9-1.3-2.8-3.1-3.6-1.2-.5-1.8-.9-1.8-1.6 0-.7.6-1.3 1.7-1.3 1 0 1.8.4 2.4.8l.8-1.7c-.8-.6-1.9-.9-3.2-.9-2.2 0-3.7 1.3-3.7 3.1 0 1.8 1.2 2.7 3 3.4 1.3.5 1.9 1 1.9 1.8 0 .9-.8 1.4-1.9 1.4-1.2 0-2.2-.5-2.9-1.1l-.9 1.7c.9.9 2.4 1.4 4.1 1.4z"
            fill="#000000"
          />
        </svg>
      )
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      badge: 'Typed',
      color: '#3178c6',
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#3178c6"/>
          <path d="M11.6 10.5H6.5v1.8h1.6v6.2h2v-6.2h1.5v-1.8zm7.4 2.2c-.4-.6-1.1-.9-1.9-.9-.9 0-1.6.4-1.6 1.2 0 .7.6 1 1.5 1.3 1.2.4 2.1.8 2.1 2.1 0 1.4-1.1 2.3-2.6 2.3-1.3 0-2.2-.6-2.6-1.5l1.4-.9c.3.5.7.8 1.2.8.5 0 .9-.3.9-.7 0-.5-.5-.7-1.3-1-1.3-.5-2.2-1-2.2-2.3 0-1.4 1.1-2.2 2.5-2.2 1.1 0 1.9.4 2.4 1.1l-1.4.8z" fill="#fff"/>
        </svg>
      )
    },
    {
      id: 'html5',
      name: 'HTML',
      color: '#e34f26',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M2.5 1h19l-1.7 19.3L12 23l-7.8-2.7L2.5 1zm15.5 5.5H6l.3 3.6h9.4l-.4 4.3-3.3.9-3.3-.9-.2-2.1H6.1l.3 3.7 5.6 1.6 5.6-1.6.8-9.5z" fill="#e34f26"/>
        </svg>
      )
    },
    {
      id: 'css3',
      name: 'CSS',
      color: '#1572b6',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M2.5 1h19l-1.7 19.3L12 23l-7.8-2.7L2.5 1zm15.5 5.5H6.1l.3 3.6h9.4l-.4 4.3-3.3.9-3.3-.9-.2-2.1H6.1l.3 3.7 5.6 1.6 5.6-1.6.8-9.5z" fill="#1572b6"/>
        </svg>
      )
    },
    {
      id: 'react',
      name: 'React',
      badge: 'Expert',
      color: '#61dafb',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#61dafb" strokeWidth="1.5">
          <ellipse cx="12" cy="12" rx="10" ry="4"/>
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/>
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>
          <circle cx="12" cy="12" r="1.8" fill="#61dafb"/>
        </svg>
      )
    },
    {
      id: 'reactnative',
      name: 'React Native',
      badge: 'Mobile',
      color: '#38bdf8',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="1.5">
          <rect x="5" y="2" width="14" height="20" rx="3" stroke="#38bdf8"/>
          <ellipse cx="12" cy="11" rx="5" ry="2"/>
          <ellipse cx="12" cy="11" rx="5" ry="2" transform="rotate(60 12 11)"/>
          <ellipse cx="12" cy="11" rx="5" ry="2" transform="rotate(120 12 11)"/>
          <circle cx="12" cy="11" r="1" fill="#38bdf8"/>
          <circle cx="12" cy="19" r="0.8" fill="#38bdf8"/>
        </svg>
      )
    },
    {
      id: 'nextjs',
      name: 'Next.js',
      badge: 'FullStack',
      color: '#ffffff',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="11" fill="#000" stroke="#fff" strokeWidth="1.2"/>
          <path d="M8.5 7.5v9h1.7V11.2l4.9 5.3h1.4V7.5h-1.6v5.2L9.9 7.5H8.5z" fill="#fff"/>
        </svg>
      )
    },
    {
      id: 'tailwind',
      name: 'Tailwind',
      color: '#06b6d4',
      icon: (
        <svg viewBox="0 0 24 24" fill="#06b6d4">
          <path d="M12 6c-2.4 0-3.9 1.2-4.5 3.6 1-.9 2-1.3 3.1-1.1 1.4.2 2.4 1.2 3.5 2.3 1.8 1.8 3.8 3.9 7.9 3.9 2.4 0 3.9-1.2 4.5-3.6-1 .9-2 1.3-3.1 1.1-1.4-.2-2.4-1.2-3.5-2.3-1.8-1.8-3.8-3.9-7.9-3.9zM4.1 12.3c-2.4 0-3.9 1.2-4.5 3.6 1-.9 2-1.3 3.1-1.1 1.4.2 2.4 1.2 3.5 2.3 1.8 1.8 3.8 3.9 7.9 3.9 2.4 0 3.9-1.2 4.5-3.6-1 .9-2 1.3-3.1 1.1-1.4-.2-2.4-1.2-3.5-2.3-1.8-1.8-3.8-3.9-7.9-3.9z"/>
        </svg>
      )
    }
  ],

  // --- ROW 2 (Backend, APIs & Databases - 6 items) ---
  [
    {
      id: 'nodejs',
      name: 'Node.js',
      badge: 'Backend',
      color: '#539e43',
      icon: (
        <svg viewBox="0 0 24 24" fill="#539e43">
          <path d="M12 2l9 5.2v10.4L12 22.8 3 17.6V7.2L12 2zm0 2.2L5 8.2v7.6l7 4 7-4V8.2l-7-4zm-1.8 5.4h3.6c1.2 0 2 .7 2 1.8 0 .8-.5 1.5-1.3 1.7l1.5 2.7h-1.8l-1.3-2.5h-1v2.5h-1.7V9.6zm1.7 2.2h1.7c.3 0 .6-.2.6-.5 0-.4-.3-.5-.6-.5h-1.7v1z"/>
        </svg>
      )
    },
    {
      id: 'express',
      name: 'Express',
      color: '#e2e8f0',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.8 6.5h-3.6l-3.2 4.5-3.2-4.5H5.2l4.8 6.6-5 6.9h3.6l3.4-4.8 3.4 4.8h3.6l-5.1-7 4.9-6.5z" fill="#94a3b8"/>
        </svg>
      )
    },
    {
      id: 'mongodb',
      name: 'MongoDB',
      badge: 'NoSQL',
      color: '#47a248',
      icon: (
        <svg viewBox="0 0 24 24" fill="#47a248">
          <path d="M12 1.5s-5.4 5.3-5.4 11.2c0 4.6 3.1 8.7 5.4 9.8 2.3-1.1 5.4-5.2 5.4-9.8C17.4 6.8 12 1.5 12 1.5zm-.1 17.5v-7.2c-.3 0-.6.1-.8.2-.5.3-1.1.9-1.1 1.7 0 1.2 1 2.3 1.9 5.3zm.7 0c.9-3 1.9-4.1 1.9-5.3 0-.8-.6-1.4-1.1-1.7-.2-.1-.5-.2-.8-.2v7.2z"/>
        </svg>
      )
    },
    {
      id: 'firebase',
      name: 'Firebase',
      badge: 'FCM Alerts',
      color: '#ffca28',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M3.9 17.3l2.8-15.6a.6.6 0 0 1 1.1-.1l3.5 6.7-7.4 9zm15.4.1l-2.2-13.8a.6.6 0 0 0-1-.3L3.8 17.5l7.5 4.3c.4.2.9.2 1.3 0l6.7-4.4z" fill="#ffa000"/>
          <path d="M13.2 8.5l-2.3-4.4a.6.6 0 0 0-1.1 0L3.8 17.5l9.4-9z" fill="#ffca28"/>
        </svg>
      )
    },
    {
      id: 'postgresql',
      name: 'PostgreSQL',
      color: '#336791',
      icon: (
        <svg viewBox="0 0 24 24" fill="#336791">
          <path d="M12 2C7.5 2 4 5.2 4 9.5c0 3.8 2.8 6.8 6.5 7.4v4.6l3-1.5v-3.1c3.7-.6 6.5-3.6 6.5-7.4C20 5.2 16.5 2 12 2zm1 12.5h-2v-2h2v2zm0-4h-2V7h2v3.5z"/>
        </svg>
      )
    },
    {
      id: 'redis',
      name: 'Redis',
      color: '#dc382d',
      icon: (
        <svg viewBox="0 0 24 24" fill="#dc382d">
          <path d="M12 2L2 7l10 5 10-5-10-5zm0 8.3L3.8 6.2 12 2.1l8.2 4.1L12 10.3zm10 .7l-10 5-10-5v3l10 5 10-5v-3zm0 5l-10 5-10-5v3l10 5 10-5v-3z"/>
        </svg>
      )
    }
  ],

  // --- ROW 3 (E-Commerce, Automation, Meta & Communications - 5 items) ---
  [
    {
      id: 'shopify',
      name: 'Shopify',
      badge: 'E-Com',
      color: '#95bf47',
      icon: (
        <svg viewBox="0 0 24 24" fill="#95bf47">
          <path d="M19.4 6.8l-1.9-.6s-1.2-1.2-1.6-1.5c-.3-.2-.8-.2-.9.1-.1.2-.5 1.7-.5 1.7s-1.7-.5-2.2-.4c-.5.1-.8.5-.8.9 0 .4.3 3.6.3 3.6L6.5 12.2l3.4 9.3 8.7-2.1.8-12.6zm-4.7-.5s.3-1 .6-1.4c.3.3.4 1.4.4 1.4h-1zm-2.3 8.3c-.6.9-1.5 1.5-2.5 1.8l-.9-2.5c.6-.2 1.1-.6 1.5-1.1.4-.6.6-1.3.6-2.1 0-.9-.3-1.6-.9-2.1-.6-.5-1.4-.8-2.4-.8-.6 0-1.1.1-1.6.3v1.8c.4-.2.8-.3 1.2-.3.6 0 1.1.2 1.4.5.3.3.5.8.5 1.4 0 .6-.2 1.1-.5 1.5-.4.4-.9.7-1.6.8l.9 2.5c1-.3 1.9-.9 2.5-1.7.6-.8 1-1.8 1-2.9 0-1-.3-1.8-.8-2.5z"/>
        </svg>
      )
    },
    {
      id: 'n8n',
      name: 'n8n',
      badge: 'Workflow',
      color: '#ea4b71',
      icon: (
        <svg viewBox="0 0 24 24" fill="#ea4b71">
          <circle cx="5" cy="12" r="3"/>
          <circle cx="12" cy="6" r="3"/>
          <circle cx="12" cy="18" r="3"/>
          <circle cx="19" cy="12" r="3"/>
          <path d="M8 12h8M12 9v6" stroke="#ea4b71" strokeWidth="2"/>
        </svg>
      )
    },
    {
      id: 'meta',
      name: 'Meta Dev',
      badge: 'APIs',
      color: '#0081fb',
      icon: (
        <svg viewBox="0 0 24 24" fill="#0081fb">
          <path d="M12 12.8c-1.3-2-2.7-3.4-4.5-3.4-2.5 0-4.5 2.3-4.5 5.1s2 5.1 4.5 5.1c2 0 3.3-1.4 4.5-3.2 1.2 1.8 2.5 3.2 4.5 3.2 2.5 0 4.5-2.3 4.5-5.1s-2-5.1-4.5-5.1c-1.8 0-3.2 1.4-4.5 3.4zm0 0c1.2-1.9 2.4-3.4 4.2-3.4 1.8 0 3.3 1.6 3.3 3.6s-1.5 3.6-3.3 3.6c-1.5 0-2.6-1.2-4.2-3.8zm0 0c-1.2-1.9-2.4-3.4-4.2-3.4-1.8 0-3.3 1.6-3.3 3.6s1.5 3.6 3.3 3.6c1.5 0 2.6-1.2 4.2-3.8z"/>
        </svg>
      )
    },
    {
      id: 'twilio',
      name: 'Twilio SMS',
      badge: 'SMS API',
      color: '#f22f46',
      icon: (
        <svg viewBox="0 0 24 24" fill="#f22f46">
          <circle cx="12" cy="12" r="10" fill="none" stroke="#f22f46" strokeWidth="2"/>
          <circle cx="8" cy="8.5" r="1.8"/>
          <circle cx="16" cy="8.5" r="1.8"/>
          <circle cx="8" cy="15.5" r="1.8"/>
          <circle cx="16" cy="15.5" r="1.8"/>
        </svg>
      )
    },
    {
      id: 'devops',
      name: 'DevOps',
      badge: '10% Learning',
      isLearning: true,
      color: '#38bdf8',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="1.8">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
          <circle cx="12" cy="12" r="3.5" stroke="#38bdf8"/>
        </svg>
      )
    }
  ],

  // --- ROW 4 (DevOps, Containers & Version Control - 4 items) ---
  [
    {
      id: 'docker',
      name: 'Docker',
      color: '#2496ed',
      icon: (
        <svg viewBox="0 0 24 24" fill="#2496ed">
          <path d="M13 8h2v2h-2V8zm-3 0h2v2h-2V8zm6 0h2v2h-2V8zm-9 0h2v2H7V8zm3-3h2v2h-2V5zm3 0h2v2h-2V5zm-6 3h2v2H7V8zM1 12.5c0 3.6 2.9 6.5 6.5 6.5h11c2.5 0 4.5-2 4.5-4.5 0-2.2-1.6-4-3.7-4.4-.2-.1-.4-.1-.6-.1-1.3 0-2.4.6-3.2 1.5H3.6c-.4-.6-.9-1.1-1.6-1.5-.6.8-1 1.6-1 2.5z"/>
        </svg>
      )
    },
    {
      id: 'git',
      name: 'Git',
      color: '#f05032',
      icon: (
        <svg viewBox="0 0 24 24" fill="#f05032">
          <path d="M21.6 10.9L13.1 2.4c-.6-.6-1.5-.6-2.1 0L8.7 4.7l2.7 2.7c.6-.2 1.4 0 1.9.5.5.5.7 1.3.5 1.9l2.6 2.6c.6-.2 1.4 0 1.9.5.7.7.7 1.9 0 2.6-.7.7-1.9.7-2.6 0-.6-.6-.7-1.4-.4-2.1l-2.4-2.4v5.3c.2.2.3.4.3.7 0 1-.8 1.8-1.8 1.8s-1.8-.8-1.8-1.8c0-.7.4-1.3 1-1.6V8.7c-.6-.3-1-.9-1-1.6 0-.3.1-.6.2-.9L2.4 10.9c-.6.6-.6 1.5 0 2.1l8.5 8.5c.6.6 1.5.6 2.1 0l8.5-8.5c.6-.6.6-1.5.1-2.1z"/>
        </svg>
      )
    },
    {
      id: 'github',
      name: 'GitHub',
      color: '#ffffff',
      icon: (
        <svg viewBox="0 0 24 24" fill="#ffffff">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
        </svg>
      )
    },
    {
      id: 'postman',
      name: 'Postman',
      color: '#ff6c37',
      icon: (
        <svg viewBox="0 0 24 24" fill="#ff6c37">
          <circle cx="12" cy="12" r="10" fill="none" stroke="#ff6c37" strokeWidth="2"/>
          <path d="M7 12l4 4 6-8" stroke="#ff6c37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ],

  // --- ROW 5 (Cloud, Deploy & OS - 3 items) ---
  [
    {
      id: 'linux',
      name: 'Linux',
      color: '#fcc624',
      icon: (
        <svg viewBox="0 0 24 24" fill="#fcc624">
          <path d="M12 2c-3.3 0-6 2.7-6 6v3c-.6.3-1 .9-1 1.6v3.8c0 .9.6 1.6 1.5 1.6H7c.8 1.8 2.7 3 4.9 3s4.1-1.2 4.9-3h.5c.9 0 1.5-.7 1.5-1.6V12.6c0-.7-.4-1.3-1-1.6V8c0-3.3-2.7-6-6-6zm-1.8 6c.5 0 1 .4 1 1s-.5 1-1 1-1-.4-1-1 .5-1 1-1zm3.6 0c.5 0 1 .4 1 1s-.5 1-1 1-1-.4-1-1 .5-1 1-1zm-1.8 4c1.1 0 2 .5 2 1.2h-4c0-.7.9-1.2 2-1.2z"/>
        </svg>
      )
    },
    {
      id: 'vscode',
      name: 'VS Code',
      color: '#007acc',
      icon: (
        <svg viewBox="0 0 24 24" fill="#007acc">
          <path d="M17.5 2.5L7.2 10.3 3.5 7.4 1 8.8l4.2 3.2L1 15.2l2.5 1.4 3.7-2.9 10.3 7.8 4.5-2.2V4.7l-4.5-2.2zM17.5 17L9.9 12l7.6-5v10z"/>
        </svg>
      )
    },
    {
      id: 'vercel',
      name: 'Vercel',
      color: '#ffffff',
      icon: (
        <svg viewBox="0 0 24 24" fill="#ffffff">
          <path d="M12 2L2 20h20L12 2z"/>
        </svg>
      )
    }
  ]
];

// Map of all items by ID for easy responsive regrouping
const ITEM_MAP = Object.fromEntries(
  STACK_ROWS.flat().map((item) => [item.id, item])
);

// Mobile-specific inverted pyramid tiers (5 -> 5 -> 4 -> 4 -> 3 -> 3 -> 2)
// Fits perfectly on screens from 320px to 680px without broken line wraps
const MOBILE_ROW_IDS = [
  ['javascript', 'typescript', 'react', 'nextjs', 'tailwind'],
  ['html5', 'css3', 'reactnative', 'nodejs', 'express'],
  ['mongodb', 'firebase', 'postgresql', 'redis'],
  ['shopify', 'n8n', 'meta', 'twilio'],
  ['devops', 'docker', 'git'],
  ['github', 'postman', 'linux'],
  ['vscode', 'vercel']
];

const MOBILE_ROWS = MOBILE_ROW_IDS.map((row) =>
  row.map((id) => ITEM_MAP[id]).filter(Boolean)
);

export default function TechStackGrid() {
  const [activeItem, setActiveItem] = useState(null);

  const renderTile = (item) => {
    const isActive = activeItem === item.id;
    return (
      <div
        key={item.id}
        className={`tech-tile ${item.isLearning ? 'tech-tile--learning' : ''} ${isActive ? 'tech-tile--active' : ''}`}
        onMouseEnter={() => setActiveItem(item.id)}
        onMouseLeave={() => setActiveItem(null)}
        onClick={() => setActiveItem((prev) => (prev === item.id ? null : item.id))}
        style={{
          '--tile-accent': item.color || '#3b82f6',
        }}
      >
        {/* Corner / Top Badge for special tags (e.g. 10% Learning) */}
        {item.badge && (
          <span className={`tech-tile-badge ${item.isLearning ? 'tech-tile-badge--learning' : ''}`}>
            {item.badge}
          </span>
        )}

        {/* SVG Icon */}
        <div className="tech-tile-icon">
          {item.icon}
        </div>

        {/* Tech Name */}
        <span className="tech-tile-name">
          {item.name}
        </span>
      </div>
    );
  };

  return (
    <section id="skills" className="tech-stack-section">
      {/* Background Perspective Tunnel Mesh (matching reference image) */}
      <div className="tech-stack-bg-mesh" aria-hidden="true">
        <div className="tech-stack-glow" />
        <svg className="tech-stack-grid-svg" viewBox="0 0 1200 1100" preserveAspectRatio="none">
          <defs>
            <radialGradient id="meshGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#818cf8" stopOpacity="0.35" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#04060e" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Concentric rounded ellipses for 3D tunnel depth */}
          <ellipse cx="600" cy="520" rx="160" ry="110" stroke="rgba(129, 140, 248, 0.3)" fill="none" strokeWidth="1" />
          <ellipse cx="600" cy="520" rx="310" ry="210" stroke="rgba(129, 140, 248, 0.22)" fill="none" strokeWidth="1" />
          <ellipse cx="600" cy="520" rx="490" ry="340" stroke="rgba(99, 102, 241, 0.16)" fill="none" strokeWidth="1" />
          <ellipse cx="600" cy="520" rx="720" ry="500" stroke="rgba(59, 130, 246, 0.12)" fill="none" strokeWidth="1" />

          {/* Perspective converging rays */}
          <line x1="0" y1="0" x2="600" y2="520" stroke="rgba(129, 140, 248, 0.2)" strokeWidth="1" />
          <line x1="300" y1="0" x2="600" y2="520" stroke="rgba(129, 140, 248, 0.2)" strokeWidth="1" />
          <line x1="600" y1="0" x2="600" y2="520" stroke="rgba(129, 140, 248, 0.2)" strokeWidth="1" />
          <line x1="900" y1="0" x2="600" y2="520" stroke="rgba(129, 140, 248, 0.2)" strokeWidth="1" />
          <line x1="1200" y1="0" x2="600" y2="520" stroke="rgba(129, 140, 248, 0.2)" strokeWidth="1" />
          <line x1="0" y1="1100" x2="600" y2="520" stroke="rgba(129, 140, 248, 0.2)" strokeWidth="1" />
          <line x1="300" y1="1100" x2="600" y2="520" stroke="rgba(129, 140, 248, 0.2)" strokeWidth="1" />
          <line x1="600" y1="1100" x2="600" y2="520" stroke="rgba(129, 140, 248, 0.2)" strokeWidth="1" />
          <line x1="900" y1="1100" x2="600" y2="520" stroke="rgba(129, 140, 248, 0.2)" strokeWidth="1" />
          <line x1="1200" y1="1100" x2="600" y2="520" stroke="rgba(129, 140, 248, 0.2)" strokeWidth="1" />
        </svg>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* SECTION HEADER */}
        <div className="tech-stack-header">
          <span className="section-label">Capabilities</span>
          <h2 className="tech-stack-title">TECH STACK</h2>
          <p className="tech-stack-subtitle">
            Tools, frameworks, and cloud infrastructure I engineer high-performance systems with.
          </p>
        </div>

        {/* DESKTOP INVERTED PYRAMID (8 -> 6 -> 5 -> 4 -> 3) */}
        <div className="tech-pyramid-container tech-pyramid-desktop">
          {STACK_ROWS.map((row, rowIndex) => (
            <div key={rowIndex} className="tech-pyramid-row">
              {row.map(renderTile)}
            </div>
          ))}
        </div>

        {/* MOBILE OPTIMIZED INVERTED PYRAMID (5 -> 5 -> 4 -> 4 -> 3 -> 3 -> 2) */}
        <div className="tech-pyramid-container tech-pyramid-mobile">
          {MOBILE_ROWS.map((row, rowIndex) => (
            <div key={rowIndex} className="tech-pyramid-row">
              {row.map(renderTile)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
