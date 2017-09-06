
/**
 * 查询小课接口 param tiny_course_id
 * /ctplus/tiny-course/application/{tiny_course_id}
 */
const _fetchIndexInfo_: string = "/ctplus/tiny-course/application/";
/**
 * 查询小课是否购买 param tiny_course_id
 * /ctplus/tiny-course/qualification/{tiny_course_id}
 */
const _fetchIsUserBuy_: string = "/ctplus/tiny-course/qualification/";


/**
 * 查询对应小课的章节作业内容
 * /ctplus/tiny-course/{tiny_course_id}/{chapter_id}
 */
const _fetchListenInfo_: string = "/ctplus/tiny-course/";


export {
    _fetchIndexInfo_,
    _fetchIsUserBuy_,
    _fetchListenInfo_
};