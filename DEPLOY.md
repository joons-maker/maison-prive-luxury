# MAISON PRIVÉ — Vercel 배포 가이드

## 배포 전 체크리스트

- [ ] `npm run build` 성공 확인
- [ ] `.env.local`이 `.gitignore`에 포함됨 확인
- [ ] `LUXURY_ADMIN_PASSWORD`를 강력한 비밀번호로 변경
- [ ] GitHub 계정 있음
- [ ] Vercel 계정 있음 (GitHub로 로그인 가능)

---

## Step 1 — GitHub에 올리기

### 1-1. GitHub에서 새 저장소 만들기

1. https://github.com/new 접속
2. Repository name: `maison-prive-luxury`
3. **Private** 선택 (소스코드 비공개)
4. **Create repository** 클릭

### 1-2. 로컬에서 Git 초기화 및 업로드

아래 명령어를 PowerShell에서 실행하세요.
(`your-github-username`을 본인 GitHub 아이디로 바꾸세요)

```powershell
cd C:\projects\maison-prive-luxury

git init
git add .
git commit -m "initial: MAISON PRIVE luxury sourcing site"
git branch -M main
git remote add origin https://github.com/your-github-username/maison-prive-luxury.git
git push -u origin main
```

> `.env.local`은 `.gitignore`에 포함되어 **자동으로 제외**됩니다.

---

## Step 2 — Vercel에 배포하기

### 2-1. Vercel 접속

1. https://vercel.com 접속
2. **GitHub으로 로그인**

### 2-2. 프로젝트 Import

1. **Add New → Project** 클릭
2. GitHub 저장소 목록에서 `maison-prive-luxury` 선택
3. **Import** 클릭

### 2-3. 환경변수 입력 (중요!)

**Configure Project** 화면에서 **Environment Variables** 섹션에 아래 값을 입력:

| 변수명 | 값 | 설명 |
|--------|-----|------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://uvlyhcefycpepjxjwuku.supabase.co` | Supabase URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `sb_publishable_oGcNVoHqDmtQysaL-HHpOQ_TV7RJAMK` | 공개 키 |
| `SUPABASE_SERVICE_ROLE_KEY` | `.env.local`에 있는 값 | ⚠ 절대 공개 금지 |
| `LUXURY_ADMIN_PASSWORD` | 강력한 비밀번호로 변경 | 관리자 접근 비밀번호 |
| `RESEND_API_KEY` | resend.com에서 발급 | 이메일 알림 (없으면 생략) |
| `ADMIN_NOTIFY_EMAIL` | 관리자 이메일 | 알림 받을 이메일 |
| `NEXT_PUBLIC_SITE_URL` | `https://maison-prive-luxury.vercel.app` | 배포 후 확정된 URL |

> `NEXT_PUBLIC_SITE_URL`은 배포 후 실제 URL로 다시 업데이트하세요.

### 2-4. 배포

**Deploy** 클릭 → 2~3분 후 완료

---

## Step 3 — 배포 완료 후 확인

배포가 완료되면 아래 주소로 확인:

| 페이지 | 확인 항목 |
|--------|-----------|
| `https://your-domain.vercel.app/` | 홈페이지 로딩 |
| `https://your-domain.vercel.app/request` | 문의폼 작동 |
| `https://your-domain.vercel.app/admin` | 관리자 로그인 |

> VIP 문의 1건 테스트 제출 후 Supabase에 저장되는지 확인하세요.

---

## 투자자에게 공유할 링크

아래 페이지만 공유하세요. `/admin`은 공유하지 마세요.

```
홈페이지:   https://your-domain.vercel.app/
서비스:     https://your-domain.vercel.app/services
프로세스:   https://your-domain.vercel.app/process
문의폼:     https://your-domain.vercel.app/request
FAQ:        https://your-domain.vercel.app/faq
```

---

## 관리자 비밀번호 변경 (배포 전 필수!)

현재 `maison2024`는 너무 단순합니다.
Vercel 환경변수에 아래처럼 강력한 비밀번호를 입력하세요.

**추천 형태:** `MP-Admin-2024-[랜덤4자리]`
예: `MP-Admin-2024-7x9k`

---

## 코드 수정 후 재배포

GitHub에 push하면 Vercel이 자동으로 재배포합니다.

```powershell
cd C:\projects\maison-prive-luxury
git add .
git commit -m "수정 내용 설명"
git push
```

---

## 문제 해결

| 증상 | 원인 | 해결 |
|------|------|------|
| 빌드 실패 | 환경변수 누락 | Vercel Settings → Environment Variables 확인 |
| 문의 저장 안 됨 | Supabase pause | supabase.com → Restore project |
| 관리자 로그인 안 됨 | 비밀번호 불일치 | Vercel 환경변수 `LUXURY_ADMIN_PASSWORD` 확인 |
| 이미지 업로드 안 됨 | Storage 권한 | Supabase SQL Editor에서 luxury_requests.sql 재실행 |
