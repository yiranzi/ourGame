import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {
    HashRouter as Router,
    Route,
    Link,
    Switch
} from "react-router-dom";

import NoMatchPage from "@/view/NoMatchPage";
import CourseAppPage from "./CourseAppPage/CourseAppPage";
import CourseListPage from "./CourseAppPage/CourseListPage/CourseListPage";
import CourseListenPage from "./CourseAppPage/CourseListenPage/CourseListenPage";

export default function AppRouter() {
    return (
        <Router>
            <Switch>
                <Route path="/course/:id" component={CourseAppPage} />
                <Route component={CourseListenPage} />
            </Switch>
        </Router>
    );
}