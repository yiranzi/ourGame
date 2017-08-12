"use strict";
/**
 * Test File is a file for testing documenation!
 *
 * @module entrypoint
 */
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const reactserver = require("react-dom/server");
// declare const $$webpack_dev: boolean;
// type HMRModule = typeof module & {
//     hot?: {
//         accept(dependencies: string | string[],
//             callback: (updatedDependencies: any[]) => void): void
//         accept(moduleName: string, callback: () => void): void
//     }
// }
// import * as m from './m';
// if ($$webpack_dev && (module as HMRModule).hot) {
//     // dev w/ HMR: hot-reload './m', './greeting' and re-render
//     console.info("configuring webpack HMR");
//     console.info('m=', m);
//     (module as HMRModule).hot.accept(["./m", "./components/demo"], function () {
//         console.log("accept handler get called", [].slice.call(arguments));
//         console.info("m=", m);
//     });
// } else if ($$webpack_dev) {
//     // dev w/o HMR
//     console.info("webpack HMR not available");
// }
const demo_1 = require("./components/demo");
module.exports = function () {
    return reactserver.renderToString(React.createElement(demo_1.Greeting, { name: "heartblood" },
        React.createElement("div", { "data-position": "top" }, "hello")));
};
