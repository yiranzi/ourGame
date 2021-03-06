"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jweixin_1 = require("@/assets/js/jweixin");
const fetch_1 = require("@/isomorphic/fetch");
const bridgeConfig_1 = require("./bridgeConfig");
/**
 * 初始化微信api授权、签名等
 * @func InitWxApi
 */
const InitWxApi = () => {
    _isWeiXin() && _signWxApi().then((response) => {
        let date = response.json();
        date.then(function (date) {
            jweixin_1.default.config({
                appId: date.wechat_appid,
                timestamp: date.timestamp,
                nonceStr: date.nonceStr,
                signature: date.signature,
                jsApiList: bridgeConfig_1.default.JSAPILIST,
            });
        });
    });
    _getUserInfoFromServer().catch(() => {
        _redirectToUserInfo();
    }).then((response) => {
        let data = response.json();
        data.then(function (data) {
            if (!data || !data.userId) {
                // 如果后台没有数据，代表没有授权过，去往snsapi_userinfo授权
                _redirectToUserInfo();
                return true;
            }
            // 保存用户信息
            const userInfo = {
                userId: data.userId,
                sessionId: data.sessionId,
                openId: data.openId,
                nickName: data.nickName,
                headImage: data.headImage,
                payOpenId: data.payOpenId,
                subscribe: data.subscribe,
            };
            if (userInfo.nickName && userInfo.nickName.length > 10) {
                userInfo.nickName = userInfo.nickName.substr(0, userInfo.nickName.length - 6);
            }
            localStorage.setItem("wx-user-info", JSON.stringify(userInfo));
            shareConfig();
        });
    });
};
/***
 * 获取地址栏code，向服务器发出请求用户信息
 * @func _getUserInfoFromServer
 * @returns {any|boolean}
 * @private
 */
function _getUserInfoFromServer() {
    // 携带在地址栏的code信息
    let code = _getUrlPara("code");
    console.log("code", code);
    if (!code) {
        // 地址栏里没有code 信息则重定向去微信静默授权
        _redirectToBaseInfo();
        // return true;
    }
    let jsonData = JSON.stringify({ "code": code });
    return fetch_1.default(_getAPIUrl("base_login"), {
        method: "POST",
        body: jsonData,
        headers: {
            "Accept": "application/json",
            "X-iChangTou-Json-Api-Token": bridgeConfig_1.default.TEST_API_Token,
            "Content-Type": "application/json;charset=utf-8"
        },
    });
}
/***
 * 获取APPID
 * @func _getAppId
 * @returns {string}
 * @private
 */
const _getAppId = () => {
    return bridgeConfig_1.default.APPID;
};
/**
 * 获取当前Url中#号后面内容
 * @func _getPoundSignUrl
 * @return {string}
 */
const _getPoundSignUrl = () => {
    return location.href.split("#")[1];
};
/**
 * 获取html地址
 * @func _getHtmlUrl
 * @return {string}
 */
const _getHtmlUrl = () => {
    return location.protocol + "//" + location.host + location.pathname;
};
/***
 * 分享配置
 * @func shareConfig
 * @private
 */
const shareConfig = () => {
    let USER_INFO = JSON.parse(localStorage.getItem("wx-user-info"));
    let imgUrl = USER_INFO.headImage, link = _getShareUrl(), desc = bridgeConfig_1.default.SHARE_DESC, title = bridgeConfig_1.default.SHARE_TITLE;
    if (!imgUrl) {
        imgUrl = "http://h5test.ichangtou.com.cn/minic/shareLogo.png";
    }
    let timelineOpt = {
        title,
        desc,
        link,
        imgUrl,
        success: () => {
            // '朋友圈'
            _onShareSuccess();
        },
        cancel: () => {
            _onShareFailure();
        }
    }, messageOpt = {
        title,
        desc,
        link,
        imgUrl,
        success: () => {
            // '消息'
            _onShareSuccess();
        },
        cancel: () => {
            _onShareFailure();
        }
    }, QQOpt = {
        title,
        desc,
        link,
        imgUrl,
        success: () => {
            // 'QQ'
            _onShareSuccess();
        },
        cancel: () => {
            _onShareFailure();
        }
    }, weiboOpt = {
        title,
        desc,
        link,
        imgUrl,
        success: () => {
            // 微博
            _onShareSuccess();
        },
        cancel: () => {
            _onShareFailure();
        }
    };
    jweixin_1.default.onMenuShareTimeline(timelineOpt);
    jweixin_1.default.onMenuShareAppMessage(messageOpt);
    jweixin_1.default.onMenuShareQQ(QQOpt);
    jweixin_1.default.onMenuShareWeibo(weiboOpt);
};
/***
 * 分享成功时执行的函数
 * @func _onShareSuccess
 * @private
 */
