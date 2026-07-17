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
      {/* === HERO — cinematic background image with overlay === */}
      <section className="relative min-h-[100dvh] overflow-hidden">
        {/* Background image — UBRA weaving artisan */}
        <Image
          src="https://www.ubra.shop/images/museum/traditional-filipino-abaca-weaving-loom-artisan-ha.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Dark cinematic overlay — strong on left for text readability */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(10,18,5,0.92) 0%, rgba(10,18,5,0.82) 40%, rgba(10,18,5,0.55) 70%, rgba(10,18,5,0.3) 100%)' }} />
        {/* Grain texture */}
        <div className="grain-overlay absolute inset-0" />
        {/* Subtle warm ambient glow */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 20% 30%, rgba(181,135,58,0.1) 0%, transparent 60%)' }} />

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-24 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-0 lg:min-h-[100dvh]">
          {/* Left — content */}
          <div className="max-w-xl animate-fade-in-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-amber-400 backdrop-blur-sm">
              <Stamp className="h-3.5 w-3.5" /> Cultural Discovery
            </span>
            <h1 className="mt-7 font-serif text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
              Collect the stories
              <br />
              <span className="text-amber-400">of Filipino craft</span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/70 sm:text-lg">
              Explore traditional crafts, complete cultural challenges, and fill
              your own digital passport with stamps from across the Philippines.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="press-effect group inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-[#1c1917] shadow-lg transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-xl"
                style={{ backgroundColor: '#c9a04d', boxShadow: '0 10px 25px -5px rgba(201,160,77,0.3)' }}
              >
                Start your journey
                <span className="grid h-6 w-6 place-items-center rounded-full bg-black/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-white/40 hover:bg-white/10"
              >
                Sign in
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-10 flex items-center gap-6 text-[11px] font-medium uppercase tracking-wider text-white/40">
              <span>10 Crafts</span>
              <span className="h-3 w-px bg-white/20" />
              <span>3 Regions</span>
              <span className="h-3 w-px bg-white/20" />
              <span>100% Free</span>
            </div>
          </div>

          {/* Right — passport preview floating card */}
          <div className="hidden animate-gentle-float lg:flex lg:justify-end">
            {/* Outer shell — Double Bezel */}
            <div className="rounded-[2rem] bg-white/5 p-2 ring-1 ring-white/10 backdrop-blur-sm">
              {/* Inner passport */}
              <div className="passport-cover w-[300px] rounded-[calc(2rem-0.5rem)] p-6 shadow-2xl shadow-black/40">
                <div className="flex flex-col items-center gap-3 py-8 text-center">
                  <div className="grid h-14 w-14 place-items-center rounded-full border border-amber-500/30 bg-amber-500/10">
                    <Stamp className="h-7 w-7 text-amber-500" />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-400">
                    UBRA Digital Passport
                  </p>
                  <div className="h-px w-20 bg-amber-500/20" />
                  <p className="text-[9px] uppercase tracking-[0.2em] text-amber-400/50">
                    Republic of the Philippines
                  </p>
                </div>
                {/* Mini stamp preview */}
                <div className="mt-2 rounded-xl passport-page p-4">
                  <div className="grid grid-cols-3 gap-3">
                    {["Burnay", "Bulul", "T'nalak", "Santos", "Capiz", "Piña"].map((name, i) => {
                      const rotations = ['-rotate-[2deg]', 'rotate-[1deg]', '-rotate-[3deg]', 'rotate-[2deg]', '-rotate-[1deg]', 'rotate-[2deg]'];
                      return (
                        <div key={name} className={`flex flex-col items-center gap-1 ${rotations[i]}`}>
                          <div className="stamp-unlocked grid h-10 w-10 place-items-center">
                            <Stamp className="h-3.5 w-3.5 text-[var(--passport-stamp-ink)]" />
                          </div>
                          <span className="text-[7px] font-medium text-muted-foreground">{name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade to background */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--background)] to-transparent" />
      </section>

      {/* === HOW IT WORKS === */}
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="max-w-lg">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
            How it works
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            A simple loop that turns heritage discovery into a collectible
            adventure.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/5"
            >
              {/* Step number watermark */}
              <span className="absolute -right-2 -top-4 font-serif text-[5rem] font-bold leading-none text-border/50 transition-colors duration-500 group-hover:text-primary/10">
                {i + 1}
              </span>

              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/20">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="relative mt-5 font-serif text-xl font-semibold text-secondary">
                {title}
              </h3>
              <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* === FEATURED CRAFTS — overlapping image collage with depth === */}
      <section className="relative overflow-hidden bg-secondary py-24">
        {/* Subtle grain */}
        <div className="grain-overlay absolute inset-0 opacity-30" />
        {/* Ambient glow */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(181,135,58,0.06) 0%, transparent 50%)' }} />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
            {/* Left — text on dark bg */}
            <div className="animate-slide-in-left">
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-amber-400">
                <Compass className="h-3.5 w-3.5" /> Featured Collection
              </span>
              <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ten crafts. Three islands.
                <br />
                <span className="text-amber-400">One passport.</span>
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-white/60">
                From Burnay pottery in Ilocos to T&rsquo;nalak dream cloth in
                Mindanao — each holds a cultural story waiting to be collected.
              </p>
              <Link
                href="/signup"
                className="press-effect group mt-8 inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-[#1c1917] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-lg"
                style={{ backgroundColor: '#c9a04d' }}
              >
                Create your passport
                <span className="grid h-6 w-6 place-items-center rounded-full bg-black/10 transition-transform duration-500 group-hover:translate-x-0.5">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </div>

            {/* Right — staggered image grid with depth */}
            <div className="relative grid grid-cols-12 grid-rows-6 gap-3">
              {/* Large top-left image */}
              <div className="col-span-7 row-span-4 overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-2xl shadow-black/30">
                <Image
                  src="https://www.ubra.shop/images/museum/burnay-pottery-traditional-ilocos-clay-jars-terrac.jpg"
                  alt="Burnay Pottery"
                  width={500}
                  height={400}
                  className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.03]"
                />
              </div>
              {/* Top-right tall image */}
              <div className="col-span-5 row-span-3 overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-xl shadow-black/20 translate-y-4">
                <Image
                  src="https://www.ubra.shop/images/museum/ifugao-bulul-wooden-rice-god-statue-traditional-ca.jpg"
                  alt="Bulul Wood Carving"
                  width={300}
                  height={350}
                  className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.03]"
                />
              </div>
              {/* Bottom-left small */}
              <div className="col-span-4 row-span-2 overflow-hidden rounded-xl ring-1 ring-white/10 shadow-lg shadow-black/20 -translate-y-2">
                <Image
                  src="https://www.ubra.shop/images/museum/tboli-tnalak-cloth-traditional-filipino-weaving-ge.jpg"
                  alt="T'nalak Cloth"
                  width={250}
                  height={180}
                  className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.03]"
                />
              </div>
              {/* Bottom-center */}
              <div className="col-span-4 row-span-3 overflow-hidden rounded-xl ring-1 ring-white/10 shadow-lg shadow-black/20 translate-y-2">
                <Image
                  src="https://www.ubra.shop/images/museum/delicate-pina-cloth-pineapple-fiber-filipino-texti.jpg"
                  alt="Piña Cloth"
                  width={250}
                  height={200}
                  className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.03]"
                />
              </div>
              {/* Bottom-right */}
              <div className="col-span-4 row-span-3 overflow-hidden rounded-xl ring-1 ring-white/10 shadow-lg shadow-black/20 -translate-y-3">
                <Image
                  src="https://www.ubra.shop/images/museum/kulintang-brass-gong-set-mindanao-traditional-musi.jpg"
                  alt="Kulintang Gong Craft"
                  width={250}
                  height={200}
                  className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.03]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === ARTISAN SPOTLIGHT — full-width cinematic image section === */}
      <section className="relative overflow-hidden py-24">
        {/* BG image — hands weaving */}
        <div className="absolute inset-0">
          <Image
            src="https://www.ubra.shop/images/museum/hands-of-elderly-filipino-woman-weaving-traditiona.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)]/95 via-[var(--background)]/80 to-[var(--background)]/40" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-lg">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-accent">
              The Hands Behind The Craft
            </span>
            <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
              Every stamp has a story. Every story has a maker.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
              Behind every craft in your passport is a living tradition — hands
              that have practiced for decades, techniques passed through
              generations, and communities keeping heritage alive.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Discover their stories on{" "}
              <a
                href="https://www.ubra.shop/museum"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary underline-offset-2 hover:underline"
              >
                UBRA
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* === CTA === */}
      <section className="mx-auto max-w-6xl px-4 pb-24 pt-12 sm:px-6">
        {/* Outer shell */}
        <div className="rounded-[2.5rem] bg-primary/5 p-2 ring-1 ring-primary/10">
          {/* Inner card */}
          <div className="rounded-[calc(2.5rem-0.5rem)] bg-primary px-6 py-16 text-center shadow-xl shadow-primary/10 sm:px-12">
            <h2 className="font-serif text-3xl font-bold text-primary-foreground sm:text-4xl">
              Ready to begin?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base text-primary-foreground/70">
              Your first stamp is one craft away. Start exploring and let your
              passport tell the story.
            </p>
            <Link
              href="/signup"
              className="press-effect group mt-8 inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-sm font-bold text-[#1c1917] shadow-lg transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-xl"
              style={{ backgroundColor: '#c9a04d' }}
            >
              Start your journey
              <span className="grid h-7 w-7 place-items-center rounded-full bg-black/10 transition-transform duration-500 group-hover:translate-x-1">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
            <p className="mt-10 font-serif text-xs italic text-primary-foreground/40">
              {UBRA_TAGLINE}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
