import React from "react";
import ChooseBar from "@/components/ListenCourse/ChooseBar";
// import SummaryCard from "@/components/ListenCourse/ChooseBar";
import {Steps} from "antd-mobile";
import {AudioPlayerWithTime, AudioPlayerPPTCard} from "@/components/AudioPlayer";
import Card from "@/components/Card";
import className from "./style/CourseListenContainer.less";

interface PropsTypes {
    DALTinyCourseAppState: Object,
    // DALTinyCourseAppState: Object,
    // DALTinyListenPageState
    listenArray: Array;
    listenIndex: number;
    currentLesson: {
        id: number, // 章节ID
        title: string,
        pic: string,
        audio: string,
        summary: string,
        knowledgePoints: Array,
        assignment: [{
            assignmentId: number, // 作业ID
            question: string
            selected: number, // 用户选择的答案
            selection: [
                {
                    content: string,
                    answerId: number, // 答案ID
                }]
            answer: number,
            explain: string,
        }]
    };
    propsPath: string;
}

interface StateTypes {
    // 当前小节
    lessonIndex: number; // 当前的题目

    // 进度条
    totalElement: number;
    finishElement: number;

    // 小节
    renderType: String; // 有无题目

    // 选择题的进度状态
    questionStatus: Array; // chooseStatus selectIndex

    // 音频的进度情况
    lessonProcess: Array;
}



class CourseListenContainer extends React.Component<PropsTypes, StateTypes> {




    constructor(props: PropsTypes) {

        super(props);
        this.cbfChooseBarClick = this.cbfChooseBarClick.bind(this);
        this.cbfPostAnswer = this.cbfPostAnswer.bind(this);
        this.cbfNextLesson = this.cbfNextLesson.bind(this);
        this.finishAudio = this.finishAudio.bind(this);
        this.state = {
            // 当前小节
            lessonIndex: 0, // 当前的题目

            // 进度条
            totalElement: 0,
            finishElement: 0,

            // 小节
            renderType: "null", // 有无题目

            // 选择题的进度状态
            questionStatus: [],

            // 音频的进度情况
            lessonProcess: [],
        };
    }

    componentWillMount() {
        console.log(this.props.DALTinyListenPageState);
        this.state.lessonIndex = this.props.DALTinyListenPageState.listenIndex;
        // this.initData();
        this.processInit();
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        this.state.lessonIndex = nextProps.DALTinyListenPageState.listenIndex;
        this.processInit();
    }

    processInit() {
        // day
        this.setRenderType();
        // this.calcProcess();

        // 小节
        this.processSet();
        this.questionItemSet(); // 设置选择题答案
        this.isFinishProcess(); // 判断这节是否完成
        // this.afterFinishCalc();
    }

    // 0判断类型
    setRenderType() {
        let allLesson = this.props.DALTinyListenPageState.currentLesson;
        if ( allLesson.assignment ) {
            this.state.renderType = "question";
        } else {
            this.state.renderType = "no-question";
        }
        this.setState({renderType: this.state.renderType});
    }

    isFinishProcess() {
        // 有选择题
        if ( this.state.renderType === "question" ) {
            if ( this.state.lessonProcess.chooseProcess) {
                this.state.lessonProcess.finishProcess = true;
            } else {
                this.state.lessonProcess.finishProcess = false;
            }
        } else {
            if ( this.state.lessonProcess.audioProcess) {
                this.state.lessonProcess.finishProcess = true;
            } else {
                this.state.lessonProcess.finishProcess = false;
            }
        }
        this.setState({
            lessonProcess: this.state.lessonProcess
        });
    }

