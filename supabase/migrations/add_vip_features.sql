-- ============================================================
-- MAISON PRIVÉ — VIP Features Migration
-- 실행 방법: Supabase SQL Editor에 붙여넣고 실행
-- 기존 데이터 삭제 없음, drop table 없음
-- ============================================================

-- 1. invitation_code 컬럼 추가
alter table luxury_requests
  add column if not exists invitation_code text;

-- 2. 검색 성능을 위한 인덱스 (초대코드 있는 행만)
create index if not exists idx_luxury_requests_invitation_code
  on luxury_requests (invitation_code)
  where invitation_code is not null;

-- 확인
select column_name, data_type
from information_schema.columns
where table_name = 'luxury_requests'
  and column_name = 'invitation_code';
