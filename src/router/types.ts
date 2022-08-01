import type { Component } from 'vue'
import type { RouteMeta, RouteRecordRaw } from 'vue-router'

export interface Meta extends RouteMeta {
  title: string
  ignoreAuth?: boolean
  permission?: string
  hideInMenu?: boolean
  keepAlive?: boolean
  icon?: string
}

// 类型和接口在扩展联合类型方面存在不足，因此可以用类型来扩展，而不是接口
export type AppRouteRecordRaw = RouteRecordRaw & {
  name: string
  meta: Meta
  component?: Component | string
  components?: Component
  children?: AppRouteRecordRaw[]
  props?: Recordable
  fullPath?: string
}

// 菜单类型
export interface MenuType {
  name: string
  title: string
  icon: string
  children?: MenuType[]
}
