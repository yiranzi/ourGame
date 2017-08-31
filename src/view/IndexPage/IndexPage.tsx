import * as React from "react";
import className from "./style/IndexPage.less";
import IndexContainer from "@/containers/IndexPage/IndexContainer";
export default class IndexPage extends React.Component<{}> {
    constructor() {
        super();
    }
    render() {
        return (
            <div className={className.wrapper}>
                <IndexContainer />
            </div>
        );
    }
}