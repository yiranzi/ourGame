"use strict";
/**
 * ict主淫部门统一UI库
 * @module ICT-UI
 */
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const className = require("./style/Loading.less");
/**
 * 多种Loading样式
 * @class Loading
 * @type ICT-UI-Component
 * @author heartblood
 * @param {string} type - [可选] 选择种类，默认为type1
 */
exports.default = (props) => {
    return (React.createElement("div", null,
        React.createElement("i", { className: className.type_one_circleOne }),
        React.createElement("i", { className: className.type_one_circleTwo }),
        React.createElement("i", { className: className.type_one_circleThree })));
};
