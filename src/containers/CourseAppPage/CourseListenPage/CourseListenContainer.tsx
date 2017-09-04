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
        this.state = {
            // 进度条
            totalElement: 0,
            finishElement: 0,

            //逻辑
            allFinish: false,

            renderType: 'null',
            lessonIndex: 0,//当前的题目

            lessonArray: props.courseListenState.lessonarray,map(),

            lessonArray: [
                {
                    fm: props.courseListenState.fmAudio;
                ppts:
                questions: [
                    //根据process构造初始化.//根据操作上报数据//根据请求返回值填充静态内容.
                    {
                        selectIndex: -1,//当前选择
                        chooseStatus: "notChoose",//选择状态
                        rightIndex: 1,//正确选项(这个也是直接就有的内容)
                    }

                ]
        fmprocess:
            questionprocess:
                },{},{}


            ],//小节列表

        };
    }

    processInit() {
        let courseListenState = this.props.courseListenState;
        let fmProcess = false;
        for ( let i = 0 ; i < courseListenState.length; i++) {
            if ( courseListenState[i].process ) {
                fmProcess = true;

            }
        };
    }

    componentWillMount() {
        this.init;
    }

    init() {
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
        //1设定有无选择题
        this.setRenderType();
        this.calcInit();
        //自动滚到最下面
        // if(!this.state.allFinish){
        //     console.log('123')
        //     window.scrollTo(0,500);
        // }
        this.calcProcess();
        if (progressData) {
            this.setState({
                lessons: this.state.lessons,
            });
        }
        // this.getComment();

        //1计算课程完成状态

        //2根据状态进行初始化

        //3更新当前页面的选项
        this.initChoose();
    }

    //0判断类型
    setRenderType() {
        let allLesson = this.state.lessons;
        if ( allLesson[allLesson.length - 1].subs.length !== 0 ) {
            this.state.renderType = 'question';
        } else {
            this.state.renderType = 'no-question';
        }
        this.setState({renderType: this.state.renderType});
    }

    //1初始化
    calcInit() {
        let allLesson = this.state.lessons;
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
            this.setState({clickStatus: false});
            this.setState({showScoreStatus: false});
        } else {
            this.setState({clickStatus: true});
            this.setState({showScoreStatus: true});
        }
    }

    //4计算进度
    calcProcess() {
        let allLesson = this.state.lessons;
        //初始化
        this.state.totalElement = 0;
        this.state.finishElement = 0;
        for(let i = 0; i<allLesson.length; i++){
            this.state.totalElement++;
            if (this.state.renderType === 'question') {
                if(allLesson[i].subs[allLesson[i].subs.length - 1].process === true) {
                    this.state.finishElement++;
                }
            } else {
                if(allLesson[i].process === true) {
                    this.state.finishElement++;
                }
            }

        }
        if(this.state.totalElement === this.state.finishElement) {
            this.state.allFinish = true;
            this.setState({
                allFinish: this.state.allFinish,
            });
        }
        this.setState({
            totalElement:this.state.totalElement,
            finishElement: this.state.finishElement
        });
    }


    initChoose() {
        this.setState({
            selectIndex: -1,//当前选择
            chooseStatus: "notChoose",//选择状态
            rightIndex: 1,//正确选项
        });
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
                <ChooseBar
                    cbfClick = {this.cbfChooseBarClick}
                    cbfPost = {this.cbfPostAnswer}
                    chooseStatus = { this.state.chooseStatus }
                    introduce = {"题目内容题目内容题目内容题目内容题目内容题目内容题目内容"}
                    tips = {"题目提示题目提示题目提示题目提示题目提示题目提示题目提示题目提示题目提示题目提示"}
                    answerList = {[0, 1, 2, 3]}
                    selectIndex = { this.state.selectIndex }
                />
                {this.renderNextButton()}
            </div>
        );
    }

    renderNextButton() {
        let style = {
            backgroundColor: '#108ee9',
            color: 'white',
        };
        return(<Card styleDefault = {style}>{this.buttonTxt()}</Card>);
    }

    buttonTxt() {
        if ( this.state.chooseStatus !== 'notChoose' ) {
            if ( this.state.lastQuestion ) {
                return(<div onClick = {this.cbfNext}>我准备好啦~开始学习下一节</div>);
            } else {
                return(<div onClick = {this.cbfNext}>都完成了!</div>);
            }
        }
    }
}

export default CourseListenContainer;