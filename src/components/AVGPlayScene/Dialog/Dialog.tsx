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
        this.nextWordShow = this.nextWordShow.bind(this);
        this.state = {
            currentLength: 0,
            maxLength: 0,
            dialogArray: [],
            dialogView: '',
            timervalId: 0,
        };
    }

    componentWillMount() {
        this.init(this.props);
    }

    componentWillReceiveProps(prop) {
        this.init(prop);
    }

    init(prop) {
        // 如果已经完成 直接返回
        if (prop.finishDialog) {
            return;
        }
        // 如果需要立刻完成
        if ( prop.finishDialogNow ) {
            this.finishDialogNow();
        } else {
            //初始化
            this.initDialog(prop);
        }
    }

    initDialog(prop) {
        // 如果已经完成 或者 正在运行. 返回
        if(prop.finishDialog) {
            return
        }
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
        window.clearInterval(this.state.timervalId);
        this.state.timervalId = window.setInterval(this.nextWordShow, this.props.speedInterval);
    }

    // 下个字
    nextWordShow () {
        console.log("nextWordShow");
        if ( this.state.currentLength < this.state.maxLength - 1) {
            this.state.currentLength = this.state.currentLength + 1;
            this.setState({currentLength: this.state.currentLength});
        } else {
            window.clearInterval(this.state.timervalId);
            this.props.finishCalback();
        }
    }

    // 立刻完成
    finishDialogNow () {
        this.setState({
            currentLength: this.state.maxLength
        });
        console.log("finishDialogNow");
        window.clearInterval(this.state.timervalId);
        this.props.finishCalback();
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
        // console.log('transString')
        let array = this.state.dialogArray.slice(0,this.state.currentLength + 1);
        this.state.dialogView = array.join("");
        return(this.state.dialogView);
    }
};