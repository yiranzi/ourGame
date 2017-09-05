import React from "react";
import { resolve } from "@/utils/resolver";

import { observer } from "mobx-react";
import CourseListenContainer from "@/containers/CourseAppPage/CourseListenPage/CourseListenContainer";
import className from "./style/CourseListenPage.less";

import {
    mountGlobalLoading,
    unMountGlobalLoading
} from "@/components/LoadingSpinner/RenderGlobalLoading";

import {
    Route,
    Link,
    Switch
} from "react-router-dom";

interface PropsTypes {
    propsPath: string;
    DALCourseListenState: any;
    match: any;
}


@observer
@resolve("fetchListenItem", function(props: PropsTypes) {
    return props.DALCourseListenState.fetchListenItem().then(() => {
        mountGlobalLoading();
    });
})
class CourseListenPage extends React.Component<PropsTypes> {
    render() {
        return (
            <div className={className.wrapper}>
                <Route path={`${this.props.match.url}/`}
                    render={props => (
                        <CourseListenContainer {...props}  courseListenState={this.props.DALCourseListenState} propsPath={this.props.match.url}/>
                    )}
                />
            </div>
        );
    }
}


export default CourseListenPage;