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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var MailmanService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailmanService = void 0;
const provider_map_1 = require("./provider.map");
const nodemailer = __importStar(require("nodemailer"));
const common_1 = require("@nestjs/common");
let MailmanService = MailmanService_1 = class MailmanService {
    constructor(options) {
        MailmanService_1.options = options;
        MailmanService_1.transporter = nodemailer.createTransport({
            host: options.host,
            port: options.port,
            secure: options.port === 465 ? true : false,
            auth: { user: options.username, pass: options.password },
        }, { from: options.from });
    }
    static getConfig() {
        return MailmanService_1.options;
    }
    static send(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = MailmanService_1.options;
            const mailData = options.mail.getMailData();
            const mail = {
                to: options.receipents,
                cc: options.cc,
                bcc: options.bcc,
                from: options.sender || config.from,
                html: mailData.html,
                subject: mailData.subject,
                attachments: mailData.attachments,
            };
            if (options.replyTo || config.replyTo) {
                mail.replyTo = options.replyTo || config.replyTo;
            }
            if (options.inReplyTo) {
                mail.inReplyTo = options.inReplyTo;
            }
            yield MailmanService_1.transporter.sendMail(mail);
        });
    }
};
MailmanService = MailmanService_1 = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(provider_map_1.map.MAILABLE_OPTIONS)),
    __metadata("design:paramtypes", [Object])
], MailmanService);
exports.MailmanService = MailmanService;
