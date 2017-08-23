function _Dove_Monitor() {
    this.name = '_Dove_Monitor';
    this.monitorCapture = new MonitorCapture();
}


function MonitorCapture() {
    this.userMotionStack = [];
}

/**
 * 广播自定义事件
 * @func dispatchCustomEvent
 * @param {string} eventName 事件名
 * @param {any} eventInfo 事件参数
 */
_Dove_Monitor.prototype.dispatchCustomEvent = function(eventName, eventInfo) {
    dispatchEvent(new CustomEvent('_dove_CustomEvent', {
        bubbles: true,
        cancelable: false,
        detail: {
            type: '_dove_CustomEvent',
            name: eventName,
            info: eventInfo
        }
    }));
}

/**
 * 获取用户触摸行为栈
 */
_Dove_Monitor.prototype.getUserMotionStack = function() {
    return this.monitorCapture.userMotionStack;
}

/**
 * 获取执行环境
 * @func getJSRuntimeEnv
 */
_Dove_Monitor.prototype.getJSRuntimeEnv = function() {
    var gpuType = null;
    (function(){
        var canvas = document.createElement('canvas'),
        gl = canvas.getContext('experimental-webgl'),
        debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        gpuType = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    })();
    return {
        gpuType: gpuType,
        ua: navigator.userAgent
    }
}

/**
 * 挂载所有类型事件捕获器
 * @func mountAllMonitorCapture
 * @param {Object} adapter _dove_ adapter
 */
_Dove_Monitor.prototype.mountAllMonitorCapture = function(adapter) {
    this.monitorCapture._globalErrorMonitorCapture(adapter.adapterCallback);
    this.monitorCapture._domEventMonitorCapture(adapter.adapterCallback);
    this.monitorCapture._customEventCapture(adapter.adapterCallback);
    this.monitorCapture._userMotionCapture();
}

/**
 * 全局 error 事件捕获器
 * @func GlobalErrorMonitorCapture
 * @param {Function} callback 回调函数
 */
MonitorCapture.prototype._globalErrorMonitorCapture = function(callback) {
    /**
     * @param {String}  errorMessage   错误信息
     * @param {String}  scriptURI      出错的文件
     * @param {Long}    lineNumber     出错代码的行号
     * @param {Long}    columnNumber   出错代码的列号
     * @param {Object}  errorObj       错误的详细信息，Anything
     */
   
    window.onerror = function(errorMessage, scriptURI, lineNumber,columnNumber,errorObj) {
        callback && callback('_dove_globalError', {errorMessage:errorMessage, scriptURI:scriptURI, lineNumber:lineNumber, columnNumber:columnNumber, errorObj:errorObj});
    }
}

/**
 * 监听用户触摸行为
 * @func _userMotionCapture
 */
MonitorCapture.prototype._userMotionCapture = function() {
    document.addEventListener('touchstart', function(e) {
        
    }.bind(this), true);
    document.addEventListener('touchmove', function(e) {
        
    }.bind(this), true);
    document.addEventListener('touchend', function(e) {
        if (this.userMotionStack.length === 6) {
            this.userMotionStack.shift();
            this.userMotionStack.push(e);
        } else {
            this.userMotionStack.push(e);
        }
    }.bind(this), true);
}

/**
 * 统一事件捕获器
 * @func DomEventMonitorCapture
 * @param {Function} callback 回调函数
 */
MonitorCapture.prototype._domEventMonitorCapture = function(callback) {
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
MonitorCapture.prototype._WXAPIMonitorCapture = function(callback) {
    // todo WXAPIMonitorCapture
}

/**
 * 自定义事件捕获器
 * @func CustomEventCapture
 * @param {Function} callback 回调函数
 */
MonitorCapture.prototype._customEventCapture = function(callback) {
    addEventListener('_dove_CustomEvent', function(e) {
        console.log(e);
        callback && callback('_dove_CustomEvent', e);
    }, true)
}

export default _Dove_Monitor;

