import React from "react";

import AudioPlayer from "./AudioPlayer";

import Card from "../Card";

import { Slider } from "antd";

import className from "./style/AudioPlayerWithOutTime.less";

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
}
/**
 * @class AudioPlayerWithOutTime
 * @extends {React.PureComponent<PropsTypes, StateTypes>}
 * @property {boolean} isPlay - isPlay
 */
class AudioPlayerWithOutTime extends React.PureComponent<PropsTypes, StateTypes> {
    private audioPlayerEl: AudioPlayer = undefined;
    constructor(props: PropsTypes) {
        super(props);
        this.state = {
            isPlay: this.props.isPlay || false
        };
        this.handleTipFormatter = this.handleTipFormatter.bind(this);
        this.handlePlayButton = this.handlePlayButton.bind(this);
    }
    handleTipFormatter(value: number) {
        return [
            Math.floor(value / 60) ,
            value % 60
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
    render() {
        const {isPlay, ...otherProps} = this.props;
        return (
            <Card>
                <div className={className.wrapper}>
                    <i className={className.icon_left} onClick={this.handlePlayButton}>播</i>
                    <Slider defaultValue={30} tipFormatter={this.handleTipFormatter} />
                </div>
                <AudioPlayer
                    {...otherProps}
                    ref={(ref) => { this.audioPlayerEl = ref; }}
                >
                    {this.props.children}
                </AudioPlayer>
            </Card>
        );
    }
}

export default AudioPlayerWithOutTime;