import Link from "next/link";
import { ArchiveRecord } from "@/lib/content";

const routeByCollection: Partial<Record<ArchiveRecord["collection"], string>> = {
  incidents: "/incidents",
};

export function RecordCard({ record }: { record: ArchiveRecord }) {
  const base = routeByCollection[record.collection] ?? "/archive";
  const href = record.collection === "incidents" ? `${base}/${record.slug}` : "/archive";

  return (
    <Link
      href={href}
      className="group block min-h-44 border border-gold/25 bg-abyss/68 p-5 transition hover:border-cyan/60 hover:bg-cyan/5"
    >
      <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-gold">
        {record.collection} {record.classification ? `// ${record.classification}` : ""}
      </p>
      <h3 className="mt-4 text-xl font-semibold text-foam group-hover:text-cyan">
        {record.title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-foam/70">{record.excerpt}</p>
      {record.status && (
        <p className="mt-5 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-cyan">
          {record.status}
        </p>
      )}
    </Link>
  );
}
