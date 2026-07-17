import "server-only";

import { createClient } from "@/lib/supabase/server";

/** Columns safe to expose to clients — never includes `correct_answer`. */
const CRAFT_PUBLIC_COLUMNS =
  "id, name, slug, short_description, description, region, province, island_group, image_url, interesting_fact, ubra_url, stamp_name, stamp_image_url, question, options, created_at";

export type CraftCard = {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  region: string;
  island_group: string;
  image_url: string | null;
  stamp_name: string;
  stamp_image_url: string | null;
};

export type Craft = CraftCard & {
  description: string;
  province: string;
  interesting_fact: string | null;
  ubra_url: string | null;
  question: string;
  options: string[];
};

export type PassportStamp = {
  craft_id: string;
  name: string;
  slug: string;
  region: string;
  island_group: string;
  stamp_name: string;
  stamp_image_url: string | null;
  completed_at: string;
};

export type PassportStats = {
  totalCrafts: number;
  stampsCollected: number;
  craftsExplored: number;
  regionsDiscovered: number;
  completionPercent: number;
};

/** All crafts for the Explore grid. */
export async function getCrafts(): Promise<Craft[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("crafts")
    .select(CRAFT_PUBLIC_COLUMNS)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return (data ?? []).map(normalizeCraft);
}

/** A single craft by slug, or null if not found. */
export async function getCraftBySlug(slug: string): Promise<Craft | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("crafts")
    .select(CRAFT_PUBLIC_COLUMNS)
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data ? normalizeCraft(data) : null;
}

/** The set of craft ids the current user has unlocked. */
export async function getUnlockedCraftIds(): Promise<Set<string>> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("user_progress")
    .select("craft_id");

  if (error) throw error;
  return new Set((data ?? []).map((row) => row.craft_id));
}

/** The current user's collected stamps, most recent first. */
export async function getPassportStamps(): Promise<PassportStamp[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("user_progress")
    .select(
      "craft_id, completed_at, crafts (name, slug, region, island_group, stamp_name, stamp_image_url)"
    )
    .order("completed_at", { ascending: false });

  if (error) throw error;

  return (data ?? []).flatMap((row) => {
    const craft = row.crafts as unknown as {
      name: string;
      slug: string;
      region: string;
      island_group: string;
      stamp_name: string;
      stamp_image_url: string | null;
    } | null;
    if (!craft) return [];
    return [
      {
        craft_id: row.craft_id,
        completed_at: row.completed_at,
        name: craft.name,
        slug: craft.slug,
        region: craft.region,
        island_group: craft.island_group,
        stamp_name: craft.stamp_name,
        stamp_image_url: craft.stamp_image_url,
      },
    ];
  });
}

/** Derive all passport statistics from crafts + the user's progress. */
export async function getPassportStats(): Promise<PassportStats> {
  const supabase = await createClient();

  const [{ count: totalCrafts }, { data: progress, error }] = await Promise.all(
    [
      supabase.from("crafts").select("id", { count: "exact", head: true }),
      supabase
        .from("user_progress")
        .select("craft_id, crafts (island_group)"),
    ]
  );

  if (error) throw error;

  const total = totalCrafts ?? 0;
  const stampsCollected = progress?.length ?? 0;
  const regions = new Set(
    (progress ?? [])
      .map((row) => {
        const craft = row.crafts as unknown as {
          island_group: string;
        } | null;
        return craft?.island_group;
      })
      .filter(Boolean) as string[]
  );

  return {
    totalCrafts: total,
    stampsCollected,
    craftsExplored: stampsCollected,
    regionsDiscovered: regions.size,
    completionPercent: total > 0 ? Math.round((stampsCollected / total) * 100) : 0,
  };
}

/** The current user's display name (falls back to email local-part). */
export async function getProfileName(): Promise<string | null> {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;
  if (!claims?.sub) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name")
    .eq("id", claims.sub)
    .maybeSingle();

  return (
    profile?.display_name ??
    (typeof claims.email === "string" ? claims.email.split("@")[0] : null)
  );
}

function normalizeCraft(row: {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  description: string;
  region: string;
  province: string;
  island_group: string;
  image_url: string | null;
  interesting_fact: string | null;
  ubra_url: string | null;
  stamp_name: string;
  stamp_image_url: string | null;
  question: string;
  options: unknown;
}): Craft {
  return {
    ...row,
    options: Array.isArray(row.options) ? (row.options as string[]) : [],
  };
}
