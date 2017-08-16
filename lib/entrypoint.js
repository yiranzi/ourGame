"use strict";
/**
 * Test File is a file for testing documenation!
 *
 * @module entrypoint
 */
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
const m = require("./m");
if ($$webpack_dev && module.hot) {
    // dev w/ HMR: hot-reload './m', './greeting' and re-render
    console.info("configuring webpack HMR");
    console.info("m=", m);
    module.hot.accept(["./m", "./components/demo"], function () {
        console.log("accept handler get called", [].slice.call(arguments));
        console.info("m=", m);
    });
}
else if ($$webpack_dev) {
    // dev w/o HMR
    console.info("webpack HMR not available");
}
const indexPage_1 = require("./view/indexPage");
ReactDOM.render(React.createElement(indexPage_1.default, null), document.getElementById("app"));
const jweixin_1 = require("@/assets/js/jweixin");
console.log(jweixin_1.default);
