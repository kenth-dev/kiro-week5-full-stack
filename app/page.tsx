import Link from "next/link";
import { BookOpen, Compass, Stamp, Trophy } from "lucide-react";

import { UBRA_TAGLINE } from "@/lib/constants";

const steps = [
  {
    icon: Compass,
    title: "Explore",
    text: "Browse traditional Filipino crafts from Luzon, Visayas, and Mindanao.",
  },
  {
    icon: BookOpen,
    title: "Learn",
    text: "Read short cultural stories and discover the meaning behind each craft.",
  },
  {
    icon: Trophy,
    title: "Complete",
    text: "Answer a simple cultural challenge to prove what you learned.",
  },
  {
    icon: Stamp,
    title: "Collect",
    text: "Earn a unique passport stamp and build your personal cultural journey.",
  },
];

const previewStamps = [
  "Burnay Pottery",
  "Bulul Carving",
  "Piña Cloth",
  "T'nalak Weave",
];

export default function LandingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="gradient-hero relative overflow-hidden">
        <div className="paper-texture absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <span className="inline-flex items-center gap-2 rounded-full bg-background/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-secondary">
            <Stamp className="h-3.5 w-3.5" /> UBRA Digital Passport
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl font-serif text-4xl font-bold leading-tight text-[#3d2817] sm:text-5xl">
            Your journey through Filipino craftsmanship starts here.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-[#4a3626] sm:text-lg">
            Discover traditional Filipino crafts, learn their stories, complete
            cultural challenges, and collect stamps in your own digital
            passport.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="w-full rounded-full bg-secondary px-8 py-3.5 text-sm font-semibold text-secondary-foreground shadow-sm transition-colors hover:bg-[#3d2817] sm:w-auto"
            >
              Start Your Journey
            </Link>
            <Link
              href="/login"
              className="w-full rounded-full border border-secondary/30 bg-background/70 px-8 py-3.5 text-sm font-semibold text-secondary transition-colors hover:bg-background sm:w-auto"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold text-secondary">
            How it works
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
            A simple loop that turns learning about heritage into a collectible
            adventure.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <div
              key={title}
              className="rounded-xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-muted text-accent">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Step {i + 1}
                </span>
              </div>
              <h3 className="mt-4 font-serif text-lg font-semibold text-secondary">
                {title}
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Passport preview */}
      <section className="bg-muted/40 py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-3xl font-bold text-secondary">
              A passport that grows with you
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              Every craft you explore adds a stamp to your personal passport.
              Track your progress, revisit the stories you loved, and watch your
              collection of Filipino heritage grow — all saved securely to your
              account.
            </p>
            <Link
              href="/signup"
              className="mt-6 inline-block rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-accent"
            >
              Create your passport
            </Link>
          </div>

          <div className="passport-border rounded-2xl bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="font-serif text-lg font-semibold text-secondary">
                Your UBRA Passport
              </p>
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                4 / 6 stamps
              </span>
            </div>
            <div className="mt-5 grid grid-cols-4 gap-3">
              {previewStamps.map((name) => (
                <div key={name} className="flex flex-col items-center gap-1.5">
                  <span className="grid h-14 w-14 place-items-center rounded-full border-2 border-accent bg-muted text-accent">
                    <Stamp className="h-6 w-6" />
                  </span>
                  <span className="text-center text-[10px] leading-tight text-muted-foreground">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
        <h2 className="font-serif text-3xl font-bold text-secondary">
          Ready to explore?
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Join UBRA Digital Passport and start collecting the stories of
          Filipino craftsmanship.
        </p>
        <Link
          href="/signup"
          className="mt-6 inline-block rounded-full bg-secondary px-8 py-3.5 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-accent"
        >
          Start Your Journey
        </Link>
        <p className="mt-8 font-serif text-sm italic text-muted-foreground">
          {UBRA_TAGLINE}
        </p>
      </section>
    </div>
  );
}
