import { ExternalLink } from "lucide-react";

import { cn } from "@/lib/utils";

/** An outbound link to the live UBRA platform. Always opens in a new tab. */
export function UbraLink({
  href,
  children,
  variant = "solid",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
        variant === "solid"
          ? "bg-accent text-accent-foreground hover:bg-secondary"
          : "border border-accent text-accent hover:bg-muted",
        className
      )}
    >
      {children}
      <ExternalLink className="h-4 w-4" />
    </a>
  );
}
