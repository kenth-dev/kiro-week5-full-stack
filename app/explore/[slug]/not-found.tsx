import { EmptyState } from "@/components/empty-state";

export default function CraftNotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <EmptyState
        title="Craft not found"
        description="We couldn't find that craft. It may have been moved or the link is incorrect."
        actionLabel="Back to Explore"
        actionHref="/explore"
      />
    </div>
  );
}
