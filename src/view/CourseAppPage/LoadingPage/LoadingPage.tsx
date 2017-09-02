import React from "react";
import DALUserInfoState from "@/dal/Global";
import { observer } from "mobx-react";
import { autorun } from "mobx";
import {
    mountGlobalLoading,
    unMountGlobalLoading
} from "@/components/LoadingSpinner/RenderGlobalLoading";


interface PropsTypes {
    history: any;
}

autorun(() => {
    if (DALUserInfoState.openId !== null) {
        DALUserInfoState.fetchDALUserSignState();
    }
});

@observer
class LoadingPage extends React.PureComponent<PropsTypes> {
    render() {
        switch (DALUserInfoState.userSignState) {
            case "pending":
                mountGlobalLoading();
                return null;
            case "indexPage":
                this.props.history.push("/index");
                return null;
            case "pendingPage":
                this.props.history.push("/pending");
                return null;
            default:
                unMountGlobalLoading();
        }
        // 不写会报react错误，虽然根本不会走到这里
        return (
            <div></div>
        );
    }
}

export default LoadingPage;