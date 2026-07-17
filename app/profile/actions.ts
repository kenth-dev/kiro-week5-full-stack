"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

export type ProfileState = { error?: string; message?: string };

export async function updateDisplayName(
  _prev: ProfileState,
  formData: FormData
): Promise<ProfileState> {
  const displayName = String(formData.get("displayName") ?? "").trim();
  if (!displayName) {
    return { error: "Display name cannot be empty." };
  }

  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;
  if (!userId) {
    return { error: "You must be signed in." };
  }

  const { error } = await supabase
    .from("profiles")
    .update({ display_name: displayName, updated_at: new Date().toISOString() })
    .eq("id", userId);

  if (error) {
    return { error: "Could not update your name. Please try again." };
  }

  revalidatePath("/profile");
  revalidatePath("/passport");
  return { message: "Display name updated." };
}
