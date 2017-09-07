import React from "react";

import Card from "../Card";
import className from "./style/ImageCardWithTitle.less";
interface PropsTypes {
    src?: string;
    title: string;
}
export default function ImageCardWithTitle(props: PropsTypes) {
    return (
        <Card>
            <h1 className={className.title}>{props.title}</h1>
            <img src={props.src} className={className.image}/>
        </Card>
    );
}