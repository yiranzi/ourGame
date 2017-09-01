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

    @observable userSignState: string = "pending";

    constructor() {
        this.fetchDALUserInfo = this.fetchDALUserInfo.bind(this);
        this.fetchDALUserSignState = this.fetchDALUserSignState.bind(this);
    }
    /**
     * 获取用户登陆状态，判断是否报名，是否开课
     * @memberof DALUserInfo
     */
    @action
    fetchDALUserSignState() {
        setTimeout(() => {
            runInAction(() => {
                this.userSignState = "indexPage";
            });
        }, 5000);
    }
    /**
     * 获取用户数据（授权）
     * @memberof DALUserInfo
     */
    @action
    fetchDALUserInfo() {
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
                });
            });
        } else {
            this.userId = tempUserInfo.userId;
            this.sessionId = tempUserInfo.sessionId;
            this.nickName = tempUserInfo.nickName;
            this.headImage = tempUserInfo.headImage;
            this.payOpenId = tempUserInfo.payOpenId;
            this.subscribe = tempUserInfo.subscribe;
            this.openId = tempUserInfo.subscribe;
        }
    }
}

export default DALUserInfo;