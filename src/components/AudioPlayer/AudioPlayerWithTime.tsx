import React from "react";

import AudioPlayer from "./AudioPlayer";

import Card from "../Card";

import { Slider } from "antd";

import className from "./style/AudioPlayerWithTime.less";

import IconFont from "@/assets/iconFont/iconfont.less";

/**
 * AudioPlayerWithOutTime
 * @interface PropsTypes
 * @property {boolean} isPlay - isPlay
 */
interface PropsTypes {
    isPlay?: boolean; // use once
    autoPlay?: boolean;
    children?: JSX.Element;
    listenInterval?: number;
    loop?: boolean;
    muted?: boolean;
    onAbort?: Function;
    onCanPlay?: Function;
    onCanPlayThrough?: Function;
    onEnded?: Function;
    onError?: Function;
    onListen?: Function;
    onPause?: Function;
    onPlay?: React.ReactEventHandler<any>;
    onSeeked?: Function;
    onLoadedMetadata?: Function;
    preload?: string;
    src?: string; // Not required b/c can use <source>
    title?: string;
}
interface StateTypes {
    isPlay: boolean;
    length: number;
    sliderValue: number;
    current_time: number;
}
/**
 * @class AudioPlayerWithOutTime
 * @extends {React.PureComponent<PropsTypes, StateTypes>}
 * @property {boolean} isPlay - isPlay
 */
class AudioPlayerWithTime extends React.PureComponent<PropsTypes, StateTypes> {
    private audioPlayerEl: AudioPlayer = undefined;
    private sliderChangeFlag: boolean = false;
    constructor(props: PropsTypes) {
        super(props);
        this.state = {
            isPlay: this.props.isPlay || false,
            length: 0,
            sliderValue: 0,
            current_time: 0
        };
        this.handleTipFormatter = this.handleTipFormatter.bind(this);
        this.handlePlayButton = this.handlePlayButton.bind(this);
        this.handleOnLoadedMetadata = this.handleOnLoadedMetadata.bind(this);
        this.handleOnAfterChange = this.handleOnAfterChange.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnListen = this.handleOnListen.bind(this);
        this.handleOnEnded = this.handleOnEnded.bind(this);
    }
    get playButtonIcon(): string {
        return this.state.isPlay ? IconFont.icon_zanting + " " + IconFont.iconfont : IconFont.icon_bofang + " " + IconFont.iconfont;
    }
    handleTipFormatter(value: number) {
        return [
            Math.floor(value / 60) ,
            Math.floor(value % 60)
        ].join(":").replace(/\b(\d)\b/g, "0$1");
    }
    handlePlayButton() {
        if (this.state.isPlay) {
            this.setState({
                isPlay: false
            }, () => {
                this.audioPlayerEl.audioEl.pause();
            });
        } else {
            this.setState({
                isPlay: true
            }, () => {
                this.audioPlayerEl.audioEl.play();
            });
        }
    }
    handleOnLoadedMetadata(e: Event) {
        this.props.onLoadedMetadata && this.props.onLoadedMetadata(e);
        this.setState({
            sliderValue: 0,
            current_time: 0,
            isPlay: false
        }, () => {
            this.audioPlayerEl.audioEl.pause();
        });
    }
    handleOnAfterChange(value: any) {
        this.sliderChangeFlag = false;
        this.audioPlayerEl.audioEl.currentTime = value;
    }
    handleOnChange(value: number) {
        this.sliderChangeFlag = true;
        this.setState({
            sliderValue: value,
            current_time: value
        });
    }
    handleOnListen(value: number) {
        if (!this.sliderChangeFlag) {
            this.setState({
                sliderValue: value,
                current_time: value
            });
        }
    }
    handleOnEnded() {
        this.props.onEnded && this.props.onEnded();
        this.setState({
            sliderValue: 0,
            current_time: 0,
            isPlay: false
        }, () => {
            this.audioPlayerEl.audioEl.pause();
        });
    }
    render() {
        const {isPlay, ...otherProps} = this.props;
        return (
            <Card>
                <div className={className.wrapper}>
                    <i className={this.playButtonIcon + " " + className.icon_left} onClick={this.handlePlayButton}></i>
                    <Slider
                        defaultValue={0}
                        value={this.state.sliderValue}
                        min={0}
                        max={this.state.length}
                        tipFormatter={this.handleTipFormatter}
                        onAfterChange={this.handleOnAfterChange}
                        onChange={this.handleOnChange}
                    />
                    <i className={className.icon_right} onClick={this.handlePlayButton}>{this.handleTipFormatter(this.state.current_time)}/{this.handleTipFormatter(this.state.length)}</i>
                </div>
                <AudioPlayer
                    src={this.props.src}
                    ref={(ref) => { this.audioPlayerEl = ref; }}
                    onLoadedMetadata={this.handleOnLoadedMetadata}
                    onListen={this.handleOnListen}
                    autoPlay={this.props.autoPlay}
                    onEnded={this.handleOnEnded}
                    loop={this.props.loop}
                    muted={this.props.muted}
                    preload={this.props.preload}
                    title={this.props.title}
                >
                    {this.props.children}
                </AudioPlayer>
            </Card>
        );
    }
}

export default AudioPlayerWithTime;