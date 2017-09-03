import {observable, action, runInAction} from "mobx";
import fetch from "@/isomorphic/fetch";

class DALUserInfo {
    @observable username: string = null;
    @observable userId: string = null;
    @observable openId: string = null;
    @observable nickName: string = null;
    @observable headImage: string = null;
    @observable payOpenId: string = null;
    @observable subscribe: string = null;
    @observable sessionId: string = null;
    @observable hasFetchData: boolean = false;
    constructor() {
        this.fetchDALUserInfo = this.fetchDALUserInfo.bind(this);
    }
    /**
     * 获取用户数据（授权）
     * @memberof DALUserInfo
     */
    @action
    fetchDALUserInfo() {
        return new Promise((resolve, reject) => {
            let tempUserInfo = JSON.parse(window.sessionStorage.getItem("wx-user-info"));
            if (tempUserInfo === null) {
                window.addEventListener("_dove_FetchEvent", event => {
                    runInAction(() => {
                        let tempUserInfo = JSON.parse(window.sessionStorage.getItem("wx-user-info"));
                        this.userId = tempUserInfo.userId;
                        this.sessionId = tempUserInfo.sessionId;
                        this.nickName = tempUserInfo.nickName;
                        this.headImage = tempUserInfo.headImage;
                        this.payOpenId = tempUserInfo.payOpenId;
                        this.subscribe = tempUserInfo.subscribe;
                        this.openId = tempUserInfo.subscribe;
                        this.hasFetchData = true;
                    });
                    resolve();
                });
            } else {
                this.userId = tempUserInfo.userId;
                this.sessionId = tempUserInfo.sessionId;
                this.nickName = tempUserInfo.nickName;
                this.headImage = tempUserInfo.headImage;
                this.payOpenId = tempUserInfo.payOpenId;
                this.subscribe = tempUserInfo.subscribe;
                this.openId = tempUserInfo.subscribe;
                this.hasFetchData = true;
                resolve();
            }
        });
    }
}

export default DALUserInfo;