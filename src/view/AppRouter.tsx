import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {
    HashRouter as Router,
    Route,
    Link,
    Switch
} from "react-router-dom";

import NoMatchPage from "@/view/NoMatchPage";
import CourseAppPage from "./CourseAppPage/CourseAppPage";
import CourseListPage from "./CourseAppPage/CourseListPage/CourseListPage";
import CourseListenPage from "./CourseAppPage/CourseListenPage/CourseListenPage";

import CourseListContain from "@/Containers/CourseAppPage/SelectPage/SelectPage";
import ListenCourseContain from "@/Containers/CourseAppPage/CourseListenPage/CourseListenContainer";

export default function AppRouter() {
    let prop = [
        {
            audio: "https://h5.ichangtou.com/minicfm/assets/audio/fund/0-4.mp3",
            dayid: 10,
            fmid: 100,
            pptUrl: ["https://h5.ichangtou.com/minicfm/assets/image/newfundppt/0-4.jpg", "https://h5.ichangtou.com/minicfm/assets/image/newfundppt/0-4.jpg"],
            process: true,
            subs: [
                {
                    answerList: [
                        {
                            amswerid: 100,
                            detail: "债券",
                            istrue: 0,
                            subjectid: 100,
                        },
                        {
                            amswerid: 100,
                            detail: "债券",
                            istrue: 0,
                            subjectid: 100,
                        }
                        {
                            amswerid: 100,
                            detail: "债券",
                            istrue: 0,
                            subjectid: 100,
                        }
                    ],
                    fmid: 100,
                    introduce: '问题描述',
                    process: false,
                    subjectid: 100,
                    tips: '我是股神',
                    trueindex: [0],
                },
                {
                    answerList: [
                        {
                            amswerid: 100,
                            detail: "债券",
                            istrue: 0,
                            subjectid: 100,
                        },
                        {
                            amswerid: 100,
                            detail: "债券",
                            istrue: 0,
                            subjectid: 100,
                        }
                        {
                            amswerid: 100,
                            detail: "债券",
                            istrue: 0,
                            subjectid: 100,
                        }
                    ],
                    fmid: 100,
                    introduce: '问题描述',
                    process: false,
                    subjectid: 100,
                    tips: '我是股神',
                    trueindex: [0],
                }
            ],
            title: "title",
        },
        {
            audio: "https://h5.ichangtou.com/minicfm/assets/audio/fund/0-4.mp3",
            dayid: 10,
            fmid: 100,
            pptUrl: ["https://h5.ichangtou.com/minicfm/assets/image/newfundppt/0-4.jpg", "https://h5.ichangtou.com/minicfm/assets/image/newfundppt/0-4.jpg"],
            process: true,
            subs: [
                {
                    answerList: [
                        {
                            amswerid: 100,
                            detail: "债券",
                            istrue: 0,
                            subjectid: 100,
                        }
                    ],
                    fmid: 100,
                    introduce: '问题描述',
                    process: false,
                    subjectid: 100,
                    tips: '我是股神',
                    trueindex: [0],
                }
            ],
            title: "title",
        },
    ];
    return (
        <Router>
            <Switch>
                <Route path="/course/:id" component={CourseAppPage} />
                {/*<Route component={ListenCourseContain} />*/}
                <Route
                       render={() => (
                           <ListenCourseContain courseListenState={prop}/>
                       )}
                />
            </Switch>
        </Router>
    );
}