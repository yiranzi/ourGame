

import React from "react";
import className from "./style/WinLoading.less";

interface PropsTypes {
    animationOut: boolean;
}

export default function WinLoading(props: PropsTypes) {
    let style = props.animationOut ? className.animationOut : "";
    return (
        <div className={className.wrapper + " " + style}>
            <div className={className.spinner}></div>
        </div>
    );
}