// 目标manifest
var targetManiFest = [
    {
        name: 'index.js',
        src: '[host]/index[hash].js',
        type: 'js'
    },
    {
        name: 'index.css',
        src: '[host]/index[hash].css',
        type: 'css'
    }
];

// manifest对应的缓存名
var fkcache_map = 'fkcache_map';

/**
 * fkcache入口函数
 */
(function () {
    if (window.localStorage) {
        // 检测并更新 script 文件
        for (var i = 0; i < targetManiFest.length; i ++) {
            if (checkVersion(targetManiFest[i])) {
                if (targetManiFest.type === 'js') {
                    inJectScript(targetManiFest.name);
                } else {
                    inJectCSS(targetManiFest.name);
                }
            } else {

            }
        }
    }
})(targetManiFest);

/**
 * 检测缓存版本是否与目标版本一致
 * @func checkVersion
 * @param {Object} itemManifest - 目标版本内容  
 * @return {boolean} - 若一致返回true
 */
function checkVersion(itemManifest) {
    var itemManifestCache = window.localStorage.getItem(itemManifest.name);
    if (itemManifestCache !== null) {
        return true;
    } else {
        return false;
    }
}

/**
 * 更新或插入缓存
 * @func upSertCache
 * @param {Object} itemManifest
 */
function upSertCache(itemManifest) {

}


/**
 * 保存代码代码到storage
 * @func storeScriptToStorage
 * 
 */
function storeScriptToStorage() {

}

/**
 * 注入 script 文件
 * @func inJectScript
 * 
 */
function inJectScript() {

}
/**
 * 注入 css 文件
 * @func inJectCSS
 * 
 */
function inJectCSS() {

}