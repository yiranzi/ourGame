import * as React from "react";
// import { Button as Antdbutton, Spin, Slider, Carousel, Steps } from "antd";
import { Button, List } from "antd-mobile";

import TeacherIntro from "@/components/Paypage/TeacherIntro";
import LessonBar from "@/components/CourseSelect/LessonBar";
import ChooseBar from "@/components/ListenCourse/ChooseBar";

import className from "./style.less";

import AudioPlayer from "@/components/AudioPlayer/AudioPlayer";

interface StateTypes {
    Carouselindex: number;
}
export default class IndexPage extends React.Component<{}, StateTypes> {
    constructor() {
        super();
        this.cbfOnEnter = this.cbfOnEnter.bind(this);
        this.cbfOnClickReward = this.cbfOnClickReward.bind(this);
        this.state = {
            courseList: []
        };
    }

    componentWillMount() {
        //根据courseId 发送请求 获得课程列表
        this.getCourseList();

    }

    getCourseList() {
        // Material.getCourseList(this.state.courseId).then( (data) => {
            let data = [
                {
                    id: 11,
                    status: 2,
                    title: "躺着挣钱1",
                },
                {
                    id: 12,
                    status: 1,
                    title: "躺着挣钱2",
                },
                {
                    id: 13,
                    status: -1,
                    title: "躺着挣钱3",
                },
            ];
            this.state.courseList = data;
            this.setState({courseList: this.state.courseList});
            // this.getHomeWorkStatus()
        // });
    }

    cbfOnEnter(type, dayId) {
        if ( type ) {
            alert( "进入" + dayId );
        } else {
            alert( "无法进入" + dayId );
        }
    }

    cbfOnClickReward(dayId) {
        alert( "成就卡" + dayId );
    }

    render() {
        return(
            <div>
                {this.renderTopBanner()}
                {this.renderQQGroup()}
                {this.renderCourseList()}
            </div>
        );
    }

    renderCourseList() {
        let gapStyle = {
            padding: "1rem",
        };
        let courseList = this.state.courseList;
        let arr = [];
        let homeWorkCount = 0;
        if ( !courseList || courseList.length === 0 ) {
            return null;
        } else {
            for (let i = 0; i < courseList.length; i++) {
                //计算出来状态,并赋值.
                let result = this.calcCourseStatus(courseList[i], i);
                //如果上一个能看.这个还可以渲染.
                if ( i === 0 || this.state.courseList[i-1].status !== -1){
                    arr.push(
                        <div style = {gapStyle}>
                            <LessonBar
                                dayId = {1}
                                dayTitle = {"导师介绍"}
                                subTitle = {"导师介绍"}
                                ifEnter = {true}
                                cbfOnEnter = {this.cbfOnEnter}
                                cbfOnClickReward = {this.cbfOnClickReward}
                                rewardIcon = {"https://github.com/bebraw.png?v=3&s=150"}
                            />
                        </div>
                    );

                } else break;
            }
            return arr;
        }
    }

    calcCourseStatus(index) {
        //制作一个用来解析day状态的json.根据具体的赋值 并保存.为了渲染使用.
        let courseDay = this.state.courseList[index];
        let courseStatus = {
            dayId: courseDay.id,
            dayTitle: '第n天',
            subTitle: courseDay.title,
            ifEnter: 'not-get',
            cbfOnEnter: ``,
            cbfOnClickReward: ``,
            rewardIcon: '',
        };
        switch ( courseDay.status ) {
            //如果是免费用户
            case -1:
                courseStatus.ifEnter = false;
                break;
            //如果是付费用户
            case true:
                //先判定是否可以收听.
                switch (course.status) {
                    case -1:
                        courseStatus.enter = 'no-time';
                        break;
                    case 0:
                        courseStatus.see = true;//可见
                        courseStatus.enter = 'pay';
                        break;
                    case 1:
                        courseStatus.see = true;//可见
                        courseStatus.enter = 'pay';
                        break;
                    case 2:
                        courseStatus.see = true;//可见
                        courseStatus.enter = 'pay';
                        courseStatus.allFinish = true;
                        courseStatus.reward = 'get';
                        break;
                    default:
                        console.log('error' + course.status);
                }
                break;
        }
        // courseStatus.see = true;
        this.state.courseList[index].courseStatus = courseStatus;//赋值.
        return courseStatus.see;
    },

    renderQQGroup() {

    }

    renderTopBanner() {

    }


}