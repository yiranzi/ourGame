import * as React from "react";

import ImageCard from "@/components/ImageCard";
import Card from "@/components/Card/Card";
import LessonBar from "@/components/SelectPage/LessonBar/LessonBar";

import className from "./style/SelectPage.less";

interface PropsTypes {
    dayCourseList: any;
    propsPath: string;
}

interface StateTypes {
    Carouselindex: number;
}
export default class IndexPage extends React.Component<PropsTypes, StateTypes> {
    constructor() {
        super();
        this.cbfOnEnter = this.cbfOnEnter.bind(this);
        this.cbfOnClickReward = this.cbfOnClickReward.bind(this);
        this.state = {
            courseList: []
        };
    }

    render() {
        console.log('render');
        return(
            <div className={(className as any).container}>
                {this.renderTopBanner()}
                {this.renderQQGroup()}
                {this.renderCourseList()}
            </div>
        );
    }

    renderQQGroup() {
        return(<div onClick = {this.onClickGroup} className={(className as any).gap}>
                <Card>
                    <div className={(className as any).qqGroup}>

                        <div className={(className as any).left}>
                            <img src={require("@/assets/image/qqGroup_icon.png")}/>
                        </div>
                        <div className={(className as any).mid}>
                            <h1>~加入社群学习啦~</h1>
                        </div>
                        <div className={(className as any).right}>
                            <img src={require("@/assets/image/arrow.png")}/>
                        </div>

                    </div>
                </Card>
            </div>
        );
    }

    renderCourseList() {
        console.log('renderCourseList');
        console.log(this.props);
        let gapStyle = {
            padding: "1rem",
        };
        let arr = [];
        let homeWorkCount = 0;
        for (let i = 0; i < this.props.dayCourseList.dayItem.length; i++) {
            // 计算出来状态,并赋值.
            let courseStatus = this.calcCourseStatus(i);
            // 如果上一个能看.这个还可以渲染.
            if ( i === 0 || this.props.dayCourseList.dayItem[i - 1].status !== -1 ) {
                console.log(i);
                arr.push(
                    <div className={(className as any).gap}>
                        <LessonBar {...courseStatus}/>
                    </div>
                );
            }
        }
        return arr;
    }

    onClickGroup() {
        alert( "加入QQ社群");
    }

    cbfOnEnter(type, dayId) {
        if ( type ) {
            this.props.location.push(`${this.props.propsPath}/listen/${dayId}`);
            alert( "进入" + dayId );
        } else {
            alert( "无法进入" + dayId );
        }
    }

    cbfOnClickReward(dayId) {
        alert( "成就卡" + dayId );
    }

    calcCourseStatus(index) {
        //制作一个用来解析day状态的json.根据具体的赋值 并保存.为了渲染使用.
        let courseDay = this.props.dayCourseList.dayItem[index];
        let courseStatus = {
            dayId: courseDay.id,
            dayTitle: `第${index}天`,
            subTitle: courseDay.title,
            isEnter: false,
            cbfOnEnter: null,
            cbfOnClickReward: null,
            rewardIcon: null,
        };
        switch ( courseDay.status ) {
            case -1:
                courseStatus.isEnter = false;
                courseStatus.cbfOnEnter = this.cbfOnEnter;
                break;
            case 0:
                courseStatus.isEnter = true;
                courseStatus.cbfOnEnter = this.cbfOnEnter;
                break;
            case 1:
                courseStatus.isEnter = true;
                courseStatus.cbfOnEnter = this.cbfOnEnter;
                break;
            case 2:
                courseStatus.isEnter = true;
                courseStatus.cbfOnEnter = this.cbfOnEnter;
                courseStatus.cbfOnClickReward = this.cbfOnClickReward;
                break;
            default:
                break;
        }
        return courseStatus;
    }



    renderTopBanner() {
        let style = {
            padding: '0',
            // height: '100px',
        };
        return(<div style = {style} className={(className as any).gap}>
            <ImageCard src={this.props.DALState ? this.props.DALState.bannerSrc : "https://github.com/bebraw.png?v=3&s=150"}></ImageCard>
        </div>);
    }


}