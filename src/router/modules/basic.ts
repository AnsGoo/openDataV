import type { AppRouteRecordRaw } from '@/router/interface'

const basicRoutes: AppRouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/PageView.vue'),
    meta: {
      title: '首页',
      ignoreAuth: true
    }
  },
  {
    path: '/page/:index/view',
    name: 'PageView',
    component: () => import('@/pages/PageView.vue'),
    meta: {
      title: '页面',
      ignoreAuth: true
    }
  },
  {
    path: '/page/create',
    name: 'Create',
    component: () => import('@/pages/DesignerPage.vue'),
    meta: {
      title: '创建页面',
      permission: 'CreatePage'
    }
  },
  {
    path: '/page/:index/edite',
    name: 'Editor',
    component: () => import('@/pages/DesignerPage.vue'),
    meta: {
      title: '编辑页面',
      permission: 'EditePage'
    }
  },
  {
    path: '/preview',
    name: 'Preview',
    component: () => import('@/pages/Preview.vue'),
    meta: {
      title: '预览界面',
      permission: 'PerviewPage'
    }
  },
  {
    path: '/pages',
    name: 'Pages',
    component: () => import('@/pages/Pages.vue'),
    meta: {
      title: '布局界面',
      permission: 'Pages'
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
    component: () => import('@/pages/exception/404.vue'),
    meta: {
      title: '错误页面',
      ignoreAuth: true
    }
  }
]

export default basicRoutes
