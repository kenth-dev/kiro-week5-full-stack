# UBRA Digital Passport — Presentation Script

*Taglish. Fun. Mga 5-7 minutes.*

---

## 🎬 INTRO (Landing Page)

> "So, alam niyo yung feeling na ang daming magandang Filipino crafts pero wala tayong naaalala after scrolling? Parang — 'ay ang ganda' — tapos scroll na ulit?
>
> That's the problem we're solving.
>
> UBRA Digital Passport turns learning about Filipino heritage into a *collectible* experience. Think of it like a real passport — pero instead of countries, you're collecting Filipino crafts."

**[Show landing page — point to the passport visual sa hero]**

> "This is connected to UBRA — yung actual platform for Filipino artisans. Pero ito yung gamified version. Explore, learn, answer a challenge, earn a stamp. Simple lang."

---

## 🔐 SIGN UP + AUTH DEMO

**[Click "Start your journey"]**

> "Let's create an account. Supabase Auth tayo — email and password. Wala pang OAuth para simple lang, pero the flow is solid."

**[Fill in email, password, sign up]**

> "Once registered, automatic na may passport ka. No setup needed — may trigger sa database na nag-create ng profile mo."

**[Show redirect to passport — empty state]**

> "'Your passport is waiting for its first stamp.' Parang bagong passport na walang stamp — exciting di ba? Let's fix that."

---

## 🗺️ EXPLORE PAGE

**[Click "Explore" or "Explore your first craft"]**

> "Here we have 6 crafts — from Luzon, Visayas, and Mindanao. Balanced siya — may pottery, weaving, wood carving.
>
> Notice the filter tabs — pwede mong i-filter by island group.
>
> Every card shows kung na-explore mo na o hindi pa — 'Collected' or 'Explore'."

**[Click on Burnay Pottery]**

---

## 📖 CRAFT DETAIL + CHALLENGE

> "So here — you get the cultural background. Short lang, di naman textbook. May fun fact din — like, alam niyo ba na yung Burnay kilns, more than 1,000 degrees Celsius? Mas mainit pa sa comeback ng ex mo."

**[Scroll to the challenge section]**

> "One question lang. Multiple choice. 'What material is traditionally used to make Burnay jars?'
>
> Let's try the wrong answer muna — Bronze."

**[Select wrong answer, submit]**

> "'Not quite. Try again.' — Hindi siya one-strike. You can retry. Pero you need to actually know the answer."

**[Select correct answer — Clay, submit]**

> "Boom! Stamp unlocked! 🎉"

**[Show unlock modal with animation]**

> "See that animation? Parang totoong stamp na dumadagan sa passport mo. The stamp pop animation, the rotation — designed to feel *rewarding*.
>
> From here you can view your passport, go to UBRA's museum, or keep exploring."

---

## 📕 PASSPORT — THE MONEY SHOT

**[Click "View my passport"]**

> "This is the heart of the app. Notice how it looks like a real passport — dark green cover, gold embossing, the inner page has ruled lines, may binding spine sa left side.
>
> The stamps are slightly rotated — like real ink stamps na hindi perfectly aligned. Kasi sa real life, hindi mo naman perfectly i-stamp yun di ba?
>
> Your stats update automatically — stamps collected, crafts explored, regions discovered. All *derived*, not stored separately. So walang sync bugs."

---

## 🔒 SECURITY DEMO (RLS)

> "Now here's the important part for the technical side — Row Level Security.
>
> Let me log out and log in as a different account."

**[Log out → Log in as Account B]**

> "See? Empty passport. Account B cannot see Account A's stamps. This is enforced at the *database level* — hindi lang sa frontend. Even if someone tries to query directly, Supabase blocks it.
>
> The `correct_answer` field? Never reaches the browser. Column-level privileges. Validation happens server-side through a Postgres function."

---

## 📱 MOBILE RESPONSIVENESS

**[Open DevTools → toggle mobile view, or show on phone]**

> "Mobile-first design. Bottom navigation, safe areas for iPhone notch, single column layout, large touch targets.
>
> The passport looks just as good sa phone — maliit but still feels like a passport."

---

## 🔗 UBRA CONNECTION

**[Show footer links and craft detail UBRA buttons]**

> "Every craft links back to the live UBRA platform — Museum, Shop, Auctions, Community, Donate. Opens in a new tab, no user data is shared.
>
> The idea: you discover the craft here, then you go to UBRA to actually support the artisan. Discovery layer meets marketplace."

---

## 🏗️ TECH STACK RECAP (30 seconds)

> "Quick recap ng stack:
>
> - **Next.js 16** — App Router, Server Components, server actions for the challenge
> - **Supabase** — Postgres, Auth, RLS
> - **Tailwind 4** — custom design system matching UBRA's visual identity
> - **Vercel** — deployment
>
> Three tables lang: `profiles`, `crafts`, `user_progress`. Simple pero solid.
>
> Built with Kiro IDE using the Supabase Power and context7 MCP."

---

## 🎤 CLOSING

> "So what we have is a complete full-stack app — auth, persistent data, per-user security, responsive design, and a production deployment.
>
> But more than that — it's a *fun* way to discover Filipino culture. Hindi siya boring quiz app. Hindi siya generic CRUD. It's a passport. And every stamp has a story.
>
> Salamat! May tanong?"

---

## 💡 Possible Q&A Answers (cheat sheet)

**"Paano mo gi-guarantee na di makikita yung correct answer sa browser?"**
> Column-level privileges sa Postgres. Revoked yung SELECT on `correct_answer` for both `anon` and `authenticated` roles. Validation happens through an RPC function (`unlock_craft`) that runs as SECURITY DEFINER.

**"What if mag-submit ako ng same correct answer twice?"**
> Unique constraint on `(user_id, craft_id)`. The RPC uses `ON CONFLICT DO NOTHING` — idempotent. Returns `newly_unlocked: false` on duplicates.

**"Bakit hindi mo ginamit yung Next.js middleware?"**
> Next.js 16 renamed middleware to `proxy.ts`. Same concept, new filename. I verified this directly sa package — `PROXY_FILENAME = 'proxy'`.

**"How long did this take?"**
> Built in one session using Kiro with the Supabase Power. Schema, seed, auth, all pages — the AI did the heavy lifting, I directed the design and verified security.
