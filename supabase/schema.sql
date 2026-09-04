-- 10,000 Hours of Play — schema
-- Auth is handled by Clerk (not Supabase Auth), so user_id is Clerk's string
-- user id (e.g. "user_2abc...") and all access goes through the app's server
-- code using the Supabase service role key, which bypasses RLS. RLS stays
-- enabled with NO policies below, so the public anon key can never read or
-- write anything even if it were leaked — only the service role key can.
--
-- Idempotent: safe to run again (e.g. on a fresh environment) — every
-- statement is a no-op if the table/setting already exists, so it never
-- drops or overwrites existing rows.

create table if not exists public.profiles (
  user_id text primary key,
  hero_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.chapter_progress (
  user_id text not null,
  chapter_id text not null,
  tier text not null check (tier in ('easy', 'medium', 'hard')),
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, chapter_id, tier)
);

create table if not exists public.answers (
  user_id text not null,
  chapter_id text not null,
  tier text not null check (tier in ('easy', 'medium', 'hard')),
  field_key text not null,
  value jsonb not null default 'null'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, chapter_id, tier, field_key)
);

-- Ch.8 三星成就制的實際任務追蹤（Phase 3）：使用者自訂 1～3 星門檻，
-- 回報結果時 0 星會進入兩週冷卻期（cooldown_until），呼應書中「零星表現
-- 先強制休息、重新評估，不要硬撐」的規則。
create table if not exists public.quests (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  title text not null,
  scope text not null check (scope in ('task', 'minor_quest')),
  quest_type text,
  star1_criteria text,
  star2_criteria text,
  star3_criteria text,
  current_stars smallint not null default 0 check (current_stars between 0 and 3),
  reward text,
  status text not null default 'active' check (status in ('active', 'completed', 'cooldown', 'abandoned')),
  cooldown_until timestamptz,
  source_chapter_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.chapter_progress enable row level security;
alter table public.answers enable row level security;
alter table public.quests enable row level security;
