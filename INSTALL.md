# Installation Guide for Outlook MSG Preview Extension

## Prerequisites

Before you can develop or run this VS Code extension, you need to install the following:

### 1. Node.js and npm
Download and install Node.js from [https://nodejs.org/](https://nodejs.org/)
- Choose the LTS version (recommended)
- This will also install npm (Node Package Manager)

### 2. Visual Studio Code
Download and install VS Code from [https://code.visualstudio.com/](https://code.visualstudio.com/)

### 3. Git (optional but recommended)
Download and install Git from [https://git-scm.com/](https://git-scm.com/)

## Installation Steps

### Step 1: Clone or Download the Extension
```bash
git clone <repository-url>
cd outlook-msg-preview
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Compile the Extension
```bash
npm run compile
```

### Step 4: Run the Extension in Development Mode
1. Open the project folder in VS Code
2. Press `F5` or go to Run → Start Debugging
3. This will open a new VS Code window with the extension loaded

## Development Workflow

### Making Changes
1. Edit the TypeScript files in the `src/` directory
2. The extension will automatically recompile when you save
3. Press `Ctrl+Shift+P` and reload the window to see changes

### Testing
1. Create a `.msg` file for testing
2. Open the `.msg` file in the extension development window
3. The file should open in the custom preview editor

### Building for Distribution
```bash
npm install -g vsce
vsce package
```

This will create a `.vsix` file that can be installed in VS Code.

## Troubleshooting

### Common Issues

1. **"npm is not recognized"**
   - Make sure Node.js is installed and added to your PATH
   - Restart your terminal/command prompt after installation

2. **TypeScript compilation errors**
   - Run `npm install` to ensure all dependencies are installed
   - Check that TypeScript is installed: `npm list typescript`

3. **Extension not loading**
   - Check the Developer Console in VS Code for error messages
   - Ensure the extension is compiled: `npm run compile`

4. **.msg files not opening in preview**
   - Make sure the file has a `.msg` extension
   - Check that the custom editor is registered in `package.json`

### Getting Help

If you encounter issues:
1. Check the VS Code Developer Console for error messages
2. Verify all prerequisites are installed correctly
3. Try deleting `node_modules` and running `npm install` again
4. Check the VS Code extension development documentation

## File Structure

```
outlook-msg-preview/
├── src/
│   ├── extension.ts          # Main extension entry point
│   ├── msgPreviewProvider.ts # Custom editor provider
│   ├── msgParser.ts          # MSG file parser
│   └── test/                 # Test files
├── package.json              # Extension manifest
├── tsconfig.json            # TypeScript configuration
├── .eslintrc.json           # ESLint configuration
├── README.md                # Extension documentation
└── INSTALL.md               # This file
```

## Next Steps

After installation:
1. Read the README.md for usage instructions
2. Try opening a `.msg` file to test the extension
3. Modify the code to add new features
4. Run tests with `npm test`
5. Package the extension for distribution 