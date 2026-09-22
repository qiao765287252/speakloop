@echo off
chcp 65001 >nul
title SpeakLoop 本地服务
cd /d "%~dp0"
set PORT=8899
echo ================================================
echo   SpeakLoop 口语复盘 - 本地服务
echo   手机访问期间请保持本窗口开启
echo ================================================
echo.
where node >nul 2>nul
if %errorlevel%==0 (
  start "" http://localhost:%PORT%
  node server.js %PORT%
) else (
  where py >nul 2>nul
  if %errorlevel%==0 (
    start "" http://localhost:%PORT%
    py -3 -m http.server %PORT%
  ) else (
    where python >nul 2>nul
    if %errorlevel%==0 (
      start "" http://localhost:%PORT%
      python -m http.server %PORT%
    ) else (
      echo 未检测到 Node.js 或 Python，请安装任意一个后重试。
      echo 也可以直接双击 index.html 在电脑浏览器中使用。
      pause
    )
  )
)
