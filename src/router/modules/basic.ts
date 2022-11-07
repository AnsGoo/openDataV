import { Layout } from '@/layout'

const basicRoutes = [
  {
    path: '/',
    name: 'Home',
    component: () => Layout,
    redirect: 'Pages',
    meta: {
      title: '首页',
      ignoreAuth: true,
      hideInMenu: true
    }
  },
  {
    path: '/page/:index/view',
    name: 'PageView',
    component: () => import('@/pages/PageView.vue'),
    meta: {
      title: '页面',
      ignoreAuth: true,
      hideInMenu: true
    }
  },
  {
    path: '/page/create',
    name: 'Create',
    component: () => import('@/pages/DesignerPage'),
    meta: {
      title: '创建页面',
      permission: 'CreatePage',
      hideInMenu: true
    }
  },
  {
    path: '/page/:index/edit',
    name: 'Editor',
    component: () => import('@/pages/DesignerPage'),
    meta: {
      title: '编辑页面',
      permission: 'EditePage',
      hideInMenu: true
    }
  },
  {
    path: '/preview',
    name: 'Preview',
    component: () => import('@/pages/Preview.vue'),
    meta: {
      title: '预览界面',
      permission: 'PreviewPage',
      hideInMenu: true
    }
  },
  {
    path: '/pageLayout',
    name: 'PageLayout',
    component: Layout,
    meta: {
      title: '布局界面',
      icon: 'template'
    },
    children: [
      {
        path: '/pages',
        name: 'Pages',
        component: () => import('@/pages/Pages.vue'),
        meta: {
          title: '页面管理',
          icon: 'page'
        }
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/pages/exception/404.vue'),
    meta: {
      title: '错误页面',
      ignoreAuth: true,
      hideInMenu: true
    }
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/pages/exception/403.vue'),
    meta: {
      title: '无权限',
      ignoreAuth: true,
      hideInMenu: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Error',
    component: () => import('@/pages/exception/404.vue'),
    meta: {
      title: '错误页面',
      ignoreAuth: true,
      hideInMenu: true
    }
  }
]

export default basicRoutes
