import {observable, useStrict, action, computed, runInAction} from "mobx";


import DALUserInfoState from "@/dal/Global/UserInfo";

import fetch from "@/isomorphic/fetch";

import * as _GLOBAL_CONFIG_ from "@/global/global.config";

class DALcourseListen {
    @observable listenItem: Array<{
        id: number;
        image: string;
        isfree: number;
        status: number;
        title: string;
    }> = null;

    constructor() {
        this.fetchListenItem = this.fetchListenItem.bind(this);
    }
    /**
     * 提交作业
     * @param {(string|number)} type
     * @param {(string|number)} id
     * @returns
     * @memberof DALcourseListen
     */
    @action
    postWorkFinish(type: string|number, id: string|number) {
        return new Promise((resolve, reject) => {
            fetch(_GLOBAL_CONFIG_._API_DOMAIN_ + `/ctplus/complete/${type}/${id}`, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "X-iChangTou-Json-Api-Token": _GLOBAL_CONFIG_._API_TOKEN_,
                    "Content-Type": "application/json;charset=utf-8",
                    "X-iChangTou-Json-Api-User": DALUserInfoState.userId,
                    "X-iChangTou-Json-Api-Session": DALUserInfoState.sessionId
                }
            }).then((res: any) => {
                resolve();
                res
                .json()
                .then((data: any) => {
                    resolve();
                });
            });
        });
    }
    /**
     * <Promise> 获取听课列表
     * @param {number} courseId 课程id号
     * @param {number} dayId 天数id号
     * @returns
     * @memberof DALcourseListen
     */
    @action
    fetchListenItem(courseId: number, dayId: number) {
        return new Promise((resolve, reject) => {
            fetch(_GLOBAL_CONFIG_._API_DOMAIN_ + `/ctplus/checkpoint-progress/${dayId}`, {
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
                        this.listenItem = data;
                    });
                    resolve();
                });
            });
        });
    }
}

export default DALcourseListen;