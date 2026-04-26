import { SiteHeader } from "./SiteHeader";

export function SiteShell({
  children,
  home = false,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  return (
    <div className={home ? "min-h-screen overflow-x-hidden bg-abyss text-foam home-document" : "min-h-screen overflow-x-hidden bg-abyss text-foam"}>
      <div className="fixed inset-0 -z-10 ocean-bg" />
      <SiteHeader />
      {children}
      <footer className="site-footer">
        Equanauts Initiative // Eyes open. Depths unknown.
      </footer>
    </div>
  );
}
