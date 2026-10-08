import React, { useRef, useEffect, useState, useCallback } from 'react';
import defaultVideo from '../videos/portfoliovideo.mp4';

/**
 * =========================================================================
 * EYE-TRACKING PORTRAIT WITH CALIBRATION MODE & REALISTIC EYE RENDERING
 * =========================================================================
 * 
 * Start Coordinates:
 *   leftEye:  { x: 39, y: 32 }
 *   rightEye: { x: 62, y: 32 }
 * 
 * CALIBRATION:
 *   - Drag the crosshair handles over each eye in calibration mode.
 *   - Sliders adjust eye width & height live.
 *   - Live copyable code is printed to the screen and console.log().
 */

export const INITIAL_EYE_CALIBRATION = {
  leftEye: { x: 39, y: 32 },   // Horizontal & vertical center %
  rightEye: { x: 62, y: 32 },  // Horizontal & vertical center %
  eyeWidth: 9.0,               // Width of almond eye socket (% of card width)
  eyeHeight: 4.2,              // Height of almond eye socket (% of card height)
  irisScale: 85,               // Iris size (% of socket height)
  maxOffsetRatio: 0.22,        // Max pupil travel ratio relative to eye width
};

export default function EyeTrackingPortrait({
  src = null,                             // Still photo URL (optional)
  videoSrc = defaultVideo,                // Video fallback source
  mode = 'image',                         // 'image' | 'video'
  width = '100%',
  height = 'auto',
  leftEye: initialLeftEye = INITIAL_EYE_CALIBRATION.leftEye,
  rightEye: initialRightEye = INITIAL_EYE_CALIBRATION.rightEye,
  eyeWidth: initialEyeWidth = INITIAL_EYE_CALIBRATION.eyeWidth,
  eyeHeight: initialEyeHeight = INITIAL_EYE_CALIBRATION.eyeHeight,
  debug: initialDebug = false,            // Shows calibration handles & panel
  className = '',
}) {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const videoRef = useRef(null);

  const leftIrisRef = useRef(null);
  const rightIrisRef = useRef(null);
  const leftSocketRef = useRef(null);
  const rightSocketRef = useRef(null);

  // Calibration state (controlled live during debug mode)
  const [debug, setDebug] = useState(initialDebug);
  const [leftEyePos, setLeftEyePos] = useState(initialLeftEye);
  const [rightEyePos, setRightEyePos] = useState(initialRightEye);
  const [eyeWidthVal, setEyeWidthVal] = useState(initialEyeWidth);
  const [eyeHeightVal, setEyeHeightVal] = useState(initialEyeHeight);
  const [copiedCode, setCopiedCode] = useState(false);

  // Dragging state for crosshairs
  const draggingEyeRef = useRef(null); // 'left' | 'right' | null

  // Mutable animation state for 60 FPS performance (zero React re-renders on mousemove)
  const mousePosRef = useRef({ x: -9999, y: -9999, active: false });
  const pupilAnimRef = useRef({
    left: { x: 0, y: 0, targetX: 0, targetY: 0 },
    right: { x: 0, y: 0, targetX: 0, targetY: 0 },
  });
  const tiltAnimRef = useRef({
    rotateX: 0,
    rotateY: 0,
    targetX: 0,
    targetY: 0,
  });

  const [isBlinking, setIsBlinking] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Ensure base video is paused at a clear neutral frame
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.muted = true;
    video.playsInline = true;

    const onLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        video.currentTime = video.duration * 0.45;
      }
    };

    video.addEventListener('loadedmetadata', onLoadedMetadata);
    if (video.readyState >= 1) onLoadedMetadata();
    return () => video.removeEventListener('loadedmetadata', onLoadedMetadata);
  }, [videoSrc]);

  // Periodic natural blink every 3 to 6 seconds (120ms duration)
  useEffect(() => {
    let blinkTimer;
    const scheduleNextBlink = () => {
      const delay = 3000 + Math.random() * 3000;
      blinkTimer = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
          scheduleNextBlink();
        }, 120);
      }, delay);
    };

    scheduleNextBlink();
    return () => clearTimeout(blinkTimer);
  }, []);

  // Window mousemove / touchmove tracking
  useEffect(() => {
    if (reducedMotion) return;

    const handlePointerMove = (e) => {
      const clientX = e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY;

      // Handle crosshair dragging during calibration mode
      if (draggingEyeRef.current && cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const rawX = ((clientX - rect.left) / rect.width) * 100;
        const rawY = ((clientY - rect.top) / rect.height) * 100;
        const clampedX = parseFloat(Math.max(5, Math.min(95, rawX)).toFixed(1));
        const clampedY = parseFloat(Math.max(5, Math.min(95, rawY)).toFixed(1));

        if (draggingEyeRef.current === 'left') {
          setLeftEyePos({ x: clampedX, y: clampedY });
        } else if (draggingEyeRef.current === 'right') {
          setRightEyePos({ x: clampedX, y: clampedY });
        }
        return;
      }

      mousePosRef.current.x = clientX;
      mousePosRef.current.y = clientY;
      mousePosRef.current.active = true;
    };

    const handlePointerUp = () => {
      if (draggingEyeRef.current) {
        draggingEyeRef.current = null;
      }
    };

    const handlePointerLeave = () => {
      mousePosRef.current.active = false;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: false });
    window.addEventListener('touchmove', handlePointerMove, { passive: false });
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchend', handlePointerUp);
    document.addEventListener('mouseleave', handlePointerLeave);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchend', handlePointerUp);
      document.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, [reducedMotion]);

  // Log coordinates whenever calibration updates
  useEffect(() => {
    if (debug) {
      console.log('EYE CALIBRATION:', {
        leftEye: leftEyePos,
        rightEye: rightEyePos,
        eyeWidth: eyeWidthVal,
        eyeHeight: eyeHeightVal,
      });
    }
  }, [debug, leftEyePos, rightEyePos, eyeWidthVal, eyeHeightVal]);

  // Main 60 FPS requestAnimationFrame animation loop
  useEffect(() => {
    let animId;
    let idleCounter = 0;

    const computePupilDelta = (eyeScreenX, eyeScreenY, mouseX, mouseY, maxTravel) => {
      const dx = mouseX - eyeScreenX;
      const dy = mouseY - eyeScreenY;
      const dist = Math.hypot(dx, dy);

      if (dist === 0) return { x: 0, y: 0 };

      const angle = Math.atan2(dy, dx);
      // Soften movement near the eye to prevent twitching
      const nearEase = Math.min(1, dist / 40);
      const travel = Math.min(maxTravel, (dist / 200) * maxTravel) * nearEase;

      return {
        x: Math.cos(angle) * travel,
        y: Math.sin(angle) * travel,
      };
    };

    const animate = () => {
      const card = cardRef.current;
      const mouse = mousePosRef.current;
      const pupils = pupilAnimRef.current;
      const tilt = tiltAnimRef.current;

      if (card && !reducedMotion) {
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width * 0.5;
        const cardCenterY = rect.top + rect.height * 0.5;

        // Maximum pixel travel clamped to ~22% of eye width
        const eyeWidthPx = rect.width * (eyeWidthVal / 100);
        const maxTravel = eyeWidthPx * INITIAL_EYE_CALIBRATION.maxOffsetRatio;

        if (mouse.active && !draggingEyeRef.current) {
          // 1. Head Parallax (max 5deg)
          const halfScreenW = window.innerWidth * 0.5 || 1;
          const halfScreenH = window.innerHeight * 0.5 || 1;
          const normX = Math.max(-1, Math.min(1, (mouse.x - cardCenterX) / halfScreenW));
          const normY = Math.max(-1, Math.min(1, (mouse.y - cardCenterY) / halfScreenH));

          tilt.targetY = normX * 5;
          tilt.targetX = -normY * 5;

          // 2. Both eyes compute vector toward the exact same cursor point
          const leftScreenX = rect.left + (rect.width * leftEyePos.x) / 100;
          const leftScreenY = rect.top + (rect.height * leftEyePos.y) / 100;
          const rightScreenX = rect.left + (rect.width * rightEyePos.x) / 100;
          const rightScreenY = rect.top + (rect.height * rightEyePos.y) / 100;

          const leftDelta = computePupilDelta(leftScreenX, leftScreenY, mouse.x, mouse.y, maxTravel);
          const rightDelta = computePupilDelta(rightScreenX, rightScreenY, mouse.x, mouse.y, maxTravel);

          pupils.left.targetX = leftDelta.x;
          pupils.left.targetY = leftDelta.y;
          pupils.right.targetX = rightDelta.x;
          pupils.right.targetY = rightDelta.y;
        } else {
          // Settle smoothly to center + subtle micro-glance
          idleCounter += 0.02;
          const idleDriftX = Math.sin(idleCounter) * (maxTravel * 0.2);
          const idleDriftY = Math.cos(idleCounter * 0.8) * (maxTravel * 0.12);

          tilt.targetX = 0;
          tilt.targetY = 0;

          pupils.left.targetX = idleDriftX;
          pupils.left.targetY = idleDriftY;
          pupils.right.targetX = idleDriftX;
          pupils.right.targetY = idleDriftY;
        }

        // Lerp factor: 0.15 for smooth realistic motion
        tilt.rotateX += (tilt.targetX - tilt.rotateX) * 0.15;
        tilt.rotateY += (tilt.targetY - tilt.rotateY) * 0.15;

        pupils.left.x += (pupils.left.targetX - pupils.left.x) * 0.15;
        pupils.left.y += (pupils.left.targetY - pupils.left.y) * 0.15;
        pupils.right.x += (pupils.right.targetX - pupils.right.x) * 0.15;
        pupils.right.y += (pupils.right.targetY - pupils.right.y) * 0.15;

        // Apply 3D Head Parallax (Portrait Card & Eyes remain locked together)
        card.style.transform = `rotateX(${tilt.rotateX.toFixed(2)}deg) rotateY(${tilt.rotateY.toFixed(2)}deg)`;

        // Apply clamped translate3d to Iris elements
        if (leftIrisRef.current) {
          leftIrisRef.current.style.transform = `translate3d(${pupils.left.x.toFixed(2)}px, ${pupils.left.y.toFixed(2)}px, 0)`;
        }
        if (rightIrisRef.current) {
          rightIrisRef.current.style.transform = `translate3d(${pupils.right.x.toFixed(2)}px, ${pupils.right.y.toFixed(2)}px, 0)`;
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [leftEyePos.x, leftEyePos.y, rightEyePos.x, rightEyePos.y, eyeWidthVal, eyeHeightVal, reducedMotion]);

  const copyConfigSnippet = () => {
    const snippet = `leftEye={{ x: ${leftEyePos.x}, y: ${leftEyePos.y} }}\nrightEye={{ x: ${rightEyePos.x}, y: ${rightEyePos.y} }}\neyeWidth={${eyeWidthVal}}\neyeHeight={${eyeHeightVal}}`;
    navigator.clipboard.writeText(snippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div
      ref={containerRef}
      className={`eye-tracking-portrait-root ${className}`}
      style={{
        position: 'relative',
        display: 'inline-block',
        width,
        maxWidth: '380px',
        margin: '0 auto',
        perspective: '1000px',
        userSelect: 'none',
      }}
    >
      {/* Outer Neon Blue Halo */}
      <div
        style={{
          position: 'absolute',
          inset: '-8px',
          borderRadius: '30px',
          background: 'radial-gradient(circle at center, rgba(37, 99, 235, 0.35) 0%, rgba(6, 182, 212, 0.14) 60%, transparent 80%)',
          filter: 'blur(20px)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* 3D Tilted Card Container */}
      <div
        ref={cardRef}
        className="portrait-card"
        style={{
          position: 'relative',
          zIndex: 2,
          borderRadius: '24px',
          overflow: 'hidden',
          border: '1px solid rgba(37, 99, 235, 0.45)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 25px rgba(37, 99, 235, 0.25)',
          background: '#040509',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {/* ============================================================== */}
        {/* BASE LAYER: Still image or paused neutral frame                */}
        {/* ============================================================== */}
        {src ? (
          <img
            src={src}
            alt="Portrait"
            style={{
              display: 'block',
              width: '100%',
              height,
              maxHeight: '480px',
              objectFit: 'contain',
              pointerEvents: 'none',
            }}
          />
        ) : (
          <video
            ref={videoRef}
            src={videoSrc}
            preload="auto"
            muted
            playsInline
            style={{
              display: 'block',
              width: '100%',
              height,
              maxHeight: '480px',
              objectFit: 'contain',
              pointerEvents: 'none',
            }}
          />
        )}

        {/* ============================================================== */}
        {/* REALISTIC EYE OVERLAY SYSTEM (Fully covers photo eyes)         */}
        {/* ============================================================== */}
        <div
          className="eye-overlay-system"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: debug ? 'auto' : 'none',
            zIndex: 10,
          }}
        >
          {/* ==================== LEFT EYE ==================== */}
          <div
            ref={leftSocketRef}
            className="realistic-eye-socket left-eye-socket"
            style={{
              position: 'absolute',
              top: `${leftEyePos.y}%`,
              left: `${leftEyePos.x}%`,
              width: `${eyeWidthVal}%`,
              height: `${eyeHeightVal}%`,
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              overflow: 'hidden',
                 background: '#e8e0dc', // Realistic sclera base that covers the original photo eye!
              boxShadow: 'inset 0 2px 4px rgba(20, 10, 5, 0.7), inset 0 -1px 3px rgba(0,0,0,0.3)',
              filter: 'blur(0.2px)',
              pointerEvents: 'none',
            }}
          >
            {/* Sclera depth gradient */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                 background: 'radial-gradient(ellipse at 50% 50%, #f4ede8 0%, #e8e0dc 70%, #c9bcb4 100%)',
                pointerEvents: 'none',
              }}
            />

            {/* Moving Realistic Iris + Pupil + Highlight */}
            <div
              ref={leftIrisRef}
              className="realistic-iris"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                 width: '75%',
                 height: '135%',
                 marginTop: '-67.5%',
                 marginLeft: '-37.5%',
                borderRadius: '50%',
                // Dark brown realistic iris radial-gradient
                 background: 'radial-gradient(circle at 42% 42%, #4b2a18 0%, #6c4227 42%, #382014 70%, #130a06 100%)',
                boxShadow: '0 0 3px rgba(0, 0, 0, 0.9)',
                willChange: 'transform',
                transform: 'translate3d(0, 0, 0)',
              }}
            >
              {/* Deep black pupil core */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                   width: '42%',
                   height: '42%',
                  transform: 'translate(-50%, -50%)',
                  borderRadius: '50%',
                  background: '#040201',
                }}
              />
              {/* Specular catchlight reflection */}
              <div
                style={{
                  position: 'absolute',
                  top: '22%',
                  left: '26%',
                   width: '18%',
                   height: '18%',
                  borderRadius: '50%',
                  background: '#ffffff',
                  opacity: 0.92,
                  boxShadow: '0 0 2px rgba(255, 255, 255, 0.8)',
                }}
              />
            </div>

            {/* Eyelid shadow overlay (mix-blend-mode: multiply blends with skin) */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                boxShadow: 'inset 0 3px 5px rgba(25, 15, 10, 0.8), inset 0 -2px 3px rgba(20, 10, 5, 0.45)',
                mixBlendMode: 'multiply',
                pointerEvents: 'none',
              }}
            />

            {/* Skin-colored eyelid that closes on blink (scaleY 0 to 1) */}
            <div
              className="blink-eyelid"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, #c49a82 0%, #aa7e67 100%)',
                transform: `scaleY(${isBlinking ? 1 : 0})`,
                transformOrigin: 'top center',
                transition: 'transform 0.06s cubic-bezier(0.4, 0, 0.2, 1)',
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* ==================== RIGHT EYE ==================== */}
          <div
            ref={rightSocketRef}
            className="realistic-eye-socket right-eye-socket"
            style={{
              position: 'absolute',
              top: `${rightEyePos.y}%`,
              left: `${rightEyePos.x}%`,
              width: `${eyeWidthVal}%`,
              height: `${eyeHeightVal}%`,
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              overflow: 'hidden',
                 background: '#e8e0dc', // Realistic sclera base that covers the original photo eye!
              boxShadow: 'inset 0 2px 4px rgba(20, 10, 5, 0.7), inset 0 -1px 3px rgba(0,0,0,0.3)',
              filter: 'blur(0.2px)',
              pointerEvents: 'none',
            }}
          >
            {/* Sclera depth gradient */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                 background: 'radial-gradient(ellipse at 50% 50%, #f4ede8 0%, #e8e0dc 70%, #c9bcb4 100%)',
                pointerEvents: 'none',
              }}
            />

            {/* Moving Realistic Iris + Pupil + Highlight */}
            <div
              ref={rightIrisRef}
              className="realistic-iris"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                 width: '75%',
                 height: '135%',
                 marginTop: '-67.5%',
                 marginLeft: '-37.5%',
                borderRadius: '50%',
                 background: 'radial-gradient(circle at 42% 42%, #4b2a18 0%, #6c4227 42%, #382014 70%, #130a06 100%)',
                boxShadow: '0 0 3px rgba(0, 0, 0, 0.9)',
                willChange: 'transform',
                transform: 'translate3d(0, 0, 0)',
              }}
            >
              {/* Deep black pupil core */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                   width: '42%',
                   height: '42%',
                  transform: 'translate(-50%, -50%)',
                  borderRadius: '50%',
                  background: '#040201',
                }}
              />
              {/* Specular catchlight reflection */}
              <div
                style={{
                  position: 'absolute',
                  top: '22%',
                  left: '26%',
                   width: '18%',
                   height: '18%',
                  borderRadius: '50%',
                  background: '#ffffff',
                  opacity: 0.92,
                  boxShadow: '0 0 2px rgba(255, 255, 255, 0.8)',
                }}
              />
            </div>

            {/* Eyelid shadow overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                boxShadow: 'inset 0 3px 5px rgba(25, 15, 10, 0.8), inset 0 -2px 3px rgba(20, 10, 5, 0.45)',
                mixBlendMode: 'multiply',
                pointerEvents: 'none',
              }}
            />

            {/* Skin-colored eyelid that closes on blink */}
            <div
              className="blink-eyelid"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, #c49a82 0%, #aa7e67 100%)',
                transform: `scaleY(${isBlinking ? 1 : 0})`,
                transformOrigin: 'top center',
                transition: 'transform 0.06s cubic-bezier(0.4, 0, 0.2, 1)',
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* ============================================================== */}
          {/* CALIBRATION MODE: Interactive Draggable Crosshair Handles      */}
          {/* ============================================================== */}
          {debug && (
            <>
              {/* Left Handle */}
              <div
                onMouseDown={(e) => {
                  e.stopPropagation();
                  draggingEyeRef.current = 'left';
                }}
                onTouchStart={(e) => {
                  e.stopPropagation();
                  draggingEyeRef.current = 'left';
                }}
                style={{
                  position: 'absolute',
                  top: `${leftEyePos.y}%`,
                  left: `${leftEyePos.x}%`,
                  transform: 'translate(-50%, -50%)',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: '2px solid #38bdf8',
                  background: 'rgba(56, 189, 248, 0.25)',
                  cursor: 'grab',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 40,
                  boxShadow: '0 0 10px rgba(56, 189, 248, 0.8)',
                }}
              >
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#fff' }} />
                <span
                  style={{
                    position: 'absolute',
                    bottom: '-22px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontFamily: 'monospace',
                    fontSize: '10px',
                    color: '#38bdf8',
                    background: 'rgba(0,0,0,0.85)',
                    padding: '2px 5px',
                    borderRadius: '4px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  L ({leftEyePos.x}%, {leftEyePos.y}%)
                </span>
              </div>

              {/* Right Handle */}
              <div
                onMouseDown={(e) => {
                  e.stopPropagation();
                  draggingEyeRef.current = 'right';
                }}
                onTouchStart={(e) => {
                  e.stopPropagation();
                  draggingEyeRef.current = 'right';
                }}
                style={{
                  position: 'absolute',
                  top: `${rightEyePos.y}%`,
                  left: `${rightEyePos.x}%`,
                  transform: 'translate(-50%, -50%)',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: '2px solid #a855f7',
                  background: 'rgba(168, 85, 247, 0.25)',
                  cursor: 'grab',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 40,
                  boxShadow: '0 0 10px rgba(168, 85, 247, 0.8)',
                }}
              >
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#fff' }} />
                <span
                  style={{
                    position: 'absolute',
                    bottom: '-22px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontFamily: 'monospace',
                    fontSize: '10px',
                    color: '#c084fc',
                    background: 'rgba(0,0,0,0.85)',
                    padding: '2px 5px',
                    borderRadius: '4px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  R ({rightEyePos.x}%, {rightEyePos.y}%)
                </span>
              </div>
            </>
          )}
        </div>

        {/* Toggle Calibration Button */}
        <button
          onClick={() => setDebug(!debug)}
          title="Toggle Calibration Mode"
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: debug ? 'rgba(37, 99, 235, 0.85)' : 'rgba(0, 0, 0, 0.65)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#fff',
            fontSize: '11px',
            fontFamily: 'var(--font-code, monospace)',
            padding: '5px 10px',
            borderRadius: '999px',
            cursor: 'pointer',
            zIndex: 50,
            backdropFilter: 'blur(8px)',
            transition: 'all 0.2s',
          }}
        >
          {debug ? '✕ Exit Calibration' : '⚙ Calibrate Eyes'}
        </button>
      </div>

      {/* ================================================================ */}
      {/* CALIBRATION CONTROL PANEL (Sliders & Copyable Code)              */}
      {/* ================================================================ */}
      {debug && (
        <div
          style={{
            marginTop: '16px',
            background: 'rgba(8, 11, 18, 0.95)',
            border: '1px solid rgba(37, 99, 235, 0.5)',
            borderRadius: '16px',
            padding: '16px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.7)',
            color: '#e2e8f0',
            fontFamily: 'var(--font-body, sans-serif)',
            fontSize: '12px',
            zIndex: 30,
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontWeight: 700, color: '#60a5fa', fontSize: '13px' }}>
              🎯 Live Eye Calibration
            </span>
            <button
              onClick={copyConfigSnippet}
              style={{
                background: copiedCode ? '#10b981' : 'rgba(37, 99, 235, 0.3)',
                border: '1px solid rgba(37, 99, 235, 0.5)',
                color: '#fff',
                padding: '4px 10px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '11px',
                fontWeight: 600,
              }}
            >
              {copiedCode ? '✓ Copied!' : 'Copy Code'}
            </button>
          </div>

          <p style={{ color: '#94a3b8', fontSize: '11px', marginBottom: '12px' }}>
            Drag the cyan/purple handles on the photo above to position each eye. Use the sliders below to adjust socket scale.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: '4px' }}>
                Eye Width: <strong>{eyeWidthVal}%</strong>
              </label>
              <input
                type="range"
                min="5"
                max="16"
                step="0.2"
                value={eyeWidthVal}
                onChange={(e) => setEyeWidthVal(parseFloat(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: '4px' }}>
                Eye Height: <strong>{eyeHeightVal}%</strong>
              </label>
              <input
                type="range"
                min="2"
                max="8"
                step="0.2"
                value={eyeHeightVal}
                onChange={(e) => setEyeHeightVal(parseFloat(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>
          </div>

          <div
            style={{
              background: 'rgba(0, 0, 0, 0.5)',
              padding: '8px 12px',
              borderRadius: '8px',
              fontFamily: 'monospace',
              fontSize: '11px',
              color: '#38bdf8',
              lineHeight: 1.5,
              wordBreak: 'break-all',
            }}
          >
            leftEye={`{{ x: ${leftEyePos.x}, y: ${leftEyePos.y} }}`}<br />
            rightEye={`{{ x: ${rightEyePos.x}, y: ${rightEyePos.y} }}`}<br />
            eyeWidth={`{${eyeWidthVal}}`}<br />
            eyeHeight={`{${eyeHeightVal}}`}
          </div>
        </div>
      )}
    </div>
  );
}
