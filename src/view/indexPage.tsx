import * as React from "react";
import { Button as Antdbutton, Spin, Slider, Carousel, Steps } from "antd";
import { Button, List } from "antd-mobile";

import className from "./style.less";

import AudioPlayer from "@/components/AudioPlayer/AudioPlayer";

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
                <Antdbutton type="primary" style={{ marginRight: "0.08rem" }}>inline</Antdbutton>
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