-- ==========================================================================
-- SIMUP 2.0 v4.0 — Supabase setup (выполнить 1 раз в SQL Editor проекта)
-- 1. Откройте https://supabase.com → New project (free) → SQL Editor
-- 2. Вставьте весь файл → Run. Готово, таблица и доступ созданы.
-- ==========================================================================

create table if not exists public.simup_players (
  username        text primary key,
  username_lower  text unique not null,
  balance         numeric not null default 500,
  net_profit      numeric not null default 0,
  net_worth       numeric not null default 500,
  total_wagered   numeric not null default 0,
  winrate         numeric not null default 0,
  total_upgrades  integer not null default 0,
  won_upgrades    integer not null default 0,
  current_debt    numeric not null default 0,
  inv_count       integer not null default 0,
  cases_opened    integer not null default 0,
  best_mult       numeric not null default 0,
  updated_at      timestamptz not null default now()
);

-- Быстрый топ по профиту
create index if not exists simup_players_profit_idx
  on public.simup_players (net_profit desc);

-- Чистим старые "мёртвые" строки (не заходили > 180 дней), чтобы топ не замусоривался
-- (запускать вручную раз в полгода или повесить на cron):
-- delete from public.simup_players where updated_at < now() - interval '180 days';

-- Открываем публичный доступ для анонимного ключа (RLS включён, политики ниже)
alter table public.simup_players enable row level security;

drop policy if exists "simup public read" on public.simup_players;
create policy "simup public read"
  on public.simup_players for select
  to anon, authenticated
  using (true);

drop policy if exists "simup public upsert" on public.simup_players;
create policy "simup public upsert"
  on public.simup_players for insert
  to anon, authenticated
  with check (true);

drop policy if exists "simup public update" on public.simup_players;
create policy "simup public update"
  on public.simup_players for update
  to anon, authenticated
  using (true)
  with check (true);
