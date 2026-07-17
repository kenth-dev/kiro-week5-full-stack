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
        "group relative flex flex-col items-center p-5 text-center transition-all duration-300",
        unlocked
          ? "animate-fade-in-up"
          : "opacity-60"
      )}
    >
      {/* Circular stamp — feels like a real passport ink stamp */}
      <div
        className={cn(
          "relative flex aspect-square w-[88px] items-center justify-center overflow-hidden sm:w-[100px]",
          unlocked ? "stamp-unlocked" : "stamp-locked"
        )}
      >
        {imageUrl && unlocked ? (
          <Image
            src={imageUrl}
            alt={stampName}
            fill
            sizes="100px"
            className="object-cover rounded-full"
          />
        ) : unlocked ? (
          <div className="flex flex-col items-center justify-center gap-0.5">
            <Stamp className="h-6 w-6 text-[var(--passport-stamp-ink)]" />
            <span className="text-[8px] font-bold uppercase tracking-widest text-[var(--passport-stamp-ink)]">
              {islandGroup}
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-1">
            <Lock className="h-5 w-5 text-muted-foreground/40" />
          </div>
        )}

        {/* Subtle rotation for that "stamped" feel */}
        {unlocked && (
          <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-[var(--passport-stamp-ink)]/10 rotate-[-3deg]" />
        )}
      </div>

      {/* Info below the stamp */}
      <h4
        className={cn(
          "mt-3 text-sm font-semibold leading-tight",
          unlocked ? "text-secondary" : "text-muted-foreground/60"
        )}
      >
        {craftName}
      </h4>
      <p className="mt-0.5 text-[11px] text-muted-foreground">
        {region}
      </p>
      {unlocked && unlockedAt && (
        <p className="mt-1.5 text-[10px] font-medium text-accent">
          {formatUnlockDate(unlockedAt)}
        </p>
      )}
    </div>
  );
}
