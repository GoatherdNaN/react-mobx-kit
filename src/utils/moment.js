import moment from 'moment'
import { format } from './format'

export const YMDHMS = "YYYY-MM-DD HH:mm:ss";
export const YMD = "YYYY-MM-DD";

const now = {
  Y: +moment().format('YYYY'),
  M: +moment().format('MM'),
  D: +moment().format('DD'),
  H: +moment().format('HH'),
  m: +moment().format('mm'),
  s: +moment().format('ss')
};

function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

export function disabledDate(current) {
  return current && current > moment().endOf('day');
}

export function disabledDateTime() {
  return {
    disabledHours: () => [],
    disabledMinutes: () => [],
    disabledSeconds: () => [], // 一般来说无需精确到秒
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