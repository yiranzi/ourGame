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
    DALTinyIndexPageState?: any;
}

@observer
@resolve("fetch_indexPageInfo", function(props: PropsTypes) {
    return props.DALTinyIndexPageState.fetchIndexInfo();
})
class TinyCoursePage extends React.Component<PropsTypes> {
    render() {
        return (
            <switch>
                <Route path={`${this.props.match.url}/`}
                    render={props => (
                        <IndexPage
                            {...props}
                            DALUserInfoState={this.props.DALUserInfoState}
                            DALIndexPageState={this.props.DALTinyIndexPageState}
                            propsPath={this.props.match.url}
                        />
                    )}
                />
            </switch>
        );
    }
}

export default TinyCoursePage;