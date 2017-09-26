/**
 * Created by ichangtou on 2017/8/30.
 */

import * as React from "react";
import * as className from "./style/style.less";

interface PersonPropsTypes {
    headImg: string; // 背景图片
}

export default class Person extends React.Component<PersonPropsTypes> {
    constructor() {
        super();
    }
    render() {
        return(
            <div style = {this.props.showStyle} className={(className as any).container}>
                <img src={this.props.headImg}/>
            </div>
        );
    }
};