import Link from "next/link";
import Image from "next/image";
import { BookOpen, Compass, Stamp, Trophy, ArrowRight } from "lucide-react";

import { UBRA_TAGLINE } from "@/lib/constants";

const steps = [
  {
    icon: Compass,
    title: "Explore",
    text: "Browse crafts from across the Philippine archipelago.",
  },
  {
    icon: BookOpen,
    title: "Learn",
    text: "Read short cultural stories behind each tradition.",
  },
  {
    icon: Trophy,
    title: "Challenge",
    text: "Answer one question to prove what you discovered.",
  },
  {
    icon: Stamp,
    title: "Collect",
    text: "Earn passport stamps and build your cultural journey.",
  },
];

export default function LandingPage() {
  return (
    <div className="overflow-x-hidden">
      {/* === HERO — asymmetric split, not the generic centered layout === */}
      <section className="relative min-h-[100dvh] gradient-hero grain-overlay">
        <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_auto] lg:py-0 lg:min-h-[100dvh]">
          {/* Left — content */}
          <div className="max-w-xl animate-fade-in-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-semibold text-primary">
              <Stamp className="h-3.5 w-3.5" /> Cultural Discovery
            </span>
            <h1 className="mt-6 font-serif text-4xl font-bold leading-[1.1] tracking-tight text-secondary sm:text-5xl lg:text-6xl">
              Collect the stories of Filipino craft
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              Explore traditional crafts, complete cultural challenges, and fill
              your own digital passport with stamps from across the Philippines.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="press-effect inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:shadow-md"
              >
                Start your journey
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-full border border-border bg-card px-7 py-3.5 text-sm font-semibold text-secondary transition-colors hover:bg-muted"
              >
                Sign in
              </Link>
            </div>
          </div>

          {/* Right — passport preview visual */}
          <div className="hidden animate-gentle-float lg:block">
            <div className="passport-cover w-[280px] rounded-2xl p-5">
              <div className="flex flex-col items-center gap-3 py-6 text-center">
                <Stamp className="h-10 w-10 text-[var(--passport-gold)]" />
                <p className="gold-emboss text-xs font-bold uppercase tracking-[0.2em]">
                  UBRA Digital Passport
                </p>
                <div className="mt-2 h-px w-16 bg-[var(--passport-gold)]/30" />
                <p className="mt-1 text-[10px] uppercase tracking-widest text-[var(--passport-gold)]/60">
                  Republic of the Philippines
                </p>
              </div>
              {/* Mini stamp preview */}
              <div className="mt-4 grid grid-cols-3 gap-2 rounded-lg passport-page p-3">
                {["Burnay", "Bulul", "T'nalak"].map((name) => (
                  <div key={name} className="flex flex-col items-center gap-1">
                    <div className="stamp-unlocked grid h-11 w-11 place-items-center">
                      <Stamp className="h-4 w-4 text-[var(--passport-stamp-ink)]" />
                    </div>
                    <span className="text-[8px] text-muted-foreground">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === HOW IT WORKS — staggered horizontal scroll on mobile, grid on desktop === */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="font-serif text-2xl font-bold text-secondary sm:text-3xl">
          How it works
        </h2>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          A simple loop that makes cultural discovery feel like an adventure.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <div
              key={title}
              className="group relative rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-5 w-5" />
              </div>
              <span className="absolute right-4 top-4 font-serif text-3xl font-bold text-border">
                {i + 1}
              </span>
              <h3 className="mt-4 font-serif text-lg font-semibold text-secondary">
                {title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* === FEATURED CRAFTS PREVIEW === */}
      <section className="bg-muted/40 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
            {/* Left — image collage */}
            <div className="relative grid grid-cols-2 gap-3">
              <div className="overflow-hidden rounded-xl">
                <Image
                  src="https://www.ubra.shop/images/museum/burnay-pottery-traditional-ilocos-clay-jars-terrac.jpg"
                  alt="Burnay Pottery"
                  width={320}
                  height={240}
                  className="h-48 w-full object-cover transition-transform duration-500 hover:scale-105 sm:h-56"
                />
              </div>
              <div className="overflow-hidden rounded-xl translate-y-6">
                <Image
                  src="https://www.ubra.shop/images/museum/ifugao-bulul-wooden-rice-god-statue-traditional-ca.jpg"
                  alt="Bulul Wood Carving"
                  width={320}
                  height={240}
                  className="h-48 w-full object-cover transition-transform duration-500 hover:scale-105 sm:h-56"
                />
              </div>
              <div className="overflow-hidden rounded-xl -translate-y-3">
                <Image
                  src="https://www.ubra.shop/images/museum/tboli-tnalak-cloth-traditional-filipino-weaving-ge.jpg"
                  alt="T'nalak Cloth"
                  width={320}
                  height={240}
                  className="h-48 w-full object-cover transition-transform duration-500 hover:scale-105 sm:h-56"
                />
              </div>
              <div className="overflow-hidden rounded-xl translate-y-3">
                <Image
                  src="https://www.ubra.shop/images/museum/delicate-pina-cloth-pineapple-fiber-filipino-texti.jpg"
                  alt="Piña Cloth"
                  width={320}
                  height={240}
                  className="h-48 w-full object-cover transition-transform duration-500 hover:scale-105 sm:h-56"
                />
              </div>
            </div>

            {/* Right — text */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-secondary sm:text-3xl">
                Six crafts. Three island groups. One passport.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                From Burnay pottery in Ilocos to T&rsquo;nalak dream cloth in
                Mindanao — each craft holds a cultural story waiting to be
                discovered, learned, and collected.
              </p>
              <Link
                href="/signup"
                className="press-effect mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-md"
              >
                Create your passport
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* === CTA === */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="rounded-3xl bg-secondary px-6 py-14 text-center sm:px-12">
          <h2 className="font-serif text-2xl font-bold text-secondary-foreground sm:text-3xl">
            Ready to begin?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-secondary-foreground/80">
            Your first stamp is one craft away. Start exploring and let your
            passport tell the story.
          </p>
          <Link
            href="/signup"
            className="press-effect mt-7 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-accent-foreground shadow-sm transition-all hover:shadow-md"
          >
            Start your journey
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-8 font-serif text-xs italic text-secondary-foreground/50">
            {UBRA_TAGLINE}
          </p>
        </div>
      </section>
    </div>
  );
}
