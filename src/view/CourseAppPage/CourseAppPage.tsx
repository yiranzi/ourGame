import React from "react";
import { observer } from "mobx-react";
import {
    Route,
    Link,
    Switch
} from "react-router-dom";


// url页面
import NoMatchPage from "@/view/NoMatchPage";
import IndexPage from "./IndexPage/IndexPage";
import WaitPage from "./WaitPage/WaitPage";
import CourseListenPage from "./CourseListenPage/CourseListenPage";


import DALUserInfoState from "@/dal/Global";
import DALCourse from "@/dal/courseApp";
import { resolve } from "@/utils/resolver";

import {
    mountGlobalLoading,
    unMountGlobalLoading
} from "@/components/LoadingSpinner/RenderGlobalLoading";

interface PropsTypes {
    history: any;
    match: any;
}

@observer
@resolve("fetchDALUserSignState", function(props: PropsTypes) {
    mountGlobalLoading();
    // 获取当前页面需要的数据
    return DALUserInfoState.fetchDALUserInfo();
})
class CourseAppPage extends React.Component<PropsTypes> {
    // 实例化 state
    private DALCourseState: DALCourse = new DALCourse();
    constructor(props: any) {
        super(props);
    }
    render() {
        return (
            <Switch>
                <Route path={`${this.props.match.url}/index`}
                    render={props => (
                        <IndexPage {...props} DALUserInfoState={DALUserInfoState} DALCourseState={this.DALCourseState} propsPath={this.props.match.url}/>
                    )}
                />
                <Route path={`${this.props.match.url}/wait`}
                    render={props => (
                        <WaitPage {...props} DALUserInfoState={DALUserInfoState} DALCourseState={this.DALCourseState} propsPath={this.props.match.url}/>
                    )}
                />
                <Route path={`${this.props.match.url}/listen`}
                    render={props => (
                        <CourseListenPage {...props}  propsPath={this.props.match.url}/>
                    )}
                />
            </Switch>
        );
    }
}

export default CourseAppPage;