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
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                runInAction(() => {
                    this.bannerSrc = require("@/assets/image/IMG_1508.jpg");
                    this.audioSrc = "https://source.ichangtou.com/file/sound/d9a3e3f2/30/0/1.mp3";
                    this.price = 100;
                    this.summary = "这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介v";
                    this.catalog = ["基金指数", "基金定投", "定投场内外", "策略", "温度指数", "简投法"];
                    this.timePicker = [
                        {
                            label: "8 月 31 日",
                            value: 1
                          },
                          {
                            label: "9 月 31 日",
                            value: 2
                          },
                      ];
                    this.hasFetchData = true;
                });
                resolve();
            }, 2000);
        });
    }
}

export default DALIndexPage;