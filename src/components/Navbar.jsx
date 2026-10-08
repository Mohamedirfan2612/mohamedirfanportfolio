import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import AudioVisualizer from './AudioVisualizer';
import { Terminal, Code2, Menu, X, FileDown, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Timeline", href: "#timeline" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Terminal", href: "#terminal" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(7, 7, 11, 0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
        padding: scrolled ? '14px 0' : '22px 0'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo */}
        <a
          href="#"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            color: '#ffffff',
            fontWeight: 800,
            fontSize: '1.25rem',
            fontFamily: 'var(--font-heading)',
            letterSpacing: '-0.02em'
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent-cyan) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(168, 85, 247, 0.5)'
            }}
          >
            <Code2 size={20} color="#ffffff" />
          </div>
          <span className="text-gradient font-heading" style={{ fontSize: '1.15rem' }}>
            {PERSONAL_INFO.handle}
          </span>
        </a>

        {/* Desktop Nav Items */}
        <div style={{ display: 'none', md: 'flex', alignItems: 'center', gap: '28px' }} className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 500,
                transition: 'color 0.2s ease',
                display: 'inline-block'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary-glow)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Action Controls & Audio */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <AudioVisualizer />

          <a
            href="#contact"
            className="btn-cyber-primary"
            style={{
              padding: '8px 18px',
              fontSize: '0.82rem',
              display: 'none',
              sm: 'inline-flex'
            }}
            id="hire-me-nav-btn"
          >
            <span className="pulse-dot"></span>
            <span>Hire Me</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-toggle"
            aria-label="Toggle navigation menu"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              color: '#ffffff',
              width: '38px',
              height: '38px',
              cursor: 'pointer'
            }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            top: '68px',
            left: 0,
            right: 0,
            background: 'rgba(7, 7, 11, 0.98)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid var(--border-subtle)',
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            zIndex: 99
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '1.05rem',
                fontFamily: 'var(--font-mono)',
                padding: '8px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
              }}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="btn-cyber-primary"
            style={{ marginTop: '10px' }}
          >
            <span className="pulse-dot"></span>
            <span>Hire Me</span>
          </a>
        </div>
      )}

      <style>{`
        @media (min-width: 860px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
        @media (min-width: 540px) {
          #hire-me-nav-btn {
            display: inline-flex !important;
          }
        }
      `}</style>
    </nav>
  );
}
