import React from "react";
import Card from "../../Card";
import className from "./style/CourseCatalogCard.less";
import {Timeline} from "antd";


interface PropsTypes {
    children?: Array<string>;
    title?: String
}
/**
 * 传入一个数组，返回课程大纲的 jsx element
 * @param {PropsTypes} props
 * @returns {JSX.Element}
 */
function CourseCatalogCard(props: PropsTypes): JSX.Element {
    return (
        <Card>
            <div className={className.wrapper}>
                <h1 className={className.title}>{props.title}</h1>
                <div className={className.catalog}>
                    <Timeline>
                        {props.children && props.children.map((value: string) => {
                            return (
                                <Timeline.Item key={value}>{value}</Timeline.Item>
                            );
                        })}
                    </Timeline>
                </div>
            </div>
        </Card>
    );
}

export default CourseCatalogCard;