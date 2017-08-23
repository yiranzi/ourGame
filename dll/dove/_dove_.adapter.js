import _Dove_Monitor from './_dove_.monitor';

function _Dove_Adapter() {
    this.name = '_Dove_Monitor';
}

function AdapterCapture() {

}

/**
 * 自定义事件
 * @func CustomEvent
 * @param {string} eventName 自定义事件名称
 * @param {Object} eventInfo 事件信息
 */
function CustomEvent(eventName, eventInfo) {
    this.name = eventName;
    this.eventInfo = eventInfo;
}

CustomEvent.prototype.dispatchEvent = function() {
    _Dove_Monitor.monitorCapture.CustomEventCapture();
}

export default new _Dove_Adapter();