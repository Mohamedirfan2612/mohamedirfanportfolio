import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import AudioVisualizer from './AudioVisualizer';
import { Code2, Menu, X, ArrowUpRight } from 'lucide-react';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Work', href: '#timeline' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Terminal', href: '#terminal' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: scrolled ? '12px 0' : '20px 0',
          background: scrolled ? 'rgba(4,5,9,0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
          transition: 'all 0.3s ease',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* Logo */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div style={{
              width: '34px', height: '34px', borderRadius: '8px',
              background: 'linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 12px rgba(37,99,235,0.5)',
              flexShrink: 0
            }}>
              <Code2 size={18} color="#fff" />
            </div>
            <span style={{
              fontFamily: 'var(--font-display)', fontWeight: 800,
              fontSize: '1.05rem', color: '#fff', letterSpacing: '-0.02em'
            }}>
              {PERSONAL_INFO.handle}
            </span>
          </a>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} className="hide-mobile">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                className="btn btn-ghost"
                style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--text-300)' }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-300)'}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <AudioVisualizer />
            <a href="#contact" className="btn btn-primary hide-mobile" style={{ fontSize: '0.85rem', padding: '9px 20px' }}>
              Hire Me
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                display: 'none', alignItems: 'center', justifyContent: 'center',
                width: '36px', height: '36px', background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--border-1)', borderRadius: 'var(--r-sm)',
                color: '#fff', cursor: 'pointer'
              }}
              className="show-mobile-only"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', top: '62px', left: 0, right: 0,
          background: 'rgba(4,5,9,0.98)', backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border-1)',
          padding: '20px 24px 28px',
          display: 'flex', flexDirection: 'column', gap: '4px',
          zIndex: 99, animation: 'fadeIn 0.2s ease'
        }}>
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                padding: '12px 8px', color: 'var(--text-200)', textDecoration: 'none',
                fontSize: '1rem', fontWeight: 500,
                borderBottom: '1px solid var(--border-1)'
              }}
            >
              {link.name}
            </a>
          ))}
          <a href="#contact" onClick={() => setMobileOpen(false)}
            className="btn btn-primary" style={{ marginTop: '16px' }}>
            Hire Me
          </a>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: none; } }
        @media (max-width: 768px) {
          nav .hide-mobile { display: none !important; }
          nav .show-mobile-only { display: flex !important; }
        }
      `}</style>
    </>
  );
}
