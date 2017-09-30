//关卡进度.存档点.
//选择的节点?
//章节
//节点
//进度

//用户属性
//好感度

var userProcess = {
    scene: 0,
    branch: 0,
    dialog: 0,
}

var userAttribute = {
    MQ: 0,
    b1Love: 0,
    b2Love: 0,
}

function USER_DATA_SAVE(userData) {
    if ( userData.scene && userData.branch && userData.dialog) {
        let pData = JSON.stringify(userData);
        window.localStorage.setItem('userProcess', pData);
    } else if ( userData.MQ && userData.b1Love && userData.b2Love ) {
        let pData = JSON.stringify(userData);
        window.localStorage.setItem('userAttribute', pData);
    }


}

function USER_DATA_INIT() {
    // 从storage中提取存档信息
    let sScene = window.localStorage.getItem('userProcess');
    let sAttribute = window.localStorage.getItem('userAttribute');
    saveToSet(userProcess, sScene);
    saveToSet(userAttribute, sAttribute);
}

function saveToSet(objName, value) {
    if (value) {
        objName = value;
    }
}

export {userProcess, userAttribute, USER_DATA_INIT, USER_DATA_SAVE}
