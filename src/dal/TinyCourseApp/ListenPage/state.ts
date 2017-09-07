import {observable, action, runInAction} from "mobx";

import fetch from "@/isomorphic/fetch";
import * as _GLOBAL_CONFIG_ from "@/global/global.config";
import DALUserInfoState from "@/dal/global";

import {
    _fetchListenInfo_,
    _postListenAssignment_
} from "@/global/TinyCourseApp/fetch.interface";


class DALTinyListenPage {
    // 课程列表，保存课程id号
    @observable chapterArray: Array<number> = null;
    @observable listenArray: Array<any> = null;
    @observable listenIndex: number = null;
    // 课程是否已开课
    constructor() {
        this.setChapterArray = this.setChapterArray.bind(this);
        this.fetchEnterListenInfo = this.fetchEnterListenInfo.bind(this);
        this.fetchListenInfo = this.fetchListenInfo.bind(this);
    }
    /**
     * [private] 获取听课信息
     * @private
     * @param {(number|string)} courseId
     * @param {(number|string)} tinyCourseListenID
     * @returns
     * @memberof DALTinyListenPage
     */
    private fetchListenInfo(courseId: number|string, tinyCourseListenID: number|string) {
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
    /**
     * <promise> 获取首屏课程数据
     * @param {number | string} courseId
     * @param courseId
     */
    @action
    fetchEnterListenInfo(courseId: number | string) {
        // 获取本地保存听到第几章节记录
        let tinyCourseListenID = window.localStorage.getItem("tinycourse_" + courseId) || this.chapterArray[0].toString();
        // 获取首屏数据
        return new Promise((resolve, reject) => {
            this.fetchListenInfo(courseId, tinyCourseListenID).then((res: any) => {
                res
                    .json()
                    .then((data: any) => {
                        runInAction(() => {
                            // 对应章节
                            this.listenArray[parseInt(tinyCourseListenID)] = data;
                            // 赋值当前index
                            this.listenIndex = parseInt(tinyCourseListenID);
                            resolve();
                        });
                    });
            });
        });
    }
    /**
     * <promise> 传入courseId和tinyCourseListenID，获取听课信息
     * @param {(number | string)} courseId
     * @param {number} tinyCourseListenID
     * @returns
     * @memberof DALTinyListenPage
     */
    @action
    fetchListenInfoByIndex(courseId: number | string, index: number) {
        // 如果 tinyCourseListenID 对应array存在，则直接修改 listenIndex
        if (this.listenArray[index]) {
            this.listenIndex = index;
        }
        // 如果不存在， 异步获取数据，获取到之后再修改 listenIndex
        else {
           return new Promise((resolve, reject) => {
                this.fetchListenInfo(courseId, this.chapterArray[index]).then((res: any) => {
                    res
                        .json()
                        .then((data: any) => {
                            runInAction(() => {
                                // 对应章节
                                this.listenArray[index] = data;
                                // 赋值当前index
                                this.listenIndex = index;
                                // 保存到localstorage
                                window.localStorage.setItem("tinycourse_" + courseId, this.chapterArray[index].toString());
                                resolve();
                            });
                        });
                });
           });
        }
    }
    /**
     * <promise> 提交选择题，提交成功 resolve，失败 reject
     * @param {number} answer_id 答案id
     * @param {number} assignment_id 作业id
     * @param {boolean} isLasted 是否为最后一道题
     * @returns
     * @memberof DALTinyListenPage
     */
    @action
    postListenAssignment(answer_id: number, assignment_id: number, isLasted: boolean) {
        return new Promise ((resolve, reject) => {
            fetch(_GLOBAL_CONFIG_._API_DOMAIN_ + _postListenAssignment_, {
                method: "GET",
                body: {
                    answer_id,
                    assignment_id,
                    isLasted
                },
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
                        data ? resolve() : reject();
                    });
            });
        });
    }
}

export default DALTinyListenPage;