@echo off
chcp 65001 > nul
title CRAB CLUB Premium Delivery App Launcher

echo ===================================================
echo 🦀 CRAB CLUB PREMIUM DELIVERY APP
echo ===================================================
echo.
echo [1/3] Запуск Poster POS API Gateway (Port 3005)...
start /b "Poster POS Proxy" node server/posterProxy.js

echo [2/3] Запуск Telegram Auth & Kitchen Bot...
start /b "Telegram Bot" node server/telegramBotService.js

echo [3/3] Запуск Web App (Port 3000)...
echo.
echo 🚀 Сервер успішно запущено!
echo 👉 Локально: http://localhost:3000
echo.

start "" http://localhost:3000
npm run dev -- --host 0.0.0.0 --port 3000
