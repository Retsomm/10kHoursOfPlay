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

alter table public.profiles enable row level security;
alter table public.chapter_progress enable row level security;
alter table public.answers enable row level security;
