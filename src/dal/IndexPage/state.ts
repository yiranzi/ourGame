import {observable, action} from "mobx";
import fetch from "@/isomorphic/fetch";

class DALUserInfo {
    @observable username: string = null;
    @observable openid: string = null;
    @observable unionid: string = null;
}