import * as _GLOBAL_CONFIG_ from '@/global/global.config';
import DALUserInfoState from '@/dal/Global';
import fetch from '@/isomorphic/fetch';
import {
    action,
    computed,
    observable,
    runInAction,
    useStrict
    } from 'mobx';



class DALIndexPage {
    @observable bannerSrc: string = null;
    @observable price: string|number = null;
    @observable summary: string = null;
    @observable catalog: Array<string> = null;
    @observable audioSrc: string = null;
    @observable timePicker: Array<{label: string, value: string|number}> = null;
    @observable hasFetchData: boolean = false;
    @observable teacherImg: string = null;
    @observable teacherIntro: string = null;
    @observable isUserCanBuy: boolean = null;
    @observable misc: boolean = null;
    constructor() {
        this.fetchIndexPageState = this.fetchIndexPageState.bind(this);
        this.fetchSignUpNumber = this.fetchSignUpNumber.bind(this);
        this.fetchStartTime = this.fetchStartTime.bind(this);
        this.fetchCourseInfo = this.fetchCourseInfo.bind(this);
        this.fetchPayOrder = this.fetchPayOrder.bind(this);
    }
    @action
    fetchPayOrder(courseId: number, period: number) {
        return new Promise((resolve, reject) => {
            (window as any).WXSDK.wechatPay(JSON.stringify({
                "body": "商品成本费",
                "deal": {
                    "items": [
                        {
                            dealType: 103, // 交易类型
                            itemId: 1, // 基金课,应该改成全局
                            mchantType: 11, // 商品类型 21days
                            misc: period,
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
    // 查询课程人数是否已满
    @action
    fetchSignUpNumber(courseId: number) {
        return new Promise((resolve, reject) => {
            fetch(_GLOBAL_CONFIG_._API_DOMAIN_ + `/ctplus/signUpNumber/${courseId}`, {
                method: "GET",
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
                        this.isUserCanBuy = data.time;
                    });
                    resolve();
                });
            });
        });
    }
    // 查询开课时间
    @action
    fetchStartTime(courseId: number) {
        return new Promise((resolve, reject) => {
            fetch(_GLOBAL_CONFIG_._API_DOMAIN_ + `/ctplus/getstarttime/${courseId}`, {
                method: "GET",
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
                    console.log(data);
                    let count = 0;
                     // todo 时间选择
                    this.timePicker = data.map((value, index) => {
                        if (value.valid === false) {
                            return {
                                label: value.startTime.split(" ")[0];
                                value: count++,
                                period: value.period
                            };
                        }
                    });
                    resolve();
                });
            });
        });
    }
    // 查询课程信息
    @action
    fetchCourseInfo(courseId: number) {
        return new Promise((resolve, reject) => {
            fetch(_GLOBAL_CONFIG_._API_DOMAIN_ + `/ctplus/course/info/${courseId}`, {
                method: "GET",
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
                        this.bannerSrc = data.bannerSrc;
                        this.audioSrc = data.audioSrc;
                        this.price = data.price;
                        this.summary = data.summary;
                        this.catalog = data.catalog;
                        this.teacherImg = data.teacherImg;
                        this.teacherIntro = data.teacherIntro;
                        this.hasFetchData = true;
                    });
                    resolve();
                });
            });
        });
    }
    // 获取所有页面数据
    @action
    fetchIndexPageState (courseId: number) {
        return Promise.all([
            this.fetchSignUpNumber(courseId),
            this.fetchStartTime(courseId),
            this.fetchCourseInfo(courseId)
        ]);
    }
}

export default DALIndexPage;