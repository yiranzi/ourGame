// 角色信息和背景信息等常量 应该放到配置文件中
//角色信息
const roleInfo = [
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
        head: ``,
    },
    {
        name: '小贩2',// 7
        head: ``,
    },
    {
        name: '小贩3',// 8
        head: ``,
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
    {name: '丫鬟1',head:''},//11
    {name: '丫鬟2',head:''},//12



]

// 按照幕一个个的配置(这样的配置场景不好变换.需要修改)

const bgImg = [
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

const stageData = [

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

    // 场景0 //剧情介绍
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



    // 场景1 //卖艺
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
                    content: "那周老四要拿出看家本事了！（脱衣服，发功）闺女，来！",
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
                    content: "（惊讶状）闺女，你真要自己上？",
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
                event: ["gameOver","nextDialog"]
            },
            // 谢幕的dialog
            {
                dialog: {
                    name: "",
                    content: "",
                    head: "",
                },
                event: ["restart"]
            },
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
                    content: "爹啊！呜呜呜……爹啊！(哭泣)",
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

    // 场景2  //碰瓷
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
                        ["addB2#10"],
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
                    content: "",
                    head: "",
                },
                // event: ["nextScene","addMQ#10"]
            },

        ]
    ],

    // 场景3 //客栈
    [
        // 剧情0
        [
            {dialog: {content:"你独自一人在客栈中",name:"",head:""},
                event: ["startScene#3"]},//旁白
            {dialog: {content:"（进屋）哎哟~累死我啦！",name:"0",head:"0"}},//老汉
            {dialog: {content:"（鄙视状）爹，你又去赌了？",name:"2",head:"2"}},//周莹
            {dialog: {content:"哎呀，手气不好……",name:"0",head:"0"}},//老汉
            {dialog: {content:"全输光了？",name:"2",head:"2"}},//周莹
            {dialog: {content:"嘿嘿，我给你挑了个好人家！",name:"0",head:"0"}},//老汉
            {dialog: {content:"（无奈状）爹，你又把我卖了？",name:"2",head:"2"}},//周莹
            {dialog: {content:"这次是个大户人家，沈家你听过没有？这可是泾阳城，数一数二的豪门大户啊！#你，在那人家呆几天，然后找个时机，偷偷跑出来，咱爷俩继续去逍遥快活去！",name:"0",head:"0"}},//老汉
            // {dialog: {content:"",name:"0",head:"0"}},//老汉
            {dialog: {content:"此时你",name:"",head:""},
                quiz: {
                    answerList: ['不去！凭什么每次都把我卖掉还钱！','答应。'],
                    answerResult: [
                        ["goDialog#1"],
                        ["goDialog#2"],
                    ],
                }},
        ],
        // 剧情1
        [
            // {dialog: {content:"你表面上答应，半夜偷偷逃跑，从此一个人闯荡江湖。",name:"",head:""}},//旁白
            {dialog: {content:"你表面上答应，半夜偷偷逃跑，从此一个人闯荡江湖。达成结局【颠沛流离】",name:"",head:""},
                event: ["gameOver","nextDialog"]},//死亡界面
            {dialog: {content:"",name:"",head:""},
                event: ["restart"]},//复活
        ],
        // 剧情1
        [
            {dialog: {content:"",name:"",head:""},// 谢幕
                event: ["nextScene"]},
        ],
    ],

    // 场景4 二少爷房间
    [
        // 剧情0
        [
            {dialog: {content:"你被卖到了沈府，分配到二少爷房里当丫头。",name:"",head:""}},//旁白,
            {dialog: {content:"二少爷房间",name:"",head:""},
                event: ["startScene#4"]},//旁白
            {dialog: {content:"你是新来的啊？",name:"11",head:"11"}},//丫鬟1
            {dialog: {content:"听说，二少爷在外面花了一千两银子，被老爷打了，屁股开花，这会儿脾气正冲呢！",name:"11",head:"12"}},//丫鬟2
            {dialog: {content:"晚上你来给二少爷守夜吧！",name:"11",head:"11"}},//丫鬟1
            {dialog: {content:"此时你",name:"",head:""},//选择题
                quiz: {
                    answerList: ['直接答应。','可以是可以……'],
                    answerResult: [
                        ["goDialog#1"],
                        ["goDialog#2"],
                    ],
                }},
        ],
        // 剧情1
        [
            {dialog: {content:"",name:"",head:""},// 谢幕
                event: ["nextScene"]},
        ],
        // 剧情2
        [
            {dialog: {content:"可以是可以，不过……",name:"2",head:"2"}},//周莹
            {dialog: {content:"不过怎样？",name:"11",head:"11"}},//丫鬟1
            {dialog: {content:"不过啊，我要跟王妈妈说，你们借机偷懒，不给二少爷守夜，让他自己痛个半死，还欺负我这个新人。",name:"2",head:"2"}},//周莹
            {dialog: {content:"你！你这个新来的……别嚣张！",name:"11",head:"11"}},//丫鬟1
            {dialog: {content:"那你想怎样？",name:"11",head:"12"}},//丫鬟2
            {dialog: {content:"总得给我点封口费啊~~~",name:"2",head:"2"}},//周莹
            {dialog: {content:"……",name:"11",head:"11"}},//丫鬟1
            {dialog: {content:"……",name:"11",head:"12"}},//丫鬟2
            {dialog: {content:"好吧……这钱你拿去。",name:"11",head:"11"}},//丫鬟1
            {dialog: {content:"嘿嘿~",name:"2",head:"2"},// 周莹
            event:['addMQ#10','nextDialog']},
            {dialog: {content:"",name:"",head:""},// 谢幕
                event: ["nextScene"]},
        ],
    ],

    // 场景5 二少爷房间 黑夜
    [
        // 剧情0
        [
            {dialog: {content:"到了晚上",name:"",head:""},
                event: ["startScene#5"]},//旁白
            {dialog: {content:"哎哟！哎哟疼死我了！疼死我了！唔……（哼哼唧唧）",name:"4",head:"4"}},//沈星移
            {dialog: {content:"（恼怒被吵醒，从大厅床榻上起来，打了个哈欠）",name:"2",head:"2"}},//周莹
            {dialog: {content:"此时你",name:"",head:""},//选择题
                quiz: {
                    answerList: ['继续睡，不理他……','吵什么吵，我砍死你！'],
                    answerResult: [
                        ["goDialog#1"],
                        ["goDialog#2"],
                    ],
                }},
        ],
        // 剧情1
        [
            {dialog: {content:"你继续睡，没有理二少爷。后来，二少爷伤好了，因为你没有照顾他，他对你很生气，让管家把你赶出沈府。",name:"",head:""}},//旁白
            {dialog: {content:"你找到养父周老四，重新过上了江湖卖艺的生活。达成结局【颠沛流离】",name:"",head:""},
                event: ["gameOver","nextDialog"]},//死亡界面
            {dialog: {content:"",name:"",head:""},
                event: ["restart"]},//复活
        ],
        // 剧情2
        [
            {dialog: {content:"（你不情愿地起来，大吼道）吵什么吵？再吵，我砍死你！",name:"2",head:"2"}},//周莹
            {dialog: {content:"你、你个丫头，好大的胆子！",name:"4",head:"4"}},//沈星移
            {dialog: {content:"（出门）",name:"2",head:"2"}},//周莹
            {dialog: {content:"你去哪？你出去干什么去？少爷我在屋里！",name:"4",head:"4"}},//沈星移
            {dialog: {content:"磨刀！(院子里，你找些草药)",name:"2",head:"2"}},//周莹
            {dialog: {content:"（幸灾乐祸的样子）疼？",name:"2",head:"2"}},//周莹
            {dialog: {content:"哎哎哎……你要干什么？！",name:"4",head:"4"}},//沈星移
            {dialog: {content:"哼！（给沈星移敷药）",name:"2",head:"2"}},//周莹
            {dialog: {content:"……唔，挺清凉的……",name:"4",head:"4"}},//沈星移
            {dialog: {content:"舒服吧！",name:"2",head:"2"}},//周莹
            {dialog: {content:"……还不错，你这丫头，倒是有些能耐……",name:"4",head:"4"},
                event: ["addB1","nextDialog"]},//沈星移
            {dialog: {content:"",name:"",head:""},// 谢幕
                event: ["nextScene"]},
        ],
    ],

    // // 谢幕的dialog 测试
    // {
    //     dialog: {
    //         name: "",
    //         // content: "",
    //         content: "因为你的机智 你们很快就靠卖艺家财万贯",
    //         head: "",
    //     },
    //     // event: ["nextScene","addMQ#10"]
    // },
    // // 谢幕的dialog 测试
    // {
    //     dialog: {
    //         name: "",
    //         // content: "",
    //         content: "达成结局【机制的周莹】",
    //         head: "",
    //     },
    //     event: ["stageOver"]
    // },
]

export {stageData, roleInfo, bgImg}
