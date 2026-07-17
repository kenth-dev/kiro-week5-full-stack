"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

export type ChallengeResult =
  | { status: "correct"; stampName: string; newlyUnlocked: boolean }
  | { status: "incorrect" }
  | { status: "error"; message: string };

/**
 * Validate a challenge answer server-side and unlock the stamp if correct.
 * The correct answer is never sent to the client — the RPC checks it.
 */
export async function submitChallenge(
  craftId: string,
  answerIndex: number
): Promise<ChallengeResult> {
  const supabase = await createClient();

  const { data: claims } = await supabase.auth.getClaims();
  if (!claims?.claims?.sub) {
    return { status: "error", message: "You must be signed in." };
  }

  const { data, error } = await supabase.rpc("unlock_craft", {
    p_craft_id: craftId,
    p_answer: answerIndex,
  });

  if (error) {
    return { status: "error", message: "Something went wrong. Please try again." };
  }

  const result = data as {
    ok: boolean;
    reason?: string;
    stamp_name?: string;
    newly_unlocked?: boolean;
  };

  if (!result?.ok) {
    if (result?.reason === "incorrect") return { status: "incorrect" };
    return { status: "error", message: "Unable to check your answer." };
  }

  revalidatePath("/passport");
  revalidatePath("/explore");
  revalidatePath("/profile");

  return {
    status: "correct",
    stampName: result.stamp_name ?? "New stamp",
    newlyUnlocked: Boolean(result.newly_unlocked),
  };
}
