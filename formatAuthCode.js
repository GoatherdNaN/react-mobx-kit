const fs = require('fs')
const authCode = [
  {
    "id": 1,
    "parentId": 0,
    "resourceName": "工作台",
    "resourceCode": "dashboard",
    "resourceType": 1,
    "icon": "home",
    "children": null
  },
  {
    "id": 2,
    "parentId": 0,
    "resourceName": "页面",
    "resourceCode": "basis",
    "resourceType": 1,
    "icon": "basis",
    "children": [{
      "id": 21,
      "parentId": 2,
      "resourceName": "普通列表",
      "resourceCode": "nomalList",
      "resourceType": 1,
      "icon": null,
      "children": [{
        "id": 211,
        "parentId": 21,
        "resourceName": "新增",
        "resourceCode": "nomalListNew",
        "resourceType": 2,
        "icon": null
      }, {
        "id": 212,
        "parentId": 21,
        "resourceName": "删除",
        "resourceCode": "nomalListRemove",
        "resourceType": 2,
        "icon": null
      }, {
        "id": 213,
        "parentId": 21,
        "resourceName": "修改",
        "resourceCode": "nomalListEdit",
        "resourceType": 2,
        "icon": null
      }]
    }]
  }, {
    "id": 3,
    "parentId": 0,
    "resourceName": "设置",
    "resourceCode": "system",
    "resourceType": 1,
    "icon": "system",
    "children": [{
      "id": 31,
      "parentId": 3,
      "resourceName": "个人资料",
      "resourceCode": "user",
      "resourceType": 1,
      "icon": null
    }, {
      "id": 32,
      "parentId": 3,
      "resourceName": "修改密码",
      "resourceCode": "changepwd",
      "resourceType": 1,
      "icon": null
    }]
  }
];

function format(arr, result = {}) {
  arr.forEach(node => {
    result[node.resourceCode] = {};
    result[node.resourceCode].name = node.resourceName;
    result[node.resourceCode].code = node.resourceCode;
    if (Array.isArray(node.children)) {
      format(node.children, result[node.resourceCode]);
    }
  });
  return result;
}

const data = `export default ${JSON.stringify(format(authCode))}`;

fs.writeFile('./src/constants/authCode.js', data, function (err) {
  if (err) {
    console.log(err);
  }
})