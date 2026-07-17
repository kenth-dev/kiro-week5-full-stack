import Image from "next/image";
import { Lock, Stamp } from "lucide-react";

import { cn } from "@/lib/utils";
import { formatUnlockDate } from "@/lib/utils";

type StampCardProps = {
  stampName: string;
  craftName: string;
  region: string;
  islandGroup: string;
  imageUrl?: string | null;
  unlockedAt?: string | null;
};

export function StampCard({
  stampName,
  craftName,
  region,
  islandGroup,
  imageUrl,
  unlockedAt,
}: StampCardProps) {
  const unlocked = Boolean(unlockedAt);

  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-xl border p-4 text-center transition-colors",
        unlocked
          ? "border-accent/40 bg-card shadow-sm"
          : "border-dashed border-border bg-muted/30"
      )}
    >
      {/* Circular stamp medallion */}
      <div
        className={cn(
          "relative grid aspect-square w-24 place-items-center overflow-hidden rounded-full border-2",
          unlocked
            ? "border-accent bg-muted"
            : "border-border bg-muted/50 grayscale"
        )}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={stampName}
            fill
            sizes="96px"
            className={cn("object-cover", !unlocked && "opacity-40")}
          />
        ) : (
          <Stamp
            className={cn(
              "h-9 w-9",
              unlocked ? "text-accent" : "text-muted-foreground/50"
            )}
          />
        )}
        {!unlocked && (
          <span className="absolute inset-0 grid place-items-center bg-background/40">
            <Lock className="h-6 w-6 text-muted-foreground" />
          </span>
        )}
      </div>

      <h4
        className={cn(
          "mt-3 font-serif text-sm font-semibold leading-tight",
          unlocked ? "text-secondary" : "text-muted-foreground"
        )}
      >
        {craftName}
      </h4>
      <p className="mt-0.5 text-xs text-muted-foreground">
        {region} · {islandGroup}
      </p>
      <p
        className={cn(
          "mt-2 text-xs font-medium",
          unlocked ? "text-accent" : "text-muted-foreground/70"
        )}
      >
        {unlocked ? `Unlocked ${formatUnlockDate(unlockedAt!)}` : "Locked"}
      </p>
    </div>
  );
}
