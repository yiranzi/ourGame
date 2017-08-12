"use strict";
/**
 * this is a module demo, it is create by heartblood
 *
 * @module Demo
 */
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ProgressBar_1 = require("@/components/ProgressBar/ProgressBar");
const Spinner_1 = require("@/components/Spinner/Spinner");
const StepProgressBar_1 = require("@/components/StepProgressBar/StepProgressBar");
const SnackBar_1 = require("@/components/SnackBar/SnackBar");
const Carousel_1 = require("@/components/Carousel/Carousel");
const Button_1 = require("@/components/Button/Button");
const Avatar_1 = require("@/components/Avatar/Avatar");
const Loading_1 = require("@/components/Loading/Loading");
const AudioPlayer_1 = require("@/components/AudioPlayer/AudioPlayer");
/**
 * This module will be hot-reloaded and rendered upon modification.
 * @class
 * @param {string} name - the name of creater.
 */
class Greeting extends React.Component {
    constructor() {
        super();
        this.clickhandle = this.clickhandle.bind(this);
        this.SnackBarClick = this.SnackBarClick.bind(this);
        this.handleIndexChangeCallback = this.handleIndexChangeCallback.bind(this);
        this.handleTap = this.handleTap.bind(this);
        this.state = {
            index: 1,
            Carouselindex: 0,
            onplay: true
        };
    }
    clickhandle() {
        this.setState({
            index: 2
        });
    }
    SnackBarClick() {
    }
    handleIndexChangeCallback(index) {
        if (this.state.Carouselindex + index > -1 && this.state.Carouselindex + index < 5) {
            this.setState((prevState, props) => ({
                Carouselindex: prevState.Carouselindex + index
            }));
        }
    }
    handleTap() {
        this.setState((prevState, props) => ({
            onPlay: prevState.onplay
        }));
    }
    render() {
        return (React.createElement("div", { style: { height: "100%" } },
            React.createElement(Carousel_1.default, { index: this.state.Carouselindex, contentPaddingTop: "20%", handleIndexChangeCallback: this.handleIndexChangeCallback, direction: "vertical", bottomNode: React.createElement(StepProgressBar_1.default, { steps: steps, index: this.state.Carouselindex, width: 250 }) },
                React.createElement("div", { "data-index": "1", style: { height: "100%" } },
                    React.createElement(AudioPlayer_1.default, { src: "https://h5.ichangtou.com/minicfm/assets/audio/20170314.mp3" })),
                React.createElement("div", { "data-index": "11", style: { height: "100%" } },
                    React.createElement(Avatar_1.default, { shape: "square" }, "ZT")),
                React.createElement("div", { "data-index": "12", style: { height: "100%" } },
                    React.createElement(Loading_1.default, null)),
                React.createElement("div", { "data-index": "6", style: { height: "100%" } },
                    React.createElement(Button_1.default, null)),
                React.createElement("div", { "data-index": "5", style: { height: "100%" } },
                    React.createElement("h1", null, "ProgressBar"),
                    React.createElement("div", { style: { width: "100%" } },
                        React.createElement(ProgressBar_1.default, { progress: 40, buffer: 20, isLoading: false }))),
                React.createElement("div", { "data-index": "2", style: { height: "100%" } },
                    React.createElement("h1", null, "Spinner"),
                    React.createElement(Spinner_1.default, { size: 1 })),
                React.createElement("div", { "data-index": "3", style: { height: "100%" } },
                    React.createElement("h1", { onClick: this.clickhandle }, "StepProgressBar"),
                    React.createElement(StepProgressBar_1.default, { steps: steps, index: this.state.index, width: 250 })),
                React.createElement("div", { "data-index": "4", style: { height: "100%" } },
                    React.createElement("h1", null, "SnackBar"),
                    React.createElement("button", { onClick: this.SnackBarClick }),
                    React.createElement(SnackBar_1.default, { active: true })))));
    }
}
exports.Greeting = Greeting;
let steps = [{
        index: '1',
    }, {
        index: '2',
    }, {
        index: '3',
    }, {
        index: '4',
    }, {
        index: '5',
    }];
