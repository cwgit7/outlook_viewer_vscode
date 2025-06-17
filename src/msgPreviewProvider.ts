import * as vscode from 'vscode';
import { MsgParser, MsgData } from './msgParser';

export class MsgPreviewProvider implements vscode.CustomTextEditorProvider {
    constructor(private readonly context: vscode.ExtensionContext) {}

    public async resolveCustomTextEditor(
        document: vscode.TextDocument,
        webviewPanel: vscode.WebviewPanel,
        _token: vscode.CancellationToken
    ): Promise<void> {
        webviewPanel.webview.options = {
            enableScripts: true,
            localResourceRoots: [this.context.extensionUri]
        };

        webviewPanel.webview.html = this.getHtmlForWebview(webviewPanel.webview);

        // Parse the .msg file using the new parser
        const msgParser = new MsgParser(document.uri.fsPath);
        const msgData = msgParser.parse();
        
        // Send the parsed data to the webview
        webviewPanel.webview.postMessage({
            type: 'update',
            data: msgData
        });
    }

    private getHtmlForWebview(webview: vscode.Webview): string {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Outlook MSG Preview</title>
                <style>
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        margin: 0;
                        padding: 20px;
                        background-color: var(--vscode-editor-background);
                        color: var(--vscode-editor-foreground);
                    }
                    .msg-container {
                        max-width: 800px;
                        margin: 0 auto;
                        background-color: var(--vscode-panel-background);
                        border: 1px solid var(--vscode-panel-border);
                        border-radius: 6px;
                        overflow: hidden;
                    }
                    .msg-header {
                        background-color: var(--vscode-titleBar-activeBackground);
                        padding: 20px;
                        border-bottom: 1px solid var(--vscode-panel-border);
                    }
                    .msg-subject {
                        font-size: 24px;
                        font-weight: 600;
                        margin-bottom: 15px;
                        color: var(--vscode-editor-foreground);
                    }
                    .msg-meta {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 15px;
                        font-size: 14px;
                    }
                    .msg-field {
                        display: flex;
                        flex-direction: column;
                    }
                    .msg-label {
                        font-weight: 600;
                        color: var(--vscode-descriptionForeground);
                        margin-bottom: 5px;
                    }
                    .msg-value {
                        color: var(--vscode-editor-foreground);
                        word-break: break-word;
                    }
                    .msg-body {
                        padding: 20px;
                        line-height: 1.6;
                        white-space: pre-wrap;
                        word-wrap: break-word;
                    }
                    .msg-attachments {
                        padding: 20px;
                        border-top: 1px solid var(--vscode-panel-border);
                        background-color: var(--vscode-editor-inactiveSelectionBackground);
                    }
                    .attachments-title {
                        font-weight: 600;
                        margin-bottom: 10px;
                        color: var(--vscode-editor-foreground);
                    }
                    .attachment-item {
                        padding: 8px 12px;
                        background-color: var(--vscode-button-secondaryBackground);
                        border: 1px solid var(--vscode-button-secondaryBorder);
                        border-radius: 4px;
                        margin-bottom: 5px;
                        color: var(--vscode-button-secondaryForeground);
                    }
                    .error-message {
                        color: var(--vscode-errorForeground);
                        padding: 20px;
                        text-align: center;
                    }
                    .loading {
                        text-align: center;
                        padding: 40px;
                        color: var(--vscode-descriptionForeground);
                    }
                </style>
            </head>
            <body>
                <div class="msg-container">
                    <div class="msg-header">
                        <div class="msg-subject" id="subject">Loading...</div>
                        <div class="msg-meta">
                            <div class="msg-field">
                                <div class="msg-label">From:</div>
                                <div class="msg-value" id="from">Loading...</div>
                            </div>
                            <div class="msg-field">
                                <div class="msg-label">To:</div>
                                <div class="msg-value" id="to">Loading...</div>
                            </div>
                            <div class="msg-field">
                                <div class="msg-label">Date:</div>
                                <div class="msg-value" id="date">Loading...</div>
                            </div>
                            <div class="msg-field">
                                <div class="msg-label">CC:</div>
                                <div class="msg-value" id="cc">Loading...</div>
                            </div>
                        </div>
                    </div>
                    <div class="msg-body" id="body">Loading message body...</div>
                    <div class="msg-attachments" id="attachments-container" style="display: none;">
                        <div class="attachments-title">Attachments:</div>
                        <div id="attachments-list"></div>
                    </div>
                </div>

                <script>
                    const vscode = acquireVsCodeApi();

                    window.addEventListener('message', event => {
                        const message = event.data;
                        switch (message.type) {
                            case 'update':
                                updateContent(message.data);
                                break;
                        }
                    });

                    function updateContent(data) {
                        document.getElementById('subject').textContent = data.subject || 'No Subject';
                        document.getElementById('from').textContent = data.from || 'Unknown Sender';
                        document.getElementById('to').textContent = data.to || 'No Recipients';
                        document.getElementById('cc').textContent = data.cc || 'No CC';
                        document.getElementById('date').textContent = data.date || 'Unknown Date';
                        document.getElementById('body').textContent = data.body || 'No message body';

                        const attachmentsContainer = document.getElementById('attachments-container');
                        const attachmentsList = document.getElementById('attachments-list');
                        
                        if (data.attachments && data.attachments.length > 0) {
                            attachmentsContainer.style.display = 'block';
                            attachmentsList.innerHTML = data.attachments
                                .map(attachment => \`<div class="attachment-item">\${attachment}</div>\`)
                                .join('');
                        } else {
                            attachmentsContainer.style.display = 'none';
                        }
                    }
                </script>
            </body>
            </html>
        `;
    }
} 