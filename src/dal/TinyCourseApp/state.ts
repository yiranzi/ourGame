import {observable, action, runInAction} from "mobx";

import fetch from "@/isomorphic/fetch";
import * as _GLOBAL_CONFIG_ from "@/global/global.config";
import DALUserInfoState from "@/dal/Global/UserInfo";

import {
    _fetchIsUserBuy_
} from "@/global/TinyCourseApp/fetch.interface";

class DALTinyCourseApp {
    // 一次启动只可能存在同一courseid，若courseid不同需要重新查询
    @observable courseId: number = null;
    // 用户是否报名
    @observable isUserBuy: boolean = false;
    // 课程列表，保存课程id号
    @observable chapterArray: Array<number> = null;
    // 课程是否已开课
    constructor() {
        this.fetchIsUerBuy = this.fetchIsUerBuy.bind(this);
    }
    /**
     * <promise> 获取用户登陆状态，判断是否报名，若已报名，保存chapterArray，并resolve(chapterArray)，否则resolve(false)
     * @param {number} tiny_course_id 课程id号
     * @returns {Promise}
     * @memberof DALTinyCourseApp
     */
    @action
    fetchIsUerBuy(tiny_course_id: number) {
        // 判断用户是否已经报名，如果已报名直接返回true，不再拉去数据
        // 但必须课程id与已查询的课程id相同，若不同需要重新查询
        return Promise.resolve(false);
        if (this.isUserBuy !== false && this.courseId === tiny_course_id) {
            return Promise.resolve(true);
        } else {
            return new Promise((resolve, reject) => {
                fetch(_GLOBAL_CONFIG_._API_DOMAIN_ + _fetchIsUserBuy_ + tiny_course_id, {
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
                                this.courseId = tiny_course_id;
                                this.isUserBuy = data.isQualified;
                                if (data.isQualified) {
                                    this.chapterArray = data.chapterArray;
                                    resolve(data.chapterArray);
                                }
                                resolve(false);
                            });
                        });
                });
            });
        }
    }
}

export default DALTinyCourseApp;