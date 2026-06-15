$Host.UI.RawUI.WindowTitle = "MAISON PRIVE - 서버"
$projectPath = "C:\projects\maison-prive-luxury"
$port = 3001
$npmCmd = "C:\Program Files\nodejs\npm.cmd"

Write-Host ""
Write-Host " ================================" -ForegroundColor DarkYellow
Write-Host "   MAISON PRIVE  |  Port: $port" -ForegroundColor Yellow
Write-Host " ================================" -ForegroundColor DarkYellow
Write-Host ""

# 포트 사용 여부 확인
$portInUse = $false
try {
    $conn = New-Object System.Net.Sockets.TcpClient
    $conn.Connect("127.0.0.1", $port)
    $conn.Close()
    $portInUse = $true
} catch {}

if ($portInUse) {
    Write-Host " [OK] 서버가 이미 실행 중입니다 (port $port)" -ForegroundColor Green
    Write-Host " 브라우저를 엽니다..." -ForegroundColor Gray
    Start-Sleep -Seconds 1
    Start-Process "http://localhost:$port"
    Write-Host ""
    Write-Host " 창을 닫아도 서버는 계속 실행됩니다." -ForegroundColor DarkGray
    Start-Sleep -Seconds 3
    exit
}

# 서버 없으면 시작
Write-Host " 서버를 시작합니다..." -ForegroundColor Cyan
Write-Host " 완료되면 브라우저가 자동으로 열립니다." -ForegroundColor Gray
Write-Host " (이 창을 닫으면 서버도 종료됩니다)" -ForegroundColor DarkGray
Write-Host ""

Set-Location $projectPath

# 7초 후 브라우저 열기 (백그라운드)
Start-Job -ScriptBlock {
    Start-Sleep -Seconds 7
    Start-Process "http://localhost:3001"
} | Out-Null

# npm 실행
& $npmCmd run dev -- -p $port

Write-Host ""
Write-Host " 서버가 종료되었습니다." -ForegroundColor Red
Write-Host " 창을 닫거나 Enter를 누르세요."
Read-Host
