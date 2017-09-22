//角色列表
const nameList = [
    '小明','小兰'
]

//立绘列表
const headList = [
    '123','456'
]

const roleInfo = [
    {
        name: '百里守约',
        head: `${require("@/assets/image/getReward_icon.png")}`,
    },
    {
        name: '安其拉',
        head: `${require("@/assets/image/qqGroup_icon.png")}`,
    },
]

const bgImg = [
    `${require("@/assets/image/fund_bunner.png")}`
]

//每个push的单元
var currentDialog = {
    name: "",
    dialog: "",
    headImg: "",
    bgImg: "",

}

//预设的
var currentDialogSetting = {
    name: "",
    dialog: "",
    headImg: "",
    bgImg: "",
}

//最终导出的数据
var stageData = [];

/**
 * Created by ichangtou on 2017/5/13.1
 */
var preMove = 0

export function init() {
    console.log('init');
    make()
}

function make() {
    console.log(bgImg[0])
    ChangeData("bgImg", bgImg[0]);
    PushData(-1, '故事开始了',-1);
    PushData(0, '我是男主');
    PushData(1, '我是女主');
    PushData(0, '我会玩adc');
    PushData(1, '我会玩辅助');
}


function PushData(nameIndex, dialog, head) {

    //读取预设的
    let localCurrentDialog = JSON.parse(JSON.stringify(currentDialogSetting));
    //写入新的
    if (nameIndex === -1) {
        localCurrentDialog.name = '';
    } else {
        localCurrentDialog.name = roleInfo[nameIndex].name;
    }

    if (dialog === -1) {
        localCurrentDialog.dialog = '';
    } else {
        localCurrentDialog.dialog = dialog;
    }

    if (head) {
        if ( head === -1) {
            //隐藏头像
            console.log('隐藏头像');
        } else {
            console.log('错位头像');
        }
    } else {
        localCurrentDialog.headImg = roleInfo[nameIndex].head;
    }
    //写入预设的
    // dialogSetting(localCurrentDialog);
    pushStageData(localCurrentDialog);
}

function dialogSetting(localCurrentDialog) {
    let value;
    for( let key in currentDialogSetting) {
        value = currentDialogSetting[key];
        localCurrentDialog[key] = value;
    }
}

function pushStageData(localCurrentDialog) {
    stageData.push(localCurrentDialog);
}

function ChangeData(key, value) {
    currentDialogSetting[key] = value;
}

export {stageData}

// export default MakeDataByGameId;

// export function init;

// export {
//     MakeDataByGameId,
//     stageData,
// };