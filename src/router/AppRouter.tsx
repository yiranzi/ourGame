import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {
    HashRouter as Router,
    Route,
    Link,
    Switch
} from "react-router-dom";

import NoMatchPage from "@/view/NoMatchPage";
import CourseAppPage from "@/view/CourseAppPage/CourseAppPage";
import DALUserInfoState from "@/dal/Global";


DALUserInfoState.fetchDALUserInfo();

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