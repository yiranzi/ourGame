import * as React from "react";
import { Spin, Slider, Carousel, Steps } from "antd";
import className from "./style.less";

import AudioPlayer from "@/components/AudioPlayer/AudioPlayer";
import { Button, List } from "antd-mobile";

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
                <Button type="primary" inline style={{ marginRight: "0.08rem" }}>inline</Button>
                <Steps size="small" current={1}>
                    <Steps.Step />
                    <Steps.Step />
                    <Steps.Step />
                    <Steps.Step />
                    <Steps.Step />
                    <Steps.Step />
                </Steps>
            </div>
        );
    }
}