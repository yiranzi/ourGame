
/**
 * 模块配置
 */
let _ENVIRONMENT: boolean = (function () {
    if ( location.href.indexOf("h5.ichangtou.com") > -1 ){
        //正式环境
        return true;
    }else {
        //测试
        return false;
    }
})();
const __debug__: boolean = location.href.indexOf("localhost") > 0;
const __TEST_API_Token__: string = "XX:_:w2qlJFV@ccOeiq41ENp><ETXh3o@aX8M<[_QOsZ<d8[Yz:NIMcKwpjtBk0e"; //测试环境 API Token
const _FORMAL_API_DOMAIN: string = "https://growth.ichangtou.com/"; //生产环境 API域名
const _TEST_API_DOMAIN: string = "https://geek.ichangtou.com/"; //测试环境 API域名
const __API_URL_DOMAIN__: string = _ENVIRONMENT ? _FORMAL_API_DOMAIN : _TEST_API_DOMAIN; //开发环境or生产环境
//API请求url
const __TEST_APPID__: string = "wxdd25f06df84b18ea";  //测试环境APPID wx7cf8dd5d80048e42
const __FORMA_APPID__: string = "wx8cc2299282e864f8"; //正式环境APPI
//登录APPID
const __APPID__: string = _ENVIRONMENT ? __FORMA_APPID__ : __TEST_APPID__;
//接口
const __API_URL_GROUP__: Object = {
    "wx_sign": "wx/signature", //微信接口签名
    "userinfo_authorization": "wx/h5/authorization/user-info", //授权注册
    "base_login": "wx/h5/base/authorization/user-info", //静默登录
    "get_order": "payment/wx/jsapi/order",  //获取统一订单
};

const __JSAPILIST__: Array<string> = [
    "onMenuShareTimeline",
    "onMenuShareAppMessage",
    "onMenuShareQQ",
    "onMenuShareWeibo"
    ];

const __SHARE_DESC__: string = "新版react~";
const __SHARE_TITLE__: string = "我是标题";

//支付AppID
const _TEST_PAID_APPID: string = "wx7cf8dd5d80048e42"; //测试环境支付APPID
const _FORMAL_PAID_APPID: string = "wxd6c823882698f217"; //正式环境支付APPID

//支付APPID
let __PAID_APPID__: string =  _ENVIRONMENT ? _FORMAL_PAID_APPID : _TEST_PAID_APPID;
let __payPullingFlag__: boolean = false;
let __COURSE_SUM__: number = 1;

export default  {
    debug: __debug__,
    payPullingFlag: __payPullingFlag__,
    API_URL_DOMAIN: __API_URL_DOMAIN__,
    TEST_API_Token: __TEST_API_Token__,
    API_URL_GROUP: __API_URL_GROUP__,
    APPID: __APPID__,
    JSAPILIST: __JSAPILIST__,
    SHARE_DESC: __SHARE_DESC__,
    SHARE_TITLE: __SHARE_TITLE__,
    PAID_APPID: __PAID_APPID__,
    COURSE_SUM: __COURSE_SUM__
};

