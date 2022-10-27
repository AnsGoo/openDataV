import Site from '@/docs/Site.vue'
import ReadMe from '@/docs/tutorial/Home.md'
import Content from '@/docs/Content/Content.vue'
import { MainView } from '@/layout/components/Main'
import { ComponentGroupList } from '@/enum'
import type { GroupType } from '@/enum'
import type { ComponentItem } from '@/types/component'

const getComponents = () => {
  const componentDocs: Array<ComponentItem> = ComponentGroupList.map((el: GroupType) => {
    return {
      label: el.name,
      key: el.key,
      icon: el.icon,
      children: []
    }
  })
  const moduleFilesTs: any = import.meta.glob('../../resource/components/**/index.ts', {
    eager: true
  })
  Object.keys(moduleFilesTs).forEach((key: string) => {
    const componentOptions = moduleFilesTs[key]?.default
    const componentInstance = new componentOptions.config()
    const docs = componentDocs.filter((el) => el.key === componentInstance.group)
    if (docs.length > 0) {
      docs[0].children.push({
        key: componentInstance.component,
        label: componentInstance.name,
        docs: componentOptions.docs ? () => componentOptions.docs : undefined
      })
    }
  })
  return componentDocs.map((ele) => {
    return {
      path: ele.key.toLocaleLowerCase(),
      name: ele.key,
      component: MainView,
      meta: {
        title: ele.label,
        icon: ele.icon,
        ignoreAuth: true,
        hideInMenu: true
      },
      children: ele.children.map((el) => {
        console.log(el.key)
        return {
          path: el.key,
          name: el.key,
          component: el.docs,
          meta: {
            title: el.label,
            ignoreAuth: true,
            hideInMenu: true
          }
        }
      })
    }
  })
}

console.log(getComponents())

const basicRoutes = [
  {
    path: '/docs',
    name: 'Docs',
    component: Site,
    redirect: '/docs/designer/tutorial',
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
        component: Content,
        redirect: '/docs/designer/tutorial',
        meta: {
          title: '教程',
          icon: 'helpcenter',
          ignoreAuth: true,
          hideInMenu: true
        },
        children: [
          {
            path: 'tutorial',
            name: 'Tutorial',
            component: ReadMe,
            meta: {
              title: '教程',
              icon: 'helpcenter',
              ignoreAuth: true,
              hideInMenu: true
            }
          }
        ]
      },
      {
        path: 'quick-start',
        name: 'QuickStart',
        component: Content,
        redirect: '/docs/quick-start/intro',
        meta: {
          title: '快速开始',
          icon: 'data',
          ignoreAuth: true,
          hideInMenu: true
        },
        children: [
          {
            path: 'intro',
            name: 'Intro',
            component: () => import('@/docs/quick-start/index.md'),
            meta: {
              title: '介绍',
              icon: 'data',
              ignoreAuth: true,
              hideInMenu: true
            }
          },
          {
            path: 'design',
            name: 'Design',
            component: () => import('@/docs/quick-start/design.md'),
            meta: {
              title: '设计',
              icon: 'data',
              ignoreAuth: true,
              hideInMenu: true
            }
          },
          {
            path: 'public',
            name: 'Public',
            component: () => import('@/docs/quick-start/public.md'),
            meta: {
              title: '发布',
              icon: 'data',
              ignoreAuth: true,
              hideInMenu: true
            }
          }
        ]
      },
      {
        path: '/docs/component',
        name: 'Component',
        component: Content,
        meta: {
          title: '组件',
          icon: 'components'
        },
        redirect: '/docs/component/TEXT/StaticText',
        children: [...getComponents()]
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
