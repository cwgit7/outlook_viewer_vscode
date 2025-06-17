import * as vscode from 'vscode';
import { MsgPreviewProvider } from './msgPreviewProvider';

export function activate(context: vscode.ExtensionContext) {
    console.log('Outlook MSG Preview extension is now active!');

    // Register custom editor provider for .msg files
    const msgPreviewProvider = new MsgPreviewProvider(context);
    const disposable = vscode.window.registerCustomEditorProvider(
        'outlook-msg-preview.preview',
        msgPreviewProvider,
        {
            webviewOptions: {
                retainContextWhenHidden: true
            }
        }
    );

    // Register command to open preview
    const openPreviewCommand = vscode.commands.registerCommand(
        'outlook-msg-preview.openPreview',
        (uri: vscode.Uri) => {
            if (uri) {
                vscode.commands.executeCommand('vscode.openWith', uri, 'outlook-msg-preview.preview');
            }
        }
    );

    context.subscriptions.push(disposable, openPreviewCommand);
}

export function deactivate() {} 