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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandlebarCompiler = void 0;
const fs_1 = require("fs");
const path = __importStar(require("path"));
const Handlebars = __importStar(require("handlebars"));
const mjml_1 = __importDefault(require("mjml"));
class HandlebarCompiler {
    constructor(filename, compilerOptions) {
        this.filePath = path.join(compilerOptions.configPath, `${filename}.hbs`);
        this.compilerOptions = compilerOptions;
    }
    compileMail(options) {
        const template = Handlebars.compile(fs_1.readFileSync(this.filePath, 'utf-8'));
        const compiledHtml = template(options);
        if (compiledHtml.indexOf('<mjml>') !== -1) {
            return mjml_1.default(compiledHtml, this.compilerOptions.mjml).html;
        }
        return compiledHtml;
    }
}
exports.HandlebarCompiler = HandlebarCompiler;
