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
        let styleInner = {
            fontSize: '0.8rem',
            marginTop:'30px',
        };
        let styleBox = {

        };
        return(
            <div className={(className as any).nameBox}>
                <img className={(className as any).bg} src={this.props.boxImg}/>
                <TextView styleBox = {styleBox} styleInner = {styleInner}>{this.props.children}</TextView>
            </div>
        );
    }
};