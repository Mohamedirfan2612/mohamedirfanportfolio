import React, { useRef, useEffect, useState } from 'react';
import defaultVideo from '../videos/portfoliovideo.mp4';

// =========================================================================
// EYE POSITION & TRACKING CONFIGURATION
// Easily adjust these values to calibrate perfectly with your generated video!
// =========================================================================
export const EYE_CONFIG = {
  // Horizontal & vertical positions of the eye centers (percentage of video)
  left: {
    x: '42%',  // LEFT_EYE_X  (horizontal % from left of container)
    y: '32%',  // LEFT_EYE_Y  (vertical % from top of container)
  },
  right: {
    x: '58%',  // RIGHT_EYE_X (horizontal % from left of container)
    y: '32%',  // RIGHT_EYE_Y (vertical % from top of container)
  },

  // Dimensions of the transparent eye sockets
  eyeWidth: '24px',   // EYE_WIDTH
  eyeHeight: '14px',  // EYE_HEIGHT

  // Maximum pupil movement boundaries (in pixels)
  maxPupilX: 6,       // MAX_PUPIL_X (clamped horizontal travel)
  maxPupilY: 4,       // MAX_PUPIL_Y (clamped vertical travel)

  // Pupil / Iris sizing
  pupilSize: '11px',

  // Animation smoothness (lerp factor: 0.05 = gentle, 0.12 = balanced, 0.2 = snappy)
  lerpSpeed: 0.12,
};

/**
 * InteractiveAvatar
 * Layered architecture:
 *   [3D Character Video (plays normally in background)]
 *              ↓
 *   [Transparent Interactive Eye Overlay (shares exact container dimensions)]
 *              ↓
 *   [Live Cursor Tracking via requestAnimationFrame (only pupils move)]
 */
