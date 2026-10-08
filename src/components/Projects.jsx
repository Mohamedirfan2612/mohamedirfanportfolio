import React, { useState, useEffect, useRef } from 'react';
import ProjectModal from './ProjectModal';
import { ArrowLeftRight, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './Icons';
import './Projects.css';

// =========================================================================
// DUMMY PROJECTS DATA (Matching reference image + user tech stack)
// =========================================================================
const PROJECTS = [
  {
    id: 'drishti-ai',
    number: '01',
    title: 'Drishti',
    category: 'AI / LLM',
    badge: 'Flagship AI',
    tools: 'Python, PyTorch, Transformers, FastAPI, React, MongoDB',
    description: "Bangladesh's First AI Large Language Model with multi-turn contextual reasoning, visual understanding, and sub-100ms vector search.",
    highlights: [
      'Engineered fine-tuning pipeline on custom regional domain corpora',
      'Deployed low-latency FastAPI endpoints with streaming token responses',
      'Integrated MongoDB vector search for semantic document retrieval'
    ],
    liveUrl: 'https://github.com',
    githubUrl: 'https://github.com',
    visual: (
      <svg viewBox="0 0 460 230" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="460" height="230" fill="#080f1e" />
        {/* Subtle grid background */}
        <path d="M0 40h460M0 80h460M0 120h460M0 160h460M0 200h460" stroke="rgba(56,189,248,0.06)" strokeWidth="1"/>
        <path d="M60 0v230M140 0v230M220 0v230M300 0v230M380 0v230" stroke="rgba(56,189,248,0.06)" strokeWidth="1"/>

        {/* Title overlay */}
        <text x="230" y="38" textAnchor="middle" fill="#ffffff" fontSize="22" fontWeight="800" fontFamily="sans-serif">Drishti</text>
        <text x="230" y="56" textAnchor="middle" fill="#67e8f9" fontSize="10.5" fontFamily="monospace" letterSpacing="1">BANGLADESH'S FIRST AI LARGE LANGUAGE MODEL</text>

        {/* Central Brain Hologram Network */}
        <g transform="translate(230, 142)">
          {/* Radial back glow */}
          <circle cx="0" cy="0" r="54" fill="url(#brainGlow)" opacity="0.8" />
          
          {/* Synaptic nodes & links */}
          <path d="M-45 -18 Q-20 -45 0 -38 Q20 -45 45 -18 Q55 12 35 38 Q0 48 -35 38 Z" stroke="#38bdf8" strokeWidth="1.5" fill="rgba(6,182,212,0.12)" />
          <path d="M-28 -28 Q0 -10 28 -28" stroke="#818cf8" strokeWidth="1.2" strokeDasharray="3 3"/>
          <path d="M-36 12 Q0 26 36 12" stroke="#818cf8" strokeWidth="1.2" strokeDasharray="3 3"/>
          <path d="M0 -38 V40" stroke="#a855f7" strokeWidth="1.5"/>
          <path d="M-22 -8 Q0 6 22 -8" stroke="#38bdf8" strokeWidth="1.5"/>

          {/* Glowing node vertices */}
          <circle cx="-35" cy="-20" r="3.5" fill="#38bdf8" />
          <circle cx="35" cy="-20" r="3.5" fill="#38bdf8" />
          <circle cx="-25" cy="18" r="3.5" fill="#60a5fa" />
          <circle cx="25" cy="18" r="3.5" fill="#60a5fa" />
          <circle cx="0" cy="-38" r="4" fill="#67e8f9" />
          <circle cx="0" cy="0" r="4.5" fill="#ffffff" />
        </g>

        {/* Floating Callout Badges */}
        <g transform="translate(68, 92)">
          <rect width="84" height="26" rx="13" fill="rgba(15,23,42,0.9)" stroke="rgba(56,189,248,0.4)" strokeWidth="1"/>
          <text x="42" y="17" textAnchor="middle" fill="#e0f2fe" fontSize="10" fontWeight="600" fontFamily="sans-serif">Reasoning</text>
        </g>
        <g transform="translate(308, 92)">
          <rect width="84" height="26" rx="13" fill="rgba(15,23,42,0.9)" stroke="rgba(56,189,248,0.4)" strokeWidth="1"/>
          <text x="42" y="17" textAnchor="middle" fill="#e0f2fe" fontSize="10" fontWeight="600" fontFamily="sans-serif">Vision</text>
        </g>
        <g transform="translate(80, 160)">
          <rect width="72" height="24" rx="12" fill="rgba(15,23,42,0.9)" stroke="rgba(56,189,248,0.4)" strokeWidth="1"/>
          <text x="36" y="16" textAnchor="middle" fill="#e0f2fe" fontSize="10" fontWeight="600" fontFamily="sans-serif">Fast Search</text>
        </g>
        <g transform="translate(308, 160)">
          <rect width="72" height="24" rx="12" fill="rgba(15,23,42,0.9)" stroke="rgba(56,189,248,0.4)" strokeWidth="1"/>
          <text x="36" y="16" textAnchor="middle" fill="#e0f2fe" fontSize="10" fontWeight="600" fontFamily="sans-serif">Coding</text>
        </g>

        <defs>
          <radialGradient id="brainGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#080f1e" stopOpacity="0"/>
          </radialGradient>
        </defs>
      </svg>
    )
  },
  {
    id: 'votechain',
    number: '02',
    title: 'VoteChain',
    category: 'Blockchain',
    badge: 'Web3 & Security',
    tools: 'Solidity, Web3.js, React, Ethereum, IPFS, MetaMask, Node.js',
    description: 'Decentralized smart election verification system with cryptographic hashing, tamper-proof ballot receipts, and zero-downtime consensus.',
    highlights: [
      'Smart contract architecture deployed with automated gas optimization',
      'Cryptographically signed voter identity verification using MetaMask',
      'IPFS decentralized storage layer for immutable election logs'
    ],
    liveUrl: 'https://github.com',
    githubUrl: 'https://github.com',
    visual: (
      <svg viewBox="0 0 460 230" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="460" height="230" fill="#070c18" />
        <text x="230" y="38" textAnchor="middle" fill="#ffffff" fontSize="22" fontWeight="800" fontFamily="sans-serif">VoteChain</text>
        <text x="230" y="56" textAnchor="middle" fill="#60a5fa" fontSize="10.5" fontFamily="monospace" letterSpacing="1">BLOCKCHAIN-POWERED SMART ELECTION SYSTEM</text>

        {/* Central Isometric Vault & Cryptographic Chain */}
        <g transform="translate(230, 138)">
          {/* Back Glowing Aura */}
          <circle cx="0" cy="0" r="58" fill="url(#chainGlow)" opacity="0.7" />

          {/* Hexagonal Chain Links */}
          <polygon points="0,-48 42,-24 42,24 0,48 -42,24 -42,-24" stroke="#3b82f6" strokeWidth="2" fill="none" strokeDasharray="6 4"/>
          <polygon points="0,-36 32,-18 32,18 0,36 -32,18 -32,-18" stroke="#60a5fa" strokeWidth="1.5" fill="rgba(37,99,235,0.1)"/>

          {/* Center Ballot Box Icon */}
          <rect x="-18" y="-18" width="36" height="36" rx="6" fill="#1e293b" stroke="#93c5fd" strokeWidth="1.5" />
          <path d="M-8 -6 L0 2 L10 -8" stroke="#38bdf8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="-10" y="6" width="20" height="2" fill="#64748b" rx="1"/>
        </g>

        {/* Callout Badges */}
        <g transform="translate(64, 88)">
          <rect width="88" height="24" rx="12" fill="rgba(15,23,42,0.9)" stroke="rgba(96,165,250,0.35)" strokeWidth="1"/>
          <text x="44" y="16" textAnchor="middle" fill="#bfdbfe" fontSize="10" fontWeight="600" fontFamily="sans-serif">Tamper-Proof</text>
        </g>
        <g transform="translate(308, 88)">
          <rect width="88" height="24" rx="12" fill="rgba(15,23,42,0.9)" stroke="rgba(96,165,250,0.35)" strokeWidth="1"/>
          <text x="44" y="16" textAnchor="middle" fill="#bfdbfe" fontSize="10" fontWeight="600" fontFamily="sans-serif">Live Results</text>
        </g>
        <g transform="translate(74, 168)">
          <rect width="86" height="24" rx="12" fill="rgba(15,23,42,0.9)" stroke="rgba(96,165,250,0.35)" strokeWidth="1"/>
          <text x="43" y="16" textAnchor="middle" fill="#bfdbfe" fontSize="10" fontWeight="600" fontFamily="sans-serif">Postal Voting</text>
        </g>
        <g transform="translate(304, 168)">
          <rect width="90" height="24" rx="12" fill="rgba(15,23,42,0.9)" stroke="rgba(96,165,250,0.35)" strokeWidth="1"/>
          <text x="45" y="16" textAnchor="middle" fill="#bfdbfe" fontSize="10" fontWeight="600" fontFamily="sans-serif">Verified Votes</text>
        </g>

        <defs>
          <radialGradient id="chainGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#070c18" stopOpacity="0"/>
          </radialGradient>
        </defs>
      </svg>
    )
  },
  {
    id: 'flood-spaces',
    number: '03',
    title: 'Flood Spaces 2.0',
    category: 'AI / ML',
    badge: 'Disaster Tech',
    tools: 'Python, TensorFlow, Pandas, React, FastAPI, GIS',
    description: 'Real-time hydrological radar telemetry and flood prediction engine with satellite contour integration and automated SMS emergency dispatch.',
    highlights: [
      'Trained predictive ML models achieving 94.2% forecasting accuracy',
      'Live spatial map visualization using WebGL and vector tile layers',
      'Automated early warning sirens & SMS alerts integration'
    ],
    liveUrl: 'https://github.com',
    githubUrl: 'https://github.com',
    visual: (
      <svg viewBox="0 0 460 230" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="460" height="230" fill="#06101c" />
        <text x="230" y="38" textAnchor="middle" fill="#ffffff" fontSize="22" fontWeight="800" fontFamily="sans-serif">Flood Spaces 2.0</text>
        <text x="230" y="56" textAnchor="middle" fill="#2dd4bf" fontSize="10.5" fontFamily="monospace" letterSpacing="1">AI-POWERED FLOOD PREDICTION & RADAR MAPPING</text>

        {/* Geospatial Radar Scanner */}
        <g transform="translate(180, 140)">
          {/* Radar concentric rings */}
          <circle cx="0" cy="0" r="60" stroke="rgba(45,212,191,0.2)" strokeWidth="1" fill="none" />
          <circle cx="0" cy="0" r="42" stroke="rgba(45,212,191,0.3)" strokeWidth="1" fill="none" />
          <circle cx="0" cy="0" r="22" stroke="rgba(45,212,191,0.45)" strokeWidth="1" fill="none" />
          <line x1="-65" y1="0" x2="65" y2="0" stroke="rgba(45,212,191,0.25)" strokeWidth="1" />
          <line x1="0" y1="-65" x2="0" y2="65" stroke="rgba(45,212,191,0.25)" strokeWidth="1" />

          {/* Radar Sweep cone */}
          <path d="M0 0 L46 -38 A60 60 0 0 1 60 0 Z" fill="url(#radarSweep)" opacity="0.5" />

          {/* Water level contour nodes */}
          <circle cx="28" cy="-14" r="5" fill="#f43f5e" opacity="0.9"/>
          <circle cx="12" cy="22" r="4" fill="#fbbf24" opacity="0.9"/>
          <circle cx="-24" cy="-20" r="4" fill="#38bdf8" opacity="0.9"/>
        </g>

        {/* Telemetry Gauge & Bar chart on Right */}
        <g transform="translate(320, 100)">
          {/* Telemetry Bar Chart */}
          <rect x="0" y="24" width="7" height="30" fill="#2dd4bf" rx="2" />
          <rect x="12" y="14" width="7" height="40" fill="#2dd4bf" rx="2" />
          <rect x="24" y="32" width="7" height="22" fill="#2dd4bf" rx="2" />
          <rect x="36" y="8" width="7" height="46" fill="#38bdf8" rx="2" />
          <rect x="48" y="18" width="7" height="36" fill="#38bdf8" rx="2" />

          {/* Accuracy Gauge Dial */}
          <g transform="translate(30, 80)">
            <circle cx="0" cy="0" r="22" fill="#0f172a" stroke="#2dd4bf" strokeWidth="2"/>
            <text x="0" y="2" textAnchor="middle" fill="#67e8f9" fontSize="9" fontWeight="700" fontFamily="sans-serif">94.2%</text>
            <text x="0" y="13" textAnchor="middle" fill="#94a3b8" fontSize="6.5" fontFamily="sans-serif">Accuracy</text>
          </g>
        </g>

        <defs>
          <linearGradient id="radarSweep" x1="0" y1="0" x2="60" y2="-38" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0"/>
            <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.8"/>
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    id: 'devpulse-cloud',
    number: '04',
    title: 'DevPulse Cloud',
    category: 'DevOps / Cloud',
    badge: 'Infrastructure',
    tools: 'Docker, Kubernetes, Prometheus, Node.js, Next.js, AWS',
    description: 'Autonomous microservices monitoring and self-healing container orchestrator with automated canary deployments and live telemetry.',
    highlights: [
      'Automated container provisioning with sub-second health probes',
      'Configured Grafana & Prometheus distributed metrics pipelines',
      'Built multi-region failover architecture with zero downtime'
    ],
    liveUrl: 'https://github.com',
    githubUrl: 'https://github.com',
    visual: (
      <svg viewBox="0 0 460 230" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="460" height="230" fill="#080d19" />
        <text x="230" y="38" textAnchor="middle" fill="#ffffff" fontSize="22" fontWeight="800" fontFamily="sans-serif">DevPulse Cloud</text>
        <text x="230" y="56" textAnchor="middle" fill="#38bdf8" fontSize="10.5" fontFamily="monospace" letterSpacing="1">CONTAINER ORCHESTRATION & CLUSTER TELEMETRY</text>

        {/* Kubernetes Pod Mesh */}
        <g transform="translate(230, 140)">
          {/* Central Pod Cluster */}
          <circle cx="0" cy="0" r="54" fill="url(#cloudGlow)" opacity="0.6"/>
          
          {/* Interconnected Pods */}
          <line x1="-70" y1="-25" x2="0" y2="-40" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3"/>
          <line x1="70" y1="-25" x2="0" y2="-40" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3"/>
          <line x1="-70" y1="-25" x2="-40" y2="28" stroke="#38bdf8" strokeWidth="1.5"/>
          <line x1="70" y1="-25" x2="40" y2="28" stroke="#38bdf8" strokeWidth="1.5"/>
          <line x1="-40" y1="28" x2="40" y2="28" stroke="#38bdf8" strokeWidth="1.5"/>
          <line x1="0" y1="-40" x2="0" y2="10" stroke="#38bdf8" strokeWidth="1.5"/>

          {/* Pod Nodes */}
          <rect x="-18" y="-52" width="36" height="24" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5"/>
          <text x="0" y="-36" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="700">Cluster</text>

          <rect x="-85" y="-37" width="32" height="24" rx="6" fill="#1e293b" stroke="#22c55e" strokeWidth="1.5"/>
          <text x="-69" y="-21" textAnchor="middle" fill="#22c55e" fontSize="8" fontWeight="700">Pod 01</text>

          <rect x="53" y="-37" width="32" height="24" rx="6" fill="#1e293b" stroke="#22c55e" strokeWidth="1.5"/>
          <text x="69" y="-21" textAnchor="middle" fill="#22c55e" fontSize="8" fontWeight="700">Pod 02</text>

          <rect x="-56" y="16" width="32" height="24" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5"/>
          <text x="-40" y="32" textAnchor="middle" fill="#38bdf8" fontSize="8" fontWeight="700">Redis</text>

          <rect x="24" y="16" width="32" height="24" rx="6" fill="#1e293b" stroke="#60a5fa" strokeWidth="1.5"/>
          <text x="40" y="32" textAnchor="middle" fill="#60a5fa" fontSize="8" fontWeight="700">DB</text>
        </g>

        <defs>
          <radialGradient id="cloudGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45"/>
            <stop offset="100%" stopColor="#080d19" stopOpacity="0"/>
          </radialGradient>
        </defs>
      </svg>
    )
  },
  {
    id: 'shopsphere-pro',
    number: '05',
    title: 'ShopSphere Pro',
    category: 'E-Commerce',
    badge: 'Headless Store',
    tools: 'Shopify Storefront API, Next.js 14, Tailwind, Stripe, n8n, Redis',
    description: 'High-conversion headless Shopify architecture with sub-second page transitions, automated inventory workflows, and 3D product previews.',
    highlights: [
      'Synchronized real-time inventory webhooks with n8n and Redis caching',
      'Achieved 99/100 Google Lighthouse performance score on Next.js 14',
      'Seamless multi-currency Stripe checkout integration'
    ],
    liveUrl: 'https://github.com',
    githubUrl: 'https://github.com',
    visual: (
      <svg viewBox="0 0 460 230" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="460" height="230" fill="#090f19" />
        <text x="230" y="38" textAnchor="middle" fill="#ffffff" fontSize="22" fontWeight="800" fontFamily="sans-serif">ShopSphere Pro</text>
        <text x="230" y="56" textAnchor="middle" fill="#a3e635" fontSize="10.5" fontFamily="monospace" letterSpacing="1">HEADLESS SHOPIFY & HIGH-SPEED COMMERCE</text>

        {/* Headless Showcase Deck */}
        <g transform="translate(230, 138)">
          <rect x="-140" y="-50" width="280" height="95" rx="10" fill="#111827" stroke="rgba(163,230,53,0.3)" strokeWidth="1.2"/>
          {/* Product thumbnail mock */}
          <rect x="-124" y="-36" width="68" height="68" rx="8" fill="#1f2937" stroke="#374151" />
          <circle cx="-90" cy="-2" r="20" fill="url(#storeGlow)" />
          <path d="M-102 6 L-84 -18 L-74 6 Z" stroke="#a3e635" strokeWidth="2" fill="none"/>

          {/* Product info lines */}
          <rect x="-42" y="-30" width="105" height="10" rx="5" fill="#e5e7eb" />
          <rect x="-42" y="-12" width="70" height="8" rx="4" fill="#9ca3af" />
          <text x="-42" y="18" fill="#a3e635" fontSize="14" fontWeight="800" fontFamily="sans-serif">$249.00</text>

          {/* Checkout CTA pill */}
          <rect x="52" y="2" width="76" height="24" rx="12" fill="#a3e635" />
          <text x="90" y="17" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="700" fontFamily="sans-serif">Checkout</text>
        </g>

        <defs>
          <radialGradient id="storeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a3e635" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#1f2937" stopOpacity="0"/>
          </radialGradient>
        </defs>
      </svg>
    )
  },
  {
    id: 'metapulse-crm',
    number: '06',
    title: 'MetaPulse CRM',
    category: 'Automation & APIs',
    badge: 'Omnichannel API',
    tools: 'Meta Graph API, Twilio SMS, Firebase FCM, Express, MongoDB',
    description: 'Enterprise omnichannel automation pipeline coordinating WhatsApp campaigns, automated Twilio SMS triggers, and Firebase push alerts.',
    highlights: [
      'Engineered bi-directional webhooks handling 10,000+ daily message events',
      'Configured automated fallbacks from WhatsApp to Twilio SMS protocol',
      'Integrated Firebase Cloud Messaging for instant customer support alerts'
    ],
    liveUrl: 'https://github.com',
    githubUrl: 'https://github.com',
    visual: (
      <svg viewBox="0 0 460 230" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="460" height="230" fill="#080c16" />
        <text x="230" y="38" textAnchor="middle" fill="#ffffff" fontSize="22" fontWeight="800" fontFamily="sans-serif">MetaPulse CRM</text>
        <text x="230" y="56" textAnchor="middle" fill="#f43f5e" fontSize="10.5" fontFamily="monospace" letterSpacing="1">OMNICHANNEL META & TWILIO SMS PIPELINE</text>

        {/* Messaging Flow Pipeline */}
        <g transform="translate(230, 138)">
          {/* Connector Pipes */}
          <line x1="-120" y1="0" x2="-40" y2="0" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 4"/>
          <line x1="40" y1="0" x2="120" y2="0" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4"/>

          {/* Left Node: Meta API */}
          <g transform="translate(-120, 0)">
            <circle cx="0" cy="0" r="26" fill="#1e293b" stroke="#0081fb" strokeWidth="2"/>
            <text x="0" y="4" textAnchor="middle" fill="#0081fb" fontSize="9" fontWeight="700">Meta API</text>
          </g>

          {/* Center Hub: Event Router */}
          <g transform="translate(0, 0)">
            <rect x="-38" y="-24" width="76" height="48" rx="10" fill="#0f172a" stroke="#f43f5e" strokeWidth="2"/>
            <text x="0" y="-3" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="700">Webhook</text>
            <text x="0" y="11" textAnchor="middle" fill="#f43f5e" fontSize="8" fontWeight="600">Engine</text>
          </g>

          {/* Right Node: Twilio SMS & FCM */}
          <g transform="translate(120, 0)">
            <circle cx="0" cy="0" r="26" fill="#1e293b" stroke="#f43f5e" strokeWidth="2"/>
            <text x="0" y="4" textAnchor="middle" fill="#f43f5e" fontSize="9" fontWeight="700">Twilio SMS</text>
          </g>
        </g>
      </svg>
    )
  }
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const wrapperRef = useRef(null);
  const trackRef = useRef(null);

  // Synchronize vertical window scroll with horizontal track translateX
  useEffect(() => {
    const handleScroll = () => {
      const wrapper = wrapperRef.current;
      const track = trackRef.current;
      if (!wrapper || !track) return;

      const rect = wrapper.getBoundingClientRect();
      const totalScrollable = wrapper.offsetHeight - window.innerHeight;

      if (totalScrollable <= 0) return;

      // Calculate how far into the section we have scrolled (0 to 1)
      const scrolled = -rect.top;
      const progress = Math.min(1, Math.max(0, scrolled / totalScrollable));
      setScrollProgress(progress);

      // Max horizontal translation in pixels
      const maxTranslate = track.scrollWidth - window.innerWidth;
      if (maxTranslate > 0) {
        track.style.transform = `translateX(-${progress * maxTranslate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <>
      <section id="projects" ref={wrapperRef} className="work-horizontal-wrapper">
        <div className="work-sticky-viewport">
          
          {/* Left Social Dock (matching reference screenshot) */}
          <div className="work-left-dock" aria-hidden="true">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="work-dock-link" aria-label="GitHub">
              <GithubIcon size={18} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="work-dock-link" aria-label="LinkedIn">
              <LinkedinIcon size={18} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="work-dock-link" aria-label="X / Twitter">
              <TwitterIcon size={18} />
            </a>
          </div>

          {/* Section Header */}
          <div className="work-header-bar">
            <div className="work-title-group">
              <span className="work-glowing-dot" />
              <h2 className="work-main-title">
                My <span>Work</span>
              </h2>
            </div>

            <div className="work-hint-badge">
              <span className="work-hint-arrows">
                <ArrowLeftRight size={14} />
              </span>
              <span>Scroll down to navigate horizontally</span>
            </div>
          </div>

          {/* Horizontal Project Track */}
          <div className="work-track-wrapper">
            <div ref={trackRef} className="work-horizontal-track">
              {PROJECTS.map((project, index) => {
                // Alternating layout:
                // Odd cards (0, 2, 4): Text on top, image on bottom
                // Even cards (1, 3, 5): Image on top, text on bottom
                const isImageOnTop = index % 2 === 1;

                return (
                  <article
                    key={project.id}
                    className="work-card-column"
                    onClick={() => setSelectedProject(project)}
                  >
                    {isImageOnTop ? (
                      <>
                        {/* Image on top */}
                        <div className="work-card-visual">
                          {project.visual}
                        </div>

                        {/* Text on bottom */}
                        <div className="work-card-info">
                          <div className="work-card-header">
                            <span className="work-card-number">{project.number}</span>
                            <div className="work-card-meta">
                              <h3 className="work-card-title">{project.title}</h3>
                              <span className="work-card-category">{project.category}</span>
                            </div>
                          </div>

                          <h4 className="work-card-subhead">Tools and features</h4>
                          <p className="work-card-tools">{project.tools}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Text on top */}
                        <div className="work-card-info">
                          <div className="work-card-header">
                            <span className="work-card-number">{project.number}</span>
                            <div className="work-card-meta">
                              <h3 className="work-card-title">{project.title}</h3>
                              <span className="work-card-category">{project.category}</span>
                            </div>
                          </div>

                          <h4 className="work-card-subhead">Tools and features</h4>
                          <p className="work-card-tools">{project.tools}</p>
                        </div>

                        {/* Image on bottom */}
                        <div className="work-card-visual">
                          {project.visual}
                        </div>
                      </>
                    )}
                  </article>
                );
              })}
            </div>
          </div>

          {/* Footer Track Progress Bar */}
          <div className="work-footer-bar">
            <div className="work-progress-rail">
              <div
                className="work-progress-fill"
                style={{ transform: `scaleX(${Math.max(0.08, scrollProgress)})` }}
              />
            </div>
            <span className="work-count-badge">
              01 — 0{PROJECTS.length} PROJECTS
            </span>
          </div>

        </div>
      </section>

      {/* Interactive Project Modal on Click */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}
