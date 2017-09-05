import * as React from "react";
import Card from "@/components/Card";
import className from "./style/indexContainer.less";
import { Button, List } from "antd-mobile";
import { CourseStartTimeCard } from "@/components/ConductPage";
import Modal from "@/components/Modal/Modal";

interface StateTypes {
    Carouselindex: number;
}
interface PropsTypes {
    DALWaitPageState: any;
    DALUserInfoState: any;
}
export default class WaitPage extends React.Component<PropsTypes, StateTypes> {
    constructor(props: PropsTypes) {
        super(props);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }
    handleButtonClick() {
        Modal.showModal({
            title: "速速加群啦",
            bodyText: <div>本课程包含QQ社群管理:<br />请加入QQ群: {this.props.DALWaitPageState.qq}<br />暗号: {this.props.DALWaitPageState.secret}</div>,
            sureText: "立即加群",
            cancelText: "就是不加",
            sureFunction: () => {
                window.location.href = this.props.DALUserInfoState.link;
            },
            cancelFunction: () => {}
        });
    }
    render() {
        return (
            <div className={className.wrapper}>
                <div className={className.time}>
                    <CourseStartTimeCard mouth={"8"} day={"30"}></CourseStartTimeCard>
                </div>
                <div className={className.btn_wrapper}>
                    <Card>
                        <Button className={className.btn} type="primary" onClick={this.handleButtonClick}>点击 加入 QQ 群</Button>
                    </Card>
                </div>
            </div>
        );
    }
}