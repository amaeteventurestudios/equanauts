import Link from "next/link";
import { Activity, Menu } from "lucide-react";
import { SignalWaveform } from "@/components/interactive/SignalWaveform";

const nav = [
  ["Archive", "/archive"],
  ["Map", "/gateways"],
  ["Orders", "/orders"],
  ["Realms", "/realms"],
  ["Transmissions", "/transmissions"],
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-gold/25 bg-abyss/88 backdrop-blur-xl">
      <div className="flex min-h-16 w-full max-w-none items-center justify-between gap-4 px-4 md:px-6 xl:px-8">
        <Link href="/" className="flex items-center gap-3 text-gold">
          <span className="brand-compass" aria-hidden="true">
            <i />
          </span>
          <span className="font-mono text-lg font-bold uppercase tracking-[0.36em]">
            Equanauts
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[0.18em] text-foam/80 md:flex">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="hover:text-cyan">
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <span className="signal-pill hidden min-h-11 items-center gap-2 rounded-full border border-gold/40 px-4 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-cyan sm:inline-flex">
            <Activity size={14} />
            Signal: Stable
            <SignalWaveform />
          </span>
          <button
            className="grid size-11 place-items-center border border-gold/35 text-gold md:hidden"
            aria-label="Open navigation"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>
      <nav className="grid grid-cols-3 border-t border-gold/15 px-3 py-2 text-center text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-foam/75 md:hidden">
        {nav.map(([label, href]) => (
          <Link key={href} href={href} className="min-h-11 py-3 hover:text-cyan">
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
