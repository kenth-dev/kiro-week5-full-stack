import { MapPin } from "lucide-react";

import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  Luzon: "bg-[#e8d9be] text-[#6b4c2a]",
  Visayas: "bg-[#d7e3d2] text-[#3f5e39]",
  Mindanao: "bg-[#e6d3cd] text-[#7a3f2f]",
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
