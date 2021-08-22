"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownCompiler = void 0;
const fs_1 = require("fs");
const path = __importStar(require("path"));
const Handlebars = __importStar(require("handlebars"));
class MarkdownCompiler {
    constructor(filename, compilerOptions) {
        this.filePath = path.join(compilerOptions.configPath, filename);
        this.compilerOptions = compilerOptions;
    }
    compileMail(options) {
        const template = Handlebars.compile('{{#markdown}}' + fs_1.readFileSync(this.filePath, 'utf-8') + '{{/markdown}}');
        return template(options);
    }
}
exports.MarkdownCompiler = MarkdownCompiler;
