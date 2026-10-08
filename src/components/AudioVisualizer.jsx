import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AudioVisualizer() {
  const [on, setOn] = useState(false);
  const ctxRef = React.useRef(null);

  const toggle = () => {
    if (on) {
      ctxRef.current?.close();
      ctxRef.current = null;
      setOn(false);
    } else {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        ctxRef.current = ctx;
        const gain = ctx.createGain();
        gain.gain.value = 0.035;
        gain.connect(ctx.destination);
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 420;
        filter.connect(gain);
        [110, 164.81, 220, 329.63].forEach((f, i) => {
          const osc = ctx.createOscillator();
          osc.type = i % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.value = f;
          const lfo = ctx.createOscillator();
          const lfoGain = ctx.createGain();
          lfo.frequency.value = 0.18 + i * 0.04;
          lfoGain.gain.value = 2;
          lfo.connect(lfoGain);
          lfoGain.connect(osc.frequency);
          lfo.start();
          osc.connect(filter);
          osc.start();
        });
        setOn(true);
      } catch {}
    }
  };

  React.useEffect(() => () => ctxRef.current?.close(), []);

  return (
    <button
      onClick={toggle}
      title={on ? 'Mute ambient audio' : 'Play ambient audio'}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '7px',
        padding: '6px 12px',
        background: on ? 'rgba(37,99,235,0.15)' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${on ? 'rgba(37,99,235,0.4)' : 'var(--border-1)'}`,
        borderRadius: 'var(--r-full)',
        color: on ? 'var(--blue-bright)' : 'var(--text-400)',
        cursor: 'pointer', fontSize: '0.75rem',
        fontFamily: 'var(--font-code)', transition: 'all 0.2s ease'
      }}
    >
      {on ? (
        <>
          <div className="eq-bars">
            <div className="eq-bar" />
            <div className="eq-bar" />
            <div className="eq-bar" />
            <div className="eq-bar" />
          </div>
          <span>AUDIO ON</span>
        </>
      ) : (
        <>
          <VolumeX size={13} />
          <span>AUDIO</span>
        </>
      )}
    </button>
  );
}
