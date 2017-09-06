import React from "react";
import { observer } from "mobx-react";
import {
    Route,
    Link,
    Switch
} from "react-router-dom";


// url页面
import NoMatchPage from "..//NoMatchPage";
import IndexPage from "./IndexPage/IndexPage";
import CourseListenPage from "./CourseListenPage/CourseListenPage";
import CourseListPage from "./CourseListPage/CourseListPage";
// state
import DALUserInfoState from "@/dal/Global";
import DALCourseApp from "@/dal/courseApp";
import { resolve } from "@/utils/resolver";
import DALIndexPage from "@/dal/indexPage";
import DALCourseList from "@/dal/courseApp/courseListPage/state";
import DALCourseListen from "@/dal/courseApp/courseListenPage/state";
import DALWaitPage from "@/dal/courseApp/waitPage/state";


import {
    mountGlobalLoading,
    unMountGlobalLoading
} from "@/components/LoadingSpinner/RenderGlobalLoading";

interface PropsTypes {
    history: any;
    match: any;
    location: any;
}

// 初始化创建 state
let DALCourseAppState = new DALCourseApp();
let DALIndexPageState = new DALIndexPage();
let DALCourseListState = new DALCourseList();
let DALCourseListenState = new DALCourseListen();
let DALWaitPageState = new DALWaitPage();

@observer
@resolve("fetchDALUserSignState", function(props: PropsTypes) {
    // 唤起加载页面
    mountGlobalLoading();
    // 1、获取用户登陆信息
    return DALUserInfoState.fetchDALUserInfo().catch(() => {
        if (props.location.pathname !== `${props.match.url}/error`) {
            props.history.push(`${props.match.url}/error`);
            resolve();
        }
    });
})
@resolve("fetchDALUserInfo", function(props: PropsTypes) {
     // 2、获取用户是否已经报名，若未报名，一律跳转报名页
        // todo courseid写死
    return DALCourseAppState.fetchIsUerBuy(1).then((isUserBuy) => {
        // 如果用户没有购买，跳转购买页面
        if (!isUserBuy) {
            if (props.location.pathname !== `${props.match.url}/index`) {
                props.history.push(`${props.match.url}/index`);
            }
        } else {
            // todo 查询是否已经开课，现在没有这个接口
            if (props.location.pathname === `${props.match.url}/index`) {
                props.history.push(`${props.match.url}/courselist`);
            }
        }
        resolve();
    });
})
class CourseAppPage extends React.Component<PropsTypes> {
    constructor(props: any) {
        super(props);
    }
    render() {
        return (
            <Switch>
                <Route path={`${this.props.match.url}/index`}
                    render={props => (
                        <IndexPage {...props} DALCourseAppState = {DALCourseAppState} DALUserInfoState={DALUserInfoState} DALIndexPageState={DALIndexPageState} propsPath={this.props.match.url}/>
                    )}
                />
                <Route path={`${this.props.match.url}/courselist`}
                    render={props => (
                        <CourseListPage {...props}  propsPath={this.props.match.url} DALCourseListState={DALCourseListState} DALUserInfoState={DALUserInfoState} DALWaitPageState={DALWaitPageState}/>
                    )}
                />
                <Route path={`${this.props.match.url}/listen/:dayId`}
                    render={props => (
                        <CourseListenPage {...props}  propsPath={this.props.match.url} DALCourseListenState={DALCourseListenState}/>
                    )}
                />
            </Switch>
        );
    }
}

export default CourseAppPage;