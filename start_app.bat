@echo off
chcp 65001 > nul
title CRAB CLUB Premium Delivery App Launcher

echo ===================================================
echo 🦀 CRAB CLUB PREMIUM DELIVERY APP
echo ===================================================
echo.
echo [1/2] Запуск Telegram Auth & Kitchen Bot...
start /b "Telegram Bot" node server/telegramBotService.js

echo [2/2] Запуск Web App з автоматичною синхронізацією Poster POS (Port 3000)...
echo.
echo 🚀 Сервер успішно запущено!
echo 👉 Локально: http://localhost:3000
echo.

start "" http://localhost:3000
npm run dev -- --host 0.0.0.0 --port 3000
