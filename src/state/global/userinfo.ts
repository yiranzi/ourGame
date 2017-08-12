import {observable, action} from "mobx";


class MUserInfo {
    @observable username: string = null;
    @observable openid: string = null;
}