export default function InteractiveAvatar({
  videoSrc = defaultVideo,
  config = EYE_CONFIG,
  className = '',
  debug = false, // Set to true to view alignment guidelines for calibration
}) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const leftPupilRef = useRef(null);
  const rightPupilRef = useRef(null);

  // Mutable animation state (no React re-renders, 60 FPS)
  const targetOffsetRef = useRef({ x: 0, y: 0 });
  const currentOffsetRef = useRef({ x: 0, y: 0 });
  const isInteractingRef = useRef(false);
  const idleTimeoutRef = useRef(null);

  // 1. Ensure the video plays smoothly and continuously in the background
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.playsInline = true;
      video.autoplay = true;
      video.loop = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay policy fallback: video remains ready
        });
      }
    }
  }, []);

  // 2. High-performance RAF loop: lerps pupil movement smoothly without shaking
  useEffect(() => {
    let animId;

    const animate = () => {
      const current = currentOffsetRef.current;
      const target = targetOffsetRef.current;
      const speed = config.lerpSpeed || 0.12;

      // Linear interpolation (lerp) toward target
      current.x += (target.x - current.x) * speed;
      current.y += (target.y - current.y) * speed;

      // Hardware-accelerated translate3d
      const transformStyle = `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0)`;

      if (leftPupilRef.current) {
        leftPupilRef.current.style.transform = transformStyle;
      }
      if (rightPupilRef.current) {
        rightPupilRef.current.style.transform = transformStyle;
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [config.lerpSpeed]);

  // 3. Pointer tracking (Desktop mouse & Mobile/Tablet touch)
  useEffect(() => {
    const handlePointerMove = (clientX, clientY) => {
      if (!containerRef.current) return;
      isInteractingRef.current = true;

      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);

      const rect = containerRef.current.getBoundingClientRect();

      // Face center calculated from the eye configuration
      const leftXPercent = parseFloat(config.left.x) / 100;
      const rightXPercent = parseFloat(config.right.x) / 100;
      const yPercent = parseFloat(config.left.y) / 100;

      const faceCenterX = rect.left + rect.width * ((leftXPercent + rightXPercent) * 0.5);
      const faceCenterY = rect.top + rect.height * yPercent;

      // Direction vector from face center to cursor
      const dx = clientX - faceCenterX;
      const dy = clientY - faceCenterY;

      const distance = Math.hypot(dx, dy);
      const angle = Math.atan2(dy, dx);

      // Distance scaling: reaches maximum clamp when cursor is ~200px away
      const maxDist = 200;
      const intensity = Math.min(1, distance / maxDist);

      // Clamped directional pupil offset
      const targetX = Math.cos(angle) * (intensity * config.maxPupilX);
      const targetY = Math.sin(angle) * (intensity * config.maxPupilY);

      targetOffsetRef.current = {
        x: Math.max(-config.maxPupilX, Math.min(config.maxPupilX, targetX)),
        y: Math.max(-config.maxPupilY, Math.min(config.maxPupilY, targetY)),
      };

      // When cursor stops/rests, maintain gaze; if inactive for 3s, gently settle to center
      idleTimeoutRef.current = setTimeout(() => {
        isInteractingRef.current = false;
        targetOffsetRef.current = { x: 0, y: 0 };
      }, 3000);
    };

    const onMouseMove = (e) => handlePointerMove(e.clientX, e.clientY);

    const onTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onMouseLeave = () => {
      // Smoothly return pupils toward center when cursor exits viewport
      targetOffsetRef.current = { x: 0, y: 0 };
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    };
  }, [config.left.x, config.left.y, config.right.x, config.maxPupilX, config.maxPupilY]);

  // 4. Subtle autonomous idle eye micro-movement for mobile or inactive cursor
  useEffect(() => {
    const idleInterval = setInterval(() => {
      if (!isInteractingRef.current) {
        // Organic microscopic glance (subtle lifelike eye drift)
        const angle = Math.random() * Math.PI * 2;
        const drift = Math.random() * (config.maxPupilX * 0.35);
        targetOffsetRef.current = {
          x: Math.cos(angle) * drift,
          y: Math.sin(angle) * (drift * 0.6),
        };

        // Drift back to center after glance
        setTimeout(() => {
          if (!isInteractingRef.current) {
            targetOffsetRef.current = { x: 0, y: 0 };
          }
        }, 1400);
      }
    }, 4500);

    return () => clearInterval(idleInterval);
  }, [config.maxPupilX]);

  return (
    <div
      ref={containerRef}
      className={`character-container relative ${className}`}
      style={{
        position: 'relative',
        display: 'inline-block',
        width: '100%',
        maxWidth: '380px',
        margin: '0 auto',
        userSelect: 'none',
      }}
    >
      {/* Subtle outer ambient glow (matches portfolio blue/cyan aesthetic) */}
      <div
        style={{
          position: 'absolute',
          inset: '-6px',
          borderRadius: '28px',
          background: 'radial-gradient(circle at center, rgba(37, 99, 235, 0.3) 0%, rgba(6, 182, 212, 0.12) 60%, transparent 80%)',
          filter: 'blur(20px)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Frame wrapper preserving identical container dimensions and aspect ratio */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          borderRadius: '24px',
          overflow: 'hidden',
          border: '1px solid rgba(37, 99, 235, 0.45)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 25px rgba(37, 99, 235, 0.25)',
          background: '#040509',
        }}
      >
        {/* ============================================================== */}
        {/* LAYER 1: 3D CHARACTER VIDEO (Plays normally & independently)  */}
        {/* ============================================================== */}
        <video
          ref={videoRef}
          className="character-video"
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          style={{
            display: 'block',
            width: '100%',
            height: 'auto',
            maxHeight: '480px',
            objectFit: 'contain',
            pointerEvents: 'none',
          }}
        />

        {/* ============================================================== */}
        {/* LAYER 2: TRANSPARENT INTERACTIVE EYE OVERLAY                   */}
        {/* ============================================================== */}
        <div
          className="eye-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 10,
          }}
        >
          {/* LEFT EYE (Transparent socket with clipped pupil) */}
          <div
            className="left-eye"
            style={{
              position: 'absolute',
              top: config.left.y,
              left: config.left.x,
              width: config.eyeWidth,
              height: config.eyeHeight,
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              overflow: 'hidden',
              background: 'transparent', // 100% transparent - no white box!
              pointerEvents: 'none',
              border: debug ? '1.5px dashed #38bdf8' : 'none',
            }}
          >
            {/* LEFT PUPIL (Only element that moves) */}
            <div
              ref={leftPupilRef}
              className="left-pupil"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: config.pupilSize,
                height: config.pupilSize,
                marginTop: `calc(-${config.pupilSize} / 2)`,
                marginLeft: `calc(-${config.pupilSize} / 2)`,
                borderRadius: '50%',
                // Natural iris/pupil gradient with soft blended edge
                background: 'radial-gradient(circle at 45% 45%, #050811 40%, #1e3a8a 75%, rgba(15, 23, 42, 0.85) 90%, transparent 100%)',
                boxShadow: '0 0 2px rgba(0, 0, 0, 0.7)',
                willChange: 'transform',
                transform: 'translate3d(0, 0, 0)',
              }}
            >
              {/* Natural specular catchlight highlight */}
              <div
                style={{
                  position: 'absolute',
                  top: '20%',
                  left: '25%',
                  width: '2.5px',
                  height: '2.5px',
                  borderRadius: '50%',
                  background: '#ffffff',
                  opacity: 0.9,
                }}
              />
            </div>
          </div>

          {/* RIGHT EYE (Transparent socket with clipped pupil) */}
          <div
            className="right-eye"
            style={{
              position: 'absolute',
              top: config.right.y,
              left: config.right.x,
              width: config.eyeWidth,
              height: config.eyeHeight,
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              overflow: 'hidden',
              background: 'transparent', // 100% transparent - no white box!
              pointerEvents: 'none',
              border: debug ? '1.5px dashed #38bdf8' : 'none',
            }}
          >
            {/* RIGHT PUPIL (Only element that moves) */}
            <div
              ref={rightPupilRef}
              className="right-pupil"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: config.pupilSize,
                height: config.pupilSize,
                marginTop: `calc(-${config.pupilSize} / 2)`,
                marginLeft: `calc(-${config.pupilSize} / 2)`,
                borderRadius: '50%',
                // Natural iris/pupil gradient with soft blended edge
                background: 'radial-gradient(circle at 45% 45%, #050811 40%, #1e3a8a 75%, rgba(15, 23, 42, 0.85) 90%, transparent 100%)',
                boxShadow: '0 0 2px rgba(0, 0, 0, 0.7)',
                willChange: 'transform',
                transform: 'translate3d(0, 0, 0)',
              }}
            >
              {/* Natural specular catchlight highlight */}
              <div
                style={{
                  position: 'absolute',
                  top: '20%',
                  left: '25%',
                  width: '2.5px',
                  height: '2.5px',
                  borderRadius: '50%',
                  background: '#ffffff',
                  opacity: 0.9,
                }}
              />
            </div>
          </div>
        </div>

        {/* Calibration helper info badge (visible only when debug={true}) */}
        {debug && (
          <div
            style={{
              position: 'absolute',
              bottom: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(2, 6, 23, 0.9)',
              color: '#38bdf8',
              fontFamily: 'monospace',
              fontSize: '11px',
              padding: '4px 10px',
              borderRadius: '6px',
              border: '1px solid #0284c7',
              zIndex: 30,
              whiteSpace: 'nowrap',
            }}
          >
            Calibrating Eyes: Align dashed boxes with character eyes
          </div>
        )}
      </div>
    </div>
  );
}
