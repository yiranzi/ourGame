import {observable, action, runInAction} from "mobx";

import fetch from "@/isomorphic/fetch";
import * as _GLOBAL_CONFIG_ from "@/global/global.config";
import DALUserInfoState from "@/dal/global";

import {
    _fetchListenInfo_
} from "@/global/TinyCourseApp/fetch.interface";

class DALTinyListenPage {
    // 课程列表，保存课程id号
    @observable chapterArray: Array<number> = null;
    @observable listenArray: Array<any> = null;
    // 课程是否已开课
    constructor() {
        this.setChapterArray = this.setChapterArray.bind(this);
        this.fetchEnterListenInfo = this.fetchEnterListenInfo.bind(this);
        this.fetchListenInfo = this.fetchListenInfo.bind(this);
    }
    /**
     * 保存 chapterArray 并初始化听课内容数据容器
     * @param {Array<number>} chapterArray
     * @memberof DALTinyListenPage
     */
    @action
    setChapterArray(chapterArray: Array<number>) {
        this.chapterArray = chapterArray;
        // 根据长度初始化听课内容数组
        this.listenArray = new Array(chapterArray.length);
    }

    @action
    fetchEnterListenInfo(courseId: number | string) {
        // 获取本地保存听到第几章节记录
        let tinyCourseListenID = window.localStorage.getItem("tinycourse_" + courseId) || "0";
        // 获取首屏数据
        return new Promise((resolve, reject) => {
            this.fetchListenInfo(courseId, tinyCourseListenID).then((res: any) => {
                res
                    .json()
                    .then((data: any) => {
                        runInAction(() => {
                            // 对应章节
                            this.listenArray[parseInt(tinyCourseListenID)] = data;
                            resolve();
                        });
                    });
            });
        });
    }
    fetchListenInfo(courseId: number|string, tinyCourseListenID: number|string) {
        return fetch(_GLOBAL_CONFIG_._API_DOMAIN_ + _fetchListenInfo_ + courseId + "/" + tinyCourseListenID, {
            method: "GET",
            mode: "cors",
            headers: {
                "Accept": "application/json",
                "X-iChangTou-Json-Api-Token": _GLOBAL_CONFIG_._API_TOKEN_,
                "Content-Type": "application/json;charset=utf-8",
                "X-iChangTou-Json-Api-User": DALUserInfoState.userId,
                "X-iChangTou-Json-Api-Session": DALUserInfoState.sessionId
            }
        });
    }
}

export default DALTinyListenPage;