@echo off
echo Publishing Outlook MSG Preview Extension to VS Code Marketplace
echo ================================================================

echo.
echo Step 1: Checking prerequisites...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if vsce is installed
vsce --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Installing vsce...
    npm install -g vsce
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install vsce
        pause
        exit /b 1
    )
)

echo.
echo Step 2: Compiling extension...
npm run compile
if %errorlevel% neq 0 (
    echo ERROR: Failed to compile extension
    pause
    exit /b 1
)

echo.
echo Step 3: Creating package...
vsce package
if %errorlevel% neq 0 (
    echo ERROR: Failed to create package
    pause
    exit /b 1
)

echo.
echo Step 4: Publishing to marketplace...
echo.
echo IMPORTANT: Make sure you have:
echo 1. Created a publisher account at https://marketplace.visualstudio.com/manage
echo 2. Generated a Personal Access Token with Marketplace (Publish) permission
echo 3. Updated the publisher ID in package.json
echo 4. Logged in with: vsce login your-publisher-id
echo.
set /p confirm="Are you ready to publish? (y/N): "
if /i "%confirm%" neq "y" (
    echo Publishing cancelled.
    pause
    exit /b 0
)

vsce publish
if %errorlevel% neq 0 (
    echo ERROR: Failed to publish extension
    echo.
    echo Troubleshooting tips:
    echo 1. Check that your publisher ID is correct in package.json
    echo 2. Ensure you're logged in: vsce login your-publisher-id
    echo 3. Verify your Personal Access Token has Marketplace (Publish) permission
    echo 4. Check that the version number is unique
    pause
    exit /b 1
)

echo.
echo SUCCESS: Extension published successfully!
echo.
echo Your extension should be available at:
echo https://marketplace.visualstudio.com/items?itemName=your-publisher-id.outlook-msg-preview
echo.
echo Note: It may take a few minutes for the extension to appear in search results.
echo.
pause 