# Outlook MSG Preview Extension

A Visual Studio Code extension that allows you to preview Outlook .msg files directly within VS Code.

## Features

- **Custom Editor**: Opens .msg files in a dedicated preview panel
- **Message Information**: Displays subject, sender, recipients, date, and message body
- **Attachments**: Shows list of attachments (if any)
- **VS Code Integration**: Seamlessly integrates with VS Code's interface
- **Theme Support**: Automatically adapts to your VS Code theme

## Installation

### From Source

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Compile the extension:
   ```bash
   npm run compile
   ```
4. Press `F5` in VS Code to run the extension in a new Extension Development Host window

### Package the Extension

To create a VSIX package for distribution:

```bash
npm install -g vsce
vsce package
```

## Publishing to VS Code Marketplace

### Prerequisites

1. **Microsoft Account**: You need a Microsoft account to publish extensions
2. **Publisher Account**: Create a publisher account at [Visual Studio Marketplace](https://marketplace.visualstudio.com/manage)
3. **Personal Access Token**: Generate a token for publishing

### Step-by-Step Publishing Process

#### 1. Create a Publisher Account

1. Go to [Visual Studio Marketplace](https://marketplace.visualstudio.com/manage)
2. Sign in with your Microsoft account
3. Click "Create a publisher"
4. Fill in the required information:
   - **Publisher ID**: Choose a unique identifier (e.g., `yourname`)
   - **Display Name**: Your name or organization name
   - **Email**: Your email address

#### 2. Update Package.json

Update the `package.json` file with your publisher information:

```json
{
  "publisher": "your-publisher-id",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/outlook-msg-preview.git"
  }
}
```

#### 3. Generate Personal Access Token

1. Go to [Azure DevOps](https://dev.azure.com)
2. Sign in with your Microsoft account
3. Go to User Settings → Personal Access Tokens
4. Click "New Token"
5. Set the following:
   - **Name**: VSCode Extension Publishing
   - **Organization**: All accessible organizations
   - **Expiration**: Choose appropriate duration
   - **Scopes**: Custom defined → Marketplace (Publish)
6. Copy the generated token (you'll need it for publishing)

#### 4. Install vsce and Login

```bash
npm install -g vsce
vsce login your-publisher-id
```

When prompted, enter your Personal Access Token.

#### 5. Package and Publish

```bash
# Package the extension
npm run package

# Publish to marketplace
npm run publish
```

Or use vsce directly:

```bash
vsce package
vsce publish
```

#### 6. Update Extension

For future updates:

1. Update the version in `package.json`
2. Run `npm run publish` to publish the new version

### Publishing Checklist

Before publishing, ensure:

- [ ] Extension compiles without errors
- [ ] All dependencies are properly listed in `package.json`
- [ ] README.md is comprehensive and helpful
- [ ] Extension has been tested thoroughly
- [ ] Version number is appropriate (follow semantic versioning)
- [ ] Publisher ID is correct in `package.json`
- [ ] Repository URL is correct (if applicable)

### Alternative: Manual Upload

If you prefer not to use the command line:

1. Run `vsce package` to create a `.vsix` file
2. Go to [Visual Studio Marketplace](https://marketplace.visualstudio.com/manage)
3. Click "New extension"
4. Choose "Visual Studio Code"
5. Upload your `.vsix` file
6. Fill in the extension details and publish

## Usage

1. **Open a .msg file**: Simply double-click on any .msg file in VS Code's file explorer
2. **Right-click context menu**: Right-click on a .msg file and select "Open MSG Preview"
3. **Command Palette**: Use the command "Open MSG Preview" from the command palette

## How it Works

The extension uses a custom editor provider that:
1. Parses the .msg file format
2. Extracts message metadata (subject, sender, recipients, etc.)
3. Renders the content in a webview with VS Code's theming
4. Displays attachments if present

## Development

### Project Structure

```
├── src/
│   ├── extension.ts          # Main extension entry point
│   └── msgPreviewProvider.ts # Custom editor provider
├── package.json              # Extension manifest
├── tsconfig.json            # TypeScript configuration
└── README.md                # This file
```

### Building

```bash
npm run compile    # Compile TypeScript
npm run watch      # Watch for changes and recompile
npm run lint       # Run ESLint
```

## Limitations

- The current implementation uses a simplified parser for .msg files
- For production use, consider integrating with a more robust .msg parsing library
- Some complex .msg files may not parse correctly

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Troubleshooting

If you encounter issues:

1. Check the VS Code Developer Console for error messages
2. Ensure the .msg file is not corrupted
3. Try opening the file in Outlook to verify it's valid
4. Report issues on the GitHub repository

## Future Enhancements

- Better .msg file parsing
- Support for embedded images
- Export functionality
- Search within messages
- Multiple message preview tabs 