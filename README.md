# MAISON PRIVÉ — 프라이빗 럭셔리 소싱 홈페이지

## 실행 방법 (더블클릭으로 바로 시작)

### 홈페이지 시작
**`실행_럭셔리홈페이지.bat`** 더블클릭
→ 서버가 켜지고 브라우저가 자동으로 열립니다.

> 서버 창을 닫으면 홈페이지도 꺼집니다.

### 페이지 바로가기
- **`문의폼_열기.bat`** — 서버가 켜진 상태에서 더블클릭
- **`관리자_열기.bat`** — 서버가 켜진 상태에서 더블클릭

---

## 주요 페이지 주소

| 페이지 | 주소 |
|--------|------|
| 홈페이지 | http://localhost:3001 |
| 서비스 소개 | http://localhost:3001/services |
| VIP 문의폼 | http://localhost:3001/request |
| 프로세스 | http://localhost:3001/process |
| FAQ | http://localhost:3001/faq |
| 관리자 | http://localhost:3001/admin |
| 개인정보처리방침 | http://localhost:3001/privacy |
| 이용약관 | http://localhost:3001/terms |

---

## 관리자 화면

- 주소: http://localhost:3001/admin
- 비밀번호: `.env.local` 파일의 `LUXURY_ADMIN_PASSWORD` 값
- 기능: 문의 목록 조회 / 검색 / 상태 변경 / 메모 저장 / 견적 입력

---

## 환경 변수 설정 (.env.local)

`.env.local.example` 파일을 복사해서 `.env.local`로 만든 뒤 값을 입력하세요.

```
NEXT_PUBLIC_SUPABASE_URL=         # Supabase 프로젝트 URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=    # Supabase anon(public) 키
SUPABASE_SERVICE_ROLE_KEY=        # ⚠ 절대 NEXT_PUBLIC_ 붙이지 말 것 (서버 전용)
LUXURY_ADMIN_PASSWORD=            # 관리자 비밀번호 (배포 전 강력하게 변경)
RESEND_API_KEY=                   # 이메일 알림 (없으면 로그만 남김)
ADMIN_NOTIFY_EMAIL=               # 알림 받을 관리자 이메일
NEXT_PUBLIC_SITE_URL=             # 배포 도메인 (예: https://maisonprive.kr)
```

---

## 포트 정보

| 서비스 | 포트 |
|--------|------|
| **MAISON PRIVÉ** (이 프로젝트) | **3001** |
| 마이로보틱스 (별개 프로젝트) | 3000 |

두 서비스는 완전히 독립적입니다.

---

## Supabase가 멈췄을 때

무료 플랜은 7일 미접속 시 자동 pause됩니다.
supabase.com → 프로젝트 → **Restore project** 버튼으로 복구 후 서버를 재시작하세요.
