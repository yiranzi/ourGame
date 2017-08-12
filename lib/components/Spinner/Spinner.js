"use strict";
/**
 * ict主淫部门统一UI库
 * @module ICT-UI
 */
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const className = require("./style/Spinner.less");
/**
 * 转菊花组件，更好看的转菊花
 * @class Spinner
 * @type ICT-UI-Component
 * @author heartblood
 * @param {number} size - [可选] 小大比例
 */
exports.default = (props) => {
    return (React.createElement("div", { className: className.spinner, style: { transform: `scale(${props.size})` } },
        React.createElement("div", null),
        React.createElement("div", null)));
};
