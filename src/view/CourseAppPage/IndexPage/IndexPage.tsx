import * as React from "react";
import className from "./style/IndexPage.less";
import IndexContainer from "@/containers/IndexPage/IndexContainer";
import DALIndexPage from "@/dal/indexPage";
import Loading from "@/components/LoadingSpinner/Loading/Loading";
import { Route } from "react-router-dom";
import { observer } from "mobx-react";
interface PropsTypes {
    DALUserInfoState: any;
    DALCourseState: any;
    history?: any;
    propsPath?: string;
}
@observer
export default class IndexPage extends React.Component<PropsTypes> {
    private DALIndexPageState: DALIndexPage = new DALIndexPage();
    constructor(props: PropsTypes) {
        super(props);
        // 获取当前页面需要的数据
        this.props.DALUserInfoState.fetchDALUserInfo().then(() => {
            this.props.DALCourseState.fetchDALUserSignState();
        });
    }
    render() {
        // 判断是否已购买课程
        switch (this.props.DALCourseState.userSignState) {
            case "pending":
                return <Loading />;
            case "haspay":
                this.props.history.push(`${this.props.propsPath}/wait`);
                break;
        }
        return (
            <div className={className.wrapper}>
                <IndexContainer DALState={this.DALIndexPageState} DALUserInfoState={this.props.DALUserInfoState}/>
            </div>
        );
    }
}