import { getToken } from '@/utils/auth'

const userMap = {
  // 键名和token保持一致
  // permissions 是用户的权限
  // 相比于用role来做权限，permissions这样可以定制每一个用户的权限
  // permissions不能为空，最少
  admin: {
    token: 'admin',
    name: 'Admin',
    age: 10,
    permissions: [{
      name: '系统配置',
      type: 'root',
      icon: 'el-icon-setting',
      alias: 'SysConfigure',
      children: [{
        name: '表格管理',
        type: 'menu',
        icon: 'table-manage',
        children: [{
          name: '导出表格',
          type: 'leaf',
          icon: 'table-manage',
          path: '/sys-config/export-excel'
        },
        {
          name: '表格功能',
          type: 'menu',
          icon: 'table-manage',
          children: [{
            name: '导出表格1',
            type: 'leaf',
            icon: 'message',
            path: '/sys-config/export-excel1'
          },
          {
            name: '上传表格',
            type: 'leaf',
            icon: 'date',
            path: '/sys-config/upload-excel'
          }]
        }]
      },
      {
        name: '权限管理',
        type: 'menu',
        icon: 'organization',
        children: [{
          name: '用户管理',
          type: 'leaf',
          icon: 'sold-out',
          defaultPage: true,
          path: '/sys-config/user-manage'
        },
        {
          name: '组织管理',
          type: 'leaf',
          icon: 'sold-out',
          path: '/sys-config/organization-manage'
        },
        {
          name: '角色管理',
          type: 'leaf',
          icon: 'sold-out',
          path: '/sys-config/role-manage'
        },
        {
          name: '资源管理',
          type: 'leaf',
          icon: 'sold-out',
          path: '/sys-config/resource-manage'
        },
        {
          name: '授权管理',
          type: 'leaf',
          icon: 'sold-out',
          path: '/sys-config/resource-manage'
        }]
      }]
    },
    {
      name: '服务配置',
      type: 'root',
      icon: 'el-icon-service',
      alias: 'SysService',
      children: [{
        name: '表格管理',
        type: 'menu',
        children: [{
          name: '导出表格',
          defaultPage: true,
          type: 'leaf',
          path: '/sys-config/export-excel'
        },
        {
          name: '表格功能',
          type: 'menu',
          children: [{
            name: '导出表格1',
            type: 'leaf',
            path: '/sys-config/export-excel'
          },
          {
            name: '上传表格',
            type: 'leaf',
            path: '/sys-config/upload-excel'
          }]
        }]
      }]
    }],
    avatar: '/static/avatar/0.jpg'
  },
  lucy: {
    token: 'lucy',
    name: 'Lucy',
    age: 12,
    permissions: '/excel',
    avatar: '/static/avatar/1.jpg'
  }
}

function pullUserInfo() {
  return userMap[getToken()]
}

export { userMap, pullUserInfo }
