@echo off
PowerShell -NoProfile -ExecutionPolicy Bypass -File "%~dp0실행_럭셔리홈페이지.ps1"
if %errorlevel% neq 0 (
    echo.
    echo  오류가 발생했습니다. 창을 닫지 마세요.
    pause
)
