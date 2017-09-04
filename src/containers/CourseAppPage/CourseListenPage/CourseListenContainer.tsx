import React from "react";
import ChooseBar from "@/components/ListenCourse/ChooseBar";
import {Steps} from "antd-mobile";
import {AudioPlayerWithTime} from "@/components/AudioPlayer";
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
            lessonIndex: 0,//当前的题目

            // 进度条
            totalElement: 0,
            finishElement: 0,

            // 小节
            allFinish: false,
            renderType: 'null',//有无题目

            // 选择题的进度状态
            questionStatus: [],

            // 音频的进度情况
            fmProcess: false,
            chooseProcess: false,
        };
    }

    componentWillMount() {
        this.initData();
        this.processInit();
    }

    processInit() {
        //1设定有无选择题
        this.setRenderType();
        this.calcInit();
        this.calcProcess();

        this.processSet();
    }

    initData() {
        //0构造数据
        this.props.courseListenState = [
            {
                audio: "",
                dayid: 10,
                fmid: 100,
                pptUrl: ["1", "2"],
                process: false,
                subs: [
                    {
                        answerList: [
                            {
                                amswerid: 100,
                                detail: "债券",
                                istrue: 0,
                                subjectid: 100,
                            }
                        ],
                        fmid: 100,
                        introduce: '问题描述',
                        process: true,
                        subjectid: 100,
                        tips: '我是股神',
                        trueindex: [2],
                    }
                ],
                title: "title",
            },
        ];
    }

    //0判断类型
    setRenderType() {
        let allLesson = this.props.courseListenState;
        if ( allLesson[allLesson.length - 1].subs.length !== 0 ) {
            this.state.renderType = 'question';
        } else {
            this.state.renderType = 'no-question';
        }
        this.setState({renderType: this.state.renderType});
    }

    //1初始化
    calcInit() {
        let allLesson = this.props.courseListenState;
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
        let allLesson = this.props.courseListenState;
        // 初始化
        this.state.totalElement = 0;
        this.state.finishElement = 0;
        for ( let i = 0; i < allLesson.length; i++ ) {
            this.state.totalElement++;
            if (this.state.renderType === 'question') {
                if ( allLesson[i].subs[allLesson[i].subs.length - 1].process === true ) {
                    this.state.finishElement++;
                }
            } else {
                if ( allLesson[i].process === true ) {
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
        let courseListenState = this.props.courseListenState;
        for ( let i = 0 ; i < courseListenState.length; i++) {
            // todo subs0
            this.state.questionStatus[i].chooseStatus = "notChoose";
            this.state.questionStatus[i].selectIndex = -1;

            // 如果完成了音频
            if ( courseListenState[i].process ) {
                this.state.fmProcess = true;
                if ( courseListenState[i].subs[0].process ) {
                    this.state.chooseProcess = true;

                    this.state.questionStatus[i].chooseStatus = "true";
                    this.state.questionStatus[i].selectIndex = courseListenState[i].subs[0].trueindex[0];
                }
            }
        }
        //设置值
        this.setState({
            questionStatus: this.state.questionStatus[i],
            fmProcess: this.state.fmProcess,
            chooseProcess: this.state.chooseProcess,
        });
    }




    // 选择选项
    cbfChooseBarClick(index) {
        console.log(index);
        this.setState({selectIndex: index});
    }

    // 提交答案
    cbfPostAnswer() {
        if ( this.state.selectIndex === this.props.courseListenState[this.state.lessonIndex].subs[0].trueindex[0] ) {
            this.setState({chooseStatus: "true"});
        } else {
            this.setState({chooseStatus: "false"});
        }
        // todo 题目提交接口
    }

    // 下一节/完成
    cbfNextLesson() {
        this.state.lessonIndex = this.state.lessonIndex++;
        this.setState({
            lessonIndex: this.state.lessonIndex,
        });
        // 上报父节点 切换下一节.
    }

    render() {
        return (
            <div className={className.container}>
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

                {this.renderNextButton()}
            </div>
        );
    }

    // 渲染选择题列表
    renderChooses() {
        let lessonData = this.props.courseListenState[this.state.lessonIndex];
        let questions = lessonData.subs;
        if ( this.state.fmProcess ) {
            return(<ChooseBar
                cbfClick = {this.cbfChooseBarClick}
                cbfPost = {this.cbfPostAnswer}
                chooseStatus = { this.state.questionStatus[this.state.lessonIndex].chooseStatus }
                introduce = {questions.introduce}
                tips = {questions.tips}
                answerList = {questions.answerList.map((answerItem) => {
                    return answerItem.detail;
                })}
                selectIndex = { this.state.questionStatus[this.state.lessonIndex].selectIndex }
            />);
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
        if ( this.state.chooseProcess) {
            if ( this.state.lessonIndex < this.props.courseListenState.length - 1 ) {
                return(<div onClick = {this.cbfNext}>我准备好啦~开始学习下一节</div>);
            } else {
                return(<div onClick = {this.cbfNext}>都完成了!</div>);
            }
        }
    }
}

export default CourseListenContainer;