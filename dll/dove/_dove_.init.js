import _Dove_Monitor from './_dove_.monitor';
import _Dove_Adapter from './_dove_.adapter';

function Dove() {
    this.monitor = new _Dove_Monitor();
    this.adapter = new _Dove_Adapter();
};

Dove.prototype.mountAllMonitorCapture = function() {
    this.monitor.mountAllMonitorCapture(this.adapter);
}


// inject windiw
window._dove_ = new Dove();

_dove_.mountAllMonitorCapture();