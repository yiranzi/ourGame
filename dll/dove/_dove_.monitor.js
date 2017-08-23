function _Dove_Monitor() {
    this.name = '_Dove_Monitor';
    this.monitorCapture = new MonitorCapture();
}

function MonitorCapture() {

}

/**
 * 全局 error 事件捕获器
 * @func GlobalErrorMonitorCapture
 * @param {Function} callback 回调函数
 */
MonitorCapture.prototype.GlobalErrorMonitorCapture = function(callback) {
    /**
     * @param {String}  errorMessage   错误信息
     * @param {String}  scriptURI      出错的文件
     * @param {Long}    lineNumber     出错代码的行号
     * @param {Long}    columnNumber   出错代码的列号
     * @param {Object}  errorObj       错误的详细信息，Anything
     */
    window.onerror = function(errorMessage, scriptURI, lineNumber,columnNumber,errorObj) {
        // todo 测试log，需删除
        console.log("错误信息：" , errorMessage);
        console.log("出错文件：" , scriptURI);
        console.log("出错行号：" , lineNumber);
        console.log("出错列号：" , columnNumber);
        console.log("错误详情：" , errorObj);
        callback && callback(errorMessage, scriptURI, lineNumber,columnNumber,errorObj);
    }
}

/**
 * 统一事件捕获器
 * @func DomEventMonitorCapture
 * @param {Function} callback 回调函数
 */
MonitorCapture.prototype.DomEventMonitorCapture = function(callback) {
    var eventList = [];
    for (var i of eventList) {
        document.addEventListener(i, callback, true);
    }
}
/**
 * 微信api接口事件捕获器
 * @func WXAPIMonitorCapture
 * @param {Function} callback 回调函数
 */
MonitorCapture.prototype.WXAPIMonitorCapture = function(callback) {
    // todo WXAPIMonitorCapture
}

/**
 * 自定义事件捕获器
 * @func CustomEventCapture
 * @param {Function} callback 回调函数
 */
MonitorCapture.prototype.CustomEventCapture = function(callback) {
    callback && callback(arguments.slice(1, arguments.length - 1));
}

export default new _Dove_Monitor();

