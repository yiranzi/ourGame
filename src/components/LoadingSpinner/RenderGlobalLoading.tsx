import * as React from "react";
import * as ReactDOM from "react-dom";
import Loading from "./Loading/Loading";
import Spinner from "./Loading/Spinner";
import MaterialSpinner from "./Loading/MaterialSpinner";
function mountGlobalLoading() {
    if (!(window as any).globalLoading) {
        ReactDOM.render(
            <MaterialSpinner animationOut={false}/>,
            document.getElementById("loading")
        );
        (window as any).globalLoading = true;
    }
}

function unMountGlobalLoading() {
    if ((window as any).globalLoading) {
        ReactDOM.render(
            <MaterialSpinner animationOut={true}/>,
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
