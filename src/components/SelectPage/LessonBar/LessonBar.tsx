/**
 * Created by ichangtou on 2017/8/30.
 */

import * as React from "react";
import * as className from "./style/LessonBar.less";
import Card from "@/components/Card/Card";

interface LessonBarPropsTypes {
    dayId: number;
    dayTitle: string;
    subTitle: string;
    isEnter: boolean;
    cbfOnEnter: Function;
    // ifGetReward: boolean;
    cbfOnClickReward: Function;
    rewardIcon?: string;
}

export default class LessonBar extends React.Component<LessonBarPropsTypes> {
    constructor() {
        super();
        this.cbfOnEnter = this.cbfOnEnter.bind(this);
        this.cbfOnClickReward = this.cbfOnClickReward.bind(this);
    }
    render() {
        console.log(this.props);

        return(
        <Card>
            <div className={(className as any).container}>
                {this.renderContain()}
            </div>
        </Card>
        );
    }
    renderContain() {
        if ( this.props.isEnter ) {
            return(this.renderEnter());
        } else {
            return(this.renderNotEnter());
        }
    }

    cbfOnEnter() {
        let type = this.props.isEnter;
        let dayId = this.props.dayId;
        this.props.cbfOnEnter(type, dayId);
    }

    cbfOnClickReward() {
        let dayId = this.props.dayId;
        this.props.cbfOnClickReward(dayId);
    }

    renderEnter() {
        console.log('renderEnter');
        let arr = [];
        if ( this.props.cbfOnClickReward ) {
            arr.push(<div onClick = {this.cbfOnClickReward} className={(className as any).left}>
                <img className={(className as any).rewardIcon} key = {0} src={this.props.rewardIcon ? this.props.rewardIcon : `${require("@/assets/image/getReward_icon.png")}`}/>
            </div>)
        } else {
            arr.push(<div className={(className as any).left}></div>)
        }
        arr.push(<div className={(className as any).mid} key = {1} onClick = {this.cbfOnEnter}>
            <div className={(className as any).active}>
                <h1 className={(className as any).dayTitle}>{this.props.dayTitle}</h1>
                <h1 className={(className as any).subTitle}>{this.props.subTitle}</h1>
            </div>
        </div>);
        arr.push(<div onClick = {this.cbfOnEnter} className={(className as any).right}><img  key = {2} className={(className as any).nextIcon} src={require("@/assets/image/arrow.png")}/></div>)
        return arr;
    }

    renderNotEnter() {
        let style = {
            height: '100%',
            width: '100%',
        }
        let arr = [];
        arr.push(<div style = {style} key = {0} onClick = {this.cbfOnEnter}>
            <div className={(className as any).notActive }>
                <h1 className={(className as any).dayTitle }>{this.props.dayTitle}</h1>
            </div>
        </div>);
        return arr;
    }



}