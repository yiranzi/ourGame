import DALUserInfoState from "@/dal/Global/UserInfo";
import fetch from "@/isomorphic/fetch";

// 引入页面接口
import {
    _fetchIndexInfo_
} from "@/global/TinyCourseApp/fetch.interface";
// 引入全局模块
import * as _GLOBAL_CONFIG_ from "@/global/global.config";


import {
    action,
    computed,
    observable,
    runInAction,
    useStrict
} from "mobx";

class DALIndexPage {
    /**
     * 封面图片
     * @type {string}
     * @memberof DALIndexPage
     */
    @observable cover: string = null;
    /**
     * 小课价格
     * @type {string}
     * @memberof DALIndexPage
     */
    @observable price: string = null;
    /**
     * 小课ID
     * @type {string}
     * @memberof DALIndexPage
     */
    @observable id: string = null;
    /**
     * 大纲
     * @type {Array<string>}
     * @memberof DALIndexPage
     */
    @observable outline: Array<string> = null;
    /**
     * 音频
     * @type {string}
     * @memberof DALIndexPage
     */
    @observable audio: string = null;
    /**
     * 小课介绍
     * @type {string}
     * @memberof DALIndexPage
     */
    @observable intro: string = null;
    /**
     * 定位地图
     * @type {string}
     * @memberof DALIndexPage
     */
    @observable position: string = null;
    /**
     * 教师信息
     * @type {{
     *         // 头像
     *         avatar: string;
     *         // 介绍
     *         intro: string;
     *         // 名字
     *         name: string;
     *     }}
     * @memberof DALIndexPage
     */
    @observable teacher: {
        // 头像
        avatar: string;
        // 介绍
        intro: string;
        // 名字
        name: string;
    } = null;
    /**
     * 标题
     * @type {string}
     * @memberof DALIndexPage
     */
    @observable title: string = null;
    /**
     * 用户是否可以购买
     * @type {boolean}
     * @memberof DALIndexPage
     */
    @observable isUserCanBuy: boolean = null;

    constructor() {
        this.fetchPayOrder = this.fetchPayOrder.bind(this);
        this.fetchIndexInfo = this.fetchIndexInfo.bind(this);
    }

    /**
     * 获取报名页信息
     * @param {(number | string)} tiny_course_id
     * @returns
     * @memberof DALIndexPage
     */
    @action
    fetchIndexInfo(tiny_course_id: number | string) {
        return new Promise ((resolve, reject) => {
            fetch(_GLOBAL_CONFIG_._API_DOMAIN_ + _fetchIndexInfo_ + tiny_course_id, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Accept": "application/json",
                    "X-iChangTou-Json-Api-Token": _GLOBAL_CONFIG_._API_TOKEN_,
                    "Content-Type": "application/json;charset=utf-8",
                    "X-iChangTou-Json-Api-User": DALUserInfoState.userId,
                    "X-iChangTou-Json-Api-Session": DALUserInfoState.sessionId
                }
            }).then((res: any) => {
                res
                    .json()
                    .then((data: any) => {
                        runInAction(() => {
                            // 数据赋值
                            this.audio = data.audio;
                            this.cover = data.cover;
                            this.id = data.id;
                            this.intro = data.intro;
                            this.outline = data.outline;
                            this.position = data.position;
                            this.price = data.price;
                            this.teacher = data.teacher;
                            this.title = data.title;
                            resolve();
                        });
                    });
            });
        });
    }

    @action
    fetchPayOrder(courseId: number) {
        return new Promise((resolve, reject) => {
            (window as any).WXSDK.wechatPay(JSON.stringify({
                "body": "商品成本费",
                "deal": {
                    "items": [
                        {
                            dealType: 103, // 交易类型
                            itemId: 1, // 基金课,应该改成全局
                            mchantType: 11, // 商品类型 21days
                            misc: "",
                            price: 1
                        }
                    ]
                },
                "openId": DALUserInfoState.payOpenId && DALUserInfoState
                    .payOpenId
                    .toString(),
                "sum": 1
            }));
            window.addEventListener("_dove_WxPay", (event) => {
                if (event.detail.success) {
                    resolve();
                } else {
                    reject();
                }
            });
        });
    }
}

export default DALIndexPage;