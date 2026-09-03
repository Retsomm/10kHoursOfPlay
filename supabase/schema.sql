-- 10,000 Hours of Play — schema
-- Run this once in the Supabase project's SQL Editor after the project is created.

create table if not exists public.profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  hero_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.chapter_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  chapter_id text not null,
  tier text not null check (tier in ('easy', 'medium', 'hard')),
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, chapter_id, tier)
);

create table if not exists public.answers (
  user_id uuid not null references auth.users (id) on delete cascade,
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

create policy "profiles: owner read" on public.profiles
  for select using (auth.uid() = user_id);
create policy "profiles: owner insert" on public.profiles
  for insert with check (auth.uid() = user_id);
create policy "profiles: owner update" on public.profiles
  for update using (auth.uid() = user_id);

create policy "chapter_progress: owner read" on public.chapter_progress
  for select using (auth.uid() = user_id);
create policy "chapter_progress: owner insert" on public.chapter_progress
  for insert with check (auth.uid() = user_id);
create policy "chapter_progress: owner update" on public.chapter_progress
  for update using (auth.uid() = user_id);

create policy "answers: owner read" on public.answers
  for select using (auth.uid() = user_id);
create policy "answers: owner insert" on public.answers
  for insert with check (auth.uid() = user_id);
create policy "answers: owner update" on public.answers
  for update using (auth.uid() = user_id);
