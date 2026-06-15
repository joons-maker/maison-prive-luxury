-- ============================================================
-- MAISON PRIVÉ — Payment Request Fields Migration
-- 실행 방법: Supabase SQL Editor에 붙여넣고 실행
-- ============================================================

alter table luxury_requests
  add column if not exists estimate_amount     numeric,
  add column if not exists sourcing_fee        numeric,
  add column if not exists shipping_fee        numeric,
  add column if not exists tax_estimate        numeric,
  add column if not exists total_payment_amount numeric,
  add column if not exists payment_status      text not null default 'not_requested',
  add column if not exists payment_due_date    date,
  add column if not exists payment_note        text;

-- 결제 상태 인덱스 (관리자 필터링용)
create index if not exists idx_luxury_requests_payment_status
  on luxury_requests (payment_status);

-- 확인
select column_name, data_type, column_default
from information_schema.columns
where table_name = 'luxury_requests'
  and column_name in (
    'estimate_amount','sourcing_fee','shipping_fee','tax_estimate',
    'total_payment_amount','payment_status','payment_due_date','payment_note'
  )
order by ordinal_position;
