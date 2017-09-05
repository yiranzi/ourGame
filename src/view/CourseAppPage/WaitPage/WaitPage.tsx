import * as React from "react";
import className from "./style/WaitPage.less";
import WaitContainer from "@/containers/CourseAppPage/WaitPage/IndexContainer";
import DALIndexPage from "@/dal/indexPage";
import NoMatchPage from "@/view/NoMatchPage";
import { Route } from "react-router-dom";
import { resolve } from "@/utils/resolver";
import { observer } from "mobx-react";
import {
    mountGlobalLoading,
    unMountGlobalLoading
} from "@/components/LoadingSpinner/RenderGlobalLoading";

interface PropsTypes {
    DALUserInfoState: any;
    DALWaitPageState: any;
    history?: any;
    propsPath?: string;
    match?: any;
}

@observer
@resolve("fetchCourseInfo", (props: PropsTypes) => {
    return props.DALWaitPageState.fetchCourseInfo(1).then(() => {
        unMountGlobalLoading();
    });
})
export default class WaitPage extends React.Component<PropsTypes> {
    constructor(props: PropsTypes) {
        super(props);
    }
    render() {
        unMountGlobalLoading();
        return (
            <div className={className.wrapper}>
                <Route path={`${this.props.match.url}/`}
                    render={props => (
                        <WaitContainer {...props} DALWaitPageState = {this.props.DALWaitPageState} DALUserInfoState={this.props.DALUserInfoState}  propsPath={this.props.match.url}/>
                    )}
                />
            </div>
        );
    }
}