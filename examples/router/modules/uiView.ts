import { EmptyLayout } from '@/layout'

const basicRoutes = [
  {
    path: '/ui-view',
    name: 'UiView',
    component: EmptyLayout,
    redirect: 'UiView',
    meta: {
      title: 'UI管理',
      icon: 'api'
    },
    children: [
      {
        path: '/ui/view',
        name: 'API',
        component: () => import('@/pages/UIView.vue'),
        meta: {
          title: 'UI组件',
          icon: 'api'
        }
      }
    ]
  }
]
export default basicRoutes
