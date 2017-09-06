import React from "react";
import { observer } from "mobx-react";
import {
    Route,
    Link,
    Switch
} from "react-router-dom";
import { resolve } from "@/utils/resolver";


// 引入page view

interface PropsTypes {
    match?: any;
    location?: any;
    history?: any;
    propsPath?: string;
    DALUserInfoState?: any;
    DALIndexPageState?: any;
}

@observer
class TinyCoursePage extends React.Component<PropsTypes> {
    render() {
        return (
            <switch>
                <Route path={`${this.props.match.url}/index`}
                    render={props => (
                        <IndexPage {...props} DALCourseAppState = {DALCourseAppState} DALUserInfoState={DALUserInfoState} DALIndexPageState={DALIndexPageState} propsPath={this.props.match.url}/>
                    )}
                />
            </switch>
        );
    }
}

export default TinyCoursePage;