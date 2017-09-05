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
    DALState: any;
    DALUserInfoState: any;
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
        if (this.props.DALState.isUserCanBuy) {
            Modal.showModal({
                title: "注意啦!!",
                bodyText: <div>名额已经满了，没法报名了哟</div>,
                sureText: "没法选啦",
                cancelText: "等下一期吧~",
                sureFunction: () => {},
                cancelFunction: () => {}
            });
        } else {
            if (this.state.period === -1) {
                Modal.showModal({
                    title: "注意啦!!",
                    bodyText: <div>快选择报名期数</div>,
                    sureText: "马上去选",
                    cancelText: "就是不选",
                    sureFunction: () => {},
                    cancelFunction: () => {}
                });
            } else {
                // todo 提交报名唤起支付
                // window.WXSDK.wechatPay();
                this.props.DALState.fetchPayOrder(1, this.state.period).then(() => {
                    mountGlobalLoading();
                    setTimeout(this.props.history.push(`${this.props.propsPath}/wait`), 1000);
                });
            }
        }
    }
    render() {
        return (
            <div className={className.div}>
                <div style={{paddingLeft: 0, paddingRight: 0}}>
                    <ImageCard src={this.props.DALState.bannerSrc}></ImageCard>
                </div>
                <div>
                    <AudioPlayerWithTime src={this.props.DALState.audioSrc} preload={"auto"}></AudioPlayerWithTime>
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
                    <TeacherIntro
                        title = {"导师介绍"}
                        headImage = {this.props.DALState.teacherImg}
                        introTxt = {this.props.DALState.teacherIntro}
                    />
                </div>
                <div>
                    <TimePickerCard data={this.props.DALState.timePicker} handleOKButton={this.handleOKButton}></TimePickerCard>
                </div>
                <br />
                <div className={className.submitButton} onClick={this.handleSubmitButton}>
                    {this.props.DALState.price} 元，立即学习
                </div>
            </div>
        );
    }
}
export default IndexContainer;