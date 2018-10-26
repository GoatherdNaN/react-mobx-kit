export default [
  {
    id: 1,
    resourceName: '首页',
    resourceCode: 'home',
    resourceType: 1,
    parentId: 0,
    icon: 'home',
    children: null
  },
  {
    id: 2,
    resourceName: '基础资料',
    resourceCode: 'basis',
    resourceType: 1,
    parentId: 0,
    icon: 'basis-data',
    children: [
      {
        id: 21,
        resourceName: '表格',
        resourceCode: 'table',
        resourceType: 1,
        parentId: 2,
        icon: '',
        children: [
          {
            id: 211,
            resourceName: '增加',
            resourceCode: 'table-new',
            resourceType: 2,
            parentId: 21,
            icon: '',
            children: null
          },
          {
            id: 212,
            resourceName: '删除',
            resourceCode: 'table-remove',
            resourceType: 2,
            parentId: 21,
            icon: '',
            children: null
          },
          {
            id: 213,
            resourceName: '修改',
            resourceCode: 'table-update',
            resourceType: 2,
            parentId: 21,
            icon: '',
            children: null
          },
          {
            id: 214,
            resourceName: '查看',
            resourceCode: 'table-check',
            resourceType: 2,
            parentId: 21,
            icon: '',
            children: null
          },
        ]
      },
      {
        id: 22,
        resourceName: '其他',
        resourceCode: 'table-other',
        resourceType: 1,
        parentId: 2,
        icon: '',
        children: null
      }
    ]
  },
]