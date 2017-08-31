import React from "react";

import className from "./style/ICTCube.less";

export default function ICTCube() {
    return (
        <div className={className.Cube + " " + className.panelLoad}>
            <div className={className.cube_face + " " + className.cube_face_front}>不</div>
            <div className={className.cube_face + " " + className.cube_face_back}>搞</div>
            <div className={className.cube_face + " " + className.cube_face_left}>要</div>
            <div className={className.cube_face + " " + className.cube_face_right}>事</div>
            <div className={className.cube_face + " " + className.cube_face_bottom}>情</div>
            <div className={className.cube_face + " " + className.cube_face_top}>啊</div>
        </div>
    );
}