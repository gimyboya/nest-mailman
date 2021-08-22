import { DynamicModule } from "@nestjs/common";
import { MailmanOptions, MailmanAsyncOptions } from "./interfaces";
export declare class MailmanModule {
    static register(options: MailmanOptions): DynamicModule;
    static registerAsync(options: MailmanAsyncOptions): DynamicModule;
    private static createStorageOptionsProvider;
}
