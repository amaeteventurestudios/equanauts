import { RecordBody } from "@/components/archive/RecordBody";
import { AnomalyGlobe } from "@/components/interactive/AnomalyGlobe";
import { PulseGeometry } from "@/components/interactive/PulseGeometry";
import { SiteShell } from "@/components/layout/SiteShell";
import { Panel } from "@/components/ui/Panel";
import { getRecord } from "@/lib/content";
import { notFound } from "next/navigation";

export default function Incident001Page() {
  const incident = getRecord("incidents", "incident-001-gulf-of-guinea");

  if (!incident) {
    notFound();
  }

  return (
    <SiteShell>
      <main className="w-full max-w-none px-4 py-10 md:px-6 xl:px-8">
        <section className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr]">
          <div className="text-center lg:text-left">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-gold">
              {incident.classification}
              <span aria-hidden="true"> / </span>
              {incident.status}
            </p>
            <h1 className="mt-4 text-4xl font-semibold text-foam md:text-6xl">{incident.title}</h1>
            <p className="mt-5 font-mono text-sm uppercase tracking-[0.18em] text-cyan">
              {incident.coordinates}
            </p>
            <div className="mt-8">
              <RecordBody body={incident.body} />
            </div>
          </div>
          <PulseGeometry />
        </section>
        <section className="mt-6 grid gap-4 lg:grid-cols-2">
          <Panel>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold">Recovered Warning</p>
            <blockquote className="mt-5 text-3xl font-semibold leading-tight text-gold">
              “You are not the first to find the boundary.”
            </blockquote>
          </Panel>
          <Panel className="p-3">
            <AnomalyGlobe compact />
          </Panel>
        </section>
      </main>
    </SiteShell>
  );
}
