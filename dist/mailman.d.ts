import { MailMessage } from './message';
export declare class Mailman {
    private receipents;
    private ccReceipents;
    private bccReceipents;
    private sender;
    private _replyTo;
    private _inReplyTo;
    private constructor();
    static init(): Mailman;
    from(sender: string): this;
    replyTo(replyToEmail: string): this;
    inReplyTo(messageId: string): this;
    to(receipents: string | string[]): this;
    cc(ccReceipents: string | string[]): this;
    bcc(bccReceipents: string | string[]): this;
    send(mail: MailMessage): Promise<void>;
}
