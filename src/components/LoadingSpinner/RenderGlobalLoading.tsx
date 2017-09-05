import * as React from "react";
import * as ReactDOM from "react-dom";
import Loading from "./Loading/Loading";
import Spinner from "./Loading/Spinner";
import WinLoading from "./Loading/WinLoading";
function mountGlobalLoading() {
    if (!(window as any).globalLoading) {
        ReactDOM.render(
            <WinLoading animationOut={false}/>,
            document.getElementById("loading")
        );
        (window as any).globalLoading = true;
    }
}

function unMountGlobalLoading() {
    if ((window as any).globalLoading) {
        ReactDOM.render(
            <WinLoading animationOut={true}/>,
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
