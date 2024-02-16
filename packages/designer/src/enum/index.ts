import { ComponentGroup } from '@open-data-v/base'

export enum EditMode {
  EDIT = 'edit',
  PREVIEW = 'preview',
  VIEW = 'view'
}

export const PixelEnum = [
  { label: '4K', value: '3840X2160' },
  { label: '2k', value: '2048X1080' },
  { label: '1080P', value: '1920X1080' },
  { label: '720P', value: '1366X768' },
  { label: 'iPhoneXR', value: '414X896' },
  { label: 'iPhoneSE', value: '375X667' },
  { label: 'iPhone12Pro', value: '390X884' },
  { label: 'GalaxyS8+', value: '360X740' },
  { label: 'GalaxyS20Ultra+', value: '412X915' },
  { label: 'iPadAir', value: '820X1180' },
  { label: 'iPadMini', value: '768X1024' },
  { label: 'SurfacePro7', value: '912X1368' },
  { label: 'NestHub', value: '1024X600' },
  { label: 'NestMax', value: '1028X800' }
]

export enum DataMode {
  SELF = 'SELF',
  UNIVERSAL = 'UNIVERSAL',
  GLOBAL = 'GLOBAL'
}
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
