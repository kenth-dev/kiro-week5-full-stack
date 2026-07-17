# UBRA Digital Passport — Product Requirements Document

**Tagline:** Explore Filipino crafts. Learn their stories. Collect your journey.
**Type:** Full-stack cultural discovery web app (responsive, mobile-first)
**Timeline:** Week 5 project — one polished core loop, deployed to production.

---

## 1. Summary

UBRA Digital Passport turns learning about Filipino traditional crafts into a
collectible experience. Users explore crafts from Luzon, Visayas, and Mindanao,
read a short story, answer one simple challenge, and earn a passport stamp that
is saved to their personal, private passport.

**Core loop:** Explore → Learn → Answer Challenge → Earn Stamp → Build Passport

The product must feel like a *digital travel passport*, not a quiz app or an
admin dashboard.

---

## 2. Goals & Non-Goals

### Goals
- Deliver the complete core loop end-to-end, deployed and working in production.
- Demonstrate a real full-stack workflow: auth, persistent per-user data, and
  Row-Level Security proven with two accounts.
- Make collecting stamps feel rewarding on any screen size.

### Non-Goals (out of scope for MVP)
Marketplace/payments, artisan accounts, social feed, realtime, leaderboards,
AI recommendations, interactive PH map, admin dashboard, native app, favorites.

---

## 3. Tech Stack

- **Next.js 16 (App Router)** + **TypeScript** + **React 19**
- **Tailwind CSS 4**
- **Supabase**: Postgres, Auth (email/password), Row-Level Security
- **Vercel** (deploy), **GitHub** (public repo)
- Built in **Kiro IDE** using the Supabase Power and context7 MCP.

> Next.js here may differ from prior versions. Read the relevant guide in
> `node_modules/next/dist/docs/` before writing route/auth/data-fetching code.

---

## 4. Target Users

Filipino students, young adults, tourists, supporters of local artisans, and
anyone curious about Philippine heritage and craftsmanship.

---

## 5. Core User Journey

1. Visitor lands on the marketing page and learns what the passport is.
2. Visitor signs up or signs in.
3. On first sign-up, an empty passport is created automatically.
4. User browses crafts on the Explore page.
5. User opens a craft, reads its story and one cultural fact.
6. User answers a multiple-choice challenge.
7. Correct answer → **Stamp Unlocked** modal → stamp saved permanently.
8. Passport and stats update automatically.
9. User keeps exploring and collecting.

---

## 6. Feature Requirements

### 6.1 Authentication
- Email + password sign-up, sign-in, sign-out.
- Persistent sessions.
- Protected routes: signed-out users hitting a private page are redirected to
  `/login`.
- Sign-up automatically grants an empty passport (create `profiles` row via
  trigger or on first authenticated load — no manual step).

### 6.2 Landing Page (`/`)
Public. Sections: hero, short explanation, "How it works", example passport
preview, call to action.
- Primary CTA: **Start Your Journey** → sign up.
- Secondary CTA: **Sign In**.
- Visual: warm, cultural, modern. Not corporate.

### 6.3 Passport Dashboard (`/passport`)
Authenticated home. Shows:
- User name/email.
- Stamps collected, crafts explored, regions discovered, completion %.
- Recently unlocked stamps.
- "Continue exploring" button.
- Empty state when no stamps yet.

### 6.4 Digital Passport (collection view)
The visual centerpiece. Each unlocked stamp shows illustration, craft name,
region, and unlock date. Locked crafts appear as muted silhouettes.
**Only shows the authenticated user's stamps.**

### 6.5 Explore Crafts (`/explore`)
Grid of craft cards: name, region, short description, image, status
(*Not Explored* / *Stamp Collected*). Card opens the detail page.
Optional filter by island group (Luzon/Visayas/Mindanao) — only if it doesn't
add meaningful time.

### 6.6 Craft Detail (`/explore/[slug]`)
Shows craft name, region, province, image, short description, cultural
background, one interesting fact, the associated stamp, and the challenge.
Content stays concise — no long articles before the challenge.

### 6.7 Challenge System
- One multiple-choice question per craft (3–4 options, one correct).
- **Validation is server-side.** The correct answer is never sent to the client.
- Correct → "Correct. You unlocked a new passport stamp." + unlock flow.
- Incorrect → "Not quite. Try again." User may retry.
- A stamp unlocks only once; repeated correct answers create no duplicates.

### 6.8 Stamp Unlocking
On a correct answer, the server:
1. Verifies the answer.
2. Upserts `user_progress` (unique on `user_id + craft_id`).
3. Records the unlock timestamp.
4. Returns success → client shows a lightweight unlock modal/animation.
5. Passport and stats refresh.

### 6.9 Progress Tracking (derived, not stored)
- Total crafts = count of crafts.
- Completed = count of the user's `user_progress` rows.
- Regions discovered = distinct island groups among completed crafts.
- Completion % = completed / total × 100.

---

## 7. Data Model (Supabase Postgres)

Simplified to **three tables**. Stamp info lives on `crafts` (1 craft = 1 stamp).

### `profiles`
| field | notes |
|---|---|
| `id` (uuid, PK) | equals `auth.users.id` |
| `display_name` | text |
| `created_at`, `updated_at` | timestamptz |

