import React from "react";
import { Picker, List } from "antd-mobile";
import Card from "../../Card";
import className from "./style/TimePickerCard.less";

interface PropsTypes {
    data: any;
    handleOKButton?: Function;
}
interface StateTypes {
    extra: string;
}
export default class TimePickerCard extends React.PureComponent<PropsTypes, StateTypes> {
    constructor(props: PropsTypes) {
        super(props);
        this.handleOKButton = this.handleOKButton.bind(this);
        this.state = {
            extra: "请选择期数"
        };
    }
    handleOKButton(val: string) {
        this.setState({
            extra: val
        }, () => {
            this.props.handleOKButton && this.props.handleOKButton();
        });
    }
    render() {
        return (
            <Card>
                <div className={className.wrapper}>
                    <Picker data={this.props.data} cols={1} extra={this.state.extra} onOk={this.handleOKButton}>
                        <List.Item arrow="horizontal">选择期数</List.Item>
                    </Picker>
                </div>
            </Card>
        );
    }
}
