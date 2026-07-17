/** Base URL of the live UBRA platform for outbound deep links. */
export const UBRA_BASE_URL =
  process.env.NEXT_PUBLIC_UBRA_BASE_URL ?? "https://www.ubra.shop";

export const UBRA_TAGLINE = "Made with hands, priced with heart.";

/** Outbound links to the main areas of the UBRA platform (footer). */
export const UBRA_LINKS = [
  { label: "Museum", href: `${UBRA_BASE_URL}/museum` },
  { label: "Shop", href: `${UBRA_BASE_URL}/shop` },
  { label: "Auctions", href: `${UBRA_BASE_URL}/auction` },
  { label: "Community", href: `${UBRA_BASE_URL}/community` },
  { label: "Donate", href: `${UBRA_BASE_URL}/donation` },
] as const;

export const ISLAND_GROUPS = ["Luzon", "Visayas", "Mindanao"] as const;
export type IslandGroup = (typeof ISLAND_GROUPS)[number];
