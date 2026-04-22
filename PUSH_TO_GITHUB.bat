@echo off
echo ==========================================
echo MyPortfolio - Pushing to GitHub
echo ==========================================

:: Check if Git is installed
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed. Please install Git from https://git-scm.com/
    pause
    exit /b 1
)

echo [1/4] Initializing Git...
git init

echo [2/4] Adding files...
git add .

echo [3/4] Creating initial commit...
git commit -m "Initial commit - MyPortfolio for Anuj Maurya"

echo [4/4] Adding remote and pushing...
git remote add origin https://github.com/anujmaurya2024/portfolio.git
git branch -M main
git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo [NOTE] If you got an error, it might be because the repository already has files. 
    echo Trying to push with force...
    git push -u origin main --force
)

echo.
echo ==========================================
echo Done! Check your GitHub repository.
echo ==========================================
pause
