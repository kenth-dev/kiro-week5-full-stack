import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Circle } from "lucide-react";

import type { CraftCard as CraftCardType } from "@/lib/queries";
import { RegionBadge } from "@/components/region-badge";

export function CraftCard({
  craft,
  unlocked,
}: {
  craft: CraftCardType;
  unlocked: boolean;
}) {
  return (
    <Link
      href={`/explore/${craft.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {craft.image_url ? (
          <Image
            src={craft.image_url}
            alt={craft.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full paper-texture" />
        )}
        <span
          className={
            unlocked
              ? "absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-success/90 px-2.5 py-1 text-xs font-semibold text-white"
              : "absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold text-muted-foreground"
          }
        >
          {unlocked ? (
            <>
              <CheckCircle2 className="h-3.5 w-3.5" /> Stamp Collected
            </>
          ) : (
            <>
              <Circle className="h-3.5 w-3.5" /> Not Explored
            </>
          )}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <RegionBadge islandGroup={craft.island_group} region={craft.region} />
        <h3 className="font-serif text-lg font-semibold leading-tight text-secondary">
          {craft.name}
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {craft.short_description}
        </p>
        <span className="mt-auto pt-2 text-sm font-medium text-accent">
          {unlocked ? "View stamp →" : "Explore craft →"}
        </span>
      </div>
    </Link>
  );
}
