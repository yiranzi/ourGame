import * as React from "react";
import ScenePlay from "@/view/AVGPlay/ScenePlay/ScenePlay";
import {stageData, roleInfo, bgImg, STAGE_INIT} from "@/view/AVGPlay/StageData/Stage1";
import {userProcess, userAttribute, USER_DATA_INIT, USER_DATA_SAVE} from "@/view/AVGPlay/UserData/UserData";

interface PropsTypes {

}

interface StateTypes {
    currentSceneData: Array,
    currentDialogIndex: Number,
    userData: {
        MQ: Number,
        b1Love: Number,
        b2Love: Number,
    }
}

class Scene extends React.Component<PropsTypes, StateTypes> {
    currentScene = 0;
    currentBranch = 0;
    alive = true;

    // 预设的 每次推入拷贝一个
    currentDialogSetting = {
        name: "",
        dialog: "",
        headImg: "",
        bgImg: "",
        event: "",
        quiz: {
            answerList: [],
            answerResult: [],
        }
    }

    constructor(props: PropsTypes) {
        super(props);
        this.init = this.init.bind(this);
        this.sceneStart = this.sceneStart.bind(this);
        this.nextBranch = this.nextBranch.bind(this);
        this.pushBranch = this.pushBranch.bind(this);
        this.pushData = this.pushData.bind(this);

        this.cbfNextDialog = this.cbfNextDialog.bind(this);
        this.cbfPostAnswer = this.cbfPostAnswer.bind(this);
        this.getResultWhenRunning = this.getResultWhenRunning.bind(this);
        this.getResultBeforeRun = this.getResultBeforeRun.bind(this);
        this.changeData = this.changeData.bind(this);
        this.changeScene = this.changeScene.bind(this);
        this.addValue = this.addValue.bind(this);
        this.state = {
            currentSceneData: [],
            currentDialogIndex: 0,
        };
    }

    componentWillMount() {
        console.log(roleInfo);
        console.log(bgImg);
        this.init();
    }


    render() {
        return (
            <div style = {{width: '100%', height: '100%'}}>
                <ScenePlay cbfNextDialog = {this.cbfNextDialog}
                           cbfPostAnswer = {this.cbfPostAnswer}
                           currentDialogIndex = {this.state.currentDialogIndex}
                           currentSceneData = {this.state.currentSceneData}
                           userAttribute = {this.state.userData}
                >

                </ScenePlay>
            </div>
        );
    }

    // 1event在填充时被解析,放入event中.用户点击下一段 根据事先保存在event中的东西 进行(下一段,结束,等操作)
    // 2用户选择完问题 传过来选择的index.选择题解析对应的题目的奖励列表.来执行对应的逻辑

    // 只有背景改变 需要提前处理.
    // 这里面有异步 先执行舞台 用户点击舞台结果后. 会对当前舞台事件进行结算 并且执行结算后的舞台.

    // 用户点击下一段.
    cbfNextDialog() {
        dplus.track('点击对话',{'章节': this.currentScene,'小节编号': this.currentBranch,'对话编号':this.state.currentDialogIndex,'存活': this.alive})

        // 先读取当前这段的事件(已经dialog的这段,而不是下一段dialog(应为不一定有下一段))
        let eventArray = this.state.currentSceneData[this.state.currentDialogIndex].event;
        let event;
        for (let i = 0; i < eventArray.length; i++) {
            event = eventArray[i];
            this.getResultWhenRunning(event);
        }
    }

    // 用户提交答案.
    cbfPostAnswer(index) {
        //
        console.log('cbfPostAnswer');
        console.log(index);


        let currentDialog = this.state.currentSceneData[this.state.currentDialogIndex];
        // 4 获取用户选择的东西
        let chooseQuiz = currentDialog.quiz.answerResult[index];
        // 5 解析
        for (let i = 0; i < chooseQuiz.length; i++) {
            this.getResultWhenRunning(chooseQuiz[i]);
        }
        // 6 进行点击下一步
        // let currentDialogIndex = this.state.currentDialogIndex + 1;
        // this.setState({
        //     currentDialogIndex: currentDialogIndex,
        // });

    }

    // 切换场景
    changeScene(index) {
        console.log('changeScene')
        if ( index ) {
            this.currentScene = index;
        } else {
            this.currentScene++;
        }
        dplus.track('开始场景',{'章节': this.currentScene});
        this.sceneStart();
    }


    // 初始化 读取游戏或者说
    init() {
        USER_DATA_INIT();
        this.setState({
            userData :userAttribute
        });
        window.setTimeout(()=>{
            STAGE_INIT();
        },0)

        //进入游戏
        let location = window.location.href;
        if(location.includes('share')) {
            dplus.track('进入游戏',{'来源': '下线'});
        } else {
            dplus.track('进入游戏',{'来源': '上线'});
        }

        // 设置入场关
        this.currentScene = userProcess.scene;
        dplus.track('开始场景',{'章节': this.currentScene});


        // 0 重置
        this.currentBranch = userProcess.branch;

        let newArray = this.nextBranch();
        this.setState({
            currentDialogIndex: userProcess.dialog,
            currentSceneData :newArray,
        })
    }

    loadGame() {

    }

    // 玩家进入当下场景
    sceneStart() {
        console.log('sceneStart')
        // 0 重置
        this.currentBranch = 0;

        let newArray = this.nextBranch();
        this.setState({
            currentDialogIndex: 0,
            currentSceneData :newArray,
        })
    }

    // 切换分支
    nextBranch () {
        // 1 获取当前场景
        let scene = stageData[this.currentScene];
        // 2 确定分支
        let branch = scene[this.currentBranch];
        // 3 添加上去
        return this.pushBranch(branch);
    }

