import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { createLoaderScene } from "./loaderScene";
import "./Loader.css";

const MESSAGES = [
  "Booting up workspace",
  "Compiling components",
  "Deploying portfolio",
  "Ready",
];

function Scene() {
  const ref = useRef(null);
  useEffect(() => {
    const scene = createLoaderScene(THREE, ref.current);
    return () => scene.dispose();
  }, []);
  return <div className="loader__stage" ref={ref} aria-hidden="true" />;
}

/**
 * Full-screen portfolio loader with a 3D developer typing at a glowing desk.
 *
 * <Loader onDone={() => setLoading(false)} />
 *
 * Props
 *  ready        keep false until your own assets are ready (e.g. portrait video)
 *  minDuration  minimum time to show the loader in ms (default 3200)
 *  onDone       called after the exit animation finishes
 */
export default function Loader({ ready = true, minDuration = 3200, onDone }) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  const pageLoaded = useRef(document.readyState === "complete");
  const readyRef = useRef(ready);
  readyRef.current = ready;

  useEffect(() => {
    if (pageLoaded.current) return;
    const onLoad = () => (pageLoaded.current = true);
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = prev);
  }, []);

  useEffect(() => {
    const t0 = performance.now();
    let p = 0;
    let raf = 0;
    let timer;

    const tick = (now) => {
      const elapsed = now - t0;
      const done = pageLoaded.current && readyRef.current && elapsed >= minDuration;
      const target = done ? 100 : Math.min(90, (elapsed / minDuration) * 90);
      p += Math.max((target - p) * 0.08, done ? 0.4 : 0);
      if (p > target) p = target;
      setProgress(p);

      if (p >= 99.9) {
        setProgress(100);
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        setLeaving(true);
        timer = setTimeout(() => {
          setGone(true);
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          onDone && onDone();
        }, 900);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [minDuration]); // eslint-disable-line react-hooks/exhaustive-deps

  if (gone) return null;

  const msg = MESSAGES[Math.min(MESSAGES.length - 1, Math.floor(progress / 34))];

  return (
    <div className={`loader ${leaving ? "loader--leaving" : ""}`} role="status" aria-live="polite" aria-label="Loading portfolio">
      <div className="loader__bg" aria-hidden="true" />
      <div className="loader__content">
        <Scene />
        <p className="loader__count">{String(Math.round(progress)).padStart(3, "0")}<span>%</span></p>
        <div className="loader__progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
        <p className="loader__msg">{msg}<i aria-hidden="true">...</i></p>
      </div>
    </div>
  );
}
