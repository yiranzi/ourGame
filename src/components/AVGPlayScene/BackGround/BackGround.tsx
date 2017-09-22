/**
 * Created by ichangtou on 2017/8/30.
 */

import * as React from "react";
import * as className from "./style/style.less";

interface BackGroundPropsTypes {
        bgImg: string; // 背景图片
}

export default class ChooseBar extends React.Component<BackGroundPropsTypes> {
    constructor() {
        super();
    }
    render() {
        return(
            <div className={(className as any).container}>
                <img src={this.props.bgImg}/>
            </div>
        );
    }
};