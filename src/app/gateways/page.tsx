import { AnomalyGlobe } from "@/components/interactive/AnomalyGlobe";
import { SiteShell } from "@/components/layout/SiteShell";
import { Panel } from "@/components/ui/Panel";
import { anomalies } from "@/lib/anomalies";

export default function GatewaysPage() {
  return (
    <SiteShell>
      <main className="w-full max-w-none px-4 py-10 md:px-6 xl:px-8">
        <section className="text-center md:text-left">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-gold">Global Anomaly Map</p>
          <h1 className="mt-4 text-4xl font-semibold text-foam md:text-6xl">Gateway signals along the seam</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-foam/75 md:mx-0">
            Drag the globe to rotate. Tap or click anomaly markers to inspect the current archive status.
          </p>
        </section>
        <div className="mt-8">
          <AnomalyGlobe />
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {anomalies.map((anomaly) => (
            <Panel key={anomaly.name}>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-gold">
                {anomaly.status}
              </p>
              <h2 className="mt-3 text-xl font-semibold text-foam">{anomaly.name}</h2>
              <p className="mt-3 text-sm text-cyan">{anomaly.coordinates}</p>
            </Panel>
          ))}
        </div>
      </main>
    </SiteShell>
  );
}
