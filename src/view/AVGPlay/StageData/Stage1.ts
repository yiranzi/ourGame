// const roleInfo = [
//     {
//         name: '周老四',
//         head: `${require("@/assets/image/Game/Stage1/boy_1.png")}`,
//     },
//     {
//         name: '围观群众',
//         head: `${require("@/assets/image/Game/Stage1/people_1.png")}`,
//     },
//     {
//         name: '周莹',
//         head: `${require("@/assets/image/Game/Stage1/girl_2.png")}`,
//     },
//     {
//         name: '虬髯大汉',
//         head: `${require("@/assets/image/Game/Stage1/people_2.png")}`,
//     },
// ]
//
// const bgImg = [
//
//     `${require("@/assets/image/Game/Stage1/bg_1.jpg")}`,
//     `${require("@/assets/image/Game/Stage1/bg_2.jpg")}`,
// ]

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
    // 测试场景
    /*
    [
        // 分剧情1
        [
            // 对话1
            {
                dialog: {
                    name: "",
                    content: "000",
                    head: "",
                },
                event: ["startScene#0"]
            },
            // 选择题
            // {
            //     dialog: {
            //         name: "",
            //         content: "（在街上闲逛）",
            //         head: "2",
            //     },
            //     quiz: {
            //         answerList: ['买一小块甑糕','大吃一顿','这钱来得不易，还是不买吧……'],
            //         answerResult: [
            //             [""],
            //             ["addMQ#-10"],
            //             ["addMQ#10"],
            //         ],
            //     }
            // },
            // 场景旁白
            {
                dialog: {
                    name: "",
                    content: "远处传来喧闹声——",
                    head: "",
                },

            },
            // 谢幕的dialog
            {
                dialog: {
                    name: "2",
                    content: "而后生下了一个孩子，成为姨娘",
                    head: "2",
                },
                event: ["addMQ#10","nextDialog"]
            },
// 谢幕的dialog 测试
            {
                dialog: {
                    name: "",
                    // content: "",
                    content: "因为你的机智 你们很快就靠卖艺家财万贯",
                    head: "",
                },
                // event: ["nextScene","addMQ#10"]
            },
            // 谢幕的dialog 测试
            {
                dialog: {
                    name: "",
                    // content: "",
                    content: "达成结局【机制的周莹】",
                    head: "",
                },
                event: ["stageOver"]
            },
        ]
    ],
    */

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
                event: ["nextScene","addMQ#10"]
                // event: ["nextScene"]
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
                event: ["startScene#1"]
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
                    content:  "泾阳的父老乡亲们，我父女二人初来乍到，有道是：脚踏贵地，眼望生人；长城高万丈，全靠朋友帮!",
                    head: "0",
                }
            },
            // 对话2
            {
                dialog: {
                    name: "0",
                    content:  "有钱的捧个钱场，没钱的请您回家取钱也捧个钱场，在下有礼了！（作揖）",
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
            // 对话4
            {
                dialog: {
                    name: "0",
                    content: "那周老四要拿出看家本事了！（脱衣服，发功）闺女，来！",
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
                    answerList: ['养父是老江湖了，让他来吧！(选这个)','养父毕竟年老，自己来'],
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
                    name: "",
                    content: "你屏住呼吸，怎奈修炼不到家，人一刀下去，你只觉腹部一痛，继而两眼一黑，你死了。",
                    head: "",
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
            // 谢幕的dialog 测试
            {
                dialog: {
                    name: "",
                    // content: "",
                    content: "",
                    head: "",
                },
                event: ["nextScene","addMQ#10"]
            },
        ],


    ],

    // 场景3
    [
        // 剧情1
        [
            // 入场
            {
                dialog: {
                    name: "",
                    content: "一番表演下来，养父给了你500文，让你买甑糕。",
                    head: "",
                },
                event: ["startScene#2"]
            },
            // 对话
            {
                dialog: {
                    name: "6",
                    content: "姑娘，买个煎饼吧！",
                    head: "",
                }
            },
            // 对话
            {
                dialog: {
                    name: "7",
                    content: "姑娘，来一块甑糕吧！",
                    head: "",
                }
            },
            // 对话
            {
                dialog: {
                    name: "8",
                    content: "姑娘，吃碗面吧！",
                    head: "",
                }
            },
            // 选择题
            {
                dialog: {
                    name: "",
                    content: "（在街上闲逛）",
                    head: "2",
                },
                quiz: {
                    answerList: ['买一小块甑糕','大吃一顿','这钱来得不易，还是不买吧……'],
                    answerResult: [
                        [""],
                        ["addMQ#-10"],
                        ["addMQ#10"],
                    ],
                }
            },
            // 场景旁白
            {
                dialog: {
                    name: "",
                    content: "远处传来喧闹声——",
                    head: "",
                },

            },
            // 对话 碰瓷
            {
                dialog: {
                    name: "9",
                    content: "哎哟！你撞了我，怎么不给银子？",
                    head: "9",
                },

            },
            // 场景旁白
            {
                dialog: {
                    name: "",
                    content: "一位年轻貌美的公子从轿子出来",
                    head: "",
                },

            },
            // 场景旁白
            {
                dialog: {
                    name: "",
                    content: "吴聘，泾阳第一大户——吴家东院少东家。",
                    head: "",
                },

            },
            // 对话 吴聘
            {
                dialog: {
                    name: "5",
                    content: "（弯腰）你没事吧？要不，我带你去看看大夫？",
                    head: "5",
                },
            },
            // 对话 碰瓷
            {
                dialog: {
                    name: "9",
                    content: "不用不用，你给我钱就行了！",
                    head: "9",
                },
            },
            // 对话 吴聘
            {
                dialog: {
                    name: "5",
                    content: "（犹豫状）还是去看看大夫吧！",
                    head: "5",
                },
            },
            // 对话 碰瓷
            {
                dialog: {
                    name: "9",
                    content: "（哭嚎）你这人，撞了人，怎么不给钱啊！我的腿都断了！",
                    head: "9",
                },
            },
            // 对话 群众
            {
                dialog: {
                    name: "1",
                    content: "啧啧啧……",
                    head: "1",
                }
            },
            // 对话 吴聘
            {
                dialog: {
                    name: "5",
                    content: "这……（为难状）",
                    head: "5",
                },
            },
            // 选择题
            {
                dialog: {
                    name: "",
                    content: "此时你",
                    head: "2",
                },
                quiz: {
                    answerList: ['眼不见为净，算了。','肥羊，要宰！'],
                    answerResult: [
                        [""],
                        ["addB1#10"],
                    ],
                }
            },
            // 对话 杜明礼
            {
                dialog: {
                    name: "10",
                    content: "（上前一步）我看看，你哪受伤了？（狠掐一下碰瓷的人的腿）",
                    head: "10",
                },
            },
            // 对话 碰瓷
            {
                dialog: {
                    name: "9",
                    content: "（跳起来）哎哟，疼死我了！",
                    head: "9",
                },
            },
            // 对话 杜明礼
            {
                dialog: {
                    name: "10",
                    content: "不是腿断了吗？",
                    head: "10",
                },
            },
            // 对话 碰瓷
            {
                dialog: {
                    name: "9",
                    content: "（装不下去，灰溜溜地跑了）",
                    head: "9",
                },
            },
            // 对话 吴聘
            {
                dialog: {
                    name: "5",
                    content: "多谢壮士仗义相助。",
                    head: "5",
                },
            },
            // 对话 杜明礼
            {
                dialog: {
                    name: "10",
                    content: "不客气，举手之劳而已。",
                    head: "10",
                },
            },
            // 对话 吴聘
            {
                dialog: {
                    name: "5",
                    content: "还请问壮士尊姓大名。",
                    head: "5",
                },
            },
            // 对话 杜明礼
            {
                dialog: {
                    name: "10",
                    content: "哦，区区小事，何足挂齿，贱名而已，不值一提（走了）。",
                    head: "10",
                },
            },
            // 对话 吴聘
            {
                dialog: {
                    name: "5",
                    content: "（真乃狭义之士啊！）",
                    head: "5",
                },
            },
            // 对话 周莹
            {
                dialog: {
                    name: "2",
                    content: "（灰头土脸状）哥哥！有没有看到我哥哥？",
                    head: "2",
                }
            },
            // 对话 吴聘
            {
                dialog: {
                    name: "5",
                    content: "你哥哥？你哥哥是谁？",
                    head: "5",
                },
            },
            // 对话 周莹
            {
                dialog: {
                    name: "2",
                    content: "刚才那个人是我哥哥，他、他跟你要钱了吗？",
                    head: "2",
                }
            },
            // 对话 吴聘
            {
                dialog: {
                    name: "5",
                    content: "（尴尬）额……没有……",
                    head: "5",
                },
            },
            // 对话 周莹
            {
                dialog: {
                    name: "2",
                    content: "对不起！对不起！我哥哥已经很久没做这种事了！都是因为……我爹去世了，娘眼睛瞎了，弟弟又快饿死了，妹妹前年已经卖给别人了!",
                    head: "2",
                }
            },
            // 对话 周莹
            {
                dialog: {
                    name: "2",
                    content: "我们一家人……实在是走投无路了！我哥哥拿了你多少钱，我这里有一块家传玉佩，抵给你！",
                    head: "2",
                }
            },
            // 对话 吴聘
            {
                dialog: {
                    name: "5",
                    content: "不不不，你哥哥并没有拿我的钱，他已经走了。",
                    head: "5",
                },
            },
            // 对话 周莹
            {
                dialog: {
                    name: "2",
                    content: "哦……那，您买我这块玉佩吗？十两……不，五两就好！",
                    head: "2",
                }
            },
            // 对话 吴聘
            {
                dialog: {
                    name: "5",
                    content: "（心怀不忍）玉佩你拿回去吧，这是你家传的，你收好。这是五两银子，你拿去给你家人买些吃的。",
                    head: "5",
                },
            },
            // 对话 周莹
            {
                dialog: {
                    name: "2",
                    content: "（哭）呜~公子你人真好！",
                    head: "2",
                }
            },
            // 对话 吴聘
            {
                dialog: {
                    name: "5",
                    content: "行了，赶紧回去吧！",
                    head: "5",
                },
            },
            // 对话 周莹
            {
                dialog: {
                    name: "2",
                    content: "谢谢公子！谢谢公子！（目送吴聘远去）",
                    head: "2",
                }
            },
            // 对话 周莹
            {
                dialog: {
                    name: "2",
                    content: "嘿嘿嘿！",
                    head: "2",
                },
                event: ["addMQ#10","nextDialog"]
            },
            // 谢幕的dialog 测试
            {
                dialog: {
                    name: "",
                    // content: "",
                    content: "因为你的机智 你们很快就靠卖艺家财万贯",
                    head: "",
                },
                // event: ["nextScene","addMQ#10"]
            },
            // 谢幕的dialog 测试
            {
                dialog: {
                    name: "",
                    // content: "",
                    content: "达成结局【机制的周莹】",
                    head: "",
                },
                event: ["stageOver"]
            },
        ]
    ],
]

export {stageData}
