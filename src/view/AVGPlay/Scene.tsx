import * as React from "react";
import ScenePlay from "@/view/AVGPlay/ScenePlay/ScenePlay";
import {stageData, init} from "@/view/AVGPlay/StageData/Stage1";

interface PropsTypes {
}

interface StateTypes {
}

class Scene extends React.Component<PropsTypes, StateTypes> {
    constructor(props: PropsTypes) {
        super(props);
    }
    componentWillMount() {
        init();
    }
    render() {
        console.log(stageData);
        return (
            <div>
                <ScenePlay currentStage = {stageData}></ScenePlay>
            </div>
        );
    }
}

export default Scene;