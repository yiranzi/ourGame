"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bridgeInit_1 = require("./bridgeInit");
// import {shareConfig wechatPay} from "./bridgeInit";
const wx2js = () => {
    bridgeInit_1.default();
    //
    // shareConfig();
    // wechatPay();
};
exports.default = wx2js;
