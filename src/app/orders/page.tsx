import { RecordCard } from "@/components/archive/RecordCard";
import { SiteShell } from "@/components/layout/SiteShell";
import { getCollection } from "@/lib/content";

export default function OrdersPage() {
  const orders = getCollection("orders");

  return (
    <SiteShell>
      <main className="w-full max-w-none px-4 py-10 text-center md:px-6 md:text-left xl:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-gold">KNOWN ORDERS</p>
        <h1 className="mt-4 text-4xl font-semibold text-foam md:text-6xl">Fragments from older navigators</h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-foam/75 md:mx-0">
          These are not public societies or recruit paths. They are recovered archive structures tied to the boundary.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {orders.map((order) => (
            <RecordCard key={order.slug} record={order} />
          ))}
        </div>
      </main>
    </SiteShell>
  );
}
