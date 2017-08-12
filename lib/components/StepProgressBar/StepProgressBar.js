"use strict";
/**
 * ict主淫部门统一UI库
 * @module ICT-UI
 */
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const className = require("./style/StepProgressBar.less");
/**
 * 步骤进度条组件，用于步骤提示等
 * @class StepProgressBar
 * @type ICT-UI-Component
 * @author heartblood
 * @param {number} width - [可选] 宽度(单位px) 尚未做rem兼容
 * @param {number} index - [必填] 当前进度，不能超过总step长度，可动态改变，从0开始计数
 * @param {Array<{index:number, title: String}>} steps - [必填] step内容数组，index为step步骤数字，title为下方文字说明，传入的数组须有序， title为可选
 */
class StepProgressBar extends React.PureComponent {
    constructor(props) {
        super(props);
        this.realWidth = (this.props.width - 32) * 4 / 3;
        this.changeCircleStyle = this.changeCircleStyle.bind(this);
        this.changeProgressStyle = this.changeProgressStyle.bind(this);
        console.log(this.realWidth);
    }
    changeCircleStyle(index) {
        if (index < this.props.index) {
            return className['circle-green'];
        }
        if (index === this.props.index) {
            return className['circle-gray'];
        }
        return className['circle-white'];
    }
    changeProgressStyle(index) {
        if (index < this.props.index - 1) {
            return className['progress-full-line'];
        }
        if (index === this.props.index - 1) {
            return className['progress-half-line'];
        }
        return className['progress-null-line'];
    }
    get stepRenderBody() {
        return this.props.steps.map(function (value, index) {
            return (React.createElement("div", { className: className.stepField, key: index },
                React.createElement("div", { className: className.state, style: { width: index < this.props.steps.length - 1 ? `${this.realWidth / 4}px` : 'width: 32px' } },
                    React.createElement("div", { className: this.changeCircleStyle(index) },
                        React.createElement("span", { style: { display: index >= this.props.index ? "inline-block" : "none" } }, value.index),
                        React.createElement("img", { className: className.okImg, src: require("@/assets/image/StepProgressBar/ok.svg"), width: "24px", height: "24px", style: { display: index >= this.props.index ? "none" : "inline" } })),
                    React.createElement("div", { className: className.backline, style: {
                            width: index < this.props.steps.length - 1 ? `${this.realWidth / 4 - 32}px` : 'width: 32px',
                            display: index < this.props.steps.length - 1 ? "inline-block" : "none"
                        } },
                        React.createElement("div", { className: this.changeProgressStyle(index) }))),
                React.createElement("div", { className: className['step-title'] }, value.title)));
        }.bind(this));
    }
    render() {
        return (React.createElement("div", { className: className.container },
            React.createElement("div", { className: className.step }, this.stepRenderBody)));
    }
}
exports.default = StepProgressBar;
