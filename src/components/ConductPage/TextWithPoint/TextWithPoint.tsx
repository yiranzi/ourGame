import React from "react";
import className from "./style/TextWithPoint.less";


interface PropsTypes {
    children?: Array<string>;
}
/**
 * 传入一个数组，返回课程大纲的 jsx element
 * @param {PropsTypes} props
 * @returns {JSX.Element}
 */
function CourseCatalogCard(props: PropsTypes): JSX.Element {
    return (
        <div>
            {props.children.map((item: string) => {
                return(
                <div className={className.TextWthPoint}>
                    {item}
                </div>
                )
            })}
        </div>
    )
}

export default CourseCatalogCard;