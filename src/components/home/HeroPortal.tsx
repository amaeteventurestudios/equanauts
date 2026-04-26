"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, FileText } from "lucide-react";

export function HeroPortal() {
  return (
    <section className="hero-portal hud-frame relative overflow-hidden border border-gold/35 bg-[#050c12]">
      <Image
        src="/images/equanauts-hero-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="hero-bg-image"
      />
      <div className="hero-readable-overlay" />
      <div className="hero-cloud-flash" aria-hidden="true" />
      <div className="hero-rig-lights" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="depth-ruler" aria-hidden="true">
        {[100, 200, 300, 400, 500, 600].map((mark) => (
          <span key={mark}>{mark}</span>
        ))}
      </div>
      <div className="hero-location">
        <span className="mini-target" aria-hidden="true" />
        <div>
          <p>GULF OF GUINEA</p>
          <p>COORDINATES</p>
          <p>0.676° N, 3.407° E</p>
        </div>
      </div>
      <div className="hero-copy">
        <p className="classification-label">◎ CLASSIFIED DISCOVERY PROTOCOL</p>
        <h1>
          Earth was never
          <span>
            the <em>destination.</em>
          </span>
        </h1>
        <p className="hero-subhead">A hidden world begins at the boundary.</p>
        <div className="hero-actions">
          <Link href="/archive" className="hud-button hud-button-primary">
            ENTER THE ARCHIVE <ArrowRight size={17} />
          </Link>
          <Link href="/incidents/incident-001-gulf-of-guinea" className="hud-button hud-button-secondary">
            REVIEW INCIDENT 001 <FileText size={15} />
          </Link>
        </div>
      </div>
      <div className="hero-depth">
        <p>DEPTH</p>
        <strong>2,734 M</strong>
        <p>BATHYMETRIC ANOMALY</p>
        <div className="sonar-dial" aria-hidden="true">
          <span />
        </div>
      </div>
      <div className="scanning-label">
        <span />
        SCANNING HORIZON
        <span />
      </div>
    </section>
  );
}
