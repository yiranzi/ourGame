import {observable, useStrict, action, computed, runInAction} from "mobx";


import DALUserInfoState from "@/dal/Global";

import fetch from "@/isomorphic/fetch";

import * as _GLOBAL_CONFIG_ from "@/global/global.config";

class DALCourseList {
    @observable dayItem: Array<{
        id: number;
        image: string;
        isfree: number;
        status: number;
        title: string;
    }> = null;

    constructor() {
        this.fetchDayItem = this.fetchDayItem.bind(this);
    }
    /**
     * <Promise> 获取课程列表
     * @param {number} courseId
     * @returns
     * @memberof DALCourseList
     */
    @action
    fetchDayItem(courseId: number) {
        return new Promise((resolve, reject) => {
            fetch(_GLOBAL_CONFIG_._API_DOMAIN_ + `/ctplus/course-list/${courseId}`, {
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
                        this.dayItem = data;
                    });
                    resolve();
                });
            });
        });
    }
}

export default DALCourseList;