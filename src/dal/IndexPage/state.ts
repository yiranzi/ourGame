import {observable, useStrict, action, computed, runInAction} from "mobx";
import fetch from "@/isomorphic/fetch";

class DALIndexPage {
    @observable bannerSrc: string = null;
    @observable price: string|number = null;
    @observable summary: string = null;
    @observable catalog: Array<string> = null;
    @observable audioSrc: string = null;
    @observable timePicker: Array<{label: string, value: string|number}> = null;
    @observable hasFetchData: boolean = false;
    constructor() {
        this.fetchIndexPageState = this.fetchIndexPageState.bind(this);
    }
    @action
    fetchIndexPageState () {
        setTimeout(() => {
            runInAction(() => {
                this.price = 100;
                this.summary = "这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介v";
                this.catalog = ["基金指数", "基金定投", "定投场内外", "策略", "温度指数", "简投法"];
                this.timePicker = [
                    {
                        label: "8 月 31 日",
                        value: "8 月 31 日"
                      },
                      {
                        label: "9 月 31 日",
                        value: "9 月 31 日"
                      },
                  ];
                this.hasFetchData = true;
            });
        }, 500);
    }
}

export default DALIndexPage;