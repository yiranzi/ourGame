
import React from "react";
import className from "./style/CourseListPage.less";

import { observer } from "mobx-react";

<<<<<<< HEAD
import WaitPage from "..//WaitPage/WaitPage";
import SelectPage from "@/containers/SelectPage/SelectPage";
=======
import SelectPage from "@/containers/CourseAppPage/SelectPage/SelectPage";
>>>>>>> 434b8fcf54fc5ad31d0f4c24f03daa35377fdc20
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
    DALUserInfoState: any;
    DALWaitPageState: any;
    match: any;
    location: any;
    history: any;
}
@observer
@resolve("fetchDayItem", function(props: PropsTypes) {
<<<<<<< HEAD
    return props.DALCourseListState.fetchDayItem(1).then((data: any) => {
        if (data[0].status === -1) {
            if (props.location.pathname !== `${props.match.url}/wait`) {
                props.history.push(`${props.match.url}/wait`);
            }
        }
    });
=======
    return props.DALCourseListState.fetchDayItem(1);
>>>>>>> 434b8fcf54fc5ad31d0f4c24f03daa35377fdc20
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
                <Route path={`${this.props.match.url}/wait`}
                    render={props => (
                        <WaitPage {...props} DALUserInfoState={this.props.DALUserInfoState} DALWaitPageState={this.props.DALWaitPageState} propsPath={this.props.match.url}/>
                    )}
                />
            </div>
        );
    }
}

// 导出
export default CourseListPage;