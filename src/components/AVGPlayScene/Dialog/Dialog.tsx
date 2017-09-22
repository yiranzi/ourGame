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
    maxLength: number,
    dialogArray: Array,
    dialogView: String,
    timervalId: number,
}

export default class Person extends React.Component<DialogPropsTypes> {
    constructor() {
        super();
        this.initDialog = this.initDialog.bind(this);
        this.finishDialogNow = this.finishDialogNow.bind(this);
        this.state = {
            currentLength: 0,
            maxLength: 0,
            dialogArray: [],
            dialogView: '',
            timervalId: 0,
        };
    }

    componentWillMount() {
        if ( this.props.finishDialogNow ) {
            this.finishDialogNow();
        } else {
            //初始化
            this.initDialog(this.props);
        }
    }

    componentWillReceiveProps(prop) {
        //终止
        if ( this.props.finishDialogNow ) {
            this.finishDialogNow();
        } else {
            //初始化
            this.initDialog(prop);
        }
    }

    initDialog(prop) {
        //保存
        let array = prop.children.split("");
        //设置长度.
        let length = array.length;
        this.setState({
            currentLength: 0,
            maxLength: length,
            dialogArray: array,
        });
        //设置timer.
        this.state.timervalId = window.setInterval(this.finishDialogNow, this.props.speedInterval);
    }

    finishDialogNow () {
        console.log("finishDialogNow");
        if ( this.state.currentLength < this.state.maxLength - 1) {
            this.state.currentLength = this.state.currentLength + 1;
            this.setState({currentLength: this.state.currentLength});
        } else {
            window.clearInterval(this.state.timervalId);
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
                <TextView styleBox = {styleBox}>{this.transString()}</TextView>
            </div>
        );
    }

    transString() {
        console.log('transString')
        let array = this.state.dialogArray.slice(0,this.state.currentLength + 1);
        this.state.dialogView = array.join("");
        return(this.state.dialogView);
    }
};