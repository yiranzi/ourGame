/* tslint:disable */

/**
 * fetch的同构方法
 * @export fetch - 导出全局的fetch方法，服务器上使用node-fetch实现，前端使用unfetch实现 
 */
export default window.fetch || (require("unfetch").default || require("unfetch"));