/**
 * Created by ichangtou on 2017/8/30.
 */

import * as React from "react";
import * as className from "./style/style.less";

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
        let styleBox = {
            justifyContent: "flex-start",
            marginLeft: "6rem",
            maxWidth: "20rem",

        };
        return(
            <div onClick = {this.cbfClick} className={(className as any).container}>
                <p>{this.props.content}</p>
            </div>
        );
    }

    cbfClick() {
        this.props.cbfClick(this.props.index)
    }

};