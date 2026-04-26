import { cn } from "@/lib/utils";

export function Panel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "archive-panel relative overflow-hidden border border-gold/35 bg-abyss/72 p-5 shadow-[0_0_42px_rgba(0,234,255,0.06)]",
        className,
      )}
    >
      {children}
    </section>
  );
}
