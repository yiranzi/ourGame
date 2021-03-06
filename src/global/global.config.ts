const _FORMAL_API_DOMAIN_ = "https://growth.ichangtou.com"; // 生产环境 API域名
// const TEST_API_DOMAIN = "http://devh5.ichangtou.com.cn/";//测试环境 API域名
const _TEST_API_DOMAIN_ = "https://geek.ichangtou.com"; // 测试环境 API域名
// API TOKEN
const _FORMAL_API_Token_ = "DE:_:w2qlJFV@ccOeiq41ENp><ETXh3o@aX8M<[_QOsZ<d8[Yz:NIMcKwpjtBk0e"; // 生产环境 API Token
const _TEST_API_Token_ = "XX:_:w2qlJFV@ccOeiq41ENp><ETXh3o@aX8M<[_QOsZ<d8[Yz:NIMcKwpjtBk0e"; // 测试环境 API Token

const _API_TOKEN_ = process.env.NODE_ENV === "production" ? _FORMAL_API_Token_ : _TEST_API_Token_;
const _API_DOMAIN_ = process.env.NODE_ENV === "production" ? _FORMAL_API_DOMAIN_ : _TEST_API_DOMAIN_;


const _FETCH_HEADER_ = {
    "Accept": "application/json",
    "X-iChangTou-Json-Api-Token": _API_TOKEN_,
    "Content-Type": "application/json;charset=utf-8",
    "X-iChangTou-Json-Api-User": "userInfo.userId",
    "X-iChangTou-Json-Api-Session": "userInfo.sessionId"
};



/**
基金课接口
1)获得班级群号		'get_qq_info':'ctplus/qq-details/{courseId}',
2)获得期数信息		'get_start_time': ctplus/getstarttime/{courseId}',
3)报名 			'get_order': 'payment/wx/jsapi/order',  //获取统一订单
4)是否报名?		'get_judge_signup': 'ctplus/WhetherSignUp/{courseId}', //判断用户是否购买
**/

export {
    _FETCH_HEADER_,
    _API_DOMAIN_,
    _API_TOKEN_
};