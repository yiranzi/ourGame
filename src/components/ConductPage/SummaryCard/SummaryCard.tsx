import React from "react";

import Card from "../../Card/Card";
import className from "./style/SummaryCard.less";
interface PropsTypes {
    children?: JSX.Element | string;
    title?: String;
}

function SummaryCard(props: PropsTypes) {
    return (
        <Card>
            <div className={className.wrapper}>
                <h1 className={className.title}>{props.title}</h1>
                <div className={className.text_body}>{props.children}</div>
            </div>
        </Card>
    );
}

export default SummaryCard;