    // 根据玩家的分支选择 生成内容 并录入
    pushBranch(dialogArray) {
        console.log(dialogArray);

        let dialogInfo;
        // let localCurrentSceneData = JSON.parse(JSON.stringify(this.state.currentSceneData));
        let localCurrentSceneData = [];
        // 1 解析.

        // 2 保存.(可能?)
        // 对话 选择题 场景变化
        for ( let i = 0; i < dialogArray.length; i++ ) {
            // 读取
            dialogInfo = dialogArray[i];
            // 事件重置
            this.currentDialogSetting.event = ["nextDialog"];
            // 如果有事件.先保存下来
            if (dialogInfo.event) {
                // 异步的写入 触发的时候 读取(如果是选择题...现在是读的数据.其实也可以让所有事件都去读数据
                this.currentDialogSetting.event = dialogInfo.event;
                // 同步的
                if (dialogInfo.dialog) {
                    // 遍历
                    for (let i = 0; i < dialogInfo.event.length; i++) {
                        //试图解析那些背景相关的变更
                        this.getResultBeforeRun(dialogInfo.event[i]);
                    }
                } else {

                }
            }

            // 选择题
            this.currentDialogSetting.quiz = {};
            if (dialogInfo.quiz) {
                this.changeData("quiz", dialogInfo.quiz);
            }


            // 对话
            if (dialogInfo.dialog) {
                localCurrentSceneData = this.pushData(dialogInfo.dialog.name, dialogInfo.dialog.content, dialogInfo.dialog.head, localCurrentSceneData);
            }
        }

        return localCurrentSceneData;
    }

    addValue(key,resultValue) {
        console.log('addMQ')
        let userData = JSON.parse(JSON.stringify(this.state.userData));
        userData[key] =  userData[key] + resultValue;
        this.setState({
            userData: userData
        })
    }

    // 运行中确定的事件
    getResultWhenRunning(result) {
        let resultString = result.split("#")[0];
        let resultValue = parseInt(result.split("#")[1]);
        // this.currentDialogSetting.event = this.currentDialogSetting.event + result;
        console.log(result);
        switch (resultString) {
            case "addB1":
                this.addValue('b1Love', resultValue);
                break;
            case "addB2":
                this.addValue('b2Love', resultValue);
                break;
            case "addMQ":
                this.addValue('MQ', resultValue);
                break;
            case "nextDialog":
                // 下段对话
                let next = this.state.currentDialogIndex + 1;
                this.setState({
                    currentDialogIndex: next,
                });
                break;
            case "startScene":
                // 开始场景
                this.setState({
                    currentDialogIndex: this.state.currentDialogIndex + 1,
                });
                break;
            case "nextScene":
                // 下个场景
                // 完成场景上报
                dplus.track('完成场景',{'章节': this.currentScene,'存活': this.alive});
                this.alive = true;
                this.changeScene();
                break;
            case "gameOver":
                this.alive = false;
                dplus.track('选错了结束',{'章节': this.currentScene,'小节编号': this.currentBranch,'对话编号':this.state.currentDialogIndex,'存活': this.alive})
                break;
            case "restart":
                this.sceneStart();
                break;
            case "stageOver":
                dplus.track('达成结局',{'章节': this.currentScene,'小节编号': this.currentBranch,'对话编号':this.state.currentDialogIndex})
                // alert('你通关了');
                break;
            case "stageOver":
                break;
            case "goDialog":
                console.log(resultValue);
                this.currentBranch = resultValue;
                // 7更新branch 8完成渲染
                this.setState({
                    currentDialogIndex: 0,
                    currentSceneData : this.nextBranch(),
                });
                break;
            case "goChannel":
                dplus.track("下线跳转");
                location.href = resultValue;
                break;
            default:
                console.log('error@!!!')
                console.log(result)
        }
    }

    // 解析event(改变属性/设置event)
    getResultBeforeRun(result) {
        let resultString = result.split("#")[0];
        let resultValue = result.split("#")[1];
        // this.currentDialogSetting.event = this.currentDialogSetting.event + result;
        switch (resultString) {
            case "nextScene":
                this.changeData("bgImg", '');
                break;
            case "startScene":
                this.changeData("bgImg", bgImg[resultValue]);
                break;
            case "leaveScene":
                this.changeData("bgImg", "");
                break;
            case "gameOver":
                this.changeData("bgImg", bgImg[10]);
                break;
            case "stageOver":
                this.changeData("bgImg", bgImg[11]);
                break;
            default:
                console.log('error@!!!');
                console.log(result)
        }
    }

    // 推入单个dialog数据
    pushData(nameIndex, dialog, head, localCurrentSceneData) {

        // 读取预设的Objcet
        let localCurrentDialog = JSON.parse(JSON.stringify(this.currentDialogSetting));


        //写入新的
        if (nameIndex === "") {
            localCurrentDialog.name = '';
        } else {
            localCurrentDialog.name = roleInfo[nameIndex].name;
        }

        if (head === "") {
            //隐藏头像
            localCurrentDialog.headImg = '';
            console.log('隐藏头像');
        } else {
            localCurrentDialog.headImg = roleInfo[head].head;
            console.log('错位头像');
        }

        let array = dialog.split('#');
        if(array.length > 0) {
            for(let i = 0; i < array.length; i++) {
                let moreTalk = JSON.parse(JSON.stringify(localCurrentDialog));
                moreTalk.dialog = array[i];
                // 写入
                localCurrentSceneData.push(moreTalk);
            }
        } else {
            localCurrentDialog.dialog = dialog;
            // 写入
            localCurrentSceneData.push(localCurrentDialog);
        }
        return localCurrentSceneData

    }


    // ---内部方法---
    // 更改预设数值(背景)
    changeData(key, value) {
        this.currentDialogSetting[key] = value;
    }

}

export default Scene;