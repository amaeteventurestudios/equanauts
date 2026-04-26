import { RecordCard } from "@/components/archive/RecordCard";
import { SiteShell } from "@/components/layout/SiteShell";
import { getArchiveRecords } from "@/lib/content";

export default function ArchivePage() {
  const records = getArchiveRecords();

  return (
    <SiteShell>
      <main className="w-full max-w-none px-4 py-10 text-center md:px-6 md:text-left xl:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-gold">Equanauts Archive</p>
        <h1 className="mt-4 text-4xl font-semibold text-foam md:text-6xl">Indexed boundary records</h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-foam/75 md:mx-0">
          A classified index of incidents, gateways, realms, orders, transmissions, relic patterns, and early story records.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {records.map((record) => (
            <RecordCard key={`${record.collection}-${record.slug}`} record={record} />
          ))}
        </div>
      </main>
    </SiteShell>
  );
}
