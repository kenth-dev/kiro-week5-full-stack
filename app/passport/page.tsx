import Link from "next/link";
import { Compass } from "lucide-react";

import {
  getCrafts,
  getPassportStamps,
  getPassportStats,
  getProfileName,
} from "@/lib/queries";
import { PassportStats } from "@/components/passport-stats";
import { StampCard } from "@/components/stamp-card";
import { EmptyState } from "@/components/empty-state";

export default async function PassportPage() {
  const [name, stats, stamps, crafts] = await Promise.all([
    getProfileName(),
    getPassportStats(),
    getPassportStamps(),
    getCrafts(),
  ]);

  const unlockedByCraft = new Map(stamps.map((s) => [s.craft_id, s]));
  const hasStamps = stamps.length > 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <header className="flex flex-col gap-1">
        <p className="text-sm text-muted-foreground">Welcome back,</p>
        <h1 className="font-serif text-3xl font-bold text-secondary">
          {name ?? "Explorer"}&rsquo;s Passport
        </h1>
      </header>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
        <PassportStats stats={stats} />
        <Link
          href="/explore"
          className="flex items-center justify-center gap-2 rounded-xl bg-secondary px-6 py-4 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-accent lg:h-full"
        >
          <Compass className="h-4 w-4" />
          Continue exploring
        </Link>
      </div>

      {/* Recently unlocked */}
      {hasStamps && (
        <section className="mt-10">
          <h2 className="font-serif text-xl font-semibold text-secondary">
            Recently unlocked
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {stamps.slice(0, 4).map((stamp) => (
              <StampCard
                key={stamp.craft_id}
                stampName={stamp.stamp_name}
                craftName={stamp.name}
                region={stamp.region}
                islandGroup={stamp.island_group}
                imageUrl={stamp.stamp_image_url}
                unlockedAt={stamp.completed_at}
              />
            ))}
          </div>
        </section>
      )}

      {/* Full collection */}
      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-semibold text-secondary">
            Stamp collection
          </h2>
          <span className="text-sm text-muted-foreground">
            {stats.stampsCollected} of {stats.totalCrafts}
          </span>
        </div>

        {hasStamps ? (
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {crafts.map((craft) => {
              const stamp = unlockedByCraft.get(craft.id);
              return (
                <StampCard
                  key={craft.id}
                  stampName={craft.stamp_name}
                  craftName={craft.name}
                  region={craft.region}
                  islandGroup={craft.island_group}
                  imageUrl={craft.stamp_image_url}
                  unlockedAt={stamp?.completed_at ?? null}
                />
              );
            })}
          </div>
        ) : (
          <div className="mt-4">
            <EmptyState
              title="Your passport is waiting for its first stamp."
              description="Explore a Filipino craft, learn its story, and complete a challenge to earn your first stamp."
              actionLabel="Explore Your First Craft"
              actionHref="/explore"
            />
          </div>
        )}
      </section>
    </div>
  );
}