    // 4计算进度
    // calcProcess() {
    //     return;
    //     let allLesson = this.props.DALTinyListenPageState.currentLesson;
    //     // 初始化
    //     this.state.totalElement = 0;
    //     this.state.finishElement = 0;
    //     for ( let i = 0; i < allLesson.length; i++ ) {
    //         //初始化
    //         this.state.lessonProcess[i] = {};
    //         this.state.totalElement++;
    //         if (this.state.renderType === 'question') {
    //             if ( allLesson[i].subs[allLesson[i].subs.length - 1].process === true ) {
    //                 this.state.lessonProcess[i].finishProcess = true;
    //                 this.state.finishElement++;
    //             } else {
    //                 this.state.lessonProcess[i].finishProcess = false;
    //             }
    //         } else {
    //             if ( allLesson[i].process === true ) {
    //                 this.state.lessonProcess[i].finishProcess = true;
    //                 this.state.finishElement++;
    //             } else {
    //                 this.state.lessonProcess[i].finishProcess = false;
    //             }
    //         }
    //
    //     }
    //     if ( this.state.totalElement === this.state.finishElement ) {
    //     }
    //     this.setState({
    //         totalElement: this.state.totalElement,
    //         finishElement: this.state.finishElement
    //     });
    // }
    // 设置 音频/选择题的完成进度
    processSet() {
        let DALTinyListenPageState = this.props.DALTinyListenPageState.currentLesson;
        let questionItem = DALTinyListenPageState;
        // 如果完成音频
        // todo 没有音频进度
        if ( this.state.renderType === "question" ) {
            // 最后一题完成
            if ( questionItem.assignment[questionItem.assignment.length - 1].selected !== -1 ) {
                this.state.lessonProcess.chooseProcess = true;
                this.state.lessonProcess.audioProcess = true;
            } else {
                this.state.lessonProcess.chooseProcess = false;
                this.state.lessonProcess.audioProcess = false;
            }
        } else {
            this.state.lessonProcess.chooseProcess = false;
            this.state.lessonProcess.audioProcess = false;
        }

        // if ( questionItem.process ) {
        //     this.state.lessonProcess.audioProcess = true;
        //     if ( this.state.renderType === "question" ) {
        //         // 最后一题完成
        //         if ( questionItem.subs[DALTinyListenPageState.subs.length - 1].process ) {
        //             this.state.lessonProcess.chooseProcess = true;
        //         } else {
        //             this.state.lessonProcess.chooseProcess = false;
        //         }
        //     } else {
        //         this.state.lessonProcess.chooseProcess = false;
        //     }
        //
        // } else {
        //     this.state.lessonProcess.audioProcess = false;
        //     this.state.lessonProcess.chooseProcess = false;
        // }
        // 设置值
        this.setState({
            lessonProcess: this.state.lessonProcess
        });
    }

    questionItemSet () {
        let DALTinyListenPageState = this.props.DALTinyListenPageState.currentLesson;
        let questionItem = DALTinyListenPageState;
        if ( this.state.renderType === "question" ) {
            for ( let j = 0; j < questionItem.assignment.length; j++) {
                this.state.questionStatus[j] = {};
                this.state.questionStatus[j].chooseStatus = "rightChoose";
                this.state.questionStatus[j].selectIndex = questionItem.assignment[j].selected;
            }
            this.state.questionStatus = [];
            for ( let j = 0; j < questionItem.assignment.length; j++) {
                this.state.questionStatus[j] = {};
                let chooseBool =  questionItem.assignment[j].selected === -1 ? false : true;
                if ( !chooseBool ) {
                    this.state.questionStatus[j].chooseStatus = "notChoose";
                } else {
                    if ( questionItem.assignment[j].selected === questionItem.assignment[j].answer ) {
                        this.state.questionStatus[j].chooseStatus = "rightChoose";
                    } else {
                        this.state.questionStatus[j].chooseStatus = "notChoose";
                    }
                }
                this.state.questionStatus[j].selectIndex = questionItem.assignment[j].selected;
            }
            // 设置值
            this.setState({
                questionStatus: this.state.questionStatus,
            });
        }
    }

    // 计算lesson整体的进度
    afterFinishCalc() {
        if ( this.state.renderType = "question" ) {
            // 如果选择题都完成了 并且 第一次完成
            if ( this.state.lessonProcess.chooseProcess && !this.state.lessonProcess.finishProcess) {
                this.state.lessonProcess.finishProcess = true;
                this.state.finishElement++;
            } else {
                this.state.lessonProcess.finishProcess = false;
            }
        } else {
            // 如果音频...
            if ( this.state.lessonProcess.audioProcess && !this.state.lessonProcess.finishProcess) {
                this.state.lessonProcess.finishProcess = true;
                this.state.finishElement++;
            } else {
                this.state.lessonProcess.finishProcess = false;
            }
        }
        this.setState({
            finishElement: this.state.finishElement,
            lessonProcess: this.state.lessonProcess,
        });
    }


