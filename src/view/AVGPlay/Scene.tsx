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
    currentDialogIndex = 0;

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

    //角色信息
    roleInfo = [
        {
            name: '周老四',
            head: `${require("@/assets/image/Game/Stage1/boy_1.png")}`,
        },
        {
            name: '围观群众',
            head: `${require("@/assets/image/Game/Stage1/people_1.png")}`,
        },
        {
            name: '周莹',
            head: `${require("@/assets/image/Game/Stage1/girl_2.png")}`,
        },
        {
            name: '虬髯大汉',
            head: `${require("@/assets/image/Game/Stage1/people_2.png")}`,
        },
    ]

    bgImg = [
        `${require("@/assets/image/Game/Stage1/bg_1.jpg")}`,
        `${require("@/assets/image/Game/Stage1/bg_2.jpg")}`
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
        this.getResultFromString = this.getResultFromString.bind(this);
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
            <div>
                <ScenePlay cbfNextDialog = {this.cbfNextDialog}
                           cbfPostAnswer = {this.cbfPostAnswer}
                           currentDialogIndex = {this.state.currentDialogIndex}
                           currentSceneData = {this.state.currentSceneData}></ScenePlay>
            </div>
        );
    }

    // 用户点击下一段.
    cbfNextDialog() {
        // 先读取当前这段的事件(已经dialog的这段,而不是下一段dialog(应为不一定有下一段))
        let event = this.state.currentSceneData[this.state.currentDialogIndex].event;
        switch (event) {
            case "nextDialog":
                console.log("nextDialog");
                let next = this.state.currentDialogIndex + 1;
                this.setState({
                    currentDialogIndex: next,
                });
                break;
            // 下个场景
            case "nextScene":
                //
                this.changeScene();
                break;
                // 死亡
            case "gameOver":
                break;
                // 完成
            case "stageOver":
                break;
            default:
                console.log(event);
        }
    }

    // 用户提交答案.
    cbfPostAnswer(index) {
        //
        console.log('cbfPostAnswer');
        console.log(index);
        this.currentBranch = 1;
        this.setState({
            currentDialogIndex: 0,
        });
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
            this.currentDialogSetting.event = "nextDialog";
            // 如果有事件.先保存下来
            if (dialogInfo.event) {
                // 同步的
                if (dialogInfo.dialog) {
                    // 遍历
                    for (let i = 0; i < dialogInfo.event.length; i++) {
                        this.getResultFromString(dialogInfo.event[i]);
                    }
                } else {
                    // 异步的(暂时没有 虽然是用户触发的 但是触发结果已经确定.可以同步写进去)
                    this.currentDialogSetting.event = dialogInfo.event;
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

    // 解析event(改变属性/设置event)
    getResultFromString(result) {
        let resultString = result.split("#")[0];
        let resultValue = result.split("#")[1];
        switch (resultString) {
            case "addLoveNpc1":
                break;
            case "addLoveNpc2":
                break;
            case "addMQ":
                break;
            case "nextScene":
                this.changeData("bgImg", '');
                this.currentDialogSetting.event = 'nextScene';
                break;
            case "startScene":
                this.changeData("bgImg", this.bgImg[this.currentScene]);
                break;
            case "leaveScene":
                this.changeData("bgImg", "");
                break;
            case "goOver":
                break;
            case "goDialog":
                break;
            default:
                console.log('error@!!!')
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