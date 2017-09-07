import React from "react";
import { observer } from "mobx-react";
import {
    Route,
    Link,
    Switch
} from "react-router-dom";
import { resolve } from "@/utils/resolver";


import {
    unMountGlobalLoading
} from "@/components/LoadingSpinner/RenderGlobalLoading";


interface PropsTypes {
    match?: any;
    location?: any;
    history?: any;
    propsPath?: any;
    DALTinyCourseAppState?: any;
    DALTinyListenPageState: any;
    DALUserInfoState: any;
}

// 以下为resolve顺序阻塞执行方法
// 拉取首屏数据
@resolve("fetch_enterListenInfo", function(props: PropsTypes) {
    return props.DALTinyListenPageState.fetchEnterListenInfo(props.DALTinyCourseAppState.courseId).then(() => {
        // 关闭全局loading 动画
        unMountGlobalLoading();
    });
})
@observer
class TinyListenPage extends React.Component<PropsTypes> {
    render() {
        return (
            <switch>
                <Route path={`${this.props.match.url}/`}
                    render={props => (
                        <TinyListenContainer
                            {...props}
                            propsPath={this.props.match.url}
                            DALTinyCourseAppState={this.props.DALTinyCourseAppState}
                            DALTinyListenPageState={this.props.DALTinyListenPageState}
                        />
                    )}
                />
            </switch>
        );
    }
}

export default TinyListenPage;