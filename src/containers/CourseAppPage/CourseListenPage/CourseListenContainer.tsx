import React from "react";
import ChooseBar from "@/components/ListenCourse/ChooseBar";
import LessonBar from "@/components/CourseSelect/LessonBar";
import {Steps} from "antd-mobile";
import {AudioPlayerWithTime} from "@/components/AudioPlayer";
import Card from "@/components/Card";
import className from "./style/CourseListenContainer.less";

interface PropsTypes {
    courseArray: Array<any>;
}
class CourseListenContainer extends React.Component<PropsTypes> {
    constructor(props: PropsTypes) {
        super(props);
        this.cbfChooseBarClick = this.cbfChooseBarClick.bind(this);
        this.cbfPostAnswer = this.cbfPostAnswer.bind(this);
        this.cbfNextLesson = this.cbfNextLesson.bind(this);
        this.cbfOnEnter = this.cbfOnEnter.bind(this);
        this.cbfOnClickReward = this.cbfOnClickReward.bind(this);
        this.state = {
            selectIndex: -1,
            chooseStatus: "notChoose",
            rightIndex: 1,
        };
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

    // 选择选项
    cbfChooseBarClick(index) {
        console.log(index);
        this.setState({selectIndex: index});
    }

    // 提交答案
    cbfPostAnswer() {
        if ( this.state.selectIndex === this.state.rightIndex ) {
            this.setState({chooseStatus: "true"});
        } else {
            this.setState({chooseStatus: "false"});
        }
    }

    // 下一节/完成
    cbfNextLesson() {
        // 上报父节点 切换下一节.
    }
    render() {
        return (
            <div className={className.wrapper}>
                <Card>
                    <Steps direction="horizontal" current={1}>
                        <Steps.Step />
                        <Steps.Step />
                        <Steps.Step />
                    </Steps>
                </Card>
                <div>
                    <AudioPlayerWithTime />
                </div>
                <ChooseBar
                    cbfClick = {this.cbfChooseBarClick}
                    cbfPost = {this.cbfPostAnswer}
                    cbfNext = {this.cbfNextLesson}
                    chooseStatus = { this.state.chooseStatus }
                    introduce = {"题目内容题目内容题目内容题目内容题目内容题目内容题目内容"}
                    tips = {"题目提示题目提示题目提示题目提示题目提示题目提示题目提示题目提示题目提示题目提示"}
                    answerList = {[0, 1, 2, 3]}
                    selectIndex = { this.state.selectIndex }
                    lastQuestion = {false}
                />
            </div>
        );
    }
}

export default CourseListenContainer;