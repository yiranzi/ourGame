"use strict";
/* tslint:disable */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * fetch的同构方法
 * @export fetch - 导出全局的fetch方法，服务器上使用node-fetch实现，前端使用unfetch实现
 */
exports.default = global.fetch = global.fetch = global.fetch || (typeof process === "undefined" ? (require("unfetch").default || require("unfetch")) : (function (url, opts) {
    return require("node-fetch")(url.replace(/^\/\//g, "https://"), opts);
}));
