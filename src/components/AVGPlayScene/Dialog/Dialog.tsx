/**
 * Created by ichangtou on 2017/8/30.
 */

import * as React from "react";
import * as className from "./style/style.less";
import TextView from "@/components/AVGPlayScene/TextView/TextView";

interface DialogPropsTypes {
    boxImg: string; // 背景图片
}
interface StateTypes {
    currentLength: number,
    maxLength: 0,
    dialogContent: '',
    dialogView: '',
    timervalId: 0,
}

export default class Person extends React.Component<DialogPropsTypes> {
    constructor() {
        super();
    }

    componentWillReceiveProps(prop) {
        //终止
        if ( this.props.finishDialogNow ) {
            // this.finishDialogNow();
        } else {
            //初始化
            // this.initDialog(prop);
        }
    }

    initDialog(prop) {
        //保存
        let array = prop.children.split();
        //设置长度.
        let length = array.length;
        this.setState({
            currentLength: 0,
            maxLength: length,
        })
        //设置timer.
        this.state.timervalId = window.setInterval(this.finishDialogNow, this.props.speedInterval);
    }

    finishDialogNow () {
        console.log("finishDialogNow");
        if ( this.state.currentLength < this.state.maxLength - 1) {

        } else {
            this.state.currentLength = this.state.currentLength + 1;
            this.setState()
        }
    }
    render() {
        let styleBox = {
            justifyContent: "flex-start",
            marginLeft: "6rem",
            maxWidth: "20rem",

        };
        return(
            <div className={(className as any).container}>
                <img src={this.props.boxImg}/>
                <TextView styleBox = {styleBox}>{this.state.dialogView}</TextView>
            </div>
        );
    }

    transString() {
        currentLength: number,
            maxLength: 0,
            dialogContent: '',
            dialogView: '',
        return this.state.
    }
};