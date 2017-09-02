/**
 * Created by ichangtou on 2017/8/30.
 */

import * as React from "react";
import * as className from "./style/TeacherIntro.less";
import Card from "@/components/Card/Card";

interface TeacherIntroPropsTypes {
    title: string;
    headImage: string;
    introTxt: string;
}

export default class TeacherIntro extends React.Component<TeacherIntroPropsTypes> {
    constructor() {
        super();
    }
    render() {
        return(
            <Card>
                <div className={(className as any).container}>
                    <h1 className={(className as any).title}>{this.props.title}</h1>
                    <img className={(className as any).headImg} src={`${this.props.headImage}`}/>
                    <p className={(className as any).introTxt}>{this.props.introTxt}</p>
                    {/*<p>长投网理财达人</p>*/}
                    {/*<p>21天训练营创始人</p>*/}
                </div>
            </Card>
        );
    }



}