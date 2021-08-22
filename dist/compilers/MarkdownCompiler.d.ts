import { CompilerOptions, MailCompiler } from './../interfaces';
export declare class MarkdownCompiler implements MailCompiler {
    filePath: string;
    compilerOptions: CompilerOptions;
    constructor(filename: string, compilerOptions: CompilerOptions);
    compileMail(options: Record<string, any>): string;
}
