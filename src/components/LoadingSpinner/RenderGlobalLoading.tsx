import * as React from "react";
import * as ReactDOM from "react-dom";
import Loading from "@/components/LoadingSpinner/Loading/Loading";


function mountGlobalLoading() {
    if (!(window as any).globalLoading) {
        ReactDOM.render(
            <Loading />,
            document.getElementById("loading")
        );
        (window as any).globalLoading = true;
    }
}

function unMountGlobalLoading() {
    if ((window as any).globalLoading) {
        ReactDOM.unmountComponentAtNode(document.getElementById("loading"));
        (window as any).globalLoading = false;
    }
}

export {
    mountGlobalLoading,
    unMountGlobalLoading
};
