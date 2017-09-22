import * as React from "react";

import BackGround from "@/components/AVGPlayScene/BackGround/BackGround";
import Person from "@/components/AVGPlayScene/Person/Person";
import Dialog from "@/components/AVGPlayScene/Dialog/Dialog";
import DialogName from "@/components/AVGPlayScene/DialogName/DialogName";

import * as className from "./style/style.less";

interface PropsTypes {
    currentStage: [
            {
                name: String,
                dialog: String,
                headImg: String,
                bgImg: String,
            }
        ];
}

interface StateTypes {
    process: number,
}

class ScenePlay extends React.Component<PropsTypes, StateTypes> {
    divElement: any;
    divElementUser: any;
    constructor(props: PropsTypes) {
        super(props);
        this.nextDialog = this.nextDialog.bind(this);
        this.state = {
            process: 0,
            finishDialog: false,
            finishDialogNow: false,
        };
    }
    render() {

        return (
           <div>
               {/*菜单元素*/}
               {/*<div>123</div>*/}
               {/*舞台可点击元素*/}
               <div className = {className.container} onClick={this.nextDialog}>
                   {/*BackGround*/}
                   <BackGround bgImg = {this.props.currentStage[this.state.process].bgImg}/>
                   {/*Person*/}
                   <Person headImg = {this.props.currentStage[this.state.process].headImg}></Person>
                   {/*Dialiog*/}
                   {this.addName()}
               </div>

               {/*NameTag*/}
           </div>
        );
    }

    addName() {
        let style = {
            position: 'absolute',
            bottom: '0',
        };
        let arr = [];
        if (this.props.currentStage[this.state.process].name) {
            arr.push(<DialogName boxImg = {`${require("@/assets/image/Game/dialogName_1.jpg")}`}>{this.props.currentStage[this.state.process].name}</DialogName>);
        }
        arr.push(<Dialog
            finishDialog = {this.state.finishDialog}
            finishCalback = {this.finishCalback}
            finishDialogNow = {this.state.finishDialogNow}
            boxImg = {`${require("@/assets/image/Game/dialogBox_1.jpg")}`}>
            {this.props.currentStage[this.state.process].dialog}</Dialog>)
        return (<div style = {style}>
            {arr}
        </div>);
    }

    //完成对话后的回调
    finishCalback() {
        this.setState({
            finishDialog: true
        });
    }

    clickScene() {
        //如果对话已经完成
        if (this.state.finishDialog) {
            this.nextDialog();
        } else {
            let result = this.state.finishDialogNow;
            result = !result;
            this.setState({finishDialogNow: result});
        }
    }


    nextDialog() {

        console.log(this.state);
        if ( this.state.process === this.props.currentStage.length - 1) {
            return;
        }
        this.state.process = this.state.process + 1;
        //设置对话
        this.setState({
            finishDialog: false,
            process: this.state.process,
        });
    }
}
export default ScenePlay;
