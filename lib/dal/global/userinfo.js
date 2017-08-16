"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mobx_1 = require("mobx");
class DALUserInfo {
    constructor() {
        this.username = null;
        this.openid = null;
        this.unionid = null;
    }
}
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", String)
], DALUserInfo.prototype, "username", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", String)
], DALUserInfo.prototype, "openid", void 0);
tslib_1.__decorate([
    mobx_1.observable,
    tslib_1.__metadata("design:type", String)
], DALUserInfo.prototype, "unionid", void 0);
