import {observable, useStrict, action, computed, runInAction} from "mobx";


import DALUserInfoState from "@/dal/Global";

import fetch from "@/isomorphic/fetch";

import * as _GLOBAL_CONFIG_ from "@/global/global.config";

class DALWaitPage {
    @observable link: string = null;
    @observable qq: number = null;
    @observable secret: string = null;

    constructor() {
        this.fetchCourseInfo = this.fetchCourseInfo.bind(this);
    }
    /**
     * <Promise> 获取课程列表
     * @param {number} courseId
     * @returns
     * @memberof DALCourseList
     */
    @action
    fetchCourseInfo(courseId: number) {
        return new Promise((resolve, reject) => {
            fetch(_GLOBAL_CONFIG_._API_DOMAIN_ + ` /ctplus/qq-details/${courseId}`, {
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
                        this.link = data.link;
                        this.qq = data.qq;
                        this.secret = data.secret;
                    });
                    resolve();
                });
            });
        });
    }
}

export default DALWaitPage;