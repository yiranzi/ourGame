import {observable, action, runInAction} from "mobx";

import fetch from "@/isomorphic/fetch";
import * as _GLOBAL_CONFIG_ from "@/global/global.config";
import DALUserInfoState from "@/dal/Global";

class DALCourseApp {
    // 一次启动只可能存在同一courseid，若courseid不同需要重新查询
    @observable courseId: number = null;
    // 用户是否报名
    @observable isUserBuy: boolean = false;
    // 课程是否已开课
    @observable isCourseStart: boolean = null;

    constructor() {
        this.fetchIsUerBuy = this.fetchIsUerBuy.bind(this);
    }
    /**
     * <Promise> 是否已经开课，若开课返回true
     * @param {number} courseId
     * @returns
     * @memberof DALCourseApp
     */
    @action
    fetchIsCourseStart(courseId: number) {
        return new Promise((resolve, reject) => {
            // 判断是否已经开课，如果已开课直接返回true，不再拉去数据
            // 但必须课程id与已查询的课程id相同，若不同需要重新查询
            if (this.isUserBuy && this.courseId === courseId) {
                resolve(true);
            } else {
                setTimeout(function() {
                    runInAction(() => {
                        this.isCourseStart = true;
                    });
                    resolve();
                }, 1000);
                // fetch(_GLOBAL_CONFIG_._API_DOMAIN_ + `/ctplus/WhetherSignUp/${courseId}`, {
                //     method: "PUT",
                //     mode: "cors",
                //     headers: {
                //         "Accept": "application/json",
                //         "X-iChangTou-Json-Api-Token": _GLOBAL_CONFIG_._API_TOKEN_,
                //         "Content-Type": "application/json;charset=utf-8",
                //         "X-iChangTou-Json-Api-User": DALUserInfoState.userId,
                //         "X-iChangTou-Json-Api-Session": DALUserInfoState.sessionId
                //     }
                // }).then((res: any) => {
                //     res
                //     .json()
                //     .then((data: any) => {
                //         runInAction(() => {
                //             this.courseId = courseId;
                //             this.isUserBuy = data;
                //         });
                //         resolve(data);
                //     });
                // });
            }
        });
    }
    /**
     * 获取用户登陆状态，判断是否报名，是否开课
     * @memberof DALCourseApp
     */
    @action
    fetchIsUerBuy(courseId: number) {
        // 判断用户是否已经报名，如果已报名直接返回true，不再拉去数据
        // 但必须课程id与已查询的课程id相同，若不同需要重新查询
        if (this.isUserBuy !== false && this.courseId === courseId) {
            return Promise.resolve(true);
        } else {
            return new Promise((resolve, reject) => {
                fetch(_GLOBAL_CONFIG_._API_DOMAIN_ + `/ctplus/WhetherSignUp/${courseId}`, {
                    method: "PUT",
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
                                this.courseId = courseId;
                                this.isUserBuy = data;
                                resolve(data);
                            });
                        });
                });
            });
        }
    }
}

export default DALCourseApp;