import React from "react";
import DALUserInfoState from "@/dal/Global";
import { observer } from "mobx-react";
import { autorun } from "mobx";

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
                return (<div>等待 pending</div>);
            case "indexPage":
                this.props.history.push("/index");
                break;
            case "pendingPage":
                this.props.history.push("/pending");
                break;
            default:
                return (
                    <div></div>
                );
        }
        // 不写会报react错误，虽然根本不会走到这里
        return (
            <div></div>
        );
    }
}

export default LoadingPage;