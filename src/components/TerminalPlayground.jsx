import React, { useState, useRef, useEffect } from 'react';
import { PERSONAL_INFO, PROJECTS_DATA, TIMELINE_DATA } from '../data/portfolioData';
import { CornerDownLeft } from 'lucide-react';

const COMMANDS = {
  help: () => `AVAILABLE COMMANDS:
  about       · Developer info & background
  experience  · Professional career history & roles
  skills      · Core technical stack & expertise
  education   · Academic background & certifications
  work        · List all featured projects with links
  projects    · Alias for work
  contact     · Email, socials & WhatsApp
  whatsapp    · Direct WhatsApp chat
  hire        · Availability & hiring info
  clear       · Clear this terminal
  matrix      · A little easter egg`,

  about: () => `${PERSONAL_INFO.name}  |  ${PERSONAL_INFO.role}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${PERSONAL_INFO.bio}
Experience: ${PERSONAL_INFO.yearsExperience} Years  ·  Projects: ${PERSONAL_INFO.projectsCompleted}`,

  experience: () => `WORK EXPERIENCE & CAREER TIMELINE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
` + TIMELINE_DATA.map((t, i) => `[${i + 1}] ${t.role} (${t.year} · ${t.status})
    Company: ${t.company}
    Summary: ${t.description}
    Impact:  ${t.highlights.join(' · ')}`).join('\n\n'),

  exp: () => `WORK EXPERIENCE & CAREER TIMELINE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
` + TIMELINE_DATA.map((t, i) => `[${i + 1}] ${t.role} (${t.year} · ${t.status})
    Company: ${t.company}
    Summary: ${t.description}
    Impact:  ${t.highlights.join(' · ')}`).join('\n\n'),

  skills: () => `CORE TECHNICAL STACK:
━━━━━━━━━━━━━━━━━━━━━━
Frontend  →  React 18, Next.js, Redux, TypeScript, Three.js
Backend   →  Node.js, Express.js, REST APIs, GraphQL, Socket.io
Database  →  MongoDB, Mongoose, Redis, PostgreSQL
DevOps    →  Docker, AWS, GitHub Actions, NGINX`,

  stack: () => `CORE TECHNICAL STACK:
━━━━━━━━━━━━━━━━━━━━━━
Frontend  →  React 18, Next.js, Redux, TypeScript, Three.js
Backend   →  Node.js, Express.js, REST APIs, GraphQL, Socket.io
Database  →  MongoDB, Mongoose, Redis, PostgreSQL
DevOps    →  Docker, AWS, GitHub Actions, NGINX`,

  education: () => `EDUCATION & QUALIFICATIONS:
━━━━━━━━━━━━━━━━━━━━━━━━━━
[1] B.E. Computer Science & Engineering — Mailam Engineering College (2024)
[2] Java Full Stack Development — GUVI Geek Network (2025)`,

  work: () => PROJECTS_DATA.map((p, i) => `[${i + 1}] ${p.title}\n    Stack: ${p.badge}\n    Demo:  ${p.liveUrl}`).join('\n\n'),

  projects: () => PROJECTS_DATA.map((p, i) => `[${i + 1}] ${p.title}\n    Stack: ${p.badge}\n    Demo:  ${p.liveUrl}`).join('\n\n'),

  contact: () => `EMAIL:      ${PERSONAL_INFO.email}
PHONE/WA:   ${PERSONAL_INFO.whatsapp}
GITHUB:     ${PERSONAL_INFO.socials.github}
LINKEDIN:   ${PERSONAL_INFO.socials.linkedin}
STATUS:     ${PERSONAL_INFO.availability}`,

  whatsapp: () => `WHATSAPP / PHONE:
━━━━━━━━━━━━━━━━━
Number : ${PERSONAL_INFO.whatsapp}
Status : Available on WhatsApp & Call`,

  phone: () => `WHATSAPP / PHONE:
━━━━━━━━━━━━━━━━━
Number : ${PERSONAL_INFO.whatsapp}
Status : Available on WhatsApp & Call`,

  hire: () => `>>> AVAILABILITY: OPEN FOR WORK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${PERSONAL_INFO.name} is available for full-time roles and high-impact contracts.
→ Email: ${PERSONAL_INFO.email}`,

  matrix: () => `01001101 01000101 01010010 01001110\n>>> FOLLOW THE WHITE RABBIT, NEO.`,
};

function renderTextWithLinks(text) {
  if (typeof text !== 'string') return text;
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);

  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: 'inherit',
            textDecoration: 'underline',
            textUnderlineOffset: '2px',
            cursor: 'pointer'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {part}
        </a>
      );
    }
    return part;
  });
}

