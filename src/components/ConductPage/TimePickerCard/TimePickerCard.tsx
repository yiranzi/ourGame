import React from "react";
import { Picker, List } from "antd-mobile";
import Card from "../../Card";
import className from "./style/TimePickerCard.less";
export default function TimePickerCard() {
    return (
        <Card>
            <div className={className.wrapper}>
                <Picker data={seasons} cols={1}>
                    <List.Item arrow="horizontal">选择期数</List.Item>
                </Picker>
            </div>
        </Card>
    );
}

const seasons = [
    {
        label: "8 月 31 日",
      },
      {
        label: "2014",
      },
  ];
