import { Compass, MapPin, Stamp } from "lucide-react";

import type { PassportStats as Stats } from "@/lib/queries";
import { ProgressBar } from "@/components/progress-bar";

export function PassportStats({ stats }: { stats: Stats }) {
  const tiles = [
    {
      label: "Stamps Collected",
      value: stats.stampsCollected,
      icon: Stamp,
    },
    {
      label: "Crafts Explored",
      value: `${stats.craftsExplored} / ${stats.totalCrafts}`,
      icon: Compass,
    },
    {
      label: "Regions Discovered",
      value: `${stats.regionsDiscovered} / 3`,
      icon: MapPin,
    },
  ];

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="grid grid-cols-3 gap-3">
        {tiles.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="flex flex-col items-center rounded-lg bg-muted/40 px-2 py-4 text-center sm:items-start sm:px-4 sm:text-left"
          >
            <Icon className="h-5 w-5 text-accent" />
            <span className="mt-2 font-serif text-xl font-bold text-secondary sm:text-2xl">
              {value}
            </span>
            <span className="mt-0.5 text-[11px] leading-tight text-muted-foreground sm:text-xs">
              {label}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <ProgressBar percent={stats.completionPercent} label="Overall progress" />
      </div>
    </div>
  );
}
