import React, { useEffect, useRef, useState } from "react";
import "./CursorVideoPortrait.css";

/**
 * Cursor-synced portrait using YOUR ORIGINAL VIDEO (left / right / up / down).
 *
 * The video is a 1-D timeline, so we tell the component WHERE in the video each
 * pose happens (in seconds) using the `keys` prop:
 *
 *   keys={{ center: 0.0, left: 1.2, right: 2.6, up: 3.8, down: 5.0 }}
 *
 * "left" = the frame where the face looks toward the LEFT of the screen at its
 * maximum, and so on. Cursor distance from the face blends between `center`
 * and that pose, so the head follows the cursor smoothly in any direction.
 *
 * Don't know the times? Add `debug` (or leave `keys` out). A scrubber appears:
 * drag to the exact frame, press the pose button, then copy the JSON it prints.
 */
const POSES = ["center", "left", "right", "up", "down"];

export default function CursorVideoPortrait({
  src,
  poster,
  keys,
  debug = false,
  smoothing = 0.18, // 0.1 floaty .. 0.3 snappy
  reachX = 0.35,    // fraction of window width for full left/right turn
  reachY = 0.35,    // fraction of window height for full up/down turn
  deadzone = 0.03,  // ignore tiny movement near the face (stops jitter)
  width = 270,
  height = 480,
}) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const keysRef = useRef(keys);
  keysRef.current = keys;

  const calibrating = debug || !keys;
  const calRef = useRef(calibrating);
  calRef.current = calibrating;

  const [dur, setDur] = useState(0);
  const [time, setTime] = useState(0);
  const [saved, setSaved] = useState(keys || {});

  useEffect(() => {
    const card = cardRef.current;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!card || !video || !canvas) return;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let cur = { x: 0, y: 0 };
    let tgt = { x: 0, y: 0 };
    let lastSeek = -1;
    let raf = 0;
    let idle = 0;
    let ready = false;

    const draw = () => {
      if (video.readyState < 2) return;
      const vw = video.videoWidth, vh = video.videoHeight;
      const cw = canvas.width, ch = canvas.height;
      if (!vw || !vh) return;
      const s = Math.max(cw / vw, ch / vh);
      ctx.drawImage(video, (cw - vw * s) / 2, (ch - vh * s) / 2, vw * s, vh * s);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      draw();
    };

    const dz = (n) => {
      const a = Math.abs(n);
      if (a < deadzone) return 0;
      return Math.sign(n) * Math.min(1, (a - deadzone) / (1 - deadzone));
    };

    // vector (-1..1, -1..1) -> time in video
    const timeFor = (x, y) => {
      const k = keysRef.current;
      if (!k) return 0;
      const horizontal = Math.abs(x) >= Math.abs(y);
      const m = horizontal ? Math.abs(x) : Math.abs(y);
      const pose = horizontal
        ? (x < 0 ? (k.left ?? k.center ?? 0) : (k.right ?? k.center ?? 0))
        : (y < 0 ? (k.up ?? k.center ?? 0) : (k.down ?? k.center ?? 0));
      const center = k.center ?? 0;
      return center + (pose - center) * m;
    };

    const setFromPoint = (px, py) => {
      const r = card.getBoundingClientRect();
      // aim at the EYE LEVEL of the face (about 35% from the top of the card)
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height * 0.35;
      tgt.x = dz(Math.max(-1, Math.min(1, (px - cx) / (window.innerWidth * reachX))));
      tgt.y = dz(Math.max(-1, Math.min(1, (py - cy) / (window.innerHeight * reachY))));
      clearTimeout(idle);
      idle = setTimeout(() => { tgt.x = 0; tgt.y = 0; }, 3000);
    };

    const onMove = (e) => setFromPoint(e.clientX, e.clientY);
    const onTouch = (e) => { const t = e.touches[0]; if (t) setFromPoint(t.clientX, t.clientY); };
    const onLeave = () => { tgt.x = 0; tgt.y = 0; };

    const tick = () => {
      if (ready && !calRef.current) {
        cur.x += (tgt.x - cur.x) * smoothing;
        cur.y += (tgt.y - cur.y) * smoothing;
        if (Math.abs(tgt.x - cur.x) < 0.0005) cur.x = tgt.x;
        if (Math.abs(tgt.y - cur.y) < 0.0005) cur.y = tgt.y;

        const t = timeFor(cur.x, cur.y);
        if (!video.seeking && Math.abs(t - lastSeek) > 0.008) {
          lastSeek = t;
          if (typeof video.fastSeek === 'function') {
            video.fastSeek(t);
          } else {
            video.currentTime = t;
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };

    const onMeta = () => {
      ready = true;
      video.pause();
      setDur(video.duration);
      const k = keysRef.current;
      video.currentTime = k && k.center !== undefined ? k.center : 0;
      resize();
    };
    const onSeeked = () => { draw(); setTime(video.currentTime); };
    const onError = () => card.classList.add("cvp--fallback");

    video.addEventListener("loadedmetadata", onMeta);
    video.addEventListener("seeked", onSeeked);
    video.addEventListener("error", onError);
    if (video.readyState >= 1) onMeta();
    resize();

    if (!reduced) {
      window.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("touchmove", onTouch, { passive: true });
      document.addEventListener("mouseleave", onLeave);
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(idle);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      document.removeEventListener("mouseleave", onLeave);
      video.removeEventListener("loadedmetadata", onMeta);
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("error", onError);
    };
  }, [src, smoothing, reachX, reachY, deadzone, width, height]);

  const scrub = (v) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Number(v);
    }
  };

  const save = (pose) => {
    if (videoRef.current) {
      const newSaved = { ...saved, [pose]: Number(videoRef.current.currentTime.toFixed(2)) };
      setSaved(newSaved);
      console.log("Saved poses:", newSaved);
    }
  };

  return (
    <div className="cvp-wrap">
      <div ref={cardRef} className="cvp" style={{ width, height }}>
        {poster && <img className="cvp__poster" src={poster} alt="" />}
        <canvas ref={canvasRef} className="cvp__canvas" />
        <video ref={videoRef} className="cvp__video" src={src} muted playsInline preload="auto" aria-hidden="true" />
      </div>

      {calibrating && (
        <div className="cvp-debug" style={{ width }}>
          <input
            type="range"
            min="0"
            max={dur || 1}
            step="0.01"
            value={time}
            onChange={(e) => scrub(e.target.value)}
            style={{ width: "100%", accentColor: "#3b82f6" }}
          />
          <div className="cvp-debug__time">{time.toFixed(2)}s / {dur.toFixed(2)}s</div>
          <div className="cvp-debug__btns">
            {POSES.map((p) => (
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
