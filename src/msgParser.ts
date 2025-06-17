import * as fs from 'fs';

export interface MsgData {
    subject: string;
    from: string;
    to: string;
    cc: string;
    bcc: string;
    date: string;
    body: string;
    attachments: string[];
}

export class MsgParser {
    private buffer: Buffer;
    private offset: number = 0;

    constructor(filePath: string) {
        this.buffer = fs.readFileSync(filePath);
    }

    public parse(): MsgData {
        try {
            return {
                subject: this.extractSubject(),
                from: this.extractFrom(),
                to: this.extractTo(),
                cc: this.extractCc(),
                bcc: this.extractBcc(),
                date: this.extractDate(),
                body: this.extractBody(),
                attachments: this.extractAttachments()
            };
        } catch (error) {
            console.error('Error parsing MSG file:', error);
            return {
                subject: 'Error parsing file',
                from: '',
                to: '',
                cc: '',
                bcc: '',
                date: '',
                body: 'Unable to parse this MSG file.',
                attachments: []
            };
        }
    }

    private extractSubject(): string {
        // Look for subject in various formats
        const patterns = [
            /Subject[:\s]+([^\r\n]+)/i,
            /Subject[:\s]+([^\r\n]+)/gi,
            /Subject[:\s]*([^\r\n]+)/i
        ];

        const content = this.buffer.toString('utf8', 0, Math.min(this.buffer.length, 50000));
        
        for (const pattern of patterns) {
            const match = content.match(pattern);
            if (match && match[1]) {
                return match[1].trim();
            }
        }

        // Try to find subject in MIME headers
        const mimeMatch = content.match(/Subject:\s*([^\r\n]+)/i);
        if (mimeMatch) {
            return mimeMatch[1].trim();
        }

        return 'No Subject';
    }

    private extractFrom(): string {
        const patterns = [
            /From[:\s]+([^\r\n]+)/i,
            /From[:\s]*([^\r\n]+)/i,
            /Sender[:\s]+([^\r\n]+)/i
        ];

        const content = this.buffer.toString('utf8', 0, Math.min(this.buffer.length, 50000));
        
        for (const pattern of patterns) {
            const match = content.match(pattern);
            if (match && match[1]) {
                return match[1].trim();
            }
        }

        return 'Unknown Sender';
    }

    private extractTo(): string {
        const patterns = [
            /To[:\s]+([^\r\n]+)/i,
            /To[:\s]*([^\r\n]+)/i
        ];

        const content = this.buffer.toString('utf8', 0, Math.min(this.buffer.length, 50000));
        
        for (const pattern of patterns) {
            const match = content.match(pattern);
            if (match && match[1]) {
                return match[1].trim();
            }
        }

        return '';
    }

    private extractCc(): string {
        const patterns = [
            /Cc[:\s]+([^\r\n]+)/i,
            /Cc[:\s]*([^\r\n]+)/i
        ];

        const content = this.buffer.toString('utf8', 0, Math.min(this.buffer.length, 50000));
        
        for (const pattern of patterns) {
            const match = content.match(pattern);
            if (match && match[1]) {
                return match[1].trim();
            }
        }

        return '';
    }

    private extractBcc(): string {
        const patterns = [
            /Bcc[:\s]+([^\r\n]+)/i,
            /Bcc[:\s]*([^\r\n]+)/i
        ];

        const content = this.buffer.toString('utf8', 0, Math.min(this.buffer.length, 50000));
        
        for (const pattern of patterns) {
            const match = content.match(pattern);
            if (match && match[1]) {
                return match[1].trim();
            }
        }

        return '';
    }

    private extractDate(): string {
        const patterns = [
            /Date[:\s]+([^\r\n]+)/i,
            /Date[:\s]*([^\r\n]+)/i,
            /Sent[:\s]+([^\r\n]+)/i
        ];

        const content = this.buffer.toString('utf8', 0, Math.min(this.buffer.length, 50000));
        
        for (const pattern of patterns) {
            const match = content.match(pattern);
            if (match && match[1]) {
                return match[1].trim();
            }
        }

        return 'Unknown Date';
    }

    private extractBody(): string {
        const content = this.buffer.toString('utf8');
        
        // Try to find plain text body
        const textBodyMatch = content.match(/Content-Type:\s*text\/plain[^]*?\r?\n\r?\n([^]*?)(?=\r?\n--|$)/i);
        if (textBodyMatch && textBodyMatch[1]) {
            return this.cleanBody(textBodyMatch[1]);
        }

        // Try to find HTML body
        const htmlBodyMatch = content.match(/Content-Type:\s*text\/html[^]*?\r?\n\r?\n([^]*?)(?=\r?\n--|$)/i);
        if (htmlBodyMatch && htmlBodyMatch[1]) {
            return this.cleanBody(htmlBodyMatch[1]);
        }

        // Look for body in MIME format
        const mimeBodyMatch = content.match(/Content-Type:\s*text\/plain[^]*?\r?\n\r?\n([^]*?)(?=\r?\n--|$)/i);
        if (mimeBodyMatch && mimeBodyMatch[1]) {
            return this.cleanBody(mimeBodyMatch[1]);
        }

        // Fallback: look for any text content after headers
        const headerEnd = content.indexOf('\r\n\r\n');
        if (headerEnd !== -1) {
            const bodyContent = content.substring(headerEnd + 4);
            if (bodyContent.trim()) {
                return this.cleanBody(bodyContent);
            }
        }

        return 'Message body not found';
    }

    private cleanBody(body: string): string {
        return body
            .replace(/Content-Transfer-Encoding:[^\r\n]*\r?\n/gi, '')
            .replace(/Content-Type:[^\r\n]*\r?\n/gi, '')
            .replace(/--[^\r\n]*\r?\n/gi, '')
            .trim();
    }

    private extractAttachments(): string[] {
        const content = this.buffer.toString('utf8');
        const attachments: string[] = [];

        // Look for Content-Disposition: attachment
        const attachmentMatches = content.match(/Content-Disposition:\s*attachment[^]*?filename="([^"]+)"/gi);
        if (attachmentMatches) {
            attachmentMatches.forEach(match => {
                const filenameMatch = match.match(/filename="([^"]+)"/);
                if (filenameMatch && filenameMatch[1]) {
                    attachments.push(filenameMatch[1]);
                }
            });
        }

        // Look for Content-Disposition: attachment without quotes
        const attachmentMatches2 = content.match(/Content-Disposition:\s*attachment[^]*?filename=([^\r\n\s;]+)/gi);
        if (attachmentMatches2) {
            attachmentMatches2.forEach(match => {
                const filenameMatch = match.match(/filename=([^\r\n\s;]+)/);
                if (filenameMatch && filenameMatch[1]) {
                    attachments.push(filenameMatch[1]);
                }
            });
        }

        return [...new Set(attachments)]; // Remove duplicates
    }
} 