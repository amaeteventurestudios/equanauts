"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { AdditiveBlending, BufferGeometry, Float32BufferAttribute, Group } from "three";

function useReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window === "undefined"
      ? false
      : window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const listener = () => setReduced(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  return reduced;
}

function Rings({ pulse }: { pulse: number }) {
  const group = useRef<Group>(null);
  const reduced = useReducedMotion();

  useFrame(({ clock, pointer }) => {
    if (!group.current || reduced) return;
    group.current.rotation.z = clock.elapsedTime * 0.12 + pointer.x * 0.08;
    group.current.rotation.x = -1.15 + pointer.y * 0.08;
    group.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 2.2) * 0.015 + pulse * 0.08);
  });

  const points = Array.from({ length: 7 }, (_, index) => {
    const angle = (Math.PI * 2 * index) / 7;
    return [Math.cos(angle) * 1.05, Math.sin(angle) * 1.05, 0] as const;
  });

  return (
    <group ref={group} rotation={[-1.15, 0, 0]}>
      {[0.65, 1.05, 1.45, 1.85, 2.35].map((radius) => (
        <mesh key={radius}>
          <torusGeometry args={[radius, 0.008, 12, 160]} />
          <meshBasicMaterial color="#00eaff" transparent opacity={0.45} blending={AdditiveBlending} />
        </mesh>
      ))}
      <mesh>
        <torusGeometry args={[1.05 + pulse * 1.4, 0.006, 8, 160]} />
        <meshBasicMaterial color="#d6a149" transparent opacity={Math.max(0, 0.55 - pulse)} />
      </mesh>
      {points.map(([x, y, z], index) => (
        <mesh key={index} position={[x, y, z]}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshBasicMaterial color={index === 0 ? "#d6a149" : "#7afcff"} />
        </mesh>
      ))}
      <mesh>
        <cylinderGeometry args={[0.018, 0.018, 3.2, 16]} />
        <meshBasicMaterial color="#7afcff" transparent opacity={0.62} blending={AdditiveBlending} />
      </mesh>
    </group>
  );
}

function ParticleField() {
  const geometry = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < 900; i += 1) {
      const a = Math.sin(i * 12.9898) * 43758.5453;
      const b = Math.sin((i + 13) * 78.233) * 24634.6345;
      const c = Math.sin((i + 29) * 37.719) * 9137.1234;
      positions.push((a - Math.floor(a) - 0.5) * 8, (b - Math.floor(b) - 0.5) * 3.2, (c - Math.floor(c) - 0.5) * 4);
    }
    const field = new BufferGeometry();
    field.setAttribute("position", new Float32BufferAttribute(positions, 3));
    return field;
  }, []);

  return (
    <points geometry={geometry}>
      <pointsMaterial color="#00eaff" size={0.012} transparent opacity={0.58} blending={AdditiveBlending} />
    </points>
  );
}

export function PulseGeometry() {
  const [pulse, setPulse] = useState(0);
  const [detected, setDetected] = useState(false);

  function triggerPulse() {
    setPulse(1);
    setDetected(true);
    window.setTimeout(() => setPulse(0), 420);
    window.setTimeout(() => setDetected(false), 1800);
  }

  return (
    <button
      type="button"
      onClick={triggerPulse}
      className="group relative min-h-[320px] w-full overflow-hidden border border-cyan/25 bg-black/25 text-left md:min-h-[520px]"
      aria-label="Trigger Pulse Geometry response"
    >
      <div className="absolute inset-0 pulse-fallback" />
      <Canvas camera={{ position: [0, 0.25, 5.2], fov: 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.8} />
        <ParticleField />
        <Rings pulse={pulse} />
      </Canvas>
      <div className="pointer-events-none absolute inset-x-6 bottom-5 flex flex-col items-center justify-between gap-3 text-center font-mono text-[0.68rem] uppercase tracking-[0.22em] text-cyan md:flex-row">
        <span>Scanning Horizon</span>
        <span className={detected ? "opacity-100" : "opacity-0"}>
          Boundary Response Detected
        </span>
      </div>
    </button>
  );
}
