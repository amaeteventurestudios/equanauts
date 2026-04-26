import { RecordCard } from "@/components/archive/RecordCard";
import { SiteShell } from "@/components/layout/SiteShell";
import { getCollection } from "@/lib/content";

export default function TransmissionsPage() {
  const transmissions = getCollection("transmissions");

  return (
    <SiteShell>
      <main className="w-full max-w-none px-4 py-10 text-center md:px-6 md:text-left xl:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-gold">Intercepted Signal Logs</p>
        <h1 className="mt-4 text-4xl font-semibold text-foam md:text-6xl">Transmissions</h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-foam/75 md:mx-0">
          Not posts. Not announcements. Fragments received through interference, pressure, and pattern.
        </p>
        <div className="mt-10 grid gap-4">
          {transmissions.map((transmission) => (
            <RecordCard key={transmission.slug} record={transmission} />
          ))}
        </div>
      </main>
    </SiteShell>
  );
}
