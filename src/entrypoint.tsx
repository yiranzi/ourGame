/**
 * Test File is a file for testing documenation!
 *
 * @module entrypoint
 */


import * as React from "react";
import * as ReactDOM from "react-dom";
declare const $$webpack_dev: boolean;

type HMRModule = typeof module & {
    hot?: {
        accept(dependencies: string | string[],
            callback: (updatedDependencies: any[]) => void): void
        accept(moduleName: string, callback: () => void): void
    }
};

import * as m from "./m";

if ($$webpack_dev && (module as HMRModule).hot) {
    // dev w/ HMR: hot-reload './m', './greeting' and re-render

    console.info("configuring webpack HMR");
    console.info("m=", m);
    (module as HMRModule).hot.accept(["./m", "./view/indexPage"], function () {
        console.log("accept handler get called", [].slice.call(arguments));
        console.info("m=", m);
    });
} else if ($$webpack_dev) {
    // dev w/o HMR
    console.info("webpack HMR not available");
}

import IndexPage from "./view/indexPage";
import AppRouter from "./router/AppRouter";
ReactDOM.render(
    <AppRouter />,
    document.getElementById("app")
);