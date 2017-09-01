import React from "react";
import {
    HashRouter as Router,
    Route,
    Link,
    Switch
} from "react-router-dom";

import NoMatchPage from "@/view/NoMatchPage";
import IndexPage from "@/view/IndexPage/IndexPage";
import LoadingPage from "@/view/LoadingPage/LoadingPage";
import DALUserInfoState from "@/dal/Global";

DALUserInfoState.fetchDALUserInfo();

export default function AppRouter() {
    return (
        <Router>
            <Switch>
                <Route path="/" component={LoadingPage} />
                <Route path="/index" component={IndexPage} />
                <Route component={NoMatchPage} />
            </Switch>
        </Router>
    );
}