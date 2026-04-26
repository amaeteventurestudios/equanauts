import Link from "next/link";
import { ArrowRight, CirclePlay, Info, Radio, Target } from "lucide-react";
import { AnomalyGlobe } from "@/components/interactive/AnomalyGlobe";
import { HeroPortal } from "@/components/home/HeroPortal";
import { HomeArchiveAccess } from "@/components/home/HomeArchiveAccess";
import { SiteShell } from "@/components/layout/SiteShell";

const orders: {
  name: string;
  fragment: string;
  image: string;
}[] = [
  { name: "THE MERIDIAN WATCH", fragment: "FRAGMENT: M-17", image: "/images/meridian_watch.jpg" },
  { name: "THE CARTOGRAPHERS OF THE SEAM", fragment: "FRAGMENT: C-04", image: "/images/the_cartographers_of_the_seam.jpg" },
  { name: "THE SILENT CURRENT", fragment: "FRAGMENT: S-09", image: "/images/the_silent_current.jpg" },
  { name: "THE SEVEN-POINT ORDER", fragment: "FRAGMENT: 7-3", image: "/images/the_seven_point_order.jpg" },
  { name: "THE RELIC HUNTERS", fragment: "FRAGMENT: R-11", image: "/images/the_relic_hunters.jpg" },
];

const logs = [
  ["LOG 7A-19", "Signal interference reveals patterned language. Source unknown.", "2 HR AGO"],
  ["LOG 3C-24", "Bio-luminescent activity aligns with sub-seabed pulse. Not natural.", "11 HR AGO"],
  ["LOG 9F-41", "An ancient structure matches no known catalog. Origin: Pre-Cataclysmic?", "1 DAY AGO"],
];

export function HomePage() {
  return (
    <SiteShell home>
      <main className="homepage-shell">
        <HeroPortal />

        <section className="dashboard-row dashboard-row-top">
          <Link href="/incidents/incident-001-gulf-of-guinea" className="home-panel incident-panel hud-frame">
            <div className="incident-visual" aria-hidden="true" />
            <div className="panel-header">INCIDENT 001</div>
            <div className="incident-copy">
              <h2>GULF OF GUINEA</h2>
              <p>
                Sonar arrays detected an impossible geometry beneath the surface.
                <br />
                Structure. Motion. Intent.
                <br />
                It shouldn&apos;t exist. But it does.
              </p>
            </div>
            <div className="panel-footer">
              <span className="panel-button">VIEW INCIDENT FILE <Target size={14} /></span>
              <span className="classification">
                CLASSIFICATION <strong>OMEGA-7</strong>
              </span>
            </div>
          </Link>

          <section className="home-panel map-panel hud-frame">
            <div className="panel-header">GLOBAL ANOMALY MAP</div>
            <AnomalyGlobe variant="home" />
          </section>

          <section className="home-panel orders-panel hud-frame">
            <div className="panel-header">
              KNOWN ORDERS <Info size={13} />
            </div>
            <div className="orders-grid">
              {orders.map(({ name, fragment, image }) => (
                <Link href="/orders" key={name} className="order-fragment">
                  <span
                    className="order-art"
                    style={{ backgroundImage: `url(${image})` }}
                    aria-hidden="true"
                  />
                  <strong>{name}</strong>
                  <em>{fragment}</em>
                </Link>
              ))}
            </div>
            <Link href="/orders" className="orders-button">
              OPEN ORDER FRAGMENTS <ArrowRight size={15} />
            </Link>
          </section>
        </section>

        <section className="dashboard-row dashboard-row-bottom">
          <section className="home-panel transmissions-panel hud-frame">
            <div className="panel-header">LATEST TRANSMISSIONS</div>
            <div className="transmission-list">
              {logs.map(([id, message, time]) => (
                <Link href="/transmissions" className="transmission-row" key={id}>
                  <Radio size={22} />
                  <strong>{id}</strong>
                  <span>{message}</span>
                  <time>{time}</time>
                  <CirclePlay size={19} />
                </Link>
              ))}
            </div>
            <Link href="/transmissions" className="wide-panel-link">
              VIEW ALL TRANSMISSIONS <ArrowRight size={15} />
            </Link>
          </section>

          <section className="home-panel archive-access-panel hud-frame">
            <div className="archive-copy">
              <div className="panel-header">EQUANAUTS ARCHIVE</div>
              <h2>
                The truth is not lost.
                <span>It is archived.</span>
              </h2>
              <p>Join the Archive. Receive transmissions. Unlock the unimaginable.</p>
            </div>
            <HomeArchiveAccess />
            <div className="archive-network" aria-hidden="true" />
            <div className="archive-radar" aria-hidden="true">
              <span />
            </div>
          </section>
        </section>
      </main>
    </SiteShell>
  );
}
