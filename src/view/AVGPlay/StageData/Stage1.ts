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
        name: '周老四',
        head: `${require("@/assets/image/Game/Stage1/boy1.png")}`,
    },
    {
        name: '围观群众',
        head: ``,
    },
    {
        name: '周莹',
        head: `${require("@/assets/image/Game/Stage1/boy2.png")}`,
    },
    {
        name: '虬髯大汉',
        head: `${require("@/assets/image/Game/Stage1/boy2.png")}`,
    },


]

const bgImg = [
    `${require("@/assets/image/Game/Stage1/bg1.jpg")}`,
    `${require("@/assets/image/Game/Stage1/bg1.jpg")}`
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
    // PushData(-1, 'a',-1);
    console.log(bgImg[0])

    PushData(-1, '光绪年间，陕西有一女子，姓周名莹，无父无母，自幼跟随养父走江湖卖艺，或曰行骗，以求果腹。',-1);
    PushData(-1, '十八年来，周莹走南闯北，颠沛流离，幸喜天资聪颖，对数字过目不忘，也练就一身的求生本领。',-1);
    PushData(-1, '此番与养父来到泾阳，她能否改变命运呢？',-1);

    ChangeData("bgImg", bgImg[0]);
    PushData(-1, '周老四（养父）与周莹街头卖艺。',-1);
    PushData(1, '好好好~',-1);
    PushData(0, '泾阳的父老乡亲们，我父女二人初来乍到，有道是：脚踏贵地，眼望生人；长城高万丈，全靠朋友帮，有钱的捧个钱场，没钱的请您回家取钱也捧个钱场，在下有礼了！（作揖）');
    PushData(2, '（只收到几个铜钱）爹……');
    PushData(0, '哎！看来，泾阳的父老乡亲们，是见多识广啊！我今天周老四要是不露点绝活，怕是扯不开这场子！那周老四要拿出看家本事了！（脱衣服，法功）闺女，来！');
    PushData(-1, '周莹拿刀砍了养父几下。',2);
    PushData(1, '好好好~');

    //谢幕
    ChangeData("bgImg", '');
    PushData(-1, '第一幕结束',-1);
    //第二幕
    ChangeData("bgImg", bgImg[1]);
    PushData(-1, '第二幕开始',-1);
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
            localCurrentDialog.headImg = ''
            console.log('隐藏头像');
        } else {
            localCurrentDialog.headImg = roleInfo[head].head;
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