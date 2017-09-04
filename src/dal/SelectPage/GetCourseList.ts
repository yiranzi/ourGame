/**
 * Created by ichangtou on 2017/9/1.
 */
import {observable, action, runInAction} from "mobx";
import fetch from "@/isomorphic/fetch";

class DALGetCourseList {
    @observable dayCourseList = null;
    @observable id = null;
    @observable status = null;
    @observable title = null;

    @action
    fetchDayCourseList() {
        if ( this.dayCourseList === null ) {
            setTimeout(function() {
                runInAction(() => {
                    // todo 假数据
                    let data = [
                        {
                            id: 11,
                            status: 2,
                            title: "躺着挣钱1",
                        },
                        {
                            id: 12,
                            status: 1,
                            title: "躺着挣钱2",
                        },
                        {
                            id: 13,
                            status: -1,
                            title: "躺着挣钱3",
                        },
                    ];
                    this.dayCourseList = data;
                });
            }.bind(this), 0);
        }
    }

}

export default new DALGetCourseList();