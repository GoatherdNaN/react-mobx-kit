import { COMMON_FORM_RULES } from 'constants/config'
import {
  NOT_NULL,
  validateChineseEnglish,
  validatePositiveInteger,
} from 'constants/verification'

export default {
  name: {
    label: "姓名",
    rules: {
      ...COMMON_FORM_RULES,
      rules: [
        NOT_NULL,
        validateChineseEnglish('仅支持中文或字母,字母区分大小写'),
      ]
    },
    itemProps: {
      maxLength: 20,
      placeholder: "请输入姓名，最长20个字符",
    },
  },
  age: {
    label: "年龄",
    rules: {
      ...COMMON_FORM_RULES,
      rules: [
        validatePositiveInteger(),
      ]
    },
    itemProps: {
      maxLength: 3,
      placeholder: "请输入年龄，必须为数字",
    },
  },
  job: {
    label: "职位",
    rules: {},
    itemProps: {
      maxLength: 10,
      placeholder: "请输入职位，最长10个字符",
    },
  },
  address: {
    label: "家庭住址",
    rules: {},
    itemProps: {
      maxLength: 200,
      placeholder: "请输入家庭住址，最长200个字符",
    },
  },
  status: {
    label: "状态",
    rules: {},
    itemProps: {
      placeholder: "请选择状态",
    },
  },
  updatedAt: {
    label: "上传调度时间",
    rules: {},
  },
}