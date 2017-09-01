import React from "react";
import DALUserInfoState from "@/dal/global";
import DALUserSignUp from "@/dal/global/UserSignUp";
import { observer } from "mobx-react";


interface PropsTypes {}

DALUserSignUp.isUserSignUp

async

@observer
class LoadingPage extends React.PureComponent<PropsTypes> {
    render() {
        switch DALUserInfoState.state {
            case "":
        }
    }
}

export default LoadingPage;