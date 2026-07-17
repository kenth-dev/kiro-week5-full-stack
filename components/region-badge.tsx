import { MapPin } from "lucide-react";

import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  Luzon: "bg-primary/10 text-primary",
  Visayas: "bg-[#e2edd8] text-[#3d6b2a]",
  Mindanao: "bg-accent/10 text-accent",
};

export function RegionBadge({
  islandGroup,
  region,
  className,
}: {
  islandGroup: string;
  region?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
        styles[islandGroup] ?? "bg-muted text-muted-foreground",
        className
      )}
    >
      <MapPin className="h-3 w-3" />
      {region ? `${region} · ${islandGroup}` : islandGroup}
    </span>
  );
}
