/**
 * Created by ichangtou on 2017/8/30.
 */

import * as React from "react";
import * as className from "./style/style.less";

interface TextViewPropsTypes {
    styleBox: string; // 背景图片
}

export default class Person extends React.Component<TextViewPropsTypes> {
    constructor() {
        super();
    }
    render() {
        return(
            <div className={className.textViewBox} style={this.props.styleBox}>
                <p className={className.textContent}>{this.props.children}</p>
            </div>
        );
    }
};