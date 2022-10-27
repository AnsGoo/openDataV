import Site from '@/docs/Site.vue'
import ReadMe from '@/docs/tutorial/Home.md'
import ComponentContent from '@/docs/Content/ComponentContent.vue'
import TutorialContent from '@/docs/Content/TutorialContent.vue'
import StaticText from '@/docs/components/text/StaticText.md'

const basicRoutes = [
  {
    path: '/docs',
    name: 'Docs',
    component: Site,
    redirect: '/docs/help/tutorial',
    meta: {
      title: '文档',
      icon: 'docs',
      ignoreAuth: true,
      hideInMenu: true
    },
    children: [
      {
        path: '/docs/designer',
        name: 'Designer',
        component: TutorialContent,
        redirect: '/docs/designer/tutorial',
        meta: {
          title: '教程',
          icon: 'helpcenter'
        },
        children: [
          {
            path: 'tutorial',
            name: 'Tutorial',
            component: ReadMe,
            meta: {
              title: '教程',
              icon: 'helpcenter'
            }
          }
        ]
      },
      {
        path: 'quick-start',
        name: 'QuickStart',
        component: TutorialContent,
        redirect: '/docs/quick-start/intro',
        meta: {
          title: '快速开始',
          icon: 'data'
        },
        children: [
          {
            path: 'intro',
            name: 'Intro',
            component: () => import('@/docs/quick-start/index.md'),
            meta: {
              title: '介绍',
              icon: 'intr'
            }
          },
          {
            path: 'design',
            name: 'Design',
            component: () => import('@/docs/quick-start/design.md'),
            meta: {
              title: '设计',
              icon: 'intr'
            }
          },
          {
            path: 'public',
            name: 'Public',
            component: () => import('@/docs/quick-start/public.md'),
            meta: {
              title: '发布',
              icon: 'intr'
            }
          }
        ]
      },
      {
        path: '/docs/component',
        name: 'Component',
        component: ComponentContent,
        meta: {
          title: '组件',
          icon: 'data'
        },
        redirect: '/docs/component/static-text',
        children: [
          {
            path: '/docs/component/static-text',
            name: 'StaticText',
            component: StaticText,
            meta: {
              title: '静态文本'
            }
          }
        ]
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
