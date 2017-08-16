"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 判断是否在微信打开
 */
/**
 * @func isWeiXin
 * @return {Boolean} - 如果为微信，则返回true，如果不是，则返回false
 */
const isWeiXin = () => {
    let ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) !== null && ua.match(/MicroMessenger/i)[0] === "micromessenger") {
        return true;
    }
    else {
        return false;
    }
};
exports.isWeiXin = isWeiXin;
/**
 * @func whichPlantFrom
 * @return {string} - 如果为微信，则返回字符串 "client"， 如果为服务器，则返回字符串 "server"
 */
const whichPlantFrom = () => {
    return typeof process === "undefined" ? "client" : "server";
};
exports.whichPlantFrom = whichPlantFrom;
