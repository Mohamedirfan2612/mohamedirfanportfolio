import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AudioVisualizer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const oscNodesRef = useRef([]);

  const toggleAudio = () => {
    if (isPlaying) {
      // Stop audio
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
      setIsPlaying(false);
    } else {
      // Start ambient synth with Web Audio API
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        audioCtxRef.current = ctx;

        // Create warm ambient sci-fi chords
        const freqs = [110, 164.81, 220, 329.63]; // A2, E3, A3, E4 chord
        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.04, ctx.currentTime);
        gainNode.connect(ctx.destination);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, ctx.currentTime);
        filter.connect(gainNode);

        const nodes = freqs.map((f, i) => {
          const osc = ctx.createOscillator();
          osc.type = i % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(f, ctx.currentTime);

          // Subtle LFO modulation for breathing cyber feel
          const lfo = ctx.createOscillator();
          const lfoGain = ctx.createGain();
          lfo.frequency.setValueAtTime(0.2 + i * 0.05, ctx.currentTime);
          lfoGain.gain.setValueAtTime(2.5, ctx.currentTime);
          lfo.connect(lfoGain);
          lfoGain.connect(osc.frequency);
          lfo.start();

          osc.connect(filter);
          osc.start();
          return { osc, lfo };
        });

        oscNodesRef.current = nodes;
        setIsPlaying(true);
      } catch (err) {
        console.warn("Audio context not allowed or failed:", err);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <button
      onClick={toggleAudio}
      className="audio-btn"
      title={isPlaying ? "Mute Ambient Synth" : "Play Cyber Ambient Sound"}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 14px',
        background: isPlaying ? 'rgba(168, 85, 247, 0.2)' : 'rgba(255, 255, 255, 0.05)',
        border: `1px solid ${isPlaying ? 'var(--primary)' : 'var(--border-subtle)'}`,
        borderRadius: 'var(--radius-full)',
        color: isPlaying ? 'var(--primary-glow)' : 'var(--text-secondary)',
        cursor: 'pointer',
        fontSize: '0.78rem',
        fontFamily: 'var(--font-mono)',
        transition: 'all 0.2s ease',
      }}
    >
      {isPlaying ? (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '14px' }}>
            <span className="eq-bar" style={{ animationDuration: '0.8s' }}></span>
            <span className="eq-bar" style={{ animationDuration: '1.2s' }}></span>
            <span className="eq-bar" style={{ animationDuration: '0.6s' }}></span>
            <span className="eq-bar" style={{ animationDuration: '1.0s' }}></span>
          </div>
          <span style={{ fontWeight: 600 }}>AUDIO ON</span>
        </>
      ) : (
        <>
          <VolumeX size={14} />
          <span>AUDIO OFF</span>
        </>
      )}
    </button>
  );
}
