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

const bgImg = [
    `${require("@/assets/image/Game/Stage1/bg_1.jpg")}`,
    `${require("@/assets/image/Game/Stage1/bg_2.jpg")}`
]



// 最终导出的数据
var stageData = [];
// 当前的场景
var currentScene = -1;
// 当前的分剧情
var currentBranch = -1;
// 当前的对话
var currentDialog = -1;

/**
 * Created bcurrenty ichangtou on 2017/5/13.1
 */





//  场景转换?
function changeScene () {
    // 幕隐藏

    // 下一幕?
    currentScene++;

    //开始播放
    sceneStart()
}






function nextDialog () {

}



// 获取当前场景
function getScene(index) {
    return sceneData[index];
}

/*
head -2读取
 */

function make() {
    // pushdata
    // role     人物编号(修改名称)
    // dialog   旁白内容
    // head 头像显示 -1不显示 -2 读取默认的 number 正常编号,读取头像编号

    // 序幕

    PushData(-1, '光绪年间，陕西有一女子，姓周名莹，无父无母，自幼跟随养父走江湖卖艺，或曰行骗，以求果腹。',-1);
    PushData(-1, '十八年来，周莹走南闯北，颠沛流离，幸喜天资聪颖，对数字过目不忘，也练就一身的求生本领。',-1);
    PushData(-1, '此番与养父来到泾阳，她能否改变命运呢？',-1);

    // 市井
    ChangeData("bgImg", bgImg[0]);

    let a = {
        dialog: {

        },
        quiz: {
            answerList: ['1你是谁','2请问你是谁'],
            answerResult: ["addMQ#10","goScene#2"],
        }
    }

    PushData(-1, '周老四（养父）与周莹街头卖艺。',-1);
    PushData(1, '好好好~');
    PushData(0, '泾阳的父老乡亲们，我父女二人初来乍到，有道是：脚踏贵地，眼望生人；长城高万丈，全靠朋友帮，有钱的捧个钱场，没钱的请您回家取钱也捧个钱场，在下有礼了！（作揖）');
    PushData(2, '（只收到几个铜钱）爹……');
    PushData(0, '哎！看来，泾阳的父老乡亲们，是见多识广啊！我今天周老四要是不露点绝活，怕是扯不开这场子！那周老四要拿出看家本事了！（脱衣服，发功）闺女，来！');
    PushData(-1, '周莹拿刀砍了养父几下。',2);
    PushData(1, '好好好~');
    PushData(2, '在下这套功夫，乃是传自少林，创自武当，曾经打败两江无敌手，也在武林大会上技压群雄……');
    PushData(-1, 'over',-1);
    //谢幕
    ChangeData("bgImg", '');
    PushData(-1, '',-1);
    //第二幕
    ChangeData("bgImg", bgImg[1]);
    PushData(-1, '第二幕开始',-1);
}

