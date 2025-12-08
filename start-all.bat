@echo off
echo ========================================
echo   RemoteLingo - Full Stack Launcher
echo ========================================
echo.
echo Starting both backend and frontend...
echo.
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo.

start "RemoteLingo Backend" cmd /k "cd api && python main.py"
timeout /t 3 /nobreak > nul
start "RemoteLingo Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo Both servers are starting in separate windows...
echo Close this window to keep servers running.
pause
