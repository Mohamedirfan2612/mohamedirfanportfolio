import React, { useRef, useState, useEffect } from 'react';
import heroVideo from '../videos/portfoliovideo.mp4';

export default function HeroVideoTracker() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isReversed, setIsReversed] = useState(false);
  const [tiltStyle, setTiltStyle] = useState('');

  const targetTimeRef = useRef(0);
  const isSeekingRef = useRef(false);

  // Initialize and preload video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoaded = () => {
      if (video.duration && !isNaN(video.duration)) {
        targetTimeRef.current = video.duration * 0.5;
        video.currentTime = video.duration * 0.5;
      }
    };

    video.addEventListener('loadedmetadata', onLoaded);
    return () => video.removeEventListener('loadedmetadata', onLoaded);
  }, []);

  // Instant & smooth seek synchronization with the video decoder
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animId;

    const performSeek = () => {
      if (video.duration && !isNaN(video.duration)) {
        const target = targetTimeRef.current;
        // Only trigger seek if browser is ready and target has changed noticeably
        if (!video.seeking && Math.abs(video.currentTime - target) > 0.02) {
          if (typeof video.fastSeek === 'function') {
            video.fastSeek(target);
          } else {
            video.currentTime = target;
          }
        }
      }
      animId = requestAnimationFrame(performSeek);
    };

    animId = requestAnimationFrame(performSeek);

    return () => cancelAnimationFrame(animId);
  }, []);

  // Highly responsive mouse tracking centered on the avatar
  useEffect(() => {
    const handleMouseMove = (e) => {
      const video = videoRef.current;
      const container = containerRef.current;
      if (!video || !video.duration || isNaN(video.duration)) return;

      // 1. Calculate position relative to avatar center for immediate high sensitivity
      let normX = 0.5;
      if (container) {
        const rect = container.getBoundingClientRect();
        const avatarCenterX = rect.left + rect.width / 2;
        const avatarCenterY = rect.top + rect.height * 0.4;

        // Spread sensitivity around avatar (approx +/- 450px covers comfortable mouse area)
        const rangeX = Math.max(window.innerWidth * 0.45, 400);
        const deltaX = (e.clientX - avatarCenterX) / rangeX;
        normX = 0.5 + deltaX * 0.5;

        // Subtle zero-latency 3D face tilt
        const tiltY = Math.max(-12, Math.min(12, deltaX * 14));
        const deltaY = (e.clientY - avatarCenterY) / 300;
        const tiltX = Math.max(-10, Math.min(10, -deltaY * 12));
        setTiltStyle(`perspective(800px) rotateY(${tiltY}deg) rotateX(${tiltX}deg)`);
      } else {
        normX = e.clientX / window.innerWidth;
      }

      normX = Math.max(0, Math.min(1, normX));

      // Handle flip/invert direction
      const mappedX = isReversed ? 1 - normX : normX;
      targetTimeRef.current = mappedX * video.duration;
    };

    const handleMouseLeave = () => {
      setTiltStyle('perspective(800px) rotateY(0deg) rotateX(0deg)');
      if (videoRef.current && videoRef.current.duration) {
        targetTimeRef.current = videoRef.current.duration * 0.5;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isReversed]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
        transform: tiltStyle,
        transition: 'transform 0.08s ease-out'
      }}
    >
      {/* Ambient Neon Blue Glow tightly surrounding the portrait */}
      <div
        style={{
          position: 'absolute',
          inset: '-8px',
          borderRadius: '30px',
          background: 'radial-gradient(circle at center, rgba(37, 99, 235, 0.35) 0%, rgba(6, 182, 212, 0.15) 60%, transparent 80%)',
          filter: 'blur(20px)',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />

      {/* Tightly Fitted Portrait Container (Zero empty sidebars) */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'inline-block',
          width: 'fit-content',
          maxWidth: '380px',
          borderRadius: '26px',
          overflow: 'hidden',
          background: 'transparent',
          border: '1px solid rgba(37, 99, 235, 0.5)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 25px rgba(37, 99, 235, 0.3)',
          lineHeight: 0
        }}
      >
        <video
          ref={videoRef}
          src={heroVideo}
          playsInline
          muted
          preload="auto"
          style={{
            display: 'block',
            width: '100%',
            maxWidth: '380px',
            height: 'auto',
            maxHeight: '520px',
            borderRadius: '25px',
            pointerEvents: 'none'
          }}
        />

        {/* Small Invert Direction helper */}
        <button
          onClick={() => setIsReversed(!isReversed)}
          title="Click to Flip Eye Direction if needed"
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            background: 'rgba(7, 7, 11, 0.85)',
            border: '1px solid rgba(168, 85, 247, 0.4)',
            borderRadius: '6px',
            color: 'var(--text-accent)',
            fontSize: '0.7rem',
            fontFamily: 'var(--font-mono)',
            padding: '4px 10px',
            cursor: 'pointer',
            opacity: 0.75,
            transition: 'all 0.2s ease',
            zIndex: 10
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.75')}
        >
          ⇄ Flip Eye Direction
        </button>
      </div>
    </div>
  );
}
