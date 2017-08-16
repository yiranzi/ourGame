
// 注入文件，按顺序执行
window.manifest = [
    {
        name: 'index.css',
        res: 'https://h5test.ichangtou.com/edu/college/static/css/app.49b12ae0f2f1850d67c09fee5a0bda08.css',
        type: 'css'
    },
    {
        name: 'index.js',
        res: 'https://h5test.ichangtou.com/edu/college/static/js/vendor.babc2001c289b0010969.js',
        type: 'js'    
    }
];

/**
 * 执行资源注入
 */
(function() {
    if (window.localStorage) {
        var tasks = [];
        // 检测缓存版本是否与服务器一致
        for (var i = 0; i < window.manifest.length; i ++) {
            if (!checkVersion(window.manifest[i])) {
                // 更新资源
                tasks.push(upSertResource(window.manifest[i]));
            }
        }
        console.log(tasks);
        executeXHRTasks(tasks).then(function() {
            for (var i = 0; i < window.manifest.length; i ++) {
                switch (window.manifest[i].type) {
                    case 'js': 
                        console.log('inJectJS');
                        inJectJS(window.manifest[i]);
                        break;
                    case 'css':
                        console.log('inJectCSS');
                        inJectCSS(window.manifest[i]);
                        break;
                    default:
                        break;
                }
            }
        })
        
    } else {
        alert('您的微信版本号过低');
    }
})(window);
/**
 * 异步执行xhr队列
 * @func executeXHRTasks
 * @param {Array} XHRtasks - xhr任务队列
 * @return {undefined}
 */
function executeXHRTasks(XHRtasks) {
    
    var count = 0;
    return new function() {
        var tasks = [];
        this.then = function(callback) {
            tasks.push(callback);
            return this;
        }
        var next = function() {
            var task = tasks.shift();
            task && task();
        }
        var fn = function() {
            for(var i = 0; i < XHRtasks.length; i ++) {
                (function() {
                    var XHRTask = XHRtasks[i];
                    XHRTask.XHRHttp.onreadystatechange = function() {
                        console.log(XHRTask);
                        if (XHRTask.XHRHttp.readyState == 4 && XHRTask.XHRHttp.status == 200) {
                            count ++;
                            console.log('get', XHRTask.name);
                            window.localStorage.setItem(XHRTask.name, XHRTask.XHRHttp.responseText);
                            if (count === XHRtasks.length) {
                                next();
                            }
                        }
                    }
                    XHRTask.XHRHttp.send();
                })(i);
            }
        }
        tasks.push(fn);
        setTimeout(function() {
            next();
        }, 0);        
    }
}
/**
 * 执行版本检测
 * @func checkVersion 
 * @param {Object} targetItemManifest - 目标manifest
 * @return {boolean} - 如果版本一致，返回true
 */
function checkVersion(targetItemManifest) {
    return window.localStorage.getItem(targetItemManifest.name) === targetItemManifest.res;
}

/**
 * 更新或保存资源
 * @func upSertResource
 * @param {Object} targetItemManifest - 目标manifest
 * @return {Object} - XHRHttp
 */
function upSertResource(targetItemManifest) {
    //采用Http请求get方式;open()方法的第三个参数表示采用异步(true)还是同步(false)处理
    var XHRHttp;
    if (window.XMLHttpRequest)
        XHRHttp = new XMLHttpRequest();
    else
        XHRHttp = new ActiveXObject("Microsoft.XMLHTTP");
    XHRHttp.open("GET", targetItemManifest.res, true);
    return {
        XHRHttp: XHRHttp,
        name: targetItemManifest.name
    };
}

/**
 * 向页面注入css文件
 * @func inJectCSS
 * @param {Object} targetItemManifest - 目标manifest
 * @return {undefined}
 */
function inJectCSS(targetItemManifest) {
    var body = document.getElementsByTagName('body').item(0);
    var link = document.createElement("style");
    link.type = "text/css";
    link.innerHTML = localStorage.getItem(targetItemManifest.name);
    body.appendChild(link);
}
/**
 * 向页面注入javascript文件
 * @func inJectJS
 * @param {Object} targetItemManifest - 目标manifest
 * @return {undefined}
 */
function inJectJS(targetItemManifest) {
    var body = document.getElementsByTagName('body').item(0);
    var link = document.createElement("script");
    link.type = "text/javascript";
    link.innerHTML = localStorage.getItem(targetItemManifest.name);
    body.appendChild(link); 
}


