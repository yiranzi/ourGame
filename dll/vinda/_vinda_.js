// 注入文件，按顺序执行
window.manifest = [
    {
        name: 'vendors-dll.js',
        res: 'https://h5test.ichangtou.com/minic/vinda/vendors-dll.js',
        type: 'js'
    },
    {
        name: 'bundle.js',
        res: 'https://h5test.ichangtou.com/minic/vinda/bundle.js',
        type: 'js'
    }
];


var _VINDA_ = {};
_VINDA_.executeVindaByConfig = function (configArray) {
    return new Promise(function(resolve, reject) {
        if (window.localStorage) {
            var tasks = [];
            // 检测缓存版本是否与服务器一致
            for (var i = 0; i < configArray.length; i++) {
                if (!this.checkVersion(configArray[i])) {
                    // 更新资源
                    console.log('push', configArray[i].name);
                    
                    tasks.push(this.upSertResource(configArray[i]));
                }
            }
            this.executeXHRTasks(tasks).then(function () {
                for (var i = 0; i < configArray.length; i++) {
                    switch (configArray[i].type) {
                        case 'js':
                            console.log('inJectJS');
                            _VINDA_.inJectJS(configArray[i]);
                            break;
                        case 'css':
                            console.log('inJectCSS');
                            _VINDA_.inJectCSS(configArray[i]);
                            break;
                        default:
                            break;
                    }
                }
                resolve();
            }.bind(this));
        } else {
            alert('您的微信版本号过低');
        }
    }.bind(this))
    return null;
}


/**
 * 执行资源注入
 */
_VINDA_.executeVinda = function () {
    if (window.localStorage) {
        var tasks = [];
        // 检测缓存版本是否与服务器一致
        for (var i = 0; i < window.manifest.length; i++) {
            if (!this.checkVersion(window.manifest[i])) {
                // 更新资源
                tasks.push(this.upSertResource(window.manifest[i]));
            }
        }
        this.executeXHRTasks(tasks).then(function () {
            for (var i = 0; i < window.manifest.length; i++) {
                switch (window.manifest[i].type) {
                    case 'js':
                        console.log('inJectJS');
                        _VINDA_.inJectJS(window.manifest[i]);
                        break;
                    case 'css':
                        console.log('inJectCSS');
                        _VINDA_.inJectCSS(window.manifest[i]);
                        break;
                    default:
                        break;
                }
            }
        })

    } else {
        alert('您的微信版本号过低');
    }
}
/**
 * 异步执行xhr队列
 * @func executeXHRTasks
 * @param {Array} XHRtasks - xhr任务队列
 * @return {undefined}
 */
_VINDA_.executeXHRTasks = function (XHRtasks) {
    var count = 0;
    return new Promise(function(resolve, reject) {
        if (XHRtasks.length === 0) {
            resolve();
        }
        for (var i = 0; i < XHRtasks.length; i++) {
                (function () {
                    var XHRTask = XHRtasks[i];
                    XHRTask.XHRHttp.onreadystatechange = function () {
                        if (XHRTask.XHRHttp.readyState == 4 && XHRTask.XHRHttp.status == 200) {
                            count++;
                            console.log('get', XHRTask.name);
                            window.localStorage.setItem('_VINDA_' + XHRTask.name, XHRTask.XHRHttp.responseText);
                            window.localStorage.setItem('_vinda_' + XHRTask.name, XHRTask.res);
                            if (count === XHRtasks.length) {
                                resolve();
                            }
                        }
                    }
                XHRTask.XHRHttp.send();
            })(i);
        }
    });
}
/**
 * 执行版本检测
 * @func checkVersion 
 * @param {Object} targetItemManifest - 目标manifest
 * @return {boolean} - 如果版本一致，返回true
 */
_VINDA_.checkVersion = function (targetItemManifest) {
    return window.localStorage.getItem('_vinda_' + targetItemManifest.name) === targetItemManifest.res;
}

/**
 * 更新或保存资源
 * @func upSertResource
 * @param {Object} targetItemManifest - 目标manifest
 * @return {Object} - XHRHttp
 */
_VINDA_.upSertResource = function (targetItemManifest) {
    //采用Http请求get方式;open()方法的第三个参数表示采用异步(true)还是同步(false)处理
    var XHRHttp;
    if (window.XMLHttpRequest)
        XHRHttp = new XMLHttpRequest();
    else
        XHRHttp = new ActiveXObject("Microsoft.XMLHTTP");
    XHRHttp.open("GET", targetItemManifest.res, true);
    XHRHttp.setRequestHeader('Cache-Control', 'no-cache')
    return {
        XHRHttp: XHRHttp,
        name: targetItemManifest.name,
        res: targetItemManifest.res
    };
}

/**
 * 向页面注入css文件
 * @func inJectCSS
 * @param {Object} targetItemManifest - 目标manifest
 * @return {undefined}
 */
_VINDA_.inJectCSS = function (targetItemManifest) {
    var body = document.getElementsByTagName('body').item(0);
    var link = document.createElement('style');
    link.type = 'text/css';
    link.innerHTML = localStorage.getItem('_VINDA_' + targetItemManifest.name);
    body.appendChild(link);
}
/**
 * 向页面注入javascript文件
 * @func inJectJS
 * @param {Object} targetItemManifest - 目标manifest
 * @return {undefined}
 */
_VINDA_.inJectJS = function (targetItemManifest) {
    var body = document.getElementsByTagName('body').item(0);
    var link = document.createElement('script');
    link.type = 'text/javascript';
    link.innerHTML = localStorage.getItem('_VINDA_' + targetItemManifest.name);
    body.appendChild(link);
}


Object.freeze(_VINDA_);