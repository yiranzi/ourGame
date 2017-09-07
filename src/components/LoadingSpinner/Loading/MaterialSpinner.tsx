import React from "react";
import className from "./style/MaterialSpinner.less";

interface PropsTypes {
    animationOut: boolean;
}

export default function MaterialSpinner(props: PropsTypes) {
    let style = props.animationOut ? className.animationOut : "";
    return (
        <div className={className.wrapper + " " + style}>
           <svg className={className.spinner} width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                <circle className={className.path} fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
            </svg>
        </div>
    );
}