import React, { useEffect, useRef, useState } from "react";
import "./CursorVideoPortrait.css";

/**
 * Cursor-synced portrait using YOUR ORIGINAL VIDEO.
 *
 * DEFAULT (no setup): cursor X position scrubs the video, working immediately:
 *   <CursorVideoPortrait src="/look_scrub.mp4" poster="/center.jpg" />
 *
 * Tuning props:
 *   start, end   part of the video to use, in seconds (end=0 -> whole video)
 *   centerAt     0..1, where in that range you look straight ahead (default .5)
 *   reverse      flip direction if the head turns away from the cursor
 *   smoothing    0.08 floaty .. 0.25 snappy
 *   deadzone     ignore tiny movement near the face (0..0.1)
 *   keys         optional calibrated video times for center/left/right/up/down
 *   snapPoses    use the source video's natural pose frames directly
 *
 * OPTIONAL calibration tool: add `debug` to get a scrubber that prints exact
 * times, and `keys={{center,left,right,up,down}}` to use pose-based mapping.
 */
export default function CursorVideoPortrait({
  src,
  poster,
  mobileImage,
  start = 0,
  end = 0,
  centerAt = 0.5,
  reverse = false,
  smoothing = 0.15,
  deadzone = 0.02,
  keys,
  snapPoses = false,
  debug = false,
  width = 270,
  height = 480,
}) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const debugRef = useRef(debug);
  debugRef.current = debug;

  const [dur, setDur] = useState(0);
  const [time, setTime] = useState(0);
  const [saved, setSaved] = useState({});

  useEffect(() => {
    const card = cardRef.current;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!card || !video || !canvas) return;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobilePlayback = window.matchMedia("(max-width: 768px), (pointer: coarse)").matches;

    const range = { a: start, b: end };
    let cur = { x: 0, y: 0 };
    let tgt = { x: 0, y: 0 };
    let lastSeek = -1;
    let seekInFlight = false;
    let raf = 0;
    let ready = false;
    let frameReady = false;

    const draw = () => {
      if (video.readyState < 2) return;
      const vw = video.videoWidth;
      const vh = video.videoHeight;
      const cw = canvas.width;
      const ch = canvas.height;
      if (!vw || !vh) return;
      const s = Math.max(cw / vw, ch / vh);
      ctx.drawImage(video, (cw - vw * s) / 2, (ch - vh * s) / 2, vw * s, vh * s);
    };

    // Mobile browsers can fire loadedmetadata before the first decoded frame
    // exists. Always repaint when decoding actually becomes available.
    const onFrameReady = () => {
      if (video.readyState < 2) return;
      frameReady = true;
      draw();
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      if (frameReady) draw();
    };

    const dz = (n) => {
      const a = Math.abs(n);
      if (a < deadzone) return 0;
      return Math.sign(n) * Math.min(1, (a - deadzone) / (1 - deadzone));
    };

    const timeFor = (x, y) => {
      // pose-based mode (only if keys are provided)
      if (keys) {
        const horizontal = Math.abs(x) >= Math.abs(y);
        const m = horizontal ? Math.abs(x) : Math.abs(y);
        const pose = horizontal ? (x < 0 ? keys.left : keys.right) : y < 0 ? keys.up : keys.down;
        if (snapPoses) return m < 0.12 ? keys.center : pose;
        const poseTime = keys.center + (pose - keys.center) * m;
        return Math.min(range.b, Math.max(range.a, poseTime));
      }
      // default: horizontal scrub across the video range
      const span = range.b - range.a;
      const half = x < 0 ? centerAt : 1 - centerAt;
      let t01 = centerAt + x * half;
      if (reverse) t01 = 1 - t01;
      return range.a + Math.min(1, Math.max(0, t01)) * span;
    };

    const setFromPoint = (px, py) => {
      const r = card.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height * 0.35;
      // normalise by the distance to the screen edge on that side
      const sx = px < cx ? cx : window.innerWidth - cx;
      const sy = py < cy ? cy : window.innerHeight - cy;
      tgt.x = dz(Math.max(-1, Math.min(1, (px - cx) / Math.max(sx, 1))));
      tgt.y = dz(Math.max(-1, Math.min(1, (py - cy) / Math.max(sy, 1))));
    };

    const onMove = (e) => setFromPoint(e.clientX, e.clientY);
    const onTouch = (e) => { const t = e.touches[0]; if (t) setFromPoint(t.clientX, t.clientY); };
    const onTouchStart = (e) => { const t = e.touches[0]; if (t) setFromPoint(t.clientX, t.clientY); };
    const onLeave = () => { tgt.x = 0; tgt.y = 0; };

    const tick = () => {
      if (ready && !debugRef.current) {
        cur.x += (tgt.x - cur.x) * smoothing;
        cur.y += (tgt.y - cur.y) * smoothing;
        if (Math.abs(tgt.x - cur.x) < 0.0005) cur.x = tgt.x;
        if (Math.abs(tgt.y - cur.y) < 0.0005) cur.y = tgt.y;

        const t = timeFor(cur.x, cur.y);
        // Queue the newest target while the decoder is busy, then apply it as
        // soon as the current seek completes. Writing currentTime every frame
        // can keep the decoder in a permanent seeking state.
        if (Math.abs(t - lastSeek) > 1 / 120) {
          lastSeek = t;
        }
        if (!seekInFlight && Math.abs(lastSeek - video.currentTime) > 1 / 120) {
          seekInFlight = true;
          video.currentTime = lastSeek;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    const onMeta = () => {
      if (ready) return;
      if (!range.b || range.b > video.duration) range.b = video.duration;
      ready = true;
      setDur(video.duration);

      // Phones do not have a desktop cursor to track. Let the native muted
      // Keep mobile on one decoded center frame. The native video stays
      // visible underneath as a fallback while the canvas paints the frame.
      if (mobilePlayback) {
        video.autoplay = false;
        video.loop = false;
        video.muted = true;
        video.playsInline = true;
        video.pause();
        video.currentTime = timeFor(0, 0);
        resize();
        if (video.readyState >= 2) onFrameReady();
        return;
      }

      video.pause();
      video.currentTime = timeFor(0, 0);
      resize();
    };
    const onSeeked = () => {
      seekInFlight = false;
      onFrameReady();
      setTime(video.currentTime);
    };
    const onError = () => card.classList.add("cvp--fallback");

    video.addEventListener("loadedmetadata", onMeta);
    video.addEventListener("loadeddata", onFrameReady);
    video.addEventListener("canplay", onFrameReady);
    video.addEventListener("canplaythrough", onFrameReady);
    video.addEventListener("seeked", onSeeked);
    video.addEventListener("error", onError);
    if (video.readyState >= 1) onMeta();
    resize();

    if (!reduced && !mobilePlayback) {
      window.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("touchstart", onTouchStart, { passive: true });
      window.addEventListener("touchmove", onTouch, { passive: true });
      document.addEventListener("mouseleave", onLeave);
      raf = requestAnimationFrame(tick);
    }
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("orientationchange", resize, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouch);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", resize);
      window.removeEventListener("orientationchange", resize);
      video.removeEventListener("loadedmetadata", onMeta);
      video.removeEventListener("loadeddata", onFrameReady);
      video.removeEventListener("canplay", onFrameReady);
      video.removeEventListener("canplaythrough", onFrameReady);
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("error", onError);
    };
  }, [src, start, end, centerAt, reverse, smoothing, deadzone, keys, snapPoses, width, height]);

  const save = (pose) =>
    setSaved((s) => ({ ...s, [pose]: Number(videoRef.current.currentTime.toFixed(2)) }));

  return (
    <div className="cvp-wrap">
      <div ref={cardRef} className={`cvp${mobileImage ? " cvp--mobile-image" : ""}`} style={{ width, height }}>
        {poster && <img className="cvp__poster" src={poster} alt="" />}
        {mobileImage && <img className="cvp__mobile-image" src={mobileImage} alt="" />}
        <canvas ref={canvasRef} className="cvp__canvas" />
        <video ref={videoRef} className="cvp__video" src={src} muted playsInline preload="auto" aria-hidden="true" />
      </div>

      {debug && (
        <div className="cvp-debug" style={{ width }}>
          <input
            type="range"
            min="0"
            max={dur || 1}
            step="0.01"
            value={time}
            onChange={(e) => (videoRef.current.currentTime = Number(e.target.value))}
            style={{ width: "100%", accentColor: "#3b82f6" }}
          />
          <div className="cvp-debug__time">{time.toFixed(2)}s / {dur.toFixed(2)}s</div>
          <div className="cvp-debug__btns">
            {["center", "left", "right", "up", "down"].map((p) => (
              <button key={p} onClick={() => save(p)}>
                {p}{saved[p] !== undefined ? ` ✓ ${saved[p]}` : ""}
              </button>
            ))}
          </div>
          <pre>{`keys={${JSON.stringify(saved, null, 2)}}`}</pre>
        </div>
      )}
    </div>
  );
}
