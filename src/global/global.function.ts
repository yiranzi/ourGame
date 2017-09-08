import * as _GLOBAL_CONFIG_ from "@/global/global.config";

function PostStatistic(project: any, version: any, event: any, message: any) {
    return new Promise((resolve, reject) => {
        fetch("https://statistic.ichangtou.com/statistic/event", {
            method: "POST",
            body: JSON.stringify({project, version, event, message}),
            mode: "cors",
            headers: {
                "Accept": "application/json",
                "X-iChangTou-Json-Api-Token": _GLOBAL_CONFIG_._API_TOKEN_,
                "Content-Type": "application/json;charset=utf-8"
            }
        }).then((res: any) => {
            res
                .json()
                .then((data: any) => {
                   resolve(data);
                });
        });
    });
}

function PostCnzzStatisticData(eventName:string, eventDesc:string, version:number) {
    try {
        if( window._czc && window._czc.push ){
            window._czc.push(["_trackEvent",'小课',version,eventName, eventDesc]);
        }
    }catch ( e ) {
        console.log('统计代码错误');
    }
}

export {
    PostStatistic,
    PostCnzzStatisticData
}