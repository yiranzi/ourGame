import React from "react";

import className from "./style/ICTCube.less";

export default function ICTCube() {
    return (
        <div className={className.Cube + " " + className.panelLoad}>
            <div className={className.cube_face + " " + className.cube_face_front}>长</div>
            <div className={className.cube_face + " " + className.cube_face_back}>长</div>
            <div className={className.cube_face + " " + className.cube_face_left}>投</div>
            <div className={className.cube_face + " " + className.cube_face_right}>投</div>
            <div className={className.cube_face + " " + className.cube_face_bottom}>网</div>
            <div className={className.cube_face + " " + className.cube_face_top}>网</div>
        </div>
    );
}