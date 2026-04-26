"use client";

import Link from "next/link";
import { ArrowRight, Crosshair } from "lucide-react";

const markers = [
  { label: "Gulf of Guinea Boundary", x: 50, y: 54, active: true },
  { label: "Pacific Node", x: 22, y: 58 },
  { label: "Eastern Indian Ocean", x: 82, y: 61 },
];

export function FlatAnomalyMap() {
  return (
    <div className="flat-map">
      <svg viewBox="0 0 720 300" className="flat-map-svg" aria-hidden="true">
        <defs>
          <filter id="markerGlow">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path d="M82 82c34-22 67-17 92-8 31 12 66 2 99 7 20 3 28 19 15 32-17 18-54 8-78 18-24 11-30 38-56 39-31 2-31-34-55-46-21-10-48-18-17-42Z" />
        <path d="M304 78c45-18 104-13 151 2 33 11 62 31 45 57-13 20-61 12-85 25-23 12-34 38-68 30-31-7-18-35-47-48-21-9-48-44 4-66Z" />
        <path d="M507 107c28-13 77-12 104 4 22 14 32 45 7 59-27 16-48-9-75-1-25 7-55-8-50-31 2-11 4-25 14-31Z" />
        <path d="M182 187c30-10 58-3 64 14 7 19-22 31-53 28-31-2-45-28-11-42Z" />
        <path d="M454 198c23-12 72-6 88 15 15 20-15 40-51 36-31-4-61-33-37-51Z" />
      </svg>
      <div className="equator-line">
        <span>EQUATOR</span>
      </div>
      {markers.map((marker) => (
        <button
          key={marker.label}
          type="button"
          className={marker.active ? "map-marker is-active" : "map-marker"}
          style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
          aria-label={marker.label}
        >
          <span>{marker.label}</span>
        </button>
      ))}
      <Link href="/gateways" className="map-button">
        EXPLORE THE MAP <Crosshair size={15} /> <ArrowRight size={15} />
      </Link>
    </div>
  );
}
