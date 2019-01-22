import moment from 'moment'
import { format } from './format'

export const YMDHMS = "YYYY-MM-DD HH:mm:ss";
export const YMD = "YYYY-MM-DD";

export function disabledDate(current) {
  return current && current > moment().endOf('day');
}

export function disabledDateTime() {
  return {
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56],
  };
}
// 获取时间字符串
export function getInitDate(time) {
  if (time) {
    return moment(time);
  }
  return null;
}

// 表单中时间段选择框获取值，getValueFromEvent: normDoubleDate
export const normDoubleDate = format((_, dateStrs) => ([
  dateStrs[0],
  dateStrs[1]
]));
// 表单中时间选择框获取值
export const normSingleDate = format((_, dateStr) => dateStr);