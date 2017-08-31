/**
 * Created by ichangtou on 2017/8/30.
 */

import * as React from "react";
import * as className from "./style/LessonBar.less";

interface LessonBarPropsTypes {
    dayId: number;
    dayTitle: string;
    subTitle: string;
    ifEnter: boolean;
    cbfOnEnter: Function;
    // ifGetReward: boolean;
    cbfOnClickReward: Function;
    rewardIcon?: string;
}

export default class LessonBar extends React.Component<LessonBarPropsTypes> {
    constructor() {
        super();
        this.cbfOnEnter = this.cbfOnEnter.bind(this);
    }
    render() {
        return(
            <div className={(className as any).container}>
                {this.renderContain()}
            </div>
        );
    }
    renderContain() {
        if ( this.props.ifEnter ) {
            return(this.renderEnter());
        } else {
            return(this.renderNotEnter());
        }
    }

    cbfOnEnter() {
        let type = this.props.ifEnter;
        let dayId = this.props.dayId;
        this.props.cbfOnEnter(type, dayId);
    }

    renderEnter() {
        let arr = [];
        if ( this.props.cbfOnClickReward ) {
            arr.push(<img className={(className as any).rewardIcon} key = {0} onClick = {this.props.cbfOnClickReward} src={this.props.rewardIcon ? this.props.rewardIcon : ''} />)
        }
        arr.push(<div key = {1} onClick = {this.cbfOnEnter}>
            <div className={(className as any).active}>
                <h1 className={(className as any).dayTitle}>{this.props.dayTitle}</h1>
                <h1 className={(className as any).subTitle}>{this.props.subTitle}</h1>
            </div>
        </div>);
        arr.push(<img onClick = {this.cbfOnEnter} key = {2} className={(className as any).nextIcon} src={''}/>)
        return arr;
    }

    renderNotEnter() {
        let arr = [];
        arr.push(<div key = {0} onClick = {this.cbfOnEnter}>
            <div className={(className as any).notActive }>
                <h1 className={(className as any).dayTitle }>{this.props.dayTitle}</h1>
            </div>
        </div>);
        return arr;
    }



}