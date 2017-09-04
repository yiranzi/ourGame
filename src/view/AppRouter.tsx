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

export default function AppRouter() {
    return (
        <Router>
            <Switch>
                <Route path="/course/:id" component={CourseAppPage} />
                <Route component={NoMatchPage} />
            </Switch>
        </Router>
    );
}