### `crafts` (public, read-only content)
| field | notes |
|---|---|
| `id` (uuid, PK) | |
| `name`, `slug` (unique) | |
| `short_description`, `description` | |
| `region`, `province`, `island_group` | Luzon / Visayas / Mindanao |
| `image_url` | craft photo |
| `interesting_fact` | |
| `stamp_name`, `stamp_image_url` | the collectible stamp |
| `question` | challenge prompt |
| `options` (jsonb) | array of 3–4 strings |
| `correct_answer` | **not selectable by the anon client**; used only in server validation |
| `created_at` | |

> To keep `correct_answer` private, expose crafts to the client through a view
> or select list that omits it, and validate answers in a Route Handler /
> Server Action using the service context or an RPC.

### `user_progress`
| field | notes |
|---|---|
| `id` (uuid, PK) | |
| `user_id` (uuid) | FK → `auth.users.id` |
| `craft_id` (uuid) | FK → `crafts.id` |
| `completed_at` | timestamptz |
| **unique** | `(user_id, craft_id)` — prevents duplicate stamps |

---

## 8. Row-Level Security

RLS **enabled on all tables**. Use `auth.uid()` in policies.

- **`profiles`**: user can read/update only their own row.
- **`user_progress`**: user can read only their own rows; can insert only rows
  where `user_id = auth.uid()`; cannot read others'.
- **`crafts`**: public read (anon + authenticated); no client writes.
  `correct_answer` must not be readable by the client.

**Acceptance:** tested with two accounts — Account A never sees Account B's
progress.

---

## 9. Pages & Components

**Public:** `/`, `/login`, `/signup`
**Authenticated:** `/passport`, `/explore`, `/explore/[slug]`, `/profile`

**Reusable components:** Navbar, MobileNav, CraftCard, CraftGrid, StampCard,
StampCollection, PassportStats, ProgressBar, ChallengeCard, ChallengeOption,
UnlockModal, RegionBadge, EmptyState, LoadingSkeleton.

**Navigation**
- Signed out: Home · Sign In · Start Journey
- Signed in: Passport · Explore · Profile · Logout
- Mobile: bottom nav bar. Desktop: top nav bar.

---

## 10. Responsive Design

Mobile-first.
- **Mobile:** single column, large touch targets, compact stats, bottom nav.
- **Tablet:** two-column craft grid, expanded dashboard.
- **Desktop:** multi-column grid, wider passport, richer dashboard.

Fully functional at every breakpoint.

---

## 11. Visual Direction

Playful, cultural, collectible, warm, modern. The passport is the centerpiece.
Motifs: passport stamps, travel marks, subtle paper texture, careful use of
Philippine craft patterns, region markers, collection cards. Don't overcrowd.
Stamps: circular layout, craft silhouette, region name, small pattern accent;
locked = muted, unlocked = active.

---

## 12. States

**Empty states**
- New passport: "Your passport is waiting for its first stamp." → *Explore Your First Craft*
- No recent stamps: "Your journey is just beginning."
- All crafts done: "You have explored every available craft in this journey."

**Loading:** use skeletons for auth state, crafts, progress, answer submission,
and unlocking — avoid blank pages.

**Errors:** handle auth failures, network errors, missing/invalid craft slugs,
failed submissions/unlocks, and unauthorized access. Show clear, friendly
messages. Never expose raw DB errors or secrets.

---

## 13. Security

- Never expose the Supabase service-role key. Server-only.
- Client env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- Enable RLS before deploy.
- Validate challenge answers server-side.
- Run Supabase security + performance advisors before deployment.

---

## 14. Seed Content (6 crafts)

Balanced across island groups so the passport feels varied.

| Craft | Region | Island Group | Type |
|---|---|---|---|
| Burnay Pottery | Ilocos | Luzon | Pottery |
| Ifugao Wood Carving | Cordillera | Luzon | Wood carving |
| Piña Weaving | Aklan | Visayas | Textile |
| Hablon Weaving | Iloilo | Visayas | Weaving |
| T'nalak Cloth | South Cotabato | Mindanao | Textile |
| Basketry (Tboli/Yakan) | BARMM/Basilan | Mindanao | Basketry |

Each includes a story, one fact, one 3–4 option challenge, and a stamp.

---

## 15. Build Priority

1. Project setup · Supabase connection · Auth · Schema · RLS
2. Passport dashboard · Explore · Craft detail
3. Challenge · Stamp unlock · Progress
4. Responsive · Visual polish · Loading/error states
5. Optional features (only after MVP works)

---

## 16. MVP Acceptance Criteria

- [ ] New user can register, log in, and log out; session persists.
- [ ] Unauthenticated users can't reach private passport pages.
- [ ] Users can browse crafts and open individual craft pages.
- [ ] Users can read cultural info and answer a challenge.
- [ ] Correct answer unlocks a stamp; it's saved permanently and survives refresh.
- [ ] Passport shows collected stamps; stats update correctly.
- [ ] Duplicate stamps cannot be created.
- [ ] User A cannot view User B's progress; RLS enabled and tested.
- [ ] Works on mobile and desktop.
- [ ] Deployed to Vercel; GitHub repo public; full live flow works.

---

## 17. Demo Flow

Open deployed app → landing page → sign in as A → passport (existing stamps) →
explore a new craft → read info → complete challenge → unlock stamp → back to
passport (stamp saved) → log out → sign in as B → B's passport shows none of A's
progress. Proves auth, persistence, per-user data, and RLS.

---

## 18. Future (post-MVP)

Interactive PH map, regional craft trails, achievement badges, favorites,
artisan profiles, QR codes for physical products, shareable passports, Supabase
Storage media, and eventual integration with the broader UBRA marketplace so
users can discover a craft, learn its story, collect its stamp, meet the
artisan, and support them directly.
