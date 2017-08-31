import React from "react";
import {
    HashRouter as Router,
    Route,
    Link,
    Switch
} from "react-router-dom";

import NoMatchPage from "@/view/NoMatchPage";
import IndexPage from "@/view/IndexPage/IndexPage";

export default function AppRouter() {
    return (
        <Router>
            <Switch>
                <Route path="/index" component={IndexPage} />
                <Route component={NoMatchPage} />
            </Switch>
        </Router>
    );
}