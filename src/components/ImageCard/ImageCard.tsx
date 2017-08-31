import React from "react";

import Card from "../Card";
import className from "./style/ImageCard.less";
interface PropsTypes {
    src?: string;
}
export default function ImageCard(props: PropsTypes) {
    return (
        <Card>
            <img src={props.src} className={className.image}/>
        </Card>
    );
}