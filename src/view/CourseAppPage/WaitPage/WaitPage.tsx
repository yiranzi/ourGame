import * as React from "react";
import className from "./style/WaitPage.less";
import WaitContainer from "@/containers/CourseAppPage/WaitPage/IndexContainer";
import DALIndexPage from "@/dal/indexPage";
import NoMatchPage from "@/view/NoMatchPage";
import { Route } from "react-router-dom";
interface PropsTypes {
    DALUserInfoState: any;
    DALCourseState: any;
    history?: any;
    propsPath?: string;
}

export default class WaitPage extends React.Component<PropsTypes> {
    constructor(props: PropsTypes) {
        super(props);
    }
    render() {
        return (
            <div className={className.wrapper}>
                <WaitContainer />
            </div>
        );
    }
}