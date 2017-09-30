/**
 * Created by ichangtou on 2017/8/30.
 */

import * as React from "react";
import * as className from "./style/style.less";

interface PersonPropsTypes {
    userAttribute: string; // 背景图片
}

export default class Person extends React.Component<PersonPropsTypes> {
    constructor() {
        super();
    }
    render() {
        return(
            <div style = {this.props.showStyle} className={(className as any).attribute}>
                <p>财商:{this.props.userAttribute.MQ}</p>
                <p>好感1:{this.props.userAttribute.b1Love}</p>
                <p>好感2:{this.props.userAttribute.b2Love}</p>
            </div>
        );
    }
};