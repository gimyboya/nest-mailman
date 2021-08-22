"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var MailmanModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailmanModule = void 0;
const provider_map_1 = require("./provider.map");
const common_1 = require("@nestjs/common");
const service_1 = require("./service");
let MailmanModule = MailmanModule_1 = class MailmanModule {
    static register(options) {
        return {
            global: true,
            module: MailmanModule_1,
            providers: [
                service_1.MailmanService,
                {
                    provide: provider_map_1.map.MAILABLE_OPTIONS,
                    useValue: options,
                },
            ],
        };
    }
    static registerAsync(options) {
        return {
            global: true,
            module: MailmanModule_1,
            imports: options.imports || [],
            providers: [service_1.MailmanService, this.createStorageOptionsProvider(options)],
        };
    }
    static createStorageOptionsProvider(options) {
        if (options.useFactory) {
            return {
                provide: provider_map_1.map.MAILABLE_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        const inject = [
            (options.useClass || options.useExisting),
        ];
        return {
            provide: provider_map_1.map.MAILABLE_OPTIONS,
            useFactory: (optionsFactory) => __awaiter(this, void 0, void 0, function* () { return yield optionsFactory.createMailmanOptions(); }),
            inject,
        };
    }
};
MailmanModule = MailmanModule_1 = __decorate([
    common_1.Module({})
], MailmanModule);
exports.MailmanModule = MailmanModule;
