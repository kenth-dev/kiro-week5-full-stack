import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Circle, ArrowRight } from "lucide-react";

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
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {craft.image_url ? (
          <Image
            src={craft.image_url}
            alt={craft.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-muted to-border" />
        )}
        {/* Status pill */}
        <span
          className={cn(
            "absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold backdrop-blur-sm",
            unlocked
              ? "bg-success/90 text-white"
              : "bg-card/80 text-muted-foreground"
          )}
        >
          {unlocked ? (
            <><CheckCircle2 className="h-3 w-3" /> Collected</>
          ) : (
            <><Circle className="h-3 w-3" /> Explore</>
          )}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
        <RegionBadge islandGroup={craft.island_group} region={craft.region} />
        <h3 className="font-serif text-lg font-semibold leading-tight text-secondary">
          {craft.name}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {craft.short_description}
        </p>
        <span className="mt-auto flex items-center gap-1 pt-3 text-sm font-medium text-primary transition-colors group-hover:text-accent">
          {unlocked ? "View stamp" : "Start exploring"}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
