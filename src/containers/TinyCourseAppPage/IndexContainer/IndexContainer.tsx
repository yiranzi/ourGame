import * as React from "react";
import Card from "@/components/Card";
import className from "./style/IndexContainer.less";
import { AudioPlayerWithoutTime, AudioPlayerWithTime } from "@/components/AudioPlayer";
import {
    Button as Antdbutton,
    Carousel,
    Slider,
    Spin,
    Steps
    } from "antd";
import { Button, List } from "antd-mobile";
import { observer } from "mobx-react";
import ImageCardWithTitle from "@/components/ImageCard/ImageCardWithTitle";
import { CourseCatalogCard, SummaryCard, CourseStartTimeCard, TimePickerCard, TeacherIntro } from "@/components/ConductPage";
import ImageCard from "@/components/ImageCard";
import Loading from "@/components/LoadingSpinner/Loading/Loading";
import Modal from "@/components/Modal/Modal";
import {
    mountGlobalLoading,
    unMountGlobalLoading
} from "@/components/LoadingSpinner/RenderGlobalLoading";

interface StateTypes {
    period: number;
}

interface PropsTypes {
    DALIndexPageState: any;
    DALUserInfoState: any;
    DALTinyCourseAppState: any;
    propsPath: string;
    history: any;
}

class IndexContainer extends React.Component<PropsTypes, StateTypes> {
    constructor(props: PropsTypes) {
        super(props);
        this.state = {
            period: -1,
        };
        this.handleOKButton = this.handleOKButton.bind(this);
        this.handleSubmitButton = this.handleSubmitButton.bind(this);
    }
    handleOKButton(val: number) {
        this.setState({
            period: val
        });
    }
    handleSubmitButton() {
        this.props.DALIndexPageState.fetchPayOrder(this.props.DALTinyCourseAppState.courseId).then(() => {
            setTimeout(() => {
                this.props.history.push(`${this.props.propsPath}/listen`);
            }, 500);
        });
    }
    render() {
        return (
            <div className={className.indexPage}>
                <div style={{paddingLeft: 0, paddingRight: 0, paddingBottom: '16px'}}>
                    <ImageCard src={this.props.DALIndexPageState.cover}></ImageCard>
                </div>
                <div className={className.indexPageInner}>
                    <div>
                        <AudioPlayerWithTime src={this.props.DALIndexPageState.audio} preload={"auto"}></AudioPlayerWithTime>
                    </div>
                    <div>
                        <SummaryCard title= {"课程介绍"}>
                            {this.props.DALIndexPageState.intro}
                        </SummaryCard>
                    </div>
                    <div>
                        <TeacherIntro
                            title = { "导师介绍" }
                            headImage = { this.props.DALIndexPageState.teacher.avatar }
                            name = {this.props.DALIndexPageState.teacher.name}
                            intro = {this.props.DALIndexPageState.teacher.intro}
                        />
                    </div>
                    <div>
                        <CourseCatalogCard title = { "课程作用" }>
                            {this.props.DALIndexPageState.outline}
                        </CourseCatalogCard>
                    </div>
                    <div>
                        <ImageCardWithTitle title={"课程定位"} src={this.props.DALIndexPageState.cover} />
                    </div>
                    <div className={className.submitButton} onClick={this.handleSubmitButton}>
                        {this.props.DALIndexPageState.price} 元，立即学习
                    </div>
                </div>
            </div>
        );
    }
}
IndexContainer.defaultProps = {
    DALIndexPageState: {
        cover: 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_ca79a146.png',
        price: 1,
        intro: '学理财来长投学理财来长投学理财来长投学理财来长投#学理财来长投学理财来长投学理财来长投',
        outline: ['啊啊啊', '啊啊啊'],
        audioSrc: 'sdsadsada',
        hasFetchData: true,
        teacher: {
            avatar: 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_ca79a146.png',
            intro: 'sdasdasjdhajkdhaskjdkajdsd',
            name: 'jksadhjaksjdhaksjdhkasjdaskj'
        }
    },
    propsPath: '',
    history: []
}
export default IndexContainer;