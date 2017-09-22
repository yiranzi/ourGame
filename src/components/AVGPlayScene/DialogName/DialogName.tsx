/**
 * Created by ichangtou on 2017/8/30.
 */

import * as React from "react";
import * as className from "./style/style.less";
import TextView from "@/components/AVGPlayScene/TextView/TextView";

interface DialogNamePropsTypes {
    boxImg: string; // 背景图片
}



export default class Person extends React.Component<DialogNamePropsTypes> {
    constructor() {
        super();
    }
    render() {
        let styleBox = {
            // position: 'absolute';
            // height: '100%';
            // width: "100%";
        };
        return(
            <div className={(className as any).container}>
                <img src={this.props.boxImg}/>
                <TextView styleBox = {styleBox}>{this.props.children}</TextView>
            </div>
        );
    }
};