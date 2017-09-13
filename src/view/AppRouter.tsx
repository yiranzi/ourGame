import React from "react";
import {
    HashRouter as Router,
    Route,
    Link,
    Switch
} from "react-router-dom";

// import NoMatchPage from "@/view/NoMatchPage";
// import CourseAppPage from "./CourseAppPage/CourseAppPage";
//
// import TinyCoursePage from "./TinyCoursePage/TinyCoursePage";
import Main from "./GamePage/Main";

export default function AppRouter() {
    return (
        <Router>
            <Switch>
                {/*<Route path="/course/:id" component={CourseAppPage} />*/}
                {/*<Route path="/tinycourse/:id" component={TinyCoursePage} />*/}
                <Route component={Main} />
            </Switch>
        </Router>
    );
}