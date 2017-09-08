import React from "react";

import Card from "../../Card/Card";
import className from "./style/SummaryCard.less";
interface PropsTypes {
    children?: string;
}

function SummaryCard(props: PropsTypes) {
    return (
        <Card>
            <div className={className.wrapper}>
                <h1 className={className.title}>课程介绍</h1>
                {props.children.split('#').map((item: string, index: number) => {
                    return (
                        <p key={index} className={className.text_body}>{item}</p>
                        )
                })}
            </div>
        </Card>
    );
}

export default SummaryCard;