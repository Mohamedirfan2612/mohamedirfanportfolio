import React, { useState, useEffect, useRef } from 'react';
import ProjectModal from './ProjectModal';
import { ExternalLink, Layers } from 'lucide-react';
import { GithubIcon, LinkedinIcon, WhatsappIcon } from './Icons';
import './Projects.css';

// =========================================================================
// PROJECTS DATA (Preserving all SVGs, descriptions, highlights, and tools)
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
      <svg viewBox="0 0 520 250" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="520" height="250" fill="#080f1e" />
        <path d="M0 50h520M0 100h520M0 150h520M0 200h520" stroke="rgba(56,189,248,0.06)" strokeWidth="1"/>
        <path d="M65 0v250M130 0v250M195 0v250M260 0v250M325 0v250M390 0v250M455 0v250" stroke="rgba(56,189,248,0.06)" strokeWidth="1"/>

        <text x="260" y="38" textAnchor="middle" fill="#ffffff" fontSize="22" fontWeight="800" fontFamily="sans-serif">Drishti</text>
        <text x="260" y="56" textAnchor="middle" fill="#67e8f9" fontSize="10.5" fontFamily="monospace" letterSpacing="1">BANGLADESH'S FIRST AI LARGE LANGUAGE MODEL</text>

        {/* Central Brain Hologram Network */}
        <g transform="translate(260, 146)">
          <circle cx="0" cy="0" r="54" fill="url(#brainGlowWork)" opacity="0.8" />
          
          <path d="M-45 -18 Q-20 -45 0 -38 Q20 -45 45 -18 Q55 12 35 38 Q0 48 -35 38 Z" stroke="#38bdf8" strokeWidth="1.5" fill="rgba(6,182,212,0.12)" />
          <path d="M-28 -28 Q0 -10 28 -28" stroke="#818cf8" strokeWidth="1.2" strokeDasharray="3 3"/>
          <path d="M-36 12 Q0 26 36 12" stroke="#818cf8" strokeWidth="1.2" strokeDasharray="3 3"/>
          <path d="M0 -38 V40" stroke="#38bdf8" strokeWidth="1.5"/>
          <path d="M-22 -8 Q0 6 22 -8" stroke="#38bdf8" strokeWidth="1.5"/>

          <circle cx="-35" cy="-20" r="3.5" fill="#38bdf8" />
          <circle cx="35" cy="-20" r="3.5" fill="#38bdf8" />
          <circle cx="-25" cy="18" r="3.5" fill="#60a5fa" />
          <circle cx="25" cy="18" r="3.5" fill="#60a5fa" />
          <circle cx="0" cy="-38" r="4" fill="#67e8f9" />
          <circle cx="0" cy="0" r="4.5" fill="#ffffff" />
        </g>

        {/* Floating Badges */}
        <g transform="translate(68, 98)">
          <rect width="84" height="26" rx="13" fill="rgba(15,23,42,0.9)" stroke="rgba(56,189,248,0.4)" strokeWidth="1"/>
          <text x="42" y="17" textAnchor="middle" fill="#e0f2fe" fontSize="10" fontWeight="600" fontFamily="sans-serif">Reasoning</text>
        </g>
        <g transform="translate(368, 98)">
          <rect width="84" height="26" rx="13" fill="rgba(15,23,42,0.9)" stroke="rgba(56,189,248,0.4)" strokeWidth="1"/>
          <text x="42" y="17" textAnchor="middle" fill="#e0f2fe" fontSize="10" fontWeight="600" fontFamily="sans-serif">Vision</text>
        </g>
        <g transform="translate(76, 176)">
          <rect width="78" height="24" rx="12" fill="rgba(15,23,42,0.9)" stroke="rgba(56,189,248,0.4)" strokeWidth="1"/>
          <text x="39" y="16" textAnchor="middle" fill="#e0f2fe" fontSize="10" fontWeight="600" fontFamily="sans-serif">Fast Search</text>
        </g>
        <g transform="translate(368, 176)">
          <rect width="78" height="24" rx="12" fill="rgba(15,23,42,0.9)" stroke="rgba(56,189,248,0.4)" strokeWidth="1"/>
          <text x="39" y="16" textAnchor="middle" fill="#e0f2fe" fontSize="10" fontWeight="600" fontFamily="sans-serif">Coding</text>
        </g>

        <defs>
          <radialGradient id="brainGlowWork" cx="50%" cy="50%" r="50%">
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
      <svg viewBox="0 0 520 250" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="520" height="250" fill="#070c18" />
        <path d="M0 50h520M0 100h520M0 150h520M0 200h520" stroke="rgba(59,130,246,0.06)" strokeWidth="1"/>
        <path d="M65 0v250M130 0v250M195 0v250M260 0v250M325 0v250M390 0v250M455 0v250" stroke="rgba(59,130,246,0.06)" strokeWidth="1"/>

        <text x="260" y="38" textAnchor="middle" fill="#ffffff" fontSize="22" fontWeight="800" fontFamily="sans-serif">VoteChain</text>
        <text x="260" y="56" textAnchor="middle" fill="#60a5fa" fontSize="10.5" fontFamily="monospace" letterSpacing="1">BLOCKCHAIN-POWERED SMART ELECTION SYSTEM</text>

        <g transform="translate(260, 146)">
          <circle cx="0" cy="0" r="58" fill="url(#chainGlowWork)" opacity="0.7" />
          <polygon points="0,-48 42,-24 42,24 0,48 -42,24 -42,-24" stroke="#3b82f6" strokeWidth="2" fill="none" strokeDasharray="6 4"/>
          <polygon points="0,-36 32,-18 32,18 0,36 -32,18 -32,-18" stroke="#60a5fa" strokeWidth="1.5" fill="rgba(37,99,235,0.1)"/>
          <rect x="-18" y="-18" width="36" height="36" rx="6" fill="#1e293b" stroke="#93c5fd" strokeWidth="1.5" />
          <path d="M-8 -6 L0 2 L10 -8" stroke="#38bdf8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="-10" y="6" width="20" height="2" fill="#64748b" rx="1"/>
        </g>

        <g transform="translate(68, 98)">
          <rect width="88" height="24" rx="12" fill="rgba(15,23,42,0.9)" stroke="rgba(96,165,250,0.35)" strokeWidth="1"/>
          <text x="44" y="16" textAnchor="middle" fill="#bfdbfe" fontSize="10" fontWeight="600" fontFamily="sans-serif">Tamper-Proof</text>
        </g>
        <g transform="translate(364, 98)">
          <rect width="88" height="24" rx="12" fill="rgba(15,23,42,0.9)" stroke="rgba(96,165,250,0.35)" strokeWidth="1"/>
          <text x="44" y="16" textAnchor="middle" fill="#bfdbfe" fontSize="10" fontWeight="600" fontFamily="sans-serif">Live Results</text>
        </g>
        <g transform="translate(74, 176)">
          <rect width="86" height="24" rx="12" fill="rgba(15,23,42,0.9)" stroke="rgba(96,165,250,0.35)" strokeWidth="1"/>
          <text x="43" y="16" textAnchor="middle" fill="#bfdbfe" fontSize="10" fontWeight="600" fontFamily="sans-serif">Postal Voting</text>
        </g>
        <g transform="translate(360, 176)">
          <rect width="90" height="24" rx="12" fill="rgba(15,23,42,0.9)" stroke="rgba(96,165,250,0.35)" strokeWidth="1"/>
          <text x="45" y="16" textAnchor="middle" fill="#bfdbfe" fontSize="10" fontWeight="600" fontFamily="sans-serif">Verified Votes</text>
        </g>

        <defs>
          <radialGradient id="chainGlowWork" cx="50%" cy="50%" r="50%">
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
      <svg viewBox="0 0 520 250" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="520" height="250" fill="#06101c" />
        <path d="M0 50h520M0 100h520M0 150h520M0 200h520" stroke="rgba(45,212,191,0.06)" strokeWidth="1"/>
        <path d="M65 0v250M130 0v250M195 0v250M260 0v250M325 0v250M390 0v250M455 0v250" stroke="rgba(45,212,191,0.06)" strokeWidth="1"/>

        <text x="260" y="38" textAnchor="middle" fill="#ffffff" fontSize="22" fontWeight="800" fontFamily="sans-serif">Flood Spaces 2.0</text>
        <text x="260" y="56" textAnchor="middle" fill="#2dd4bf" fontSize="10.5" fontFamily="monospace" letterSpacing="1">AI-POWERED FLOOD PREDICTION & RADAR MAPPING</text>

        <g transform="translate(200, 146)">
          <circle cx="0" cy="0" r="58" stroke="rgba(45,212,191,0.2)" strokeWidth="1" fill="none" />
          <circle cx="0" cy="0" r="40" stroke="rgba(45,212,191,0.3)" strokeWidth="1" fill="none" />
          <circle cx="0" cy="0" r="22" stroke="rgba(45,212,191,0.45)" strokeWidth="1" fill="none" />
          <line x1="-62" y1="0" x2="62" y2="0" stroke="rgba(45,212,191,0.25)" strokeWidth="1" />
          <line x1="0" y1="-62" x2="0" y2="62" stroke="rgba(45,212,191,0.25)" strokeWidth="1" />

          <path d="M0 0 L44 -38 A58 58 0 0 1 58 0 Z" fill="url(#radarSweepWork)" opacity="0.5" />
          <circle cx="28" cy="-14" r="5" fill="#f43f5e" opacity="0.9"/>
          <circle cx="12" cy="22" r="4" fill="#fbbf24" opacity="0.9"/>
          <circle cx="-24" cy="-20" r="4" fill="#38bdf8" opacity="0.9"/>
        </g>

        <g transform="translate(360, 106)">
          <rect x="0" y="24" width="7" height="30" fill="#2dd4bf" rx="2" />
          <rect x="12" y="14" width="7" height="40" fill="#2dd4bf" rx="2" />
          <rect x="24" y="32" width="7" height="22" fill="#2dd4bf" rx="2" />
          <rect x="36" y="8" width="7" height="46" fill="#38bdf8" rx="2" />
          <rect x="48" y="18" width="7" height="36" fill="#38bdf8" rx="2" />

          <g transform="translate(30, 80)">
            <circle cx="0" cy="0" r="22" fill="#0f172a" stroke="#2dd4bf" strokeWidth="2"/>
            <text x="0" y="2" textAnchor="middle" fill="#67e8f9" fontSize="9" fontWeight="700" fontFamily="sans-serif">94.2%</text>
            <text x="0" y="13" textAnchor="middle" fill="#94a3b8" fontSize="6.5" fontFamily="sans-serif">Accuracy</text>
          </g>
        </g>

        <defs>
          <linearGradient id="radarSweepWork" x1="0" y1="0" x2="60" y2="-38" gradientUnits="userSpaceOnUse">
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
      <svg viewBox="0 0 520 250" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="520" height="250" fill="#080d19" />
        <path d="M0 50h520M0 100h520M0 150h520M0 200h520" stroke="rgba(56,189,248,0.06)" strokeWidth="1"/>
        <path d="M65 0v250M130 0v250M195 0v250M260 0v250M325 0v250M390 0v250M455 0v250" stroke="rgba(56,189,248,0.06)" strokeWidth="1"/>

        <text x="260" y="38" textAnchor="middle" fill="#ffffff" fontSize="22" fontWeight="800" fontFamily="sans-serif">DevPulse Cloud</text>
        <text x="260" y="56" textAnchor="middle" fill="#38bdf8" fontSize="10.5" fontFamily="monospace" letterSpacing="1">CONTAINER ORCHESTRATION & CLUSTER TELEMETRY</text>

        <g transform="translate(260, 146)">
          <circle cx="0" cy="0" r="54" fill="url(#cloudGlowWork)" opacity="0.6"/>
          
          <line x1="-70" y1="-25" x2="0" y2="-40" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3"/>
          <line x1="70" y1="-25" x2="0" y2="-40" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3"/>
          <line x1="-70" y1="-25" x2="-40" y2="28" stroke="#38bdf8" strokeWidth="1.5"/>
          <line x1="70" y1="-25" x2="40" y2="28" stroke="#38bdf8" strokeWidth="1.5"/>
          <line x1="-40" y1="28" x2="40" y2="28" stroke="#38bdf8" strokeWidth="1.5"/>
          <line x1="0" y1="-40" x2="0" y2="10" stroke="#38bdf8" strokeWidth="1.5"/>

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
          <radialGradient id="cloudGlowWork" cx="50%" cy="50%" r="50%">
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
      <svg viewBox="0 0 520 250" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="520" height="250" fill="#090f19" />
        <path d="M0 50h520M0 100h520M0 150h520M0 200h520" stroke="rgba(163,230,53,0.06)" strokeWidth="1"/>
        <path d="M65 0v250M130 0v250M195 0v250M260 0v250M325 0v250M390 0v250M455 0v250" stroke="rgba(163,230,53,0.06)" strokeWidth="1"/>

        <text x="260" y="38" textAnchor="middle" fill="#ffffff" fontSize="22" fontWeight="800" fontFamily="sans-serif">ShopSphere Pro</text>
        <text x="260" y="56" textAnchor="middle" fill="#a3e635" fontSize="10.5" fontFamily="monospace" letterSpacing="1">HEADLESS SHOPIFY & HIGH-SPEED COMMERCE</text>

        <g transform="translate(260, 146)">
          <rect x="-140" y="-50" width="280" height="95" rx="10" fill="#111827" stroke="rgba(163,230,53,0.3)" strokeWidth="1.2"/>
          <rect x="-124" y="-36" width="68" height="68" rx="8" fill="#1f2937" stroke="#374151" />
          <circle cx="-90" cy="-2" r="20" fill="url(#storeGlowWork)" />
          <path d="M-102 6 L-84 -18 L-74 6 Z" stroke="#a3e635" strokeWidth="2" fill="none"/>

          <rect x="-42" y="-30" width="105" height="10" rx="5" fill="#e5e7eb" />
          <rect x="-42" y="-12" width="70" height="8" rx="4" fill="#9ca3af" />
          <text x="-42" y="18" fill="#a3e635" fontSize="14" fontWeight="800" fontFamily="sans-serif">$249.00</text>

          <rect x="52" y="2" width="76" height="24" rx="12" fill="#a3e635" />
          <text x="90" y="17" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="700" fontFamily="sans-serif">Checkout</text>
        </g>

        <defs>
          <radialGradient id="storeGlowWork" cx="50%" cy="50%" r="50%">
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
      <svg viewBox="0 0 520 250" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="520" height="250" fill="#080c16" />
        <path d="M0 50h520M0 100h520M0 150h520M0 200h520" stroke="rgba(244,63,94,0.06)" strokeWidth="1"/>
        <path d="M65 0v250M130 0v250M195 0v250M260 0v250M325 0v250M390 0v250M455 0v250" stroke="rgba(244,63,94,0.06)" strokeWidth="1"/>

        <text x="260" y="38" textAnchor="middle" fill="#ffffff" fontSize="22" fontWeight="800" fontFamily="sans-serif">MetaPulse CRM</text>
        <text x="260" y="56" textAnchor="middle" fill="#f43f5e" fontSize="10.5" fontFamily="monospace" letterSpacing="1">OMNICHANNEL META & TWILIO SMS PIPELINE</text>

        <g transform="translate(260, 146)">
          <line x1="-120" y1="0" x2="-40" y2="0" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 4"/>
          <line x1="40" y1="0" x2="120" y2="0" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4"/>

          <g transform="translate(-120, 0)">
            <circle cx="0" cy="0" r="26" fill="#1e293b" stroke="#0081fb" strokeWidth="2"/>
            <text x="0" y="4" textAnchor="middle" fill="#0081fb" fontSize="9" fontWeight="700">Meta API</text>
          </g>

          <g transform="translate(0, 0)">
            <rect x="-38" y="-24" width="76" height="48" rx="10" fill="#0f172a" stroke="#f43f5e" strokeWidth="2"/>
            <text x="0" y="-3" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="700">Webhook</text>
            <text x="0" y="11" textAnchor="middle" fill="#f43f5e" fontSize="8" fontWeight="600">Engine</text>
          </g>

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
  const cardRefs = useRef([]);
  const [activeStackIndex, setActiveStackIndex] = useState(1);

  // Smooth Stacking Parallax: scale down and dim earlier cards as newer cards stack over them
  useEffect(() => {
    let animFrame = null;

    const handleScroll = () => {
      const isMobile = window.innerWidth <= 900;
      const baseTop = isMobile ? 75 : 115;
      const stepTop = isMobile ? 18 : 28;
      const triggerDist = isMobile ? 220 : 320;

      const totalCards = PROJECTS.length;
      let topVisibleIndex = 1;

      for (let i = 0; i < totalCards; i++) {
        const currentCard = cardRefs.current[i];
        const nextCard = cardRefs.current[i + 1];

        if (!currentCard) continue;

        if (nextCard) {
          const nextRect = nextCard.getBoundingClientRect();
          const targetTop = baseTop + (i + 1) * stepTop;

          const distanceToStick = nextRect.top - targetTop;
          const overlapFactor = Math.max(0, Math.min(1, 1 - distanceToStick / triggerDist));

          const scale = 1 - overlapFactor * (isMobile ? 0.045 : 0.055);
          const brightness = 1 - overlapFactor * (isMobile ? 0.28 : 0.35);
          const translateY = overlapFactor * (isMobile ? -8 : -12);

          currentCard.style.transform = `scale(${scale.toFixed(4)}) translateY(${translateY.toFixed(2)}px)`;
          currentCard.style.filter = `brightness(${brightness.toFixed(3)})`;
          currentCard.style.opacity = `${(1 - overlapFactor * 0.12).toFixed(3)}`;

          if (distanceToStick <= 20) {
            topVisibleIndex = i + 2;
          }
        } else {
          currentCard.style.transform = 'scale(1) translateY(0px)';
          currentCard.style.filter = 'brightness(1)';
          currentCard.style.opacity = '1';
        }
      }

      setActiveStackIndex(Math.min(totalCards, topVisibleIndex));
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
    <>
      <section id="projects" className="work-parallax-section">
        {/* Left Social Dock */}
        <div className="work-left-dock" aria-hidden="true">
          <a href="https://github.com/Mohamedirfan2612" target="_blank" rel="noopener noreferrer" className="work-dock-link" aria-label="GitHub">
            <GithubIcon size={18} />
          </a>
          <a href="https://www.linkedin.com/in/mohamed-irfan-762527252?utm_source=share_via&utm_content=profile&utm_medium=member_ios" target="_blank" rel="noopener noreferrer" className="work-dock-link" aria-label="LinkedIn">
            <LinkedinIcon size={18} />
          </a>
          <a href="https://wa.me/916383007813" target="_blank" rel="noopener noreferrer" className="work-dock-link" aria-label="WhatsApp">
            <WhatsappIcon size={18} />
          </a>
        </div>

        {/* Ambient Radial Glows */}
        <div className="work-stack-glow-1" aria-hidden="true" />
        <div className="work-stack-glow-2" aria-hidden="true" />

        {/* Header Bar matching "My Work" UI with Live Stack Counter */}
        <div className="work-header-bar">
          <div className="work-title-group">
            <span className="work-glowing-dot" />
            <h2 className="work-main-title">
              My <span>Work</span>
            </h2>
          </div>

          <div className="work-badge-hint">
            <span className="work-deck-counter">0{activeStackIndex} / 0{PROJECTS.length}</span>
            <span>Sticky Parallax Deck · Click to inspect</span>
          </div>
        </div>

        {/* Sticky Stacking Deck Wrapper */}
        <div className="work-stack-deck">
          {PROJECTS.map((project, index) => (
            <div
              key={project.id}
              className="work-deck-slot"
              style={{
                '--stack-idx': index,
                zIndex: index + 1,
              }}
            >
              <article
                ref={(el) => (cardRefs.current[index] = el)}
                className="work-deck-card"
                onClick={() => setSelectedProject(project)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {/* Left Content (Title, Badge, Category, Tools, Description, Highlights) */}
                <div className="work-deck-content">
                  <div className="work-deck-card-top">
                    <span className="work-deck-number">{project.number}</span>
                    <div className="work-deck-meta">
                      <span className="work-badge-tag">{project.badge}</span>
                      <h3 className="work-deck-card-title">{project.title}</h3>
                      <span className="work-deck-category">{project.category}</span>
                    </div>
                  </div>

                  <h4 className="work-deck-subhead">Tools & Frameworks</h4>
                  <p className="work-deck-tools">{project.tools}</p>
                  <p className="work-deck-desc">{project.description}</p>

                  <div className="work-card-cta-row">
                    <span className="work-cta-hint">
                      <Layers size={13} /> View Architecture & Live Demo
                    </span>
                  </div>
                </div>

                {/* Right Architectural Vector Visual */}
                <div className="work-deck-visual">
                  {project.visual}
                </div>
              </article>
            </div>
          ))}
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
