import React from "react";
import { observer } from "mobx-react";
import {
    Route,
    Link,
    Switch
} from "react-router-dom";
import { resolve } from "@/utils/resolver";

// 引入数据state
import DALUserInfoState from "@/dal/Global";
import DALIndexPage from "@/dal/TinyCourseApp/IndexPage/state";
import DALTinyCourseApp from "@/dal/TinyCourseApp/state";
// 引入page view
import TinyIndexPage from "./IndexPage";


let DALTinyIndexPageState = new DALIndexPage();
let DALTinyCourseAppState = new DALTinyCourseApp();

interface PropsTypes {
    match?: any;
    location?: any;
    history?: any;
}

// 以下为resolve顺序阻塞执行方法
// 拉取是否已经购买接口数据
@resolve("fetch_isUserBuy", function(props: PropsTypes) {
    return DALTinyCourseAppState.fetchIsUerBuy(props.match.params.id);
})
// 判断是否已经购买
@resolve("judge_isUserBuy", function(props: PropsTypes) {
    return new Promise((resolve, reject) => {
        // 如果用户没有购买，一律跳转报名页，若购买，一律跳转听课页
        if (DALUserInfoState.isUserBuy) {
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
                        />
                    )}
                />
            </switch>
        );
    }
}

export default TinyCoursePage;