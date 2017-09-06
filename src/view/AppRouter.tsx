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
import TinyCoursePage from "./TinyCoursePage/TinyCoursePage";




export default function AppRouter() {
    return (
        <Router>
            <Switch>
                <Route path="/course/:id" component={CourseAppPage} />
                <Route path="/tinycourse/:id" component={TinyCoursePage} />
                <Route component={NoMatchPage} />
            </Switch>
        </Router>
    );
}