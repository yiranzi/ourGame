import React from "react";
import ChooseBar from "@/components/ListenCourse/ChooseBar";
import {Steps} from "antd-mobile";
import {AudioPlayerWithTime, AudioPlayerPPTCard} from "@/components/AudioPlayer";
import Card from "@/components/Card";
import className from "./style/CourseListenContainer.less";

interface PropsTypes {
    courseListenState: any;
    propsPath: string;
}
class CourseListenContainer extends React.Component<PropsTypes> {
    constructor(props: PropsTypes) {
        super(props);
        this.cbfChooseBarClick = this.cbfChooseBarClick.bind(this);
        this.cbfPostAnswer = this.cbfPostAnswer.bind(this);
        this.cbfNextLesson = this.cbfNextLesson.bind(this);
        this.state = {
            // 当前小节
            lessonIndex: 0, // 当前的题目

            // 进度条
            totalElement: 0,
            finishElement: 0,

            // 小节
            allFinish: false,
            renderType: "null", // 有无题目

            // 选择题的进度状态
            questionStatus: [],

            // 音频的进度情况
            lessonProcess: [],
            fmProcess: false,
            chooseProcess: false,
        };
    }

    componentWillMount() {
        console.log(this.props.courseListenState);
        // this.initData();
        this.processInit();
    }

    processInit() {
        // day
        this.setRenderType();
        this.calcInit();
        this.calcProcess();

        // 小节
        this.processSet();
        this.questionItemSet(); // 设置选择题答案
        this.afterFinishCalc();
    }

    // 0判断类型
    setRenderType() {
        let allLesson = this.props.courseListenState.listenItem;
        if ( allLesson[allLesson.length - 1].subs.length !== 0 ) {
            this.state.renderType = 'question';
        } else {
            this.state.renderType = 'no-question';
        }
        this.setState({renderType: this.state.renderType});
    }

    //1初始化
    calcInit() {
        let allLesson = this.props.courseListenState.listenItem;
        let lastLesson = allLesson[allLesson.length - 1];
        let lastProcess = {};
        if ( this.state.renderType === 'question' ) {
            lastProcess = lastLesson.subs[lastLesson.subs.length - 1].process;
        } else {
            lastProcess = lastLesson.process;
        }
        if ( lastProcess === true ) {
            this.state.allFinish = true;
            this.setState({allFinish: this.state.allFinish});
            // this.setState({clickStatus: false});
            // this.setState({showScoreStatus: false});
        } else {
            // this.setState({clickStatus: true});
            // this.setState({showScoreStatus: true});
        }
    }

    //4计算进度
    calcProcess() {
        let allLesson = this.props.courseListenState.listenItem;
        // 初始化
        this.state.totalElement = 0;
        this.state.finishElement = 0;
        for ( let i = 0; i < allLesson.length; i++ ) {
            this.state.totalElement++;
            if (this.state.renderType === 'question') {
                if ( allLesson[i].subs[allLesson[i].subs.length - 1].process === true ) {
                    this.state.lessonProcess[this.state.lessonIndex].finishProcess = true;
                    this.state.finishElement++;
                }
            } else {
                if ( allLesson[i].process === true ) {
                    this.state.lessonProcess[this.state.lessonIndex].finishProcess = true;
                    this.state.finishElement++;
                }
            }

        }
        if ( this.state.totalElement === this.state.finishElement ) {
            this.state.allFinish = true;
            this.setState({
                allFinish: this.state.allFinish,
            });
        }
        this.setState({
            totalElement: this.state.totalElement,
            finishElement: this.state.finishElement
        });
    }



    processSet() {
        let courseListenState = this.props.courseListenState.listenItem;
        let questionItem = {};
        for ( let i = 0 ; i < courseListenState.length; i++) {
            questionItem = courseListenState[i];
            //初始化
            this.state.lessonProcess[i] = {};
            if ( questionItem.process ) {
                this.state.lessonProcess[i].fmProcess = true;
                if ( courseListenState[i].subs[courseListenState[i].subs.length - 1].process ) {
                    this.state.lessonProcess[i].chooseProcess = true;
                } else {
                    this.state.lessonProcess[i].chooseProcess = false;
                }
            } else {
                this.state.lessonProcess[i].fmProcess = false;
                this.state.lessonProcess[i].chooseProcess = false;
            }
        }
        //设置值
        this.setState({
            lessonProcess: this.state.lessonProcess
        });
    }

    questionItemSet () {
        console.log('questionItemSet')
        let courseListenState = this.props.courseListenState.listenItem;
        let questionItem = {};
        for ( let i = 0 ; i < courseListenState.length; i++) {
            questionItem = courseListenState[i];
            if ( this.state.lessonProcess[this.state.lessonIndex].chooseProcess ) {
                this.state.questionStatus[i] = [];
                for ( let j = 0; j < questionItem.subs.length; j++) {
                    this.state.questionStatus[i][j] = {};
                    this.state.questionStatus[i][j].chooseStatus = "rightChoose";
                    this.state.questionStatus[i][j].selectIndex = questionItem.subs[j].trueindex[0];
                }
            } else {
                this.state.questionStatus[i] = [];
                for ( let j = 0; j < questionItem.subs.length; j++) {
                    this.state.questionStatus[i][j] = {};
                    this.state.questionStatus[i][j].chooseStatus = "notChoose";
                    this.state.questionStatus[i][j].selectIndex = -1;
                }
            }
        }
        //设置值
        this.setState({
            questionStatus: this.state.questionStatus,
        });
    }

