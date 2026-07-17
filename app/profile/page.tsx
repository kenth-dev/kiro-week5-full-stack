import { Mail } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { getPassportStats, getProfileName } from "@/lib/queries";
import { PassportStats } from "@/components/passport-stats";
import { ProfileForm } from "@/components/profile-form";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const email =
    typeof data?.claims?.email === "string" ? data.claims.email : "";

  const [name, stats] = await Promise.all([
    getProfileName(),
    getPassportStats(),
  ]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
      <h1 className="font-serif text-3xl font-bold text-secondary">Profile</h1>

      <div className="mt-6 space-y-6">
        <section className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-secondary text-lg font-semibold text-secondary-foreground">
              {(name ?? "U").charAt(0).toUpperCase()}
            </span>
            <div>
              <p className="font-serif text-lg font-semibold text-secondary">
                {name ?? "Explorer"}
              </p>
              <p className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <Mail className="h-3.5 w-3.5" />
                {email}
              </p>
            </div>
          </div>

          <div className="mt-6 border-t border-border pt-6">
            <ProfileForm displayName={name ?? ""} />
          </div>
        </section>

        <section>
          <h2 className="mb-3 font-serif text-xl font-semibold text-secondary">
            Your progress
          </h2>
          <PassportStats stats={stats} />
        </section>
      </div>
    </div>
  );
}
