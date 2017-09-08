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
            mountGlobalLoading();
            setTimeout(() => {
                this.props.history.push(`${this.props.propsPath}/listen`);
            }, 1000);
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
                        <ImageCardWithTitle title={"课程定位"} src={this.props.DALIndexPageState.position} />
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