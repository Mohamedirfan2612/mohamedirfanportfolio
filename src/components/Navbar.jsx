import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import AudioVisualizer from './AudioVisualizer';
import { Code2, Menu, X, ArrowUpRight } from 'lucide-react';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Education', href: '#education' },
  { name: 'Work', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Terminal', href: '#terminal' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#about');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);

      const sections = navLinks.map(l => l.href.substring(1));
      const scrollPos = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveLink('#' + sections[i]);
          return;
        }
      }
      if (window.scrollY < 200) setActiveLink('#about');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
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
          padding: scrolled ? '12px 0' : '18px 0',
          background: scrolled ? 'rgba(4, 6, 14, 0.92)' : 'rgba(4, 6, 14, 0.65)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: scrolled ? '1px solid rgba(56, 189, 248, 0.12)' : '1px solid rgba(255, 255, 255, 0.05)',
          boxShadow: scrolled ? '0 10px 30px rgba(0, 0, 0, 0.6)' : 'none',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          
          {/* Logo with clean single-line Inter font matching entire UI */}
          <a
            href="#"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              textDecoration: 'none',
              flexShrink: 0,
              whiteSpace: 'nowrap'
            }}
          >
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 16px rgba(56, 189, 248, 0.45)',
              flexShrink: 0
            }}>
              <Code2 size={19} color="#fff" />
            </div>

            <span style={{
              fontFamily: 'var(--font-body, Inter, sans-serif)',
              fontWeight: 700,
              fontSize: '1.15rem',
              color: '#ffffff',
              letterSpacing: '-0.02em',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}>
              Mohamed <span style={{ color: '#38bdf8' }}>Irfan</span>
            </span>
          </a>

          {/* Desktop Nav Links using clean Inter UI font */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: 'rgba(255, 255, 255, 0.02)',
              padding: '4px 6px',
              borderRadius: '99px',
              border: '1px solid rgba(255, 255, 255, 0.06)'
            }}
            className="hide-mobile"
          >
            {navLinks.map(link => {
              const isActive = activeLink === link.href;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-body, Inter, sans-serif)',
                    fontSize: '0.86rem',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? '#38bdf8' : '#94a3b8',
                    background: isActive ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
                    border: isActive ? '1px solid rgba(56, 189, 248, 0.28)' : '1px solid transparent',
                    padding: '6px 14px',
                    borderRadius: '99px',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#94a3b8';
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Right Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <AudioVisualizer />

            <a
              href="#contact"
              className="hide-mobile"
              style={{
                fontFamily: 'var(--font-body, Inter, sans-serif)',
                fontSize: '0.86rem',
                fontWeight: 600,
                padding: '8px 20px',
                borderRadius: '99px',
                background: 'linear-gradient(135deg, #2563eb 0%, #0284c7 100%)',
                color: '#ffffff',
                textDecoration: 'none',
                boxShadow: '0 0 18px rgba(37, 99, 235, 0.45)',
                border: '1px solid rgba(56, 189, 248, 0.35)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                whiteSpace: 'nowrap',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 0 25px rgba(56, 189, 248, 0.65)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 0 18px rgba(37, 99, 235, 0.45)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Hire Me
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(56, 189, 248, 0.2)',
                borderRadius: '10px',
                color: '#fff',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              className="show-mobile-only"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div style={{
          position: 'fixed',
          top: '64px',
          left: 0,
          right: 0,
          background: 'rgba(4, 6, 14, 0.98)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(56, 189, 248, 0.2)',
          padding: '20px 24px 28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          zIndex: 99,
          animation: 'fadeIn 0.2s ease'
        }}>
          {navLinks.map(link => {
            const isActive = activeLink === link.href;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  padding: '12px 14px',
                  color: isActive ? '#38bdf8' : '#e2e8f0',
                  background: isActive ? 'rgba(56, 189, 248, 0.08)' : 'transparent',
                  textDecoration: 'none',
                  fontSize: '0.98rem',
                  fontWeight: isActive ? 600 : 500,
                  fontFamily: 'var(--font-body, Inter, sans-serif)',
                  borderRadius: '8px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.04)'
                }}
              >
                {link.name}
              </a>
            );
          })}

          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            style={{
              marginTop: '14px',
              fontFamily: 'var(--font-body, Inter, sans-serif)',
              fontSize: '0.95rem',
              fontWeight: 600,
              padding: '12px 20px',
              borderRadius: '99px',
              background: 'linear-gradient(135deg, #2563eb 0%, #0284c7 100%)',
              color: '#ffffff',
              textAlign: 'center',
              textDecoration: 'none',
              boxShadow: '0 0 20px rgba(37, 99, 235, 0.45)',
              border: '1px solid rgba(56, 189, 248, 0.35)'
            }}
          >
            Hire Me
          </a>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: none; }
        }
        @media (max-width: 900px) {
          nav .hide-mobile { display: none !important; }
          nav .show-mobile-only { display: flex !important; }
        }
      `}</style>
    </>
  );
}
