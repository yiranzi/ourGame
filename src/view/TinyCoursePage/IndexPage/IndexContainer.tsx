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
    DALIndexPage: any;
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
        if (this.props.DALIndexPage.isUserCanBuy) {
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
                this.props.DALIndexPage.fetchPayOrder(1, this.state.period).then(() => {
                    setTimeout(() => {
                        this.props.history.push(`${this.props.propsPath}/courselist`);
                    }, 500);
                });
            }
        }
    }
    render() {
        return (
            <div className={className.indexPage}>
                <div style={{paddingLeft: 0, paddingRight: 0, paddingBottom: '16px'}}>
                    <ImageCard src={this.props.DALIndexPage.bannerSrc}></ImageCard>
                </div>
                <div className={className.indexPageInner}>
                    <div>
                        <AudioPlayerWithTime src={this.props.DALIndexPage.audioSrc} preload={"auto"}></AudioPlayerWithTime>
                    </div>
                    <div>
                        <SummaryCard>
                            {this.props.DALIndexPage.summary}
                        </SummaryCard>
                    </div>
                    <div>
                        <TeacherIntro
                            title = {"导师介绍"}
                            headImage = {this.props.DALIndexPage.teacherImg}
                            introTxt = {this.props.DALIndexPage.teacherIntro}
                        />
                    </div>
                    <div>
                        <CourseCatalogCard title = {"课程作用"}>
                            {this.props.DALIndexPage.catalog}
                        </CourseCatalogCard>
                    </div>
                    
                    <div>
                        <TimePickerCard data={this.props.DALIndexPage.timePicker} handleOKButton={this.handleOKButton}></TimePickerCard>
                    </div>
                    <br />
                    <div className={className.submitButton} onClick={this.handleSubmitButton}>
                        {this.props.DALIndexPage.price} 元，立即学习
                    </div>
                </div>
            </div>
        );
    }
}
IndexContainer.defaultProps = {
    DALIndexPage: {
        bannerSrc: 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_ca79a146.png',
        price: 1,
        summary: 'sadsadasdasdasd',
        catalog: ['aaa', 'bbb'],
        audioSrc: 'sdsadsada',
        timePicker: [{label: 2017, value: 2017}],
        hasFetchData: true,
        teacherImg: 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_ca79a146.png',
        teacherIntro: 'sadasdasdasd',
        isUserCanBuy: true,
        misc: true
    },
    propsPath: '',
    history: []
}
export default IndexContainer;