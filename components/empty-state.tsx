import Link from "next/link";
import { Stamp } from "lucide-react";

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
}: {
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <div className="passport-border flex flex-col items-center rounded-xl bg-card/60 px-6 py-12 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-full bg-muted text-accent">
        <Stamp className="h-7 w-7" />
      </span>
      <h3 className="mt-4 font-serif text-xl font-semibold text-secondary">
        {title}
      </h3>
      {description && (
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          {description}
        </p>
      )}
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="mt-6 rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-accent"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
