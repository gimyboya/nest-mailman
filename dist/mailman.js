"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mailman = void 0;
const service_1 = require("./service");
class Mailman {
    constructor() {
        this.sender = '';
        this._replyTo = '';
        this._inReplyTo = '';
        this.receipents = '';
        this.ccReceipents = '';
        this.bccReceipents = '';
    }
    static init() {
        return new Mailman();
    }
    from(sender) {
        this.sender = sender;
        return this;
    }
    replyTo(replyToEmail) {
        this._replyTo = replyToEmail;
        return this;
    }
    inReplyTo(messageId) {
        this._inReplyTo = messageId;
        return this;
    }
    to(receipents) {
        this.receipents = receipents;
        return this;
    }
    cc(ccReceipents) {
        this.ccReceipents = ccReceipents;
        return this;
    }
    bcc(bccReceipents) {
        this.bccReceipents = bccReceipents;
        return this;
    }
    send(mail) {
        return service_1.MailmanService.send({
            mail,
            cc: this.ccReceipents,
            bcc: this.bccReceipents,
            sender: this.sender,
            replyTo: this._replyTo,
            inReplyTo: this._inReplyTo,
            receipents: this.receipents,
        });
    }
}
exports.Mailman = Mailman;
