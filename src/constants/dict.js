/*
 * @Author: Edlan
 * @Date: 2019-01-14 10:17:29
 * @Description: 字典数据
 */
export const METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export const STATUS = [
  {
    value: 0,
    label: '停职'
  },
  {
    value: 1,
    label: '在职'
  }
];

export function getLabelFromDict(dict, value) {
  let result = '';
  try {
    result = dict.find(v => v.value === value).label;
  } finally {
    return result;
  }
}