const _onShareSuccess = () => {
    console.log("分享成功");
    wechatPay();
};
/***
 * 分享失败时执行的函数
 * @func _onShareFailure
 * @private
 */
const _onShareFailure = () => {
    console.log("分享失败");
};
/***
 * 获取分享的URL
 * @func _getShareUrl
 * @return {string}
 * @private
 */
const _getShareUrl = () => {
    let userInfo = JSON.parse(localStorage.getItem("wx-user-info"));
    console.log("总分享时当前用户userId", userInfo.userId);
    return _getHtmlUrl() + "?share=" + userInfo.userId + "#" + _getPoundSignUrl();
};
/***
 * 支付
 * @func wechatPay
 */
const wechatPay = () => {
    let userInfo = JSON.parse(localStorage.getItem("wx-user-info"));
    if (bridgeConfig_1.default.payPullingFlag) {
        // 如果正在拉取支付数据，阻止，避免重复请求
        setTimeout(() => {
            bridgeConfig_1.default.payPullingFlag = false;
        }, 3000);
    }
    let price = 1;
    if (price) {
        _getOrder(userInfo.userId, price);
    }
    else {
        console.log("支付失败，获取成本价格为空");
    }
};
/***
 * 获取支付订单
 * @param userId
 * @param sum
 * @return {Promise<TResult|T>}
 * @private
 */
const _getOrder = (userId, sum) => {
    if (bridgeConfig_1.default.payPullingFlag) {
        return;
    }
    if (!userId) {
        console.log("没有用户信息");
        return;
    }
    let userInfo = JSON.parse(localStorage.getItem("wx-user-info"));
    if (!sum) {
        sum = bridgeConfig_1.default.COURSE_SUM;
    }
    let jsonData = JSON.stringify({
        "body": "商品成本费",
        "deal": {
            "items": [
                {
                    dealType: 102,
                    itemId: 2,
                    mchantType: 11,
                    misc: "",
                    price: sum
                }
            ]
        },
        "openId": userInfo.payOpenId && userInfo.payOpenId.toString(),
        "sum": sum
    });
    // 扫码支付 和 公众号支付调用不同的接口
    let apiUrl = _getAPIUrl("get_order");
    // 标记正在拉取数据
    bridgeConfig_1.default.payPullingFlag = true;
    // 显示loading界面
    console.log("请求微信支付");
    return fetch_1.default(apiUrl, {
        method: "POST",
        body: jsonData,
        headers: {
            "Accept": "application/json",
            "X-iChangTou-Json-Api-Token": bridgeConfig_1.default.TEST_API_Token,
            "Content-Type": "application/json;charset=utf-8",
            "X-iChangTou-Json-Api-User": userInfo.userId,
            "X-iChangTou-Json-Api-Session": userInfo.sessionId,
        },
    }).then((response) => {
        let data = response.json();
        data.then(function (data) {
            console.log("付费数据", data);
            localStorage.setItem("wx-user-pay", JSON.stringify(data));
            _pay();
            //获取订单数据成功后，调用支付控件
        });
    }).catch((data) => {
        console.log("请求微信支付失败", data);
    });
};
/**
 * 支付入口函数
 * @func _pay
 * @param data
 */
const _pay = () => {
    let data = JSON.parse(localStorage.getItem("wx-user-pay"));
    if (typeof WeixinJSBridge === "undefined") {
        if (document.addEventListener) {
            document.addEventListener("WeixinJSBridgeReady", _pay, false);
        }
        else if (document.attachEvent) {
            document.attachEvent("WeixinJSBridgeReady", _pay);
            document.attachEvent("onWeixinJSBridgeReady", _pay);
        }
    }
    else {
        _onBridgeReady(data);
    }
};
/**
 * 请求支付
 * @param data
 */
