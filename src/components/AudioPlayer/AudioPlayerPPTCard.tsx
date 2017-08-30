import React from "react";
import Card from "../Card";
import { Carousel } from "antd";
import className from "./style/AudioPlayerPPTCard.less";
interface PropsTypes {
    children?: JSX.Element|Array<JSX.Element>;
}
function AudioPlayerPPTCard(propd: PropsTypes): JSX.Element {
    return (
        <Card>
            <div className={className.wrapper}>
                <Carousel>
                    {propd.children}
                </Carousel>
            </div>
        </Card>
    );
}

export default AudioPlayerPPTCard;