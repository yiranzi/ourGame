// defined wx global config
window._WXGLOBAL_ = (function () {
    var _ENVIRONMENT = (function () {
        if (location.href.indexOf('h5.ichangtou.com') > -1) {
            return true;
        } else {
            return false;
        }
    })();
    var __debug__ = location
        .href
        .indexOf('localhost') > 0;
    var __TEST_API_Token__ = 'XX:_:w2qlJFV@ccOeiq41ENp><ETXh3o@aX8M<[_QOsZ<d8[Yz:NIMcKwpjtBk0e';
    var _FORMAL_API_DOMAIN = 'https://growth.ichangtou.com/';
    var _TEST_API_DOMAIN = 'https://geek.ichangtou.com/';
    var __API_URL_DOMAIN__ = _ENVIRONMENT
        ? _FORMAL_API_DOMAIN
        : _TEST_API_DOMAIN;
    var __TEST_APPID__ = 'wx7cf8dd5d80048e42';
    var __FORMA_APPID__ = 'wxd6c823882698f217';
    var __APPID__ = _ENVIRONMENT
        ? __FORMA_APPID__
        : __TEST_APPID__;
    var __API_URL_GROUP__ = {
        'wx_sign': 'wx/signature',
        'userinfo_authorization': 'wx/h5/info/login/OA_CTW',
        'base_login': 'wx/h5/base/login/OA_CTW',
        'get_order': 'payment/wx/jsapi/order'
    };
    Object.freeze(__API_URL_GROUP__);
    var __JSAPILIST__ = ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo'];

    var __SHARE_DESC__ = '新版react~';
    var __SHARE_TITLE__ = '我是标题';

    //支付AppID
    var _TEST_PAID_APPID = 'wx7cf8dd5d80048e42';
    var _FORMAL_PAID_APPID = 'wxd6c823882698f217';

    //支付APPID
    var __PAID_APPID__ = _ENVIRONMENT
        ? _FORMAL_PAID_APPID
        : _TEST_PAID_APPID;
    var __PAYPULLINGFLAG__ = false;
    var __COURSE_SUM__ = 1;
    return {
        __debug__: __debug__,
        __PAYPULLINGFLAG__: __PAYPULLINGFLAG__,
        __API_URL_DOMAIN__: __API_URL_DOMAIN__,
        __TEST_API_Token__: __TEST_API_Token__,
        __API_URL_GROUP__: __API_URL_GROUP__,
        __APPID__: __APPID__,
        __JSAPILIST__: __JSAPILIST__,
        __SHARE_DESC__: __SHARE_DESC__,
        __SHARE_TITLE__: __SHARE_TITLE__,
        __PAID_APPID__: __PAID_APPID__,
        __COURSE_SUM__: __COURSE_SUM__
    };
})(window);

Object.freeze(window._WXGLOBAL_);