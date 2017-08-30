import * as React from "react";
import Card from "@/components/Card";
import className from "./style.less";
import { AudioPlayerWithoutTime, AudioPlayerPPTCard } from "@/components/AudioPlayer";
import {
    Button as Antdbutton,
    Carousel,
    Slider,
    Spin,
    Steps
    } from "antd";
import { Button, List } from "antd-mobile";
import { CourseCatalogCard, SummaryCard, CourseStartTimeCard } from "@/components/ConductPage";


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
                <div>
                    <AudioPlayerPPTCard>
                        <div><h3>1</h3></div>
                        <div><h3>2</h3></div>
                        <div><h3>3</h3></div>
                        <div><h3>4</h3></div>
                        <div><h3>5</h3></div>
                        <div><h3>6</h3></div>
                    </AudioPlayerPPTCard>
                </div>
                <div>
                    <CourseStartTimeCard mouth={"8"} day={"30"}></CourseStartTimeCard>
                </div>
                <div>
                    <AudioPlayerWithoutTime src={"https://source.ichangtou.com/file/sound/d9a3e3f2/13/Sp3i0B9lfjjj_01_01.mp3"} preload={"auto"}></AudioPlayerWithoutTime>
                </div>
                <div>
                    <SummaryCard>
                        课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍
                    </SummaryCard>
                </div>
                <div>
                    <CourseCatalogCard>
                        {["基金指数", "基金定投", "定投场内外", "策略", "温度指数", "简投法"]}
                    </CourseCatalogCard>
                </div>
            </div>
        );
    }
}