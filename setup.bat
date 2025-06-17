@echo off
echo Setting up Outlook MSG Preview Extension Development Environment
echo ================================================================

echo.
echo Checking for Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    echo Choose the LTS version and make sure to add it to PATH during installation
    pause
    exit /b 1
)

echo Node.js found: 
node --version

echo.
echo Checking for npm...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: npm is not available
    echo Please ensure Node.js is properly installed
    pause
    exit /b 1
)

echo npm found:
npm --version

echo.
echo Installing dependencies...
npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo Compiling extension...
npm run compile
if %errorlevel% neq 0 (
    echo ERROR: Failed to compile extension
    pause
    exit /b 1
)

echo.
echo Setup completed successfully!
echo.
echo To run the extension in development mode:
echo 1. Open this folder in VS Code
echo 2. Press F5 to start debugging
echo 3. A new VS Code window will open with the extension loaded
echo 4. Open a .msg file to test the extension
echo.
pause 