import { MailCompiler, CompilerOptions } from './../interfaces';
export declare class HandlebarCompiler implements MailCompiler {
    filePath: string;
    compilerOptions: CompilerOptions;
    constructor(filename: string, compilerOptions: CompilerOptions);
    compileMail(options: Record<string, any>): string;
}
