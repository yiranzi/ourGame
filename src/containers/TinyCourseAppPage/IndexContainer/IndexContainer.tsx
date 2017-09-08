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
//引入统计
import { PostStatistic, PostCnzzStatisticData } from "@/global/global.function";
let isPlayed = false
let isAudioFinished = false
let isClickSubmit = false
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
        this.handlePlay = this.handlePlay.bind(this);
        this.handleEnded = this.handleEnded.bind(this);
        this.handleImgClick = this.handleImgClick.bind(this);

    }
    componentDidMount () {
        PostStatistic('小课', this.props.DALTinyCourseAppState.courseId, '进入报名页', '进入报名页');
        PostCnzzStatisticData('进入报名页', '进入报名页', this.props.DALTinyCourseAppState.courseId);
    }
    handlePlay () {
        if (!isPlayed) {
            PostStatistic('小课', this.props.DALTinyCourseAppState.courseId, '点击试听按钮', '点击试听按钮');
            PostCnzzStatisticData('点击试听按钮', '点击试听按钮', this.props.DALTinyCourseAppState.courseId);
            isPlayed = true
        }
    }
    handleEnded () {
        if (!isAudioFinished) {
            PostStatistic('小课', this.props.DALTinyCourseAppState.courseId, '听完试听音频', '听完试听音频');
            PostCnzzStatisticData('听完试听音频', '听完试听音频', this.props.DALTinyCourseAppState.courseId);
            isAudioFinished = true
        }
    }
    handleOKButton(val: number) {
        this.setState({
            period: val
        });
    }
    handleImgClick () {
        PostStatistic('小课', this.props.DALTinyCourseAppState.courseId, '点击定位地图', '点击定位地图');
        PostCnzzStatisticData('点击定位地图', '点击定位地图', this.props.DALTinyCourseAppState.courseId);
    }
    handleSubmitButton() {
        if (!isClickSubmit) {
            PostStatistic('小课', this.props.DALTinyCourseAppState.courseId, '点击购买按钮', '点击购买按钮');
            PostCnzzStatisticData('点击购买按钮', '点击购买按钮', this.props.DALTinyCourseAppState.courseId);
            isClickSubmit = true
        }
        this.props.DALIndexPageState.fetchPayOrder(this.props.DALTinyCourseAppState.courseId).then(() => {
            mountGlobalLoading();
            setTimeout(() => {
                this.props.history.push(`${this.props.propsPath}/listen`);
            }, 1000);
        }, () => {
            Modal.showModal({
            title: "Tips",
            bodyText: <div style={{textAlign: 'center'}}>如果支付失败，可以尝试刷新页面或者加客服妹妹的微信：<br/><img src={require("@/assets/image/payerror.png")}/></div>,
            sureText: "知道啦",
            cancelText: "就是不听",
            sureFunction: () => {},
            cancelFunction: () => {}
        });
        });
    }
    render() {
        return (
            <div className={className.indexPage}>
                <div className={className.bannerWrap} style={{paddingLeft: 0, paddingRight: 0, paddingBottom: '16px'}}>
                    <div className={className.bannerText}>
                        <p className={className.bannerTextTop}>{this.props.DALIndexPageState.title.split('#')[0]}</p>
                        <p>{this.props.DALIndexPageState.title.split('#')[1] || ''}</p>
                    </div>
                    <ImageCard src={this.props.DALIndexPageState.cover}></ImageCard>
                </div>
                <div className={className.indexPageInner}>
                    <div>
                        <AudioPlayerWithTime src={this.props.DALIndexPageState.audio} onPlay={this.handlePlay} onEnded={this.handleEnded} preload={"auto"}></AudioPlayerWithTime>
                    </div>
                    {this.props.DALIndexPageState.intro && <div>
                        <SummaryCard title= {"课程介绍"}>
                            {this.props.DALIndexPageState.intro}
                        </SummaryCard>
                    </div>}
                    {this.props.DALIndexPageState.teacher && <div>
                        <TeacherIntro
                            title = { "导师介绍" }
                            headImage = { this.props.DALIndexPageState.teacher.avatar }
                            name = {this.props.DALIndexPageState.teacher.name}
                            intro = {this.props.DALIndexPageState.teacher.intro}
                        />
                    </div>}
                    {this.props.DALIndexPageState.crowd && <div>
                        <SummaryCard title= {"适合人群"}>
                            {this.props.DALIndexPageState.crowd}
                        </SummaryCard>
                    </div>}
                    {this.props.DALIndexPageState.hierarchy &&<div>
                        <SummaryCard title= {"知识体系"}>
                            {this.props.DALIndexPageState.hierarchy}
                        </SummaryCard>
                    </div>}
                    {this.props.DALIndexPageState.effect &&<div>
                        <SummaryCard title= {"知识体系"}>
                            {this.props.DALIndexPageState.effect}
                        </SummaryCard>
                    </div>}
                    {this.props.DALIndexPageState.outline && <div>
                        <CourseCatalogCard title = { "学习大纲" }>
                            {this.props.DALIndexPageState.outline}
                        </CourseCatalogCard>
                    </div>}
                    {this.props.DALIndexPageState.position && <div onClick={this.handleImgClick}>
                        <ImageCardWithTitle title={"课程定位"} src={this.props.DALIndexPageState.position} />
                    </div>}
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
        "id":1,
        "title":"五本书#带你进入理财大门",
        "cover":"https://source.ichangtou.com/file/tinyCourse/pic/1-0.png",
        "price":1,"audio":"https://source.ichangtou.com/file/tinyCourse/audio/1-0.mp3",
        "outline":"《富爸爸穷爸爸》--财富启蒙之路#《财富自由之路》--没你想得那么难#《邻家的百万富翁》--你认识的都是假的富人？#《贫穷的本质》--寒门再难出贵子？#《牛奶可乐经济学》--最有趣的经济学","intro":"很多小伙伴都觉得，投资书籍一定是艰深晦涩的，没读几行就打瞌睡；也有人觉得，很多理财投资畅销书，是不是跟很多成功学、励志类图书一样，都是洗脑骗人的！其实，与其总是“自己觉得”、“自己猜想”，不妨从理解和认识开始。\r\r这门小课，给你介绍五本世界经典的理财书籍，观点颠覆三观，而且常读常新。读了这5本书，你会对“理财”这个领域，有一个全新的理解。\r","position":"https://source.ichangtou.com/file/tinyCourse/pic/1-position.png",
        "teacher":{
            "avatar":"木有",
            "intro":"90后逗逼股票分析师；最会量化投资的程序员；著有电子畅销书《给投资新手的极简股票课》，亚马逊发布首周，牢牢占据投资理财类畅销商品No.1",
            "name":"Lip师兄"
        }},
    propsPath: '',
    history: []
}
export default IndexContainer;