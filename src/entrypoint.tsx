/**
 * Test File is a file for testing documenation!
 *
 * @module entrypoint
 */


import * as React from "react";
import * as ReactDOM from "react-dom";
declare const $$webpack_dev: boolean;

!function (e) {
    function t(a) {
        if (i[a]) 
            return i[a].exports;
        let n = i[a] = {
            exports: {},
            id: a,
            loaded: !1
        };
        return e[a].call(n.exports, n, n.exports, t),
        n.loaded = !0,
        n.exports
    }
    let i = {};
    return t.m = e,
    t.c = i,
    t.p = "",
    t(0)
}([function (e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        let i = window;
        t["default"] = i.flex = function (e, t) {
            let a = e || 100,
                n = t || 1,
                r = i.document,
                o = navigator.userAgent,
                d = o.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i),
                l = o.match(/U3\/((\d+|\.){5,})/i),
                c = l && parseInt(l[1].split(".").join(""), 10) >= 80,
                p = navigator
                    .appVersion
                    .match(/(iphone|ipad|ipod)/gi),
                s = i.devicePixelRatio || 1;
            p || d && d[1] > 534 || c || (s = 1);
            let u = 1 / s,
                m = r.querySelector("meta[name='viewport']");
            m || (m = r.createElement("meta"), m.setAttribute("name", "viewport"), r.head.appendChild(m)),
            m.setAttribute("content", "width=device-width,user-scalable=no,initial-scale=" + u + ",maximum-scale=" + u + ",minimum-scale=" + u),
            r.documentElement.style.fontSize = a / 2 * s * n + "px";
        },
        e.exports = t["default"]
    }
]);
type HMRModule = typeof module & {
    hot?: {
        accept(dependencies: string | string[],
            callback: (updatedDependencies: any[]) => void): void
        accept(moduleName: string, callback: () => void): void
    }
};

import * as m from "./m";

if ($$webpack_dev && (module as HMRModule).hot) {
    // dev w/ HMR: hot-reload "./m", "./greeting" and re-render

    console.info("configuring webpack HMR");
    console.info("m=", m);
    (module as HMRModule).hot.accept(["./m", "./view/AppRouter"], function () {
        console.log("accept handler get called", [].slice.call(arguments));
        console.info("m=", m);
    });
} else if ($$webpack_dev) {
    // dev w/o HMR
    console.info("webpack HMR not available");
}
import AppRouter from "./view/AppRouter";
ReactDOM.render(
    <AppRouter />,
    document.getElementById("app")
);