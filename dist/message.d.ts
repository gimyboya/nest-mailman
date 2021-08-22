import { Attachment } from 'nodemailer/lib/mailer';
import { MailData } from './interfaces';
export declare class MailMessage {
    private mailSubject?;
    private viewFile?;
    private templateString?;
    private payload?;
    private mailType;
    private compiledHtml;
    private attachments;
    constructor();
    static init(): MailMessage;
    subject(subject: string): this;
    view(viewFile: string, payload?: Record<string, any>): this;
    raw(template: string, payload?: Record<string, any>): this;
    attach(filename: string, content: Omit<Attachment, 'filename'>): this;
    greeting(greeting: string): this;
    line(line: string): this;
    action(text: string, link: string): this;
    private _setGenericMailProperties;
    private _compileTemplate;
    getMailData(): MailData;
    render(): string;
}
