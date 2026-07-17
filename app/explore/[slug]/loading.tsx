export default function CraftDetailLoading() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="skeleton h-4 w-32 rounded" />
      <div className="skeleton mt-4 aspect-[16/9] w-full rounded-2xl" />
      <div className="skeleton mt-6 h-6 w-40 rounded-full" />
      <div className="skeleton mt-3 h-9 w-64 rounded-lg" />
      <div className="skeleton mt-3 h-4 w-full rounded" />
      <div className="skeleton mt-2 h-4 w-3/4 rounded" />
      <div className="skeleton mt-8 h-64 w-full rounded-xl" />
    </div>
  );
}
