"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { updateDisplayName, type ProfileState } from "@/app/profile/actions";

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-secondary px-6 py-2.5 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-accent disabled:opacity-60"
    >
      {pending ? "Saving…" : "Save"}
    </button>
  );
}

export function ProfileForm({ displayName }: { displayName: string }) {
  const [state, formAction] = useActionState<ProfileState, FormData>(
    updateDisplayName,
    {}
  );

  return (
    <form action={formAction} className="space-y-3">
      <label
        htmlFor="displayName"
        className="block text-sm font-medium text-secondary"
      >
        Display name
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="displayName"
          name="displayName"
          type="text"
          defaultValue={displayName}
          className="flex-1 rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-ring/30"
        />
        <SaveButton />
      </div>
      {state.error && (
        <p className="text-sm font-medium text-destructive">{state.error}</p>
      )}
      {state.message && (
        <p className="text-sm font-medium text-success">{state.message}</p>
      )}
    </form>
  );
}
