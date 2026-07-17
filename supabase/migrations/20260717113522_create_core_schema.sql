-- Profiles: one row per auth user
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
comment on table public.profiles is 'Public profile data, one row per authenticated user.';
alter table public.profiles enable row level security;

create policy "profiles_select_own" on public.profiles
  for select to authenticated using ((select auth.uid()) = id);
create policy "profiles_insert_own" on public.profiles
  for insert to authenticated with check ((select auth.uid()) = id);
create policy "profiles_update_own" on public.profiles
  for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

-- Crafts: public, read-only cultural content. correct_answer is column-restricted.
create table public.crafts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  short_description text not null,
  description text not null,
  region text not null,
  province text not null,
  island_group text not null check (island_group in ('Luzon', 'Visayas', 'Mindanao')),
  image_url text,
  interesting_fact text,
  ubra_url text,
  stamp_name text not null,
  stamp_image_url text,
  question text not null,
  options jsonb not null,
  correct_answer integer not null,
  created_at timestamptz not null default now()
);
comment on table public.crafts is 'Filipino craft experiences. Public read; correct_answer is never exposed to clients.';
alter table public.crafts enable row level security;

create policy "crafts_public_read" on public.crafts
  for select to anon, authenticated using (true);

-- Hide correct_answer via column-level privileges. Clients must select explicit columns.
revoke select on public.crafts from anon, authenticated;
grant select (id, name, slug, short_description, description, region, province, island_group, image_url, interesting_fact, ubra_url, stamp_name, stamp_image_url, question, options, created_at) on public.crafts to anon, authenticated;

-- User progress: one completed craft per user (unique), source of all stats.
create table public.user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  craft_id uuid not null references public.crafts (id) on delete cascade,
  completed_at timestamptz not null default now(),
  unique (user_id, craft_id)
);
comment on table public.user_progress is 'Stamps unlocked per user. Unique (user_id, craft_id) prevents duplicates.';
alter table public.user_progress enable row level security;

create policy "progress_select_own" on public.user_progress
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "progress_insert_own" on public.user_progress
  for insert to authenticated with check ((select auth.uid()) = user_id);

create index user_progress_user_id_idx on public.user_progress (user_id);
create index user_progress_craft_id_idx on public.user_progress (craft_id);
