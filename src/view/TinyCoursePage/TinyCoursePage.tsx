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


let DALIndexPageState = new DALIndexPage();
let DALTinyCourseAppState = new DALTinyCourseApp();

interface PropsTypes {
    match?: any;
    location?: any;
    history?: any;
}

// 判断是否已经购买
@resolve("fetch_IsUserBuy", function(props: PropsTypes) {
    return DALTinyCourseAppState.fetchIsUerBuy(props.match.params.id).then((isUserBuy) => {
        // 如果没有购买
        if (isUserBuy) {
            // todo
        } else {
            // todo
        }
    });
})
@observer
class TinyCoursePage extends React.Component<PropsTypes> {
    render() {
        return (
            <switch>
                <Route path={`${this.props.match.url}/index`}
                    render={props => (
                        <TinyIndexPage {...props}  propsPath={this.props.match.url} DALUserInfoState={DALUserInfoState} DALIndexPageState={DALIndexPageState}/>
                    )}
                />
            </switch>
        );
    }
}

export default TinyCoursePage;