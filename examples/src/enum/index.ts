import { ComponentGroup } from '@open-data-v/base'

export enum TokenStorage {
  LOCALSTORAGE = 'localStorage',
  SESSIONSTORAGE = 'sessionStorage',
  MEMORYSTORAGE = 'memoryStorage'
}

export enum RouteMode {
  HISTORY = 'history',
  HASH = 'hash'
}

export enum NoAuth {
  NO_AUTH = 'NoAuth',
  AUTH = 'Auth'
}

export const LOGIN_URL = '/login'

export class GroupType {
  public name: string
  public icon: string
  public key: string

  constructor(name: string, key: string, icon: string) {
    this.name = name
    this.icon = icon
    this.key = key
  }
  public toJSON() {
    return {
      name: this.name,
      icon: this.icon,
      key: this.key
    }
  }
}

export const ComponentGroupList: GroupType[] = [
  new GroupType('基础', ComponentGroup.BASIC, 'cube'),
  new GroupType('边框', ComponentGroup.BORDER, 'border'),
  new GroupType('装饰', ComponentGroup.DECORATION, 'icon'),
  new GroupType('线状图', ComponentGroup.LINE, 'chartLine'),
  new GroupType('柱状图', ComponentGroup.BAR, 'chartHistogram'),
  new GroupType('饼图', ComponentGroup.PIE, 'chartPie'),
  new GroupType('地图', ComponentGroup.MAP, 'map'),
  new GroupType('仪表盘', ComponentGroup.GAUGE, 'dashboard'),
  new GroupType('按钮', ComponentGroup.BUTTON, 'button'),
  new GroupType('文本', ComponentGroup.TEXT, 'text'),
  new GroupType('表格', ComponentGroup.TABLE, 'table'),
  new GroupType('温度计', ComponentGroup.THERMOMETER, 'thermometer'),
  new GroupType('导航', ComponentGroup.NAVIFATION, 'navigation'),
  new GroupType('进度图', ComponentGroup.PROGERSS, 'progress'),
  new GroupType('容器', ComponentGroup.CONTAINER, 'container'),
  new GroupType('其他', ComponentGroup.OTHER, 'other')
]
