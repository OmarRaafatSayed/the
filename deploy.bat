@echo off
echo Building...
call npm run build
if %errorlevel% neq 0 (
  echo Build failed.
  pause
  exit /b 1
)
echo Deploying to Firebase...
call firebase deploy --only hosting
echo Done.
pause
