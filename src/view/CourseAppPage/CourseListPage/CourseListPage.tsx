
import React from "react";
import className from "./style/CourseListPage.less";

import { observer } from "mobx-react";

import SelectPage from "@/containers/CourseAppPage/SelectPage/SelectPage";
import DALGetCourseList from "@/dal/SelectPage/GetCourseList";


import { resolve } from "@/utils/resolver";
import {
    Route,
    Link,
    Switch
} from "react-router-dom";

interface PropsTypes {
    propsPath: string;
    DALCourseListState: any;
    match: any;
}
@observer
@resolve("fetchDayItem", function(props: PropsTypes) {
    return props.DALCourseListState.fetchDayItem(1);
})
class CourseListPage extends React.Component<PropsTypes> {
    constructor() {
        super();
    }
    render() {
        return (
            <div className={className.view}>
                <Route path={`${this.props.match.url}/`}
                    render={props => (
                        <SelectPage {...props} dayCourseList={this.props.DALCourseListState} propsPath={this.props.match.url}/>
                    )}
                />
            </div>
        );
    }
}

// 导出
export default CourseListPage;