var stageData = [
    // 场景1
    [
        // 分剧情1
        [
            // 对话1
            {
                dialog: {
                    name: "",
                    content: "光绪年间，陕西有一女子，姓周名莹，无父无母，自幼跟随养父走江湖卖艺，或曰行骗，以求果腹。",
                    head: "",
                }
            },
            // 对话2
            {
                dialog: {
                    name: "",
                    content:  "十八年来，周莹走南闯北，颠沛流离，幸喜天资聪颖，对数字过目不忘，也练就一身的求生本领。",
                    head: "",
                },
            },
            // 对话3
            {
                dialog: {
                    name: "",
                    content: "此番与养父来到泾阳，她能否改变命运呢？",
                    head: "",
                },
            },
            // 谢幕的dialog
            {
                dialog: {
                    name: "",
                    content: "",
                    head: "",
                },
                // event: ["nextScene","addMQ#10"]
                event: ["nextScene"]
            },
            // 谢幕的dialog
            // {
            //     dialog: {
            //         name: "",
            //         content: "",
            //         head: "",
            //     },
            //     event: ["nextScene"]
            // },
            // event
            // {
            //     event: ["goScene#2"]
            // }
        ]
    ],

    // 场景2
    [
        // 分剧情1
        [
            // 入场的dialog
            {
                dialog: {
                    name: "",
                    content: "周老四（养父）与周莹街头卖艺。",
                    head: "",
                },
                event: ["startScene"]
            },
            // 对话1
            {
                dialog: {
                    name: "1",
                    content: "好好好~",
                    head: "1",
                }
            },
            // 对话2
            {
                dialog: {
                    name: "0",
                    content:  "泾阳的父老乡亲们，我父女二人初来乍到，有道是：脚踏贵地，眼望生人；长城高万丈，全靠朋友帮，有钱的捧个钱场，没钱的请您回家取钱也捧个钱场，在下有礼了！（作揖）",
                    head: "0",
                }
            },
            // 对话3
            {
                dialog: {
                    name: "2",
                    content: "（只收到几个铜钱）爹……",
                    head: "2",
                }
            },
            // 对话4
            {
                dialog: {
                    name: "0",
                    content: "哎！看来，泾阳的父老乡亲们，是见多识广啊！我今天周老四要是不露点绝活，怕是扯不开这场子！那周老四要拿出看家本事了！（脱衣服，发功）闺女，来！",
                    head: "0",
                }
            },
            // 对话5
            {
                dialog: {
                    name: "",
                    content: "周莹拿刀砍了养父几下。",
                    head: "2",
                }
            },
            // 对话
            {
                dialog: {
                    name: "1",
                    content: "好好好~",
                    head: "1",
                }
            },
            // 对话
            {
                dialog: {
                    name: "0",
                    content: "在下这套功夫，乃是传自少林，创自武当，曾经打败两江无敌手，也在武林大会上技压群雄……",
                    head: "0",
                }
            },
            // 对话
            {
                dialog: {
                    name: "3",
                    content: "别再吹牛啦！",
                    head: "3",
                }
            },
            // 对话
            {
                dialog: {
                    name: "0",
                    content: "我说，这位爷，这可是货真价实的钢刀，这也是货真价实的肉身，你凭啥说在下吹牛呢？",
                    head: "0",
                }
            },
            // 对话
            {
                dialog: {
                    name: "3",
                    content: "刀是不假，肉也不假，可是握刀的是你的女儿，她到底使了多大的力气，我们可不知道！",
                    head: "3",
                }
            },
            // 对话 女儿
            {
                dialog: {
                    name: "2",
                    content: "你可别胡说啊！刚才大家伙可都看见了！我可是使了全身的力气！",
                    head: "2",
                }
            },
            // 对话 大汉
            {
                dialog: {
                    name: "3",
                    content: "就你那样？还使全身力气？",
                    head: "3",
                }
            },
            // 对话 观众
            {
                dialog: {
                    name: "1",
                    content: "是啊！……就是啊！",
                    head: "1",
                }
            },
            // 对话 周老汉
            {
                dialog: {
                    name: "0",
                    content: "这位爷，那您说怎么样才叫功夫？",
                    head: "0",
                }
            },
            // 对话 大汉
            {
                dialog: {
                    name: "3",
                    content: "依我说，就让我砍上你两刀，如果还是这般安然无恙，我就佩服你功夫了得！",
                    head: "3",
                }
            },
            // 对话 观众
            {
                dialog: {
                    name: "1",
                    content: "（附和）对！对！对！",
                    head: "1",
                }
            },
            // 对话 周老汉
            {
                dialog: {
                    name: "",
                    content: "周老四犹豫了一下，作势要让他砍。",
                    head: "0",
                }
            },
            // 对话 女儿
            {
                dialog: {
                    name: "2",
                    content: "（为难状）爹，别……",
                    head: "2",
                },
                quiz: {
                    answerList: ['养父是老江湖了，让他来吧！','养父毕竟年老，自己来'],
                    answerResult: [
                        ["goDialog#2","addMQ#10"],
                        ["goDialog#1"]
                    ],
                }
            },


            // 判断题
            // {
            //     quiz: {
            //         answerList: ['1你是谁','2请问你是谁'],
            //         answerResult: [["addMQ#10"],["goScene#2"]],
            //     }
            // },

        ],
        // 分剧情2
        [
            // 对话 女儿
            {
                dialog: {
                    name: "2",
                    content: "爹，让我来，你的功夫我也学过！",
                    head: "2",
                },
            },
            // 对话 周老汉
            {
                dialog: {
                    name: "0",
                    content: "这位爷，那您说怎么样才叫功夫？",
                    head: "0",
                }
            },
            // 对话 女儿
            {
                dialog: {
                    name: "2",
                    content: "是啊，爹爹年迈，怎能让您以身试险？不如我来吧！",
                    head: "2",
                },
            },
            // 对话 观众
            {
                dialog: {
                    name: "1",
                    content: "好啊！来呀！",
                    head: "1",
                }
            },
            // 对话 大汉
            {
                dialog: {
                    name: "3",
                    content: "喝——",
                    head: "3",
                }
            },
            // 对话 旁白
            {
                dialog: {
                    name: "3",
                    content: "你屏住呼吸，怎奈修炼不到家，人一刀下去，你只觉腹部一痛，继而两眼一黑，你死了。",
                    head: "3",
                }
            },
            // 谢幕的dialog
            {
                dialog: {
                    name: "",
                    content: "达成结局【红颜薄命】",
                    head: "",
                },
                event: ["gameOver"]
            },
            // 谢幕的dialog
            // {
            //     dialog: {
            //         name: "",
            //         content: "",
            //         head: "",
            //     },
            //     event: ["nextScene"]
            // },
            // event
            // {
            //     event: ["goScene#2"]
            // }
        ],

        // 分剧情3
        [
            // 对话 周老汉
            {
                dialog: {
                    name: "",
                    content: "你不用担心，我周老四今天，非要让大家伙看看，我的独门绝技！（对着虬髯大汉）这位好汉，来吧！",
                    head: "0",
                }
            },
            // 对话 大汉
            {
                dialog: {
                    name: "",
                    content: "虬髯大汉对周老四砍了一刀，周老四瞬间倒地。",
                    head: "3",
                }
            },
            // 对话 女儿
            {
                dialog: {
                    name: "2",
                    content: "爹啊！呜呜呜……爹啊！(苦)",
                    head: "2",
                }
            },
            // 对话 观众
            {
                dialog: {
                    name: "1",
                    content: "（太可怜了！哎呀……（纷纷给钱）",
                    head: "1",
                }
            },
            // 对话 女儿
            {
                dialog: {
                    name: "2",
                    content: "(偷笑）嘿嘿嘿~",
                    head: "2",
                }
            },
            // 谢幕的dialog
            {
                dialog: {
                    name: "",
                    content: "",
                    head: "",
                },
                event: ["nextScene","addMQ#10"]
            },
        ],

    ],
]

// saveProcess

function getResultFromString(result) {
    let resultString = result.split(",")[0];
    let resultValue = result.split(",")[1];
    switch (resultString) {
        case "addLoveNpc1":
            break;
        case "addLoveNpc2":
            break;
        case "addMQ":
            break;
        case "goScene":
            break;
        case "leaveScene":
            break;
        case "startScene":
            break;
        case "goOver":
            break;
        case "goDialog":
            break;
    }
}

function over() {

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