    // 选择选项
    cbfChooseBarClick(index, itemIndex) {
        this.state.questionStatus[itemIndex].selectIndex = index;
        this.setState({questionStatus: this.state.questionStatus});
        // 设置值

    }

    // 提交答案
    // Itemindex是第几个选择题
    cbfPostAnswer(Itemindex) {
        let chooseIndex = this.state.questionStatus[Itemindex].selectIndex; // 答案ID
        let assignmentId = this.props.DALTinyListenPageState.currentLesson.assignment[Itemindex].assignmentId; // 作业Id
        let answerId = this.props.DALTinyListenPageState.currentLesson.assignment[Itemindex].selection[chooseIndex].answerId; // 作业Id
        let isLast = false;
        //如果这是最后一小节的最后一题
        if ( this.props.DALTinyListenPageState.listenIndex === this.props.DALTinyListenPageState.listenArray) {
            if ( Itemindex === this.state.questionStatus.length - 1) {
                isLast = true;
            }
        }


        if ( chooseIndex === this.props.DALTinyListenPageState.currentLesson.assignment[Itemindex].answer ) {
            this.state.questionStatus[Itemindex].chooseStatus = "rightChoose";
        } else {
            this.state.questionStatus[Itemindex].chooseStatus = "wrongChoose";
        }
        // 重新计算选择题进度 如果当前选中的时候一题
        if ( this.state.questionStatus[this.state.questionStatus.length - 1].chooseStatus !== "notChoose") {
            this.state.lessonProcess.chooseProcess = true;
            this.setState({
                lessonProcess: this.state.lessonProcess,
            });
        }
        this.setState({questionStatus: this.state.questionStatus});
        this.props.DALTinyListenPageState.postListenAssignment(answerId, assignmentId, isLast);
        this.afterFinishCalc();
        // todo 题目提交接口
    }



    // 下一节/完成
    cbfNextLesson(type) {
        let courseId = this.props.DALTinyCourseAppState.courseId;
        if ( type === 0 ) {
            this.state.lessonIndex = this.state.lessonIndex - 1;
        } else {
            if ( !this.state.lessonProcess.finishProcess ) {
                alert('not finish');
            } else {
                this.state.lessonIndex = this.state.lessonIndex + 1;
            }
        }
        let next = this.state.lessonIndex;
        this.props.DALTinyListenPageState.fetchListenInfoByIndex(courseId, next);
    }

    // renderProcess() {
    //     let arr = [];
    //     for ( let i = 0; i < this.state.totalElement; i++ ) {
    //         arr.push(<Steps.Step />);
    //     }
    //     return arr;
    // }

    // rederPPT() {
    //     let arr = [];
    //     for ( let i = 0; i < this.props.DALTinyListenPageState.currentLesson.pptUrl.length; i++ ) {
    //         arr.push(<img src = {this.props.DALTinyListenPageState.currentLesson.pptUrl[i]}/>);
    //     }
    //     return arr;
    // }

    render() {
        return (
            <div className={className.container}>
                {/*<Card>*/}
                {/*<div>*/}
                {/*<p>学习进度</p>*/}
                {/*<Steps direction="horizontal" current={this.state.finishElement}>*/}
                {/*{this.renderProcess()}*/}
                {/*</Steps>*/}
                {/*</div>*/}
                {/*</Card>*/}
                {/*<AudioPlayerPPTCard>*/}
                {/*{this.rederPPT()}*/}
                {/*</AudioPlayerPPTCard>*/}
                {/*<div>*/}
                {/*<SummaryCard>*/}
                {/*{this.props.DALTinyListenPageState.currentLesson.summary}*/}
                {/*</SummaryCard>*/}
                {/*</div>*/}
                <div>
                    <AudioPlayerWithTime src = {this.props.DALTinyListenPageState.currentLesson.audio} onEnded = {this.finishAudio}/>
                </div>
                {this.renderChooses()}
                {this.renderBottomButton()}
            </div>
        );
    }

