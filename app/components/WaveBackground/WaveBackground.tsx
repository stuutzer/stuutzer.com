"use client";

import { useEffect, useRef } from "react";
import styles from "./WaveBackground.module.css";

const vertexShader = `
  uniform float uTime;
  varying float vHeight;
  varying vec2 vUv;

  void main() {
    vec3 p = position;
    // Main crests run horizontally and travel down the plane
    float h =
      sin(p.y * 0.18 + uTime * 0.6) * 1.9 +
      sin(p.x * 0.22 + uTime * 0.45) * 1.4 +
      sin((p.x + p.y) * 0.1 + uTime * 0.3) * 0.7;
    p.z += h;
    vHeight = h;
    vUv = uv;

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const linesFragmentShader = `
  uniform float uTime;
  uniform vec3 uColorTop;
  uniform vec3 uColorMid;
  uniform vec3 uColorBottom;
  varying float vHeight;
  varying vec2 vUv;

  void main() {
    // Bands of light rolling down the scanlines
    float scan = pow(0.5 + 0.5 * sin(vUv.y * 60.0 - uTime * 2.5), 12.0);
    // A slow diagonal glint sweeping across the whole mesh
    float sweep = fract(uTime * 0.06) * 2.6 - 0.8;
    float glint = smoothstep(0.18, 0.0, abs(vUv.x * 0.8 + vUv.y * 0.4 - sweep));

    // Top-to-bottom colour gradient
    vec3 color = vUv.y > 0.5
      ? mix(uColorMid, uColorTop, (vUv.y - 0.5) * 2.0)
      : mix(uColorBottom, uColorMid, vUv.y * 2.0);
    color = mix(color, vec3(1.0), glint * 0.6);

    // Crests read slightly stronger than troughs
    float crest = clamp((vHeight + 4.0) / 8.0, 0.0, 1.0);
    float alpha = 0.06 + crest * 0.08 + scan * 0.25 + glint * 0.35;
    gl_FragColor = vec4(color, alpha);
  }
`;

export default function WaveBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let cleanup = () => {};

    import("three").then((THREE) => {
      if (disposed) return;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 200);
      camera.position.set(0, 0, 60);
      camera.lookAt(0, 0, 0);

      // Upright plane, turned away from the viewer so the ripples stay visible
      const geometry = new THREE.PlaneGeometry(260, 110, 300, 130);
      const uniforms = {
        uTime: { value: 0 },
        uColorTop: { value: new THREE.Color("#9BBCE8") },
        uColorMid: { value: new THREE.Color("#6F8FBF") },
        uColorBottom: { value: new THREE.Color("#2C4273") },
      };

      // Scanlines join each row of grid vertices so they ride the wave
      const columns = 300 + 1;
      const rows = 130 + 1;
      const lineIndex: number[] = [];
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns - 1; x++) {
          lineIndex.push(y * columns + x, y * columns + x + 1);
        }
      }
      const lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute("position", geometry.attributes.position);
      lineGeometry.setAttribute("uv", geometry.attributes.uv);
      lineGeometry.setIndex(lineIndex);
      const lineMaterial = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader: linesFragmentShader,
        transparent: true,
        depthWrite: false,
        uniforms,
      });

      const wave = new THREE.LineSegments(lineGeometry, lineMaterial);
      wave.rotation.y = -0.35;
      scene.add(wave);

      const resize = () => {
        const { clientWidth: w, clientHeight: h } = container;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      window.addEventListener("resize", resize);

      const start = performance.now();
      let frame = 0;

      const render = () => {
        uniforms.uTime.value = (performance.now() - start) / 1000;
        renderer.render(scene, camera);
        frame = requestAnimationFrame(render);
      };
      render();

      cleanup = () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("resize", resize);
        geometry.dispose();
        lineGeometry.dispose();
        lineMaterial.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return <div ref={containerRef} className={styles.wave} aria-hidden="true" />;
}
