import moment from 'moment'

export const format = "YYYY-MM-DD HH:mm:ss";

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
export function getDate(time) {
  if (time) {
    return moment(time).format(format);
  }
  return '';
}