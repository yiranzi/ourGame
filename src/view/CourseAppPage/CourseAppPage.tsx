import React from "react";
import { observer } from "mobx-react";
import {
    Route,
    Link,
    Switch
} from "react-router-dom";

import NoMatchPage from "@/view/NoMatchPage";
import IndexPage from "./IndexPage/IndexPage";
import WaitPage from "./WaitPage/WaitPage";

import DALUserInfoState from "@/dal/Global";
import DALCourse from "@/dal/courseApp";



interface PropsTypes {
    history: any;
    match: any;
}

@observer
class CourseAppPage extends React.Component<PropsTypes> {
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
            </Switch>
        );
    }
}

export default CourseAppPage;