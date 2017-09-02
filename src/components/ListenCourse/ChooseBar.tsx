/**
 * Created by ichangtou on 2017/8/30.
 */

import * as React from "react";
import * as className from "./style/ChooseBar.less";
import Card from "@/components/Card/Card";
import { Alert } from 'antd';

interface ChooseBarPropsTypes {
    chooseStatus: string; // 选择题的答题状态
    introduce: string; // 问题描述
    tips: string; // 问题提示
    answerList: Array; // 问题选项
    selectIndex: number; // 选中的选项
    cbfClick: Function; // 点击回调
    cbfPost: Function; // 提交回调
    cbfNext: Function;// 提交回调
    lastQuestion: Boolean;
}

export default class ChooseBar extends React.Component<ChooseBarPropsTypes> {
    constructor() {
        super();
        this.renderChooseBar = this.renderChooseBar.bind(this);
        this.cbfClick = this.cbfClick.bind(this);

    }
    render() {
        return(

            <div className={(className as any).container}>{this.renderChooseDiv()}</div>
        );
    }

    renderChooseDiv() {
        let arr = [];


        arr.push(<Card><div className={(className as any).answerPart}>{this.renderFirst()}</div></Card>);
        arr.push(this.renderSecond());
        return arr;

    }

    //选项
    renderFirst() {
        let arr = [];
        arr.push(<h1 key = {0} className={(className as any).title}>Question</h1> );
        arr.push(<h1 key = {1} className={(className as any).introduce}>{this.props.introduce}</h1>);
        arr.push(<div key = {2} className={(className as any).answerList}>{this.renderChooseList()}</div>);
        arr.push(<h1 key = {3}>{this.postButton()}</h1>);
        return arr;
    }

    postButton() {
        if(this.props.chooseStatus === 'notChoose') {
            if(this.props.selectIndex !== -1) {
                return <div className={(className as any).post} onClick={this.props.cbfPost}>提交</div>
            } else {
                return <div className={(className as any).post}>选择答案吧</div>
            }

        }
    }

    //反馈/提示
    renderSecond() {
        let style = {
            backgroundColor: '#108ee9';
            color: 'white';
        };
        let arr = [];
        arr.push(<Card key = {1}>{this.renderAnswer()}</Card>);
        arr.push(<Card key = {2}>{this.renderTips()}</Card>);
        arr.push(<Card styleDefault = {style}  key = {3}>{this.renderReady()}</Card>);
        return arr;
    }

    renderReady() {
        if ( this.props.chooseStatus !== 'notChoose' ) {
            if ( this.props.lastQuestion ) {
                return(<div onClick = {this.props.cbfNext}>我准备好啦~开始学习下一节</div>);
            } else {
                return(<div onClick = {this.props.cbfNext}>都完成了!</div>);
            }

        }
    }

    renderAnswer() {
        if ( this.props.chooseStatus === 'true' ) {
            return(<Alert
                message="恭喜你回答正确"
                description="Detailed description and advices about successful copywriting."
                type="success"
                showIcon
            />);
        } else if ( this.props.chooseStatus === 'false' ) {
            return(<Alert
                message="哎呀答错了"
                description="Detailed description and advices about successful copywriting."
                type="error"
                showIcon
            />);
        }
    }

    renderTips() {
        if ( this.props.chooseStatus !== 'notChoose' ) {
            return(<div className={(className as any).tips}>
                <h1 className={(className as any).title}>Tips</h1>
                <p className={(className as any).content}>{this.props.tips}</p>
            </div>)
        }
    }

    renderChooseList() {
        let arr = [];
        for ( let i = 0; i < this.props.answerList.length; i++ ) {
            arr.push(this.renderChooseBar(i));
        }
        return(arr);
    }

    renderChooseBar(index) {
        let style = {};
        let styleActive = {
            color: 'white';
        backgroundColor: '#108ee9';
    };
        let styleUnActive = {};
        if ( this.props.selectIndex === index ) {
            style = styleActive;
        } else {
            style = styleUnActive;
        }
        console.log((className as any).answerBar);
        return(<div key = {index} className={(className as any).answerBar} onClick = {this.cbfClick.bind(this, index)} style = {style}>{this.props.answerList[index]}</div>);
    }

    cbfClick(index) {
        if(this.props.chooseStatus === 'notChoose') {
            this.props.cbfClick(index);
        }
    }
}