export function ProgressBar({
  percent,
  label,
}: {
  percent: number;
  label?: string;
}) {
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <div>
      {label && (
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{label}</span>
          <span className="font-semibold tabular-nums text-secondary">
            {clamped}%
          </span>
        </div>
      )}
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? "Progress"}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary via-primary/80 to-accent transition-[width] duration-700 ease-out"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
