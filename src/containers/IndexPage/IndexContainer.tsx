import * as React from "react";
import Card from "@/components/Card";
import className from "./style/IndexContainer.less";
import { AudioPlayerWithoutTime, AudioPlayerPPTCard } from "@/components/AudioPlayer";
import {
    Button as Antdbutton,
    Carousel,
    Slider,
    Spin,
    Steps
    } from "antd";
import { Button, List } from "antd-mobile";
import { observer } from "mobx-react";
import { CourseCatalogCard, SummaryCard, CourseStartTimeCard, TimePickerCard } from "@/components/ConductPage";
import ImageCard from "@/components/ImageCard";

interface StateTypes {
    Carouselindex: number;
}

interface PropsTypes {
    DALState: any;
}

@observer
class IndexContainer extends React.Component<PropsTypes, StateTypes> {
    constructor() {
        super();
        this.handleIndexChangeCallback = this.handleIndexChangeCallback.bind(this);
        this.state = {
            Carouselindex: 0,
        };
    }
    componentWillMount() {
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
            <div className={className.div} onClick={this.props.DALState.fetchIndexPageState}>
                <div style={{paddingLeft: 0, paddingRight: 0}}>
                    <ImageCard src={this.props.DALState.bannerSrc}></ImageCard>
                </div>
                <div>
                    <TimePickerCard data={this.props.DALState.timePicker}></TimePickerCard>
                </div>
                <div>
                    <AudioPlayerWithoutTime src={this.props.DALState.audioSrc} preload={"auto"}></AudioPlayerWithoutTime>
                </div>
                <div>
                    <SummaryCard>
                        {this.props.DALState.summary}
                    </SummaryCard>
                </div>
                <div>
                    <CourseCatalogCard>
                        {this.props.DALState.catalog}
                    </CourseCatalogCard>
                </div>
                <br />
                <div className={className.submitButton}>
                    {this.props.DALState.price} 元，立即学习
                </div>
            </div>
        );
    }
}
export default IndexContainer;