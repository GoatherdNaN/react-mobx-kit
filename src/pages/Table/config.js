export default {
  name: {
    label: "姓名",
    itemProps: {
      maxLength: 20,
      placeholder: "请输入姓名，最长20个字符",
    },
  },
  age: {
    label: "年龄",
    itemProps: {
      maxLength: 3,
      placeholder: "请输入年龄，必须为数字",
    },
  },
  job: {
    label: "年龄",
    itemProps: {
      maxLength: 10,
      placeholder: "请输入职位，最长10个字符",
    },
  },
  address: {
    label: "家庭住址",
    itemProps: {
      maxLength: 200,
      placeholder: "请输入家庭住址，最长200个字符",
    },
  },
  status: {
    label: "状态",
    itemProps: {
      placeholder: "请选择状态",
    },
  },
  updatedAt: {
    label: "上传调度时间",
  },
}