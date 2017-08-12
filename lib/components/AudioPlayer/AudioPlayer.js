"use strict";
/**
 * ict主淫部门统一UI库
 * @module ICT-UI
 */
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const className = require("./style/AudioPlayer.less");
const howler = require("howler");
const ProgressBar_1 = require("@/components/ProgressBar/ProgressBar");
/**
 * 音频播放器
 * @class AudioPlayer
 * @type ICT-UI-Component
 * @author heartblood
 * @param {number} width - [可选] 宽度(单位px) 尚未做rem兼容
 * @param {number} index - [必填] 当前进度，不能超过总step长度，可动态改变，从0开始计数
 * @param {Array<{index:number, title: String}>} steps - [必填] step内容数组，index为step步骤数字，title为下方文字说明，传入的数组须有序， title为可选
 */
class AudioPlayer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.audioSprite = null;
        this.lock = true;
        this.SpriteId = null;
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.audioSprite = new howler.Howl({
            src: [this.props.src],
        });
    }
    handleButtonClick() {
        if (this.lock && this.SpriteId === null) {
            this.SpriteId = this.audioSprite.play();
            this.lock = false;
        }
        else if (!this.lock && this.SpriteId !== null) {
            this.audioSprite = this.audioSprite.pause(this.SpriteId);
            this.lock = true;
            this.SpriteId = null;
        }
    }
    render() {
        return (React.createElement("div", { className: className.container },
            React.createElement(ProgressBar_1.default, { progress: 40, buffer: 20, isLoading: false }),
            React.createElement("button", { onTouchStart: this.handleButtonClick, style: { width: "200px", height: "200px", marginTop: "200px" } }, "\u70B9\u6211")));
    }
}
exports.default = AudioPlayer;
