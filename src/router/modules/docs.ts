import Site from '@/docs/Site.vue'
import { VueComponent as ReadMe } from '@/resource/readme.md'

const basicRoutes = [
  {
    path: '/docs',
    name: 'Docs',
    component: Site,
    redirect: 'API',
    meta: {
      title: '文档',
      icon: 'api',
      ignoreAuth: true,
      hideInMenu: true
    },
    children: [
      {
        path: '/docs/component',
        name: 'component',
        component: ReadMe,
        meta: {
          title: '组件',
          icon: 'Component'
        }
      },
      {
        path: '/docs/help',
        name: 'Help',
        component: ReadMe,
        meta: {
          title: '教程',
          icon: 'helpcenter'
        }
      },
      {
        path: '/docs/data',
        name: 'Data',
        component: ReadMe,
        meta: {
          title: '数据',
          icon: 'data'
        }
      }
    ]
  }
]

export default basicRoutes
