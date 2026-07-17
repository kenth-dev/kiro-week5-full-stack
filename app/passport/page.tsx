import Link from "next/link";
import { Compass, Stamp } from "lucide-react";

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
    <div className="mx-auto max-w-5xl px-4 py-8 pb-24 sm:px-6 sm:py-10">
      {/* Header */}
      <header className="animate-fade-in-up">
        <p className="text-sm font-medium text-muted-foreground">Welcome back,</p>
        <h1 className="mt-1 font-serif text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
          {name ?? "Explorer"}&rsquo;s Passport
        </h1>
      </header>

      {/* Stats + Continue */}
      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_200px] lg:items-stretch">
        <PassportStats stats={stats} />
        <Link
          href="/explore"
          className="press-effect flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 lg:flex-col lg:gap-3"
        >
          <Compass className="h-5 w-5" />
          <span>Continue exploring</span>
        </Link>
      </div>

      {/* === THE PASSPORT BOOK === */}
      <section className="mt-10">
        <div className="flex items-center gap-3">
          <Stamp className="h-5 w-5 text-accent" />
          <h2 className="font-serif text-xl font-semibold text-secondary">
            Your Passport
          </h2>
        </div>

        {hasStamps ? (
          <div className="relative mt-5">
            {/* Passport book outer shell */}
            <div className="passport-cover grain-overlay overflow-hidden rounded-2xl px-4 pb-6 pt-5 sm:rounded-3xl sm:px-6 sm:pt-6">
              {/* Gold header band */}
              <div className="flex items-center justify-between border-b border-[var(--passport-gold)]/30 pb-3">
                <div className="flex items-center gap-2">
                  <Stamp className="h-4 w-4 text-[var(--passport-gold)]" />
                  <span className="gold-emboss text-xs font-bold uppercase tracking-[0.2em]">
                    UBRA Digital Passport
                  </span>
                </div>
                <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--passport-gold)]/70">
                  {stats.stampsCollected} of {stats.totalCrafts}
                </span>
              </div>

              {/* Inner page */}
              <div className="relative mt-4 overflow-hidden rounded-lg passport-page px-3 py-6 sm:px-6 sm:py-8">
                {/* Binding spine */}
                <div className="passport-binding" />

                {/* Stamps grid — scattered with slight rotations like real stamps */}
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                  {crafts.map((craft, i) => {
                    const stamp = unlockedByCraft.get(craft.id);
                    const rotation = ['-rotate-[2deg]', 'rotate-[1deg]', '-rotate-[1deg]', 'rotate-[3deg]', '-rotate-[2deg]', 'rotate-[2deg]'][i % 6];
                    return (
                      <div
                        key={craft.id}
                        className={`transition-transform duration-300 hover:scale-105 hover:rotate-0 ${stamp ? rotation : ''}`}
                        style={{ animationDelay: `${i * 0.05}s` }}
                      >
                        <StampCard
                          stampName={craft.stamp_name}
                          craftName={craft.name}
                          region={craft.region}
                          islandGroup={craft.island_group}
                          imageUrl={craft.stamp_image_url}
                          unlockedAt={stamp?.completed_at ?? null}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Watermark */}
                <div className="pointer-events-none absolute bottom-3 right-4 text-[9px] font-medium uppercase tracking-[0.3em] text-[var(--passport-stamp-ink)]/10">
                  Republic of the Philippines
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-5">
            <EmptyState
              title="Your passport is waiting for its first stamp"
              description="Explore a Filipino craft, learn its story, and complete a challenge to start your collection."
              actionLabel="Explore your first craft"
              actionHref="/explore"
            />
          </div>
        )}
      </section>
    </div>
  );
}