    finishAudio() {
        // 完成音频
        this.state.lessonProcess.audioProcess = true;
        this.setState({
            lessonProcess: this.state.lessonProcess,
        });
        // console.log('完成音频');
        // this.props.DALTinyListenPageState.postWorkFinish(0, this.props.DALTinyListenPageState.currentLesson.fmid);
        this.afterFinishCalc();
        // post完成
    }

    // 渲染选择题列表
    renderChooses() {
        let arr = [];
        let lessonData = this.props.DALTinyListenPageState.currentLesson;
        let questions = lessonData.assignment;
        if ( this.state.lessonProcess.audioProcess ) {
            // 如果有选择题
            if ( questions.length !== 0 ) {
                for ( let i = 0; i < questions.length; i++ ) {
                    if ( i === 0 || this.state.questionStatus[i - 1].chooseStatus !== "notChoose") {
                        let question = questions[i];
                        arr.push(<ChooseBar
                            itemIndex = {i}
                            cbfClick = {this.cbfChooseBarClick}
                            cbfPost = {this.cbfPostAnswer}
                            chooseStatus = { this.state.questionStatus[i].chooseStatus }
                            introduce = {question.question}
                            tips = {question.explain}
                            answerList = {question.selection.map((answerItem) => {
                                return answerItem.content;
                            })}
                            selectIndex = { this.state.questionStatus[i].selectIndex }
                        />);
                    }
                }
            }
            return(arr);
        } else {
            return null;
        }
    }

    renderBottomButton() {
        let style = {
            position: "fixed",
            bottom: "0",
            backgroundColor: '#108ee9',
            color: 'white',
            textAlign: 'center',
        };
        return(<Card styleDefault = {style}><div className = {className.preNextBar}>{this.buttonTxt()}</div></Card>);
    }

    buttonTxt() {
        let arr = [];
        switch ( this.props.DALTinyListenPageState.listenIndex ) {
            case 0:
                return(<div className = {className.allLine}>
                    {this.renderNextButton(1)}
                </div>)
                break;
            case this.props.listenArray.length - 1:
                return(<div className = {className.allLine}>
                    {this.renderNextButton(0)}
                </div>)
                break;
            default:
                return(<div className = {className.allLine}>
                    {this.renderNextButton(0)}
                    {this.renderNextButton(1)}
                </div>)
                break;
        }
        if ( this.state.lessonProcess.finishProcess ) {
            // if ( this.state.lessonIndex < this.props.DALTinyListenPageState.currentLesson.length - 1 ) {
            //     return(<div onClick = {this.cbfNextLesson}>我准备好啦~开始学习下一节</div>);
            // } else {
            //     return(<div >都完成了!</div>);
            // }
        }
    }

    renderNextButton(type) {
        let style = {};
        if ( !this.state.lessonProcess.finishProcess ) {
            style = {
                color: 'green'
            };
        }
        if (type === 0) {
            return(<div style = {style} onClick = {this.cbfNextLesson.bind(this, type)}>上一节</div>);
        } else {
            return(<div style = {style} onClick = {this.cbfNextLesson.bind(this, type)}>下一节</div>);
        }

    }
}
// CourseListenContainer.defaultProps = {
//     DALTinyListenPageState: {
//         listenIndex: 0,
//         currentLesson: {
//             id: 0, // 章节ID
//             title: 'title',
//             pic: "https://h5.ichangtou.com/minicfm/assets/image/newfundppt/01.jpg",
//             audio: "https://h5.ichangtou.com/minicfm/assets/audio/fund/0-1.mp3",
//             summary: 'summary',
//             knowledgePoints: ['1','2','3'],
//             assignment: [{
//                 assignmentId: 1, // 作业ID
//                 question: 'question'
//                 selected: -1, // 用户选择的答案
//                 selection: [
//                     {
//                         content: 'content',
//                         answerId: 0, // 答案ID
//                     }]
//                 answer: 1,
//                 explain: 'explain',
//             }]
//         }
//     };
// propsPath: '',
//     history: [],
// }
export default CourseListenContainer;