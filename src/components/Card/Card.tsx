
import React from "react";
import className from "./style/Card.less";
export default function Card(props: any) {
    return (
        <div className={className.cardLayout}>
            {props.children}
        </div>
    );
}