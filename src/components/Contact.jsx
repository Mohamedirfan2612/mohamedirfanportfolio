import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import confetti from 'canvas-confetti';
import { Mail, Copy, Check, Send, MapPin, MessageSquare } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './Icons';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [copied, setCopied] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatusMsg('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setStatusMsg('');

    // Trigger celebratory confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#a855f7', '#06b6d4', '#ec4899', '#ffffff']
    });

    setTimeout(() => {
      setLoading(false);
      setStatusMsg('Message transmitted successfully! Mohamed Irfan will respond shortly.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  return (
    <section id="contact" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-neon" style={{ marginBottom: '14px' }}>
            <span>CONNECT & COLLABORATE</span>
          </div>
          <h2 className="neon-title text-gradient" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Let's Build Something Exceptional
          </h2>
          <p className="section-subtitle">
            Have a project idea, contract opportunity, or full-time position? Reach out directly and let's turn your vision into code.
          </p>
        </div>

        {/* Contact Grid: Info & Form */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '36px',
            maxWidth: '1080px',
            margin: '0 auto'
          }}
        >
          {/* Left Column: Direct Info & Social Matrix */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Email Card with Copy Trigger */}
            <div
              className="glass-panel"
              style={{
                padding: '30px 26px',
                background: 'rgba(15, 12, 26, 0.85)',
                border: '1px solid var(--border-glow)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '10px',
                    background: 'rgba(168, 85, 247, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary-glow)'
                  }}
                >
                  <Mail size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    DIRECT EMAIL
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
                    {PERSONAL_INFO.email}
                  </div>
                </div>
              </div>

              <button
                onClick={copyEmail}
                className="btn-cyber-secondary"
                style={{ width: '100%', fontSize: '0.82rem', padding: '10px' }}
              >
                {copied ? (
                  <>
                    <Check size={16} color="#10b981" />
                    <span style={{ color: '#10b981' }}>Email Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    <span>Copy Email Address</span>
                  </>
                )}
              </button>
            </div>

            {/* Availability & Location Card */}
            <div
              className="glass-panel"
              style={{
                padding: '24px 26px',
                background: 'rgba(15, 12, 26, 0.75)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <span className="pulse-dot"></span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: '#10b981', fontWeight: 600 }}>
                  CURRENT STATUS: OPEN FOR WORK
                </span>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
                {PERSONAL_INFO.availability}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.84rem' }}>
                <MapPin size={15} color="var(--primary-glow)" />
                <span>Based in {PERSONAL_INFO.location} • Available Globally (Remote)</span>
              </div>
            </div>

            {/* Social Network Matrix */}
            <div
              className="glass-panel"
              style={{
                padding: '24px 26px',
                background: 'rgba(15, 12, 26, 0.75)'
              }}
            >
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '14px' }}>
                CONNECT ON SOCIAL CHANNELS
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <a
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cyber-secondary"
                  style={{ padding: '10px 14px', flex: 1 }}
                  title="GitHub"
                >
                  <GithubIcon size={18} />
                </a>
                <a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cyber-secondary"
                  style={{ padding: '10px 14px', flex: 1 }}
                  title="LinkedIn"
                >
                  <LinkedinIcon size={18} />
                </a>
                <a
                  href={PERSONAL_INFO.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cyber-secondary"
                  style={{ padding: '10px 14px', flex: 1 }}
                  title="Twitter / X"
                >
                  <TwitterIcon size={18} />
                </a>
                <a
                  href={PERSONAL_INFO.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cyber-secondary"
                  style={{ padding: '10px 14px', flex: 1 }}
                  title="WhatsApp"
                >
                  <MessageSquare size={18} />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Message Form */}
          <div
            className="glass-panel"
            style={{
              padding: '36px 30px',
              background: 'rgba(15, 12, 26, 0.85)',
              border: '1px solid var(--border-subtle)',
              position: 'relative'
            }}
          >
            <div className="cyber-corner-top-left"></div>
            <div className="cyber-corner-bottom-right"></div>

            <h3 className="font-heading" style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '8px' }}>
              Transmit Message
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '24px' }}>
              Fill out the form below to initiate direct communication.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-accent)', marginBottom: '6px' }}>
                  YOUR NAME *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Morgan"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    color: '#ffffff',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.92rem',
                    outline: 'none',
                    transition: 'border 0.2s ease'
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--primary)')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-accent)', marginBottom: '6px' }}>
                  EMAIL ADDRESS *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@company.com"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    color: '#ffffff',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.92rem',
                    outline: 'none',
                    transition: 'border 0.2s ease'
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--primary)')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-accent)', marginBottom: '6px' }}>
                  SUBJECT
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Project Opportunity / Full-time Role"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    color: '#ffffff',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.92rem',
                    outline: 'none',
                    transition: 'border 0.2s ease'
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--primary)')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-accent)', marginBottom: '6px' }}>
                  MESSAGE *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your project, timeline, or inquiries..."
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    color: '#ffffff',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.92rem',
                    outline: 'none',
                    resize: 'vertical',
                    transition: 'border 0.2s ease'
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--primary)')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
                />
              </div>

              {statusMsg && (
                <div
                  style={{
                    padding: '10px 14px',
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    fontFamily: 'var(--font-mono)',
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid #10b981',
                    color: '#34d399'
                  }}
                >
                  {statusMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-cyber-primary"
                style={{ width: '100%', marginTop: '6px' }}
              >
                {loading ? (
                  <span>Transmitting...</span>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
