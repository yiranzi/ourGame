import React from "react";
import { observer } from "mobx-react";
import {
    Route,
    Link,
    Switch
} from "react-router-dom";
import { resolve } from "@/utils/resolver";


import {
    mountGlobalLoading,
    unMountGlobalLoading
} from "@/components/LoadingSpinner/RenderGlobalLoading";

import Lazyloader from "@/utils/lazyloader/Lazyloader";

// 引入数据state
import DALUserInfoState from "@/dal/Global/UserInfo";
import DALIndexPage from "@/dal/TinyCourseApp/IndexPage/state";
import DALTinyCourseApp from "@/dal/TinyCourseApp/state";
import DALTinyListenPage from "@/dal/TinyCourseApp/ListenPage/state";

// 引入page view
import loadTinyIndexPage from "./IndexPage";
import loadTinyListenPage from "./ListenPage/TinyListenPage";


// 实例化数据state
let DALTinyIndexPageState = new DALIndexPage();
let DALTinyCourseAppState = new DALTinyCourseApp();
let DALTinyListenPageState = new DALTinyListenPage();


interface PropsTypes {
    match?: any;
    location?: any;
    history?: any;
}


// 以下为resolve顺序阻塞执行方法
// 获取用户信息
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
// 拉取是否已经购买接口数据
@resolve("fetch_isUserBuy", function(props: PropsTypes) {
    return DALTinyCourseAppState.fetchIsUerBuy(props.match.params.id).then((chapterArray: any) => {
        // 如果用户没有购买，一律跳转报名页，若购买，一律跳转听课页
        if (chapterArray) {
            DALTinyListenPageState.setChapterArray(chapterArray);
            if (props.location.pathname !== `${props.match.url}/listen`) {
                props.history.push(`${props.match.url}/listen`);
            }
        } else {
            if (props.location.pathname !== `${props.match.url}/index`) {
                props.history.push(`${props.match.url}/index`);
            }
        }
        resolve();
    });
})
@observer
class TinyCoursePage extends React.Component<PropsTypes> {
    render() {
        return (
            <switch>
                <Route path={`${this.props.match.url}/index`}
                    render={props => (
                        <TinyIndexPage
                            {...props}
                            propsPath={this.props.match.url}
                            DALUserInfoState={DALUserInfoState}
                            DALTinyIndexPageState={DALTinyIndexPageState}
                            DALTinyCourseAppState={DALTinyCourseAppState}
                        />
                    )}
                />
                <Route path={`${this.props.match.url}/index`}
                    render={props => (
                        <TinyListenPage
                            {...props}
                            propsPath={this.props.match.url}
                            DALUserInfoState={DALUserInfoState}
                            DALTinyListenPageState={DALTinyListenPageState}
                            DALTinyCourseAppState={DALTinyCourseAppState}
                        />
                    )}
                />
            </switch>
        );
    }
}

export default TinyCoursePage;