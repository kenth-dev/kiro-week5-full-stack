"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useFormStatus } from "react-dom";

import { login, signup, type AuthState } from "@/app/login/actions";

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Please wait…" : label}
    </button>
  );
}

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "/passport";
  const action = mode === "login" ? login : signup;
  const [state, formAction] = useActionState<AuthState, FormData>(action, {});

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <h1 className="font-serif text-2xl font-bold text-secondary">
          {mode === "login" ? "Welcome back" : "Start your journey"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {mode === "login"
            ? "Sign in to open your UBRA Digital Passport."
            : "Create an account to begin collecting stamps."}
        </p>

        <form action={formAction} className="mt-6 space-y-4">
          <input type="hidden" name="redirectTo" value={redirectTo} />

          {mode === "signup" && (
            <div>
              <label
                htmlFor="displayName"
                className="mb-1.5 block text-sm font-medium text-secondary"
              >
                Display name{" "}
                <span className="text-muted-foreground">(optional)</span>
              </label>
              <input
                id="displayName"
                name="displayName"
                type="text"
                autoComplete="name"
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-ring/30"
                placeholder="Juan dela Cruz"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-secondary"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-ring/30"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-secondary"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              autoComplete={
                mode === "login" ? "current-password" : "new-password"
              }
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-ring/30"
              placeholder="••••••••"
            />
          </div>

          {state.error && (
            <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive">
              {state.error}
            </p>
          )}
          {state.message && (
            <p className="rounded-lg bg-success/10 px-3 py-2 text-sm font-medium text-success">
              {state.message}
            </p>
          )}

          <SubmitButton label={mode === "login" ? "Sign in" : "Create account"} />
        </form>
      </div>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        {mode === "login" ? (
          <>
            New here?{" "}
            <Link
              href="/signup"
              className="font-semibold text-primary underline underline-offset-2"
            >
              Start your journey
            </Link>
          </>
        ) : (
          <>
            Already have a passport?{" "}
            <Link
              href="/login"
              className="font-semibold text-primary underline underline-offset-2"
            >
              Sign in
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
