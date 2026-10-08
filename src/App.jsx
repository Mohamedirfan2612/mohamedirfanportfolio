import React, { useState } from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MarqueeBanner from './components/MarqueeBanner';
import WhatIDo from './components/WhatIDo';
import ExperienceTimeline from './components/ExperienceTimeline';
import Projects from './components/Projects';
import SkillsMatrix from './components/SkillsMatrix';
import TerminalPlayground from './components/TerminalPlayground';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Background layer */}
      <div className="site-bg" />

      {/* Preloader */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* App */}
      {!loading && (
        <>
          <Navbar />
          <main>
            <Hero />
            <MarqueeBanner />
            <WhatIDo />
            <ExperienceTimeline />
            <Projects />
            <SkillsMatrix />
            <TerminalPlayground />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
