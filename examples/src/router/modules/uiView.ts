import { EmptyLayout } from '@/layout'

const basicRoutes = [
  {
    path: '/ui-view',
    name: 'UiView',
    component: EmptyLayout,
    redirect: 'UiView',
    meta: {
      title: 'UI管理',
      icon: 'components'
    },
    children: [
      {
        path: '/ui/view',
        name: 'UIComponent',
        component: () => import('@/pages/UIView.vue'),
        meta: {
          title: 'UI组件',
          icon: 'components'
        }
      }
    ]
  }
]
export default basicRoutes
