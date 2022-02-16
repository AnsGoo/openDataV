import type { AppRouteRecordRaw } from '@/router/interface'

const basicRoutes: AppRouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/common/Index.vue'),
    meta: {
      title: '首页',
      ignoreAuth: true
    }
  },
  {
    path: '/equipment/:index',
    name: 'Common',
    component: () => import('@/views/common/Index.vue'),
    meta: {
      title: '页面',
      ignoreAuth: true
    }
  },
  {
    path: '/create',
    name: 'Create',
    component: () => import('@/views/designer/Index.vue'),
    meta: {
      title: '创建页面',
      permission: 'CreatePage'
    }
  },
  {
    path: '/editor/:index',
    name: 'Editor',
    component: () => import('@/views/designer/Index.vue'),
    meta: {
      title: '编辑页面',
      permission: 'EditePage'
    }
  },
  {
    path: '/preview',
    name: 'Preview',
    component: () => import('@/components/Editor/Preview.vue'),
    meta: {
      title: '预览界面',
      permission: 'PerviewPage'
    }
  },
  {
    path: '/pages',
    name: 'Pages',
    component: () => import('@/views/common/Pages.vue'),
    meta: {
      title: '布局界面',
      permission: 'Pages'
    }
  },
  {
    path: '/alert',
    name: 'Alert',
    component: () => import('@/views/common/Alert/Index.vue'),
    meta: {
      title: '报警详情',
      permission: 'Alert'
    }
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('@/views/common/Setting/Index.vue'),
    meta: {
      title: '系统设置',
      permission: 'Settings'
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/pages/exception/404.vue'),
    meta: {
      title: '错误页面',
      ignoreAuth: true
    }
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/pages/exception/403.vue'),
    meta: {
      title: '无权限',
      ignoreAuth: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Error',
    component: () => import('@/views/designer/Index.vue'),
    meta: {
      title: '错误页面',
      ignoreAuth: true
    }
  }
]

export default basicRoutes
