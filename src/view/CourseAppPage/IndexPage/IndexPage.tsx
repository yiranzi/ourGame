import * as React from "react";
import className from "./style/IndexPage.less";
import IndexContainer from "@/containers/IndexPage/IndexContainer";
import DALIndexPage from "@/dal/indexPage";
import { Route } from "react-router-dom";
import { observer } from "mobx-react";

import {
    mountGlobalLoading,
    unMountGlobalLoading
} from "@/components/LoadingSpinner/RenderGlobalLoading";

interface PropsTypes {
    DALUserInfoState: any;
    DALCourseState: any;
    history?: any;
    match?: any;
    propsPath?: string;
}
@observer
export default class IndexPage extends React.Component<PropsTypes> {
    private DALIndexPageState: DALIndexPage = new DALIndexPage();
    constructor(props: PropsTypes) {
        super(props);
    }
    render() {
        return (
            <div className={className.wrapper}>
                <Route path={`${this.props.match.url}/`}
                    render={props => (
                        <IndexContainer {...props} DALState={this.DALIndexPageState} DALUserInfoState={this.props.DALUserInfoState} propsPath={this.props.match.url}/>
                    )}
                />
            </div>
        );
    }
}