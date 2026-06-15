# MAISON PRIVÉ — 럭셔리 명품 직수입 컨시어지 홈페이지

## 실행 명령어

```powershell
npm run dev
```

개발 서버 주소: http://localhost:3000

## 이 프로젝트의 위치

`C:\projects\maison-prive-luxury`

**다른 프로젝트와 혼용 금지:**
- 마이로보틱스: `C:\projects\myrobotics-drone`
- 마이렌트카:   `C:\Users\ssbj9\클라우드코드`

## 페이지 구조

| 경로 | 설명 |
|------|------|
| `/` | 메인 히어로 + 서비스 프리뷰 |
| `/about` | 브랜드 스토리 + 파리·밀라노 네트워크 |
| `/services` | 6개 서비스 상세 |
| `/membership` | PRIVÉ / ÉLITE / MAISON 3티어 멤버십 |
| `/process` | 6단계 소싱 프로세스 |
| `/faq` | FAQ 10개 + 법적 고지 |
| `/request` | VIP 문의 폼 (이미지 업로드 포함) |
| `/admin` | 관리자 대시보드 (비밀번호 보호) |

## API Routes

| 경로 | 설명 |
|------|------|
| `POST /api/requests` | 새 문의 접수 |
| `GET /api/requests` | 관리자 목록 조회 (x-admin-password 헤더 필요) |
| `PATCH /api/requests/[id]` | 상태·메모 수정 |
| `POST /api/upload` | 이미지 → Supabase Storage 업로드 |

## 파일 구조

```
lib/
  supabase.ts           — Supabase 클라이언트 팩토리
  luxury-requests.ts    — CRUD 함수 (createLuxuryRequest 등)
  notifications.ts      — 알림 함수 (추후 카카오/SMS 연결)

components/
  Nav.tsx               — 고정 네비게이션 (모바일 햄버거 포함)
  Footer.tsx            — 하단 푸터 + 법적 고지

supabase/
  luxury_requests.sql   — 테이블 생성 + RLS + Storage 버킷 SQL
```

## 환경 변수 (.env.local)

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
LUXURY_ADMIN_PASSWORD=maison2024
```

## Supabase 초기 설정 (1회)

Supabase SQL Editor에서 `supabase/luxury_requests.sql` 전체 실행.

## 관리자 비밀번호

기본값: `maison2024`  
변경하려면 `.env.local`의 `LUXURY_ADMIN_PASSWORD` 수정.
