-- ============================================================
-- MAISON PRIVÉ — VIP Tables Migration
-- Supabase Dashboard → SQL Editor → New Query → 붙여넣고 실행
-- ============================================================

-- 1. 고객 선호도 프로필 (1:1 with luxury_requests)
create table if not exists luxury_client_preferences (
  id                  uuid primary key default gen_random_uuid(),
  request_id          uuid not null references luxury_requests(id) on delete cascade,
  preferred_brands    text,
  preferred_colors    text,
  preferred_size      text,
  budget_range_detail text,
  preferred_region    text not null default 'any',
  purchase_purpose    text not null default 'Personal Collection',
  contact_preference  text not null default 'KakaoTalk',
  vip_grade           text not null default 'Private',
  created_at          timestamptz default now(),
  updated_at          timestamptz default now(),
  constraint luxury_client_preferences_request_id_key unique (request_id)
);

-- 2. Private Wishlist 아이템 (1:N with luxury_requests)
create table if not exists luxury_wishlist_items (
  id           uuid primary key default gen_random_uuid(),
  request_id   uuid not null references luxury_requests(id) on delete cascade,
  brand        text not null,
  product_name text not null,
  color_size   text,
  priority     int  not null default 1,
  memo         text,
  status       text not null default 'checking',
  sort_order   int  not null default 0,
  created_at   timestamptz default now()
);

create index if not exists idx_wishlist_request_id
  on luxury_wishlist_items (request_id, sort_order);

-- 3. Sourcing Evidence (1:1 with luxury_requests)
create table if not exists luxury_sourcing_evidence (
  id                   uuid primary key default gen_random_uuid(),
  request_id           uuid not null references luxury_requests(id) on delete cascade,
  purchase_route       text not null default 'pending',
  availability_check   text not null default 'pending',
  cost_estimate        text not null default 'pending',
  receipt_availability text not null default 'pending',
  inspection_photos    text not null default 'pending',
  customs_delivery     text not null default 'pending',
  updated_at           timestamptz default now(),
  constraint luxury_sourcing_evidence_request_id_key unique (request_id)
);

-- 확인
select 'luxury_client_preferences' as tbl, count(*) from luxury_client_preferences
union all
select 'luxury_wishlist_items',     count(*) from luxury_wishlist_items
union all
select 'luxury_sourcing_evidence',  count(*) from luxury_sourcing_evidence;
