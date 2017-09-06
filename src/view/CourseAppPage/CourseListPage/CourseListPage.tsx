
import React from "react";
import className from "./style/CourseListPage.less";

import { observer } from "mobx-react";

import WaitPage from "../WaitPage/WaitPage";
import SelectPage from "@/containers/CourseAppPage/SelectPage/SelectPage";


import {
    mountGlobalLoading,
    unMountGlobalLoading
} from "@/components/LoadingSpinner/RenderGlobalLoading";


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
    match?: any;
    location?: any;
    history?: any;
}
@observer
@resolve("fetchDayItem", function(props: PropsTypes) {
    return props.DALWaitPageState.fetchCourseInfo(1);
})
@resolve("fetchCourseInfo", function(props: PropsTypes) {
    return props.DALCourseListState.fetchDayItem(1).then((data: any) => {
        if (data[0].status === -1) {
            if (props.location.pathname !== `${props.match.url}/wait`) {
                props.history.push(`${props.match.url}/wait`);
            }
        } else {
            unMountGlobalLoading();
        }
        resolve();
    });
})
class CourseListPage extends React.Component<PropsTypes> {
    constructor(props: PropsTypes) {
        super(props);
    }
    render() {
        return (
            <div className={className.view}>
                <Route path={`${this.props.match.url}/`}
                    render={props => (
                        <SelectPage {...props} qqGroupInfo = {this.props.DALWaitPageState} dayCourseList={this.props.DALCourseListState} propsPath={this.props.propsPath}/>
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