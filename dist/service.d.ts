import { MailmanOptions, SendMailOptions } from './interfaces';
export declare class MailmanService {
    private static options;
    private static transporter;
    constructor(options: MailmanOptions);
    static getConfig(): MailmanOptions;
    static send(options: SendMailOptions): Promise<void>;
}
