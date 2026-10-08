import React, { useState } from 'react';
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

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Background layer */}
      <div className="site-bg" />

      {/* Full-screen portfolio loader */}
      {loading && <Loader onDone={() => setLoading(false)} initials="MI" />}

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
