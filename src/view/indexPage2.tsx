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
        this.cbfChooseBarClick = this.cbfChooseBarClick.bind(this);
        this.cbfPostAnswer = this.cbfPostAnswer.bind(this);
        this.cbfNextLesson = this.cbfNextLesson.bind(this);
        this.cbfOnEnter = this.cbfOnEnter.bind(this);
        this.cbfOnClickReward = this.cbfOnClickReward.bind(this);
        this.handleIndexChangeCallback = this.handleIndexChangeCallback.bind(this);
        this.state = {
            selectIndex: -1,
            chooseStatus: "notChoose",
            rightIndex: 1,
        };
    }
    handleIndexChangeCallback(index: number) {
        if (this.state.Carouselindex + index > -1 && this.state.Carouselindex + index < 7) {
            this.setState((prevState, props) => ({
                Carouselindex: prevState.Carouselindex + index
            }));
        }
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

    //选择选项
    cbfChooseBarClick(index) {
        console.log(index);
        this.setState({selectIndex: index});
    }

    //提交答案
    cbfPostAnswer() {
        if ( this.state.selectIndex === this.state.rightIndex ) {
            this.setState({chooseStatus: 'true'});
        } else {
            this.setState({chooseStatus: 'false'});
        }
    }

    //下一节/完成
    cbfNextLesson() {
        //上报父节点 切换下一节.
        console.log('cbfNext');
    }

    render() {
        let gapStyle = {
            padding: '1rem';
        }
        return (
            <div className={className.div}>
                <TeacherIntro
                    title = {"导师介绍"}
                    headImage = {"https://github.com/bebraw.png?v=3&s=150"}
                    introTxt = {`123123`}
                />
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
                <div style = {gapStyle}>
                <LessonBar
                    dayId = {2}
                    dayTitle = {"导师介绍"}
                    subTitle = {"导师介绍"}
                    ifEnter = {false}
                    cbfOnEnter = {this.cbfOnEnter}
                    cbfOnClickReward = {this.cbfOnClickReward}
                    rewardIcon = {"https://github.com/bebraw.png?v=3&s=150"}
                />
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

                {/*<Button className="btn" type="primary">primary 按钮</Button>*/}
                {/*<Button className="btn" disabled onClick={e => console.log(e)}>disabled 按钮</Button>*/}
                {/*<Button className="btn" loading>loading 按钮</Button>*/}
                {/*<Button className="btn" icon="check-circle-o">带图标按钮</Button>*/}
                {/*<Button className="btn">本地图标</Button>*/}
                {/*/!*<Antdbutton type="primary" style={{ marginRight: "0.08rem" }}>inline</Antdbutton>*!/*/}
                {/*<Steps size="small" current={1}>*/}
                    {/*<Steps.Step />*/}
                    {/*<Steps.Step />*/}
                    {/*<Steps.Step />*/}
                    {/*<Steps.Step />*/}
                    {/*<Steps.Step />*/}
                    {/*<Steps.Step />*/}
                {/*</Steps>*/}
            </div>
        );
    }
}