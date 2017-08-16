

window.manifest = [
    {
        name: 'index.js',
        res: '[host][hash].js'    
    },
    {
        name: 'index.css',
        res: '[host][hash].css'
    }
];

/**
 * 执行资源注入
 */
(function() {
    if (window.localStorage) {
        var tasks = [];
        // 检测缓存版本是否与服务器一致
        for (var i = 0; i < manifest.length; i ++) {
            if (!checkVersion(manifest[i])) {
                // 更新资源
                tasks.push(upSertResource(manifest[i]));
                executeXHRTasks(tasks).then(function() {

                }).then
            }
        }
        
    } else {
        alert('您的微信版本号过低');
    }
})(window.manifest);
/**
 * 异步执行xhr队列
 * @func executeXHRTasks
 * @param {Array} xhrtasks -xhr任务队列
 * @return {undefined}
 */
function executeXHRTasks(xhrtasks) {
    var count = 0;
    return new function() {
        var tasks = [];
        this.then = function (callback) {
            tasks.push(callback);
        }
        var next = function() {
            var task = tasks.shift();
            task();
        }
        for(var i=0; i < xhrtasks.length; i ++) {
            xhrtasks[i].onreadystatechange = function () {
                if (XHRHttp.readyState == 4 && XHRHttp.status == 200) {
                    count ++;
                    window.localStorage.setItem(targetItemManifest.name, XHRHttp.responseText);
                    if (count === xhrtasks.length) {
                        next();
                    }
                }
            }
            xhrtasks[i].send()
        }
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
 * @return {undefined}
 */
function upSertResource(targetItemManifest) {
    //采用Http请求get方式;open()方法的第三个参数表示采用异步(true)还是同步(false)处理
    var XHRHttp = getXHRHttp();
    XHRHttp.open("GET", targetItemManifest.res, true);
    return XHRHttp;
}

function getXHRHttp(){
    var obj;
    if (window.XMLHttpRequest)
        obj = new XMLHttpRequest();
    else
        obj = new ActiveXObject("Microsoft.XMLHTTP");
    return obj;
}; 



/**
 * 向页面注入css文件
 * @func inJectCSS
 * @param {Object} targetItemManifest - 目标manifest
 * @return {undefined}
 */
function inJectCSS() {

}
/**
 * 向页面注入javascript文件
 * @func inJectJS
 * @param {Object} targetItemManifest - 目标manifest
 * @return {undefined}
 */
function inJectJS() {

}


