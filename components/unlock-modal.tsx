"use client";

import Link from "next/link";
import { PartyPopper, Stamp, X } from "lucide-react";

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
      className="fixed inset-0 z-50 grid place-items-center bg-secondary/50 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Stamp unlocked"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-accent/40 bg-card p-6 text-center shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mx-auto grid h-24 w-24 animate-stamp-pop place-items-center rounded-full border-2 border-accent bg-muted">
          <Stamp className="h-11 w-11 text-accent" />
        </div>

        <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-success">
          <PartyPopper className="h-4 w-4" /> Stamp Unlocked
        </p>
        <h2 className="mt-1 font-serif text-2xl font-bold text-secondary">
          {stampName}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          You unlocked the {craftName} stamp. It has been added to your UBRA
          Digital Passport.
        </p>

        <div className="mt-6 flex flex-col gap-2">
          <Link
            href="/passport"
            className="rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-accent"
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
