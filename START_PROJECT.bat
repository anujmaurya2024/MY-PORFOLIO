@echo off
setlocal enabledelayedexpansion

echo ==========================================
echo Thiranex Portfolio - Diagnostics & Startup
echo ==========================================

:: Check for Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in your PATH.
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js found: 
node -v

:: Check for NPM
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] NPM is not installed.
    pause
    exit /b 1
)
echo [OK] NPM found: 
call npm -v

echo.
echo [1/4] Installing Backend Dependencies...
cd backend
if not exist package.json (
    echo [ERROR] backend/package.json not found!
    pause
    exit /b 1
)
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install backend dependencies.
    pause
    exit /b %errorlevel%
)

echo [2/4] Installing Frontend Dependencies...
cd ../frontend
if not exist package.json (
    echo [ERROR] frontend/package.json not found!
    pause
    exit /b 1
)
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install frontend dependencies.
    pause
    exit /b %errorlevel%
)

echo [3/4] Starting Backend Server in new window...
:: Kill any existing process on port 5050
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5050') do taskkill /f /pid %%a 2>nul
start "MyPortfolio Backend" cmd /k "cd ../backend && npm start"

echo [4/4] Starting Frontend Server...
echo The site should open at http://localhost:5173
call npm run dev

pause
