# Publishing Guide for Outlook MSG Preview Extension

This guide will walk you through the process of publishing your VS Code extension to the Visual Studio Code Marketplace.

## Prerequisites

Before you can publish your extension, you need:

1. **Microsoft Account** - A free Microsoft account
2. **Publisher Account** - Created on the Visual Studio Marketplace
3. **Personal Access Token** - For authentication during publishing

## Step 1: Create a Publisher Account

1. Go to [Visual Studio Marketplace](https://marketplace.visualstudio.com/manage)
2. Sign in with your Microsoft account
3. Click "Create a publisher"
4. Fill in the required information:
   - **Publisher ID**: Choose a unique identifier (e.g., `yourname`, `yourcompany`)
   - **Display Name**: Your name or organization name
   - **Email**: Your email address
   - **Website** (optional): Your website URL

**Important**: The Publisher ID must be unique across the entire marketplace. If your first choice is taken, try variations like `yourname-dev`, `yourname-extensions`, etc.

## Step 2: Generate Personal Access Token

1. Go to [Azure DevOps](https://dev.azure.com)
2. Sign in with your Microsoft account
3. Click on your profile picture → "Security"
4. Click "Personal access tokens"
5. Click "New Token"
6. Configure the token:
   - **Name**: `VSCode Extension Publishing`
   - **Organization**: All accessible organizations
   - **Expiration**: Choose appropriate duration (recommend 1 year)
   - **Scopes**: Custom defined
   - **Marketplace**: Publish (check this box)
7. Click "Create"
8. **Copy the token immediately** - you won't be able to see it again!

## Step 3: Update Your Extension Configuration

### Update package.json

Replace the placeholder values in your `package.json`:

```json
{
  "name": "outlook-msg-preview",
  "displayName": "Outlook MSG Preview",
  "description": "Preview Outlook .msg files directly in VS Code",
  "version": "0.0.1",
  "publisher": "your-actual-publisher-id",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/outlook-msg-preview.git"
  },
  "homepage": "https://github.com/yourusername/outlook-msg-preview#readme",
  "bugs": {
    "url": "https://github.com/yourusername/outlook-msg-preview/issues"
  },
  "license": "MIT"
}
```

### Create a LICENSE file

Create a `LICENSE` file in your project root:

```text
MIT License

Copyright (c) 2024 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Step 4: Install vsce and Login

1. Install the VS Code Extension Manager globally:
   ```bash
   npm install -g vsce
   ```

2. Login with your publisher account:
   ```bash
   vsce login your-publisher-id
   ```

3. When prompted, enter your Personal Access Token.

## Step 5: Prepare Your Extension

1. **Compile your extension**:
   ```bash
   npm run compile
   ```

2. **Test the package locally**:
   ```bash
   vsce package
   ```
   This creates a `.vsix` file that you can install locally to test.

3. **Install the package locally** (optional):
   - In VS Code, go to Extensions
   - Click the "..." menu → "Install from VSIX..."
   - Select your `.vsix` file
   - Test the extension thoroughly

## Step 6: Publish to Marketplace

### Option A: Command Line Publishing

```bash
# Publish directly to marketplace
vsce publish
```

### Option B: Manual Upload

1. Create the package:
   ```bash
   vsce package
   ```

2. Go to [Visual Studio Marketplace](https://marketplace.visualstudio.com/manage)
3. Click "New extension"
4. Choose "Visual Studio Code"
5. Upload your `.vsix` file
6. Fill in the extension details:
   - **Extension name**: Outlook MSG Preview
   - **Description**: Brief description of what your extension does
   - **Category**: Choose "Other" or "Formatters"
   - **Tags**: Add relevant tags like "outlook", "msg", "email", "preview"
   - **Icon**: Upload a 128x128 PNG icon (optional but recommended)
   - **Screenshots**: Add screenshots of your extension in action
   - **Repository**: Link to your GitHub repository
   - **License**: MIT (or your chosen license)

## Step 7: Update Your Extension

For future updates:

1. **Update the version** in `package.json` (follow semantic versioning):
   ```json
   {
     "version": "0.0.2"
   }
   ```

2. **Make your changes** and test thoroughly

3. **Publish the update**:
   ```bash
   vsce publish
   ```

## Publishing Checklist

Before publishing, ensure:

- [ ] Extension compiles without errors (`npm run compile`)
- [ ] All dependencies are properly listed in `package.json`
- [ ] README.md is comprehensive and helpful
- [ ] Extension has been tested thoroughly
- [ ] Version number follows semantic versioning (e.g., 1.0.0, 1.0.1, 1.1.0)
- [ ] Publisher ID is correct in `package.json`
- [ ] Repository URL is correct (if applicable)
- [ ] LICENSE file is present
- [ ] Extension works with the sample .msg file
- [ ] No sensitive information is included in the package

## Troubleshooting

### Common Issues

1. **"Publisher not found"**
   - Ensure you've created a publisher account
   - Check that the publisher ID in `package.json` matches exactly

2. **"Authentication failed"**
   - Regenerate your Personal Access Token
   - Ensure the token has "Marketplace (Publish)" permission
   - Try logging in again: `vsce login your-publisher-id`

3. **"Extension validation failed"**
   - Check that all required fields are present in `package.json`
   - Ensure the extension compiles without errors
   - Verify that the main file path is correct

4. **"Version already exists"**
   - Update the version number in `package.json`
   - Follow semantic versioning: MAJOR.MINOR.PATCH

### Getting Help

If you encounter issues:

1. Check the [VS Code Extension Publishing documentation](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
2. Visit the [Visual Studio Marketplace](https://marketplace.visualstudio.com/manage) for publisher tools
3. Check the [vsce GitHub repository](https://github.com/microsoft/vscode-vsce) for issues and solutions

## After Publishing

1. **Wait for indexing**: It may take a few minutes for your extension to appear in search results
2. **Test installation**: Try installing your extension from the marketplace
3. **Monitor feedback**: Check for user reviews and issues
4. **Plan updates**: Consider user feedback for future improvements

## Best Practices

1. **Version Management**: Use semantic versioning (MAJOR.MINOR.PATCH)
2. **Documentation**: Keep your README.md updated and comprehensive
3. **Testing**: Test thoroughly before each release
4. **Changelog**: Consider adding a CHANGELOG.md file
5. **Support**: Provide ways for users to get help (GitHub issues, email, etc.)

## Next Steps

After successful publishing:

1. Share your extension on social media and developer communities
2. Consider adding more features based on user feedback
3. Maintain and update your extension regularly
4. Monitor download statistics and user reviews

Good luck with publishing your extension! 🚀 