/**
 * Created by ichangtou on 2017/8/30.
 */

import * as React from "react";
import * as className from "./style/style.less";
import TextView from "@/components/AVGPlayScene/TextView/TextView";
interface DialogPropsTypes {
    content: string; // 背景图片
}
interface StateTypes {

}

export default class Person extends React.Component<DialogPropsTypes> {
    constructor() {
        super();
        this.cbfClick = this.cbfClick.bind(this);
    }

    render() {
        let styleInner = {
            fontSize: '1rem',
            marginLeft: '20px',
        };
        let styleBox = {
            alignItems: 'flex-start',
            marginTop: "36px",

        };
        return(
            <div onClick = {this.cbfClick} className={(className as any).quizBar}>
                <img className={(className as any).bg} src={require("@/assets/image/Game/answerBox.png")}/>
                <TextView styleBox = {styleBox} styleInner = {styleInner}>{this.props.content}</TextView>
            </div>
        );
    }

    cbfClick() {
        this.props.cbfClick(this.props.index)
    }

};