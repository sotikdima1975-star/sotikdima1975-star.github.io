@echo off
cd /d "%~dp0"
if not exist "node_modules" (
    echo Установка зависимостей...
    powershell -Command "node -e ''" 2>nul || (
        echo Node.js не найден. Установите Node.js с https://nodejs.org/
        pause
        exit /b 1
    )
    npm install
)
echo Запуск dev-сервера...
call node_modules\.bin\vite.cmd --open /
pause
