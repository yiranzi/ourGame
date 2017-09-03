import * as React from "react";
import className from "./style/CourseSelect.less";

import { observer } from "mobx-react";

import SelectPage from "@/containers/SelectPage/SelectPage";
import DALGetCourseList from "@/dal/SelectPage/GetCourseList";
export default class IndexPage extends React.Component<{}> {
    constructor() {
        super();
    }

    componentWillMount() {
        DALGetCourseList.fetchDayCourseList();
    }

    @observer
    render() {
        if ( DALGetCourseList.dayCourseList ) {
            let dayCourseList = DALGetCourseList.dayCourseList;
            return (
                <div className={className.view}>
                    <SelectPage dayCourseList={dayCourseList}/>
                </div>
            );
        } else {
            return(<div>empty before get courseSelect</div>);
        }

    }
}