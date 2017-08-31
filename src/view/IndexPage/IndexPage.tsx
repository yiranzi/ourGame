import * as React from "react";
import className from "./style/IndexPage.less";
import IndexContainer from "@/containers/IndexPage/IndexContainer";
import DALIndexPage from "@/dal/indexPage";
export default class IndexPage extends React.Component<{}> {
    private DALIndexPageState: DALIndexPage = new DALIndexPage();
    constructor() {
        super();
    }
    render() {
        return (
            <div className={className.wrapper}>
                <IndexContainer DALState={this.DALIndexPageState}/>
            </div>
        );
    }
}