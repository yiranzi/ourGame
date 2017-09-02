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

}
export default class WaitPage extends React.Component<PropsTypes, StateTypes> {
    constructor(props: PropsTypes) {
        super(props);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }
    handleButtonClick() {
        Modal.showModal({
            title: 
        });
    }
    render() {
        return (
            <div className={className.wrapper}>
                <div>
                    <CourseStartTimeCard mouth={"8"} day={"30"}></CourseStartTimeCard>
                </div>
                <div>
                    <Card>
                        <Button className="btn" type="primary" onClick={this.handleButtonClick}>点击 加入 QQ 群</Button>
                    </Card>
                </div>
            </div>
        );
    }
}