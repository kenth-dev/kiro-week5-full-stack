"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <h1 className="font-serif text-2xl font-bold text-secondary">
        Something went wrong
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        We hit a snag loading this page. Please try again.
      </p>
      <div className="mt-6 flex gap-3">
        <button
          onClick={reset}
          className="rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-accent"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-secondary transition-colors hover:bg-muted"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
