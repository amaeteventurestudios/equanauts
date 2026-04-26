import { JoinForm } from "@/components/home/JoinForm";
import { SiteShell } from "@/components/layout/SiteShell";
import { Panel } from "@/components/ui/Panel";

export default function JoinPage() {
  return (
    <SiteShell>
      <main className="grid w-full max-w-none gap-8 px-4 py-10 text-center md:px-6 md:text-left lg:grid-cols-[0.86fr_1fr] xl:px-8">
        <section>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-gold">Request Archive Access</p>
          <h1 className="mt-4 text-4xl font-semibold text-foam md:text-6xl">Open a channel to the archive.</h1>
          <p className="mt-5 text-base leading-8 text-foam/75">
            Access requests are framed as archive clearance, not a newsletter signup. Tell the system why you are seeking the boundary records.
          </p>
        </section>
        <Panel>
          <JoinForm />
        </Panel>
      </main>
    </SiteShell>
  );
}
