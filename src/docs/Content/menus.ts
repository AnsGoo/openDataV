import type { MenuItem } from '../modules/components/SiderContent'
import type { AppRouteRecordRaw } from '@/router/types'

export const getMenus = (routers: AppRouteRecordRaw[]): Array<MenuItem> => {
  return routers.map((el) => {
    const item = {
      label: el.meta.title,
      icon: el.meta.icon!,
      key: el.name,
      children: [] as Array<MenuItem>
    }
    if (el.children && el.children?.length > 0) {
      item.children = getMenus(el.children || [])
    }
    return item
  })
}
