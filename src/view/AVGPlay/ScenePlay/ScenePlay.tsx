import * as React from "react";

import BackGround from "@/components/AVGPlayScene/BackGround/BackGround";
import Person from "@/components/AVGPlayScene/Person/Person";
import Dialog from "@/components/AVGPlayScene/Dialog/Dialog";
import DialogName from "@/components/AVGPlayScene/DialogName/DialogName";
import QuizBar from "@/components/AVGPlayScene/QuizBar/QuizBar";

import * as className from "./style/style.less";

interface PropsTypes {
    currentSceneData: [
            {
                name: String,
                dialog: String,
                headImg: String,
                bgImg: String,
                event: String,// 这边用不到
                quiz: {
                    answerList: Array,
                    answerList: Array,
                }
            }
        ];
    cbfNextDialog: Function;
    cbfPostAnswer: Function;
    currentDialogIndex: Number;
}

interface StateTypes {
    process: number,
    canRenderBg: String,
    canRenderPerson: String,
    canRenderDialog: String,
    usedPersonTest: String,
    canRenderQuiz: String,
}


class ScenePlay extends React.Component<PropsTypes, StateTypes> {
    personTime: any; // 人物渐变时间
    bgTime: any; // 场景渐变时间
    speedInterval: any; // 字体播放速度
    usedBg: any; // 保存上一个图素
    usedPerson: any;
    usedDialog: any;
    usedName: any; // 保留计时器
    timeOutIndex: any; // 保留计时器
    usedBg = "";
    usedPerson = "";
    usedDialog = "";
    usedName = "";
    personTime = 500;
    bgTime = 1200;
    timeOutIndex = 0;
    speedInterval = 50;

    constructor(props: PropsTypes) {
        super(props);
        this.nextDialog = this.nextDialog.bind(this);
        this.clickScene = this.clickScene.bind(this);
        this.renderPerson = this.renderPerson.bind(this);
        this.renderBackGround = this.renderBackGround.bind(this);
        this.renderDialog = this.renderDialog.bind(this);
        this.renderQuiz = this.renderQuiz.bind(this);
        this.finishCalback = this.finishCalback.bind(this);
        this.finishQuiz = this.finishQuiz.bind(this);
        this.state = {
            process: 0,
            finishDialog: false,
            finishDialogNow: false,
            canRenderBg: "hide",
            canRenderPerson: "hide",
            canRenderDialog: "wait",
            canRenderQuiz: "hide",
        };
    }

    componentWillMount() {
        // console.log(this.props);
        this.init(this.props);
    }

    componentWillReceiveProps(prop) {
        // console.log(prop);
        this.init(prop);
    }

    init(prop) {
        console.log('before render');

        if (!prop.currentSceneData) {
            // console.log('no init');
            prop = this.props;
        }

        // checkBg
        if ( this.usedBg === prop.currentSceneData[prop.currentDialogIndex].bgImg ) {
            // this.setState({
            //     canRenderBg: "done"
            // });
        } else {
            switch (this.usedBg) {
                case "":
                    console.log('show')
                    // show
                    this.usedBg = prop.currentSceneData[prop.currentDialogIndex].bgImg;
                    this.setState({
                        canRenderBg: "show"
                    });
                    this.whenAnimation(this.bgTime + 100, "canRenderBg", "show");
                    break;
                default:
                    console.log('hide');
                    // hide
                    this.setState({
                        canRenderBg: "hide"
                    });
                    this.whenAnimation(this.bgTime + 100, "canRenderBg", "hide");
            }
            return;
        }
        // checkPerson
        if ( this.usedPerson === prop.currentSceneData[prop.currentDialogIndex].headImg) {
            // this.setState({
            //     canRenderPerson: "done"
            // });

        } else {
            //如果为空 显示 新头像.
            if ( this.usedPerson === "" ) {
                this.usedPerson = prop.currentSceneData[prop.currentDialogIndex].headImg;
                this.setState({
                    // usedPersonTest: this.usedPerson,
                    canRenderPerson: "show"
                });
                this.whenAnimation(this.personTime + 100, "canRenderPerson", "show");
            } else {
                // 如果之后为空 隐藏头像.
                if ( prop.currentSceneData[prop.currentDialogIndex].headImg === "" ) {
                    this.setState({
                        canRenderPerson: "hide"
                    });
                    this.whenAnimation(this.personTime + 100, "canRenderPerson", "hide");
                } else {
                    //如果不为空 1隐藏旧头像 2显示新头像.
                    this.setState({
                        canRenderPerson: "hide"
                    });
                    this.whenAnimation(this.personTime + 100, "canRenderPerson", "hide");
                }
            }
            return;
        }
        // checkDialog
        if ( this.usedDialog === prop.currentSceneData[prop.currentDialogIndex].dialog) {

        } else {
            this.usedDialog = prop.currentSceneData[prop.currentDialogIndex].dialog;
            this.usedName = prop.currentSceneData[prop.currentDialogIndex].name;
            this.setState({
                canRenderDialog: "show",
                finishDialogNow: false,
                finishDialog: false,
            });
            return;
        }
        // 如果对话已经完成 看看是否有选择题
        if ( this.state.finishDialog && prop.currentSceneData[prop.currentDialogIndex].quiz.answerList) {
            this.setState({
                // usedPersonTest: this.usedPerson,
                canRenderQuiz: "show"
            });
        }

    }

