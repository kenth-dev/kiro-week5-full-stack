import { Compass, Globe, Stamp } from "lucide-react";

import type { PassportStats as Stats } from "@/lib/queries";
import { ProgressBar } from "@/components/progress-bar";

export function PassportStats({ stats }: { stats: Stats }) {
  const tiles = [
    {
      label: "Stamps",
      value: stats.stampsCollected,
      icon: Stamp,
    },
    {
      label: "Crafts",
      value: `${stats.craftsExplored}/${stats.totalCrafts}`,
      icon: Compass,
    },
    {
      label: "Regions",
      value: `${stats.regionsDiscovered}/3`,
      icon: Globe,
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="grid grid-cols-3 divide-x divide-border">
        {tiles.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="flex flex-col items-center justify-center px-3 py-5 sm:px-6"
          >
            <Icon className="h-5 w-5 text-accent" />
            <span className="mt-2 font-serif text-2xl font-bold tracking-tight text-secondary sm:text-3xl">
              {value}
            </span>
            <span className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              {label}
            </span>
          </div>
        ))}
      </div>
      <div className="border-t border-border px-5 py-4">
        <ProgressBar percent={stats.completionPercent} label="Journey progress" />
      </div>
    </div>
  );
}
