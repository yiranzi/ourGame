import * as React from "react";
import { Button as Antdbutton, Spin, Slider, Carousel, Steps } from "antd";
import { Button, List } from "antd-mobile";

import Card from "@/components/Card";

import className from "./style.less";

import { AudioPlayerWithoutTime } from "@/components/AudioPlayer";


interface StateTypes {
    Carouselindex: number;
}
export default class IndexPage extends React.Component<{}, StateTypes> {
    constructor() {
        super();
        this.handleIndexChangeCallback = this.handleIndexChangeCallback.bind(this);
        this.state = {
            Carouselindex: 0,
        };
    }
    handleIndexChangeCallback(index: number) {
        if (this.state.Carouselindex + index > -1 && this.state.Carouselindex + index < 7) {
            this.setState((prevState, props) => ({
                Carouselindex: prevState.Carouselindex + index
            }));
        }
    }
    render() {
        return (
            <div className={className.div}>
                <AudioPlayerWithoutTime src={"https://source.ichangtou.com/file/sound/d9a3e3f2/13/Sp3i0B9lfjjj_01_01.mp3"}></AudioPlayerWithoutTime>
            </div>
        );
    }
}