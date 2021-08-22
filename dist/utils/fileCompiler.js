"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompiledHtml = void 0;
const compilers_1 = require("../compilers");
exports.getCompiledHtml = (filename, compilerOptions, payload) => {
    const namesBreakdown = filename.split('.');
    const extension = namesBreakdown.pop();
    let mailCompiler;
    if (extension === 'md') {
        mailCompiler = new compilers_1.MarkdownCompiler(filename, compilerOptions);
    }
    else {
        mailCompiler = new compilers_1.HandlebarCompiler(filename, compilerOptions);
    }
    return mailCompiler.compileMail(payload);
};