const _onBridgeReady = (data) => {
    let param = {
        "appId": bridgeConfig_1.default.PAID_APPID,
        "timeStamp": data.timeStamp.toString(),
        "nonceStr": data.nonceStr,
        "package": ("prepay_id=" + data.prepayId.toString()),
        "signType": "MD5",
        "paySign": data.paySign
    };
    WeixinJSBridge.invoke("getBrandWCPayRequest", param, (res) => {
        // 标记请求支付完成
        bridgeConfig_1.default.payPullingFlag = false;
        if (res.err_msg === "get_brand_wcpay_request:ok") {
            // 支付成功
            console.log("支付成功");
        }
        else {
            // 取消支付
            console.log("支付失败");
        }
    });
};
/***
 * 微信签名url
 * @param type
 * @returns {string}
 * @private
 */
const _getAPIUrl = (type) => {
    return _getAPIDomain() + bridgeConfig_1.default.API_URL_GROUP[type];
};
/***
 * 测试环境API域名
 * @returns {string}
 * @private
 */
const _getAPIDomain = () => {
    return bridgeConfig_1.default.API_URL_DOMAIN;
};
/***
 * 重定向到微信静默授权页面
 * @private
 */
const _redirectToBaseInfo = () => {
    console.log("config.debug", bridgeConfig_1.default.debug);
    if (bridgeConfig_1.default.debug || !_isWeiXin()) {
        return;
    }
    let code = _getUrlPara("code");
    console.log("code2", code);
    //不带code的话，强制去静默授权
    let redirectUri = _getRedirectUri(true), scope = "snsapi_base"; //snsapi_userinfo;
    console.log("redirectUri", redirectUri);
    //清除重定向到UserInfo的记录次数
    localStorage.removeItem("userInfoErrCounter");
    let url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + _getAppId() +
        "&redirect_uri=" + redirectUri +
        "&response_type=code" +
        "&scope=" + scope +
        "&state=new#wechat_redirect";
    console.log("url1", url);
    window.location.href = url;
};
/**
 * 获取重定向的url
 * @returns {string}
 */
const _getRedirectUri = (isUserInfo) => {
    let redirectUri = _getHtmlUrl(), prefix = "?";
    console.log("redirectUri", redirectUri);
    if (isUserInfo) {
        //区分baseInfo和userInfo
        prefix = "?";
        redirectUri = redirectUri + prefix + "isuserinfo=1";
    }
    let code = _getUrlPara("code");
    console.log("code", code);
    return encodeURIComponent(redirectUri);
};
/**
 * 重定向到UserInfo
 */
const _redirectToUserInfo = () => {
    if (!_isWeiXin()) {
        //QQ中打开不跳转
        return;
    }
    //不带code的话，强制去静默授权
    let redirectUri = _getRedirectUri(true), scope = "snsapi_userinfo"; //snsapi_userinfo
    //记录请求次数，超过3次，则不再请求
    let errCounter = 0;
    if (localStorage.getItem("userInfoErrCounter")) {
        errCounter = parseInt(localStorage.getItem("userInfoErrCounter"));
    }
    if (errCounter > 3) {
        localStorage.removeItem("userInfoErrCounter");
        return;
    }
    else {
        localStorage.setItem("userInfoErrCounter", (errCounter + 1).toString());
    }
    let url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + _getAppId() +
        "&redirect_uri=" + redirectUri +
        "&response_type=code" +
        "&scope=" + scope +
        "&state=minic#wechat_redirect";
    window.location.href = url;
};
/**
 * 获取链接中的参数内容
 * @param key
 * @returns {Array}
 */
const _getUrlPara = (key) => {
    let href = location.href, res = href.split(key + "=");
    console.log(res[1]);
    if (res[1]) {
        res = decodeURIComponent(res[1].split("&")[0]);
    }
    else {
        res = null;
    }
    return res;
};
/***
 * 微信接口签名
 * @returns {any|boolean}
 * @private
 */
// todo api token
const _signWxApi = () => {
    return fetch_1.default(_getAPIUrl("wx_sign"), {
        method: "POST",
        body: JSON.stringify({ "url": location.href }),
        headers: {
            "Accept": "application/json",
            "X-iChangTou-Json-Api-Token": bridgeConfig_1.default.TEST_API_Token,
            "Content-Type": "application/json;charset=utf-8"
        },
    });
};
/***
 * 是否是微信浏览器
 * @returns {boolean}
 * @private
 */
const _isWeiXin = () => {
    let ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) !== null && ua.match(/MicroMessenger/i)[0] === "micromessenger") {
        return true;
    }
    else {
        return false;
    }
};
exports.default = InitWxApi;
