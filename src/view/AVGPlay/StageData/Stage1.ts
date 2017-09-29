// 角色信息和背景信息等常量 应该放到配置文件中
//角色信息
const roleInfo = [
    {
        // 0
        name: '周老四',
        head: `${require("@/assets/image/Game/Stage1/b5.png")}`,
    },
    {
        name: '围观群众',// 1
        head: `${require("@/assets/image/Game/Stage1/people_2.png")}`,
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
        name: '沈星移',// 4
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
        head: `${require("@/assets/image/Game/Stage1/people_1.png")}`,
    },
    {
        // 10
        name: '杜明礼',
        head: `${require("@/assets/image/Game/Stage1/b6.png")}`,
    },
    {name: '丫鬟1',head:''},//11
    {name: '丫鬟2',head:''},//12
    {name: '沈太太',head:`${require("@/assets/image/Game/Stage1/g3.png")}`},//13
    {name: '沈老太',head:''},//14
    {name: '小伍',head:''},//15
    {name: '学堂师父',head:`${require("@/assets/image/Game/Stage1/b7.png")}`},//16
    {name: '王世均',head:`${require("@/assets/image/Game/Stage1/b8.png")}`},//17
    {name: '???',head:`???`},//18
    {name: '吴老爷',head:''},//19
    {name: '吴聘表弟',head:''},//20
    {name: '吴夫人',head:''},//21
    {name: '二叔',head:''},//22
    {name: '洋人',head:''},//23
    {name: '王妈妈',head:''},//24



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
    `${require("@/assets/image/Game/Stage1/10.jpg")}`,// 12 庭院
    `${require("@/assets/image/Game/Stage1/11.jpg")}`,// 13 书房
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
            {
                dialog: {
                    name: "2",
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
                },
                event: ["startScene#0"]
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
                event: ["nextScene"]
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
                    content: "",
                    head: "",
                }
            },
            // 谢幕的dialog
            {
                dialog: {
                    name: "",
                    content: "你屏住呼吸，怎奈修炼不到家，人一刀下去，你只觉腹部一痛，继而两眼一黑，你死了。达成结局【红颜薄命】",
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
            // 对话 女儿
            {
                dialog: {
                    name: "",
                    content: "",
                    head: "",
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
            // 谢幕
            {
                dialog: {
                    name: "",
                    content: "",
                    head: "",
                },
            },
            // 谢幕
            {
                dialog: {
                    name: "",
                    content: "",
                    head: "",
                },
                event: ["nextScene"]
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
            {dialog: {content:"听说，二少爷在外面花了一千两银子，被老爷打了，屁股开花，这会儿脾气正冲呢！",name:"12",head:"12"}},//丫鬟2
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
            {dialog: {content:"那你想怎样？",name:"12",head:"12"}},//丫鬟2
            {dialog: {content:"总得给我点封口费啊~~~",name:"2",head:"2"}},//周莹
            // {dialog: {content:"……",name:"11",head:"11"}},//丫鬟1
            {dialog: {content:"……",name:"12",head:"12"}},//丫鬟2
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
                event: ["startScene#4"]},//旁白
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
                event: ["addB1#10","nextDialog"]},//沈星移
            {dialog: {content:"",name:"",head:""},// 谢幕
                event: ["nextScene"]},
        ],
    ],

    // 场景6 沈府大厅
    [
        // 剧情0
        [
            {dialog: {content:"沈府大厅",name:"",head:""},
                event: ["startScene#5"]},//旁白
            {dialog: {content:"二少爷沈星移说闷，要搭理他吗？",name:"",head:"4"},//选择题
                quiz: {
                    answerList: ['要！给他讲故事——','要！给他变戏法——','懒得理他'],
                    answerResult: [
                        ["addB1#20"],
                        ["addB1#10","addMQ#10","nextDialog"],
                        [],
                    ],
                }},
            {dialog: {content:"娘，星儿这么大了，总是在外头野也不是办法啊！你看这回把他爹气的……",name:"13",head:"13"}},//沈太太
            {dialog: {content:"你心疼儿子，我就不心疼我孙子？！（哭）那你说，怎么办？",name:"14",head:"14"}},//老太
            {dialog: {content:"不如，给他找一个通房丫头，让他收收心！",name:"13",head:"13"}},//沈太太
            {dialog: {content:"嗯……他也大了，有个人管着他，倒比出去浪好得多……",name:"14",head:"14"}},//老太
            {dialog: {content:"娘，那您同意了？可有合适的人选？",name:"13",head:"13"}},//沈太太
            {dialog: {content:"我听说……她房里有个新来的丫头，叫、叫周莹，是吧？",name:"14",head:"14"}},//老太
            {dialog: {content:"我知道她，但这丫头，性子太野，我怕管不住……",name:"13",head:"13"}},//沈太太
            {dialog: {content:"哎呀，说这个丫头可有能耐了，她用的偏方，比名医的还管用。你啊，难得星儿自己喜欢，反正是个通房丫头。#以后顶多当个姨娘，这一回你不依他，他指不定再跟你弄什么幺蛾子呢！",name:"14",head:"14"}},//老太
            {dialog: {content:"娘说的是……那我去叫周莹过来。",name:"13",head:"13"}},//沈太太
            {dialog: {content:"太太、老太太！",name:"2",head:"2"}},//周莹
            {dialog: {content:"嗯……从今天开始，你做星儿的通房丫头，照例负责二少爷的起居。#只是月利，给你从两百钱涨到2两银子，如果生下一男半女，那就升任姨娘。",name:"13",head:"13"}},//沈太太
            {dialog: {content:"你才来几天啊，夫人，老夫人，给你这么大的恩宠，还不快跪下谢恩？！",name:"24",head:""}},//王妈妈
            {dialog: {content:"此时你",name:"",head:""},//选择题
                quiz: {
                    answerList: ['答应','不答应'],
                    answerResult: [
                        ["goDialog#1"],
                        ["goDialog#2"],
                    ],
                }},
        ],
        // 剧情1
        [
            {dialog: {content:"你成为了沈星移的通房丫头，而后生下了一个孩子，成为姨娘。达成结局【终身为妾】",name:"",head:""},
                event: ["gameOver","nextDialog"]},//死亡界面
            {dialog: {content:"",name:"",head:""},
                event: ["restart"]},//复活
        ],
        // 剧情2
        [
            {dialog: {content:"（笑）夫人，我还是当普通丫头吧！",name:"2",head:"2"}},//周莹
            {dialog: {content:"为什么？",name:"13",head:"13"}},//沈太太
            {dialog: {content:"我从没想嫁给二少爷。",name:"2",head:"2"}},//周莹
            {dialog: {content:"你这丫头，怎么说话的，这是你能想的吗？",name:"24",head:""}},//王妈妈
            {dialog: {content:"怎么？我自己的终身大事，我不能想？！",name:"2",head:"2"}},//周莹
            {dialog: {content:"你……",name:"24",head:""}},//王妈妈
            {dialog: {content:"……你先回去吧。",name:"13",head:"13"}},//沈太太
            {dialog: {content:"",name:"",head:""}},// 谢幕
            {dialog: {content:"",name:"",head:""},// 谢幕
                event: ["nextScene"]},
        ],
    ],

    // 场景7 周莹房间
    [
        // 剧情0
        [
            {dialog: {content:"周莹房间",name:"",head:""},
                event: ["startScene#6"]},//旁白},
            {dialog: {content:"（收拾细软）此处是非之地，赶紧跑路！",name:"2",head:"2"}},//周莹
            {dialog: {content:"（推门而入）,你怎么回事？",name:"4",head:"4"}},//沈星移
            {dialog: {content:"我没怎么啊……",name:"2",head:"2"}},//周莹
            {dialog: {content:"明知故问！",name:"4",head:"4"}},//沈星移
            {dialog: {content:"懒得跟你废话……",name:"2",head:"2"}},//周莹
            {dialog: {content:"（周莹作势要走，被沈星移一把拉住，踢上门）",name:"4",head:"4"}},//沈星移
            {dialog: {content:"你既然敬酒不吃吃罚酒，那就别怪我对你不客气！",name:"4",head:"4"}},//沈星移
            {dialog: {content:"你想干吗？!",name:"2",head:"2"}},//周莹
            {dialog: {content:"行驶我少爷的权力！（周莹被推倒惹……）",name:"4",head:"4"}},//沈星移
            {dialog: {content:"此时你",name:"",head:"4"},//选择题
                quiz: {
                    answerList: ['从了','踢他'],
                    answerResult: [
                        ["goDialog#1"],
                        ["goDialog#2"],
                    ],
                }},
        ],
        // 剧情1
        [
            {dialog: {content:"",name:"",head:""}},//沈星移
            {dialog: {content:"你成为了沈星移的通房丫头，而后生下了一个孩子，成为姨娘。达成结局【终身为妾】",name:"",head:""},
                event: ["gameOver","nextDialog"]},//死亡界面
            {dialog: {content:"",name:"",head:""},
                event: ["restart"]},//复活
        ],
        // 剧情2
        [
            {dialog: {content:"流氓！（踢他一脚，夺门而出）",name:"2",head:"2"}},//周莹
            {dialog: {content:"哎哟！给我抓住她!!",name:"4",head:""}},//沈星移
            {dialog: {content:"",name:"",head:""},// 切换场景
                event: ["startScene#12"]},
            {dialog: {content:"你到处跑，到处都是人在追你，此时，你在院子里看到一台轿子",name:"",head:""}},
            {dialog: {content:"怎么是你？",name:"5",head:"5"}},// 吴聘
            {dialog: {content:"周莹！看我不打死你！周莹！你给我出来！",name:"4",head:"4"}},//沈星移
            {dialog: {content:"求求你，带我走。",name:"2",head:"2"}},//周莹
            {dialog: {content:"……好",name:"5",head:"5"}},// 吴聘
            {dialog: {content:"你跟着吴聘来到吴家东院，成为了吴府的丫头。",name:"",head:""}},// 旁白
            {dialog: {content:"",name:"",head:""},// 谢幕
                event: ["nextScene","addB2#10"]},
        ],
    ],

    // 场景8 学徒房
    [
        // 剧情0
        [
            {dialog: {content:"你在吴家东院待了几天,干干活。",name:"",head:""},
                event: ["startScene#7"]},//旁白},
            {dialog: {content:"活都干完了，去哪呢？",name:"",head:"2"},//选择题
                quiz: {
                    answerList: ['学徒房','继续去看看有什么活'],
                    answerResult: [
                        ["addMQ#10"],
                        [],
                    ],
                }},
            {dialog: {content:"生意要勤快，切勿懒惰，懒惰则百事废；#接纳要谦和，切勿暴躁，暴躁则交易少……#人弃我取，人取我予，意思是说...#别人不要的时候我要，别人要的时候我不要……小伍，我刚刚说什么？",name:"16",head:"16"}},//师傅
            {dialog: {content:"师父，您说，要……不要……",name:"15",head:""}},//小伍
            {dialog: {content:"（怒）到底要，还是不要？",name:"16",head:"16"}},//师傅
            {dialog: {content:"哈哈哈……（你发出一阵杠铃般的笑声）",name:"2",head:"2"}},//周莹
            {dialog: {content:"谁在那里？你是何人？自己不知，还口出狂言！",name:"16",head:"16"}},//师傅
            {dialog: {content:"我啊？谁说我不知道！不就是说做生意，要和别人想的不一样，才能赚到钱吗？",name:"2",head:"2"}},//周莹
            {dialog: {content:"放肆……哼！",name:"16",head:"16"}},//师傅
            {dialog: {content:"哎，我说你……",name:"2",head:"2"}},//周莹
            {dialog: {content:"学徒中的优等生。",name:"17",head:"17"}},//王世均
            {dialog: {content:"你刚刚说的很对，你很有经营天赋，不如，我跟少爷说说，让你在学徒房当学徒吧！",name:"17",head:"17"}},//王世均
            {dialog: {content:"此时你",name:"",head:"17"},//选择题
                quiz: {
                    answerList: ['让他说','自己去说！'],
                    answerResult: [
                        ["goDialog#1"],
                        ["goDialog#2"],
                    ],
                }},
        ],
        // 剧情1
        [
            {dialog: {content:"王世均成功说服吴聘让你当学徒，此后你二人同窗，朝夕相处，渐生情谊，吴聘答应给你二人做媒。",name:"",head:""}},//
            {dialog: {content:"后来王世均成为商行掌柜，你成为掌柜夫人，平平淡淡过完一生。达成结局【小富即安】",name:"",head:""},
                event: ["stageOver","nextDialog"]},//死亡界面
            {dialog: {content:"",name:"",head:""},
                event: ["restart"]},//复活
        ],
        // 剧情2
        [
            {dialog: {content:"",name:"",head:""}},// 旁白
            {dialog: {content:"",name:"",head:""},// 谢幕
                event: ["nextScene","addB2#10"]},
        ],
    ],

    // 场景9 吴聘房间
    [
        // 剧情0
        [
            {dialog: {content:"你来到了吴聘的房间",name:"",head:""},
                event: ["startScene#13"]},//旁白},

            {dialog: {content:"所以我之前的，都是骗你的。",name:"2",head:"2"}},//周莹
            {dialog: {content:"你有没有想过，你骗人，只能赚到小钱，不骗人，反而能赚大钱。",name:"5",head:"5"}},//吴聘
            {dialog: {content:"大钱？",name:"2",head:"2"}},//周莹
            {dialog: {content:"是啊，我们吴家能有今天，都是因为“诚信”二字，答应我，以后再也不要骗人，堂堂正正赚钱。",name:"5",head:"5"}},//吴聘
            {dialog: {content:"此时你的选择",name:"",head:"2"},//选择题
                quiz: {
                    answerList: ['答应。','质疑。'],
                    answerResult: [
                        ["addB2#10","goDialog#1"],
                        ["goDialog#2"],
                    ],
                }},

        ],
        // 剧情1
        [
            {dialog: {content:"",name:"",head:""}},// 旁白
            {dialog: {content:"",name:"",head:""},// 谢幕
                event: ["nextScene"]},
        ],
        // 剧情2
        [
            {dialog: {content:"难道遇险，只有骗人才能逃跑，也不骗人嘛？如果生命受到威胁，只有撒谎才能救得了自己，也不骗人吗？",name:"2",head:"2"}},//周莹
            {dialog: {content:"……非常时期，自然要有非常手段，我说的是一般情况。",name:"5",head:"5"}},//吴聘
            {dialog: {content:"哦……好，我答应你。",name:"2",head:"2"}},//周莹
            {dialog: {content:"",name:"",head:""}},// 旁白
            {dialog: {content:"",name:"",head:""},// 谢幕
                event: ["nextScene","addMQ#10"]},
        ],
    ],

    // 场景10 东院大门
    [
        // 剧情0
        [
            {dialog: {content:"吴聘在外经商归家途中，被人打伤了，昏迷不醒，药石罔顾。",name:"",head:""},
                event: ["startScene#9"]},//旁白},
            {dialog: {content:"后有算命先生说，须于今日酉时成亲冲喜，方能醒转。#吴聘已和古月绸缎庄的胡小姐定亲，胡小姐答应今日酉时嫁过来。",name:"",head:""}},// 旁白
            {dialog: {content:"怎么？没奏乐？",name:"19",head:""}},//老爷
            {dialog: {content:"我没能把胡小姐接回来。",name:"20",head:""}},//表弟
            {dialog: {content:"什么？",name:"21",head:""}},//夫人
            {dialog: {content:"胡老爷说，他无能为力。",name:"22",head:""}},//二叔
            {dialog: {content:"大哥，马上到酉时了，再不成亲的话，吴聘可能就醒不过来了。",name:"19",head:""}},//老爷
            {dialog: {content:"此时你的选择",name:"",head:"2"},//选择题
                quiz: {
                    answerList: ['不出声。','我来!'],
                    answerResult: [
                        ["goDialog#1"],
                        ["goDialog#2"],
                    ],
                }},
        ],
        // 剧情1
        [
            {dialog: {content:"",name:"",head:""}},// 旁白
            {dialog: {content:"吴聘没有醒过来，不久就去世了。老爷白发人送黑发人，过不久也去世了#剩下夫人一个人无力支撑吴家生意，吴家东院日渐没落#你转而去找你爹，重新过上了江湖卖艺的生活。达成结局【颠沛流离】",name:"",head:""},//
                event: ["stageOver","nextDialog"]},//死亡界面
            {dialog: {content:"",name:"",head:""},
                event: ["restart"]},//复活
        ],
        // 剧情2
        [
            {dialog: {content:"我来！不就是成亲吗？娶谁不一样！",name:"2",head:"2"}},// 周莹
            {dialog: {content:"（惊讶状）……奏乐啊！你们还等什么？",name:"19",head:""}},// 老爷
            {dialog: {content:"",name:"",head:""},// 谢幕
                event: ["nextScene"]},
        ],
    ],

    // 场景11 街道
    [
        // 剧情0
        [
                {dialog: {content:"吴聘醒了。对你百般呵护。#你渐渐地喜欢上了吴聘，新婚燕尔，如胶似漆。吴聘还带你去街上。",name:"",head:""},
                event: ["startScene#9"]},//旁白},
            {dialog: {content:"姑娘……",name:"23",head:""}},// 洋人
            {dialog: {content:"我？",name:"2",head:"2"}},// 周莹
            {dialog: {content:"对，对，就是你。",name:"23",head:""}},// 洋人
            {dialog: {content:"有什么事吗？",name:"2",head:"2"}},// 周莹
            {dialog: {content:"我这里有瓶“神奇药水”，以后有奇效，你收好了。",name:"23",head:""}},// 洋人
            {dialog: {content:"？？？（你一头雾水，还是收了）",name:"2",head:"2"}},// 周莹
            {dialog: {content:"好久没吃甑糕了，这次要买一大块！",name:"2",head:"2"}},// 周莹
            {dialog: {content:"",name:"",head:""}},// 旁白
            {dialog: {content:"回到家后。",name:"",head:""},
                event: ["startScene#13"]},// 旁白
            {dialog: {content:"周莹，买什么好东西了？",name:"5",head:"5"}},// 吴聘
            {dialog: {content:"看！",name:"2",head:"2"}},// 周莹
            {dialog: {content:"这是什么？",name:"5",head:"5"}},// 吴聘
            {dialog: {content:"甑糕啊！我最爱吃的！你也尝一口啊！",name:"2",head:"2"}},// 周莹
            {dialog: {content:"我向来不吃甜食的。",name:"5",head:"5"}},// 吴聘
            {dialog: {content:"吃一口嘛！有些事，这辈子总要试试，我敢打赌，你吃过之后，会发现这辈子从没吃过这么好吃的东西。",name:"2",head:"2"}},// 周莹
            {dialog: {content:"（犹豫着咬了一口）",name:"5",head:"5"}},// 吴聘
            {dialog: {content:"（星星眼）怎么样？好吃吗？",name:"2",head:"2"}},// 周莹
            {dialog: {content:"好……呃……",name:"5",head:"5"}},// 吴聘
            {dialog: {content:"忽然，吴聘面色痛苦，口吐白沫，倒地昏迷不醒。#你慌了，此时家丁丫鬟都围上来。#吴聘气息逐渐微弱，眼看就要不行了。",name:"",head:""}},// 旁白
            {dialog: {content:"你忽然想起街上洋人给你的“神奇药水”，此时你",name:"",head:"2"},//选择题
                quiz: {
                    answerList: ['来路不明的东西！不用药水。','赌一赌吧！'],
                    answerResult: [
                        ["goDialog#1"],
                        ["goDialog#2"],
                    ],
                }},
        ],
        // 剧情1
        [
            {dialog: {content:"",name:"",head:""}},// 旁白
            {dialog: {content:"吴聘死了，过不久，老爷白发人送黑发人，悲恸欲绝，也死了。你不得已挑起家族大梁。#由于你颇具经商头脑，而后联合西院和南院一起，把吴家产业越做越大#最后成为了陕西女首富，被慈禧封为“一品诰命夫人”#你的美名人人传颂，名垂青史，但你终身未嫁，为吴聘守了一生寡。达成结局【陕西首富】",name:"",head:""},//
                event: ["stageOver","nextDialog"]},
            {dialog: {content:"",name:"",head:""},
                event: ["restart"]},//复活
        ],
        // 剧情2
        [
            {dialog: {content:"吴聘又醒了!",name:"",head:"5"}},// 旁白
            {dialog: {content:"",name:"",head:""}},// 旁白
            {dialog: {content:"原来，神奇药水是吴聘的脑残粉托洋人穿越过去给你送的解药,你们过上了幸福的生活。达成结局【吴聘结局】",name:"",head:""},//
                event: ["finalWin"]},//胜利界面
            // {dialog: {content:"#从此，你和吴聘过上了幸福的生活。达成结局【吴聘结局】",name:"",head:""},
            //     event: ["stageOver"]},//胜利界面},//
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
