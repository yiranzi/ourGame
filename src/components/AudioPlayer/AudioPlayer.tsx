import React from "react";

interface PropsTypes {
    autoPlay?: boolean;
    children?: JSX.Element;
    className?: string;
    controls?: Boolean;
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
    style?: Object;
    title?: string;
}

class ReactAudioPlayer extends React.Component<PropsTypes> {
    private audioEl: HTMLAudioElement = undefined;
    private listenTracker: NodeJS.Timer = undefined;
    public static defaultProps: Partial<PropsTypes> = {
        autoPlay: false,
        children: null,
        className: "",
        controls: false,
        listenInterval: 10000,
        loop: false,
        muted: false,
        onAbort: () => {},
        onCanPlay: () => {},
        onCanPlayThrough: () => {},
        onEnded: () => {},
        onError: () => {},
        onListen: () => {},
        onPause: () => {},
        onPlay: () => {},
        onSeeked: () => {},
        onLoadedMetadata: () => {},
        preload: "metadata",
        src: null,
        style: {},
        title: "",
    };


    componentDidMount() {
        const audio = this.audioEl;

        audio.addEventListener("error", (e) => {
            this.props.onError(e);
        });

        // When enough of the file has downloaded to start playing
        audio.addEventListener("canplay", (e) => {
            this.props.onCanPlay(e);
        });

        // When enough of the file has downloaded to play the entire file
        audio.addEventListener("canplaythrough", (e) => {
            this.props.onCanPlayThrough(e);
        });

        // When audio play starts
        audio.addEventListener("play", (e) => {
            this.setListenTrack();
            this.props.onPlay(e);
        });

        // When unloading the audio player (switching to another src)
        audio.addEventListener("abort", (e) => {
            this.clearListenTrack();
            this.props.onAbort(e);
        });

        // When the file has finished playing to the end
        audio.addEventListener("ended", (e) => {
            this.clearListenTrack();
            this.props.onEnded(e);
        });

        // When the user pauses playback
        audio.addEventListener("pause", (e) => {
            this.clearListenTrack();
            this.props.onPause(e);
        });

        // When the user drags the time indicator to a new time
        audio.addEventListener("seeked", (e) => {
            this.props.onSeeked(e);
        });

        audio.addEventListener("loadedmetadata", (e) => {
            this.props.onLoadedMetadata(e);
        });
    }

    /**
     * Set an interval to call props.onListen every props.listenInterval time period
     */
    setListenTrack() {
        if (!this.listenTracker) {
            const listenInterval = this.props.listenInterval;
            this.listenTracker = setInterval(() => {
                this.props.onListen(this.audioEl.currentTime);
            }, listenInterval);
        }
    }

    /**
     * Clear the onListen interval
     */
    clearListenTrack() {
        if (this.listenTracker) {
            clearInterval(this.listenTracker);
            this.listenTracker = null;
        }
    }

    render() {
        const incompatibilityMessage = this.props.children || (
            <p>Your browser does not support the <code>audio</code> element.</p>
        );

        // Set controls to be true by default unless explicity stated otherwise
        const controls = !(this.props.controls === false);

        // Set lockscreen / process audio title on devices
        const title = this.props.title ? this.props.title : this.props.src;

        return (
            <audio
                autoPlay={this.props.autoPlay}
                className={this.props.className}
                controls={controls}
                loop={this.props.loop}
                muted={this.props.muted}
                onPlay={this.props.onPlay}
                preload={this.props.preload}
                ref={(ref) => { this.audioEl = ref; }}
                src={this.props.src}
                style={this.props.style}
                title={title}
            >
                {incompatibilityMessage}
            </audio>
        );
    }
}

export default ReactAudioPlayer;