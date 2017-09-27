import * as React from "react";
import ScenePlay from "@/view/AVGPlay/ScenePlay/ScenePlay";
import {stageData} from "@/view/AVGPlay/StageData/Stage1";

interface PropsTypes {

}

interface StateTypes {
    currentSceneData: Array,
    currentDialogIndex: Number,
}

class Scene extends React.Component<PropsTypes, StateTypes> {
    currentScene = 0;
    currentBranch = 0;

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

    // 角色信息和背景信息等常量 应该放到配置文件中
    //角色信息
    roleInfo = [
        {
            // 0
            name: '周老四',
            head: `${require("@/assets/image/Game/Stage1/b3.png")}`,
        },
        {
            name: '围观群众',// 1
            head: `${require("@/assets/image/Game/Stage1/people_1.png")}`,
        },
        {
            name: '周莹',// 2
            head: `${require("@/assets/image/Game/Stage1/g1.png")}`,
        },
        {
            name: '虬髯大汉',// 3
            head: `${require("@/assets/image/Game/Stage1/b4.png")}`,
        },
        {
            name: '沈星',// 4
            head: `${require("@/assets/image/Game/Stage1/b1.png")}`,
        },
        {
            name: '吴聘',// 5
            head: `${require("@/assets/image/Game/Stage1/b2.png")}`,
        },
        {
            name: '小贩1',// 6
            head: `${require("@/assets/image/Game/Stage1/b6.png")}`,
        },
        {
            name: '小贩2',// 7
            head: `${require("@/assets/image/Game/Stage1/b6.png")}`,
        },
        {
            name: '小贩3',// 8
            head: `${require("@/assets/image/Game/Stage1/b6.png")}`,
        },
        {
            // 9
            name: '碰瓷的人',
            head: `${require("@/assets/image/Game/Stage1/b5.png")}`,
        },
        {
            // 10
            name: '杜明礼',
            head: `${require("@/assets/image/Game/Stage1/b6.png")}`,
        },



    ]

    // 按照幕一个个的配置(这样的配置场景不好变换.需要修改)

