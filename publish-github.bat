@echo off
chcp 65001 >nul
title SIMUP - Публикация на GitHub Pages

echo =======================================================
echo          SIMUP - ПУБЛИКАЦИЯ НА GITHUB PAGES
echo =======================================================
echo.

:: 1. Проверка наличия Git
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [ОШИБКА] Git не установлен на вашем компьютере!
    echo Скачайте и установите Git с официального сайта: https://git-scm.com/downloads
    echo После установки перезапустите этот файл.
    pause
    exit /b 1
)

:: 2. Инициализация репозитория
if not exist ".git" (
    echo [*] Инициализируем локальный Git-репозиторий...
    git init
) else (
    echo [*] Git-репозиторий уже инициализирован.
)

:: 3. Добавление файлов и коммит
echo [*] Индексация файлов проекта...
git add .
git commit -m "Release SIMUP Simulator" >nul 2>nul
if %errorlevel% equ 0 (
    echo [✔] Изменения зафиксированы в коммите!
) else (
    echo [*] Все файлы уже зафиксированы.
)

:: 4. Настройка ветки main
git branch -M main

:: 5. Запрос ссылки на удаленный репозиторий
echo.
echo =======================================================
echo ШАГ: Создайте пустой репозиторий на GitHub (github.com/new)
echo Назовите его, например, "simup" (Private или Public).
echo ВАЖНО: галочки "Add README", ".gitignore" ставить НЕ нужно.
echo =======================================================
echo.

set /p REPO_URL="Вставьте ссылку на ваш репозиторий GitHub (например, https://github.com/Никнейм/simup.git): "

if "%REPO_URL%"=="" (
    echo [!] Ссылка не введена. Завершение.
    pause
    exit /b 1
)

:: Удаляем старый remote origin, если был
git remote remove origin >nul 2>nul
git remote add origin %REPO_URL%

echo.
echo [*] Отправка файлов на GitHub...
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo =======================================================
    echo [🎉 УСПЕХ!] Файлы успешно выгружены на GitHub!
    echo =======================================================
    echo.
    echo Теперь включите бесплатный хостинг сайта (GitHub Pages):
    echo 1. Откройте ваш репозиторий на GitHub в браузере.
    echo 2. Перейдите во вкладку Settings (Настройки) -^> Pages.
    echo 3. В пункте "Build and deployment" выберите:
    echo    - Source: Deploy from a branch
    echo    - Branch: main, папка: / (root)
    echo 4. Нажмите "Save".
    echo.
    echo Через 1-2 минуты ваш сайт будет доступен по ссылке:
    echo https://^<ВАШ_НИКНЕЙМ^>.github.io/^<ИМЯ_РЕПОЗИТОРИЯ^>/
    echo =======================================================
) else (
    echo.
    echo [!] Произошла ошибка при отправке (git push).
    echo Убедитесь, что вы авторизованы в GitHub и ссылка верна.
)

echo.
pause
