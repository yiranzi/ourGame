import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from "react-router-dom";

import indexPage from "@/view/indexPage";
import NoMatchPage from "@/view/NoMatchPage";
export default function AppRouter() {
    return (
        <Router>
            <Switch>
                <Route path="/index" component={indexPage} />
                <Route component={NoMatchPage} />
            </Switch>
        </Router>
    );
}