import React from "react";
import className from "./style/Spinner.less";

interface PropsTypes {
    animationOut: boolean;
}

export default function Spinner(props: PropsTypes) {
    let style = props.animationOut ? className.animationOut : "";
    return (
        <div className={className.wrapper + " " + style}>
            < div className = {className.container} >
                <div className={className.spinner}>
                <div className={className.item}></div>
                <div className={className.item}></div>
                <div className={className.item}></div>
                <div className={className.item}></div>
                <div className={className.item}></div>
                <div className={className.item}></div>
                <div className={className.item}></div>
                <div className={className.item}></div>
            </div>
            <svg>
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values = " 1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 50 -8"
                            result="goo"/>
                        <feBlend in = "SourceGraphic" in2 = "goo" />
                    </filter>
                </defs>
            </svg >
            </div>
        </div>
    );
}