    //计算lesson整体的进度
    afterFinishCalc() {
        console.log('afterFinishCalc');
        if ( this.state.renderType = 'question' ) {
            //如果选择题都完成了 并且 第一次完成
            if ( this.state.lessonProcess[this.state.lessonIndex].chooseProcess && !this.state.lessonProcess[this.state.lessonIndex].finishProcess) {
                this.state.lessonProcess[this.state.lessonIndex].finishProcess = true;
                this.state.finishElement++;
            } else {
                this.state.lessonProcess[this.state.lessonIndex].finishProcess = false;
            }
        } else {
            //如果音频...
            if ( this.state.lessonProcess[this.state.lessonIndex].fmProcess && !this.state.lessonProcess[this.state.lessonIndex].finishProcess) {
                this.state.lessonProcess[this.state.lessonIndex].finishProcess = true;
                this.state.finishElement++;
            } else {
                this.state.lessonProcess[this.state.lessonIndex].finishProcess = false;
            }
        }
        this.setState({
            finishElement: this.state.finishElement,
            lessonProcess: this.state.lessonProcess,
        })
    }


    // 选择选项
    cbfChooseBarClick(index, itemIndex) {
        this.state.questionStatus[this.state.lessonIndex][itemIndex].selectIndex = index;
        this.setState({questionStatus: this.state.questionStatus});
        //设置值

    }

    // 提交答案
    cbfPostAnswer(Itemindex) {
        console.log(Itemindex);
        console.log("post");
        if ( this.state.questionStatus[this.state.lessonIndex][Itemindex].selectIndex === this.props.courseListenState.listenItem[this.state.lessonIndex].subs[Itemindex].trueindex[0] ) {
            this.state.questionStatus[this.state.lessonIndex][Itemindex].chooseStatus = "rightChoose";
        } else {
            this.state.questionStatus[this.state.lessonIndex][Itemindex].chooseStatus = "wrongChoose";
        }
        //重新计算选择题进度 如果当前选中的时候一题
        if ( this.state.questionStatus[this.state.lessonIndex][this.state.questionStatus[this.state.lessonIndex].length - 1].chooseStatus !== "notChoose") {
            this.state.lessonProcess[this.state.lessonIndex].chooseProcess = true;
            this.setState({
                lessonProcess: this.state.lessonProcess,
            });
        }

        this.setState({questionStatus: this.state.questionStatus});
        this.afterFinishCalc();
        // todo 题目提交接口
    }

    // 下一节/完成
    cbfNextLesson() {
        console.log('cbfNextLesson')
        this.state.lessonIndex = this.state.lessonIndex + 1;
        this.setState({
            lessonIndex: this.state.lessonIndex,
        });

        // 上报父节点 切换下一节.
    }

    renderProcess() {
        let arr = [];
        for ( let i = 0; i < this.state.totalElement; i++ ) {
            arr.push(<Steps.Step />);
        }
        return arr;
    }

    rederPPT() {
        let arr = [];
        for ( let i = 0; i < this.props.courseListenState.listenItem[this.state.lessonIndex].pptUrl.length; i++ ) {
            arr.push(<img src = {this.props.courseListenState.listenItem[this.state.lessonIndex].pptUrl[i]}/>);
        }
        return arr;
    }

    render() {
        return (
            <div className={className.container}>
                <Card>
                    <div>
                        <Steps direction="horizontal" current={this.state.finishElement}>
                            {this.renderProcess()}
                        </Steps>
                    </div>
                </Card>
                <AudioPlayerPPTCard>
                    {this.rederPPT()}
                </AudioPlayerPPTCard>
                <div>
                    <AudioPlayerWithTime src = {this.props.courseListenState.listenItem[this.state.lessonIndex].audio} onEnded = {this.finishAudio}/>
                </div>
                {this.renderChooses()}
                {this.renderNextButton()}
            </div>
        );
    }

    finishAudio() {
        // 完成音频
        this.state.lessonProcess[this.state.lessonIndex].fmProcess = true;
        this.setState({
            lessonProcess: this.state.lessonProcess,
        });
        this.afterFinishCalc();
        // post完成
    }

    // 渲染选择题列表
    renderChooses() {
        let arr = [];
        let lessonData = this.props.courseListenState.listenItem[this.state.lessonIndex];
        let questions = lessonData.subs;
        let question = {};
        console.log('123')
        if ( this.state.lessonProcess[this.state.lessonIndex].fmProcess ) {
            for ( let i = 0; i < questions.length; i++ ) {
                console.log(this.state.questionStatus[this.state.lessonIndex])
                if ( i === 0 || this.state.questionStatus[this.state.lessonIndex][i - 1].chooseStatus !== "notChoose") {
                    question = questions[i];
                    arr.push(<ChooseBar
                        itemIndex = {i}
                        cbfClick = {this.cbfChooseBarClick}
                        cbfPost = {this.cbfPostAnswer}
                        chooseStatus = { this.state.questionStatus[this.state.lessonIndex][i].chooseStatus }
                        introduce = {question.introduce}
                        tips = {question.tips}
                        answerList = {question.answerList.map((answerItem) => {
                            return answerItem.detail;
                        })}
                        selectIndex = { this.state.questionStatus[this.state.lessonIndex][i].selectIndex }
                    />);
                }
            }
            return(arr);
        } else {
            return null;
        }
    }

    renderNextButton() {
        let style = {
            backgroundColor: '#108ee9',
            color: 'white',
        };
        return(<Card styleDefault = {style}>{this.buttonTxt()}</Card>);
    }

    buttonTxt() {
        if ( this.state.lessonProcess[this.state.lessonIndex].finishProcess ) {
            if ( this.state.lessonIndex < this.props.courseListenState.listenItem.length - 1 ) {
                return(<div onClick = {this.cbfNextLesson}>我准备好啦~开始学习下一节</div>);
            } else {
                return(<div >都完成了!</div>);
            }
        }
    }
}

export default CourseListenContainer;