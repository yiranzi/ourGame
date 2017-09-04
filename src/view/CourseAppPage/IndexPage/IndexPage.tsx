import * as React from "react";
import className from "./style/IndexPage.less";
import IndexContainer from "@/containers/IndexPage/IndexContainer";
import { Route } from "react-router-dom";
import { observer } from "mobx-react";
import { resolve } from "@/utils/resolver";

import {
    mountGlobalLoading,
    unMountGlobalLoading
} from "@/components/LoadingSpinner/RenderGlobalLoading";



interface PropsTypes {
    DALUserInfoState: any;
    DALIndexPageState: any;
    DALCourseAppState: any;
    history?: any;
    location?: any;
    match?: any;
    propsPath?: string;
}
@observer
@resolve("fetchDALUserSignState", function(props: PropsTypes) {
    if (props.DALCourseAppState.isUserBuy) {
        props.location.push(`${this.props.propsPath}/courselist`);
        return Promise.resolve();
    }
    // 获取当前页面需要的数据
    return props.DALIndexPageState.fetchIndexPageState(1).then(() => {
        unMountGlobalLoading();
        resolve();
    });
})
export default class IndexPage extends React.Component<PropsTypes> {
    constructor(props: PropsTypes) {
        super(props);
    }
    render() {
        return (
            <div className={className.wrapper}>
                <Route path={`${this.props.match.url}/`}
                    render={props => (
                        <IndexContainer {...props} DALState={this.props.DALIndexPageState} DALUserInfoState={this.props.DALUserInfoState} propsPath={this.props.propsPath}/>
                    )}
                />
            </div>
        );
    }
}