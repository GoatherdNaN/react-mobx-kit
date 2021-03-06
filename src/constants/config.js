/*
 * @Author: Edlan
 * @Date: 2018-10-29 18:56:32
 * @Description: 静态配置，防止硬编码
 */

// 项目名，显示在菜单上方
export const TITLE = "智能管理平台";
// 请求成功code（后端定义）
export const SUCCESS_CODE = 200;
// 提示信息
export const SUCCESS_INFO = {
  add: '添加成功',
  update: '修改成功',
  remove: '删除成功',
}
// 菜单项的field配置
export const RESOURCE_FIELDNAMES = {
  code: 'resourceCode',
  name: 'resourceName',
  type: 'resourceType',
  icon: 'icon'
};
// cookie过期时间
export const COOKIE_EXPIRE = 10; // days
// 默认的分页配置
export const INIT_SEARCH_CRITERIA = {
  currentPage: 1,
  pageSize: 10,
};
// Header上的快捷入口
export const shortcut = [{
  name: '快捷方式1',
  path: '/'
},{
  name: '快捷方式2',
  path: '/basis'
},{
  name: '快捷方式3',
  path: '/xxx'
},{
  name: '快捷方式4',
  path: '/ffff'
  }];
// 弹窗
export const formItemBlock = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 15,
  },
  colon: false, // 不要冒号
};
// 页面
export const formItemLayout = {
  labelCol: {
    xxl: { span: 3 }, // ≥1600px
    xl: { span: 4 }, // ≥1200px
    lg: { span: 5 }, // ≥992px
  },
  wrapperCol: {
    xxl: { span: 8 },
    xl: { span: 11 },
    lg: { span: 13 },
  }
}

export const OPERATE_ITEM = {
  add: {
    code: 'add',
    title: '新增',
  },
  update: {
    code: 'update',
    title: '编辑',
  },
  check: {
    code: 'check',
    title: '查看',
  },
  export: {
    code: 'export',
    title: '导出',
  },
};

export const COMMON_FORM_RULES = {
  validateFirst: true,
  validateTrigger: 'onBlur',
};