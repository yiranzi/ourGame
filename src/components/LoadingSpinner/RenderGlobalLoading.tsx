import * as React from "react";
import * as ReactDOM from "react-dom";
import Loading from "./Loading/Loading";


function mountGlobalLoading() {
    if (!(window as any).globalLoading) {
        ReactDOM.render(
            <Loading animationOut={false}/>,
            document.getElementById("loading")
        );
        (window as any).globalLoading = true;
    }
}

function unMountGlobalLoading() {
    if ((window as any).globalLoading) {
        ReactDOM.render(
            <Loading animationOut={true}/>,
            document.getElementById("loading")
        );
        setTimeout(function() {
            ReactDOM.unmountComponentAtNode(document.getElementById("loading"));
            (window as any).globalLoading = false;
        }, 550);
    }
}

export {
    mountGlobalLoading,
    unMountGlobalLoading
};
