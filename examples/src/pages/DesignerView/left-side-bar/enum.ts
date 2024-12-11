export enum CategoryEnum {
  // 基础组件
  BASIC = 'BASIC',
  // 边框
  BORDER = 'BORDER',
  // 装饰
  DECORATION = 'DECORATION',
  // 折线图
  LINE = 'LINE',
  // 柱状图
  BAR = 'BAR',
  // 百分比图
  PIE = 'PIE',
  // 地图
  MAP = 'MAP',
  // 仪表盘
  GAUGE = 'GAUGE',
  // 定制组件
  CUSTOM = 'CUSTOM',
  TEXT = 'TEXT',
  BUTTON = 'BUTTON',
  // 表格
  TABLE = 'TABLE',

  // 其他组件
  NAVIFATION = 'NAVIFATION',
  PROGERSS = 'PROGERSS',
  THERMOMETER = 'THERMOMETER',
  // 其他组件
  OTHER = 'OTHER',
  // 容器组件
  CONTAINER = 'CONTAINER'
}

export class Category {
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

export const CategoryList: Category[] = [
  new Category('基础', CategoryEnum.BASIC, 'cube'),
  new Category('边框', CategoryEnum.BORDER, 'border'),
  new Category('装饰', CategoryEnum.DECORATION, 'icon'),
  new Category('线状图', CategoryEnum.LINE, 'chartLine'),
  new Category('柱状图', CategoryEnum.BAR, 'chartHistogram'),
  new Category('饼图', CategoryEnum.PIE, 'chartPie'),
  new Category('地图', CategoryEnum.MAP, 'map'),
  new Category('仪表盘', CategoryEnum.GAUGE, 'dashboard'),
  new Category('按钮', CategoryEnum.BUTTON, 'button'),
  new Category('文本', CategoryEnum.TEXT, 'text'),
  new Category('表格', CategoryEnum.TABLE, 'table'),
  new Category('温度计', CategoryEnum.THERMOMETER, 'thermometer'),
  new Category('导航', CategoryEnum.NAVIFATION, 'navigation'),
  new Category('进度图', CategoryEnum.PROGERSS, 'progress'),
  new Category('容器', CategoryEnum.CONTAINER, 'container'),
  new Category('其他', CategoryEnum.OTHER, 'other')
]
