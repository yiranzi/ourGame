//导入
import React from "react";

import React from "react";
import className from "./style/CourseListPage.less";

import { observer } from "mobx-react";

import SelectPage from "@/containers/CourseAppPage/SelectPage/SelectPage";
import DALGetCourseList from "@/dal/SelectPage/GetCourseList";

//接口
interface PropsTypes {

}

//类
class CourseListPage extends React.Component<PropsTypes> {
    constructor() {
        DALGetCourseList.fetchDayCourseList();
        super();
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

//导出
export default CourseListPage;