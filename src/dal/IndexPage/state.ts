import {observable, useStrict, action, computed, runInAction} from "mobx";


import DALUserInfoState from "@/dal/Global";

import fetch from "@/isomorphic/fetch";
import * as _GLOBAL_CONFIG_ from "@/global/global.config";
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
    constructor() {
        this.fetchIndexPageState = this.fetchIndexPageState.bind(this);
        this.fetchSignUpNumber = this.fetchSignUpNumber.bind(this);
        this.fetchStartTime = this.fetchStartTime.bind(this);
        this.fetchCourseInfo = this.fetchCourseInfo.bind(this);
        this.fetchPayOrder = this.fetchPayOrder.bind(this);
    }
    @action
    fetchPayOrder(courseId: number) {
        return new Promise((resolve, reject) => {
            fetch(_GLOBAL_CONFIG_._API_DOMAIN_ + `payment/wx/jsapi/order`, {
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
                    resolve();
                });
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
                     // todo 时间选择
                    this.timePicker = [
                        {
                            label: "8 月 31 日",
                            value: 1
                        }, {
                            label: "9 月 31 日",
                            value: 2
                        }
                    ];
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
            this.fetchCourseInfo(courseId),
            this.fetchPayOrder(courseId)
        ]);
    }
}

export default DALIndexPage;