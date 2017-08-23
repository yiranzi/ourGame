import _Dove_Monitor from './_dove_.monitor';

function _Dove_Adapter() {
    this.name = '_Dove_Monitor';
}

_Dove_Adapter.prototype.adaptercallback = function(type, e) {
    console.log(e);
    switch (type) {
        case '_dove_globalError':
            console.log(e);
            break;
        case '_customEventCapture':
            console.log(e);
            break;
    }
}

export default _Dove_Adapter;