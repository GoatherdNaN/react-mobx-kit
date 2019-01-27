const AuthCode = {
  "dashboard": {
    "name": "工作台",
    "code": "dashboard"
  },
  "basis": {
    "name": "页面",
    "code": "basis",
    "nomalList": {
      "name": "普通列表",
      "code": "nomalList",
      "nomalListNew": {
        "name": "新增",
        "code": "nomalListNew"
      },
      "nomalListRemove": {
        "name": "删除",
        "code": "nomalListRemove"
      },
      "nomalListEdit": {
        "name": "修改",
        "code": "nomalListEdit"
      }
    },
    "complexList": {
      "name": "复杂列表",
      "code": "complexList",
      "complexListNew": {
        "name": "新增",
        "code": "complexListNew"
      },
      "complexListRemove": {
        "name": "删除",
        "code": "complexListRemove"
      },
      "complexListEdit": {
        "name": "修改",
        "code": "complexListEdit"
      }
    }
  },
  "system": {
    "name": "设置",
    "code": "system",
    "user": {
      "name": "个人资料",
      "code": "user"
    },
    "changepwd": {
      "name": "修改密码",
      "code": "changepwd"
    }
  }
};
const HOME = AuthCode.dashboard.code;
// 权限白名单
// const WhiteList = [
//   HOME,
// ];

export { HOME };
export default AuthCode;