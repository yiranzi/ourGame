/**
 * 判断是否在微信打开
 */
/**
 * @func isWeiXin
 * @return {Boolean} - 如果为微信，则返回true，如果不是，则返回false
 */
const isWeiXin = (): boolean => {
    let ua = navigator.userAgent.toLowerCase();
    if ( ua.match(/MicroMessenger/i) !== null && ua.match(/MicroMessenger/i)[0] === "micromessenger" ) {
        return true;
    } else {
        return false;
    }
};

/**
 * @func whichPlantFrom
 * @return {string} - 如果为微信，则返回字符串 "client"， 如果为服务器，则返回字符串 "server"
 */
const whichPlantFrom = (): string => {
    return typeof process === "undefined" ? "client" : "server";
};

export {
    isWeiXin,
    whichPlantFrom
};