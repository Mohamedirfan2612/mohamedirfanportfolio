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
    <div className="app-wrapper" style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Background Animated Cyber Grid */}
      <div className="cyber-bg" />

      {/* Boot Preloader */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Main Portfolio Navigation */}
      <Navbar />

      {/* Hero Section with Interactive 3D WebGL Canvas */}
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

      {/* System Diagnostics & Telemetry Footer */}
      <Footer />
    </div>
  );
}
