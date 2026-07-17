export default function PassportLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="skeleton h-4 w-28 rounded" />
      <div className="skeleton mt-2 h-9 w-72 rounded-lg" />
      <div className="skeleton mt-6 h-40 w-full rounded-xl" />
      <div className="skeleton mt-10 h-6 w-48 rounded" />
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton h-56 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
