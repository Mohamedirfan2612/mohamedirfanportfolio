import React, { useState, useRef, useEffect } from 'react';
import { PERSONAL_INFO, PROJECTS_DATA } from '../data/portfolioData';
import { Terminal as TerminalIcon, Sparkles, CornerDownLeft, Circle } from 'lucide-react';

export default function TerminalPlayground() {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: '⚡ MOHAMED IRFAN CYBER-SHELL v2.6.0 (x86_64-node-mern)' },
    { type: 'system', text: 'Type "help" to see available terminal commands, or "projects" to list applications.' }
  ]);

  const terminalEndRef = useRef(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, { type: 'user', text: `$ ${inputVal}` }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `AVAILABLE COMMANDS:
  • about      - Learn about Mohamed Irfan & background
  • stack      - View core MERN stack & architectural skills
  • projects   - List featured projects and live demos
  • contact    - Get email & direct social links
  • hire       - Instant hiring information & availability
  • matrix     - Enter the matrix stream
  • sudo       - Request root privileges
  • clear      - Clear terminal screen`
        });
        break;

      case 'about':
      case 'bio':
        newHistory.push({
          type: 'output',
          text: `Name: ${PERSONAL_INFO.name}
Role: ${PERSONAL_INFO.role}
Bio: ${PERSONAL_INFO.bio}
Experience: ${PERSONAL_INFO.yearsExperience} Years | Shipped: ${PERSONAL_INFO.projectsCompleted}`
        });
        break;

      case 'stack':
      case 'skills':
        newHistory.push({
          type: 'output',
          text: `[CORE STACK]
• Frontend: React 18, Next.js, Redux Toolkit, JavaScript ES6+, TypeScript, Three.js
• Backend: Node.js, Express.js, RESTful APIs, GraphQL, Socket.io, JWT
• Database: MongoDB, Mongoose, Redis Caching, PostgreSQL
• DevOps: Docker, AWS (S3/EC2), NGINX, GitHub Actions CI/CD`
        });
        break;

      case 'projects':
        newHistory.push({
          type: 'output',
          text: PROJECTS_DATA.map(
            (p, idx) => `[${idx + 1}] ${p.title} (${p.badge})\n    Demo: ${p.liveUrl}\n    Code: ${p.githubUrl}`
          ).join('\n\n')
        });
        break;

      case 'contact':
        newHistory.push({
          type: 'output',
          text: `📧 Email: ${PERSONAL_INFO.email}
💼 LinkedIn: ${PERSONAL_INFO.socials.linkedin}
🐙 GitHub: ${PERSONAL_INFO.socials.github}
🐦 Twitter: ${PERSONAL_INFO.socials.twitter}
📱 Status: ${PERSONAL_INFO.availability}`
        });
        break;

      case 'hire':
        newHistory.push({
          type: 'output',
          text: `>>> INITIATING RAPID HIRE PROTOCOL...
Mohamed Irfan is currently: [AVAILABLE FOR CONTRACTS & FULL-TIME ROLES]
Direct Email: ${PERSONAL_INFO.email}
Reach out via the contact form below or drop an email for immediate response!`
        });
        break;

      case 'matrix':
        newHistory.push({
          type: 'output',
          text: `01001101 01000101 01010010 01001110 00100000 01010011 01010100 01000001 01000011 01001011 
WAKE UP, NEO... THE MERN ECOSYSTEM HAS YOU. FOLLOW THE WHITE RABBIT.`
        });
        break;

      case 'sudo':
        newHistory.push({
          type: 'output',
          text: `Permission denied: Mohamed Irfan is already root on this server.`
        });
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        newHistory.push({
          type: 'output',
          text: `Command not recognized: "${cmd}". Type "help" for a list of valid commands.`
        });
        break;
    }

    setHistory(newHistory);
    setInputVal('');
  };

  return (
    <section id="terminal" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-neon" style={{ marginBottom: '14px' }}>
            <span>INTERACTIVE PLAYGROUND</span>
          </div>
          <h2 className="neon-title text-gradient" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Cyber CLI Terminal
          </h2>
          <p className="section-subtitle">
            Prefer keyboard shortcuts? Query my credentials, architecture, and live projects directly from the shell.
          </p>
        </div>

        {/* Terminal Window Box */}
        <div
          className="glass-panel"
          style={{
            maxWidth: '860px',
            margin: '0 auto',
            background: 'rgba(9, 7, 15, 0.95)',
            border: '1px solid var(--border-glow)',
            boxShadow: 'var(--glow-md)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden'
          }}
        >
          {/* Terminal Titlebar */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              borderBottom: '1px solid var(--border-subtle)',
              padding: '12px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444', display: 'inline-block' }}></span>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#eab308', display: 'inline-block' }}></span>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}></span>
            </div>

            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <TerminalIcon size={14} color="var(--primary-glow)" />
              <span>irfan@cyber-workstation:~</span>
            </div>

            <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              bash 5.2.15
            </div>
          </div>

          {/* Terminal Output Area */}
          <div
            style={{
              padding: '24px',
              minHeight: '280px',
              maxHeight: '400px',
              overflowY: 'auto',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.88rem',
              lineHeight: 1.6
            }}
          >
            {history.map((line, idx) => (
              <div
                key={idx}
                style={{
                  marginBottom: '10px',
                  color: line.type === 'user'
                    ? '#ffffff'
                    : line.type === 'system'
                    ? 'var(--accent-cyan-glow)'
                    : 'var(--text-accent)',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word'
                }}
              >
                {line.text}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Terminal Input Row */}
          <form
            onSubmit={handleCommand}
            style={{
              borderTop: '1px solid var(--border-subtle)',
              padding: '14px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'rgba(0, 0, 0, 0.4)'
            }}
          >
            <span style={{ color: 'var(--primary-glow)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
              ➜
            </span>
            <span style={{ color: 'var(--accent-cyan-glow)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
              ~/portfolio
            </span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="type 'help', 'stack', 'projects', 'contact'..."
              aria-label="Terminal input command"
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#ffffff',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem'
              }}
            />
            <button
              type="submit"
              aria-label="Submit command"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--primary-glow)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <CornerDownLeft size={16} />
            </button>
          </form>

        </div>

      </div>
    </section>
  );
}
