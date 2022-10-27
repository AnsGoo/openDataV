import { componentList } from '@/designer/load'
import { ComponentGroupList } from '@/enum'
import type { GroupType } from '@/enum'
import type { BaseComponent } from '@/resource/models'
import type { MenuItem } from '../modules/components/SiderContent'
import type { AppRouteRecordRaw } from '@/router/types'
export const getComponentMenus = (): Array<MenuItem> => {
  const menuOptions: Array<MenuItem> = []
  const groups: { group: string; component: BaseComponent[] } | {} = {}
  Object.keys(componentList).forEach((key) => {
    const component: BaseComponent = new componentList[key]()
    const group = component.group
    if (!group || !component.show) {
      return
    }

    if (!groups[group]) {
      groups[group] = []
    }
    groups[group].push(component)
  })

  ComponentGroupList.forEach((item: GroupType) => {
    if (groups[item.key]?.length && groups[item.key]?.length > 0) {
      menuOptions.push({
        label: item.name,
        count: groups[item.key]?.length || 0,
        key: item.key,
        icon: item.icon,
        children: groups[item.key]?.map((el) => {
          return {
            label: el.name,
            key: el.component
          }
        })
      })
    }
  })
  return menuOptions
}

export const getHelpMenus = (): Array<MenuItem> => {
  return [
    {
      label: '快速开始',
      icon: 'data',
      key: 'quick_start',
      count: 3,
      children: [
        { label: '介绍', key: 'intro' },
        { label: '设计', key: 'design' },
        { label: '发布', key: 'public' }
      ]
    },
    {
      label: '设计器',
      icon: 'designer',
      key: 'designer',
      count: 3,
      children: [
        { label: '组合/拆分', key: 'group' },
        { label: '拉伸/拖拽/旋转', key: 'action' },
        { label: '复制/粘贴/导入', key: 'action' },
        { label: '选中', key: 'selected' },
        { label: '属性', key: 'attr' },
        { label: '样式', key: 'style' },
        { label: '图层', key: 'layer' }
      ]
    }
  ]
}

export const getMenus = (routers: AppRouteRecordRaw[]): Array<MenuItem> => {
  return routers.map((el) => {
    const item = {
      label: el.meta.title,
      icon: el.meta.icon!,
      key: el.name,
      count: el.children?.length || 0,
      children: [] as Array<MenuItem>
    }
    if (el.children && el.children?.length > 0) {
      item.children = getMenus(el.children || [])
    }
    return item
  })
}
