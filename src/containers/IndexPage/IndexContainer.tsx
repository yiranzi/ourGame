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
import Loading from "@/components/LoadingSpinner/Loading/Loading";

import {
    mountGlobalLoading,
    unMountGlobalLoading
} from "@/components/LoadingSpinner/RenderGlobalLoading";


interface StateTypes {
    Carouselindex: number;
}

interface PropsTypes {
    DALState: any;
    DALUserInfoState: any;
}

@observer
class IndexContainer extends React.Component<PropsTypes, StateTypes> {
    constructor(props: PropsTypes) {
        super(props);
        this.state = {
            Carouselindex: 0,
        };
    }
    componentWillMount() {
        this.props.DALState.fetchIndexPageState();
    }
    render() {
        // 判断是否已购买课程
        if (!this.props.DALState.hasFetchData) {
            mountGlobalLoading();
            return null;
        } else {
            unMountGlobalLoading();
            return (
                <div className={className.div}>
                    <div style={{paddingLeft: 0, paddingRight: 0}}>
                        <ImageCard src={this.props.DALState.bannerSrc}></ImageCard>
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
                    <div>
                        <TimePickerCard data={this.props.DALState.timePicker} ></TimePickerCard>
                    </div>
                    <br />
                    <div className={className.submitButton}>
                        {this.props.DALState.price} 元，立即学习
                    </div>
                </div>
            );
        }
    }
}
export default IndexContainer;