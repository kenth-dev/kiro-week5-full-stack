export default function ExploreLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="skeleton h-9 w-64 rounded-lg" />
      <div className="skeleton mt-2 h-4 w-80 rounded" />
      <div className="mt-6 flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton h-9 w-20 rounded-full" />
        ))}
      </div>
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-xl border border-border bg-card"
          >
            <div className="skeleton aspect-[4/3] w-full" />
            <div className="space-y-2 p-4">
              <div className="skeleton h-5 w-24 rounded-full" />
              <div className="skeleton h-5 w-40 rounded" />
              <div className="skeleton h-4 w-full rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
