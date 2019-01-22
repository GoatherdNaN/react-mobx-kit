/*
 * @Author: Edlan
 * @Date: 2019-01-22 10:49:05
 * @Description: 通用验证规则及正则验证
 */
function validateByPattern(pattern, message="格式不正确!") {
  return {
    pattern,
    message,
  }
}
export const NOT_NULL = {
  required: true,
  message: '不能为空',
};
// 正整数
export const POSITIVE_INTEGER = /^[1-9]\d*$/;
export const validatePositiveInteger = (message='请输入正整数') => validateByPattern(POSITIVE_INTEGER, message);
// 非负整数
export const NONNEGATIVE_INTEGER = /^[+]{0,1}(\d+)$/;
export const validateNonnegativeInteger = (message='请输入非负整数') => validateByPattern(NONNEGATIVE_INTEGER, message);
// 非负数(包括小数)
export const NONNEGATIVE_NUMBER = /^\d+(\.{0,1}\d+){0,1}$/;
export const validateNonnegativeNumber = (message='请输入非负数') => validateByPattern(NONNEGATIVE_NUMBER, message);
// 手机
export const MOBILE = /^1\d{10}$/;
export const validateMobile = (message) => validateByPattern(MOBILE, message);
// 中文
export const CHINESE = /^[\u4E00-\u9FA5]{0,}$/;
export const validateChinese = (message='请输入中文') => validateByPattern(CHINESE, message);
// 中英文
export const CHINESE_ENGLISH = /^[a-zA-Z\u4e00-\u9fa5]+$/;
export const validateChineseEnglish = (message='请输入中文或字母,字母区分大小写') => validateByPattern(CHINESE_ENGLISH, message);
// 英文数字
export const ENGLISH_NUMBER = /^[0-9a-zA-Z]+$/;
export const validateEnglishNumber = (message='请输入数字或字母,字母区分大小写') => validateByPattern(ENGLISH_NUMBER, message);
// 邮箱(最多40位)
export const EMAIL = /^(?=\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$).{0,40}$/;
export const validateEmail = (message) => validateByPattern(EMAIL, message);