import React from "react";

import CourseListenContainer from "@/containers/CourseAppPage/CourseListenPage/CourseListenContainer";
import className from "./style/CourseListenPage.less";
interface PropsTypes {
    propsPath: string;
}
class CourseListenPage extends React.Component<PropsTypes> {
    render() {
        return (
            <div className={className.wrapper}>
                <CourseListenContainer />
            </div>
        );
    }
}


export default CourseListenPage;