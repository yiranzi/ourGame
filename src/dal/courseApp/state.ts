import {observable, action, runInAction} from "mobx";
import fetch from "@/isomorphic/fetch";

class DALCourseApp {
    @observable userSignState: string = "pending";

    constructor() {
        this.fetchDALUserSignState = this.fetchDALUserSignState.bind(this);
    }
    /**
     * 获取用户登陆状态，判断是否报名，是否开课
     * @memberof DALCourseApp
     */
    @action
    fetchDALUserSignState() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                runInAction(() => {
                    this.userSignState = "index";
                });
                resolve();
            }, 2000);
        });
    }
}

export default DALCourseApp;