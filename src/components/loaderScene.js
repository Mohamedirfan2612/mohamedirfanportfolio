/**
 * 3D "developer at a desk" scene for the portfolio loader.
 * Works with three.js r128 / latest:  npm i three@0.128.0
 *
 *   const { dispose } = createLoaderScene(THREE, containerDiv);
 */
export function createLoaderScene(THREE, container, opts = {}) {
  const W = () => container.clientWidth || 560;
  const H = () => container.clientHeight || 460;
  const reduced =
    typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------------------------------------------------------------- renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(W(), H(), false);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.domElement.style.cssText = "width:100%;height:100%;display:block";
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, W() / H(), 0.1, 60);
  const target = new THREE.Vector3(0.6, 1.3, 0);

  // ---------------------------------------------------------------- textures
  const canvasTex = (w, h, draw) => {
    const c = document.createElement("canvas");
    c.width = w; c.height = h;
    draw(c.getContext("2d"), w, h);
    return new THREE.CanvasTexture(c);
  };
  const gradTex = (c1, c2) =>
    canvasTex(256, 256, (g, w, h) => {
      const gr = g.createLinearGradient(0, 0, w, h);
      gr.addColorStop(0, c1); gr.addColorStop(1, c2);
      g.fillStyle = gr; g.fillRect(0, 0, w, h);
      g.fillStyle = "rgba(255,255,255,.16)"; g.fillRect(0, 0, w, 12);
    });
  const glowTex = (rgb) =>
    canvasTex(256, 256, (g, w, h) => {
      const gr = g.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
      gr.addColorStop(0, `rgba(${rgb},.9)`); gr.addColorStop(0.4, `rgba(${rgb},.3)`); gr.addColorStop(1, `rgba(${rgb},0)`);
      g.fillStyle = gr; g.fillRect(0, 0, w, h);
    });
  const textTex = (txt) =>
    canvasTex(128, 64, (g, w, h) => {
      g.font = "600 34px ui-monospace, Menlo, monospace";
      g.textAlign = "center"; g.textBaseline = "middle";
      g.shadowColor = "rgba(96,165,250,.9)"; g.shadowBlur = 10;
      g.fillStyle = "#9cc7ff"; g.fillText(txt, w / 2, h / 2);
    });

  // --------------------------------------------------------------- materials
  const clay = new THREE.MeshStandardMaterial({ color: 0xdde4ef, roughness: 0.62 });
  const clayShade = new THREE.MeshStandardMaterial({ color: 0xd3dbe8, roughness: 0.65 });
  const hairMat = new THREE.MeshStandardMaterial({ color: 0x0d1526, roughness: 0.35, metalness: 0.15 });
  const eyeWhite = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.25 });
  const pupilMat = new THREE.MeshStandardMaterial({ color: 0x0a0f1d, roughness: 0.2 });
  const deskMat = new THREE.MeshStandardMaterial({ color: 0xe9eef7, roughness: 0.5 });
  const navy = new THREE.MeshStandardMaterial({ color: 0x182a55, roughness: 0.45 });
  const kbMat = new THREE.MeshStandardMaterial({ color: 0x141d33, roughness: 0.5 });
  const backTex = gradTex("#4f93f5", "#0f2f86");
  const backMat = new THREE.MeshStandardMaterial({
    map: backTex, emissive: 0xffffff, emissiveMap: backTex, emissiveIntensity: 0.42, roughness: 0.35,
  });
  const screenMat = new THREE.MeshStandardMaterial({ color: 0x0a1530, emissive: 0x2457c5, emissiveIntensity: 0.6 });

  // ----------------------------------------------------------------- helpers
  const UP = new THREE.Vector3(0, 1, 0);
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const shadowed = (o) => { o.traverse((m) => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } }); return o; };

  function capsule(r, len, mat) {
    const g = new THREE.Group();
    g.add(new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, 28, 1), mat));
    const a = new THREE.Mesh(new THREE.SphereGeometry(r, 28, 16), mat); a.position.y = len / 2;
    const b = a.clone(); b.position.y = -len / 2;
    g.add(a, b);
    return shadowed(g);
  }
  function span(obj, a, b) {
    obj.position.copy(a).add(b).multiplyScalar(0.5);
    obj.quaternion.setFromUnitVectors(UP, b.clone().sub(a).normalize());
  }
  function limb(a, b, r, mat, parent = scene) {
    const c = capsule(r, a.distanceTo(b), mat);
    span(c, a, b);
    parent.add(c);
    return c;
  }
  function box(w, h, d, mat, x, y, z, parent = scene) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.position.set(x, y, z); parent.add(shadowed(m)); return m;
  }
  function sphere(r, mat, x, y, z, parent, sx = 1, sy = 1, sz = 1) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(r, 32, 20), mat);
    m.position.set(x, y, z); m.scale.set(sx, sy, sz); parent.add(shadowed(m)); return m;
  }

  // ------------------------------------------------------------------ lights
  scene.add(new THREE.HemisphereLight(0x8fb2ff, 0x060a14, 0.38));
  const key = new THREE.DirectionalLight(0xdfe8ff, 0.42);
  key.position.set(3, 6, 5);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  Object.assign(key.shadow.camera, { left: -4, right: 4, top: 4, bottom: -4, near: 1, far: 20 });
  key.shadow.bias = -0.0008;
  scene.add(key);
  const rimA = new THREE.DirectionalLight(0x3b82f6, 1.5); rimA.position.set(-4, 3, -3); scene.add(rimA);
  const rimB = new THREE.DirectionalLight(0x7db4ff, 1.0); rimB.position.set(4, 3, -4); scene.add(rimB);
  const screenLight = new THREE.PointLight(0x5aa0ff, 1.6, 5, 2); screenLight.position.set(1.3, 1.8, 0.05); scene.add(screenLight);

  // ------------------------------------------------------------------- floor
  const glow = new THREE.Mesh(
    new THREE.PlaneGeometry(7, 5),
    new THREE.MeshBasicMaterial({ map: glowTex("59,130,246"), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.8 })
  );
  glow.rotation.x = -Math.PI / 2; glow.position.set(0.7, 0.002, 0); scene.add(glow);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(14, 14), new THREE.ShadowMaterial({ opacity: 0.4 }));
  floor.rotation.x = -Math.PI / 2; floor.position.y = 0.004; floor.receiveShadow = true; scene.add(floor);

  // ------------------------------------------------------------------- chair
  const chair = new THREE.Group(); scene.add(chair);
  box(0.95, 0.08, 0.95, clay, -0.5, 0.52, 0, chair);
  const back = box(0.07, 0.95, 0.8, clay, -1.0, 1.02, 0, chair); back.rotation.z = 0.12;
  [[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(([sx, sz]) =>
    limb(V(-0.5, 0.5, 0), V(-0.5 + sx * 0.5, 0.03, sz * 0.5), 0.032, clay, chair));
  limb(V(-0.5, 0.5, 0), V(-0.5, 0.22, 0), 0.05, clay, chair);

  // ------------------------------------------------------------------- desk
  box(2.25, 0.07, 1.9, deskMat, 1.28, 1.065, 0);
  [0.3, 2.2].forEach((x) => [-0.8, 0.8].forEach((z) => {
    box(0.045, 1.03, 0.045, deskMat, x, 0.515, z);
    box(0.045, 1.03, 0.045, deskMat, x + 0.075, 0.515, z);
  }));
  [0.34, 2.24].forEach((x) => [-0.8, 0.8].forEach((z) => box(0.04, 0.035, 0.02, clayShade, x, 0.018, z)));
  box(0.07, 0.035, 1.7, clayShade, 0.33, 0.018, 0);
  box(0.07, 0.035, 1.7, clayShade, 2.23, 0.018, 0);

  // ----------------------------------------------------------------- monitor
  const monitor = new THREE.Group(); monitor.position.set(1.75, 0, 0.1); monitor.rotation.y = -0.38; scene.add(monitor);
  box(0.34, 0.035, 0.26, clay, 0, 1.115, 0, monitor);
  box(0.06, 0.34, 0.05, clay, 0, 1.3, 0, monitor);
  const panel = new THREE.Mesh(
    new THREE.BoxGeometry(0.07, 0.88, 1.45),
    [backMat, screenMat, navy, navy, navy, navy]
  );
  panel.position.y = 1.78; panel.castShadow = true; monitor.add(panel);
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex("70,140,255"), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.55 }));
  halo.scale.set(3.2, 2.6, 1); halo.position.set(0.25, 1.78, 0.05); monitor.add(halo);

  // phone on a stand
  const phone = new THREE.Group(); phone.position.set(1.15, 1.1, 0.78); phone.rotation.y = -0.38; scene.add(phone);
  box(0.16, 0.018, 0.2, clay, 0, 0.009, 0, phone);
  const phoneBody = box(0.014, 0.34, 0.17, navy, 0, 0.19, 0, phone); phoneBody.rotation.z = -0.28;
  const phoneBack = new THREE.Mesh(new THREE.PlaneGeometry(0.17, 0.34), new THREE.MeshStandardMaterial({ map: backTex, emissive: 0xffffff, emissiveMap: backTex, emissiveIntensity: 0.4 }));
  phoneBack.position.set(0.0085, 0, 0); phoneBack.rotation.y = Math.PI / 2; phoneBody.add(phoneBack);

  // -------------------------------------------------------------- keyboard
  const kb = new THREE.Group(); kb.position.set(0.62, 1.1, 0); scene.add(kb);
  box(0.72, 0.035, 0.27, kbMat, 0, 0.0175, 0, kb);
  const keys = [];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 11; c++) {
    const m = new THREE.MeshStandardMaterial({ color: 0x2c3a5c, roughness: 0.5, emissive: 0x000000 });
    const k = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.014, 0.045), m);
    k.position.set(-0.3 + c * 0.06, 0.042, -0.09 + r * 0.06);
    kb.add(k); keys.push({ m, lv: 0 });
  }

  // --------------------------------------------------------------- character
  const hips = V(-0.45, 0.74, 0);

  // lower body
  sphere(0.2, clay, hips.x + 0.03, hips.y - 0.02, 0, scene, 1.05, 0.9, 1.85);
  [-1, 1].forEach((s) => {
    const z = s * 0.17;
    limb(V(-0.42, 0.74, z), V(0.4, 0.75, z), 0.165, clay);          // thigh
    limb(V(0.4, 0.75, z), V(0.46, 0.15, z), 0.145, clay);            // shin
    sphere(0.15, clay, 0.56, 0.085, z, scene, 1.5, 0.58, 0.85);      // shoe
  });

  // torso (leans slightly toward the screen, breathes)
  const torso = new THREE.Group(); torso.position.copy(hips); torso.rotation.z = -0.1; scene.add(torso);
  const tBody = capsule(0.34, 0.42, clay); tBody.position.y = 0.43; torso.add(tBody);
  const shoulderN = new THREE.Object3D(); shoulderN.position.set(0.02, 0.77, 0.37); torso.add(shoulderN);
  const shoulderF = new THREE.Object3D(); shoulderF.position.set(0.02, 0.77, -0.37); torso.add(shoulderF);
  [shoulderN, shoulderF].forEach((o) => sphere(0.125, clay, o.position.x, o.position.y, o.position.z, torso));

  // head
  const eyes = [];
  const headPivot = new THREE.Group(); headPivot.position.set(-0.36, 1.7, 0); scene.add(headPivot);
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.115, 0.13, 0.22, 24), clayShade); neck.position.y = 0.07; headPivot.add(shadowed(neck));
  const head = new THREE.Group(); head.position.set(0.07, 0.34, 0); head.scale.setScalar(1.18); headPivot.add(head);
  sphere(0.3, clay, 0, 0, 0, head, 1.0, 1.08, 0.95);
  const hair = new THREE.Mesh(new THREE.SphereGeometry(0.322, 36, 18, 0, Math.PI * 2, 0, 1.5), hairMat);
  hair.position.set(-0.025, 0.035, 0); hair.rotation.z = 0.12; head.add(shadowed(hair));
  sphere(0.17, hairMat, 0.12, 0.2, 0, head, 1.25, 0.62, 1.1);          // quiff
  sphere(0.2, hairMat, -0.17, 0.0, 0, head, 0.8, 1.1, 1.0);            // back of the hair
  [-1, 1].forEach((s) => {
    sphere(0.065, clayShade, -0.02, -0.03, s * 0.285, head, 0.65, 1.0, 0.5);          // ears
    // eyes
    const eye = new THREE.Group(); eye.position.set(0.262, 0.035, s * 0.115); head.add(eye);
    const ball = sphere(0.055, eyeWhite, 0, 0, 0, eye, 0.55, 1, 1);
    const pupil = sphere(0.03, pupilMat, 0.022, 0, 0, eye, 0.5, 1, 1);
    const lid = new THREE.Mesh(new THREE.SphereGeometry(0.06, 20, 10, 0, Math.PI * 2, 0, Math.PI * 0.62), clay);
    lid.scale.set(0.62, 1, 1.02); lid.position.set(0.004, 0.0, 0); eye.add(shadowed(lid));
    const brow = box(0.022, 0.024, 0.11, hairMat, 0.268, 0.135, s * 0.115, head); brow.rotation.x = s * 0.22; brow.rotation.z = -0.1;
    eyes.push({ eye, pupil });
  });
  sphere(0.048, clay, 0.292, -0.035, 0, head, 1.15, 1.0, 0.9);          // nose
  const mouth = new THREE.Mesh(new THREE.TorusGeometry(0.05, 0.009, 8, 20, Math.PI), pupilMat);
  mouth.position.set(0.268, -0.135, 0); mouth.rotation.set(0, Math.PI / 2, Math.PI); head.add(mouth);

  // arms (two-bone IK: shoulder -> elbow -> hand)
  const L1 = 0.62, L2 = 0.6;
  function makeArm(shoulder, pole, restZ, phase) {
    const arm = {
      shoulder, pole, restZ, phase,
      upper: capsule(0.105, L1, clay), fore: capsule(0.093, L2, clay),
      elbow: new THREE.Mesh(new THREE.SphereGeometry(0.105, 24, 14), clay),
      hand: new THREE.Group(), fingers: [],
    };
    scene.add(arm.upper, arm.fore, shadowed(arm.elbow), arm.hand);
    const palm = new THREE.Mesh(new THREE.SphereGeometry(0.085, 24, 14), clay);
    palm.scale.set(1.3, 0.55, 1.05); palm.position.x = 0.05; arm.hand.add(shadowed(palm));
    [-0.045, 0, 0.045].forEach((fz, i) => {
      const pivot = new THREE.Group(); pivot.position.set(0.12, 0, fz);
      const f = capsule(0.022, 0.06, clay); f.rotation.z = Math.PI / 2; f.position.x = 0.045;
      pivot.add(f); arm.hand.add(pivot); arm.fingers.push({ pivot, prev: 0 });
    });
    return arm;
  }
  const arms = [
    makeArm(shoulderN, V(-0.3, -1, 0.7), 0.15, 0.0),
    makeArm(shoulderF, V(-0.3, -1, -0.7), -0.15, 1.7),
  ];
  function solveElbow(S, H, pole) {
    const d = S.distanceTo(H), dist = Math.min(d, L1 + L2 - 0.002);
    const dir = H.clone().sub(S).normalize();
    const a = (L1 * L1 - L2 * L2 + dist * dist) / (2 * dist);
    const h = Math.sqrt(Math.max(L1 * L1 - a * a, 0));
    const p = pole.clone().sub(dir.clone().multiplyScalar(pole.dot(dir))).normalize();
    return { elbow: S.clone().add(dir.clone().multiplyScalar(a)).add(p.multiplyScalar(h)), hand: S.clone().add(dir.multiplyScalar(dist)) };
  }

  // floating code bits
  const bits = ["{ }", "</>", "01", "=>"].map((t, i) => {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: textTex(t), transparent: true, depthWrite: false }));
    s.scale.set(0.34, 0.17, 1); monitor.add(s);
    return { s, ph: i * 0.78, z: -0.35 + i * 0.28 };
  });

  // ---------------------------------------------------------------- animate
  const tmp = V(0, 0, 0), S = V(0, 0, 0);
  let raf = 0;
  const t0 = performance.now();

  function frame(t) {
    // body
    torso.scale.y = 1 + 0.012 * Math.sin(t * 1.9);
    const g = Math.pow(Math.max(0, Math.sin(t * 0.85)), 10);               // glance at the keys
    headPivot.rotation.z = -0.04 - 0.03 * Math.sin(t * 1.7) - 0.2 * g;
    headPivot.rotation.y = 0.05 * Math.sin(t * 0.6);
    chair.rotation.y = 0.006 * Math.sin(t * 0.7);

    // eyes: read across the screen + blink
    const blinkT = (t % 4.6);
    const blink = blinkT > 4.45 ? 1 - Math.sin(((blinkT - 4.45) / 0.15) * Math.PI) * 0.92 : 1;
    eyes.forEach(({ eye, pupil }, i) => {
      eye.scale.y = blink;
      pupil.position.y = -0.006 - g * 0.012 + 0.006 * Math.sin(t * 2.3 + i);
      pupil.position.z = 0.012 * Math.sin(t * 1.4) + 0.006 * Math.sin(t * 5.1);
    });

    // typing
    torso.updateMatrixWorld(true);
    arms.forEach((arm, ai) => {
      const burst = 0.5 + 0.5 * Math.sin(t * 1.1 + arm.phase);
      const sp = t * (9.5 + ai * 1.3) + arm.phase;
      const tapMax = Math.pow(Math.max(0, Math.sin(sp)), 2) * (0.35 + 0.65 * burst);
      arm.shoulder.getWorldPosition(S);
      tmp.set(0.6 - 0.02 + 0.06 * Math.sin(t * 0.9 + arm.phase) + ai * 0.06,
              1.255 - 0.014 * tapMax + 0.004 * Math.sin(t * 3),
              arm.restZ + 0.02 * Math.sin(t * 1.7 + arm.phase));
      const { elbow, hand } = solveElbow(S, tmp, arm.pole);
      span(arm.upper, S, elbow);
      span(arm.fore, elbow, hand);
      arm.elbow.position.copy(elbow);
      arm.hand.position.copy(hand);
      arm.hand.rotation.z = -0.12;
      arm.fingers.forEach((f, i) => {
        const v = Math.pow(Math.max(0, Math.sin(sp * 1.0 + i * 1.9)), 2) * (0.4 + 0.6 * burst);
        f.pivot.rotation.z = -(0.2 + v * 0.55);
        if (v > 0.85 && f.prev <= 0.85) {                                   // key press
          const col = Math.round((hand.x + 0.2 - (0.62 - 0.3)) / 0.06);
          const row = Math.round((hand.z + (i - 1) * 0.045 + 0.09) / 0.06);
          const idx = Math.max(0, Math.min(3, row)) * 11 + Math.max(0, Math.min(10, col));
          keys[idx].lv = 1;
        }
        f.prev = v;
      });
    });
    keys.forEach((k) => { k.lv *= 0.88; k.m.emissive.setRGB(0.25 * k.lv, 0.55 * k.lv, 1.0 * k.lv); });

    // light + glow
    const fl = 0.5 + 0.5 * Math.sin(t * 2.4);
    backMat.emissiveIntensity = 0.34 + 0.16 * fl;
    screenLight.intensity = 1.5 + 0.25 * Math.sin(t * 3.1) + 0.12 * Math.sin(t * 7.3 + 1);
    halo.material.opacity = 0.38 + 0.2 * fl;
    glow.material.opacity = 0.65 + 0.2 * fl;

    // code bits
    bits.forEach((b) => {
      const p = ((t * 0.32 + b.ph) % 1);
      b.s.position.set(0.12, 2.28 + p * 0.5, b.z * 1.3);
      b.s.material.opacity = Math.sin(p * Math.PI) * 0.95;
    });

    // camera: slow orbit
    const ang = 0.3 + 0.1 * Math.sin(t * 0.4), r = 6.6;
    camera.position.set(target.x + r * Math.sin(ang), 2.3 + 0.1 * Math.sin(t * 0.3), target.z + r * Math.cos(ang));
    camera.lookAt(target);
    renderer.render(scene, camera);
  }

  const loop = () => { frame((performance.now() - t0) / 1000); raf = requestAnimationFrame(loop); };
  if (reduced || opts.staticTime != null) frame(opts.staticTime != null ? opts.staticTime : 3.2);
  else loop();

  // ----------------------------------------------------------------- resize
  const onResize = () => { camera.aspect = W() / H(); camera.updateProjectionMatrix(); renderer.setSize(W(), H(), false); };
  const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(onResize) : null;
  ro ? ro.observe(container) : window.addEventListener("resize", onResize);

  return {
    dispose() {
      cancelAnimationFrame(raf);
      ro ? ro.disconnect() : window.removeEventListener("resize", onResize);
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => { m.map && m.map.dispose(); m.dispose(); });
      });
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
