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
exports.MailMessage = void 0;
const Handlebars = __importStar(require("handlebars"));
const constants_1 = require("./constants");
const service_1 = require("./service");
const mail_1 = require("./views/mail");
const fileCompiler_1 = require("./utils/fileCompiler");
class MailMessage {
    constructor() {
        this.attachments = {};
        this.compiledHtml = '';
        this.mailType = constants_1.RAW_MAIL;
        Handlebars.registerHelper('markdown', require('helper-markdown'));
    }
    static init() {
        return new MailMessage();
    }
    subject(subject) {
        this.mailSubject = subject;
        return this;
    }
    view(viewFile, payload) {
        this.mailType = constants_1.VIEW_BASED_MAIL;
        this.viewFile = viewFile;
        this.payload = payload;
        return this;
    }
    raw(template, payload) {
        this.mailType = constants_1.RAW_MAIL;
        this.templateString = template;
        this.payload = payload;
        return this;
    }
    attach(filename, content) {
        this.attachments[filename] = Object.assign(Object.assign({}, content), { filename });
        return this;
    }
    greeting(greeting) {
        this._setGenericMailProperties();
        this.payload.genericFields.push({ greeting });
        return this;
    }
    line(line) {
        this._setGenericMailProperties();
        this.payload.genericFields.push({ line });
        return this;
    }
    action(text, link) {
        this._setGenericMailProperties();
        this.payload.genericFields.push({ action: { text, link } });
        return this;
    }
    _setGenericMailProperties() {
        this.mailType = constants_1.GENERIC_MAIL;
        if (!this.payload || !this.payload.genericFields) {
            this.payload = { genericFields: [] };
        }
    }
    _compileTemplate() {
        if (this.compiledHtml)
            return this.compiledHtml;
        if (this.mailType === constants_1.GENERIC_MAIL) {
            const template = Handlebars.compile(mail_1.GENERIC_VIEW);
            this.compiledHtml = template(this.payload);
            return this.compiledHtml;
        }
        if (this.mailType === constants_1.VIEW_BASED_MAIL && this.viewFile) {
            const config = service_1.MailmanService.getConfig();
            if (config.path) {
                const configOptions = {
                    configPath: config.path,
                    mjml: config.mjml,
                };
                this.compiledHtml = fileCompiler_1.getCompiledHtml(this.viewFile, configOptions, this.payload);
                return this.compiledHtml;
            }
            else {
                throw new Error('Bad Request');
            }
        }
        if (this.mailType === constants_1.RAW_MAIL && this.templateString) {
            const template = Handlebars.compile(this.templateString);
            this.compiledHtml = template(this.payload);
            return this.compiledHtml;
        }
        return this.compiledHtml;
    }
    getMailData() {
        if (typeof this.handle === 'function') {
            this['handle']();
        }
        return {
            subject: this.mailSubject,
            html: this._compileTemplate(),
            attachments: Object.values(this.attachments),
        };
    }
    render() {
        return this._compileTemplate();
    }
}
exports.MailMessage = MailMessage;
