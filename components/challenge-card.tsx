"use client";

import { useState, useTransition } from "react";
import { CheckCircle2, HelpCircle, XCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { submitChallenge, type ChallengeResult } from "@/app/explore/[slug]/actions";
import { UnlockModal } from "@/components/unlock-modal";

export function ChallengeCard({
  craftId,
  craftName,
  question,
  options,
  ubraUrl,
  alreadyUnlocked,
}: {
  craftId: string;
  craftName: string;
  question: string;
  options: string[];
  ubraUrl?: string | null;
  alreadyUnlocked: boolean;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [result, setResult] = useState<ChallengeResult | null>(null);
  const [solved, setSolved] = useState(alreadyUnlocked);
  const [modalOpen, setModalOpen] = useState(false);
  const [stampName, setStampName] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit() {
    if (selected === null || isPending) return;
    startTransition(async () => {
      const res = await submitChallenge(craftId, selected);
      setResult(res);
      if (res.status === "correct") {
        setSolved(true);
        setStampName(res.stampName);
        setModalOpen(true);
      }
    });
  }

  return (
    <section className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="flex items-center gap-2 text-sm font-semibold text-accent">
        <HelpCircle className="h-4 w-4" />
        Cultural Challenge
      </div>
      <h2 className="mt-2 font-serif text-xl font-semibold text-secondary">
        {question}
      </h2>

      <div className="mt-4 grid gap-2.5">
        {options.map((option, index) => {
          const isSelected = selected === index;
          const isCorrectResult =
            result?.status === "correct" && isSelected;
          const isWrongResult =
            result?.status === "incorrect" && isSelected;

          return (
            <button
              key={index}
              type="button"
              disabled={solved || isPending}
              onClick={() => {
                setSelected(index);
                setResult(null);
              }}
              className={cn(
                "flex items-center justify-between rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors",
                "disabled:cursor-default",
                isCorrectResult
                  ? "border-success bg-success/10 text-success"
                  : isWrongResult
                    ? "border-destructive bg-destructive/10 text-destructive"
                    : isSelected
                      ? "border-accent bg-muted text-secondary"
                      : "border-border bg-background text-secondary hover:border-accent hover:bg-muted/50"
              )}
            >
              {option}
              {isCorrectResult && <CheckCircle2 className="h-4 w-4" />}
              {isWrongResult && <XCircle className="h-4 w-4" />}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      <div className="mt-4 min-h-[1.5rem] text-sm" aria-live="polite">
        {solved && result?.status !== "correct" && (
          <p className="font-medium text-success">
            You already collected this stamp. It is safe in your passport.
          </p>
        )}
        {result?.status === "correct" && (
          <p className="font-medium text-success">
            Correct. You unlocked a new passport stamp.
          </p>
        )}
        {result?.status === "incorrect" && (
          <p className="font-medium text-destructive">Not quite. Try again.</p>
        )}
        {result?.status === "error" && (
          <p className="font-medium text-destructive">{result.message}</p>
        )}
      </div>

      {!solved && (
        <button
          type="button"
          onClick={handleSubmit}
          disabled={selected === null || isPending}
          className="mt-2 w-full rounded-full bg-secondary px-5 py-3 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:px-8"
        >
          {isPending ? "Checking…" : "Submit answer"}
        </button>
      )}

      <UnlockModal
        open={modalOpen}
        stampName={stampName}
        craftName={craftName}
        ubraUrl={ubraUrl}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
}
