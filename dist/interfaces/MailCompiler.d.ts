export interface MailCompiler {
    filePath: string;
    compileMail(options: Record<string, any> | undefined): string;
}
