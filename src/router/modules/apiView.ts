import { EmptyLayout } from '@/layout'

const basicRoutes = [
  {
    path: '/data',
    name: 'DataSet',
    component: EmptyLayout,
    redirect: 'API',
    meta: {
      title: '数据管理',
      icon: 'api'
    },
    children: [
      {
        path: '/data/api',
        name: 'API',
        component: () => import('@/pages/OpenApi.vue'),
        meta: {
          title: '接口管理',
          icon: 'api'
        }
      },
      {
        path: '/data/script',
        name: 'Script',
        component: () => import('@/pages/Scripts.vue'),
        meta: {
          title: '脚本管理',
          icon: 'script'
        }
      }
    ]
  }
]

export default basicRoutes
