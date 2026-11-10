@echo off
echo Starting Terravolt 2.0...
echo.
echo [SERVER] Backend on port 5000
start "TERRAVOLT Server" cmd /k "cd /d %~dp0server && npm install && node src\db\migrate.js && npm run dev"
echo [CLIENT] Frontend on port 5173 (0.0.0.0 for LAN)
start "TERRAVOLT Client" cmd /k "cd /d %~dp0client && npm install && npx vite --host 0.0.0.0 --port 5173"
echo.
echo Local:   http://localhost:5173
echo LAN:     http://10.159.144.211:5173
echo Backend: http://localhost:5000/api/health
echo.
pause
