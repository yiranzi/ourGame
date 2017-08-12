"use strict";
/**
 * ict主淫部门统一UI库
 * @module ICT-UI
 */
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const className = require("./style/ProgressBar.less");
/**
 * 进度条组件，用于音频播放进度条，提示进度条等
 * @class ProgressBar
 * @type ICT-UI-Component
 * @author heartblood
 * @param {string} width - [可选] 宽度，不填则为100%
 * @param {number} progress - [必填] 当前进度长度(百分比)
 * @param {number} buffer - [可选] 当前缓存进度长度(百分比)
 * @param {boolean} isLoading - [可选] 为true时候，将无视其余参数，进入加载状态动画
 */
class ProgressBar extends React.PureComponent {
    render() {
        return (React.createElement("div", { className: className.container, style: { width: this.props.width } },
            React.createElement(Progress, { length: this.props.progress, isLoading: this.props.isLoading }),
            React.createElement(ProgressMax, { length: 100 - this.props.buffer, isLoading: this.props.isLoading }),
            React.createElement(ProgressBuffer, { length: this.props.buffer, isLoading: this.props.isLoading })));
    }
}
ProgressBar.defaultProps = {
    buffer: 0,
    width: "100%"
};
exports.default = ProgressBar;
const Progress = (props) => {
    const style = {
        width: props.isLoading ? undefined : `${props.length}%`
    };
    return (React.createElement("div", { className: props.isLoading ? className.loading : className.progress, style: style }));
};
const ProgressMax = (props) => {
    const style = {
        width: props.isLoading ? "100%" : `${props.length}%`
    };
    return (React.createElement("div", { className: className.progressMax, style: style }));
};
const ProgressBuffer = (props) => {
    const style = {
        width: props.isLoading ? "0" : `${props.length}%`
    };
    return (React.createElement("div", { className: className.progressBuffer, style: style }));
};
