/*
 * @Author: Edlan
 * @Date: 2019-01-11 10:58:41
 * @Description: 格式化数据
 */
import moment from 'moment'
// 格式化单个数据时的高阶函数
const format = formatFun => (...args) => {
  let result = args[0];
  try {
    result = formatFun.apply(this, args);
  } catch (e) {
    window.warning(e);
  } finally {
    return result;
  }
}

// 字符串超出最大长度显示省略号
export const splitStr = format((str, maxLen=100) => {
  if (str.length > maxLen) {
    return str.substring(0, maxLen) + '...'
  }
  return splitStr
})
// 格式化时间
export const formatTimeStamp = format(
  (timeStamp = '', format = 'YYYY-MM-DD HH:mm:ss') => moment(new Date(timeStamp)).format(format)
)