import React from "react";
import DALUserInfoState from "@/dal/Global";
import { observer } from "mobx-react";
import { autorun } from "mobx";
import {
    Route,
    Link,
    Switch
} from "react-router-dom";

import NoMatchPage from "@/view/NoMatchPage";
import IndexPage from "@/view/IndexPage/IndexPage";
interface PropsTypes {
    history: any;
    match: any;
}

autorun(() => {
    if (DALUserInfoState.openId !== null) {
        DALUserInfoState.fetchDALUserSignState();
    }
});

@observer
class CourseAppPage extends React.Component<PropsTypes> {
    render() {
        switch (DALUserInfoState.userSignState) {
            case "pending":
                return (<div>等待 pending</div>);
            case "indexPage":
                this.props.history.push(`${this.props.match.url}/index`);
                break;
            case "pendingPage":
                this.props.history.push(`${this.props.match.url}/pending`);
                break;
        }
        // 不写会报react错误，虽然根本不会走到这里
        return (
            <div>
                <Switch>
                    <Route path={`${this.props.match.url}/index`} component={IndexPage} />
                    <Route path={`${this.props.match.url}`} component={NoMatchPage} />
                </Switch>
            </div>
        );
    }
}

export default CourseAppPage;