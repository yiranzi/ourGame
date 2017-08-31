
import React from "react";
import className from "./style/Card.less";
export default function Card(props: any) {
    if(props.children) {
        return (
            <div style = {props.styleDefault} className={className.cardLayout}>
                {props.children}
            </div>
        );
    } else {
        return null
    }

}