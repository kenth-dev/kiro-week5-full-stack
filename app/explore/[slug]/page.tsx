import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Building2, Lightbulb } from "lucide-react";

import { getCraftBySlug, getUnlockedCraftIds } from "@/lib/queries";
import { RegionBadge } from "@/components/region-badge";
import { ChallengeCard } from "@/components/challenge-card";
import { UbraLink } from "@/components/ubra-link";
import { UBRA_BASE_URL } from "@/lib/constants";

export default async function CraftDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [craft, unlockedIds] = await Promise.all([
    getCraftBySlug(slug),
    getUnlockedCraftIds(),
  ]);

  if (!craft) notFound();

  const alreadyUnlocked = unlockedIds.has(craft.id);
  const museumUrl = craft.ubra_url ?? `${UBRA_BASE_URL}/museum`;
  const shopUrl = `${UBRA_BASE_URL}/shop`;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
      <Link
        href="/explore"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Explore
      </Link>

      {/* Hero image */}
      <div className="relative mt-4 aspect-[16/9] overflow-hidden rounded-2xl bg-muted">
        {craft.image_url && (
          <Image
            src={craft.image_url}
            alt={craft.name}
            fill
            priority
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
          />
        )}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <RegionBadge islandGroup={craft.island_group} region={craft.region} />
        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
          <Building2 className="h-3.5 w-3.5" />
          {craft.province}
        </span>
      </div>

      <h1 className="mt-2 font-serif text-3xl font-bold text-secondary sm:text-4xl">
        {craft.name}
      </h1>
      <p className="mt-2 text-base text-muted-foreground">
        {craft.short_description}
      </p>

      {/* Cultural background */}
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-secondary/90 sm:text-base">
        <p>{craft.description}</p>
      </div>

      {/* Interesting fact */}
      {craft.interesting_fact && (
        <div className="mt-6 flex gap-3 rounded-xl border border-accent/30 bg-muted/40 p-4">
          <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">
              Did you know?
            </p>
            <p className="mt-1 text-sm text-secondary/90">
              {craft.interesting_fact}
            </p>
          </div>
        </div>
      )}

      {/* Challenge */}
      <div className="mt-8">
        <ChallengeCard
          craftId={craft.id}
          craftName={craft.name}
          question={craft.question}
          options={craft.options}
          ubraUrl={museumUrl}
          alreadyUnlocked={alreadyUnlocked}
        />
      </div>

      {/* UBRA connection */}
      <div className="mt-8 rounded-xl border border-border bg-card p-5 sm:p-6">
        <h2 className="font-serif text-lg font-semibold text-secondary">
          Go deeper on UBRA
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Explore this craft in the UBRA museum or support the artisans who keep
          the tradition alive.
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <UbraLink href={museumUrl}>View in the UBRA Museum</UbraLink>
          <UbraLink href={shopUrl} variant="outline">
            Support this craft on UBRA
          </UbraLink>
        </div>
      </div>
    </div>
  );
}