export default function TerminalPlayground() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: `Mohamed Irfan CLI  v1.0.0  ·  Node ${typeof navigator !== 'undefined' && navigator.userAgent.includes('Chrome') ? 'Chrome' : 'Browser'}` },
    { type: 'muted', text: 'Type "help" to see all available commands.' },
  ]);
  const outputRef = useRef(null);
  const inputRef = useRef(null);
  const isInitial = useRef(true);

  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;
      return;
    }
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  const run = (e) => {
    e.preventDefault();
    const raw = input.trim();
    if (!raw) return;

    const cmd = raw.toLowerCase();
    const next = [...history, { type: 'input', text: `$ ${raw}` }];

    if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    let fn = COMMANDS[cmd];
    if (!fn) {
      if (cmd === 'skill' || cmd === 'skills') fn = COMMANDS.skills;
      else if (cmd === 'experience' || cmd === 'exp' || cmd === 'experince' || cmd === 'career') fn = COMMANDS.experience;
      else if (cmd === 'project' || cmd === 'projects' || cmd === 'work') fn = COMMANDS.work;
      else if (cmd === 'education' || cmd === 'edu') fn = COMMANDS.education;
      else if (cmd === 'contact' || cmd === 'email') fn = COMMANDS.contact;
      else if (cmd === 'whatsapp' || cmd === 'wa' || cmd === 'chat' || cmd === 'phone' || cmd === 'number') fn = COMMANDS.whatsapp;
    }

    next.push(fn
      ? { type: 'output', text: fn() }
      : { type: 'error', text: `Command not found: "${raw}". Type "help" for the command list.` }
    );

    setHistory(next);
    setInput('');
  };

  return (
    <section id="terminal" className="section">
      <div className="container">
        
        <div className="section-header">
          <span className="section-label">Playground</span>
          <h2 className="display-2">Interactive CLI</h2>
          <p>Query my profile, projects, and skills directly from the terminal.</p>
        </div>

        <div
          style={{ maxWidth: '800px' }}
          onClick={() => inputRef.current?.focus()}
        >
          <div className="card" style={{
            background: 'rgba(4,5,9,0.95)',
            border: '1px solid var(--border-2)',
            borderRadius: 'var(--r-lg)',
            overflow: 'hidden',
            cursor: 'text'
          }}>
            {/* Title bar */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 18px', background: 'rgba(255,255,255,0.025)',
              borderBottom: '1px solid var(--border-1)'
            }}>
              <div style={{ display: 'flex', gap: '7px' }}>
                {['#ef4444', '#eab308', '#22c55e'].map((c, i) => (
                  <span key={i} style={{ width: '11px', height: '11px', borderRadius: '50%', background: c, opacity: 0.8 }} />
                ))}
              </div>
              <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.78rem', color: 'var(--text-400)' }}>
                irfan@portfolio ~ bash
              </span>
              <div />
            </div>

            {/* Output area */}
            <div
              ref={outputRef}
              style={{
                padding: '20px', minHeight: '260px', maxHeight: '380px', overflowY: 'auto',
                fontFamily: 'var(--font-code)', fontSize: '0.86rem', lineHeight: 1.65
              }}
            >
              {history.map((line, i) => (
                <div key={i} style={{
                  marginBottom: '6px',
                  whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                  color: line.type === 'input' ? '#fff'
                    : line.type === 'system' ? 'var(--cyan-light)'
                    : line.type === 'muted' ? 'var(--text-400)'
                    : line.type === 'error' ? '#f87171'
                    : 'var(--blue-bright)'
                }}>
                  {renderTextWithLinks(line.text)}
                </div>
              ))}
            </div>

            {/* Input row */}
            <form onSubmit={run} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '12px 18px',
              borderTop: '1px solid var(--border-1)',
              background: 'rgba(0,0,0,0.3)'
            }}>
              <span style={{ fontFamily: 'var(--font-code)', color: 'var(--blue-light)', fontWeight: 700, flexShrink: 0 }}>❯</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="type a command…"
                autoComplete="off"
                spellCheck={false}
                style={{
                  flex: 1, background: 'transparent', border: 'none', outline: 'none',
                  color: '#fff', fontFamily: 'var(--font-code)', fontSize: '0.86rem'
                }}
              />
              <button type="submit" style={{
                background: 'transparent', border: 'none',
                color: 'var(--text-400)', cursor: 'pointer', display: 'flex'
              }}>
                <CornerDownLeft size={15} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
