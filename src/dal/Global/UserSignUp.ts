import {observable, action, runInAction} from "mobx";
import fetch from "@/isomorphic/fetch";

class DALUserSignUp {
    @observable isUserSignUp: boolean = null;
    @observable state: string = null;



    @action
    fetchDALUserSignUp() {
        setTimeout(function() {
            runInAction(() => {
                // todo 假数据
                this.isUserSignUp = false;
            });
        }.bind(this), 1000);
    }
}

export default new DALUserSignUp();