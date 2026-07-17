"use client";

import Link from "next/link";
import { Stamp, X } from "lucide-react";

import { UbraLink } from "@/components/ubra-link";

export function UnlockModal({
  open,
  stampName,
  craftName,
  ubraUrl,
  onClose,
}: {
  open: boolean;
  stampName: string;
  craftName: string;
  ubraUrl?: string | null;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-secondary/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Stamp unlocked"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-accent/20 bg-card p-7 text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Stamp animation */}
        <div className="mx-auto stamp-unlocked grid h-28 w-28 animate-stamp-pop place-items-center bg-[var(--passport-page)]">
          <div className="flex flex-col items-center gap-1">
            <Stamp className="h-9 w-9 text-[var(--passport-stamp-ink)]" />
            <span className="text-[7px] font-bold uppercase tracking-widest text-[var(--passport-stamp-ink)]">
              Collected
            </span>
          </div>
        </div>

        <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-success">
          Stamp unlocked
        </p>
        <h2 className="mt-1 font-serif text-2xl font-bold text-secondary">
          {stampName}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The {craftName} stamp has been added to your passport.
        </p>

        <div className="mt-7 flex flex-col gap-2.5">
          <Link
            href="/passport"
            className="press-effect w-full rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-md"
          >
            View my passport
          </Link>
          {ubraUrl && (
            <UbraLink href={ubraUrl} variant="outline">
              See this craft on UBRA
            </UbraLink>
          )}
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
          >
            Keep exploring
          </button>
        </div>
      </div>
    </div>
  );
}
