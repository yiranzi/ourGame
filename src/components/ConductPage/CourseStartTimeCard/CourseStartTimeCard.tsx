import React from "react";
import Card from "../../Card";
import className from "./style/CourseStartTimeCard.less";
interface PropsTypes {
    mouth?: string|number;
    day?: string|number;
}
function CourseStartTimeCard(props: PropsTypes): JSX.Element {
    return (
        <Card>
            <div className={className.wrapper}>
                <span className={className.hrline}/>
                <span className={className.hrline_2}/>
                <h1 className={className.title}>开课时间</h1>
                <span className={className.hrline_2}/>
                <span className={className.hrline}/>
                <div className={className.content}>
                    <p>{props.mouth || "XXX" } 月 {props.day || "XXX"} 日 </p>
                </div>
            </div>
        </Card>
    );
}

export default CourseStartTimeCard;