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
    usedBg: String,
}

class ScenePlay extends React.Component<PropsTypes, StateTypes> {
    divElement: any;
    myShow: any;
    divElement = 0;
    myShow = false;
    divElementUser: any;
    constructor(props: PropsTypes) {
        super(props);
        this.nextDialog = this.nextDialog.bind(this);
        this.state = {
            process: 0,
            finishDialog: false,
            finishDialogNow: false,
            usedBg: '',
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
                   {this.renderBackGround()}
                   {/*Person*/}
                   <Person headImg = {this.props.currentStage[this.state.process].headImg}></Person>
                   {/*Dialiog*/}
                   {this.addName()}
               </div>

               {/*NameTag*/}
           </div>
        );
    }

    renderBackGround() {
        console.log('renderBackGround~!!!!!!!!!!!!!!!!!');
        //如果当前为空
        let showType = '';
        let showStyle = {

        }
        console.log(this.divElement)
        this.divElement = this.divElement + 1;
        this.myShow = !(this.myShow);
        // return <BackGround showStyle = {showStyle} bgImg = {this.props.currentStage[this.state.process].bgImg}/>
        if (!this.myShow) {
            showType = "show";
            showStyle = {
                // width: '10px'
                opacity: '1',
                transition: "2s opacity",
            }
            console.log('transition');
            return <BackGround showStyle = {showStyle} bgImg = {this.props.currentStage[this.state.process].bgImg}/>
        } else {
            showStyle = {
                // width: '10px'
                opacity: '0',
                transition: "2s opacity",
            }
            showType = "hide";
            return <BackGround showStyle = {showStyle} bgImg = {this.props.currentStage[this.state.process].bgImg}/>
        }

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
            speedInterval = {10}
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
            // let result = this.state.finishDialogNow;
            // result = !result;
            this.setState({finishDialogNow: true});
        }
    }


    nextDialog() {
        console.log(this.state);
        if ( this.state.process === this.props.currentStage.length - 1) {
            return;
        }
        this.state.process = this.state.process + 1;
        // 设置对话
        this.setState({
            finishDialogNow: false,
            finishDialog: false,
            process: this.state.process,
        });
    }
}
export default ScenePlay;
