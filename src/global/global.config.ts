const FORMAL_API_DOMAIN = "https://growth.ichangtou.com/"; // 生产环境 API域名
// const TEST_API_DOMAIN = "http://devh5.ichangtou.com.cn/";//测试环境 API域名
const TEST_API_DOMAIN = "https://geek.ichangtou.com/"; // 测试环境 API域名
// API TOKEN
const FORMAL_API_Token = "DE:_:w2qlJFV@ccOeiq41ENp><ETXh3o@aX8M<[_QOsZ<d8[Yz:NIMcKwpjtBk0e"; // 生产环境 API Token
const TEST_API_Token = "XX:_:w2qlJFV@ccOeiq41ENp><ETXh3o@aX8M<[_QOsZ<d8[Yz:NIMcKwpjtBk0e"; // 测试环境 API Token

/**
基金课接口
1)获得班级群号		'get_qq_info':'ctplus/qq-details/{courseId}',
2)获得期数信息		'get_start_time': ctplus/getstarttime/{courseId}',
3)报名 			'get_order': 'payment/wx/jsapi/order',  //获取统一订单
4)是否报名?		'get_judge_signup': 'ctplus/WhetherSignUp/{courseId}', //判断用户是否购买
**/


export {
    FORMAL_API_DOMAIN,
    TEST_API_DOMAIN,
    FORMAL_API_Token,
    TEST_API_Token
};