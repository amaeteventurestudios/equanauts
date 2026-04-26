import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

export function ButtonLink({
  href,
  children,
  variant = "secondary",
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-3 border px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] transition md:w-auto",
        variant === "primary"
          ? "border-gold bg-gold text-abyss shadow-[0_0_28px_rgba(214,161,73,0.28)] hover:bg-gold-soft"
          : "border-cyan/40 bg-cyan/5 text-cyan hover:border-cyan hover:bg-cyan/10",
      )}
    >
      {children}
      <ArrowRight size={16} strokeWidth={1.8} />
    </Link>
  );
}
