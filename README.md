# UBRA Digital Passport

Explore Filipino crafts. Learn their stories. Collect your journey.

A full-stack cultural discovery web app and gamified companion to
[UBRA](https://www.ubra.shop). Explore traditional Filipino crafts, read their
stories, complete a cultural challenge, and collect stamps in your own private
digital passport.

**Core loop:** Explore → Learn → Answer Challenge → Earn Stamp → Build Passport

See [`PRD.md`](./PRD.md) for the full product spec.

## Tech stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS 4**
- **Supabase** — Postgres, Auth (email/password), Row-Level Security
- Deployed on **Vercel**

## Architecture highlights

- **Auth** via `@supabase/ssr` with a Next.js `proxy.ts` (the Next 16 rename of
  middleware) that refreshes sessions and protects `/passport`, `/explore`,
  `/profile`.
- **Security**
  - `crafts.correct_answer` is hidden from clients via column-level privileges;
    answers are validated server-side by the `unlock_craft` Postgres RPC.
  - RLS on every table. Users can only read/write their own `profiles` and
    `user_progress` rows.
  - A trigger auto-creates a profile on signup.
- **Derived stats** — stamps, crafts, regions, and completion % are computed
  from `user_progress`, never stored.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

### Environment variables (`.env.local`)

```bash
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<publishable-key>
NEXT_PUBLIC_UBRA_BASE_URL=https://www.ubra.shop
```

### ⚠️ Disable email confirmation for the instant demo

This Supabase project currently has **Confirm email enabled**, so new signups
must click an email link before they can sign in. For the seamless
sign-up → passport demo (and the two-account RLS demo), turn it off:

Supabase Dashboard → **Authentication → Sign In / Providers → Email** →
toggle **Confirm email** off.

With it off, signup logs the user straight into their passport. (The app also
handles the confirmation-on case gracefully with a "check your email" message.)

## Database

Schema lives in [`supabase/migrations/`](./supabase/migrations). Tables:

- `profiles` — `id` (= auth user id), `display_name`, timestamps
- `crafts` — public craft content + the challenge (`correct_answer` restricted)
- `user_progress` — unlocked stamps, unique on `(user_id, craft_id)`

Six seed crafts span Luzon, Visayas, and Mindanao, each deep-linking to its
UBRA museum exhibit.

## Demo flow

1. Sign in as Account A → open Passport → see collected stamps.
2. Explore a new craft → read its story → answer the challenge → unlock a stamp.
3. Return to Passport → the stamp is saved (survives refresh).
4. Log out → sign in as Account B → B's passport shows none of A's progress.

## Deploy

1. Push to a **public GitHub** repo.
2. Import into **Vercel**, add the three env vars above.
3. Deploy. RLS is already enabled; run Supabase's security & performance
   advisors before going live.
