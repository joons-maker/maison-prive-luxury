# MAISON PRIVE — GitHub 업로드 스크립트
# 실행 전: GitHub에서 maison-prive-luxury 저장소를 먼저 만드세요.

$projectPath = "C:\projects\maison-prive-luxury"

Write-Host ""
Write-Host " ================================" -ForegroundColor DarkYellow
Write-Host "   MAISON PRIVE - GitHub 업로드" -ForegroundColor Yellow
Write-Host " ================================" -ForegroundColor DarkYellow
Write-Host ""

# GitHub 사용자명 입력
$username = Read-Host " GitHub 아이디를 입력하세요 (예: yourname)"
if ([string]::IsNullOrWhiteSpace($username)) {
    Write-Host " GitHub 아이디가 입력되지 않았습니다." -ForegroundColor Red
    Read-Host " Enter를 눌러 종료"
    exit
}

$repoUrl = "https://github.com/$username/maison-prive-luxury.git"

Write-Host ""
Write-Host " 저장소 주소: $repoUrl" -ForegroundColor Cyan
Write-Host ""

Set-Location $projectPath

# git 초기화 여부 확인
if (-not (Test-Path ".git")) {
    Write-Host " git 초기화 중..." -ForegroundColor Gray
    git init
    git branch -M main
}

# .env.local 미포함 확인
if (Test-Path ".env.local") {
    $inGitignore = Select-String -Path ".gitignore" -Pattern "\.env" -Quiet
    if ($inGitignore) {
        Write-Host " [OK] .env.local은 .gitignore에 포함됨 (업로드 안됨)" -ForegroundColor Green
    } else {
        Write-Host " [경고] .gitignore에 .env.local이 없습니다! 중단합니다." -ForegroundColor Red
        Read-Host " Enter를 눌러 종료"
        exit
    }
}

Write-Host " 파일 추가 중..." -ForegroundColor Gray
git add .

Write-Host " 커밋 중..." -ForegroundColor Gray
git commit -m "initial: MAISON PRIVE luxury sourcing site"

Write-Host " 원격 저장소 연결 중..." -ForegroundColor Gray
git remote remove origin 2>$null
git remote add origin $repoUrl

Write-Host " GitHub에 업로드 중..." -ForegroundColor Cyan
git push -u origin main

Write-Host ""
Write-Host " ================================" -ForegroundColor Green
Write-Host "   업로드 완료!" -ForegroundColor Green
Write-Host " ================================" -ForegroundColor Green
Write-Host ""
Write-Host " 저장소: https://github.com/$username/maison-prive-luxury" -ForegroundColor Yellow
Write-Host ""
Write-Host " 다음 단계: DEPLOY.md 파일을 참고해서 Vercel에 배포하세요." -ForegroundColor Cyan
Write-Host ""
Read-Host " Enter를 눌러 종료"
