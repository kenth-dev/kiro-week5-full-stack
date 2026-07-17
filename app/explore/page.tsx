import Link from "next/link";

import { getCrafts, getUnlockedCraftIds } from "@/lib/queries";
import { ISLAND_GROUPS } from "@/lib/constants";
import { CraftCard } from "@/components/craft-card";
import { cn } from "@/lib/utils";

const filters = ["All", ...ISLAND_GROUPS] as const;

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ group?: string }>;
}) {
  const { group } = await searchParams;
  const activeFilter =
    filters.find((f) => f.toLowerCase() === group?.toLowerCase()) ?? "All";

  const [crafts, unlockedIds] = await Promise.all([
    getCrafts(),
    getUnlockedCraftIds(),
  ]);

  const visible =
    activeFilter === "All"
      ? crafts
      : crafts.filter((c) => c.island_group === activeFilter);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <header>
        <h1 className="font-serif text-3xl font-bold text-secondary">
          Explore Filipino Crafts
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Choose a craft, learn its story, and earn its stamp.
        </p>
      </header>

      {/* Filter tabs */}
      <div className="mt-6 flex flex-wrap gap-2">
        {filters.map((filter) => {
          const href =
            filter === "All" ? "/explore" : `/explore?group=${filter}`;
          const isActive = activeFilter === filter;
          return (
            <Link
              key={filter}
              href={href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-secondary text-secondary-foreground"
                  : "border border-border bg-card text-secondary hover:bg-muted"
              )}
            >
              {filter}
            </Link>
          );
        })}
      </div>

      {/* Grid */}
      {visible.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((craft) => (
            <CraftCard
              key={craft.id}
              craft={craft}
              unlocked={unlockedIds.has(craft.id)}
            />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-center text-sm text-muted-foreground">
          No crafts found for this region yet.
        </p>
      )}
    </div>
  );
}
