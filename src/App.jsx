import React, { useState, useEffect } from 'react';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MarqueeBanner from './components/MarqueeBanner';
import WhatIDo from './components/WhatIDo';
import ExperienceTimeline from './components/ExperienceTimeline';
import Projects from './components/Projects';
import TechStackGrid from './components/TechStackGrid';
import TerminalPlayground from './components/TerminalPlayground';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Prevent browser from restoring old scroll position on refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // 2. Remove hash on reload so browser does not jump down
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    // 3. Immediately scroll to the absolute top (Hero section)
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const handleLoaderDone = () => {
    setLoading(false);
    // Guarantee that when loader exits, user is looking at Hero section at the top
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Background layer */}
      <div className="site-bg" />

      {/* Full-screen portfolio loader */}
      {loading && <Loader onDone={handleLoaderDone} />}

      {/* Portfolio Content */}
      <Navbar />
      <main>
        <Hero />
        <MarqueeBanner />
        <WhatIDo />
        <ExperienceTimeline />
        <Projects />
        <TechStackGrid />
        <TerminalPlayground />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
