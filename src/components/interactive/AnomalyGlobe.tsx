"use client";

import Link from "next/link";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { ArrowRight, Crosshair } from "lucide-react";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import {
  AdditiveBlending,
  Group,
  MathUtils,
  TextureLoader,
} from "three";
import { anomalies } from "@/lib/anomalies";

type GlobeVariant = "home" | "full";
type EquatorStyle = CSSProperties & { "--equator-y": string };

function latLonToVector3(lat: number, lon: number, radius = 1.075) {
  const phi = MathUtils.degToRad(90 - lat);
  const theta = MathUtils.degToRad(lon + 180);

  return [
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ] as [number, number, number];
}

function GlobeScene({
  selected,
  setSelected,
  setHovered,
  variant,
}: {
  selected: number;
  setSelected: (index: number) => void;
  setHovered: (index: number | null) => void;
  variant: GlobeVariant;
}) {
  const group = useRef<Group>(null);
  const earth = useLoader(TextureLoader, "/images/globe/earth_day.jpg");
  const normal = useLoader(TextureLoader, "/images/globe/earth_normal.jpg");

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.y = clock.elapsedTime * (variant === "home" ? 0.08 : 0.045);
  });

  return (
    <group ref={group} scale={variant === "home" ? 1 : 1.16}>
      <mesh>
        <sphereGeometry args={[1, 96, 96]} />
        <meshStandardMaterial
          map={earth}
          normalMap={normal}
          normalScale={[0.1, 0.1]}
          color="#d8f4f5"
          emissive="#12333a"
          emissiveIntensity={0.08}
          roughness={0.74}
          metalness={0.02}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.018, 96, 96]} />
        <meshBasicMaterial
          color="#031018"
          transparent
          opacity={0.06}
          blending={AdditiveBlending}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.052, 64, 64]} />
        <meshBasicMaterial
          color="#00e5ff"
          transparent
          opacity={0.045}
          blending={AdditiveBlending}
        />
      </mesh>
      {anomalies.map((marker, index) => {
        const active = index === selected;
        return (
          <group key={marker.name} position={latLonToVector3(marker.lat, marker.lon)}>
            <mesh
              onClick={(event) => {
                event.stopPropagation();
                setSelected(index);
              }}
              onPointerOver={(event) => {
                event.stopPropagation();
                setHovered(index);
                document.body.style.cursor = "pointer";
              }}
              onPointerOut={() => {
                setHovered(null);
                document.body.style.cursor = "";
              }}
            >
              <sphereGeometry args={[active ? 0.038 : 0.029, 18, 18]} />
              <meshBasicMaterial color={active ? "#d4a030" : "#00e5ff"} />
            </mesh>
            <mesh>
              <sphereGeometry args={[active ? 0.105 : 0.074, 18, 18]} />
              <meshBasicMaterial
                color={active ? "#d4a030" : "#00e5ff"}
                transparent
                opacity={active ? 0.2 : 0.12}
                blending={AdditiveBlending}
              />
            </mesh>
            {variant === "full" && (
              <Html center distanceFactor={8} className="anomaly-marker-label">
                {marker.name}
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}

export function AnomalyGlobe({
  variant = "full",
  compact = false,
}: {
  variant?: GlobeVariant;
  compact?: boolean;
}) {
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [equatorY, setEquatorY] = useState<number | null>(null);
  const marker = anomalies[hovered ?? selected];
  const isHome = variant === "home" || compact;
  const equatorStyle: EquatorStyle | undefined =
    equatorY === null ? undefined : { "--equator-y": `${equatorY}px` };

  useEffect(() => {
    const root = rootRef.current;
    const viewport = viewportRef.current;
    if (!root || !viewport) return;

    const updateEquatorY = () => {
      const rootRect = root.getBoundingClientRect();
      const viewportRect = viewport.getBoundingClientRect();
      const globeCenterY = viewportRect.top - rootRect.top + viewportRect.height / 2;
      setEquatorY(globeCenterY);
    };

    const frame = window.requestAnimationFrame(updateEquatorY);

    const resizeObserver = new ResizeObserver(updateEquatorY);
    resizeObserver.observe(root);
    resizeObserver.observe(viewport);
    window.addEventListener("resize", updateEquatorY);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateEquatorY);
    };
  }, [isHome]);

  return (
    <div
      ref={rootRef}
      className={isHome ? "anomaly-globe anomaly-globe-home" : "anomaly-globe anomaly-globe-full"}
      style={equatorStyle}
    >
      <div className="anomaly-globe-grid" aria-hidden="true" />
      <div className="anomaly-equator" aria-hidden="true">
        <span>EQUATOR</span>
      </div>
      <div ref={viewportRef} className="anomaly-globe-viewport">
        <Canvas
          camera={{ position: [0, 0.04, isHome ? 4.85 : 3.65], fov: isHome ? 30 : 36 }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={1.8} />
          <directionalLight position={[4, 2.6, 3]} intensity={4.2} color="#f4ffff" />
          <directionalLight position={[-3, -1.2, -2]} intensity={2.2} color="#d9b66a" />
          <pointLight position={[0, 0, 3]} intensity={1.1} color="#8df7ff" />
          <GlobeScene
            selected={selected}
            setSelected={setSelected}
            setHovered={setHovered}
            variant={variant}
          />
          <OrbitControls
            enablePan={false}
            enableZoom={!isHome}
            rotateSpeed={0.62}
            minDistance={2.45}
            maxDistance={4.4}
          />
        </Canvas>
      </div>
      <div className="anomaly-globe-equator-line" aria-hidden="true" />
      <div className="anomaly-status-card">
        <span>GATEWAY STATUS</span>
        <strong>{marker.name}</strong>
        <em>{marker.status}</em>
      </div>
      {isHome && (
        <Link href="/gateways" className="map-button">
          EXPLORE THE MAP <Crosshair size={15} /> <ArrowRight size={15} />
        </Link>
      )}
    </div>
  );
}