    // 点击选项后的回调
    finishQuiz(index) {
        console.log(index);
        this.setState({
            // usedPersonTest: this.usedPerson,
            canRenderQuiz: "hide"
        });
        this.props.cbfPostAnswer(index);
    }

    render() {
        console.log(this.props);
        console.log("render");
        return (
           <div style = {{width: '100%', height: '100%'}}>
               {/*菜单元素*/}
               {/*<div>123</div>*/}
               {/*舞台可点击元素*/}
               <div className = {className.scene} onClick={this.clickScene}>
                   {/*BackGround*/}
                   {this.renderBackGround()}
                   {/*Person*/}
                   {this.renderPerson()}

                   {/*Dialiog*/}
                   {this.renderDialog()}


               </div>
               {/*弹出框*/}
               {/*Quiz*/}
               {this.renderQuiz()}

               {/*NameTag*/}
           </div>
        );
    }

    renderQuiz() {
        if (this.state.canRenderQuiz === "hide") {
            return;
        }
        let arr = [];
        let answerList = this.props.currentSceneData[this.props.currentDialogIndex].quiz.answerList;
        for (let i = 0; i < answerList.length; i++) {
            arr.push(<QuizBar key = i index = {i} cbfClick = {this.finishQuiz.bind(this, i)} content = {answerList[i]}></QuizBar>)
        }
        return(<div className = {className.quiz}>
            <div className = {className.inner}>
                {arr}
            </div>
        </div>)
    }


    whenAnimation(time, typeName, showType) {
        window.clearTimeout(this.timeOutIndex);
        this.timeOutIndex = window.setTimeout(this.afterAnimate.bind(this, typeName, showType),time);
    }

    afterAnimate(typeName, showType) {
        console.log("finish Animate");

        // this.setState({
        //     [type]: 'hide'
        // });
        switch (typeName) {
            case "canRenderBg":
                if (showType === 'hide') {
                    this.usedBg = '';
                }

                // this.setState({
                //     [type]: 'done'
                // });
                break;
            case "canRenderPerson":
                if (showType === 'hide') {
                    this.usedPerson = '';
                }
                break;

        }
        this.init(this.props);
    }


    renderBackGround() {
        if (this.state.canRenderBg === 'wait') {
            return;
        }
        console.log('render Bg');
        // 如果当前为空
        let showStyle = {};
        switch(this.state.canRenderBg) {
            case "show":
                showStyle = {
                    opacity: '1',
                    transition: `${this.bgTime / 1000}s opacity`,
                }
                // this.whenAnimation(200, "canRenderBg");
                break;
            case "done":
                showStyle = {
                    opacity: '0.6',
                    transition: "2s opacity",
                }
                break;
            case "hide":
                showStyle = {
                    opacity: '0',
                    transition: `${this.bgTime / 1000}s opacity`,
                }
                break;
        }
        return <BackGround showStyle = {showStyle} bgImg = {this.usedBg}/>

    }

    renderPerson() {
        console.log('renderPerson');
        if (this.state.canRenderPerson === 'wait') {
            return;
        }
        // 如果当前为空
        let showStyle = {};
        switch(this.state.canRenderPerson) {
            case "show":
                showStyle = {
                    opacity: '1',
                    transition: `${this.personTime / 1000}s opacity`,
                };
                // this.whenAnimation(200, "canRenderBg");
                break;
            case "hide":
                showStyle = {
                    opacity: '0',
                    transition: `${this.personTime / 1000}s opacity`,
                };
                break;
        }
        return <Person showStyle = {showStyle} headImg = {this.usedPerson}/>
    }

    renderDialog() {
        if (this.state.canRenderDialog === 'wait' || this.usedDialog === '') {
            return;
        }
        let style = {

        };
        let arr = [];
        if (this.props.currentSceneData[this.props.currentDialogIndex].name) {
            arr.push(<DialogName key = 1 boxImg = {`${require("@/assets/image/Game/dialogName_1.jpg")}`}>{this.usedName}</DialogName>);
        }
        arr.push(<Dialog
            key = 2
            speedInterval = {this.speedInterval}
            finishDialog = {this.state.finishDialog}
            finishCalback = {this.finishCalback}
            finishDialogNow = {this.state.finishDialogNow}
            boxImg = {`${require("@/assets/image/Game/dialogBox_1.jpg")}`}>
            {this.usedDialog ? this.usedDialog : '123'}</Dialog>)
        return (<div className={className.dialog}>
            {arr}
        </div>);
    }

    //完成对话后的回调
    finishCalback() {
        console.log('finishCalback');
        this.state.finishDialog = true;
        this.setState({
            finishDialog: true
        });
        this.init(this.props);
    }

    clickScene() {
        //关闭选择
        if(this.props.currentSceneData[this.props.currentDialogIndex].quiz.answerList) {
            return;
        }
        console.log('clickScene');
        //如果对话已经完成
        // 或为了fix对话消失,无法继续的bug
        if (this.state.finishDialog || this.usedDialog === '') {
            this.nextDialog();
        } else {
            // let result = this.state.finishDialogNow;
            // result = !result;
            this.setState({finishDialogNow: true});
        }
    }


    nextDialog() {
        // console.log(this.state);
        // if ( this.state.process === this.props.currentStage.length - 1) {
        //     return;
        // }
        // this.state.process = this.state.process + 1;
        // 获取最新的对话

        // 设置对话
        // this.setState({
        //     process: this.state.process,
        // });
        this.props.cbfNextDialog();
    }
}
export default ScenePlay;
