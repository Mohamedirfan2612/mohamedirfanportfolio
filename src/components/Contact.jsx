import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import confetti from 'canvas-confetti';
import { Mail, Copy, Check, Send, MapPin, ArrowRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon, WhatsappIcon } from './Icons';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.65 }, colors: ['#2563eb', '#06b6d4', '#ffffff'] });
    setTimeout(() => {
      setLoading(false);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 900);
  };

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const inputStyle = {
    width: '100%', padding: '11px 14px',
    background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-1)',
    borderRadius: 'var(--r-sm)', color: 'var(--text-200)',
    fontFamily: 'var(--font-body)', fontSize: '0.9rem', outline: 'none',
    transition: 'border-color 0.2s, background 0.2s',
  };

  const focusStyle = e => { e.currentTarget.style.borderColor = 'var(--border-blue)'; e.currentTarget.style.background = 'rgba(37,99,235,0.06)'; };
  const blurStyle = e => { e.currentTarget.style.borderColor = 'var(--border-1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; };

  return (
    <section id="contact" className="section">
      <div className="container">

        <div className="section-header">
          <span className="section-label">Contact</span>
          <h2 className="display-2">Let's Work Together</h2>
          <p>
            Have a project in mind or a role to fill? Drop a message and I'll get back to you quickly.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', maxWidth: '1000px' }}>
          
          {/* === Left Info Panel === */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Email CTA */}
            <div className="card" style={{ padding: '24px 22px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '9px',
                  background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blue-bright)'
                }}>
                  <Mail size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-400)', fontFamily: 'var(--font-code)', marginBottom: '2px' }}>
                    DIRECT EMAIL
                  </div>
                  <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.92rem' }}>
                    {PERSONAL_INFO.email}
                  </div>
                </div>
              </div>
              <button onClick={copyEmail} className="btn btn-secondary" style={{ width: '100%', fontSize: '0.84rem' }}>
                {copied ? (<><Check size={14} color="#10b981" /><span style={{ color: '#10b981' }}>Copied!</span></>) : (<><Copy size={14} /> Copy Email</>)}
              </button>
            </div>

            {/* Availability */}
            <div className="card" style={{ padding: '20px 22px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <span className="status-dot" />
                <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.78rem', color: '#6ee7b7', fontWeight: 600 }}>
                  OPEN TO WORK
                </span>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-300)', lineHeight: 1.6, marginBottom: '12px' }}>
                {PERSONAL_INFO.availability}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.83rem', color: 'var(--text-400)' }}>
                <MapPin size={13} color="var(--blue-light)" />
                <span>{PERSONAL_INFO.location} · Remote Worldwide</span>
              </div>
            </div>

            {/* Socials */}
            <div className="card" style={{ padding: '20px 22px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-400)', fontFamily: 'var(--font-code)', marginBottom: '14px' }}>
                FIND ME ON
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                {[
                  { href: PERSONAL_INFO.socials.github, icon: <GithubIcon size={17} />, label: 'GitHub' },
                  { href: PERSONAL_INFO.socials.linkedin, icon: <LinkedinIcon size={17} />, label: 'LinkedIn' },
                  { href: `https://wa.me/${(PERSONAL_INFO.whatsapp || '').replace(/\D/g, '')}`, icon: <WhatsappIcon size={17} />, label: 'WhatsApp' },
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="btn btn-secondary" style={{ flex: 1, padding: '10px 8px' }} title={s.label}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* === Right Form === */}
          <div className="card" style={{ padding: '28px 26px' }}>
            <h3 style={{ fontWeight: 700, fontSize: '1.2rem', color: '#fff', marginBottom: '6px' }}>
              Send a Message
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-400)', marginBottom: '24px' }}>
              I respond to all inquiries within 24 hours.
            </p>

            {status === 'success' ? (
              <div style={{
                padding: '28px', textAlign: 'center',
                background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.2)',
                borderRadius: 'var(--r-md)'
              }}>
                <div style={{ fontSize: '2.2rem', marginBottom: '10px' }}>🎉</div>
                <div style={{ fontWeight: 700, color: '#fff', marginBottom: '6px' }}>Message Sent!</div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-300)' }}>
                  I'll get back to you shortly.
                </div>
                <button
                  onClick={() => setStatus('')}
                  className="btn btn-secondary"
                  style={{ marginTop: '18px', fontSize: '0.84rem' }}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label className="label">Name *</label>
                    <input type="text" required value={form.name} onChange={set('name')}
                      placeholder="Your name" style={inputStyle}
                      onFocus={focusStyle} onBlur={blurStyle} />
                  </div>
                  <div>
                    <label className="label">Email *</label>
                    <input type="email" required value={form.email} onChange={set('email')}
                      placeholder="you@email.com" style={inputStyle}
                      onFocus={focusStyle} onBlur={blurStyle} />
                  </div>
                </div>

                <div>
                  <label className="label">Subject</label>
                  <input type="text" value={form.subject} onChange={set('subject')}
                    placeholder="Project, Collaboration, Role…" style={inputStyle}
                    onFocus={focusStyle} onBlur={blurStyle} />
                </div>

                <div>
                  <label className="label">Message *</label>
                  <textarea required rows={4} value={form.message} onChange={set('message')}
                    placeholder="Tell me about your project or opportunity…"
                    style={{ ...inputStyle, resize: 'vertical', minHeight: '110px' }}
                    onFocus={focusStyle} onBlur={blurStyle} />
                </div>

                {status && status !== 'success' && (
                  <div style={{ fontSize: '0.84rem', color: '#f87171', fontFamily: 'var(--font-code)' }}>
                    {status}
                  </div>
                )}

                <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', marginTop: '4px' }}>
                  {loading ? 'Sending…' : (<>Send Message <Send size={15} /></>)}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