    bgImg = [
        `${require("@/assets/image/Game/Stage1/0.jpg")}`,
        `${require("@/assets/image/Game/Stage1/1.jpg")}`,
        `${require("@/assets/image/Game/Stage1/2.jpg")}`,
        `${require("@/assets/image/Game/Stage1/3.jpg")}`,
        `${require("@/assets/image/Game/Stage1/4.jpg")}`,
        `${require("@/assets/image/Game/Stage1/5.png")}`,
        `${require("@/assets/image/Game/Stage1/6.jpg")}`,
        `${require("@/assets/image/Game/Stage1/7.jpg")}`,
        `${require("@/assets/image/Game/Stage1/8.jpg")}`,
        `${require("@/assets/image/Game/Stage1/9.jpg")}`,
        `${require("@/assets/image/Game/Stage1/gameover_1.jpg")}`,// 失败
        `${require("@/assets/image/Game/Stage1/win_1.png")}`,// 胜利
    ]

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
        this.state = {
            currentSceneData: [],
            currentDialogIndex: 0,
        };
    }

    componentWillMount() {
        this.init();
    }


    render() {
        return (
            <div style = {{width: '100%', height: '100%'}}>
                <ScenePlay cbfNextDialog = {this.cbfNextDialog}
                           cbfPostAnswer = {this.cbfPostAnswer}
                           currentDialogIndex = {this.state.currentDialogIndex}
                           currentSceneData = {this.state.currentSceneData}></ScenePlay>
            </div>
        );
    }

    // 1event在填充时被解析,放入event中.用户点击下一段 根据事先保存在event中的东西 进行(下一段,结束,等操作)
    // 2用户选择完问题 传过来选择的index.选择题解析对应的题目的奖励列表.来执行对应的逻辑

    // 只有背景改变 需要提前处理.
    // 这里面有异步 先执行舞台 用户点击舞台结果后. 会对当前舞台事件进行结算 并且执行结算后的舞台.

    // 用户点击下一段.
    cbfNextDialog() {
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

        // 1 获取当前场景
        let scene = stageData[this.currentScene];
        // 2 确定分支
        let branch = scene[this.currentBranch];
        // 3 获取当前的剧情
        let dialog = branch[this.state.currentDialogIndex];
        // 4 获取用户选择的东西
        let chooseQuiz = dialog.quiz.answerResult[index];
        // 5 解析
        for (let i = 0; i < chooseQuiz.length; i++) {
            this.getResultWhenRunning(chooseQuiz[i]);
        }
        // 6 进行点击下一步
        let currentDialogIndex = this.state.currentDialogIndex + 1;
        this.setState({
            currentDialogIndex: currentDialogIndex,
        });
        // 7更新branch
        this.nextBranch();
    }

    // 切换场景
    changeScene(index) {
        console.log('changeScene')
        if ( index ) {
            this.currentScene = index;
        } else {
            this.currentScene++;
        }
        this.sceneStart();
    }


    // 初始化
    init() {
        this.currentScene = -1;
        this.currentScene++; // 在外部添加这个.
        this.sceneStart();
    }

    // 玩家进入当下场景
    sceneStart() {
        // 0 重置
        this.state.currentSceneData = [];
        this.currentBranch = 0;
        this.setState({
            currentDialogIndex: 0,
        });
        // 1 获取当前场景
        let scene = stageData[this.currentScene];
        this.nextBranch();
    }

    // 切换分支
    nextBranch () {
        // 1 获取当前场景
        let scene = stageData[this.currentScene];
        // 2 确定分支
        let branch = scene[this.currentBranch];
        // 3 添加上去
        this.pushBranch(branch);
    }

    // 根据玩家的分支选择 生成内容 并录入
    pushBranch(dialogArray) {
        console.log(dialogArray);

        let dialogInfo;

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
                this.pushData(dialogInfo.dialog.name, dialogInfo.dialog.content, dialogInfo.dialog.head);
            }


            // else if (dialogInfo.event) {
            //
            //     // 这个event(切换场景) 会在下一次生效(因为背景变化 会自动渲染)
            //     this.getResultFromString(dialogInfo.event);
            // } else if (dialogInfo.quiz) {
            //
            // }


        }
        if (dialogArray.dialog) {

        }

        // 3 更新进度.
    }

    // 运行中确定的事件
    getResultWhenRunning(result) {
        let resultString = result.split("#")[0];
        let resultValue = result.split("#")[1];
        // this.currentDialogSetting.event = this.currentDialogSetting.event + result;
        console.log(result);
        switch (resultString) {
            case "addB1":
                break;
            case "addB2":
                break;
            case "addMQ":
                console.log(`add mq${resultValue}`);
                // alert(`add mq${resultValue}`)
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
                this.changeScene();
                break;
            case "gameOver":
                this.sceneStart();
                break;
            case "stageOver":
                alert('你通关了');
                break;
            case "goDialog":
                console.log(resultValue);
                this.currentBranch = resultValue;
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
                this.changeData("bgImg", this.bgImg[resultValue]);
                break;
            case "leaveScene":
                this.changeData("bgImg", "");
                break;
            case "gameOver":
                this.changeData("bgImg", this.bgImg[10]);
                break;
            case "stageOver":
                this.changeData("bgImg", this.bgImg[11]);
                break;
            default:
                console.log('error@!!!');
                console.log(result)
        }
    }

    // 推入单个dialog数据
    pushData(nameIndex, dialog, head) {
        //读取预设的
        let localCurrentDialog = JSON.parse(JSON.stringify(this.currentDialogSetting));
        //写入新的
        if (nameIndex === "") {
            localCurrentDialog.name = '';
        } else {
            localCurrentDialog.name = this.roleInfo[nameIndex].name;
        }

        if (dialog === "") {
            localCurrentDialog.dialog = '';
        } else {
            localCurrentDialog.dialog = dialog;
        }

        if (head === "") {
            //隐藏头像
            localCurrentDialog.headImg = '';
            console.log('隐藏头像');
        } else {
            localCurrentDialog.headImg = this.roleInfo[head].head;
            console.log('错位头像');
        }

        // 写入
        this.state.currentSceneData.push(localCurrentDialog);
    }


    // ---内部方法---
    // 更改预设数值(背景)
    changeData(key, value) {
        this.currentDialogSetting[key] = value;
    }

}

export default Scene;