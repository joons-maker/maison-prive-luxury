-- =============================================
-- MAISON PRIVÉ — luxury_requests 테이블
-- Supabase SQL Editor에 전체 붙여넣고 실행
-- =============================================

create extension if not exists "uuid-ossp";

create table if not exists luxury_requests (
  id                  uuid primary key default uuid_generate_v4(),
  name                text not null,
  phone               text not null,
  kakao_id            text,
  email               text,
  brand               text,
  product_name        text,
  product_image_urls  text[],
  budget              text,
  preferred_country   text check (preferred_country in ('france','italy','any')),
  delivery_preference text check (delivery_preference in ('domestic','overseas','consult')),
  message             text,
  status              text not null default 'new'
                      check (status in ('new','checking','quoted','paid','sourcing','shipped','completed','cancelled')),
  admin_memo          text,
  estimated_price     text,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

-- updated_at 자동 갱신
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

drop trigger if exists luxury_requests_updated_at on luxury_requests;
create trigger luxury_requests_updated_at
  before update on luxury_requests
  for each row execute function set_updated_at();

-- RLS
alter table luxury_requests enable row level security;

drop policy if exists "anon can insert" on luxury_requests;
create policy "anon can insert" on luxury_requests for insert to anon with check (true);

-- Storage 버킷 (버킷명: luxury-request-images, Public: ON)
insert into storage.buckets (id, name, public)
values ('luxury-request-images','luxury-request-images', true)
on conflict (id) do nothing;

drop policy if exists "anon can upload luxury images" on storage.objects;
create policy "anon can upload luxury images" on storage.objects for insert to anon
  with check (bucket_id = 'luxury-request-images');

drop policy if exists "public can read luxury images" on storage.objects;
create policy "public can read luxury images" on storage.objects for select to public
  using (bucket_id = 'luxury-request-images');

-- 인덱스
create index if not exists idx_luxury_status     on luxury_requests (status);
create index if not exists idx_luxury_created_at on luxury_requests (created_at desc);
