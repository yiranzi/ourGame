import React from "react";
import {
    HashRouter as Router,
    Route,
    Link,
    Switch
} from "react-router-dom";

import NoMatchPage from "@/view/NoMatchPage";
import CourseAppPage from "./CourseAppPage/CourseAppPage";
import CourseListPage from "./CourseAppPage/CourseListPage/CourseListPage";
import TinyCourseIndexPage from "./TinyCoursePage/IndexPage/IndexContainer"





export default function AppRouter() {
    return (
        <Router>
            <Switch>
                <Route path="/course/:id" component={CourseAppPage} />
                <Route component={TinyCourseIndexPage} />
            </Switch>
        </Router>
    );
}